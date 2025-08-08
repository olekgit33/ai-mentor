import React from 'react'

interface FeatureItemProps {
  icon: string
  text: string
  color?: 'purple' | 'blue'
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  text,
  color = 'purple'
}) => {
  const colorClasses = {
    purple: 'bg-purple-500/30 group-hover:bg-purple-500/50',
    blue: 'bg-blue-500/30 group-hover:bg-blue-500/50'
  }

  return (
    <div className="flex items-center text-white/90 group-hover:text-white transition-colors">
      <div className={`w-6 h-6 sm:w-8 sm:h-8 ${colorClasses[color]} rounded-full flex items-center justify-center mr-2 sm:mr-3 transition-colors`}>
        <span className="text-sm sm:text-base">{icon}</span>
      </div>
      <span className="font-medium text-sm sm:text-base">{text}</span>
    </div>
  )
}

export default FeatureItem 