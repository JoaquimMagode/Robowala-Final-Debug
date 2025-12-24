interface TopProductsProps {
  data?: Array<{
    name: string
    sales: number
    revenue: number
  }>
}

export function TopProducts({ data = [] }: TopProductsProps) {
  return (
    <div className="space-y-4">
      {data.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No product data available
        </div>
      ) : (
        data.map((product, index) => (
          <div key={product.name} className="flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{product.name}</p>
              <p className="text-xs text-muted-foreground">{product.sales} sold</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">₹{product.revenue.toLocaleString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
