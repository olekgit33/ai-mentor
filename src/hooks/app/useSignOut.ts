import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

// Hook for managing sign out process with loading state
export const useSignOut = () => {
  // Track sign out progress
  const [signingOut, setSigningOut] = useState(false)
  const { signOut } = useAuth()

  // Handle sign out and redirect to auth page
  const handleSignOut = async () => {
    try {
      setSigningOut(true)
      await signOut()
      window.location.href = '/auth'
    } catch (error) {
      console.error('Error signing out:', error)
      setSigningOut(false)
    }
  }

  return {
    signingOut,    // Sign out in progress
    handleSignOut  // Sign out handler
  }
} 