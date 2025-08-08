import { useState, useCallback } from 'react'

// Hook for managing a single value in sessionStorage with type safety
export const useSessionStorage = <T>(key: string, initialValue: T) => {
  // Initialize state from sessionStorage or fallback to initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue // Handle SSR case
    }
    try {
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Update both state and sessionStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  // Remove item from sessionStorage and reset state
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return {
    value: storedValue,   // Current stored value
    setValue,             // Update value
    removeValue          // Remove value and reset
  }
}

// Specialized hook for managing multiple session storage keys with a prefix
export const useSessionStorageKeys = (prefix: string) => {
  // Remove all items that start with the given prefix
  const clearAllWithPrefix = useCallback(() => {
    if (typeof window === 'undefined') return

    try {
      const keys = Object.keys(sessionStorage)
      keys.forEach(key => {
        if (key.startsWith(prefix)) {
          sessionStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error(`Error clearing sessionStorage keys with prefix "${prefix}":`, error)
    }
  }, [prefix])

  // Get all stored items that start with the given prefix
  const getAllWithPrefix = useCallback(() => {
    if (typeof window === 'undefined') return {}

    try {
      const keys = Object.keys(sessionStorage)
      const result: Record<string, unknown> = {}
      
      keys.forEach(key => {
        if (key.startsWith(prefix)) {
          const item = sessionStorage.getItem(key)
          if (item) {
            result[key] = JSON.parse(item)
          }
        }
      })
      
      return result
    } catch (error) {
      console.error(`Error getting sessionStorage keys with prefix "${prefix}":`, error)
      return {}
    }
  }, [prefix])

  return {
    clearAllWithPrefix,  // Clear all matching items
    getAllWithPrefix     // Get all matching items
  }
} 