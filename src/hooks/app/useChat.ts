import { useState, useCallback } from 'react'
import { ChatMessage } from '@/lib/openai'

// Interface for XP and level-up notifications
interface XPNotification {
  show: boolean        // Whether to display the notification
  xpEarned: number    // Amount of XP gained
  leveledUp: boolean  // Whether user leveled up
  newLevel: number    // New level if leveled up
  newBadges: unknown[] // Any new badges earned
}

// Configuration options for chat initialization
interface UseChatOptions {
  childProfile?: {
    id?: string         // Unique identifier
    name?: string       // Child's name
    age?: number        // Child's age
    interests?: string  // Child's interests
  } | null
}

// Custom hook for managing chat interactions with AI mentor
export const useChat = ({ childProfile }: UseChatOptions) => {
  console.log('🔄 useChat Hook Re-render', { childProfile })
  
  // Core chat state management
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Track XP rewards and level progression
  const [xpNotification, setXpNotification] = useState<XPNotification>({
    show: false,
    xpEarned: 0,
    leveledUp: false,
    newLevel: 0,
    newBadges: []
  })

  // Welcome message initialization - temporarily disabled for debugging
  // useEffect(() => {
  //   if (messages.length === 0 && childProfile) {
  //     const welcomeMessage: ChatMessage = {
  //       role: 'assistant',
  //       content: `Hi ${childProfile.name}! I'm so excited to chat with you and help you learn amazing things!`,
  //       timestamp: new Date()
  //     }
  //     setMessages([welcomeMessage])
  //   }
  // }, [messages.length, childProfile])

  // Send message to AI and handle response
  const sendMessage = useCallback(async () => {
    console.log('🚀 Sending Message:', { inputMessage, isLoading })
    if (!inputMessage.trim() || isLoading) return

    // Format user message with timestamp
    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    // Update UI optimistically before API response
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Send to AI endpoint with child's context
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          childName: childProfile?.name || 'Young Learner',
          childAge: childProfile?.age || 10,
          childInterests: childProfile?.interests || 'learning and exploring',
          childId: childProfile?.id || 'mock-child-123',
        }),
      })

      const data = await response.json()

      // Format AI response with timestamp
      const astraMessage: ChatMessage = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      }

      // Update chat with AI response
      setMessages(prev => [...prev, astraMessage])

      // Handle XP rewards and show notification
      if (data.xp) {
        setXpNotification({
          show: true,
          xpEarned: data.xp.xpEarned,
          leveledUp: data.xp.leveledUp,
          newLevel: data.xp.newLevel,
          newBadges: data.xp.newBadges || []
        })

        // Auto-hide XP notification after 5 seconds
        setTimeout(() => {
          setXpNotification(prev => ({ ...prev, show: false }))
        }, 5000)
      }
    } catch (error) {
      // Show friendly error message to user
      console.error('Error sending message:', error)
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Oops! I had a little hiccup there. Can you try sending your message again? 😅',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [inputMessage, isLoading, messages, childProfile])

  // Handle Enter key press for message sending
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }, [sendMessage])

  // Add emoji or gif to input field
  const addToInput = useCallback((text: string) => {
    setInputMessage(prev => prev + text)
  }, [])

  // Reset input field to empty
  const clearInput = useCallback(() => {
    setInputMessage('')
  }, [])

  return {
    messages,       // Chat message history
    inputMessage,   // Current input text
    setInputMessage, // Update input text
    isLoading,      // Loading state
    xpNotification, // XP notification state
    sendMessage,    // Send message function
    handleKeyPress, // Keyboard handler
    addToInput,     // Add emoji/gif
    clearInput      // Clear input field
  }
} 