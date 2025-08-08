import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

// Configuration options for profile management
interface UseProfileOptions {
  redirectOnMissing?: string        // Redirect path if profile is missing
  requireChildProfile?: boolean     // Whether child profile is required
}

// Hook for managing user profile states and validation
export const useProfile = (options: UseProfileOptions = {}) => {
  const { user, childProfile } = useAuth()
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  // Check profile requirements and set appropriate states
  useEffect(() => {
    const checkProfile = () => {
      if (!user) {
        setLoading(false)
        return
      }

      if (options.requireChildProfile) {
        if (childProfile) {
          setIsEditing(true)    // Enable editing for existing profiles
          setLoading(false)
        } else {
          setIsEditing(false)   // Disable editing for missing profiles
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    checkProfile()
  }, [user, childProfile, options.requireChildProfile])

  return {
    user,            // Current user object
    childProfile,    // Child profile data
    loading,         // Loading state
    isEditing,       // Profile edit mode
    hasChildProfile: !!childProfile  // Whether child profile exists
  }
} 