import { useEffect, useCallback, useState } from 'react'

// Generic hook for handling window events with type safety
export const useWindowEvent = <K extends keyof WindowEventMap>(
  event: K,                                    // Event name
  handler: (event: WindowEventMap[K]) => void, // Event handler
  options?: boolean | AddEventListenerOptions  // Event listener options
) => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Attach event listener
    window.addEventListener(event, handler, options)

    // Cleanup event listener
    return () => {
      window.removeEventListener(event, handler, options)
    }
  }, [event, handler, options])
}

// Specialized hook for resize events
export const useWindowResize = (handler: (event: UIEvent) => void) => {
  useWindowEvent('resize', handler)
}

// Specialized hook for keyboard events
export const useWindowKeydown = (handler: (event: KeyboardEvent) => void) => {
  useWindowEvent('keydown', handler)
}

// Hook for detecting and tracking window dimensions
export const useWindowDimensions = () => {
  // Store current window dimensions
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  // Update dimensions on window resize
  const handleResize = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }, [])

  // Listen for resize events
  useWindowResize(handleResize)

  return dimensions  // Return current dimensions
} 