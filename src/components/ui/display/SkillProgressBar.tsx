import React from 'react'

interface SkillProgressBarProps {
  skill: {
    level: number
    currentXP: number
    maxXP: number
    totalXP: number
  }
  skillName: string
  icon: string
  colors: {
    from: string
    to: string
    text: string
  }
  isMobile?: boolean
}

const SkillProgressBar: React.FC<SkillProgressBarProps> = ({ 
  skill, 
  skillName, 
  icon, 
  colors, 
  isMobile = false 
}) => {
  const progressPercentage = (skill.currentXP / skill.maxXP) * 100

  if (isMobile) {
    return (
      <div className={`bg-gradient-to-br ${colors.from} ${colors.to} rounded-lg p-2 border border-${colors.text.replace('text-', '')}/30`}>
        <div className="flex items-center space-x-2">
          <div className="text-xl">{icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-xs font-bold text-white">{skillName}</h4>
              <div className="flex space-x-0.5">
                <span className={`text-xs ${colors.text} font-medium`}>Lv.{skill.level}</span>
              </div>
            </div>
            <div className={`flex items-center justify-between text-xs ${colors.text} mb-1`}>
              <span>Level {skill.level}</span>
              <span>{skill.currentXP}/{skill.maxXP} XP</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-1">
              <div 
                className={`h-full bg-gradient-to-r ${colors.from.replace('from-', 'from-').replace('/20', '')} ${colors.to.replace('to-', 'to-').replace('/20', '')} rounded-full transition-all duration-1000`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative group">
      <div className={`bg-gradient-to-br ${colors.from} ${colors.to} rounded-xl p-3 border border-${colors.text.replace('text-', '')}/30 hover:border-${colors.text.replace('text-', '')}/60 transition-all duration-300 transform hover:scale-105`}>
        <div className="text-center">
          <div className="text-2xl mb-1 group-hover:animate-bounce">{icon}</div>
          <h4 className="text-base font-bold text-white mb-1">{skillName}</h4>
          <div className={`text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r ${colors.from.replace('from-', 'from-').replace('/20', '')} ${colors.to.replace('to-', 'to-').replace('/20', '')} mb-2`}>
            Level {skill.level} to {skill.level + 1}
          </div>
          
          {/* Skill XP Progress */}
          <div className="mb-2">
            <div className={`flex justify-between text-xs ${colors.text} mb-1`}>
              <span>Level {skill.level}</span>
              <span>Level {skill.level + 1}</span>
            </div>
            <div className={`text-center text-xs ${colors.text} mb-1`}>
              <span>{skill.currentXP}xp / {skill.maxXP}xp</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-1.5">
              <div 
                className={`h-full bg-gradient-to-r ${colors.from.replace('from-', 'from-').replace('/20', '')} ${colors.to.replace('to-', 'to-').replace('/20', '')} rounded-full transition-all duration-1000`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Skill Level Display */}
          <div className="flex justify-center mt-1">
            <span className={`text-xs ${colors.text} font-medium`}>Level {skill.level}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillProgressBar 