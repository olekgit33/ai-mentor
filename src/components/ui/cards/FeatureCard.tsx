import React from 'react'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  className?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  className = '' 
}) => {
  return (
    <div className={`group bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 text-center border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${className}`}>
      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg">
        {title}
      </h3>
      <p className="text-white/80 group-hover:text-white/90 transition-colors duration-300 text-sm sm:text-base">
        {description}
      </p>
    </div>
  )
}

export default FeatureCard 