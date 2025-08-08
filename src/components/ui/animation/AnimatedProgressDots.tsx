import React from 'react'
import AnimatedDots from './AnimatedDots'

// Wrapper component for progress indicator using animated dots
const AnimatedProgressDots: React.FC = () => {
  return (
    // Container with responsive margin
    <div className="mb-4 sm:mb-8">
      {/* Progress dots with medium size and normal spacing */}
      <AnimatedDots 
        variant="progress" 
        count={3} 
        size="md" 
        spacing="normal"
        className="justify-center"
      />
    </div>
  )
}

export default AnimatedProgressDots 