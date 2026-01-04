// SafeDep API Type Definitions

export interface InsightsResponse {
  package_info?: {
    ecosystem?: string
    name?: string
    version?: string
  }
  scorecard?: {
    score?: number
    checks?: Array<{
      name?: string
      score?: number
      reason?: string
      details?: string[]
    }>
  }
  licenses?: Array<{
    name?: string
    spdx_id?: string
    url?: string
  }>
  vulnerabilities?: Array<{
    id?: string
    severity?: string
    summary?: string
    details?: string
    fixed_version?: string
    published_at?: string
  }>
  metadata?: {
    analyzed_at?: string
    source_url?: string
    sha256?: string
  }
}

export interface MalysisResponse {
  package_info?: {
    ecosystem?: string
    name?: string
    version?: string
  }
  analysis?: {
    is_malicious?: boolean
    confidence?: string
    summary?: string
    details?: string
    verification_record?: string
  }
  signals?: Array<{
    type?: string
    severity?: string
    description?: string
    file_path?: string
  }>
}

export interface PackageData {
  ecosystem: string
  name: string
  version: string
  insights?: InsightsResponse
  malysis?: MalysisResponse
  error?: string
}

export interface PackageStats {
  version: string
  vulnerabilities: number
  scorecard: number
  license: string
  ecosystem: string
}
