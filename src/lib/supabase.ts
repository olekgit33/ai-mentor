import { createClient } from '@supabase/supabase-js'

// Environment variables for Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl)
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', !!supabaseAnonKey)
}

// Initialize Supabase client with secure configuration
export const supabase = createClient(
  supabaseUrl || 'https://your-project-url.supabase.co',
  supabaseAnonKey || 'your-anon-key',
  {
    auth: {
      // Use localStorage for session persistence in browser
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce', // PKCE flow for enhanced security
      debug: false // Disable debug logging in production
    }
  }
)

// Development helper to inspect session state
export const debugSession = async () => {
  if (process.env.NODE_ENV === 'development') {
    const { data: { session }, error } = await supabase.auth.getSession()
    console.log('🔍 Session Debug:', { session, error })
    console.log('🔍 User:', session?.user)
    console.log('🔍 Access Token:', session?.access_token ? 'Present' : 'Missing')
    console.log('🔍 Refresh Token:', session?.refresh_token ? 'Present' : 'Missing')
  }
}

// Database schema type for child profiles
export interface ChildProfile {
  id: string                // Unique identifier
  user_id: string          // Reference to parent user
  name: string             // Child's display name
  age: number             // Child's age (8-13)
  interests: string       // Comma-separated interests
  avatar_emoji: string    // Profile emoji
  is_primary: boolean     // Primary profile flag
  created_at?: string     // Creation timestamp
  updated_at?: string     // Last update timestamp
} 