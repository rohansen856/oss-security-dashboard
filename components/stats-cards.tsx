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
    <div className={`rounded-lg border p-6 ${highlight ? "border-teal-200 bg-white" : "border-slate-200 bg-white"}`}>
      <div className="mb-3 flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className={`text-3xl font-bold ${highlight ? "text-teal-600" : "text-slate-900"}`}>{value}</div>
    </div>
  )
}

export default function StatsCards({ version, vulnerabilities, scorecard, license, ecosystem }: StatsProps) {
  return (
    <div className="grid grid-cols-5 gap-4">
      <StatCard icon={<Package className="h-4 w-4" />} label="Version" value={version} />
      <StatCard
        icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
        label="Vulnerabilities"
        value={vulnerabilities}
      />
      <StatCard
        icon={<Shield className="h-4 w-4 text-teal-600" />}
        label="OpenSSF Scorecard"
        value={`${scorecard}/10`}
        highlight={true}
      />
      <StatCard icon={<Scale className="h-4 w-4" />} label="License" value={license} />
      <StatCard icon={<Zap className="h-4 w-4" />} label="Ecosystem" value={ecosystem} />
    </div>
  )
}
