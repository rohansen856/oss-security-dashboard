interface PackageHeaderProps {
  name: string
  version: string
  ecosystem: string
  analyzedDate: string
  sourceUrl: string
  sha256: string
}

export default function PackageHeader({
  name,
  version,
  ecosystem,
  analyzedDate,
  sourceUrl,
  sha256,
}: PackageHeaderProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      {/* Package Title */}
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 uppercase">
          {ecosystem}
        </span>
        <h1 className="text-2xl font-semibold text-slate-900">
          {name}@{version}
        </h1>
      </div>

      {/* Metadata */}
      <div className="space-y-2 text-sm text-slate-600">
        <p>
          <span className="font-medium">Analysed at</span> {analyzedDate}
        </p>
        {sourceUrl && (
          <p>
            <span className="font-medium">Source</span>{" "}
            <a
              href={sourceUrl}
              className="text-teal-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {sourceUrl}
            </a>
          </p>
        )}
        {sha256 && (
          <p>
            <span className="font-medium">SHA256</span>{" "}
            <code className="text-xs font-mono">{sha256}</code>
          </p>
        )}
      </div>
    </div>
  )
}
