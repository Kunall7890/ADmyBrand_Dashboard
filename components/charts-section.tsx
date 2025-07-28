"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RevenueChart } from "@/components/revenue-chart"
import { ConversionsChart } from "@/components/conversions-chart"
import { TrafficSourcesChart } from "@/components/traffic-sources-chart"
import { SimpleRevenueChart, SimpleConversionsChart, SimpleTrafficChart } from "@/components/simple-charts"
import { useState, useEffect } from "react"

export function ChartsSection() {
  const [useSimpleCharts, setUseSimpleCharts] = useState(false)

  useEffect(() => {
    // Check if Recharts is having issues and fallback to simple charts
    const timer = setTimeout(() => {
      const chartElements = document.querySelectorAll(".recharts-wrapper")
      if (chartElements.length === 0) {
        setUseSimpleCharts(true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Revenue Chart - Takes 2 columns */}
      <Card className="md:col-span-2 bg-slate-900/50 backdrop-blur-xl border-slate-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
        <CardHeader className="pb-4">
          <CardTitle className="text-slate-200 text-lg font-semibold">
            Monthly revenue trends for the past 12 months
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">{useSimpleCharts ? <SimpleRevenueChart /> : <RevenueChart />}</CardContent>
      </Card>

      {/* Traffic Sources Chart */}
      <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
        <CardHeader className="pb-4">
          <CardTitle className="text-slate-200 text-lg font-semibold">Distribution of traffic by source</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">{useSimpleCharts ? <SimpleTrafficChart /> : <TrafficSourcesChart />}</CardContent>
      </Card>

      {/* Conversions Chart - Full width */}
      <Card className="md:col-span-2 lg:col-span-3 bg-slate-900/50 backdrop-blur-xl border-slate-700 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500">
        <CardHeader className="pb-4">
          <CardTitle className="text-slate-200 text-lg font-semibold">Conversion Rates</CardTitle>
          <CardDescription className="text-slate-400">Daily conversion rates over the past 30 days</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          {useSimpleCharts ? <SimpleConversionsChart /> : <ConversionsChart />}
        </CardContent>
      </Card>
    </div>
  )
}
