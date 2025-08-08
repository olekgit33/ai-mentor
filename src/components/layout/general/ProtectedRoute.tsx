'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { LoadingSpinner } from '@/components'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
  requireRole?: 'parent' | 'child'
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

    // 2nd Priority: Role existence
    if (!user.role) {
      console.log('🛡️ ProtectedRoute: User has no role')
      redirect('/role-selection', 'Priority 2: No role set')
      return
    }

    // 3rd Priority: Role type restrictions
    if (user.role === 'parent') {
      console.log('🛡️ ProtectedRoute: User is parent')
      // Parent accessing child-only page
      if (requireRole && requireRole !== 'parent') {
        redirect('/parent-dashboard', 'Priority 3: Parent accessing child page')
        return
      }
      // Parent accessing auth page when already authenticated
      if (!requireAuth && redirectTo === '/auth') {
        redirect('/parent-dashboard', 'Priority 3: Parent accessing auth page')
        return
      }
      // Parent authorized
      console.log('🛡️ ProtectedRoute: Parent authorized')
      setIsAuthorized(true)
      return
    }

    if (user.role === 'child') {
      console.log('🛡️ ProtectedRoute: User is child')
      // Child accessing parent-only page
      if (requireRole && requireRole !== 'child') {
        redirect('/mentor-chat', 'Priority 3: Child accessing parent page')
        return
      }
      // Child accessing auth page when already authenticated
      if (!requireAuth && redirectTo === '/auth') {
        redirect('/mentor-chat', 'Priority 3: Child accessing auth page')
        return
      }
      // Child authorized
      console.log('🛡️ ProtectedRoute: Child authorized')
      setIsAuthorized(true)
      return
    }

    // Unknown role - redirect to role selection
    redirect('/role-selection', 'Unknown role')
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