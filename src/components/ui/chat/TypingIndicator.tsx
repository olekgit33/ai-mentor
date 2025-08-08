import React from 'react'
import AnimatedDots from '../animation/AnimatedDots'

interface TypingIndicatorProps {
  isMobile?: boolean
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isMobile = false }) => {
  return (
    <div className="flex justify-start">
      <div className={`bg-white/95 backdrop-blur-sm rounded-2xl px-${isMobile ? '3' : '4'} py-${isMobile ? '2' : '3'} shadow-lg border border-purple-200/50`}>
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs">
            🌟
          </div>
          <span className="text-xs font-medium text-purple-600">Astra</span>
        </div>
        <div className="flex items-center space-x-2">
          <AnimatedDots 
            variant="typing" 
            count={3} 
            size="sm" 
            color="purple"
            label="Typing..."
          />
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator 