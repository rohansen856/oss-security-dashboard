import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { InsightsResponse } from "@/lib/types"

interface VulnerabilitiesTabProps {
  vulnerabilities: NonNullable<InsightsResponse["vulnerabilities"]>
}

function RiskBadge({ risk }: { risk?: string }) {
  // Extract risk level from format like "RISK_CRITICAL" -> "Critical"
  const riskLevel = risk?.replace("RISK_", "").toLowerCase() || "unspecified"
  const displayRisk = riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)

  const colors: Record<string, string> = {
    low: "bg-blue-100 text-blue-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-orange-100 text-orange-700",
    critical: "bg-red-100 text-red-700",
    unspecified: "bg-slate-100 text-slate-700",
  }

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
        colors[riskLevel] || colors.unspecified
      }`}
    >
      {displayRisk}
    </span>
  )
}

export default function VulnerabilitiesTab({
  vulnerabilities,
}: VulnerabilitiesTabProps) {
  if (vulnerabilities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">
          No vulnerabilities found for this package.
        </p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-slate-200 hover:bg-transparent">
          <TableHead className="text-slate-700">Vulnerability ID</TableHead>
          <TableHead className="text-slate-700">Summary</TableHead>
          <TableHead className="text-slate-700">Risk</TableHead>
          <TableHead className="text-slate-700">Published</TableHead>
          <TableHead className="text-slate-700">Modified</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vulnerabilities.map((vuln, index) => {
          const vulnId =
            typeof vuln.id === "object" && vuln.id !== null
              ? (vuln.id as any).value
              : vuln.id

          // Extract risk from severities array
          const risk = (vuln as any).severities?.[0]?.risk || ""

          return (
            <TableRow key={vulnId || index} className="border-slate-200">
              <TableCell className="font-mono text-xs text-slate-600">
                {vulnId || "N/A"}
              </TableCell>
              <TableCell className="text-sm text-slate-600 max-w-md">
                <div
                  className="truncate"
                  title={vuln.summary || vuln.details || ""}
                >
                  {vuln.summary || vuln.details || "No description available"}
                </div>
              </TableCell>
              <TableCell>
                <RiskBadge risk={risk} />
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                {(vuln as any).publishedAt
                  ? new Date((vuln as any).publishedAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )
                  : vuln.published_at
                  ? new Date(vuln.published_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "N/A"}
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                {(vuln as any).modifiedAt
                  ? new Date((vuln as any).modifiedAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )
                  : "N/A"}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
