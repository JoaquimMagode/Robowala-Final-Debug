const topProducts = [
  { name: "ESP32 DevKit V1", sales: 245, revenue: "₹73,255" },
  { name: "Arduino Uno R3", sales: 198, revenue: "₹59,202" },
  { name: "Raspberry Pi 4 Model B", sales: 156, revenue: "₹1,09,044" },
  { name: "DHT22 Sensor", sales: 312, revenue: "₹24,960" },
  { name: "HC-SR04 Ultrasonic", sales: 287, revenue: "₹17,220" },
]

export function TopProducts() {
  return (
    <div className="space-y-4">
      {topProducts.map((product, index) => (
        <div key={product.name} className="flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
            {index + 1}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.sales} sold</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{product.revenue}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
