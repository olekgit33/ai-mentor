import React from 'react'

interface OnboardingHeaderProps {
  isEditing: boolean
  isMobile?: boolean
}

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({ isEditing, isMobile = false }) => {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <div className="relative inline-block">
        <div className={`${isMobile ? 'text-4xl' : 'text-4xl sm:text-5xl md:text-6xl'} mb-3 ${isMobile ? '' : 'sm:mb-4'} animate-bounce`}></div>
        <div className={`absolute ${isMobile ? '-top-1 -right-1 w-3 h-3' : '-top-1 sm:-top-2 -right-1 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4'} bg-yellow-400 rounded-full animate-ping`}></div>
        <div className={`absolute ${isMobile ? '-bottom-1 -left-1 w-2 h-2' : '-bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-2 h-2 sm:w-3 sm:h-3'} bg-pink-400 rounded-full animate-pulse`}></div>
      </div>
      
      <h1 className={`${isMobile ? 'text-xl' : 'text-xl sm:text-2xl md:text-3xl'} font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2 animate-pulse ${isMobile ? '' : 'px-2 sm:px-0'}`}>
        {isEditing ? 'Update Your Profile' : 'Welcome to Your Learning Adventure!'}
      </h1>
      
      <p className={`text-gray-700 ${isMobile ? 'text-sm' : 'text-sm sm:text-base md:text-lg'} font-medium ${isMobile ? '' : 'px-2 sm:px-0'}`}>
        {isEditing ? 'Update your information below' : 'Let\'s get to know you better so we can personalize your experience'}
      </p>
    </div>
  )
}

export default OnboardingHeader 