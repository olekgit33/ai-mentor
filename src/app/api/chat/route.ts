import { NextRequest, NextResponse } from 'next/server'
import { getAIResponse, ChatMessage } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, childName, childAge, childInterests } = body

    // Validate required fields
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages are required and must be an array' },
        { status: 400 }
      )
    }

    // Convert the messages to the correct format with timestamps
    const chatMessages: ChatMessage[] = messages.map(msg => ({
      role: msg.role,
      content: msg.content,
      timestamp: new Date(msg.timestamp || new Date())
    }))

    // Get AI response from GPT-4o
    const aiResponse = await getAIResponse(
      chatMessages,
      childName,
      childAge,
      childInterests
    )

    return NextResponse.json({
      message: aiResponse,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error in chat API:', error)
    
    // Return a child-friendly error message
    return NextResponse.json(
      { 
        message: 'Sorry, I\'m having trouble thinking right now! Can you try again in a moment? 🤔',
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to send messages.' },
    { status: 405 }
  )
} 