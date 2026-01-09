"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Shield, Package, AlertTriangle } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [ecosystem, setEcosystem] = useState("npm")
  const [packageName, setPackageName] = useState("")
  const [version, setVersion] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (packageName && version) {
      router.push(`/p/${ecosystem}/${packageName}/${version}`)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Shield className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-teal-600">
            Security Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Analyze open source packages for security vulnerabilities, malware,
            and compliance issues using SafeDep API
          </p>
        </div>

        {/* Search Section */}
        <Card className="max-w-3xl mx-auto mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-teal-600">
              <Search className="h-5 w-5" />
              Analyze a Package
            </CardTitle>
            <CardDescription>
              Enter package details to get comprehensive security analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ecosystem</label>
                  <Select value={ecosystem} onValueChange={setEcosystem}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="npm">NPM</SelectItem>
                      <SelectItem value="pypi">PyPI</SelectItem>
                      <SelectItem value="maven">Maven</SelectItem>
                      <SelectItem value="cargo">Cargo</SelectItem>
                      <SelectItem value="nuget">NuGet</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Package Name</label>
                  <Input
                    placeholder="e.g., express"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Version</label>
                  <Input
                    placeholder="e.g., 4.18.2"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 duration-200"
                size="lg"
              >
                <Search className="mr-2 h-4 w-4" />
                Analyze Package
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-teal-600" />
                <CardTitle className="text-lg">Vulnerabilities</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Detect known security vulnerabilities with detailed CVE
                information and severity ratings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-teal-600" />
                <CardTitle className="text-lg">Malware Detection</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Identify malicious packages using static and dynamic analysis
                powered by SafeDep Malysis
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-teal-600" />
                <CardTitle className="text-lg">Scorecard Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View OpenSSF Scorecard metrics including security policies,
                dependencies, and best practices
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Example Links */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Try these examples:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/p/npm/express/4.18.2")}
            >
              npm/express@4.18.2
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/p/npm/react/18.2.0")}
            >
              npm/react@18.2.0
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/p/pypi/requests/2.31.0")}
            >
              pypi/requests@2.31.0
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
