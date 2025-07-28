"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Eye, MousePointer, Clock, Target } from "lucide-react"
import { RevenueChart } from "@/components/revenue-chart"
import { ConversionsChart } from "@/components/conversions-chart"
import { TrafficSourcesChart } from "@/components/traffic-sources-chart"

const analyticsMetrics = [
  {
    title: "Page Views",
    value: "1,234,567",
    change: "+12.5%",
    trend: "up",
    icon: Eye,
    period: "Last 30 days",
  },
  {
    title: "Unique Visitors",
    value: "456,789",
    change: "+8.2%",
    trend: "up",
    icon: MousePointer,
    period: "Last 30 days",
  },
  {
    title: "Avg. Session Duration",
    value: "3m 42s",
    change: "-2.1%",
    trend: "down",
    icon: Clock,
    period: "Last 30 days",
  },
  {
    title: "Goal Completions",
    value: "23,456",
    change: "+15.7%",
    trend: "up",
    icon: Target,
    period: "Last 30 days",
  },
]

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground">Deep dive into your website performance and user behavior.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {analyticsMetrics.map((metric, index) => (
          <Card
            key={index}
            className="relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 bg-white/10 backdrop-blur-xl border-white/20 dark:bg-gray-900/20 hover:scale-105"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                <metric.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {metric.value}
              </div>
              <div className="flex items-center justify-between mt-2">
                <Badge
                  variant={metric.trend === "up" ? "default" : "destructive"}
                  className={`flex items-center gap-1 ${
                    metric.trend === "up"
                      ? "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30"
                      : "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30"
                  }`}
                >
                  {metric.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {metric.change}
                </Badge>
                <span className="text-xs text-muted-foreground">{metric.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 bg-slate-900/50 backdrop-blur-xl border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Revenue Trends</CardTitle>
            <CardDescription className="text-slate-400">Monthly revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Traffic Sources</CardTitle>
            <CardDescription className="text-slate-400">Distribution by source</CardDescription>
          </CardHeader>
          <CardContent>
            <TrafficSourcesChart />
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3 bg-slate-900/50 backdrop-blur-xl border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Conversion Rates</CardTitle>
            <CardDescription className="text-slate-400">Daily conversion performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ConversionsChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
