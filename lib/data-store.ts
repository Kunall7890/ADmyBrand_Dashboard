"use client"

import { create } from "zustand"

export interface RevenueData {
  month: string
  revenue: number
  profit: number
  expenses: number
  timestamp: Date
}

export interface ConversionData {
  day: string
  conversions: number
  clicks: number
  impressions: number
  timestamp: Date
}

export interface TrafficSource {
  name: string
  value: number
  color: string
  users: number
  timestamp: Date
}

export interface CampaignData {
  id: number
  name: string
  status: string
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cost: number
  revenue: number
  timestamp: Date
}

interface DataStore {
  // Data arrays
  revenueData: RevenueData[]
  conversionsData: ConversionData[]
  trafficSources: TrafficSource[]
  campaigns: CampaignData[]

  // Real-time simulation
  isRealTimeActive: boolean

  // Actions
  addRevenueData: (data: Omit<RevenueData, "timestamp">) => void
  addConversionData: (data: Omit<ConversionData, "timestamp">) => void
  updateTrafficSource: (name: string, value: number, users: number) => void
  addCampaign: (data: Omit<CampaignData, "id" | "timestamp">) => void
  updateCampaign: (id: number, updates: Partial<CampaignData>) => void

  // Real-time controls
  toggleRealTime: () => void
  simulateRealTimeUpdate: () => void

  // Clear data
  clearAllData: () => void

  // Initialize with sample data
  initializeData: () => void
}

export const useDataStore = create<DataStore>((set, get) => ({
  // Initial empty state
  revenueData: [],
  conversionsData: [],
  trafficSources: [
    { name: "Organic Search", value: 0, color: "#3b82f6", users: 0, timestamp: new Date() },
    { name: "Direct", value: 0, color: "#10b981", users: 0, timestamp: new Date() },
    { name: "Social Media", value: 0, color: "#f59e0b", users: 0, timestamp: new Date() },
    { name: "Email", value: 0, color: "#f97316", users: 0, timestamp: new Date() },
  ],
  campaigns: [],
  isRealTimeActive: false,

  addRevenueData: (data) =>
    set((state) => ({
      revenueData: [...state.revenueData, { ...data, timestamp: new Date() }].slice(-12), // Keep last 12 months
    })),

  addConversionData: (data) =>
    set((state) => ({
      conversionsData: [...state.conversionsData, { ...data, timestamp: new Date() }].slice(-7), // Keep last 7 days
    })),

  updateTrafficSource: (name, value, users) =>
    set((state) => ({
      trafficSources: state.trafficSources.map((source) =>
        source.name === name ? { ...source, value, users, timestamp: new Date() } : source,
      ),
    })),

  addCampaign: (data) =>
    set((state) => ({
      campaigns: [
        ...state.campaigns,
        {
          ...data,
          id: Date.now(),
          timestamp: new Date(),
        },
      ],
    })),

  updateCampaign: (id, updates) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, ...updates, timestamp: new Date() } : campaign,
      ),
    })),

  toggleRealTime: () =>
    set((state) => ({
      isRealTimeActive: !state.isRealTimeActive,
    })),

  simulateRealTimeUpdate: () => {
    const state = get()

    // Simulate revenue update
    if (state.revenueData.length > 0) {
      const lastRevenue = state.revenueData[state.revenueData.length - 1]
      const variation = (Math.random() - 0.5) * 1000 // ±500 variation
      const newRevenue = Math.max(1000, lastRevenue.revenue + variation)

      state.addRevenueData({
        month: new Date().toLocaleDateString("en", { month: "short" }),
        revenue: Math.round(newRevenue),
        profit: Math.round(newRevenue * 0.6),
        expenses: Math.round(newRevenue * 0.4),
      })
    }

    // Simulate conversion update
    if (state.conversionsData.length > 0) {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      const randomDay = days[Math.floor(Math.random() * days.length)]
      const conversions = Math.floor(Math.random() * 40) + 30 // 30-70 range

      state.addConversionData({
        day: randomDay,
        conversions,
        clicks: conversions * 20 + Math.floor(Math.random() * 500),
        impressions: conversions * 300 + Math.floor(Math.random() * 5000),
      })
    }

    // Simulate traffic source updates
    const totalUsers = Math.floor(Math.random() * 10000) + 40000 // 40k-50k users
    let remaining = 100

    state.trafficSources.forEach((source, index) => {
      if (index === state.trafficSources.length - 1) {
        // Last source gets remaining percentage
        state.updateTrafficSource(source.name, remaining, Math.floor((totalUsers * remaining) / 100))
      } else {
        const percentage = Math.floor(Math.random() * (remaining - 5)) + 5
        remaining -= percentage
        state.updateTrafficSource(source.name, percentage, Math.floor((totalUsers * percentage) / 100))
      }
    })
  },

  clearAllData: () =>
    set({
      revenueData: [],
      conversionsData: [],
      trafficSources: [
        { name: "Organic Search", value: 0, color: "#3b82f6", users: 0, timestamp: new Date() },
        { name: "Direct", value: 0, color: "#10b981", users: 0, timestamp: new Date() },
        { name: "Social Media", value: 0, color: "#f59e0b", users: 0, timestamp: new Date() },
        { name: "Email", value: 0, color: "#f97316", users: 0, timestamp: new Date() },
      ],
      campaigns: [],
    }),

  initializeData: () => {
    const state = get()

    // Add initial revenue data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    months.forEach((month, index) => {
      const revenue = 3000 + index * 800 + Math.floor(Math.random() * 1000)
      state.addRevenueData({
        month,
        revenue,
        profit: Math.round(revenue * 0.6),
        expenses: Math.round(revenue * 0.4),
      })
    })

    // Add initial conversion data
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    days.forEach((day) => {
      const conversions = Math.floor(Math.random() * 30) + 35
      state.addConversionData({
        day,
        conversions,
        clicks: conversions * 25,
        impressions: conversions * 400,
      })
    })

    // Initialize traffic sources
    state.updateTrafficSource("Organic Search", 45, 22500)
    state.updateTrafficSource("Direct", 30, 15000)
    state.updateTrafficSource("Social Media", 15, 7500)
    state.updateTrafficSource("Email", 10, 5000)
  },
}))
