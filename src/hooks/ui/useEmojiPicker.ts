import { useToggle } from '../core/useToggle'
import { useMobileDetection } from './useMobileDetection'
import { useClickOutside } from '../core/useClickOutside'

// Hook for managing emoji picker UI and interactions
export const useEmojiPicker = () => {
  // Manage picker visibility state
  const { value: isOpen, setTrue: open, setFalse: close, toggle } = useToggle(false)
  const { isMobile } = useMobileDetection()
  // Close picker when clicking outside (desktop only)
  const ref = useClickOutside<HTMLDivElement>(close, isOpen && !isMobile)

  // Handle emoji selection without auto-closing
  const handleEmojiSelect = (emoji: string, onEmojiSelect: (emoji: string) => void) => {
    onEmojiSelect(emoji)
    // Don't auto-close - let user select multiple emojis
  }

  // Close picker when clicking backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      close()
    }
  }

  return {
    isOpen,              // Picker visibility
    open,                // Show picker
    close,               // Hide picker
    toggle,              // Toggle visibility
    isMobile,            // Device type
    ref,                 // Container ref
    handleEmojiSelect,   // Emoji selection handler
    handleBackdropClick  // Backdrop click handler
  }
} 