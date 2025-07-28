"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useDataStore } from "@/lib/data-store"
import { dummyRevenueData } from "@/lib/chart-data"

export function RevenueChart() {
  const { revenueData } = useDataStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center bg-slate-900/50 rounded-lg border border-slate-700">
        <div className="text-slate-400">Loading revenue chart...</div>
      </div>
    )
  }

  // Combine dummy data with user input data
  const combinedData = [...dummyRevenueData, ...revenueData]
  const maxRevenue = Math.max(...combinedData.map((d) => d.revenue), 10000)

  return (
    <ChartContainer
      config={{
        revenue: {
          label: "Revenue",
          color: "#3b82f6",
        },
        profit: {
          label: "Profit",
          color: "#10b981",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={combinedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis
            dataKey="month"
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
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            domain={[0, maxRevenue]}
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
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-revenue)",
              strokeWidth: 2,
              r: 4,
            }}
            activeDot={{
              r: 6,
              stroke: "var(--color-revenue)",
              strokeWidth: 2,
              fill: "var(--color-revenue)",
            }}
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="var(--color-profit)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-profit)",
              strokeWidth: 2,
              r: 4,
            }}
            activeDot={{
              r: 6,
              stroke: "var(--color-profit)",
              strokeWidth: 2,
              fill: "var(--color-profit)",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
