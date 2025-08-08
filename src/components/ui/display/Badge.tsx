import React from 'react'
import { Badge as BadgeType } from '@/lib/mock-xp-system'

interface BadgeProps {
  badge: BadgeType
  earned?: boolean
  earnedAt?: string
  size?: 'small' | 'medium' | 'large'
  showDescription?: boolean
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  badge,
  earned = false,
  earnedAt,
  size = 'medium',
  showDescription = false,
  className = '',
}) => {
  const getRarityColors = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'from-gray-400 to-gray-500'
      case 'rare':
        return 'from-blue-400 to-blue-500'
      case 'epic':
        return 'from-purple-400 to-purple-500'
      case 'legendary':
        return 'from-yellow-400 to-yellow-500'
      default:
        return 'from-gray-400 to-gray-500'
    }
  }

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-300'
      case 'rare':
        return 'border-blue-300'
      case 'epic':
        return 'border-purple-300'
      case 'legendary':
        return 'border-yellow-300'
      default:
        return 'border-gray-300'
    }
  }

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'w-12 h-12 text-lg'
      case 'medium':
        return 'w-16 h-16 text-2xl'
      case 'large':
        return 'w-20 h-20 text-3xl'
      default:
        return 'w-16 h-16 text-2xl'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Badge Icon */}
      <div
        className={`
          ${getSizeClasses(size)}
          ${getRarityBorder(badge.rarity)}
          ${earned ? `bg-gradient-to-br ${getRarityColors(badge.rarity)}` : 'bg-gray-200'}
          border-2 rounded-full flex items-center justify-center
          ${earned ? 'shadow-lg' : 'opacity-50'}
          ${earned ? 'hover:scale-105' : ''}
          transition-transform duration-200
        `}
      >
        <span className={earned ? 'text-white' : 'text-gray-400'}>
          {badge.icon}
        </span>
      </div>

      {/* Badge Info */}
      <div className="mt-2 text-center">
        <h3 className={`font-semibold ${earned ? 'text-gray-800' : 'text-gray-500'}`}>
          {badge.name}
        </h3>
        
        {showDescription && (
          <p className={`text-sm mt-1 ${earned ? 'text-gray-600' : 'text-gray-400'}`}>
            {badge.description}
          </p>
        )}

        {earned && earnedAt && (
          <p className="text-xs text-gray-500 mt-1">
            Earned {formatDate(earnedAt)}
          </p>
        )}

        {!earned && badge.requirement_type === 'xp_total' && (
          <p className="text-xs text-gray-500 mt-1">
            Need {badge.requirement_value} XP
          </p>
        )}

        {!earned && badge.requirement_type === 'activity_count' && (
          <p className="text-xs text-gray-500 mt-1">
            Need {badge.requirement_value} activities
          </p>
        )}

        {!earned && badge.requirement_type === 'streak' && (
          <p className="text-xs text-gray-500 mt-1">
            Need {badge.requirement_value} day streak
          </p>
        )}
      </div>

      {/* Rarity Indicator */}
      {badge.rarity !== 'common' && (
        <div className="mt-1">
          <span 
            className={`
              text-xs px-2 py-1 rounded-full
              ${badge.rarity === 'rare' ? 'bg-blue-100 text-blue-700' : ''}
              ${badge.rarity === 'epic' ? 'bg-purple-100 text-purple-700' : ''}
              ${badge.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-700' : ''}
            `}
          >
            {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
          </span>
        </div>
      )}
    </div>
  )
}

export default Badge 