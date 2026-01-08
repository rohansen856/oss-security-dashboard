import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const versions = [
  {
    version: "0.2.0",
    publishedOn: "08/10/2024",
    isLatest: true,
  },
  {
    version: "1.2.3",
    publishedOn: "08/13/2024",
    isLatest: false,
  },
  {
    version: "5.0.0",
    publishedOn: "08/14/2024",
    isLatest: false,
  },
  {
    version: "5.0.1",
    publishedOn: "08/15/2024",
    isLatest: false,
  },
  {
    version: "5.0.2",
    publishedOn: "08/16/2024",
    isLatest: false,
  },
]

export default function VersionsTab() {
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
        {versions.map((item) => (
          <TableRow key={item.version} className="border-slate-200">
            <TableCell className="flex items-center gap-2">
              <span className="font-mono text-sm font-medium text-slate-900">
                {item.version}
              </span>
              {item.isLatest && (
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700"
                >
                  Latest
                </Badge>
              )}
            </TableCell>
            <TableCell className="text-sm text-slate-600">
              {item.publishedOn}
            </TableCell>
            <TableCell className="text-right">
              <a
                href="#"
                className="text-sm font-medium text-teal-600 hover:underline"
              >
                View Version
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
