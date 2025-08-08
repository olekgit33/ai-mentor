'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface ChatHeaderProps {
  isMobile: boolean
  onNavigateToDashboard: () => void
  onNavigateToProfile: () => void
  onSignOut: () => void
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  onNavigateToDashboard,
  onNavigateToProfile,
  onSignOut
}) => {
  const router = useRouter()

  return (
    <div className="flex-shrink-0 relative bg-black/30 backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="relative z-10 px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo & Astra Info */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => router.push('/')}>
              <div className="text-lg sm:text-xl">🎓</div>
              <span className="text-white font-bold text-sm sm:text-base drop-shadow-lg">ONE EDU</span>
            </div>
            
            {/* Divider */}
            <div className="h-6 w-px bg-white/30 mx-2"></div>
            
            {/* Astra Info */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 via-pink-500 to-blue-500 rounded-full flex items-center justify-center text-lg shadow-lg">
                🧠
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border border-white shadow-sm animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-sm font-bold text-white drop-shadow-lg">
                  Chat with Astra
                </h1>
                <p className="text-white/70 text-xs hidden sm:block">AI Learning Companion</p>
              </div>
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center space-x-2">
              <button
                onClick={onNavigateToDashboard}
                className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-1 cursor-pointer"
              >
                <span>🎯</span>
                <span className="hidden lg:inline">Dashboard</span>
              </button>
              <button
                onClick={onNavigateToProfile}
                className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-1 cursor-pointer"
              >
                <span>✏️</span>
                <span className="hidden lg:inline">Profile</span>
              </button>
              <button
                onClick={onSignOut}
                className="px-3 py-1.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg text-sm font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-1 cursor-pointer"
              >
                <span>🔓</span>
                <span className="hidden lg:inline">Exit</span>
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="sm:hidden flex items-center space-x-1">
              <button
                onClick={onNavigateToDashboard}
                className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg transform hover:scale-105 flex items-center justify-center text-sm cursor-pointer"
                title="XP Dashboard"
              >
                🎯
              </button>
              <button
                onClick={onNavigateToProfile}
                className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg transform hover:scale-105 flex items-center justify-center text-sm cursor-pointer"
                title="Edit Profile"
              >
                ✏️
              </button>
              <button
                onClick={onSignOut}
                className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-md hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg transform hover:scale-105 flex items-center justify-center text-sm cursor-pointer"
                title="Sign Out"
              >
                🔓
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ChatHeader.displayName = 'ChatHeader'

export default ChatHeader 