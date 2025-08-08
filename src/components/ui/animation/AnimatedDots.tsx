import React from 'react'

// Flexible animated dots component for loading, typing, and progress indicators
interface AnimatedDotsProps {
  variant?: 'progress' | 'typing' | 'loading'  // Animation style
  count?: number                               // Number of dots
  size?: 'sm' | 'md' | 'lg'                   // Dot size
  color?: string                              // Dot color theme
  spacing?: 'tight' | 'normal' | 'wide'       // Space between dots
  className?: string                          // Additional CSS classes
  label?: string                              // Optional label for typing indicator
}

const AnimatedDots: React.FC<AnimatedDotsProps> = ({
  variant = 'progress',
  count = 3,
  size = 'md',
  color = 'purple',
  spacing = 'normal',
  className = '',
  label
}) => {
  // Get Tailwind classes for dot sizes based on viewport
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-1.5 h-1.5'
      case 'md':
        return 'w-2 h-2 sm:w-3 sm:h-3'
      case 'lg':
        return 'w-3 h-3 sm:w-4 sm:h-4'
      default:
        return 'w-2 h-2 sm:w-3 sm:h-3'
    }
  }

  // Get Tailwind classes for dot spacing with responsive design
  const getSpacingClasses = () => {
    switch (spacing) {
      case 'tight':
        return 'space-x-1'
      case 'normal':
        return 'space-x-1.5 sm:space-x-2'
      case 'wide':
        return 'space-x-2 sm:space-x-3'
      default:
        return 'space-x-1.5 sm:space-x-2'
    }
  }

  // Get Tailwind classes for dot colors using theme colors
  const getColorClasses = () => {
    switch (color) {
      case 'purple':
        return 'bg-purple-500'
      case 'pink':
        return 'bg-pink-500'
      case 'blue':
        return 'bg-blue-500'
      case 'green':
        return 'bg-green-500'
      case 'yellow':
        return 'bg-yellow-500'
      case 'gray':
        return 'bg-gray-500'
      default:
        return 'bg-purple-500'
    }
  }

  // Get animation class based on variant type
  const getAnimation = () => {
    switch (variant) {
      case 'typing':
        return 'animate-bounce'
      case 'loading':
        return 'animate-pulse'
      default:
        return 'animate-pulse'
    }
  }

  // Generate animated dots with staggered delays
  const renderDots = () => {
    const dots = []
    const sizeClasses = getSizeClasses()
    const colorClasses = getColorClasses()
    const animation = getAnimation()

    for (let i = 0; i < count; i++) {
      // Stagger animation timing for wave effect
      const delay = variant === 'typing' ? i * 0.1 : i * 0.2
      dots.push(
        <div
          key={`dot-${i}`}
          className={`${sizeClasses} ${colorClasses} rounded-full ${animation}`}
          style={{ animationDelay: `${delay}s` }}
        />
      )
    }

    return dots
  }

  // Combine all spacing and custom classes
  const containerClasses = `flex items-center justify-center ${getSpacingClasses()} ${className}`

  // Special layout for typing indicator with label
  if (variant === 'typing' && label) {
    return (
      <div className="flex items-center space-x-2">
        <div className={containerClasses}>
          {renderDots()}
        </div>
        <span className="text-sm text-purple-600">{label}</span>
      </div>
    )
  }

  // Default layout for progress and loading indicators
  return (
    <div className={containerClasses}>
      {renderDots()}
    </div>
  )
}

export default AnimatedDots 