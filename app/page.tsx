import PackageAnalyzer from "@/components/package-analyzer"

export default function Home() {
  // Using a default package for demonstration
  return <PackageAnalyzer ecosystem="npm" name="next" version="15.0.0" />
}
