'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface AuthHeaderProps {
  title: string
  subtitle: string
  showLogo?: boolean
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  showLogo = true
}) => {
  const router = useRouter()

  return (
    <div className="text-center mb-8">
      {showLogo && (
        <div 
          className="text-4xl mb-4 cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => router.push('/')}
        >
          🎓
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        {subtitle}
      </p>
    </div>
  )
}

export default AuthHeader 