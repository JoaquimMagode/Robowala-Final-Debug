import { Badge } from "@/components/ui/badge"

interface RecentOrdersProps {
  data?: Array<{
    id: string
    customer: string
    email: string
    total: number
    status: string
    date: string
  }>
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  in_transit: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  on_the_way: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  out_for_delivery: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  shipped: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-600 border-green-500/20",
  delayed: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
}

export function RecentOrders({ data = [] }: RecentOrdersProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
            <th className="pb-3 pr-4">Order ID</th>
            <th className="pb-3 pr-4">Customer</th>
            <th className="pb-3 pr-4">Total</th>
            <th className="pb-3 pr-4">Status</th>
            <th className="pb-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-8 text-center text-muted-foreground">
                No recent orders
              </td>
            </tr>
          ) : (
            data.map((order) => (
              <tr key={order.id} className="border-b border-border last:border-0">
                <td className="py-3 pr-4">
                  <span className="text-sm font-medium">{order.id}</span>
                </td>
                <td className="py-3 pr-4">
                  <div>
                    <p className="text-sm font-medium">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-sm font-medium">₹{order.total.toLocaleString()}</span>
                </td>
                <td className="py-3 pr-4">
                  <Badge variant="outline" className={statusColors[order.status] || statusColors.pending}>
                    {order.status.replace('_', ' ')}
                  </Badge>
                </td>
                <td className="py-3">
                  <span className="text-sm text-muted-foreground">{order.date}</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
