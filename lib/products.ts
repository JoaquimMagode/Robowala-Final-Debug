export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  category: string
  categorySlug: string
  subcategory?: string
  subcategorySlug?: string
  brand?: string
  badge: string | null
  inStock: boolean
  description: string
  specifications: Record<string, string>
  datasheet?: string
  relatedProducts?: string[]
}

export interface Category {
  slug: string
  name: string
  count: number
  description?: string
  image?: string
  subcategories?: Subcategory[]
}

export interface Subcategory {
  slug: string
  name: string
  count: number
  parentSlug: string
}

// Comprehensive category structure matching robu.in
export const categories: Category[] = [
  {
    slug: "raspberry-pi",
    name: "Raspberry Pi",
    count: 0,
    description: "Official Raspberry Pi boards and accessories",
    subcategories: [
      { slug: "raspberry-pi-5", name: "Raspberry Pi 5", count: 0, parentSlug: "raspberry-pi" },
      { slug: "raspberry-pi-4", name: "Raspberry Pi 4", count: 0, parentSlug: "raspberry-pi" },
      { slug: "raspberry-pi-3", name: "Raspberry Pi 3", count: 0, parentSlug: "raspberry-pi" },
      { slug: "raspberry-pi-zero", name: "Raspberry Pi Zero", count: 0, parentSlug: "raspberry-pi" },
      { slug: "raspberry-pi-pico", name: "Raspberry Pi Pico", count: 0, parentSlug: "raspberry-pi" },
      { slug: "raspberry-pi-compute", name: "Compute Modules", count: 0, parentSlug: "raspberry-pi" },
      { slug: "raspberry-pi-hats", name: "HATs & Add-ons", count: 0, parentSlug: "raspberry-pi" },
      { slug: "raspberry-pi-cameras", name: "Cameras & Displays", count: 0, parentSlug: "raspberry-pi" },
      { slug: "raspberry-pi-power", name: "Power Supplies", count: 0, parentSlug: "raspberry-pi" },
      { slug: "raspberry-pi-cases", name: "Cases", count: 0, parentSlug: "raspberry-pi" },
      { slug: "raspberry-pi-kits", name: "Kits", count: 0, parentSlug: "raspberry-pi" },
    ],
  },
  {
    slug: "arduino",
    name: "Arduino",
    count: 0,
    description: "Official Arduino boards and compatible accessories",
    subcategories: [
      { slug: "arduino-modulino", name: "Modulino Family", count: 0, parentSlug: "arduino" },
      { slug: "arduino-classic", name: "Classic Family", count: 0, parentSlug: "arduino" },
      { slug: "arduino-mkr", name: "MKR Family", count: 0, parentSlug: "arduino" },
      { slug: "arduino-nano", name: "Nano Family", count: 0, parentSlug: "arduino" },
      { slug: "arduino-portenta", name: "Portenta Family", count: 0, parentSlug: "arduino" },
      { slug: "arduino-shields", name: "Shields", count: 0, parentSlug: "arduino" },
      { slug: "arduino-kits", name: "Official Kits", count: 0, parentSlug: "arduino" },
      { slug: "arduino-compatible", name: "Compatible Boards", count: 0, parentSlug: "arduino" },
    ],
  },
  {
    slug: "microcontrollers",
    name: "Microcontrollers",
    count: 0,
    description: "Development boards and microcontroller modules",
    subcategories: [
      { slug: "esp32", name: "ESP32 Boards", count: 0, parentSlug: "microcontrollers" },
      { slug: "esp8266", name: "ESP8266 Boards", count: 0, parentSlug: "microcontrollers" },
      { slug: "stm32", name: "STM32 Boards", count: 0, parentSlug: "microcontrollers" },
      { slug: "8051", name: "8051 Development", count: 0, parentSlug: "microcontrollers" },
      { slug: "pic", name: "PIC Boards", count: 0, parentSlug: "microcontrollers" },
      { slug: "teensy", name: "Teensy Boards", count: 0, parentSlug: "microcontrollers" },
      { slug: "arm", name: "ARM Boards", count: 0, parentSlug: "microcontrollers" },
    ],
  },
  {
    slug: "drone-parts",
    name: "Drone Parts",
    count: 0,
    description: "Complete drone kits and components",
    subcategories: [
      { slug: "drone-kits", name: "Drone Kits", count: 0, parentSlug: "drone-parts" },
      { slug: "drone-motors", name: "Drone Motors", count: 0, parentSlug: "drone-parts" },
      { slug: "drone-frames", name: "Frames", count: 0, parentSlug: "drone-parts" },
      { slug: "flight-controllers", name: "Flight Controllers", count: 0, parentSlug: "drone-parts" },
      { slug: "esc", name: "ESCs", count: 0, parentSlug: "drone-parts" },
      { slug: "drone-propellers", name: "Propellers", count: 0, parentSlug: "drone-parts" },
      { slug: "fpv-equipment", name: "FPV Equipment", count: 0, parentSlug: "drone-parts" },
      { slug: "drone-batteries", name: "Batteries", count: 0, parentSlug: "drone-parts" },
    ],
  },
  {
    slug: "sensors",
    name: "Sensors",
    count: 0,
    description: "All types of sensors for your projects",
    subcategories: [
      { slug: "temperature-sensors", name: "Temperature Sensors", count: 0, parentSlug: "sensors" },
      { slug: "humidity-sensors", name: "Humidity Sensors", count: 0, parentSlug: "sensors" },
      { slug: "pressure-sensors", name: "Pressure Sensors", count: 0, parentSlug: "sensors" },
      { slug: "proximity-sensors", name: "Proximity Sensors", count: 0, parentSlug: "sensors" },
      { slug: "motion-sensors", name: "Motion Sensors", count: 0, parentSlug: "sensors" },
      { slug: "gas-sensors", name: "Gas Sensors", count: 0, parentSlug: "sensors" },
      { slug: "light-sensors", name: "Light Sensors", count: 0, parentSlug: "sensors" },
      { slug: "sound-sensors", name: "Sound Sensors", count: 0, parentSlug: "sensors" },
      { slug: "gps-modules", name: "GPS Modules", count: 0, parentSlug: "sensors" },
      { slug: "sensor-kits", name: "Sensor Kits", count: 0, parentSlug: "sensors" },
    ],
  },
  {
    slug: "motors",
    name: "Motors & Drivers",
    count: 0,
    description: "Motors, drivers, and actuators",
    subcategories: [
      { slug: "dc-motors", name: "DC Motors", count: 0, parentSlug: "motors" },
      { slug: "servo-motors", name: "Servo Motors", count: 0, parentSlug: "motors" },
      { slug: "stepper-motors", name: "Stepper Motors", count: 0, parentSlug: "motors" },
      { slug: "motor-drivers", name: "Motor Drivers", count: 0, parentSlug: "motors" },
      { slug: "wheels-chassis", name: "Wheels & Chassis", count: 0, parentSlug: "motors" },
    ],
  },
  {
    slug: "displays",
    name: "Displays",
    count: 0,
    description: "LCD, OLED, TFT displays and more",
    subcategories: [
      { slug: "oled-displays", name: "OLED Displays", count: 0, parentSlug: "displays" },
      { slug: "lcd-displays", name: "LCD Displays", count: 0, parentSlug: "displays" },
      { slug: "tft-displays", name: "TFT Displays", count: 0, parentSlug: "displays" },
      { slug: "led-matrices", name: "LED Matrices", count: 0, parentSlug: "displays" },
      { slug: "7-segment", name: "7-Segment Displays", count: 0, parentSlug: "displays" },
    ],
  },
  {
    slug: "wireless",
    name: "Wireless & IoT",
    count: 0,
    description: "WiFi, Bluetooth, LoRa, and other wireless modules",
    subcategories: [
      { slug: "wifi-modules", name: "WiFi Modules", count: 0, parentSlug: "wireless" },
      { slug: "bluetooth-modules", name: "Bluetooth Modules", count: 0, parentSlug: "wireless" },
      { slug: "lora-modules", name: "LoRa Modules", count: 0, parentSlug: "wireless" },
      { slug: "zigbee-modules", name: "ZigBee Modules", count: 0, parentSlug: "wireless" },
      { slug: "gsm-gprs", name: "GSM/GPRS Modules", count: 0, parentSlug: "wireless" },
      { slug: "rf-modules", name: "RF Modules", count: 0, parentSlug: "wireless" },
    ],
  },
  {
    slug: "power-supply",
    name: "Power Supply",
    count: 0,
    description: "Power adapters, batteries, and chargers",
    subcategories: [
      { slug: "adapters", name: "Power Adapters", count: 0, parentSlug: "power-supply" },
      { slug: "batteries", name: "Batteries", count: 0, parentSlug: "power-supply" },
      { slug: "battery-chargers", name: "Battery Chargers", count: 0, parentSlug: "power-supply" },
      { slug: "solar-panels", name: "Solar Panels", count: 0, parentSlug: "power-supply" },
      { slug: "voltage-regulators", name: "Voltage Regulators", count: 0, parentSlug: "power-supply" },
      { slug: "power-banks", name: "Power Banks", count: 0, parentSlug: "power-supply" },
      { slug: "boost-converters", name: "Boost Converters", count: 0, parentSlug: "power-supply" },
      { slug: "buck-converters", name: "Buck Converters", count: 0, parentSlug: "power-supply" },
    ],
  },
  {
    slug: "components",
    name: "Electronic Components",
    count: 0,
    description: "Resistors, capacitors, ICs, and more",
    subcategories: [
      { slug: "resistors", name: "Resistors", count: 0, parentSlug: "components" },
      { slug: "capacitors", name: "Capacitors", count: 0, parentSlug: "components" },
      { slug: "inductors", name: "Inductors", count: 0, parentSlug: "components" },
      { slug: "diodes", name: "Diodes", count: 0, parentSlug: "components" },
      { slug: "transistors", name: "Transistors", count: 0, parentSlug: "components" },
      { slug: "ics", name: "ICs", count: 0, parentSlug: "components" },
      { slug: "leds", name: "LEDs", count: 0, parentSlug: "components" },
      { slug: "connectors", name: "Connectors", count: 0, parentSlug: "components" },
      { slug: "switches", name: "Switches", count: 0, parentSlug: "components" },
      { slug: "relays", name: "Relays", count: 0, parentSlug: "components" },
    ],
  },
  {
    slug: "tools",
    name: "Tools & Equipment",
    count: 0,
    description: "Soldering, testing, and measurement tools",
    subcategories: [
      { slug: "soldering", name: "Soldering Equipment", count: 0, parentSlug: "tools" },
      { slug: "multimeters", name: "Multimeters", count: 0, parentSlug: "tools" },
      { slug: "oscilloscopes", name: "Oscilloscopes", count: 0, parentSlug: "tools" },
      { slug: "power-supplies-bench", name: "Bench Power Supplies", count: 0, parentSlug: "tools" },
      { slug: "hand-tools", name: "Hand Tools", count: 0, parentSlug: "tools" },
      { slug: "wire-tools", name: "Wire Tools", count: 0, parentSlug: "tools" },
    ],
  },
  {
    slug: "kits",
    name: "Learning Kits",
    count: 0,
    description: "Complete kits for learning and projects",
    subcategories: [
      { slug: "arduino-kits-learning", name: "Arduino Kits", count: 0, parentSlug: "kits" },
      { slug: "raspberry-pi-kits-learning", name: "Raspberry Pi Kits", count: 0, parentSlug: "kits" },
      { slug: "robotics-kits", name: "Robotics Kits", count: 0, parentSlug: "kits" },
      { slug: "iot-kits", name: "IoT Kits", count: 0, parentSlug: "kits" },
      { slug: "stem-kits", name: "STEM Kits", count: 0, parentSlug: "kits" },
    ],
  },
]

// Sample products with new structure
export const products: Product[] = [
  {
    id: "1",
    name: "ESP32-WROOM-32 DevKit",
    slug: "esp32-devkit",
    price: 499,
    originalPrice: 699,
    rating: 4.8,
    reviews: 234,
    image: "/esp32-development-board-wifi-bluetooth-microcontro.jpg",
    category: "Microcontrollers",
    categorySlug: "microcontrollers",
    subcategory: "ESP32 Boards",
    subcategorySlug: "esp32",
    brand: "Espressif",
    badge: "Bestseller",
    inStock: true,
    description: "Powerful WiFi & Bluetooth enabled microcontroller for IoT projects.",
    specifications: { CPU: "Dual-core 240MHz", Flash: "4MB", RAM: "520KB", WiFi: "802.11 b/g/n" },
  },
  {
    id: "2",
    name: "Arduino UNO R4 WiFi",
    slug: "arduino-uno-r4",
    price: 2499,
    originalPrice: 2999,
    rating: 4.9,
    reviews: 156,
    image: "/arduino-uno-r4-wifi-development-board-blue.jpg",
    category: "Arduino",
    categorySlug: "arduino",
    subcategory: "Classic Family",
    subcategorySlug: "arduino-classic",
    brand: "Arduino",
    badge: "New",
    inStock: true,
    description: "Latest Arduino with built-in WiFi and enhanced processing power.",
    specifications: { CPU: "Renesas RA4M1", Flash: "256KB", RAM: "32KB", WiFi: "ESP32-S3" },
  },
  {
    id: "3",
    name: "Raspberry Pi 5 8GB",
    slug: "raspberry-pi-5",
    price: 7499,
    originalPrice: 8499,
    rating: 4.9,
    reviews: 89,
    image: "/raspberry-pi-5-single-board-computer.jpg",
    category: "Raspberry Pi",
    categorySlug: "raspberry-pi",
    subcategory: "Raspberry Pi 5",
    subcategorySlug: "raspberry-pi-5",
    brand: "Raspberry Pi Foundation",
    badge: "Hot",
    inStock: true,
    description: "Most powerful Raspberry Pi with 8GB RAM for demanding projects.",
    specifications: { CPU: "Quad-core Cortex-A76", RAM: "8GB", Storage: "microSD", USB: "USB 3.0" },
  },
  {
    id: "4",
    name: "37-in-1 Sensor Kit",
    slug: "sensor-kit-37",
    price: 1299,
    originalPrice: 1799,
    rating: 4.7,
    reviews: 312,
    image: "/arduino-sensor-kit-37-pieces-various-sensors-modul.jpg",
    category: "Sensors",
    categorySlug: "sensors",
    subcategory: "Sensor Kits",
    subcategorySlug: "sensor-kits",
    badge: "Value Pack",
    inStock: true,
    description: "Complete sensor kit for learning and prototyping.",
    specifications: { Sensors: "37 types", Compatible: "Arduino/ESP32", Case: "Included" },
  },
  {
    id: "5",
    name: "MG996R Servo Motor",
    slug: "servo-mg996r",
    price: 349,
    originalPrice: 449,
    rating: 4.6,
    reviews: 178,
    image: "/mg996r-servo-motor-robotics-blue.jpg",
    category: "Motors & Drivers",
    categorySlug: "motors",
    subcategory: "Servo Motors",
    subcategorySlug: "servo-motors",
    badge: null,
    inStock: true,
    description: "High-torque metal gear servo for robotics.",
    specifications: { Torque: "13kg/cm", Speed: "0.13s/60°", Voltage: "4.8-7.2V" },
  },
  {
    id: "6",
    name: '0.96" OLED Display I2C',
    slug: "oled-display",
    price: 199,
    originalPrice: 299,
    rating: 4.8,
    reviews: 445,
    image: "/oled-display-0-96-inch-i2c-blue-text.jpg",
    category: "Displays",
    categorySlug: "displays",
    subcategory: "OLED Displays",
    subcategorySlug: "oled-displays",
    badge: "Popular",
    inStock: true,
    description: "Compact OLED display with I2C interface.",
    specifications: { Size: '0.96"', Resolution: "128x64", Interface: "I2C", Color: "Blue" },
  },
  {
    id: "7",
    name: "NRF24L01+ Wireless Module",
    slug: "nrf24l01",
    price: 149,
    originalPrice: 199,
    rating: 4.5,
    reviews: 267,
    image: "/nrf24l01-wireless-transceiver-module-green-pcb.jpg",
    category: "Wireless & IoT",
    categorySlug: "wireless",
    subcategory: "RF Modules",
    subcategorySlug: "rf-modules",
    badge: null,
    inStock: true,
    description: "2.4GHz wireless transceiver module.",
    specifications: { Frequency: "2.4GHz", Range: "100m", "Data Rate": "2Mbps" },
  },
  {
    id: "8",
    name: "4WD Robot Car Kit",
    slug: "robot-car-kit",
    price: 1899,
    originalPrice: 2499,
    rating: 4.7,
    reviews: 123,
    image: "/4wd-robot-car-chassis-kit-arduino-compatible.jpg",
    category: "Learning Kits",
    categorySlug: "kits",
    subcategory: "Robotics Kits",
    subcategorySlug: "robotics-kits",
    badge: "Kit",
    inStock: true,
    description: "Complete 4WD robot car chassis kit.",
    specifications: { Motors: "4x DC", Wheels: "4x 65mm", Material: "Acrylic" },
  },
  {
    id: "9",
    name: "DHT22 Temperature Sensor",
    slug: "dht22",
    price: 249,
    originalPrice: 349,
    rating: 4.6,
    reviews: 198,
    image: "/dht22-temperature-humidity-sensor-white.jpg",
    category: "Sensors",
    categorySlug: "sensors",
    subcategory: "Temperature Sensors",
    subcategorySlug: "temperature-sensors",
    badge: null,
    inStock: true,
    description: "High precision temperature and humidity sensor.",
    specifications: { "Temp Range": "-40°C to 80°C", Humidity: "0-100%", Accuracy: "±0.5°C" },
  },
  {
    id: "10",
    name: "L298N Motor Driver",
    slug: "l298n",
    price: 179,
    originalPrice: 249,
    rating: 4.5,
    reviews: 321,
    image: "/l298n-motor-driver-module-red-pcb.jpg",
    category: "Motors & Drivers",
    categorySlug: "motors",
    subcategory: "Motor Drivers",
    subcategorySlug: "motor-drivers",
    badge: "Popular",
    inStock: true,
    description: "Dual H-Bridge motor driver for DC motors.",
    specifications: { Channels: "2", Current: "2A per channel", Voltage: "5-35V" },
  },
  {
    id: "11",
    name: "HC-SR04 Ultrasonic Sensor",
    slug: "hc-sr04",
    price: 79,
    originalPrice: 129,
    rating: 4.7,
    reviews: 456,
    image: "/hc-sr04-ultrasonic-sensor-module-blue.jpg",
    category: "Sensors",
    categorySlug: "sensors",
    subcategory: "Proximity Sensors",
    subcategorySlug: "proximity-sensors",
    badge: null,
    inStock: true,
    description: "Ultrasonic distance measuring sensor.",
    specifications: { Range: "2cm-400cm", Accuracy: "3mm", Trigger: "10μs pulse" },
  },
  {
    id: "12",
    name: "NodeMCU ESP8266",
    slug: "nodemcu-esp8266",
    price: 299,
    originalPrice: 399,
    rating: 4.7,
    reviews: 567,
    image: "/nodemcu-esp8266-development-board-blue.jpg",
    category: "Microcontrollers",
    categorySlug: "microcontrollers",
    subcategory: "ESP8266 Boards",
    subcategorySlug: "esp8266",
    brand: "Espressif",
    badge: null,
    inStock: true,
    description: "WiFi enabled development board based on ESP8266.",
    specifications: { CPU: "80MHz", Flash: "4MB", GPIO: "17 pins", WiFi: "802.11 b/g/n" },
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug)
}

export function getProductsBySubcategory(subcategorySlug: string): Product[] {
  return products.filter((p) => p.subcategorySlug === subcategorySlug)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, limit)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getSubcategories(categorySlug: string): Subcategory[] {
  const category = categories.find((c) => c.slug === categorySlug)
  return category?.subcategories || []
}
