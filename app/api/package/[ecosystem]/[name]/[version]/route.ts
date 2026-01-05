import { NextRequest, NextResponse } from "next/server"
import type {
  PackageData,
  InsightsResponse,
  MalysisResponse,
} from "@/lib/types"
import { createPromiseClient, Interceptor } from "@connectrpc/connect"
import { createConnectTransport } from "@connectrpc/connect-node"
import { InsightService } from "@buf/safedep_api.connectrpc_es/safedep/services/insights/v2/insights_connect.js"
import { Ecosystem } from "@buf/safedep_api.bufbuild_es/safedep/messages/package/v1/ecosystem_pb.js"

const SAFEDEP_API_KEY = process.env.SAFEDEP_API_KEY
const SAFEDEP_TENANT_ID = process.env.SAFEDEP_TENANT_ID

if (!SAFEDEP_API_KEY || !SAFEDEP_TENANT_ID) {
  console.error(
    "⚠️  Missing SafeDep API credentials. Set SAFEDEP_API_KEY and SAFEDEP_TENANT_ID in .env"
  )
}

// Authentication interceptor to add headers to each API call
function authenticationInterceptor(token: string, tenant: string): Interceptor {
  return (next) => async (req) => {
    req.header.set("authorization", `Bearer ${token}`)
    req.header.set("x-tenant-id", tenant)
    return await next(req)
  }
}

// Create gRPC transport with authentication
const transport =
  SAFEDEP_API_KEY && SAFEDEP_TENANT_ID
    ? createConnectTransport({
        baseUrl: "https://api.safedep.io",
        httpVersion: "1.1",
        interceptors: [
          authenticationInterceptor(SAFEDEP_API_KEY, SAFEDEP_TENANT_ID),
        ],
      })
    : null

// Create gRPC client
const client = transport ? createPromiseClient(InsightService, transport) : null

// Map ecosystem string to Ecosystem enum
function getEcosystemEnum(ecosystem: string): Ecosystem {
  const ecosystemMap: Record<string, Ecosystem> = {
    npm: Ecosystem.NPM,
    pypi: Ecosystem.PYPI,
    maven: Ecosystem.MAVEN,
    cargo: Ecosystem.CARGO,
    nuget: Ecosystem.NUGET,
    go: Ecosystem.GO,
  }
  return ecosystemMap[ecosystem.toLowerCase()] || Ecosystem.UNSPECIFIED
}

export async function GET(
  request: NextRequest,
  {
    params,
  }: { params: Promise<{ ecosystem: string; name: string; version: string }> }
) {
  try {
    const { ecosystem, name, version } = await params

    if (!ecosystem || !name || !version) {
      return NextResponse.json(
        {
          error:
            "Missing required parameters: ecosystem, name, and version are required",
        },
        { status: 400 }
      )
    }

    // Check if client is available
    if (!client) {
      return NextResponse.json(
        {
          error:
            "SafeDep API client not configured. Please set SAFEDEP_API_KEY and SAFEDEP_TENANT_ID in .env",
        },
        { status: 500 }
      )
    }

    // Get ecosystem enum
    const ecosystemEnum = getEcosystemEnum(ecosystem)
    if (ecosystemEnum === Ecosystem.UNSPECIFIED) {
      return NextResponse.json(
        {
          error: `Unsupported ecosystem: ${ecosystem}. Supported ecosystems: npm, pypi, maven, cargo, nuget, go`,
        },
        { status: 400 }
      )
    }

    // Make gRPC call to SafeDep Insights API
    const response: any = await client.getPackageVersionInsight({
      packageVersion: {
        package: {
          ecosystem: ecosystemEnum,
          name,
        },
        version,
      },
    })

    // Convert protobuf response to JSON
    const insightsJson = response.toJson() as any

    // Transform the response to match our expected format
    const packageData: PackageData = {
      ecosystem,
      name,
      version,
      insights: {
        package_info: {
          ecosystem,
          name,
          version,
        },
        vulnerabilities: insightsJson.vulnerabilities || [],
        scorecard: insightsJson.scorecard || {},
        licenses: insightsJson.licenses || [],
      },
    }

    return NextResponse.json(packageData)
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch package data from SafeDep API",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
