import React from 'react'

interface PreviewFeatureCardProps {
  icon: string
  title: string
  description: string
  gradientFrom: string
  gradientTo: string
  animationDelay?: string
}

const PreviewFeatureCard: React.FC<PreviewFeatureCardProps> = ({
  icon,
  title,
  description,
  gradientFrom,
  gradientTo,
  animationDelay = '0s'
}) => {
  return (
    <div className={`p-3 sm:p-4 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-lg`}>
      <div 
        className="text-2xl sm:text-3xl mb-1 sm:mb-2 animate-pulse" 
        style={{animationDelay}}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-600">{description}</p>
    </div>
  )
}

export default PreviewFeatureCard 