import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { PackageData } from "@/lib/types"
import Link from "next/link"

interface VersionsTabProps {
  packageData: PackageData
}

export default function VersionsTab({ packageData }: VersionsTabProps) {
  // Get available versions from the API data
  const availableVersions =
    (packageData.insights as any)?.availableVersions || []

  // Determine the latest version (usually the current package version)
  const currentVersion = packageData.version

  if (availableVersions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">
          No version information available for this package.
        </p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-slate-200 hover:bg-transparent">
          <TableHead className="text-slate-700">Version</TableHead>
          <TableHead className="text-slate-700">Published On</TableHead>
          <TableHead className="text-right text-slate-700">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {availableVersions.map((item: any) => {
          const isLatest = item.version === currentVersion
          const publishedDate = item.publishedAt
            ? new Date(item.publishedAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "N/A"

          return (
            <TableRow key={item.version} className="border-slate-200">
              <TableCell className="flex items-center gap-2">
                <span className="font-mono text-sm font-medium text-slate-900">
                  {item.version}
                </span>
                {isLatest && (
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-700"
                  >
                    Latest
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                {publishedDate}
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/p/${packageData.ecosystem}/${packageData.name}/${item.version}`}
                  className="text-sm font-medium text-teal-600 hover:underline"
                >
                  View Version
                </Link>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
