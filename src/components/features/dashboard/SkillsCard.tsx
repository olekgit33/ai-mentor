import React from 'react'
import { SkillProgressBar } from '@/components'

interface SkillsCardProps {
  skillsData: {
    communication: {
      level: number
      currentXP: number
      maxXP: number
      totalXP: number
    }
    problemSolving: {
      level: number
      currentXP: number
      maxXP: number
      totalXP: number
    }
    leadership: {
      level: number
      currentXP: number
      maxXP: number
      totalXP: number
    }
  }
}

const SkillsCard: React.FC<SkillsCardProps> = ({ skillsData }) => {
  return (
    <div className="relative bg-black/30 backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-2xl border border-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Skills</h3>
            <p className="hidden sm:block text-white/70">Your growing abilities</p>
          </div>
        </div>
        
        {/* Mobile Compact Layout */}
        <div className="sm:hidden space-y-2">
          <SkillProgressBar
            skill={skillsData.communication}
            skillName="Communication"
            icon="🗣️"
            colors={{
              from: "from-blue-500/20",
              to: "to-cyan-500/20",
              text: "text-blue-300"
            }}
            isMobile={true}
          />
          <SkillProgressBar
            skill={skillsData.problemSolving}
            skillName="Problem Solving"
            icon="🧩"
            colors={{
              from: "from-purple-500/20",
              to: "to-pink-500/20",
              text: "text-purple-300"
            }}
            isMobile={true}
          />
          <SkillProgressBar
            skill={skillsData.leadership}
            skillName="Leadership"
            icon="👑"
            colors={{
              from: "from-green-500/20",
              to: "to-emerald-500/20",
              text: "text-green-300"
            }}
            isMobile={true}
          />
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-4">
          <SkillProgressBar
            skill={skillsData.communication}
            skillName="Communication"
            icon="🗣️"
            colors={{
              from: "from-blue-500/20",
              to: "to-cyan-500/20",
              text: "text-blue-300"
            }}
            isMobile={false}
          />
          <SkillProgressBar
            skill={skillsData.problemSolving}
            skillName="Problem Solving"
            icon="🧩"
            colors={{
              from: "from-purple-500/20",
              to: "to-pink-500/20",
              text: "text-purple-300"
            }}
            isMobile={false}
          />
          <SkillProgressBar
            skill={skillsData.leadership}
            skillName="Leadership"
            icon="👑"
            colors={{
              from: "from-green-500/20",
              to: "to-emerald-500/20",
              text: "text-green-300"
            }}
            isMobile={false}
          />
        </div>
      </div>
    </div>
  )
}

export default SkillsCard 