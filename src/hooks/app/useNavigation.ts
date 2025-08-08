import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Hook for managing navigation with loading states and messages
export const useNavigation = () => {
  // Track navigation state and feedback message
  const [isNavigating, setIsNavigating] = useState(false)
  const [navigationMessage, setNavigationMessage] = useState('')
  const router = useRouter()

  // Navigate to path with optional loading message
  const navigateTo = (path: string, message: string = 'Navigating...') => {
    setIsNavigating(true)
    setNavigationMessage(message)
    
    // Use window.location for immediate navigation or router.push for smoother transition
    if (path.startsWith('http') || path.includes('auth')) {
      window.location.href = path
    } else {
      router.push(path)
    }
  }

  // Navigate with a specified delay for animations or state updates
  const navigateWithDelay = (path: string, delay: number = 100, message: string = 'Navigating...') => {
    setIsNavigating(true)
    setNavigationMessage(message)
    
    setTimeout(() => {
      router.push(path)
    }, delay)
  }

  return {
    isNavigating,      // Navigation in progress
    navigationMessage, // Current feedback message
    navigateTo,        // Immediate navigation
    navigateWithDelay, // Delayed navigation
    router            // Next.js router instance
  }
} 