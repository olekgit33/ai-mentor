import React from 'react'

interface ChatEmptyStateProps {
  voiceSupported: boolean
  isMobile?: boolean
}

const ChatEmptyState: React.FC<ChatEmptyStateProps> = ({ isMobile = false }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
      <div className="relative mb-4">
        <div className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 rounded-full flex items-center justify-center shadow-xl border-2 border-white/30`}>
          <span className={`${isMobile ? 'text-2xl' : 'text-3xl'}`}>🌟</span>
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white/40 rounded-full animate-bounce opacity-80 blur-sm"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white/30 rounded-full animate-pulse opacity-60 blur-sm"></div>
      </div>

      <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-800 mb-2 flex items-center justify-center`}>
        Ready to chat with Astra!
      </h3>

      <p className={`text-dark-600 max-w-sm ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed px-4 mb-4 text-gray-600`}>
        Start a conversation below. I&apos;m here to help you learn!
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-md border border-white/50">
          <span>😊</span>
          <span className="font-medium text-gray-700">Emojis</span>
        </div>
        <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-md border border-white/50">
          <span>🔊</span>
          <span className="font-medium text-gray-700">Voice</span>
        </div>
      </div>
    </div>
  )
}

export default ChatEmptyState 