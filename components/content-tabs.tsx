"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OverviewTab from "./tabs/overview-tab"
import VulnerabilitiesTab from "./tabs/vulnerabilities-tab"
import VersionsTab from "./tabs/versions-tab"
import LicenseTab from "./tabs/license-tab"
import type { PackageData } from "@/lib/types"

interface ContentTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  packageData: PackageData
}

export default function ContentTabs({
  activeTab,
  setActiveTab,
  packageData,
}: ContentTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="overview" className="rounded-md">
          Overview
        </TabsTrigger>
        <TabsTrigger value="vulnerabilities" className="rounded-md">
          Vulnerabilities
        </TabsTrigger>
        <TabsTrigger value="versions" className="rounded-md">
          Versions
        </TabsTrigger>
        <TabsTrigger value="license" className="rounded-md">
          License
        </TabsTrigger>
      </TabsList>

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6">
        <TabsContent value="overview" className="m-0">
          <OverviewTab packageData={packageData} />
        </TabsContent>
        <TabsContent value="vulnerabilities" className="m-0">
          <VulnerabilitiesTab
            vulnerabilities={packageData.insights?.vulnerabilities || []}
          />
        </TabsContent>
        <TabsContent value="versions" className="m-0">
          <VersionsTab packageData={packageData} />
        </TabsContent>
        <TabsContent value="license" className="m-0">
          <LicenseTab licenses={packageData.insights?.licenses || []} />
        </TabsContent>
      </div>
    </Tabs>
  )
}
