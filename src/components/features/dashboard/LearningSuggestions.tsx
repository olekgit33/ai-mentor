'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

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

interface LearningSuggestionsProps {
  skillsData: {
    communication: { level: number; currentXP: number; maxXP: number; totalXP: number }
    problemSolving: { level: number; currentXP: number; maxXP: number; totalXP: number }
    leadership: { level: number; currentXP: number; maxXP: number; totalXP: number }
  }
  earnedBadges: Badge[]
  lockedBadges: Badge[]
}

const LearningSuggestions: React.FC<LearningSuggestionsProps> = () => {
  const router = useRouter()

  return (
    <div className="relative bg-black/30 backdrop-blur-lg rounded-2xl p-4 sm:p-8 shadow-2xl border border-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
      
      <div className="relative z-10">
        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 sm:p-6 border border-purple-400/30">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white">Ready to Learn?</h4>
                <p className="text-white/80 text-sm sm:text-base">Astra is waiting to help you grow!</p>
              </div>
            </div>
            
            <button
              onClick={() => router.push('/mentor-chat')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
            >
              <span className="mr-2">Chat with Astra</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearningSuggestions 