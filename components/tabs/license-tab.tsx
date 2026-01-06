import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { InsightsResponse } from "@/lib/types"

interface LicenseTabProps {
  licenses: NonNullable<InsightsResponse["licenses"]>
}

export default function LicenseTab({ licenses }: LicenseTabProps) {
  if (licenses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">
          No license information available for this package.
        </p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-slate-200 hover:bg-transparent">
          <TableHead className="text-slate-700">License ID</TableHead>
          <TableHead className="text-slate-700">License Name</TableHead>
          <TableHead className="text-slate-700">Reference URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {licenses.map((license, index) => (
          <TableRow key={license.spdx_id || index} className="border-slate-200">
            <TableCell className="font-mono text-sm font-medium text-slate-900">
              {license.spdx_id || "N/A"}
            </TableCell>
            <TableCell className="text-sm text-slate-600">
              {license.name || "Unknown"}
            </TableCell>
            <TableCell>
              {license.url ? (
                <a
                  href={license.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-teal-600 hover:underline"
                >
                  {license.url}
                </a>
              ) : (
                <span className="text-sm text-slate-400">N/A</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
