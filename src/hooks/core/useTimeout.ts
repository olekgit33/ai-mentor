import { useEffect, useRef, useCallback } from 'react'

// Hook for managing timeouts with automatic cleanup
export const useTimeout = () => {
  // Store reference to current timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Set a new timeout, clearing any existing one
  const setTimeoutWithCleanup = useCallback((callback: () => void, delay: number) => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(callback, delay)

    // Return cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [])

  // Manually clear current timeout
  const clearCurrentTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    setTimeoutWithCleanup, // Set new timeout with auto cleanup
    clearCurrentTimeout    // Manually clear timeout
  }
} 