"use client"

import { useDataStore } from "@/lib/data-store"
import { dummyRevenueData, dummyConversionsData, dummyTrafficSourcesData } from "@/lib/chart-data"

// Simple CSS-based charts using the real data store
export function SimpleRevenueChart() {
  const { revenueData } = useDataStore()

  // Combine dummy data with user input data
  const combinedData = [...dummyRevenueData, ...revenueData]
  const maxRevenue = Math.max(...combinedData.map((d) => d.revenue))

  return (
    <div className="h-[300px] w-full p-4">
      <div className="flex items-end justify-between h-full gap-2">
        {combinedData.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 group">
            <div className="relative w-full">
              {/* Revenue bar */}
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm transition-all duration-1000 ease-out group-hover:from-blue-600 group-hover:to-blue-500"
                style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
              />
              {/* Profit overlay */}
              <div
                className="absolute bottom-0 w-full bg-gradient-to-t from-green-500/60 to-green-400/60 rounded-t-sm transition-all duration-1000 ease-out"
                style={{ height: `${(item.profit / maxRevenue) * 100}%` }}
              />
            </div>
            <div className="text-xs text-slate-400 mt-2 font-medium">{item.month}</div>
            <div className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              ${(item.revenue / 1000).toFixed(0)}k
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SimpleConversionsChart() {
  const { conversionsData } = useDataStore()

  // Combine dummy data with user input data, avoiding duplicates
  const combinedData = [...dummyConversionsData]

  conversionsData.forEach((userItem) => {
    const existingIndex = combinedData.findIndex((item) => item.day === userItem.day)
    if (existingIndex >= 0) {
      combinedData[existingIndex] = userItem
    } else {
      combinedData.push(userItem)
    }
  })

  const maxConversions = Math.max(...combinedData.map((d) => d.conversions))

  return (
    <div className="h-[300px] w-full p-4">
      <div className="flex items-end justify-between h-full gap-3">
        {combinedData.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 group">
            <div
              className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-sm transition-all duration-1000 ease-out group-hover:from-green-600 group-hover:to-green-500 group-hover:scale-105"
              style={{ height: `${(item.conversions / maxConversions) * 100}%` }}
            />
            <div className="text-xs text-slate-400 mt-2 font-medium">{item.day}</div>
            <div className="text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
              {item.conversions}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SimpleTrafficChart() {
  const { trafficSources } = useDataStore()

  // Combine dummy data with user input data
  const combinedData = [...dummyTrafficSourcesData]

  trafficSources.forEach((userSource) => {
    const existingIndex = combinedData.findIndex((item) => item.name === userSource.name)
    if (existingIndex >= 0 && userSource.value > 0) {
      combinedData[existingIndex] = userSource
    }
  })

  const activeTrafficSources = combinedData.filter((source) => source.value > 0)

  return (
    <div className="space-y-4">
      <div className="h-[200px] w-full flex items-center justify-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {activeTrafficSources.map((item, index) => {
              const startAngle = activeTrafficSources.slice(0, index).reduce((sum, d) => sum + d.value * 3.6, 0)
              const endAngle = startAngle + item.value * 3.6
              const largeArcFlag = item.value > 50 ? 1 : 0

              const x1 = 50 + 35 * Math.cos((startAngle * Math.PI) / 180)
              const y1 = 50 + 35 * Math.sin((startAngle * Math.PI) / 180)
              const x2 = 50 + 35 * Math.cos((endAngle * Math.PI) / 180)
              const y2 = 50 + 35 * Math.sin((endAngle * Math.PI) / 180)

              return (
                <path
                  key={index}
                  d={`M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={item.color}
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                />
              )
            })}
            {/* Inner circle for donut effect */}
            <circle cx="50" cy="50" r="20" fill="rgba(0,0,0,0.1)" />
          </svg>
        </div>
      </div>

      <div className="space-y-2">
        {combinedData.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-slate-300">{item.name}</span>
            </div>
            <div className="text-right">
              <div className="font-medium text-slate-200">{item.value}%</div>
              <div className="text-xs text-slate-400">{item.users.toLocaleString()} users</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
