import { useState, useCallback, useEffect } from 'react'

// Configuration options for form management
interface UseFormOptions<T> {
  initialValues: T                                    // Initial form state
  validate?: (values: T) => string | null            // Optional validation function
  onSubmit: (values: T) => Promise<void>             // Form submission handler
  syncData?: T | null | undefined                    // External data to sync with
  syncMap?: Partial<Record<keyof T, (value: unknown) => unknown>> // Transform synced data
}

// Hook for managing form state, validation, and submission
export const useForm = <T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
  syncData,
  syncMap = {}
}: UseFormOptions<T>) => {
  // Core form state
  const [values, setValues] = useState<T>(initialValues)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Update single form field
  const setValue = useCallback((key: keyof T, value: unknown) => {
    setValues(prev => ({ ...prev, [key]: value }))
  }, [])

  // Update multiple form fields
  const setAllValues = useCallback((newValues: T) => {
    setValues(newValues)
  }, [])

  // Reset form to initial state
  const reset = useCallback(() => {
    setValues(initialValues)
    setError('')
    setLoading(false)
  }, [initialValues])

  // Sync external data with form values
  useEffect(() => {
    if (syncData) {
      Object.keys(syncData).forEach((key) => {
        const typedKey = key as keyof T
        const rawValue = syncData[typedKey]
        
        // Apply transformation if provided in syncMap
        const transformedValue = syncMap[typedKey] 
          ? syncMap[typedKey]!(rawValue)
          : rawValue
        
        setValue(typedKey, transformedValue)
      })
    }
  }, [syncData, setValue, syncMap])

  // Handle form submission with validation
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault()
    setLoading(true)
    setError('')

    // Validate if validation function provided
    if (validate) {
      const validationError = validate(values)
      if (validationError) {
        setError(validationError)
        setLoading(false)
        return
      }
    }

    try {
      await onSubmit(values)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [values, validate, onSubmit])

  return {
    values,        // Current form values
    loading,       // Submission state
    error,         // Error message
    setError,      // Set error manually
    setValue,      // Update field value
    setAllValues,  // Update all values
    reset,         // Reset form state
    handleSubmit   // Submit handler
  }
} 