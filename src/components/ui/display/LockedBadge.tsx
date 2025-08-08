import React from 'react'

interface LockedBadgeProps {
  badge: {
    id: string
    name: string
    description: string
    icon: string
    rarity: 'common' | 'rare' | 'epic' | 'legendary'
    requirement_type: string
    requirement_value: number
    skill?: string
    earned: boolean
  }
  index: number
}

const LockedBadge: React.FC<LockedBadgeProps> = ({ badge, index }) => {
  const getRarityStyles = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-500/20 text-gray-400'
      case 'rare':
        return 'bg-blue-500/20 text-blue-400'
      case 'epic':
        return 'bg-purple-500/20 text-purple-400'
      case 'legendary':
        return 'bg-yellow-500/20 text-yellow-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getRequirementText = () => {
    switch (badge.requirement_type) {
      case 'global_level':
        return `Reach Level ${badge.requirement_value}`
      case 'skill_level':
        return `${badge.skill} Level ${badge.requirement_value}`
      case 'xp_total':
        return `Earn ${badge.requirement_value} XP`
      default:
        return 'Complete requirement'
    }
  }

  return (
    <div className={`relative group ${index >= 4 ? 'hidden sm:block' : ''}`}>
      {/* Locked Badge Container */}
      <div className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl p-3 sm:p-4 border border-gray-600/40 hover:border-gray-500/60 transition-all duration-300 transform hover:scale-105 h-48 sm:h-56 flex flex-col">
        {/* Subtle Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 to-gray-700/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

        {/* Badge */}
        <div className="text-center flex flex-col h-full">
          <div className="relative mb-2 sm:mb-3">
            {/* Locked Badge Icon */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-lg sm:text-2xl shadow-lg mx-auto opacity-60">
              {badge.icon}
            </div>
            {/* Lock Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-800/90 rounded-full flex items-center justify-center border-2 border-gray-600">
                <div className="text-gray-400 text-xs sm:text-sm">🔒</div>
              </div>
            </div>
            {/* Lock Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-gray-600/50"></div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-gray-300 mb-1 line-clamp-2">{badge.name}</h5>
              <p className="text-xs text-gray-400 mb-2 line-clamp-2 hidden sm:block">{badge.description}</p>

              {/* Requirement */}
              <div className="text-xs text-gray-500 mb-2">
                {getRequirementText()}
              </div>
            </div>

            {/* Rarity Badge */}
            <div className={`text-xs px-2 py-1 rounded-full inline-block opacity-60 ${getRarityStyles(badge.rarity)}`}>
              {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LockedBadge 