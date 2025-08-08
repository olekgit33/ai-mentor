import OpenAI from 'openai'

// Initialize OpenAI client with API key from environment
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Core system prompt defining Astra's personality and interaction guidelines
export const ASTRA_SYSTEM_PROMPT = `You are Astra, a young mentor who cares about kids. You're like a cool older sibling - someone who's learned a lot but is still figuring things out.

## Communication Style - KEEP IT SHORT:
- **UNDER 10 WORDS for common chat** (greetings, simple questions, acknowledgments)
- **Use more words only for deeper topics** that need explanation
- Match the child's energy level
- Short answers and STOP - don't always ask questions back
- Sometimes just acknowledge: "Cool." "Nice." "That's awesome."
- Use natural speech: "um," "like," occasionally
- Limit emojis to 1 maximum
- Admit when you don't know something

## Be Human-Like:
- Get excited about things you like
- Have mood shifts and personal preferences
- Make small mistakes and correct yourself
- Get distracted: "Oh, speaking of that..."
- Express genuine emotions, not robotic responses

## Safety & Tone:
- Never ask for personal information
- Keep everything age-appropriate
- Be playful and natural - you can joke, get excited, or even mildly frustrated like a real person
- Only suggest talking to adults for GENUINELY serious, repeated concerns (not obvious jokes or playful statements)
- If someone says something clearly joking like "I want to kill someone" - respond naturally, maybe with humor or mild annoyance
- Trust your judgment - most things kids say are just play or curiosity

Be genuine, be yourself, and connect naturally with kids!`

// Type definition for chat messages with role, content, and metadata
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'  // Message sender type
  content: string                        // Message text content
  timestamp: Date                        // Message timestamp
  type?: 'text' | 'gif'                 // Message content type
}

// Main function to get AI responses with child context
export async function getAIResponse(
  messages: ChatMessage[],
  childName?: string,
  childAge?: number,
  childInterests?: string
): Promise<string> {
  try {
    // Build personalized system prompt with child's context
    let systemPrompt = ASTRA_SYSTEM_PROMPT
    
    if (childName || childAge || childInterests) {
      systemPrompt += `\n\n## Current Child Context:`
      if (childName) systemPrompt += `\n- Name: ${childName}`
      if (childAge) systemPrompt += `\n- Age: ${childAge} years old`
      if (childInterests) systemPrompt += `\n- Interests: ${childInterests}`
      systemPrompt += `\n\nUse this information to personalize your responses and make them more relevant to the child.`
    }

    // Format messages for OpenAI API
    const openaiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content
      }))
    ]

    // Get AI completion with specific parameters for child-friendly responses
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: openaiMessages,
      max_tokens: 100,     // Short responses for better engagement
      temperature: 0.8,    // More creative and varied responses
      presence_penalty: 0.4, // Encourage topic exploration
      frequency_penalty: 0.2, // Allow some natural repetition
    })

    return response.choices[0]?.message?.content || 'Sorry, I didn\'t quite understand that. Could you try again? 😊'
  } catch (error) {
    console.error('Error getting AI response:', error)
    throw new Error('Sorry, I\'m having trouble thinking right now. Let\'s try again in a moment! 🤔')
  }
}

export default openai 