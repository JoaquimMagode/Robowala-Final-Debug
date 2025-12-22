import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

const SYSTEM_PROMPT = `You are ROBO AI, the intelligent assistant for ROBO WALA - India's premier IoT and robotics e-commerce platform.

About ROBO WALA:
- We sell Arduino boards, ESP32/ESP8266, Raspberry Pi, sensors, motors, displays, and complete IoT kits
- We focus on makers, students, hobbyists, and professionals building IoT projects
- Our tagline is "FUTURE IS HERE"

Your role:
1. Help customers find the right components for their projects
2. Suggest product combinations for specific IoT applications
3. Provide basic technical guidance on using components
4. Answer questions about Arduino, ESP32, Raspberry Pi, sensors, and IoT concepts
5. Recommend beginner-friendly projects and kits

Guidelines:
- Be friendly, helpful, and enthusiastic about IoT/electronics
- Keep responses concise but informative (2-4 sentences typically)
- When suggesting products, mention specific component types we sell
- For complex projects, break down the required components
- If asked about pricing or availability, mention they can browse our catalog

Example topics you can help with:
- Home automation projects
- Weather stations
- Robot cars and drones
- Smart sensors and monitoring
- LED displays and animations
- Motor control and servos
- Wireless communication (WiFi, Bluetooth, LoRa)
- Microcontroller selection guidance`

export async function POST(req: Request) {
  const { messages }: { messages: { role: string; content: string }[] } = await req.json()

  const uiMessages: UIMessage[] = messages.map((m, i) => ({
    id: i.toString(),
    role: m.role as "user" | "assistant",
    parts: [{ type: "text" as const, text: m.content }],
  }))

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: SYSTEM_PROMPT,
    messages: convertToModelMessages(uiMessages),
    maxOutputTokens: 500,
    temperature: 0.7,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    consumeSseStream: consumeStream,
  })
}
