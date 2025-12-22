import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    id: "development-boards",
    name: "Development Boards",
    image: "/arduino-uno-r4-wifi-development-board-blue.jpg",
  },
  {
    id: "drone-parts",
    name: "Drone Parts",
    image: "/drone-quadcopter-parts.jpg",
  },
  {
    id: "batteries",
    name: "Batteries, Power Supply and Accessories",
    image: "/lithium-battery-power-supply.jpg",
  },
  {
    id: "3d-printing",
    name: "3D Printers and Parts",
    image: "/3d-printer-filament.jpg",
  },
  {
    id: "sensors",
    name: "Sensors",
    image: "/dht22-temperature-humidity-sensor-white.jpg",
  },
  {
    id: "electronic-components",
    name: "Electronic Components",
    image: "/resistors-capacitors-electronic-components.jpg",
  },
  {
    id: "motors",
    name: "Motors | Drivers | Pumps | Actuators",
    image: "/l298n-motor-driver-module-red-pcb.jpg",
  },
  {
    id: "displays",
    name: "Electronic Modules and Displays",
    image: "/oled-display-0-96-inch-i2c-blue-text.jpg",
  },
  {
    id: "iot-wireless",
    name: "IoT and Wireless Modules",
    image: "/nodemcu-esp8266-development-board-blue.jpg",
  },
  {
    id: "tools",
    name: "Mechanical Parts, Measurement & Workbench Tools",
    image: "/digital-multimeter-tools.jpg",
  },
  {
    id: "diy-kits",
    name: "DIY & Maker Kits",
    image: "/4wd-robot-car-chassis-kit-arduino-compatible.jpg",
  },
  {
    id: "ev-parts",
    name: "Electric Vehicle Parts",
    image: "/electric-vehicle-motor-controller.jpg",
  },
]

export function CategoryGrid() {
  return (
    <section className="bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Categories</h2>
          <div className="mt-1 h-1 w-16 bg-[#ff6a00]" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
            >
              <div className="flex aspect-square items-center justify-center bg-secondary p-4">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={120}
                  height={120}
                  className="h-24 w-24 rounded object-contain transition-transform group-hover:scale-110"
                />
              </div>
              {/* Category name */}
              <div className="flex flex-1 items-center justify-center p-3 text-center">
                <p className="text-xs font-medium text-foreground leading-tight">{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
