// Updated chart data to match the image values more closely
export const revenueData = [
  { month: "Jan", revenue: 3500, profit: 2100, expenses: 1400 },
  { month: "Feb", revenue: 2800, profit: 1680, expenses: 1120 },
  { month: "Mar", revenue: 5000, profit: 3000, expenses: 2000 },
  { month: "Apr", revenue: 4800, profit: 2880, expenses: 1920 },
  { month: "May", revenue: 6200, profit: 3720, expenses: 2480 },
  { month: "Jun", revenue: 6000, profit: 3600, expenses: 2400 },
  { month: "Jul", revenue: 7200, profit: 4320, expenses: 2880 },
  { month: "Aug", revenue: 6800, profit: 4080, expenses: 2720 },
  { month: "Sep", revenue: 7600, profit: 4560, expenses: 3040 },
  { month: "Oct", revenue: 7400, profit: 4440, expenses: 2960 },
  { month: "Nov", revenue: 8800, profit: 5280, expenses: 3520 },
  { month: "Dec", revenue: 8200, profit: 4920, expenses: 3280 },
]

export const dailyConversionsData = [
  { day: "Mon", conversions: 45, clicks: 1200, impressions: 15000 },
  { day: "Tue", conversions: 52, clicks: 1350, impressions: 16200 },
  { day: "Wed", conversions: 38, clicks: 980, impressions: 12800 },
  { day: "Thu", conversions: 61, clicks: 1580, impressions: 18500 },
  { day: "Fri", conversions: 55, clicks: 1420, impressions: 17200 },
  { day: "Sat", conversions: 42, clicks: 1100, impressions: 14000 },
  { day: "Sun", conversions: 48, clicks: 1250, impressions: 15800 },
]

export const trafficSourcesData = [
  { name: "Organic Search", value: 45, color: "#3b82f6", users: 22500 },
  { name: "Direct", value: 30, color: "#10b981", users: 15000 },
  { name: "Social Media", value: 15, color: "#f59e0b", users: 7500 },
  { name: "Email", value: 10, color: "#f97316", users: 5000 },
]

export const campaignData = [
  {
    id: 1,
    name: "Summer Sale Campaign",
    status: "Active",
    impressions: 125000,
    clicks: 3200,
    conversions: 156,
    ctr: 2.56,
    cost: 1250.0,
    revenue: 7800,
  },
  {
    id: 2,
    name: "Brand Awareness Q4",
    status: "Paused",
    impressions: 89000,
    clicks: 2100,
    conversions: 89,
    ctr: 2.36,
    cost: 890.0,
    revenue: 4450,
  },
  {
    id: 3,
    name: "Holiday Promotion",
    status: "Active",
    impressions: 156000,
    clicks: 4200,
    conversions: 234,
    ctr: 2.69,
    cost: 1560.0,
    revenue: 11700,
  },
  {
    id: 4,
    name: "Product Launch",
    status: "Completed",
    impressions: 78000,
    clicks: 1800,
    conversions: 92,
    ctr: 2.31,
    cost: 780.0,
    revenue: 4600,
  },
  {
    id: 5,
    name: "Retargeting Campaign",
    status: "Active",
    impressions: 45000,
    clicks: 1200,
    conversions: 78,
    ctr: 2.67,
    cost: 450.0,
    revenue: 3900,
  },
]

// Derived metrics from the data
export const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
export const totalConversions = dailyConversionsData.reduce((sum, item) => sum + item.conversions, 0)
export const totalUsers = trafficSourcesData.reduce((sum, item) => sum + item.users, 0)
export const averageCTR = campaignData.reduce((sum, item) => sum + item.ctr, 0) / campaignData.length

// Add dummy data that will always be present
export const dummyRevenueData = [
  { month: "Jan", revenue: 3500, profit: 2100, expenses: 1400 },
  { month: "Feb", revenue: 2800, profit: 1680, expenses: 1120 },
  { month: "Mar", revenue: 5000, profit: 3000, expenses: 2000 },
  { month: "Apr", revenue: 4800, profit: 2880, expenses: 1920 },
  { month: "May", revenue: 6200, profit: 3720, expenses: 2480 },
  { month: "Jun", revenue: 6000, profit: 3600, expenses: 2400 },
]

export const dummyConversionsData = [
  { day: "Mon", conversions: 45, clicks: 1200, impressions: 15000 },
  { day: "Tue", conversions: 52, clicks: 1350, impressions: 16200 },
  { day: "Wed", conversions: 38, clicks: 980, impressions: 12800 },
  { day: "Thu", conversions: 61, clicks: 1580, impressions: 18500 },
  { day: "Fri", conversions: 55, clicks: 1420, impressions: 17200 },
  { day: "Sat", conversions: 42, clicks: 1100, impressions: 14000 },
  { day: "Sun", conversions: 48, clicks: 1250, impressions: 15800 },
]

export const dummyTrafficSourcesData = [
  { name: "Organic Search", value: 45, color: "#3b82f6", users: 22500 },
  { name: "Direct", value: 30, color: "#10b981", users: 15000 },
  { name: "Social Media", value: 15, color: "#f59e0b", users: 7500 },
  { name: "Email", value: 10, color: "#f97316", users: 5000 },
]

export const dummyCampaignData = [
  {
    id: 1,
    name: "Summer Sale Campaign",
    status: "Active",
    impressions: 125000,
    clicks: 3200,
    conversions: 156,
    ctr: 2.56,
    cost: 1250.0,
    revenue: 7800,
  },
  {
    id: 2,
    name: "Brand Awareness Q4",
    status: "Paused",
    impressions: 89000,
    clicks: 2100,
    conversions: 89,
    ctr: 2.36,
    cost: 890.0,
    revenue: 4450,
  },
  {
    id: 3,
    name: "Holiday Promotion",
    status: "Active",
    impressions: 156000,
    clicks: 4200,
    conversions: 234,
    ctr: 2.69,
    cost: 1560.0,
    revenue: 11700,
  },
]

// Derived metrics from dummy data
export const dummyTotalRevenue = dummyRevenueData.reduce((sum, item) => sum + item.revenue, 0)
export const dummyTotalConversions = dummyConversionsData.reduce((sum, item) => sum + item.conversions, 0)
export const dummyTotalUsers = dummyTrafficSourcesData.reduce((sum, item) => sum + item.users, 0)
export const dummyAverageCTR = dummyCampaignData.reduce((sum, item) => sum + item.ctr, 0) / dummyCampaignData.length
