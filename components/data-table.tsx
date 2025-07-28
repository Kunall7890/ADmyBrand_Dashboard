"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowUpDown, Download } from "lucide-react"
import { exportToPDF } from "@/lib/pdf-export"
import { exportToExcel } from "@/lib/excel-export"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AdvancedFilters } from "@/components/advanced-filters"
import { useDataStore } from "@/lib/data-store"
import { dummyCampaignData } from "@/lib/chart-data"

const campaigns = [
  {
    id: 1,
    name: "Summer Sale Campaign",
    status: "Active",
    impressions: 125000,
    clicks: 3200,
    conversions: 156,
    ctr: 2.56,
    cost: 1250.0,
  },
  {
    id: 2,
    name: "Brand Awareness Q4",
    status: "Paused",
    impressions: 89000,
    clicks: 2100,
    conversions: 89,
    ctr: 2.36,
    cost: 890.0,
  },
  {
    id: 3,
    name: "Holiday Promotion",
    status: "Active",
    impressions: 156000,
    clicks: 4200,
    conversions: 234,
    ctr: 2.69,
    cost: 1560.0,
  },
  {
    id: 4,
    name: "Product Launch",
    status: "Completed",
    impressions: 78000,
    clicks: 1800,
    conversions: 92,
    ctr: 2.31,
    cost: 780.0,
  },
  {
    id: 5,
    name: "Retargeting Campaign",
    status: "Active",
    impressions: 45000,
    clicks: 1200,
    conversions: 78,
    ctr: 2.67,
    cost: 450.0,
  },
]

export function DataTable() {
  const { campaigns } = useDataStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const [filters, setFilters] = useState<any>({
    dateRange: { from: undefined, to: undefined },
    status: [],
    campaign: "",
    minClicks: "",
    maxClicks: "",
    minConversions: "",
    maxConversions: "",
  })

  // Combine dummy campaigns with user campaigns
  const allCampaigns = [...dummyCampaignData, ...campaigns]

  const filteredCampaigns = allCampaigns.filter((campaign) => {
    // Text search
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase())

    // Status filter
    const matchesStatus = filters.status.length === 0 || filters.status.includes(campaign.status)

    // Campaign name filter
    const matchesCampaign = !filters.campaign || campaign.name.toLowerCase().includes(filters.campaign.toLowerCase())

    // Clicks range filter
    const matchesClicksMin = !filters.minClicks || campaign.clicks >= Number.parseInt(filters.minClicks)
    const matchesClicksMax = !filters.maxClicks || campaign.clicks <= Number.parseInt(filters.maxClicks)

    // Conversions range filter
    const matchesConversionsMin =
      !filters.minConversions || campaign.conversions >= Number.parseInt(filters.minConversions)
    const matchesConversionsMax =
      !filters.maxConversions || campaign.conversions <= Number.parseInt(filters.maxConversions)

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCampaign &&
      matchesClicksMin &&
      matchesClicksMax &&
      matchesConversionsMin &&
      matchesConversionsMax
    )
  })

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (!sortField) return 0

    const aValue = a[sortField as keyof typeof a]
    const bValue = b[sortField as keyof typeof b]

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      Active: {
        variant: "default" as const,
        className: "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30",
      },
      Paused: {
        variant: "secondary" as const,
        className: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
      },
      Completed: {
        variant: "outline" as const,
        className: "bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30",
      },
    }
    const config = variants[status as keyof typeof variants]
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    )
  }

  const handleExport = (format: "pdf" | "excel") => {
    const exportData = sortedCampaigns.map((campaign) => ({
      "Campaign Name": campaign.name,
      Status: campaign.status,
      Impressions: campaign.impressions,
      Clicks: campaign.clicks,
      Conversions: campaign.conversions,
      "CTR (%)": campaign.ctr,
      "Cost ($)": campaign.cost,
    }))

    if (format === "pdf") {
      exportToPDF(exportData, "campaign-performance", "Campaign Performance Report")
    } else {
      exportToExcel(exportData, "campaign-performance", "Campaign Data")
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20 dark:bg-gray-900/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Campaign Performance
            </CardTitle>
            <CardDescription>Detailed performance metrics for all campaigns (dummy + your data)</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <AdvancedFilters onFiltersChange={setFilters} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/10 backdrop-blur-xl border-white/20">
                <DropdownMenuItem onClick={() => handleExport("pdf")}>Export as PDF</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("excel")}>Export as Excel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 backdrop-blur-md border-white/20 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all duration-300"
          />
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/20 hover:bg-white/5">
                <TableHead className="font-semibold">Campaign Name</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-white/10 transition-colors font-semibold"
                  onClick={() => handleSort("impressions")}
                >
                  <div className="flex items-center gap-1">
                    Impressions
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-white/10 transition-colors font-semibold"
                  onClick={() => handleSort("clicks")}
                >
                  <div className="flex items-center gap-1">
                    Clicks
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-white/10 transition-colors font-semibold"
                  onClick={() => handleSort("conversions")}
                >
                  <div className="flex items-center gap-1">
                    Conversions
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold">CTR</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-white/10 transition-colors font-semibold"
                  onClick={() => handleSort("cost")}
                >
                  <div className="flex items-center gap-1">
                    Cost
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCampaigns.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-white/10 transition-colors border-white/10">
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell className="font-mono">{campaign.impressions.toLocaleString()}</TableCell>
                  <TableCell className="font-mono">{campaign.clicks.toLocaleString()}</TableCell>
                  <TableCell className="font-mono">{campaign.conversions}</TableCell>
                  <TableCell className="font-mono">{campaign.ctr}%</TableCell>
                  <TableCell className="font-mono">${campaign.cost.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
