'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { LoadingSpinner } from '@/components'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
  // Role is deprecated; child mode only
  requireRole?: 'child'
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  redirectTo = '/auth',
  requireRole
}: ProtectedRouteProps) {
  const { user, childProfile, loading } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    console.log('🛡️ ProtectedRoute: Effect triggered with:', { 
      user: user?.email, 
      role: user?.role, 
      loading, 
      requireAuth, 
      requireRole,
      currentPath: typeof window !== 'undefined' ? window.location.pathname : 'unknown'
    })

    if (loading) {
      console.log('🛡️ ProtectedRoute: Still loading, waiting...')
      setIsAuthorized(null)
      return
    }

    // Helper function to handle redirects
    const redirect = (path: string, reason: string) => {
      console.log(`🚫 ProtectedRoute: ${reason}, redirecting to ${path}`)
      setIsRedirecting(true)
      setIsAuthorized(false)
      router.push(path)
    }

    // 1st Priority: Authentication
    if (!user) {
      console.log('🛡️ ProtectedRoute: No user found')
      if (requireAuth) {
        redirect(redirectTo, 'Priority 1: Not authenticated')
        return
      }
      // No auth required and no user - authorized to stay
      console.log('🛡️ ProtectedRoute: No auth required, allowing access')
      setIsAuthorized(true)
      return
    }

    // Roles are deprecated; treat all authenticated users as child-mode by default
    if (!requireAuth && redirectTo === '/auth') {
      redirect('/mentor-chat', 'Authenticated user accessing auth page')
      return
    }
    setIsAuthorized(true)
  }, [user, childProfile, loading, requireAuth, redirectTo, requireRole, router])

  // Show loading while checking authorization
  if (loading || isAuthorized === null) {
    return <LoadingSpinner message="Checking access..." />
  }

  // Show loading while redirecting
  if (isRedirecting || isAuthorized === false) {
    return <LoadingSpinner message="Redirecting..." />
  }

  // Only render children when definitely authorized
  if (isAuthorized === true) {
    return <>{children}</>
  }

  // Fallback loading (shouldn't reach here)
  return <LoadingSpinner message="Loading..." />
} 