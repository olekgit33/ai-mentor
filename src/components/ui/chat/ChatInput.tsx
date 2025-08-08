'use client'

import React, { useRef, useEffect } from 'react'
import { EmojiPicker } from '@/components'
import { useAutoFocus } from '@/hooks'
import { ChatMessage } from '@/lib/openai'

interface ChatInputProps {
  inputMessage: string
  setInputMessage: (message: string) => void
  isLoading: boolean
  onSendMessage: () => void
  onKeyPress: (e: React.KeyboardEvent) => void
  onEmojiSelect: (emoji: string) => void
  onVoiceRecording: () => void
  showEmojiPicker: boolean
  setShowEmojiPicker: (show: boolean) => void
  isVoiceRecording: boolean
  voiceSupported: boolean
  isMobile?: boolean
  messages: ChatMessage[]
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputMessage,
  setInputMessage,
  isLoading,
  onSendMessage,
  onKeyPress,
  onEmojiSelect,
  onVoiceRecording,
  showEmojiPicker,
  setShowEmojiPicker,
  isVoiceRecording,
  voiceSupported,
  isMobile = false,
  messages
}) => {
  const emojiButtonRef = useRef<HTMLButtonElement>(null)
  const voiceButtonRef = useRef<HTMLButtonElement>(null)
  const textareaRef = useAutoFocus({ messages, isLoading })

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [inputMessage, textareaRef])

  const buttonSize = isMobile ? 'w-8 h-8' : 'w-10 h-10'
  const emojiSize = isMobile ? 'text-lg' : 'text-xl'

  return (
    <div className={`flex-shrink-0 p-${isMobile ? '3' : '4'} bg-gradient-to-r from-blue-50/50 via-cyan-50/40 to-purple-50/50 border-t border-purple-200/30 ${!isMobile ? 'rounded-b-[22px]' : ''}`}>
      <div className="flex items-end space-x-2">
        {/* Emoji Picker */}
        <div className="relative">
          <button
            ref={emojiButtonRef}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={`${buttonSize} bg-white/80 hover:bg-white/90 rounded-full flex items-center justify-center transition-all duration-200 shadow-md border border-purple-200/50 ${emojiSize} cursor-pointer`}
            title="Add emoji"
          >
            😊
          </button>
          <EmojiPicker
            isOpen={showEmojiPicker}
            onClose={() => setShowEmojiPicker(false)}
            onEmojiSelect={onEmojiSelect}
          />
        </div>

        {/* Input Field */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Type your message..."
            className={`w-full bg-white/90 backdrop-blur-sm border border-purple-200/50 rounded-2xl px-4 py-3 ${isMobile ? 'text-sm' : 'text-base'} text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 resize-none shadow-md scrollbar-none`}
            rows={1}
            style={{ 
              minHeight: '44px', 
              maxHeight: '100px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            disabled={isLoading}
          />
        </div>

        {/* Voice Button */}
        {voiceSupported && (
          <button
            ref={voiceButtonRef}
            onClick={onVoiceRecording}
            className={`${buttonSize} rounded-full flex items-center justify-center transition-all duration-200 shadow-md border ${emojiSize} cursor-pointer ${
              isVoiceRecording
                ? 'bg-red-500 hover:bg-red-600 text-white border-red-400'
                : 'bg-white/80 hover:bg-white/90 text-gray-700 border-purple-200/50'
            }`}
            title={isVoiceRecording ? 'Stop recording' : 'Start voice recording'}
          >
            {isVoiceRecording ? '🛑' : '🎙️'}
          </button>
        )}

        {/* Send Button */}
        <button
          onClick={onSendMessage}
          disabled={!inputMessage.trim() || isLoading}
          className={`${buttonSize} bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed ${emojiSize} cursor-pointer`}
          title="Send message"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            '✈️'
          )}
        </button>
      </div>
    </div>
  )
}

export default ChatInput 