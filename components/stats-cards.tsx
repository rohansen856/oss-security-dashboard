import type React from "react"
import { Package, AlertTriangle, Shield, Scale, Zap } from "lucide-react"

interface StatsProps {
  version: string
  vulnerabilities: number
  scorecard: number
  license: string
  ecosystem: string
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  highlight?: boolean
}

function StatCard({ icon, label, value, highlight }: StatCardProps) {
  return (
    <div
      className={`rounded-lg border p-6 ${
        highlight ? "border-teal-200 bg-white" : "border-slate-200 bg-white"
      }`}
    >
      <div className="mb-3 flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-sm font-medium tracking-wide">{label}</span>
      </div>
      <div
        className={`text-3xl font-bold ${
          highlight ? "text-teal-600" : "text-slate-900"
        }`}
      >
        {value}
      </div>
    </div>
  )
}

export default function StatsCards({
  version,
  vulnerabilities,
  scorecard,
  license,
  ecosystem,
}: StatsProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      <StatCard
        icon={<Package className="size-6 border rounded p-1 text-teal-600" />}
        label="Version"
        value={version}
      />
      <StatCard
        icon={
          <AlertTriangle className="size-6 border rounded p-1 text-red-500" />
        }
        label="Vulnerabilities"
        value={vulnerabilities}
      />
      <StatCard
        icon={<Shield className="size-6 border rounded p-1 text-teal-600" />}
        label="OpenSSF Scorecard"
        value={`${scorecard.toFixed(1)}/10`}
        highlight={true}
      />
      <StatCard
        icon={<Scale className="size-6 border rounded p-1 text-teal-600" />}
        label="License"
        value={license}
      />
      <StatCard
        icon={<Zap className="size-6 border rounded p-1 text-teal-600" />}
        label="Ecosystem"
        value={ecosystem}
      />
    </div>
  )
}
