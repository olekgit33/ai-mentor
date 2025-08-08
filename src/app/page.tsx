'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { LoadingSpinner, UniversalBackground } from '@/components'
import { Navigation, HeroSection, FeaturesSection, Footer } from '@/components'
import { useSignOut } from '@/hooks'

export default function Home() {
  const router = useRouter()
  const { user } = useAuth()
  const { signingOut, handleSignOut } = useSignOut()

  const handleGoToDashboard = () => {
    // Let ProtectedRoute handle the role-based routing
    router.push('/auth')
  }

  if (signingOut) {
    return <LoadingSpinner message="Signing out..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <UniversalBackground variant="simple" />

      {/* Navigation */}
      <Navigation user={user} onSignOut={handleSignOut} />

      {/* Hero Section */}
      <HeroSection 
        user={user} 
        onGoToDashboard={handleGoToDashboard} 
        onSignOut={handleSignOut} 
      />

      {/* Features Section */}
      <FeaturesSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
