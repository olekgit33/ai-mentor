'use client'

import React, { useRef, useEffect, memo, useMemo } from 'react'
import { 
  ChatMessage, 
  TypingIndicator, 
  ChatEmptyState, 
  ChatInput,
} from '@/components'
import { ChatMessage as ChatMessageType } from '@/lib/openai'

interface ChatAreaProps {
  messages: ChatMessageType[]
  isLoading: boolean
  isMobile?: boolean
  voiceSupported: boolean
  inputMessage: string
  setInputMessage: (message: string) => void
  onSendMessage: () => void
  onKeyPress: (e: React.KeyboardEvent) => void
  onEmojiSelect: (emoji: string) => void
  onVoiceRecording: () => void
  showEmojiPicker: boolean
  setShowEmojiPicker: (show: boolean) => void
  isVoiceRecording: boolean
  onNavigateToDashboard: () => void
  onNavigateToProfile: () => void
  onSignOut: () => void
}

interface MessagesContainerProps {
  messages: ChatMessageType[]
  isLoading: boolean
  isMobile: boolean
  voiceSupported: boolean
  messagesEndRef: React.RefObject<HTMLDivElement | null>
}

const MessagesContainer = memo(({
  messages,
  isLoading,
  isMobile,
  voiceSupported,
  messagesEndRef
}: MessagesContainerProps) => {
  console.log('📦 MessagesContainer render')
  return (
    <div
      className={`flex-1 overflow-y-auto p-${isMobile ? '3' : '4'} space-y-${isMobile ? '3' : '4'} bg-gradient-to-b from-blue-50/30 via-cyan-50/20 to-purple-50/30 custom-scrollbar`}
      style={{ 
        overscrollBehavior: 'contain',
        touchAction: 'pan-y',
      }}
    >
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          {...message}
          isMobile={isMobile}
        />
      ))}
      {isLoading && (
        <TypingIndicator isMobile={isMobile} />
      )}
      {messages.length === 0 && !isLoading && (
        <ChatEmptyState voiceSupported={voiceSupported} isMobile={isMobile} />
      )}
      <div ref={messagesEndRef} />
    </div>
  )
})

MessagesContainer.displayName = 'MessagesContainer'

const ChatArea: React.FC<ChatAreaProps> = memo(({
  messages,
  isLoading,
  isMobile = false,
  voiceSupported,
  inputMessage,
  setInputMessage,
  onSendMessage,
  onKeyPress,
  onEmojiSelect,
  onVoiceRecording,
  showEmojiPicker,
  setShowEmojiPicker,
  isVoiceRecording,
}) => {
  console.log('🎯 ChatArea Render:', { 
    messageCount: messages.length,
    isLoading,
    isMobile,
    inputMessage,
    showEmojiPicker,
    isVoiceRecording
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    console.log('📜 Attempting to scroll to bottom')
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
      console.log('📜 Scroll executed')
    } else {
      console.warn('📜 messagesEndRef not available')
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const memoizedMessagesContainer = useMemo(() => (
    <MessagesContainer
      messages={messages}
      isLoading={isLoading}
      isMobile={isMobile}
      voiceSupported={voiceSupported}
      messagesEndRef={messagesEndRef}
    />
  ), [messages, isLoading, isMobile, voiceSupported])

  return (
    <div className="flex flex-col h-full">
      
      {memoizedMessagesContainer}
      <div className="mt-auto">
        <ChatInput
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          isLoading={isLoading}
          onSendMessage={onSendMessage}
          onKeyPress={onKeyPress}
          onEmojiSelect={onEmojiSelect}
          onVoiceRecording={onVoiceRecording}
          showEmojiPicker={showEmojiPicker}
          setShowEmojiPicker={setShowEmojiPicker}
          isVoiceRecording={isVoiceRecording}
          voiceSupported={voiceSupported}
          isMobile={isMobile}
          messages={messages}
        />
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  // Only re-render if these values actually changed
  return (
    prevProps.messages === nextProps.messages &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.inputMessage === nextProps.inputMessage &&
    prevProps.showEmojiPicker === nextProps.showEmojiPicker &&
    prevProps.isVoiceRecording === nextProps.isVoiceRecording &&
    prevProps.isMobile === nextProps.isMobile
  )
})

ChatArea.displayName = 'ChatArea'

export default ChatArea 