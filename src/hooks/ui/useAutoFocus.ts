import { useEffect, useRef } from 'react'
import { ChatMessage } from '@/lib/openai'

// Props for auto focus management
interface UseAutoFocusProps {
  messages: ChatMessage[]  // Chat message history
  isLoading: boolean      // Loading state
}

// Hook for automatically focusing chat input after messages
export const useAutoFocus = ({ messages, isLoading }: UseAutoFocusProps) => {
  // Reference to input element
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // Focus when new message arrives and not loading
    if (!isLoading && inputRef.current) {
      inputRef.current.focus()
    }
  }, [messages, isLoading])

  return inputRef  // Return ref for attaching to input
} 