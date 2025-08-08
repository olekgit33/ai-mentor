import { useState, useCallback } from 'react'

// Hook for managing asynchronous operations with loading and error states
interface UseAsyncOperationOptions {
  onSuccess?: () => void      // Optional success callback
  onError?: (error: string) => void  // Optional error callback
}

export const useAsyncOperation = (options: UseAsyncOperationOptions = {}) => {
  // Track loading state during async operations
  const [loading, setLoading] = useState(false)
  // Store error messages from failed operations
  const [error, setError] = useState('')

  // Execute async operation with error handling
  const execute = useCallback(async (operation: () => Promise<void>) => {
    setLoading(true)
    setError('')

    try {
      await operation()
      options.onSuccess?.()
    } catch (err) {
      // Convert any error type to string message
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      options.onError?.(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [options])

  // Reset hook state to initial values
  const reset = useCallback(() => {
    setLoading(false)
    setError('')
  }, [])

  return {
    loading,    // Current loading state
    error,      // Current error message
    setError,   // Manually set error
    execute,    // Run async operation
    reset       // Reset states
  }
} 