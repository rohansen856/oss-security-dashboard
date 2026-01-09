import type { PackageData } from "@/lib/types"

interface OverviewTabProps {
  packageData: PackageData
}

export default function OverviewTab({ packageData }: OverviewTabProps) {
  const malysisAnalysis = packageData.malysis?.analysis
  const malysisSignals = packageData.malysis?.signals || []
  const scorecardChecks = packageData.insights?.scorecard?.checks || []

  return (
    <div className="space-y-8">
      {/* Malysis Summary Section */}
      {malysisAnalysis?.summary && (
        <div className="border-l-4 border-teal-600 pl-6">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Malicious Package Analysis Summary
          </h2>
          <p className="mb-3 text-sm text-slate-600">
            This analysis was performed using vet and SafeDep Cloud Malicious
            Package Analysis.
          </p>
          <p className="text-sm text-slate-600">{malysisAnalysis.summary}</p>
          {malysisAnalysis.is_malicious && (
            <div className="mt-4 rounded-md bg-red-50 p-4">
              <p className="text-sm font-semibold text-red-800">
                ⚠️ Warning: This package may be malicious
              </p>
              <p className="text-sm text-red-700">
                Confidence: {malysisAnalysis.confidence || "Unknown"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Verification Record */}
      {malysisAnalysis?.verification_record && (
        <div className="border-l-4 border-slate-300 pl-6">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Verification Record
          </h2>
          <p className="text-sm text-slate-600">
            {malysisAnalysis.verification_record}
          </p>
        </div>
      )}

      {/* Details Section */}
      {malysisAnalysis?.details && (
        <div className="border-l-4 border-slate-300 pl-6">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Details</h2>
          <p className="text-sm text-slate-600">{malysisAnalysis.details}</p>
        </div>
      )}

      {/* Malysis Signals */}
      {malysisSignals.length > 0 && (
        <div className="border-l-4 border-yellow-500 pl-6">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Detection Signals
          </h2>
          <div className="space-y-3">
            {malysisSignals.map((signal, index) => (
              <div key={index} className="rounded-md bg-slate-50 p-3">
                <p className="mb-1 text-sm font-medium text-slate-900">
                  {signal.type} {signal.severity && `(${signal.severity})`}
                </p>
                {signal.description && (
                  <p className="text-sm text-slate-600">{signal.description}</p>
                )}
                {signal.file_path && (
                  <p className="mt-1 text-xs text-slate-500">
                    File: {signal.file_path}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scorecard Checks */}
      {scorecardChecks.length > 0 && (
        <div className="border-l-4 border-blue-500 pl-6">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Scorecard Checks
          </h2>
          <div className="space-y-3">
            {scorecardChecks.map((check, index) => (
              <div key={index} className="rounded-md bg-slate-50 p-3">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">
                    {check.name}
                  </p>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      (check.score || 0) >= 7
                        ? "bg-green-100 text-green-700"
                        : (check.score || 0) >= 4
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    Score: {check.score || 0}/10
                  </span>
                </div>
                {check.reason && (
                  <p className="text-sm text-slate-600">{check.reason}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Data Available */}
      {!malysisAnalysis?.summary && scorecardChecks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-500">
            No analysis data available for this package.
          </p>
        </div>
      )}
    </div>
  )
}
