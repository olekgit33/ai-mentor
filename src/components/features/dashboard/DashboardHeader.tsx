'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface DashboardHeaderProps {
  onSignOut: () => void
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onSignOut }) => {
  const router = useRouter()

  return (
    <div className="relative z-10 bg-black/20 backdrop-blur-lg border-b border-white/10 shadow-2xl">
      <div className="p-3 sm:p-4">
        {/* Mobile Layout */}
        <div className="flex items-center justify-between sm:hidden">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => router.push('/')}>
            <div className="text-lg">🎓</div>
            <span className="text-white font-bold text-base drop-shadow-lg">ONE EDU</span>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.location.href = '/mentor-chat'}
              className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg cursor-pointer"
            >
              💬
            </button>
            <button
              onClick={onSignOut}
              className="p-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg cursor-pointer"
            >
              🔓
            </button>
          </div>
        </div>
        
        {/* Mobile Title */}
        <div className="mt-3 text-center sm:hidden">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center text-lg shadow-lg">
              🎯
            </div>
            <h1 className="text-lg font-bold text-white drop-shadow-lg">Achievement Hub</h1>
          </div>
          <p className="text-white/80 text-xs">Your legendary progress awaits!</p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => router.push('/')}>
              <div className="text-xl">🎓</div>
              <span className="text-white font-bold text-lg drop-shadow-lg">ONE EDU</span>
            </div>
            
            {/* Divider */}
            <div className="h-8 w-px bg-white/30 mx-2"></div>
            
            {/* Dashboard Info */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                  🎯
                </div>
                {/* Pulsing Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-30 animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">Achievement Hub</h1>
                <p className="text-white/80 text-sm">Your legendary progress awaits!</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.location.href = '/mentor-chat'}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
            >
              Back to Chat
            </button>
            <button
              onClick={onSignOut}
              className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader 