interface LoadingSpinnerProps {
  message?: string
  className?: string
}

// Full-screen loading spinner with gradient background
export const LoadingSpinner = ({ 
  message = "Loading...", 
  className = "" 
}: LoadingSpinnerProps) => {
  return (
    // Gradient background container
    <div className={`min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-blue-500 flex items-center justify-center ${className}`}>
      <div className="text-center">
        {/* Animated spinner circle */}
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4 mx-auto"></div>
        {/* Loading message */}
        <p className="text-white text-xl font-semibold">{message}</p>
      </div>
    </div>
  )
}

// Smaller loading spinner for component-level loading states
export const CompactLoadingSpinner = ({ 
  message = "Loading...", 
  className = "" 
}: LoadingSpinnerProps) => {
  return (
    // Centered container with padding
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center">
        {/* Small animated spinner */}
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current mb-2 mx-auto"></div>
        {/* Compact message */}
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  )
}

// Inline spinner for button loading states
export const ButtonLoadingSpinner = ({ 
  message = "Loading...", 
  className = "" 
}: LoadingSpinnerProps) => {
  return (
    // Inline flex container
    <div className={`flex items-center justify-center ${className}`}>
      {/* Tiny animated spinner */}
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
      {/* Loading text */}
      <span>{message}</span>
    </div>
  )
}

export default LoadingSpinner 