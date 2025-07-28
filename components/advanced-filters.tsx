"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FilterState {
  dateRange: { from: Date | undefined; to: Date | undefined }
  status: string[]
  campaign: string
  minClicks: string
  maxClicks: string
  minConversions: string
  maxConversions: string
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterState) => void
}

export function AdvancedFilters({ onFiltersChange }: AdvancedFiltersProps) {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { from: undefined, to: undefined },
    status: [],
    campaign: "",
    minClicks: "",
    maxClicks: "",
    minConversions: "",
    maxConversions: "",
  })

  const statusOptions = ["Active", "Paused", "Completed"]

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked ? [...filters.status, status] : filters.status.filter((s) => s !== status)

    const newFilters = { ...filters, status: newStatus }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleInputChange = (field: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [field]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      dateRange: { from: undefined, to: undefined },
      status: [],
      campaign: "",
      minClicks: "",
      maxClicks: "",
      minConversions: "",
      maxConversions: "",
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const activeFiltersCount =
    filters.status.length +
    (filters.campaign ? 1 : 0) +
    (filters.minClicks ? 1 : 0) +
    (filters.maxClicks ? 1 : 0) +
    (filters.minConversions ? 1 : 0) +
    (filters.maxConversions ? 1 : 0) +
    (filters.dateRange.from || filters.dateRange.to ? 1 : 0)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 relative"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-blue-500 text-white text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white/10 backdrop-blur-xl border-white/20 dark:bg-gray-900/20">
        <SheetHeader>
          <SheetTitle>Advanced Filters</SheetTitle>
          <SheetDescription>Filter your data with advanced criteria</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label>Date Range</Label>
            <DatePickerWithRange
              date={filters.dateRange}
              onDateChange={(range) => handleInputChange("dateRange", range)}
            />
          </div>

          <div className="space-y-2">
            <Label>Campaign Status</Label>
            <div className="space-y-2">
              {statusOptions.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={status}
                    checked={filters.status.includes(status)}
                    onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
                  />
                  <Label htmlFor={status} className="text-sm font-normal">
                    {status}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign">Campaign Name</Label>
            <Input
              id="campaign"
              placeholder="Search campaign..."
              value={filters.campaign}
              onChange={(e) => handleInputChange("campaign", e.target.value)}
              className="bg-white/10 backdrop-blur-md border-white/20 focus:border-blue-500/50"
            />
          </div>

          <div className="space-y-2">
            <Label>Clicks Range</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Min clicks"
                type="number"
                value={filters.minClicks}
                onChange={(e) => handleInputChange("minClicks", e.target.value)}
                className="bg-white/10 backdrop-blur-md border-white/20 focus:border-blue-500/50"
              />
              <Input
                placeholder="Max clicks"
                type="number"
                value={filters.maxClicks}
                onChange={(e) => handleInputChange("maxClicks", e.target.value)}
                className="bg-white/10 backdrop-blur-md border-white/20 focus:border-blue-500/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Conversions Range</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Min conversions"
                type="number"
                value={filters.minConversions}
                onChange={(e) => handleInputChange("minConversions", e.target.value)}
                className="bg-white/10 backdrop-blur-md border-white/20 focus:border-blue-500/50"
              />
              <Input
                placeholder="Max conversions"
                type="number"
                value={filters.maxConversions}
                onChange={(e) => handleInputChange("maxConversions", e.target.value)}
                className="bg-white/10 backdrop-blur-md border-white/20 focus:border-blue-500/50"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={clearFilters}
              variant="outline"
              className="flex-1 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20"
            >
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
            <Button
              onClick={() => setOpen(false)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
