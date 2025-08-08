import React from 'react'

interface AuthCardProps {
  children: React.ReactNode
  className?: string
}

const AuthCard: React.FC<AuthCardProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-blue-500 flex items-center justify-center p-4">
      <div className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md ${className}`}>
        {children}
      </div>
    </div>
  )
}

export default AuthCard 