import React from 'react'

interface EarnedBadgeProps {
  badge: {
    id: string
    name: string
    description: string
    icon: string
    rarity: 'common' | 'rare' | 'epic' | 'legendary'
    earned: boolean
    earned_at?: string
  }
  index: number
}

const EarnedBadge: React.FC<EarnedBadgeProps> = ({ badge, index }) => {
  const getRarityStyles = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-500/30 text-gray-200'
      case 'rare':
        return 'bg-blue-500/30 text-blue-200'
      case 'epic':
        return 'bg-purple-500/30 text-purple-200'
      case 'legendary':
        return 'bg-yellow-500/30 text-yellow-200'
      default:
        return 'bg-gray-500/30 text-gray-200'
    }
  }

  return (
    <div className={`relative group ${index >= 4 ? 'hidden sm:block' : ''}`}>
      {/* Earned Badge Container */}
      <div className="relative bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl p-3 sm:p-4 border border-green-400/40 hover:border-green-400/80 transition-all duration-300 transform hover:scale-110 hover:rotate-2 h-40 sm:h-48 flex flex-col">
        {/* Celebration Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-blue-400/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

        {/* Badge */}
        <div className="text-center flex flex-col h-full">
          <div className="relative mb-2 sm:mb-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-lg sm:text-2xl shadow-lg mx-auto">
              {badge.icon}
            </div>
            {/* Success Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-green-400/50 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
            {/* Sparkle Effect */}
            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full opacity-0 group-hover:opacity-80 group-hover:animate-ping transition-opacity duration-300"></div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-white mb-1 line-clamp-2">{badge.name}</h5>
              <p className="text-xs text-green-200 mb-2 line-clamp-2 hidden sm:block">{badge.description}</p>
            </div>

            {/* Rarity Badge */}
            <div className={`text-xs px-2 py-1 rounded-full inline-block ${getRarityStyles(badge.rarity)}`}>
              {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
            </div>
          </div>
        </div>

        {/* Celebration Particles */}
        <div className="absolute -top-2 -right-2 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  )
}

export default EarnedBadge 