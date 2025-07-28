"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Users, MousePointer, BarChart3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useDataStore } from "@/lib/data-store"
import { dummyTotalRevenue, dummyTotalConversions, dummyTotalUsers, dummyCampaignData } from "@/lib/chart-data"

export function MetricsCards() {
  const { revenueData, conversionsData, trafficSources, campaigns } = useDataStore()

  // Calculate metrics from combined data (dummy + user input)
  const userRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalRevenue = dummyTotalRevenue + userRevenue

  const userConversions = conversionsData.reduce((sum, item) => sum + item.conversions, 0)
  const totalConversions = dummyTotalConversions + userConversions

  // For traffic sources, use user data if available, otherwise dummy data
  const hasUserTrafficData = trafficSources.some((source) => source.value > 0)
  const totalUsers = hasUserTrafficData ? trafficSources.reduce((sum, item) => sum + item.users, 0) : dummyTotalUsers

  // For CTR, combine user campaigns with dummy campaigns
  const allCampaigns = [...dummyCampaignData, ...campaigns]
  const averageCTR =
    allCampaigns.length > 0 ? allCampaigns.reduce((sum, item) => sum + item.ctr, 0) / allCampaigns.length : 0

  const metrics = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      description: "from last month",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Active Users",
      value: totalUsers.toLocaleString(),
      change: "+180.1%",
      trend: "up",
      icon: Users,
      description: "from last month",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      title: "Conversions",
      value: totalConversions.toString(),
      change: "+19%",
      trend: "up",
      icon: MousePointer,
      description: "from last month",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "Avg CTR",
      value: `${averageCTR.toFixed(2)}%`,
      change: "-4.3%",
      trend: "down",
      icon: BarChart3,
      description: "from last month",
      gradient: "from-orange-500 to-red-600",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 bg-slate-900/50 backdrop-blur-xl border-slate-700 hover:scale-105"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">{metric.title}</CardTitle>
            <div className={`p-2 rounded-xl bg-gradient-to-br ${metric.gradient} shadow-lg`}>
              <metric.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-200">{metric.value}</div>
            <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
              <Badge
                variant={metric.trend === "up" ? "default" : "destructive"}
                className={`flex items-center gap-1 ${
                  metric.trend === "up"
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-red-500/20 text-red-400 border-red-500/30"
                }`}
              >
                {metric.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {metric.change}
              </Badge>
              <span>{metric.description}</span>
            </div>
          </CardContent>
          <div
            className={`absolute inset-0 bg-gradient-to-r ${metric.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
          />
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
        </Card>
      ))}
    </div>
  )
}
