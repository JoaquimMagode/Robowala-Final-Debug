import { Badge } from "@/components/ui/badge"

const recentOrders = [
  {
    id: "ORD-2024-001284",
    customer: "Rahul Sharma",
    email: "rahul@example.com",
    total: "₹3,499",
    status: "delivered",
    date: "Dec 5, 2024",
  },
  {
    id: "ORD-2024-001283",
    customer: "Priya Patel",
    email: "priya@example.com",
    total: "₹8,750",
    status: "shipped",
    date: "Dec 5, 2024",
  },
  {
    id: "ORD-2024-001282",
    customer: "Amit Kumar",
    email: "amit@example.com",
    total: "₹2,199",
    status: "processing",
    date: "Dec 4, 2024",
  },
  {
    id: "ORD-2024-001281",
    customer: "Sneha Gupta",
    email: "sneha@example.com",
    total: "₹15,999",
    status: "delivered",
    date: "Dec 4, 2024",
  },
  {
    id: "ORD-2024-001280",
    customer: "Vikram Singh",
    email: "vikram@example.com",
    total: "₹4,299",
    status: "pending",
    date: "Dec 3, 2024",
  },
]

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-600 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
}

export function RecentOrders() {
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
          {recentOrders.map((order) => (
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
                <span className="text-sm font-medium">{order.total}</span>
              </td>
              <td className="py-3 pr-4">
                <Badge variant="outline" className={statusColors[order.status]}>
                  {order.status}
                </Badge>
              </td>
              <td className="py-3">
                <span className="text-sm text-muted-foreground">{order.date}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
