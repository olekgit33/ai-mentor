'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components'

interface User {
  id: string
  email: string
  role?: 'parent' | 'child'
}

interface HeroSectionProps {
  user: User | null
  onGoToDashboard: () => void
  onSignOut: () => void
}

const HeroSection: React.FC<HeroSectionProps> = ({ user, onGoToDashboard, onSignOut }) => {
  const router = useRouter()

  return (
    <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 md:py-20">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl animate-fade-in px-2">
          {user ? (
            <>Welcome back to <span className="text-yellow-300 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent animate-pulse whitespace-nowrap">ONE EDU</span></>
          ) : (
            <>Welcome to <span className="text-yellow-300 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent animate-pulse whitespace-nowrap">ONE EDU</span></>
          )}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto drop-shadow-lg animate-fade-in-up px-4">
          {user ? (
            <>Continue your personalized learning journey with AI-powered education</>
          ) : (
            <>Personalized learning experiences powered by AI for children and parents</>
          )}
        </p>
        <div className="flex flex-col gap-3 sm:gap-4 justify-center animate-fade-in-up delay-200 px-4">
          {user ? (
            // Authenticated user buttons
            <>
              <Button
                variant="secondary"
                size="lg"
                onClick={onGoToDashboard}
                className="w-full sm:w-auto font-bold rounded-xl"
              >
                Get Started
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={onSignOut}
                className="w-full sm:w-auto font-bold rounded-xl"
              >
                Sign Out
              </Button>
            </>
          ) : (
            // Guest user buttons
            <>
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push('/auth')}
                className="w-auto font-bold rounded-xl"
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeroSection 