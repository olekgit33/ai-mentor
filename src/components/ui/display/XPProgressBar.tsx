import React from 'react'

// Visual progress bar component for XP and level tracking
interface XPProgressBarProps {
  totalXP: number          // Total XP earned
  level: number           // Current level
  xpToNextLevel: number  // XP needed for next level
  className?: string    // Additional styling
}

export const XPProgressBar: React.FC<XPProgressBarProps> = ({
  totalXP,
  level,
  xpToNextLevel,
  className = '',
}) => {
  // Calculate current level progress percentage
  const levelStartXP = totalXP - xpToNextLevel
  const progressInCurrentLevel = totalXP - levelStartXP
  const progressPercentage = (progressInCurrentLevel / (level * 100)) * 100

  // Helper to get XP requirement for next level
  const getXPNeededForNextLevel = () => {
    return xpToNextLevel
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Level badge and total XP display */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          {/* Level indicator with gradient background */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            Level {level}
          </div>
          {/* Total XP counter */}
          <span className="text-sm font-medium text-gray-600">
            {totalXP.toLocaleString()} XP
          </span>
        </div>
        {/* XP needed for next level */}
        <div className="text-sm text-gray-500">
          {getXPNeededForNextLevel()} XP to next level
        </div>
      </div>

      {/* Progress bar container */}
      <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100"></div>
        
        {/* Animated progress fill with gradient */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
        >
          {/* Animated shine effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-pulse"></div>
        </div>

        {/* Level up celebration animation */}
        {progressPercentage >= 100 && (
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 animate-pulse rounded-full"></div>
        )}
      </div>

      {/* Detailed progress statistics */}
      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
        {/* Current level progress fraction */}
        <span>
          {Math.floor(progressInCurrentLevel)} / {level * 100} XP
        </span>
        {/* Progress percentage */}
        <span>
          {Math.round(progressPercentage)}% complete
        </span>
      </div>
    </div>
  )
}

export default XPProgressBar 