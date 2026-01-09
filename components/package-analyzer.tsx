"use client"

import { useState, useEffect } from "react"
import { Github, AlertCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import PackageHeader from "@/components/package-header"
import StatsCards from "@/components/stats-cards"
import ContentTabs from "@/components/content-tabs"
import type { PackageData } from "@/lib/types"

interface PackageAnalyzerProps {
  ecosystem: string
  name: string
  version: string
}

export default function PackageAnalyzer({
  ecosystem,
  name,
  version,
}: PackageAnalyzerProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [packageData, setPackageData] = useState<PackageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPackageData() {
      try {
        setLoading(true)
        setError(null)
        setErrorDetails(null)

        const response = await fetch(
          `/api/package/${ecosystem}/${encodeURIComponent(name)}/${version}`
        )

        if (!response.ok) {
          const errorData = await response.json()
          setError(errorData.error || "Failed to fetch package data")
          setErrorDetails(errorData.details || null)
          return
        }

        const data: PackageData = await response.json()
        setPackageData(data)
      } catch (err) {
        console.error("Error fetching package data:", err)
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        )
      } finally {
        setLoading(false)
      }
    }

    fetchPackageData()
  }, [ecosystem, name, version])

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="px-6 py-4">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-teal-600">
                <span className="text-sm font-bold text-white">S</span>
              </div>
              <span className="text-sm font-semibold text-slate-700">
                SafeDep
              </span>
            </div>
            <Button
              variant="default"
              className="gap-2 bg-teal-600 hover:bg-teal-700"
            >
              <Github className="h-4 w-4" />
              Install GitHub App
            </Button>
          </div>
        </div>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
            <p className="text-slate-600">Loading package data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !packageData) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="px-6 py-4 bg-white border-b">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-teal-600">
                <span className="text-sm font-bold text-white">S</span>
              </div>
              <span className="text-sm font-semibold text-slate-700">
                SafeDep
              </span>
            </div>
            <Button
              variant="default"
              className="gap-2 bg-teal-600 hover:bg-teal-700"
            >
              <Github className="h-4 w-4" />
              Install GitHub App
            </Button>
          </div>
        </div>
        <div className="px-6 py-12">
          <div className="mx-auto max-w-3xl">
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="text-lg font-semibold">
                {error || "Package Not Found"}
              </AlertTitle>
              <AlertDescription className="mt-2 text-base">
                {errorDetails ||
                  "Failed to load package data. Please try again later."}
              </AlertDescription>
            </Alert>

            <div className="bg-white rounded-lg border p-6 space-y-4">
              <h3 className="font-semibold text-lg">What you searched for:</h3>
              <div className="bg-slate-50 rounded p-4 font-mono text-sm">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-slate-500">Ecosystem:</span>
                    <div className="font-semibold mt-1">{ecosystem}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Package:</span>
                    <div className="font-semibold mt-1">{name}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Version:</span>
                    <div className="font-semibold mt-1">{version}</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3">Suggestions:</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-600">
                  <li>Verify the package name is spelled correctly</li>
                  <li>
                    Check if the version exists in the {ecosystem} registry
                  </li>
                  <li>Ensure you selected the correct ecosystem</li>
                  <li>Try a different version of the package</li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={() => router.push("/")} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Search
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Extract stats from API data
  const vulnerabilitiesCount =
    packageData.insights?.vulnerabilities?.length || 0
  const scorecardScore = packageData.insights?.scorecard?.score || 0
  const primaryLicense =
    packageData.insights?.licenses?.[0]?.spdx_id ||
    packageData.insights?.licenses?.[0]?.name ||
    "Unknown"
  const analyzedDate = packageData.insights?.metadata?.analyzed_at
    ? new Date(packageData.insights.metadata.analyzed_at).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      )
    : "N/A"
  const sourceUrl = packageData.insights?.metadata?.source_url || ""
  const sha256 = packageData.insights?.metadata?.sha256 || ""

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header with Logo and CTA */}
      <div className="px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-teal-600">
              <span className="text-sm font-bold text-white">S</span>
            </div>
            <span className="text-sm font-semibold text-slate-700">
              SafeDep
            </span>
          </div>
          <Button
            variant="default"
            className="gap-2 bg-teal-600 hover:bg-teal-700"
          >
            <Github className="h-4 w-4" />
            Install GitHub App
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Package Header */}
          <PackageHeader
            name={packageData.name}
            version={packageData.version}
            ecosystem={packageData.ecosystem}
            analyzedDate={analyzedDate}
            sourceUrl={sourceUrl}
            sha256={sha256}
          />

          {/* Stats Cards */}
          <StatsCards
            version={packageData.version}
            vulnerabilities={vulnerabilitiesCount}
            scorecard={scorecardScore}
            license={primaryLicense}
            ecosystem={packageData.ecosystem}
          />

          {/* Tabs and Content */}
          <ContentTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            packageData={packageData}
          />
        </div>
      </div>
    </div>
  )
}
