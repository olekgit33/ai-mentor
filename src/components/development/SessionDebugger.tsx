'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { debugSession } from '@/lib/supabase'

export default function SessionDebugger() {
  const { user, session, loading, sessionError, debugSessionState } = useAuth()
  const [isVisible, setIsVisible] = useState(false)

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const handleDebugSession = async () => {
    try {
      await debugSession()
      debugSessionState()
    } catch (error) {
      console.error('Debug session failed:', error)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm shadow-lg hover:bg-blue-600 transition-colors"
      >
        🔍 Debug Session
      </button>
      
      {isVisible && (
        <div className="absolute bottom-12 right-0 bg-black text-white p-4 rounded-lg shadow-xl w-80 max-w-screen text-xs">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Session Debug</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-2">
            <div>
              <strong>User:</strong> {user ? `${user.email} (${user.id.slice(0, 8)}...)` : 'null'}
            </div>
            <div>
              <strong>Session:</strong> {session ? 'Present' : 'null'}
            </div>
            <div>
              <strong>Loading:</strong> {loading ? 'true' : 'false'}
            </div>
            <div>
              <strong>Session Error:</strong> {sessionError || 'none'}
            </div>
            <div>
              <strong>Access Token:</strong> {session?.access_token ? 'Present' : 'Missing'}
            </div>
            <div>
              <strong>Refresh Token:</strong> {session?.refresh_token ? 'Present' : 'Missing'}
            </div>
            <div>
              <strong>Expires At:</strong> {session?.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : 'N/A'}
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <button
              onClick={handleDebugSession}
              className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors w-full"
            >
              Refresh Debug Info
            </button>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.clear()
                  window.location.reload()
                }
              }}
              className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors w-full"
            >
              Clear Storage & Reload
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 