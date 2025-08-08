'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { User as SupabaseUser, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

// =================== TYPES ===================
interface User {
  id: string
  auth_user_id: string
  email: string
  role?: 'parent' | 'child'
  created_at: string
  updated_at: string
}

interface ChildProfile {
  id: string
  user_id: string
  name: string
  age: number
  interests: string
  avatar_emoji: string
  created_at: string
  updated_at: string
}

interface AuthResponse {
  data: { user: SupabaseUser | null; session: Session | null } | null
  error: AuthError | null
}

interface AuthContextType {
  // State
  user: User | null
  supabaseUser: SupabaseUser | null
  session: Session | null
  childProfile: ChildProfile | null
  loading: boolean
  sessionError: string | null
  // Methods
  signUp: (email: string, password: string) => Promise<AuthResponse>
  signIn: (email: string, password: string) => Promise<AuthResponse>
  signOut: () => Promise<void>
  setUserRole: (role: 'parent' | 'child') => Promise<boolean>
  createChildProfile: (profile: Partial<ChildProfile>) => Promise<ChildProfile | null>
  updateChildProfile: (profile: Partial<ChildProfile>) => Promise<void>
  debugSessionState: () => void
}

// =================== CONTEXT ===================
// Main authentication context that manages user sessions, profiles, and database interactions
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Custom hook to access auth context throughout the app
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// =================== PROVIDER ===================
// Main authentication provider component that handles session persistence and user state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Track both Supabase and custom user data
  const [user, setUserState] = useState<User | null>(null)
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null)
  
  // Session management states
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [sessionError, setSessionError] = useState<string | null>(null)
  
  // Child profile state for educational features
  const [childProfile, setChildProfileState] = useState<ChildProfile | null>(null)

  // Wrapped setter with debug logging for user state changes
  const setUser = useCallback((newUser: User | null) => {
    console.log('🔄 AuthContext: User state changing from:', user?.email, 'to:', newUser?.email)
    console.log('🔄 AuthContext: User role changing from:', user?.role, 'to:', newUser?.role)
    setUserState(newUser)
  }, [user])

  const setChildProfile = useCallback((newChildProfile: ChildProfile | null) => {
    console.log('🔄 AuthContext: Child profile state changing from:', childProfile?.name, 'to:', newChildProfile?.name)
    setChildProfileState(newChildProfile)
  }, [childProfile])

  // =================== UTILITY FUNCTIONS ===================
  const debugSessionState = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 AuthContext State:', {
        user: user ? `${user.email} (${user.role})` : 'null',
        supabaseUser: supabaseUser ? `${supabaseUser.email} (${supabaseUser.id})` : 'null',
        session: session ? 'present' : 'null',
        loading,
        sessionError,
        childProfile: childProfile ? childProfile.name : 'null'
      })
    }
  }, [user, supabaseUser, session, loading, sessionError, childProfile])

  // Clear all session data on logout or errors
  const clearSessionStorage = useCallback(() => {
    if (typeof window === 'undefined') return
    
    const keys = Object.keys(sessionStorage)
    keys.forEach(key => {
      if (key.startsWith('user_') || key.startsWith('child_profile_')) {
        sessionStorage.removeItem(key)
      }
    })
  }, [])

  // Load cached user data from sessionStorage to minimize database calls
  const loadUserFromSession = useCallback((supabaseUserId: string) => {
    if (typeof window === 'undefined') return false

    try {
      const userKey = `user_${supabaseUserId}`
      const childProfileKey = `child_profile_${supabaseUserId}`
      
      console.log('🔍 AuthContext: Loading from session storage with keys:', { userKey, childProfileKey })

      const cachedUser = sessionStorage.getItem(userKey)
      const cachedChildProfile = sessionStorage.getItem(childProfileKey)
      
      console.log('🗂️ AuthContext: Session storage contents:', { 
        hasCachedUser: !!cachedUser, 
        hasCachedChildProfile: !!cachedChildProfile 
      })

      if (cachedUser) {
        const userData = JSON.parse(cachedUser)
        console.log('📋 AuthContext: Parsed user data from session:', userData)
        setUser(userData)

        if (cachedChildProfile) {
          const childProfileData = JSON.parse(cachedChildProfile)
          console.log('👶 AuthContext: Parsed child profile from session:', childProfileData)
          setChildProfile(childProfileData)
        }
        return true
      }
      console.log('❌ AuthContext: No cached user found in session storage')
      return false
    } catch (error) {
      console.error('Error loading user from session:', error)
      return false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Cache user data in sessionStorage for faster subsequent loads
  const saveUserToSession = useCallback((supabaseUserId: string, userData: User, childProfileData?: ChildProfile) => {
    if (typeof window === 'undefined') return

    try {
      const userKey = `user_${supabaseUserId}`
      const childProfileKey = `child_profile_${supabaseUserId}`

      sessionStorage.setItem(userKey, JSON.stringify(userData))

      if (childProfileData) {
        sessionStorage.setItem(childProfileKey, JSON.stringify(childProfileData))
      }
    } catch (error) {
      console.error('Error saving user to session:', error)
    }
  }, [])

  // Ensure user record exists in our database after Supabase auth
  const ensureUserRecord = useCallback(async (supabaseUser: SupabaseUser) => {
    try {
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('auth_user_id', supabaseUser.id)
        .single()

      if (!existingUser) {
        // Create user record immediately after sign-up, regardless of email confirmation
        const { error } = await supabase
          .from('users')
          .insert({
            auth_user_id: supabaseUser.id,
            email: supabaseUser.email!,
          })

        if (error) {
          console.error('Error creating user record:', error)
          return false
        }
      }

      return true
    } catch (error) {
      console.error('Error ensuring user record:', error)
      return false
    }
  }, [])

  // Fetch complete user profile from database
  const fetchUserData = useCallback(async (supabaseUserId: string) => {
    try {
      console.log('🔍 AuthContext: Fetching user data from database for:', supabaseUserId)
      
      // Fetch user data
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', supabaseUserId)
        .single()

      if (userError) {
        console.error('❌ AuthContext: Error fetching user:', userError)
        return null
      }

      console.log('👤 AuthContext: User data fetched from database:', userData)

      // Fetch child profile if user is a child
      let childProfileData = null
      if (userData.role === 'child') {
        console.log('👶 AuthContext: User is child, fetching child profile')
        const { data: childData, error: childError } = await supabase
          .from('child_profiles')
          .select('*')
          .eq('user_id', userData.id)
          .single()

        if (childError && childError.code !== 'PGRST116') {
          console.error('❌ AuthContext: Error fetching child profile:', childError)
        } else if (childData) {
          childProfileData = childData
          console.log('👶 AuthContext: Child profile fetched:', childProfileData)
        }
      }

      // Update state and session storage
      console.log('💾 AuthContext: Setting user state and saving to session')
      setUser(userData)
      setChildProfile(childProfileData)
      saveUserToSession(supabaseUserId, userData, childProfileData || undefined)

      return userData
    } catch (error) {
      console.error('❌ AuthContext: Error fetching user data:', error)
      return null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveUserToSession])

  // =================== AUTH STATE MANAGEMENT ===================
  const handleAuthStateChange = useCallback(async (event: string, session: Session | null) => {
    console.log('🔄 AuthContext: handleAuthStateChange called', { event, hasSession: !!session, userId: session?.user?.id })
    
    // Only clear session error on successful sign in events
    if (session && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
      setSessionError(null)
    }
    setSession(session)
    setSupabaseUser(session?.user ?? null)

    if (session?.user) {
      console.log('👤 AuthContext: User session found, loading user data for:', session.user.id)
      
      // Try to load from session storage first
      const dataLoaded = loadUserFromSession(session.user.id)
      console.log('💾 AuthContext: Session storage load result:', dataLoaded)

      if (!dataLoaded) {
        console.log('🔍 AuthContext: No session data, fetching from database')
        // Ensure user record exists and fetch data
        const hasUserRecord = await ensureUserRecord(session.user)
        console.log('📝 AuthContext: User record exists:', hasUserRecord)
        
        if (hasUserRecord) {
          const userData = await fetchUserData(session.user.id)
          console.log('📊 AuthContext: Fetched user data:', userData)
        }
      }
    } else {
      console.log('🚪 AuthContext: No session, clearing state')
      // Clear state and storage on sign out
      setUser(null)
      setChildProfile(null)
      clearSessionStorage()
    }

    setLoading(false)
    console.log('✅ AuthContext: handleAuthStateChange completed')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadUserFromSession, ensureUserRecord, fetchUserData, clearSessionStorage])

  // =================== AUTHENTICATION METHODS ===================
  const signUp = useCallback(async (email: string, password: string) => {
    try {
      setSessionError(null)
      const { data, error } = await supabase.auth.signUp({ email, password })

      if (error) {
        setSessionError(error.message)
      }

      return { data, error }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed'
      setSessionError(errorMessage)
      return { data: null, error: { message: errorMessage } as AuthError }
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setSessionError(null)
      setLoading(true)

      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setSessionError(error.message)
        setLoading(false)
      }
      // On success, keep loading = true until handleAuthStateChange completes with user data

      return { data, error }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign in failed'
      setSessionError(errorMessage)
      setLoading(false)
      return { data: null, error: { message: errorMessage } as AuthError }
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      // Clear all state
      setUser(null)
      setSupabaseUser(null)
      setSession(null)
      setChildProfile(null)
      setSessionError(null)
      clearSessionStorage()
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearSessionStorage])

  // =================== USER MANAGEMENT METHODS ===================
  const setUserRole = useCallback(async (role: 'parent' | 'child') => {
    console.log('🎯 AuthContext: setUserRole called with role:', role)
    console.log('🎯 AuthContext: Current user state:', { user: user?.email, currentRole: user?.role })
    
    if (!user || !supabaseUser || user.role === role) {
      console.log('🎯 AuthContext: Role setting skipped - no user, no supabase user, or role already set')
      return user?.role === role
    }

    try {
      console.log('📝 AuthContext: Updating user role in database')
      const { data, error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', user.id)
        .select()
        .single()

      if (error) {
        console.error('❌ AuthContext: Error setting user role:', error)
        return false
      }

      console.log('✅ AuthContext: User role updated successfully:', data)
      setUser(data)
      saveUserToSession(supabaseUser.id, data, childProfile || undefined)
      return true
    } catch (error) {
      console.error('❌ AuthContext: Error setting user role:', error)
      return false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, supabaseUser, childProfile, saveUserToSession])

  const createChildProfile = useCallback(async (profile: Partial<ChildProfile>): Promise<ChildProfile | null> => {
    if (!user || user.role !== 'child') return null

    try {
      const { data, error } = await supabase
        .from('child_profiles')
        .insert({
          user_id: user.id,
          name: profile.name,
          age: profile.age,
          interests: profile.interests || '',
          avatar_emoji: profile.avatar_emoji || '😊',
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating child profile:', error)
        return null
      }

      setChildProfile(data)
      saveUserToSession(supabaseUser!.id, user, data)
      return data
    } catch (error) {
      console.error('Error creating child profile:', error)
      return null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, supabaseUser, saveUserToSession])

  const updateChildProfile = useCallback(async (profile: Partial<ChildProfile>) => {
    if (!user || user.role !== 'child' || !childProfile) return

    try {
      const { data, error } = await supabase
        .from('child_profiles')
        .update({
          ...profile,
          updated_at: new Date().toISOString(),
        })
        .eq('id', childProfile.id)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating child profile:', error)
        return
      }

      setChildProfile(data)
      saveUserToSession(supabaseUser!.id, user, data)
    } catch (error) {
      console.error('Error updating child profile:', error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, supabaseUser, childProfile, saveUserToSession])

  // =================== INITIALIZATION ===================
  useEffect(() => {
    let mounted = true
    console.log('🚀 AuthContext: Initializing session...')

    const initializeSession = async () => {
      try {
        console.log('🔍 AuthContext: Getting current session from Supabase')
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('❌ AuthContext: Session initialization error:', error)
          setSessionError(error.message)
          setLoading(false)
          return
        }

        console.log('📋 AuthContext: Initial session retrieved:', { hasSession: !!session, userId: session?.user?.id })

        if (mounted) {
          await handleAuthStateChange('INITIAL_SESSION', session)
        }
      } catch (error) {
        console.error('❌ AuthContext: Session initialization failed:', error)
        setSessionError(error instanceof Error ? error.message : 'Unknown error')
        setLoading(false)
      }
    }

    initializeSession()

    // Listen for auth state changes
    console.log('👂 AuthContext: Setting up auth state change listener')
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔄 AuthContext: Auth state change detected:', { event, hasSession: !!session, userId: session?.user?.id })
      if (mounted) {
        handleAuthStateChange(event, session)
      }
    })

    return () => {
      console.log('🛑 AuthContext: Cleaning up auth listener')
      mounted = false
      subscription.unsubscribe()
    }
  }, [handleAuthStateChange])

  // =================== CONTEXT VALUE ===================
  const value = React.useMemo(() => ({
    // State
    user,
    supabaseUser,
    session,
    childProfile,
    loading,
    sessionError,
    // Methods
    signUp,
    signIn,
    signOut,
    setUserRole,
    createChildProfile,
    updateChildProfile,
    debugSessionState,
  }), [
    user,
    supabaseUser,
    session,
    childProfile,
    loading,
    sessionError,
    signUp,
    signIn,
    signOut,
    setUserRole,
    createChildProfile,
    updateChildProfile,
    debugSessionState,
  ])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 