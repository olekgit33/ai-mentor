'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const RoleSelectionHeader: React.FC = () => {
  const router = useRouter()

  return (
    <div className="text-center mb-8 sm:mb-10 mt-8 sm:mt-12 md:mt-16">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
        Welcome to 
        <span 
          className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => router.push('/')}
        > ONE EDU</span>!
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
        Choose your role to unlock your personalized learning journey
      </p>
    </div>
  )
}

export default RoleSelectionHeader 