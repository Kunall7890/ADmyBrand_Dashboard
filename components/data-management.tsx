"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDataStore } from "@/lib/data-store"
import { Plus, Play, Pause, RotateCcw, Database } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function DataManagement() {
  const {
    addRevenueData,
    addConversionData,
    updateTrafficSource,
    addCampaign,
    isRealTimeActive,
    toggleRealTime,
    clearAllData,
    initializeData,
    revenueData,
    conversionsData,
    trafficSources,
    campaigns,
  } = useDataStore()

  const [revenueForm, setRevenueForm] = useState({
    month: "",
    revenue: "",
    profit: "",
    expenses: "",
  })

  const [conversionForm, setConversionForm] = useState({
    day: "",
    conversions: "",
    clicks: "",
    impressions: "",
  })

  const [trafficForm, setTrafficForm] = useState({
    source: "",
    percentage: "",
    users: "",
  })

  const [campaignForm, setCampaignForm] = useState({
    name: "",
    status: "Active",
    impressions: "",
    clicks: "",
    conversions: "",
    cost: "",
  })

  const handleAddRevenue = (e: React.FormEvent) => {
    e.preventDefault()
    if (revenueForm.month && revenueForm.revenue) {
      addRevenueData({
        month: revenueForm.month,
        revenue: Number(revenueForm.revenue),
        profit: Number(revenueForm.profit) || Number(revenueForm.revenue) * 0.6,
        expenses: Number(revenueForm.expenses) || Number(revenueForm.revenue) * 0.4,
      })
      setRevenueForm({ month: "", revenue: "", profit: "", expenses: "" })
    }
  }

  const handleAddConversion = (e: React.FormEvent) => {
    e.preventDefault()
    if (conversionForm.day && conversionForm.conversions) {
      addConversionData({
        day: conversionForm.day,
        conversions: Number(conversionForm.conversions),
        clicks: Number(conversionForm.clicks) || Number(conversionForm.conversions) * 25,
        impressions: Number(conversionForm.impressions) || Number(conversionForm.conversions) * 400,
      })
      setConversionForm({ day: "", conversions: "", clicks: "", impressions: "" })
    }
  }

  const handleUpdateTraffic = (e: React.FormEvent) => {
    e.preventDefault()
    if (trafficForm.source && trafficForm.percentage) {
      updateTrafficSource(trafficForm.source, Number(trafficForm.percentage), Number(trafficForm.users) || 0)
      setTrafficForm({ source: "", percentage: "", users: "" })
    }
  }

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault()
    if (campaignForm.name && campaignForm.impressions) {
      const clicks = Number(campaignForm.clicks)
      const impressions = Number(campaignForm.impressions)
      const conversions = Number(campaignForm.conversions)

      addCampaign({
        name: campaignForm.name,
        status: campaignForm.status,
        impressions,
        clicks,
        conversions,
        ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
        cost: Number(campaignForm.cost),
        revenue: conversions * 50, // Assume $50 per conversion
      })
      setCampaignForm({ name: "", status: "Active", impressions: "", clicks: "", conversions: "", cost: "" })
    }
  }

  return (
    <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-200">Data Management</CardTitle>
            <CardDescription className="text-slate-400">Add real-time data to visualize in your charts</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isRealTimeActive ? "default" : "secondary"} className="bg-green-500/20 text-green-400">
              {isRealTimeActive ? "Live" : "Paused"}
            </Badge>
            <Button
              onClick={toggleRealTime}
              variant="outline"
              size="sm"
              className="bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              {isRealTimeActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRealTimeActive ? "Pause" : "Start"} Real-time
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6">
          <Button
            onClick={initializeData}
            variant="outline"
            size="sm"
            className="bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30"
          >
            <Database className="w-4 h-4 mr-2" />
            Load Sample Data
          </Button>
          <Button
            onClick={clearAllData}
            variant="outline"
            size="sm"
            className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear All Data
          </Button>
        </div>

        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList className="bg-slate-800 border-slate-600">
            <TabsTrigger value="revenue" className="data-[state=active]:bg-slate-700">
              Revenue
            </TabsTrigger>
            <TabsTrigger value="conversions" className="data-[state=active]:bg-slate-700">
              Conversions
            </TabsTrigger>
            <TabsTrigger value="traffic" className="data-[state=active]:bg-slate-700">
              Traffic
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-slate-700">
              Campaigns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-4">
            <form onSubmit={handleAddRevenue} className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="month" className="text-slate-300">
                  Month
                </Label>
                <Select
                  value={revenueForm.month}
                  onValueChange={(value) => setRevenueForm({ ...revenueForm, month: value })}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-slate-300">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                      (month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="revenue" className="text-slate-300">
                  Revenue ($)
                </Label>
                <Input
                  id="revenue"
                  type="number"
                  value={revenueForm.revenue}
                  onChange={(e) => setRevenueForm({ ...revenueForm, revenue: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-slate-300"
                  placeholder="5000"
                />
              </div>
              <div>
                <Label htmlFor="profit" className="text-slate-300">
                  Profit ($)
                </Label>
                <Input
                  id="profit"
                  type="number"
                  value={revenueForm.profit}
                  onChange={(e) => setRevenueForm({ ...revenueForm, profit: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-slate-300"
                  placeholder="Auto-calculated"
                />
              </div>
              <div>
                <Label htmlFor="expenses" className="text-slate-300">
                  Expenses ($)
                </Label>
                <Input
                  id="expenses"
                  type="number"
                  value={revenueForm.expenses}
                  onChange={(e) => setRevenueForm({ ...revenueForm, expenses: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-slate-300"
                  placeholder="Auto-calculated"
                />
              </div>
              <Button type="submit" className="col-span-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Revenue Data
              </Button>
            </form>
            <div className="text-sm text-slate-400">Current entries: {revenueData.length} (showing last 12 months)</div>
          </TabsContent>

          <TabsContent value="conversions" className="space-y-4">
            <form onSubmit={handleAddConversion} className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="day" className="text-slate-300">
                  Day
                </Label>
                <Select
                  value={conversionForm.day}
                  onValueChange={(value) => setConversionForm({ ...conversionForm, day: value })}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-slate-300">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="conversions" className="text-slate-300">
                  Conversions
                </Label>
                <Input
                  id="conversions"
                  type="number"
                  value={conversionForm.conversions}
                  onChange={(e) => setConversionForm({ ...conversionForm, conversions: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-slate-300"
                  placeholder="45"
                />
              </div>
              <div>
                <Label htmlFor="clicks" className="text-slate-300">
                  Clicks
                </Label>
                <Input
                  id="clicks"
                  type="number"
                  value={conversionForm.clicks}
                  onChange={(e) => setConversionForm({ ...conversionForm, clicks: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-slate-300"
                  placeholder="Auto-calculated"
                />
              </div>
              <div>
                <Label htmlFor="impressions" className="text-slate-300">
                  Impressions
                </Label>
                <Input
                  id="impressions"
                  type="number"
                  value={conversionForm.impressions}
                  onChange={(e) => setConversionForm({ ...conversionForm, impressions: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-slate-300"
                  placeholder="Auto-calculated"
                />
              </div>
              <Button type="submit" className="col-span-2 bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Conversion Data
              </Button>
            </form>
            <div className="text-sm text-slate-400">
              Current entries: {conversionsData.length} (showing last 7 days)
            </div>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-4">
            <form onSubmit={handleUpdateTraffic} className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="source" className="text-slate-300">
                  Traffic Source
                </Label>
                <Select
                  value={trafficForm.source}
                  onValueChange={(value) => setTrafficForm({ ...trafficForm, source: value })}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-slate-300">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {trafficSources.map((source) => (
                      <SelectItem key={source.name} value={source.name}>
                        {source.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="percentage" className="text-slate-300">
                  Percentage (%)
                </Label>
                <Input
                  id="percentage"
                  type="number"
                  min="0"
                  max="100"
                  value={trafficForm.percentage}
                  onChange={(e) => setTrafficForm({ ...trafficForm, percentage: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-slate-300"
                  placeholder="45"
                />
              </div>
              <div>
                <Label htmlFor="users" className="text-slate-300">
                  Users
                </Label>
                <Input
                  id="users"
                  type="number"
                  value={trafficForm.users}
                  onChange={(e) => setTrafficForm({ ...trafficForm, users: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-slate-300"
                  placeholder="22500"
                />
              </div>
              <Button type="submit" className="col-span-3 bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Update Traffic Source
              </Button>
            </form>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {trafficSources.map((source) => (
                <div key={source.name} className="flex items-center justify-between p-2 bg-slate-800 rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                    <span className="text-slate-300">{source.name}</span>
                  </div>
                  <span className="text-slate-200">{source.value}%</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-4">
            <form onSubmit={handleAddCampaign} className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-slate-300">
                  Campaign Name
                </Label>
                <Input
                  id="name"
                  value={campaignForm.name}
                  onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-slate-300"
                  placeholder="Summer Sale Campaign"
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-slate-300">
                  Status
                </Label>
                <Select
                  value={campaignForm.status}
                  onValueChange={(value) => setCampaignForm({ ...campaignForm, status: value })}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-slate-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="impressions" className="text-slate-300">
                  Impressions
                </Label>
                <Input
                  id="impressions"
                  type="number"
                  value={campaignForm.impressions}
                  onChange={(e) => setCampaignForm({ ...campaignForm, impressions: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-slate-300"
                  placeholder="125000"
                />
              </div>
              <div>
                <Label htmlFor="clicks" className="text-slate-300">
                  Clicks
                </Label>
                <Input
                  id="clicks"
                  type="number"
                  value={campaignForm.clicks}
                  onChange={(e) => setCampaignForm({ ...campaignForm, clicks: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-slate-300"
                  placeholder="3200"
                />
              </div>
              <div>
                <Label htmlFor="conversions" className="text-slate-300">
                  Conversions
                </Label>
                <Input
                  id="conversions"
                  type="number"
                  value={campaignForm.conversions}
                  onChange={(e) => setCampaignForm({ ...campaignForm, conversions: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-slate-300"
                  placeholder="156"
                />
              </div>
              <div>
                <Label htmlFor="cost" className="text-slate-300">
                  Cost ($)
                </Label>
                <Input
                  id="cost"
                  type="number"
                  value={campaignForm.cost}
                  onChange={(e) => setCampaignForm({ ...campaignForm, cost: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-slate-300"
                  placeholder="1250"
                />
              </div>
              <Button type="submit" className="col-span-2 bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Campaign
              </Button>
            </form>
            <div className="text-sm text-slate-400">Current campaigns: {campaigns.length}</div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
