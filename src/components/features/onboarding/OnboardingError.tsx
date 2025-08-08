import React from 'react'

interface OnboardingErrorProps {
  error: string
}

const OnboardingError: React.FC<OnboardingErrorProps> = ({ error }) => {
  if (!error) return null

  return (
    <div className="mb-4 p-4 bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300 text-red-700 rounded-xl shadow-lg animate-pulse">
      <div className="flex items-center space-x-2">
        <span className="text-xl">⚠️</span>
        <span className="font-medium">{error}</span>
      </div>
    </div>
  )
}

export default OnboardingError 