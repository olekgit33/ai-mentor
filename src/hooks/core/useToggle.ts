import { useState, useCallback } from 'react'

// Hook for managing boolean toggle state with utility functions
export const useToggle = (initialValue: boolean = false) => {
  // Store the toggle state
  const [value, setValue] = useState(initialValue)

  // Toggle between true/false
  const toggle = useCallback(() => {
    setValue(prev => !prev)
  }, [])

  // Set value to true
  const setTrue = useCallback(() => {
    setValue(true)
  }, [])

  // Set value to false
  const setFalse = useCallback(() => {
    setValue(false)
  }, [])

  return {
    value,    // Current boolean state
    toggle,   // Toggle state function
    setTrue,  // Set to true function
    setFalse, // Set to false function
    setValue  // Direct state setter
  }
} 