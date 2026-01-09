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

// Popular license reference URLs
const LICENSE_URLS: Record<string, string> = {
  MIT: "https://opensource.org/licenses/MIT",
  "Apache-2.0": "https://www.apache.org/licenses/LICENSE-2.0",
  "Apache 2.0": "https://www.apache.org/licenses/LICENSE-2.0",
  "GPL-3.0": "https://www.gnu.org/licenses/gpl-3.0.html",
  "GPL-2.0": "https://www.gnu.org/licenses/old-licenses/gpl-2.0.html",
  "BSD-3-Clause": "https://opensource.org/licenses/BSD-3-Clause",
  "BSD-2-Clause": "https://opensource.org/licenses/BSD-2-Clause",
  ISC: "https://opensource.org/licenses/ISC",
  "LGPL-3.0": "https://www.gnu.org/licenses/lgpl-3.0.html",
  "LGPL-2.1": "https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html",
  "MPL-2.0": "https://www.mozilla.org/en-US/MPL/2.0/",
  "EPL-2.0": "https://www.eclipse.org/legal/epl-2.0/",
  "AGPL-3.0": "https://www.gnu.org/licenses/agpl-3.0.html",
  "CC0-1.0": "https://creativecommons.org/publicdomain/zero/1.0/",
  Unlicense: "https://unlicense.org/",
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
          <TableHead className="text-slate-700 w-1/2">License ID</TableHead>
          <TableHead className="text-slate-700 w-1/4">License Name</TableHead>
          <TableHead className="text-slate-700 w-1/2">Reference URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {licenses.map((license, index) => {
          const licenseId = (license as any).licenseId || license.spdx_id
          const licenseName = license.name || licenseId || "Unknown"
          // Try to get URL from license object, or use predefined URL for popular licenses
          const referenceUrl =
            license.url ||
            LICENSE_URLS[licenseId || ""] ||
            LICENSE_URLS[licenseName]

          return (
            <TableRow key={licenseId || index} className="border-slate-200">
              <TableCell className="font-mono text-sm font-medium text-slate-900">
                {licenseId || "N/A"}
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                {licenseName}
              </TableCell>
              <TableCell>
                {referenceUrl ? (
                  <a
                    href={referenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-teal-600 hover:underline"
                  >
                    {referenceUrl}
                  </a>
                ) : (
                  <span className="text-sm text-slate-400">N/A</span>
                )}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
