(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,73375,e=>{"use strict";let t=(0,e.i(75254).default)("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);e.s(["ChevronLeft",()=>t],73375)},87316,37986,e=>{"use strict";let t=(0,e.i(75254).default)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);e.s(["Calendar",()=>t],87316);let r=[{id:"1",slug:"getting-started-with-arduino",title:"Getting Started with Arduino: A Beginner's Guide",excerpt:"Learn the basics of Arduino microcontrollers, how to set up your environment, and write your first 'Blink' program.",content:`
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
    `,author:"Rahul Sharma",date:"Dec 8, 2025",image:"/images/blog/arduino-guide.jpg",category:"Tutorials"},{id:"2",slug:"raspberry-pi-5-review",title:"Raspberry Pi 5: Is it worth the upgrade?",excerpt:"We deep dive into the new features of Raspberry Pi 5, comparing benchmarks and thermal performance with Pi 4.",content:`
      <h2>Performance</h2>
      <p>The Raspberry Pi 5 features a quad-core Arm Cortex-A76 processor @ 2.4GHz, making it 2-3x faster than the Pi 4.</p>
      
      <h2>I/O Capabilities</h2>
      <p>With the new RP1 I/O controller, USB bandwidth is significantly improved.</p>
    `,author:"Priya Patel",date:"Dec 5, 2025",image:"/images/blog/pi5-review.jpg",category:"Reviews"},{id:"3",slug:"top-5-sensors-for-iot",title:"Top 5 Sensors Every IoT Hobbyist Needs",excerpt:"From DHT11 to ultrasonic sensors, here are the essential components for your next home automation project.",content:`
      <p>Sensors are the eyes and ears of your IoT projects.</p>
      <h3>1. DHT22 (Temp & Humidity)</h3>
      <p>More accurate than DHT11...</p>
    `,author:"Amit Kumar",date:"Nov 28, 2025",image:"/images/blog/sensors.jpg",category:"Guides"}];e.s(["blogPosts",0,r],37986)},37046,e=>{"use strict";var t=e.i(43476),r=e.i(22016),s=e.i(18566),a=e.i(87316),o=e.i(84614),i=e.i(73375),n=e.i(37986),l=e.i(67881);function d(){let e=(0,s.useParams)().slug,d=n.blogPosts.find(t=>t.slug===e);return d||(0,s.notFound)(),(0,t.jsx)("div",{className:"min-h-screen bg-background py-12",children:(0,t.jsxs)("article",{className:"container mx-auto px-4 max-w-3xl",children:[(0,t.jsx)(l.Button,{variant:"ghost",asChild:!0,className:"mb-8 pl-0 hover:bg-transparent hover:text-primary",children:(0,t.jsxs)(r.default,{href:"/blog",children:[(0,t.jsx)(i.ChevronLeft,{className:"mr-2 h-4 w-4"}),"Back to Blog"]})}),(0,t.jsxs)("header",{className:"mb-8",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-4",children:[(0,t.jsx)("span",{className:"bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium",children:d.category}),(0,t.jsx)("span",{className:"text-muted-foreground text-sm",children:"•"}),(0,t.jsxs)("span",{className:"flex items-center gap-1 text-muted-foreground text-sm",children:[(0,t.jsx)(a.Calendar,{className:"h-3 w-3"})," ",d.date]})]}),(0,t.jsx)("h1",{className:"text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight",children:d.title}),(0,t.jsxs)("div",{className:"flex items-center gap-3 border-y border-border py-4",children:[(0,t.jsx)("div",{className:"h-10 w-10 rounded-full bg-secondary flex items-center justify-center",children:(0,t.jsx)(o.User,{className:"h-5 w-5 text-muted-foreground"})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-foreground",children:d.author}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:"Author"})]})]})]}),(0,t.jsx)("div",{className:"prose prose-stone dark:prose-invert max-w-none",children:(0,t.jsx)("div",{dangerouslySetInnerHTML:{__html:d.content}})})]})})}e.s(["default",()=>d])}]);