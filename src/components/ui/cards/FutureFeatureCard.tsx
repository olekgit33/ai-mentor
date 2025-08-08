import React from 'react'

interface FutureFeatureCardProps {
  icon: string
  title: string
  description: string
  status: 'In Development' | 'Coming Soon' | 'Ready'
  animationDelay?: string
}

const FutureFeatureCard: React.FC<FutureFeatureCardProps> = ({
  icon,
  title,
  description,
  status,
  animationDelay = '0s'
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Development':
        return 'bg-purple-100 text-purple-600'
      case 'Coming Soon':
        return 'bg-blue-100 text-blue-600'
      case 'Ready':
        return 'bg-green-100 text-green-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 text-center transform hover:scale-105 transition-transform duration-300">
      <div 
        className="text-3xl sm:text-4xl mb-2 sm:mb-4 animate-pulse" 
        style={{animationDelay}}
      >
        {icon}
      </div>
      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2">{title}</h3>
      <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-0">
        {description}
      </p>
      <div className={`mt-2 sm:mt-4 px-2 sm:px-3 py-1 ${getStatusColor(status)} rounded-full text-xs font-medium`}>
        {status}
      </div>
    </div>
  )
}

export default FutureFeatureCard 