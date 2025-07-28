"use client"

import { useEffect, useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useDataStore } from "@/lib/data-store"
import { dummyTrafficSourcesData } from "@/lib/chart-data"

export function TrafficSourcesChart() {
  const { trafficSources } = useDataStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="h-[200px] w-full flex items-center justify-center bg-slate-900/50 rounded-lg border border-slate-700">
          <div className="text-slate-400">Loading traffic chart...</div>
        </div>
      </div>
    )
  }

  // Combine dummy data with user input data
  const combinedData = [...dummyTrafficSourcesData]

  // Update with user data if available
  trafficSources.forEach((userSource) => {
    const existingIndex = combinedData.findIndex((item) => item.name === userSource.name)
    if (existingIndex >= 0 && userSource.value > 0) {
      combinedData[existingIndex] = userSource
    }
  })

  const activeTrafficSources = combinedData.filter((source) => source.value > 0)

  return (
    <div className="space-y-4">
      <ChartContainer
        config={{
          value: {
            label: "Traffic %",
          },
        }}
        className="h-[200px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={activeTrafficSources}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {activeTrafficSources.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip
              content={<ChartTooltipContent />}
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="space-y-3">
        {combinedData.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-slate-300 font-medium">{item.name}</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-slate-200">{item.value}%</div>
              <div className="text-xs text-slate-400">{item.users.toLocaleString()} users</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
