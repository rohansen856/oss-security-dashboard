import type { InsightsResponse, MalysisResponse } from "./types"

export const mockInsightsData: InsightsResponse = {
  package_info: {
    ecosystem: "npm",
    name: "next",
    version: "15.0.0",
  },
  scorecard: {
    score: 9.2,
    checks: [
      {
        name: "Code-Review",
        score: 10,
        reason: "All changes reviewed by maintainers",
        details: ["PRs require approval", "Consistent review process"],
      },
      {
        name: "Maintained",
        score: 10,
        reason: "Project is actively maintained",
        details: ["Regular commits", "Active issue management"],
      },
      {
        name: "CI-Tests",
        score: 10,
        reason: "Comprehensive CI/CD pipeline",
        details: ["Automated testing", "Multiple test suites"],
      },
      {
        name: "SAST",
        score: 8,
        reason: "Static analysis tools in use",
        details: ["ESLint configured", "Type checking enabled"],
      },
      {
        name: "Dependency-Update-Tool",
        score: 10,
        reason: "Automated dependency updates",
        details: ["Dependabot configured"],
      },
    ],
  },
  licenses: [
    {
      name: "MIT License",
      spdx_id: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  ],
  vulnerabilities: [
    {
      id: "GHSA-9hjq-9r4m-mvj7",
      severity: "LOW",
      summary: "Next.js cache poisoning vulnerability in certain edge cases",
      details:
        "A potential cache poisoning vulnerability exists in specific edge runtime configurations.",
      fixed_version: "15.0.1",
      published_at: "2024-10-15T10:00:00Z",
    },
    {
      id: "GHSA-3abc-xyz1-2def",
      severity: "MEDIUM",
      summary: "Server-side request forgery in development mode",
      details:
        "SSRF vulnerability affects development server only, not production builds.",
      fixed_version: "15.0.2",
      published_at: "2024-10-20T14:30:00Z",
    },
  ],
  metadata: {
    analyzed_at: new Date().toISOString(),
    source_url: "https://registry.npmjs.org/next/-/next-15.0.0.tgz",
    sha256: "5188d186e94a8d5470af6ed2725d209d8b2abc29cc7d6bedd58a748efd7e89f9",
  },
}

export const mockMalysisData: MalysisResponse = {
  package_info: {
    ecosystem: "npm",
    name: "next",
    version: "15.0.0",
  },
  analysis: {
    is_malicious: false,
    confidence: "HIGH",
    summary: "Package analysis completed. No malicious behavior detected.",
    details:
      "This package has been analyzed for malicious code patterns, suspicious network calls, and other security concerns. The analysis found no evidence of malicious intent. The package follows standard practices and has a clean security profile.",
    verification_record:
      "Manual verification confirmed that this is the official Next.js package from Vercel. The package has been widely adopted and maintained by a reputable organization.",
  },
  signals: [],
}
