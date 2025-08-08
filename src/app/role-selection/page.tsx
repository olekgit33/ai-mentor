'use client'

import React from 'react'
import { useSignOut, useRoleSelection } from '@/hooks'
import { 
  LoadingSpinner, 
  UniversalBackground,
  LogoutButton,
  RoleSelectionHeader,
  RoleCard
} from '@/components'

const RoleSelectionContent = React.memo(function RoleSelectionContent() {
  const { signingOut, handleSignOut } = useSignOut()
  const { 
    user, 
    loading, 
    isUpdating, 
    updatingRole, 
    isNavigating, 
    navigationMessage, 
    selectRole 
  } = useRoleSelection()

  if (loading) {
    return <LoadingSpinner message="Loading your profile..." />
  }

  // Show loading while navigating
  if (isNavigating) {
    return <LoadingSpinner message={navigationMessage} />
  }

  // Show loading while redirecting unauthenticated users
  if (!user) {
    return <LoadingSpinner message="Redirecting to sign in..." />
  }

  // Show loading while redirecting users who already have roles
  if (user.role) {
    return <LoadingSpinner message="Redirecting to your dashboard..." />
  }

  const parentFeatures = [
    { icon: '👨‍👩‍👧‍👦', text: 'Manage child profiles' },
    { icon: '📊', text: 'Track learning progress' },
    { icon: '🎯', text: 'Set goals & customize' },
    { icon: '📱', text: 'Parent dashboard access' }
  ]

  const childFeatures = [
    { icon: '🧠', text: 'Chat with Astra mentor' },
    { icon: '🏆', text: 'Earn XP & achievements' },
    { icon: '🎮', text: 'Interactive learning' },
    { icon: '🌟', text: 'Personalized journey' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative">
      <UniversalBackground variant="minimal" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-20">
        <LogoutButton 
          onSignOut={handleSignOut}
          signingOut={signingOut}
          disabled={isUpdating}
        />

        <RoleSelectionHeader />

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <RoleCard
            role="parent"
            title="Parent Guardian"
            description="Oversee your family's educational journey and monitor progress"
            icon="👨‍👩‍👧‍👦"
            features={parentFeatures}
            onSelect={() => selectRole('parent')}
            isUpdating={isUpdating}
            isCurrentlyUpdating={updatingRole === 'parent'}
            selectedRole={null}
          />

          <RoleCard
            role="child"
            title="Young Learner"
            description="Embark on an exciting adventure with Astra, your AI mentor"
            icon="🎓"
            features={childFeatures}
            onSelect={() => selectRole('child')}
            isUpdating={isUpdating}
            isCurrentlyUpdating={updatingRole === 'child'}
            selectedRole={null}
          />
        </div>
      </div>
    </div>
  )
})

export default function RoleSelectionPage() {
  return <RoleSelectionContent />
} 