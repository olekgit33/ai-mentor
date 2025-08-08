import { useEffect, useRef, RefObject } from 'react'

// Hook to detect clicks outside a component and trigger a handler
export const useClickOutside = <T extends HTMLElement>(
  handler: () => void,    // Function to call on outside click
  enabled: boolean = true // Whether the detection is active
): RefObject<T | null> => {
  // Reference to the component to check against
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (!enabled) return

    // Handle click events and check if they're outside
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    // Attach and cleanup event listeners
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handler, enabled])

  return ref
} 