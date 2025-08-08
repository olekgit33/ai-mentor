'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useNavigation } from '@/hooks'

interface ProfilePromptProps {
  fullScreen?: boolean
  className?: string
}

const ProfilePrompt: React.FC<ProfilePromptProps> = ({ 
  fullScreen = false, 
  className = '' 
}) => {
  const router = useRouter()
  const { navigateTo } = useNavigation()
  
  const containerClasses = fullScreen 
    ? "min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-2 sm:p-4 relative overflow-hidden"
    : `flex items-center justify-center p-2 sm:p-4 relative ${className}`

  return (
    <div className={containerClasses}>
      {/* Enhanced Constellation Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Twinkling Stars - Reduced count for mobile */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`profile-star-${i}`}
            className="absolute w-0.5 sm:w-1 h-0.5 sm:h-1 bg-white rounded-full animate-pulse opacity-60"
            style={{
              left: `${(i * 13 + 17) % 100}%`,
              top: `${(i * 17 + 23) % 100}%`,
              animationDelay: `${(i * 0.1) % 3}s`,
              animationDuration: `${2 + (i * 0.05) % 2}s`
            }}
          />
        ))}
        
        {/* Constellation Lines - Hidden on smallest screens */}
        <svg className="absolute inset-0 w-full h-full opacity-15 hidden sm:block">
          <defs>
            <linearGradient id="profile-constellation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <path d="M 100,200 Q 250,100 400,200 T 700,200" stroke="url(#profile-constellation-gradient)" strokeWidth="2" fill="none" className="animate-pulse" />
          <path d="M 200,400 Q 350,300 500,400 T 800,400" stroke="url(#profile-constellation-gradient)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <path d="M 150,600 Q 300,500 450,600 T 750,600" stroke="url(#profile-constellation-gradient)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDelay: '2s' }} />
        </svg>
        
        {/* Geometric Pattern Overlay - Adjusted sizes for mobile */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-16 sm:w-32 h-16 sm:h-32 border-2 border-purple-400 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-12 sm:w-24 h-12 sm:h-24 border-2 border-pink-400 rotate-12 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-10 sm:w-20 h-10 sm:h-20 border-2 border-blue-400 rotate-90 animate-spin" style={{ animationDuration: '18s' }}></div>
        </div>

        {/* Floating Light Orbs - Adjusted sizes for mobile */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/6 w-4 sm:w-6 h-4 sm:h-6 bg-purple-400/30 rounded-full blur-sm animate-bounce opacity-80"></div>
          <div className="absolute top-3/4 right-1/6 w-5 sm:w-8 h-5 sm:h-8 bg-pink-400/30 rounded-full blur-sm animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/2 w-3 sm:w-4 h-3 sm:h-4 bg-blue-400/30 rounded-full blur-sm animate-bounce opacity-70" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/2 w-4 sm:w-5 h-4 sm:h-5 bg-cyan-400/30 rounded-full blur-sm animate-bounce opacity-50" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>

      <div className="max-w-lg w-full relative z-10 px-4 sm:px-0">
        <div className="group relative">
          {/* Background Glow */}
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          
          <div className="relative bg-black/30 backdrop-blur-lg rounded-3xl p-4 sm:p-8 lg:p-12 shadow-2xl border border-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-3xl">
            {/* Glass Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-3xl"></div>
            
            {/* Floating Elements */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-2 sm:w-3 h-2 sm:h-3 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-pink-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-4 sm:left-6 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-70" style={{ animationDelay: '2s' }}></div>
            
            <div className="relative z-10 text-center">
              <div className="relative inline-block mb-4 sm:mb-8">
                <div className="text-6xl sm:text-8xl lg:text-9xl mb-2 sm:mb-4 group-hover:animate-bounce transition-all duration-300">🌟</div>
                {/* Celebration Sparkles */}
                <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-4 sm:w-6 h-4 sm:h-6 bg-yellow-400 rounded-full animate-ping opacity-80"></div>
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-3 sm:w-4 h-3 sm:h-4 bg-pink-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-2 sm:w-3 h-2 sm:h-3 bg-blue-400 rounded-full animate-ping opacity-70" style={{ animationDelay: '1s' }}></div>
                <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-3 sm:w-5 h-3 sm:h-5 bg-green-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
                Welcome to 
                <span 
                  className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => router.push('/')}
                > ONE EDU</span>!
              </h2>
              
              <p className="text-white/90 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed">
                Let&apos;s create your profile so you can begin your amazing learning adventure with Astra, your AI mentor!
              </p>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-white/80">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 bg-purple-500/30 rounded-full flex items-center justify-center">
                    <span className="text-xs sm:text-sm">🧠</span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Chat with Astra, your AI mentor</span>
                </div>
                <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-white/80">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 bg-blue-500/30 rounded-full flex items-center justify-center">
                    <span className="text-xs sm:text-sm">🏆</span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Earn XP and unlock achievements</span>
                </div>
                <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-white/80">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 bg-green-500/30 rounded-full flex items-center justify-center">
                    <span className="text-xs sm:text-sm">🎮</span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Personalized learning journey</span>
                </div>
              </div>
              
              <button
                onClick={() => navigateTo('/child-onboarding', 'Loading profile setup...')}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2 sm:space-x-3"
              >
                <span>Go to Onboarding</span>
                <span className="text-xl sm:text-2xl animate-bounce">🚀</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePrompt 