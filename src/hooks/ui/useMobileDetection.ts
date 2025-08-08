import { useState, useEffect } from 'react'

// Configuration options for mobile detection
interface UseMobileDetectionOptions {
  breakpoint?: number  // Width threshold for mobile detection
}

// Hook for detecting mobile devices based on screen width
export const useMobileDetection = ({ breakpoint = 640 }: UseMobileDetectionOptions = {}) => {
  // Track mobile state
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if screen width is below breakpoint
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }
    
    // Check on mount
    checkMobile()
    
    // Listen to window resize
    window.addEventListener('resize', checkMobile)
    
    // Cleanup event listener
    return () => window.removeEventListener('resize', checkMobile)
  }, [breakpoint])

  return {
    isMobile,     // Whether device is mobile
    isDesktop: !isMobile,  // Whether device is desktop
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0  // Current window width
  }
} 