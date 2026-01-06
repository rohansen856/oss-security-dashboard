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

function RiskBadge({ severity }: { severity?: string }) {
  const normalizedSeverity = severity?.toUpperCase() || "UNKNOWN"

  const colors: Record<string, string> = {
    LOW: "bg-blue-100 text-blue-700",
    MODERATE: "bg-yellow-100 text-yellow-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    HIGH: "bg-pink-100 text-pink-700",
    CRITICAL: "bg-red-100 text-red-700",
    UNKNOWN: "bg-slate-100 text-slate-700",
  }

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
        colors[normalizedSeverity] || colors.UNKNOWN
      }`}
    >
      {severity || "Unspecified"}
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
          <TableHead className="text-slate-700">Severity</TableHead>
          <TableHead className="text-slate-700">Fixed Version</TableHead>
          <TableHead className="text-slate-700">Published</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vulnerabilities.map((vuln, index) => (
          <TableRow key={vuln.id || index} className="border-slate-200">
            <TableCell className="font-mono text-xs text-slate-600">
              {vuln.id || "N/A"}
            </TableCell>
            <TableCell className="text-sm text-slate-600">
              {vuln.summary || vuln.details || "No description available"}
            </TableCell>
            <TableCell>
              <RiskBadge severity={vuln.severity} />
            </TableCell>
            <TableCell className="text-sm text-slate-600">
              {vuln.fixed_version || "N/A"}
            </TableCell>
            <TableCell className="text-sm text-slate-600">
              {vuln.published_at
                ? new Date(vuln.published_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "N/A"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
