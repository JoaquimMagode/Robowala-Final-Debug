"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface SalesChartProps {
  data?: Array<{
    month: string
    sales: number
    orders?: number
  }>
}

export function SalesChart({ data = [] }: SalesChartProps) {
  // Fallback data if no data is provided
  const fallbackData = [
    { month: "Jan", sales: 18500 },
    { month: "Feb", sales: 22300 },
    { month: "Mar", sales: 19800 },
    { month: "Apr", sales: 28400 },
    { month: "May", sales: 32100 },
    { month: "Jun", sales: 29700 },
    { month: "Jul", sales: 35200 },
    { month: "Aug", sales: 38900 },
    { month: "Sep", sales: 42500 },
    { month: "Oct", sales: 39800 },
    { month: "Nov", sales: 45200 },
    { month: "Dec", sales: 52800 },
  ]

  const chartData = data.length > 0 ? data : fallbackData

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${value / 1000}k`}
        />
        <Tooltip
          cursor={{ fill: "hsl(var(--muted))" }}
          contentStyle={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          formatter={(value: number) => [`₹${value.toLocaleString()}`, "Sales"]}
        />
        <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
