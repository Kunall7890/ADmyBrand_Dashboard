"use client"

import { useState, useEffect } from "react"
import { MetricsCards } from "@/components/metrics-cards"
import { ChartsSection } from "@/components/charts-section"
import { DataTable } from "@/components/data-table"
import { DataManagement } from "@/components/data-management"
import { MetricsCardsSkeleton, ChartSkeleton, TableSkeleton } from "@/components/loading-skeleton"
import { useDataStore } from "@/lib/data-store"

export function OverviewPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { isRealTimeActive, simulateRealTimeUpdate } = useDataStore()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Real-time simulation
  useEffect(() => {
    if (!isRealTimeActive) return

    const interval = setInterval(() => {
      simulateRealTimeUpdate()
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [isRealTimeActive, simulateRealTimeUpdate])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-200">Dashboard Overview</h1>
          <p className="text-slate-400">Loading your dashboard data...</p>
        </div>

        <MetricsCardsSkeleton />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2">
            <ChartSkeleton />
          </div>
          <ChartSkeleton />
          <div className="md:col-span-2 lg:col-span-3">
            <ChartSkeleton />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TableSkeleton />
          </div>
          <ChartSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-200">Dashboard Overview</h1>
          <p className="text-slate-400">
            {isRealTimeActive ? "🔴 Live data updates every 5 seconds" : "Add data to see real-time visualizations"}
          </p>
        </div>
      </div>

      <MetricsCards />

      <DataManagement />

      <ChartsSection />

      <div className="grid grid-cols-1 gap-6">
        <DataTable />
      </div>
    </div>
  )
}
