import React, { memo } from 'react'

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  isMobile?: boolean
}

// Memoized chat message component for optimal rendering performance
const ChatMessage = memo(({ role, content, timestamp, isMobile = false }: ChatMessageProps) => {
  // Format timestamp to human-readable time
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Hide system messages from chat UI
  if (role === 'system') {
    return null
  }

  return (
    // Container with dynamic alignment based on message sender
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {/* Message bubble with responsive sizing and themed styling */}
      <div
        className={`${isMobile ? 'max-w-[85%]' : 'max-w-[70%]'} rounded-2xl px-${isMobile ? '3' : '4'} py-${isMobile ? '2' : '3'} ${
          role === 'user'
            ? 'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 text-white shadow-lg border border-blue-300/30'
            : 'bg-white/95 backdrop-blur-sm text-gray-800 shadow-lg border border-purple-200/50'
        }`}
      >
        {/* AI assistant avatar and name badge */}
        {role === 'assistant' && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs">
              🌟
            </div>
            <span className="text-xs font-medium text-purple-600">Astra</span>
          </div>
        )}

        {/* Message content with text wrapping */}
        <div className={`whitespace-pre-wrap break-words ${isMobile ? 'text-sm' : 'text-base'}`}>
          {content}
        </div>

        {/* Timestamp footer with themed colors */}
        <div className={`text-xs mt-1 ${role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
          {formatTime(timestamp)}
        </div>
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom memo comparison to prevent unnecessary re-renders
  return (
    prevProps.role === nextProps.role && 
    prevProps.content === nextProps.content && 
    prevProps.isMobile === nextProps.isMobile
  )
})

ChatMessage.displayName = 'ChatMessage'

export default ChatMessage 