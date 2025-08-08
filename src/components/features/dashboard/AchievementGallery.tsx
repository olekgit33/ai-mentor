import React from 'react'
import { EarnedBadge, LockedBadge } from '@/components'

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: string
  requirement_type: string
  requirement_value: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  earned: boolean
  earned_at?: string
  skill?: string
}

interface AchievementGalleryProps {
  earnedBadges: Badge[]
  lockedBadges: Badge[]
  allBadges: Badge[]
}

const AchievementGallery: React.FC<AchievementGalleryProps> = ({ 
  earnedBadges, 
  lockedBadges, 
  allBadges 
}) => {
  return (
    <div className="relative bg-black/30 backdrop-blur-lg rounded-2xl p-4 sm:p-8 shadow-2xl mb-8 border border-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 rounded-2xl blur-xl"></div>
      
      <div className="relative z-10">
        {/* Header with Stats */}
        <div className="mb-6 sm:mb-8">
          {/* Title Section */}
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Achievement Gallery</h3>
              <p className="text-white/70 text-sm sm:text-base">Your legendary progress showcase</p>
            </div>
          </div>

          {/* Achievement Stats - Mobile: Vertical Stack, Desktop: Horizontal */}
          <div className="grid grid-cols-3 sm:flex sm:items-center sm:justify-center sm:space-x-6 gap-4 sm:gap-0">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                {earnedBadges.length}
              </div>
              <div className="text-white/80 text-xs sm:text-sm">Earned</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
                {lockedBadges.length}
              </div>
              <div className="text-white/80 text-xs sm:text-sm">To Unlock</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {Math.round((earnedBadges.length / allBadges.length) * 100)}%
              </div>
              <div className="text-white/80 text-xs sm:text-sm">Complete</div>
            </div>
          </div>
        </div>

        {/* Earned Badges Section */}
        {earnedBadges.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="text-xl sm:text-2xl">✨</div>
              <h4 className="text-lg sm:text-xl font-bold text-white">Unlocked Achievements</h4>
              <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
              {earnedBadges.map((badge, index) => (
                <EarnedBadge key={badge.id} badge={badge} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Locked Badges Section */}
        {lockedBadges.length > 0 && (
          <div>
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="text-xl sm:text-2xl">🔒</div>
              <h4 className="text-lg sm:text-xl font-bold text-white">Next to Unlock</h4>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-400/50 to-transparent"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
              {lockedBadges.slice(0, 6).map((badge, index) => (
                <LockedBadge key={badge.id} badge={badge} index={index} />
              ))}
            </div>

            {/* Mobile: Show message for more badges */}
            <div className="sm:hidden text-center mt-4">
              <div className="text-white/60 text-xs">
                {earnedBadges.length > 4 && `${earnedBadges.length - 4} more earned badges`}
                {earnedBadges.length > 4 && lockedBadges.length > 4 && ' • '}
                {lockedBadges.length > 4 && `${lockedBadges.length - 4} more to unlock`}
              </div>
            </div>

            {/* Desktop: Show message for more locked badges */}
            {lockedBadges.length > 6 && (
              <div className="hidden sm:block text-center mt-6">
                <div className="text-white/60 text-sm">
                  {lockedBadges.length - 6} more achievements to unlock
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AchievementGallery 