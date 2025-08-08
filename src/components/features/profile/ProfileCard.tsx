import React from 'react'

interface ChildProfile {
  id: string
  user_id: string
  name: string
  age: number
  interests: string
  avatar_emoji: string
  created_at: string
  updated_at: string
}

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

interface ProfileCardProps {
  childProfile?: ChildProfile | null
  earnedBadges: Badge[]
  allBadges: Badge[]
  totalCombinedXP: number
  globalLevel: number
  skillsData: {
    communication: { totalXP: number }
    problemSolving: { totalXP: number }
    leadership: { totalXP: number }
  }
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  childProfile, 
  earnedBadges, 
  allBadges, 
  totalCombinedXP, 
  globalLevel,
  skillsData 
}) => {
  return (
    <div className="relative bg-black/30 backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-2xl border border-white/10 h-full">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
      
      {/* Level Ribbon */}
      <div className="absolute -top-3 -right-4 z-20">
        <div className="relative">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl shadow-2xl transform rotate-12 font-bold text-2xl">
            Level {globalLevel}
          </div>
          {/* Ribbon Shadow */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-700 via-orange-700 to-red-700 rounded-2xl transform rotate-12 translate-x-3 translate-y-3 -z-10"></div>
          {/* Ribbon Tail */}
          <div className="absolute -bottom-3 -right-3 w-0 h-0 border-l-8 border-l-red-700 border-t-8 border-t-transparent border-b-8 border-b-transparent transform rotate-12"></div>
          {/* Ribbon Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl blur-lg opacity-50 transform rotate-12"></div>
        </div>
      </div>
      
      <div className="relative z-10 mt-10">
        {/* Mobile Compact Layout */}
        <div className="sm:hidden">
          <div className="flex items-center space-x-3 mb-3">
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-xl shadow-lg">
                {childProfile?.avatar_emoji || '😊'}
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-green-400/30 animate-pulse"></div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-bold text-white truncate">
                  {childProfile?.name || 'Young Learner'}
                </h4>
                <button
                  onClick={() => window.location.href = '/child-onboarding'}
                  className="w-6 h-6 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors duration-200 group border border-white/30 hover:border-white/50 cursor-pointer"
                >
                  <div className="text-white group-hover:text-white text-xs">✏️</div>
                </button>
              </div>
              <p className="text-white/80 text-xs">Age: {childProfile?.age?.toString() || 'Not set'}</p>
            </div>
          </div>
          
          {/* Compact Stats */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-3 border border-yellow-400/30">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="flex items-center space-x-1">
                <span className="text-lg">🏆</span>
                <span className="text-yellow-400 font-bold">{earnedBadges.length}</span>
                <span className="text-white/70">badges</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-lg">🌟</span>
                <span className="text-yellow-400 font-bold">{totalCombinedXP.toLocaleString()}</span>
                <span className="text-white/70">XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Profile Info */}
          <div className="text-center">
            <div className="relative inline-block mb-3 sm:mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-lg">
                {childProfile?.avatar_emoji || '😊'}
              </div>
              {/* Profile Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-green-400/30 animate-pulse"></div>
            </div>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <h4 className="text-lg sm:text-xl font-bold text-white">
                {childProfile?.name || 'Young Learner'}
              </h4>
              {/* Edit Profile Icon */}
              <button
                onClick={() => window.location.href = '/child-onboarding'}
                className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors duration-200 group border border-white/30 hover:border-white/50 cursor-pointer"
              >
                <div className="text-white group-hover:text-white text-xs sm:text-sm">✏️</div>
              </button>
            </div>
            <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-3">
              Age: {childProfile?.age?.toString() || 'Not set'}
            </p>
            {childProfile?.interests && (
              <div className="bg-white/10 rounded-lg p-3 mb-3">
                <p className="text-white/90 text-sm">
                  <span className="font-medium">What I like:</span> {childProfile.interests}
                </p>
              </div>
            )}

            {!childProfile?.interests && (
              <div className="mb-3"></div>
            )}

            {/* Earned Badges Info */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-3 border border-yellow-400/30">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="text-2xl">🏆</div>
                <div className="text-center">
                  <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                    {earnedBadges.length}
                  </div>
                  <div className="text-white/80 text-xs">Badges Earned</div>
                </div>
              </div>
              <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(earnedBadges.length / allBadges.length) * 100}%` }}
                />
              </div>
              <div className="text-center text-white/70 text-xs mt-1">
                {earnedBadges.length} / {allBadges.length} achievements
              </div>
            </div>
          </div>

          {/* Global XP Stats */}
          <div className="text-center mt-4 sm:mt-6">
            <h4 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">All-Time XP</h4>
            
            {/* Total XP Calculation */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
              <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                {totalCombinedXP.toLocaleString()}
              </div>
              <p className="text-white/80 text-xs sm:text-sm">Total XP Ever Earned</p>
            </div>
            
            {/* XP Breakdown */}
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex justify-between">
                <span>Communication XP:</span>
                <span>{skillsData.communication.totalXP} XP</span>
              </div>
              <div className="flex justify-between">
                <span>Problem Solving XP:</span>
                <span>{skillsData.problemSolving.totalXP} XP</span>
              </div>
              <div className="flex justify-between">
                <span>Leadership XP:</span>
                <span>{skillsData.leadership.totalXP} XP</span>
              </div>
              <div className="border-t border-white/20 pt-2 flex justify-between font-medium text-white/90">
                <span>Total earned:</span>
                <span>{totalCombinedXP.toLocaleString()} XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard 