"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useDataStore } from "@/lib/data-store"
import { dummyConversionsData } from "@/lib/chart-data"

export function ConversionsChart() {
  const { conversionsData } = useDataStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center bg-slate-900/50 rounded-lg border border-slate-700">
        <div className="text-slate-400">Loading conversions chart...</div>
      </div>
    )
  }

  // Combine dummy data with user input data, avoiding duplicates by day
  const combinedData = [...dummyConversionsData]

  // Add user data, replacing dummy data for same days
  conversionsData.forEach((userItem) => {
    const existingIndex = combinedData.findIndex((item) => item.day === userItem.day)
    if (existingIndex >= 0) {
      combinedData[existingIndex] = userItem
    } else {
      combinedData.push(userItem)
    }
  })

  const maxConversions = Math.max(...combinedData.map((d) => d.conversions), 80)

  return (
    <ChartContainer
      config={{
        conversions: {
          label: "Conversions",
          color: "#10b981",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={combinedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <XAxis
            dataKey="day"
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#94a3b8" }}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#94a3b8" }}
            domain={[0, maxConversions]}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              borderRadius: "8px",
              color: "#f1f5f9",
            }}
          />
          <Bar dataKey="conversions" fill="var(--color-conversions)" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
