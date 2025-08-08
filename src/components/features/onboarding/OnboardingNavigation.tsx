'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface OnboardingNavigationProps {
  isMobile?: boolean
}

const OnboardingNavigation: React.FC<OnboardingNavigationProps> = ({ isMobile = false }) => {
  const router = useRouter()

  return (
    <div className={`mt-6 ${isMobile ? '' : 'sm:mt-8'}`}>
      {/* Section Separator */}
      <div className={`relative mb-4 ${isMobile ? '' : 'sm:mb-6'}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className={`relative flex justify-center ${isMobile ? 'text-sm' : 'text-xs sm:text-sm'}`}>
          <span className={`${isMobile ? 'px-3' : 'px-3 sm:px-4'} bg-gradient-to-r from-white/95 via-blue-50/90 to-purple-50/95 text-gray-600 font-medium`}>
            Or continue exploring
          </span>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'}`}>
        <button
          onClick={() => router.push('/mentor-chat')}
          className={`group relative overflow-hidden bg-white border-2 border-blue-500 text-blue-600 ${isMobile ? 'px-4 py-3' : 'px-4 sm:px-6 py-3 sm:py-4'} rounded-xl ${isMobile ? '' : 'sm:rounded-2xl'} font-bold hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer`}
        >
          <div className="flex items-center justify-center space-x-2 relative z-10">
            <span className={`${isMobile ? 'text-lg' : 'text-lg sm:text-2xl'}`}>💬</span>
            <span className={`${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>Back to Chat</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        
        <button
          onClick={() => router.push('/xp-dashboard')}
          className={`group relative overflow-hidden bg-white border-2 border-purple-500 text-purple-600 ${isMobile ? 'px-4 py-3' : 'px-4 sm:px-6 py-3 sm:py-4'} rounded-xl ${isMobile ? '' : 'sm:rounded-2xl'} font-bold hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer`}
        >
          <div className="flex items-center justify-center space-x-2 relative z-10">
            <span className={`${isMobile ? 'text-lg' : 'text-lg sm:text-2xl'}`}>🎯</span>
            <span className={`${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>XP Dashboard</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  )
}

export default OnboardingNavigation 