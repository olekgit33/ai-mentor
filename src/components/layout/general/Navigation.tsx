'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button, BrandLogo } from '@/components'
import brand from '@/brand/config'

interface User {
  id: string
  email: string
  role?: 'parent' | 'child'
}

interface NavigationProps {
  user: User | null
  onSignOut: () => void
}

const Navigation: React.FC<NavigationProps> = ({ user, onSignOut }) => {
  const router = useRouter()

  return (
    <nav className="relative bg-white/5 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <BrandLogo size="lg" className="cursor-pointer hover:scale-105 transition-transform duration-300" />
          <div className="flex space-x-2 sm:space-x-4">
            {user ? (
              // Authenticated user buttons
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onSignOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              // Guest user buttons
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/auth')}
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 