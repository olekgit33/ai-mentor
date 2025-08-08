'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  LoadingSpinner, 
  ProtectedRoute, 
  SessionError, 
  ComingSoonSection, 
  FutureFeatureCard 
} from '@/components'
import { useSignOut } from '@/hooks'

const ParentDashboard = React.memo(function ParentDashboard() {
  const { user, loading, sessionError } = useAuth()
  const { signingOut, handleSignOut } = useSignOut()

  if (loading) {
    return <LoadingSpinner message="Loading your dashboard..." />
  }

  if (signingOut) {
    return <LoadingSpinner message="Signing out..." />
  }

  if (sessionError) {
    return (
      <SessionError
        error={sessionError}
        onRetry={() => window.location.reload()}
        onSignOut={handleSignOut}
      />
    )
  }

  const futureFeatures = [
    {
      icon: '🎯',
      title: 'Personalized Learning',
      description: 'AI-powered adaptive learning paths tailored to your child\'s interests and abilities.',
      status: 'In Development' as const,
      animationDelay: '0s'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Comprehensive insights into your child\'s learning journey and achievements.',
      status: 'Coming Soon' as const,
      animationDelay: '0.2s'
    },
    {
      icon: '🔒',
      title: 'Safe & Secure',
      description: 'Built with child safety in mind, ensuring a secure and appropriate learning environment.',
      status: 'Ready' as const,
      animationDelay: '0.4s'
    }
  ]

  const userName = user?.email?.split('@')[0] || 'Parent'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-blue-500 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Simple Header */}
        <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-xl p-3 sm:p-6 mb-4 sm:mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl sm:text-3xl">
                👨‍👩‍👧‍👦
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Parent Dashboard</h1>
                <p className="text-gray-600">Welcome, {userName}!</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        <ComingSoonSection />

        {/* Future Features Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {futureFeatures.map((feature, index) => (
            <div key={index} className={index === 2 ? 'sm:col-span-2 md:col-span-1' : ''}>
              <FutureFeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                status={feature.status}
                animationDelay={feature.animationDelay}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

export default function ParentDashboardPage() {
  return (
    <ProtectedRoute requireAuth={true} requireRole="parent">
      <ParentDashboard />
    </ProtectedRoute>
  )
} 