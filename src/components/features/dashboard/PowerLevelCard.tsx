import React from 'react'

interface PowerLevelCardProps {
  dashboardData: {
    xpRecord: {
      current_xp: number
      max_xp: number
      global_level: number
    }
  }
}

const PowerLevelCard: React.FC<PowerLevelCardProps> = ({ dashboardData }) => {
  return (
    <div className="relative bg-black/30 backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-2xl border border-white/10">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-xl blur-xl"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
          <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-0">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Power Level</h3>
              <p className="hidden sm:block text-white/70">Rising to the next level!</p>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <div className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Level {dashboardData.xpRecord.global_level} to {dashboardData.xpRecord.global_level + 1}
            </div>
            <div className="relative inline-block">
              <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/40 rounded-lg px-2 sm:px-3 py-1 sm:py-2 shadow-lg">
                <div className="text-yellow-200 font-bold text-xs sm:text-sm animate-pulse">
                  <span className="text-white font-extrabold">{dashboardData.xpRecord.current_xp}</span>
                  <span className="text-yellow-300 mx-1">/</span>
                  <span className="text-white font-extrabold">{dashboardData.xpRecord.max_xp}</span>
                  <span className="hidden sm:inline text-yellow-200 ml-1">XP to next level</span>
                </div>
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-lg blur-sm -z-10"></div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className="relative">
          <div className="flex justify-between text-white/80 text-sm mb-2">
            <span>Level {dashboardData.xpRecord.global_level}</span>
            <span>Level {dashboardData.xpRecord.global_level + 1}</span>
          </div>
          <div className="w-full bg-gray-800/50 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out shadow-lg relative"
              style={{ width: `${(dashboardData.xpRecord.current_xp / dashboardData.xpRecord.max_xp) * 100}%` }}
            >
              {/* Animated Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 rounded-full opacity-60 animate-pulse"></div>
              {/* Moving Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full transform -skew-x-12 animate-pulse"></div>
            </div>
          </div>
          {/* Progress Percentage */}
          <div className="absolute -top-6 text-white/90 text-sm font-medium" style={{ left: `${(dashboardData.xpRecord.current_xp / dashboardData.xpRecord.max_xp) * 100}%`, transform: 'translateX(-50%)' }}>
            {Math.round((dashboardData.xpRecord.current_xp / dashboardData.xpRecord.max_xp) * 100)}%
          </div>
        </div>
      </div>
    </div>
  )
}

export default PowerLevelCard 