export interface BlogPost {
    id: string
    slug: string
    title: string
    excerpt: string
    content: string
    author: string
    date: string
    image: string
    category: string
}

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        slug: "getting-started-with-arduino",
        title: "Getting Started with Arduino: A Beginner's Guide",
        excerpt: "Learn the basics of Arduino microcontrollers, how to set up your environment, and write your first 'Blink' program.",
        content: `
      <h2>Introduction to Arduino</h2>
      <p>Arduino is an open-source electronics platform based on easy-to-use hardware and software. It's intended for anyone making interactive projects.</p>
      
      <h2>What you need</h2>
      <ul>
        <li>Arduino UNO Board</li>
        <li>USB Cable</li>
        <li>LED and Resistor (optional, as board has built-in LED)</li>
      </ul>

      <h2>Step 1: Install IDE</h2>
      <p>Download the Arduino IDE from the official website...</p>
    `,
        author: "Rahul Sharma",
        date: "Dec 8, 2025",
        image: "/images/blog/arduino-guide.jpg",
        category: "Tutorials"
    },
    {
        id: "2",
        slug: "raspberry-pi-5-review",
        title: "Raspberry Pi 5: Is it worth the upgrade?",
        excerpt: "We deep dive into the new features of Raspberry Pi 5, comparing benchmarks and thermal performance with Pi 4.",
        content: `
      <h2>Performance</h2>
      <p>The Raspberry Pi 5 features a quad-core Arm Cortex-A76 processor @ 2.4GHz, making it 2-3x faster than the Pi 4.</p>
      
      <h2>I/O Capabilities</h2>
      <p>With the new RP1 I/O controller, USB bandwidth is significantly improved.</p>
    `,
        author: "Priya Patel",
        date: "Dec 5, 2025",
        image: "/images/blog/pi5-review.jpg",
        category: "Reviews"
    },
    {
        id: "3",
        slug: "top-5-sensors-for-iot",
        title: "Top 5 Sensors Every IoT Hobbyist Needs",
        excerpt: "From DHT11 to ultrasonic sensors, here are the essential components for your next home automation project.",
        content: `
      <p>Sensors are the eyes and ears of your IoT projects.</p>
      <h3>1. DHT22 (Temp & Humidity)</h3>
      <p>More accurate than DHT11...</p>
    `,
        author: "Amit Kumar",
        date: "Nov 28, 2025",
        image: "/images/blog/sensors.jpg",
        category: "Guides"
    }
]
