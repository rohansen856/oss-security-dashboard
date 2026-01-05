import PackageAnalyzer from "@/components/package-analyzer"

interface PageProps {
  params: Promise<{
    ecosystem: string
    name: string
    version: string
  }>
}

export default async function PackagePage({ params }: PageProps) {
  const { ecosystem, name, version } = await params

  return <PackageAnalyzer ecosystem={ecosystem} name={name} version={version} />
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps) {
  const { ecosystem, name, version } = await params

  return {
    title: `${name}@${version} - ${ecosystem} Package Analysis | SafeDep`,
    description: `Security analysis for ${ecosystem} package ${name} version ${version}`,
  }
}
