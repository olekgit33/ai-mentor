'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { FeatureItem } from '@/components'

interface Feature {
  icon: string
  text: string
}

interface RoleCardProps {
  role: 'parent' | 'child'
  title: string
  description: string
  icon: string
  features: Feature[]
  onSelect: () => void
  isUpdating: boolean
  isCurrentlyUpdating: boolean
  selectedRole?: 'parent' | 'child' | null
}

const RoleCard: React.FC<RoleCardProps> = ({
  role,
  title,
  description,
  icon,
  features,
  onSelect,
  isUpdating,
  isCurrentlyUpdating,
  selectedRole
}) => {
  const router = useRouter()
  
  const gradientClasses = {
    parent: 'from-purple-500 via-pink-500 to-purple-600',
    child: 'from-blue-500 via-cyan-500 to-blue-600'
  }
  
  const hoverGradientClasses = {
    parent: 'hover:from-purple-600 hover:via-pink-600 hover:to-purple-700',
    child: 'hover:from-blue-600 hover:via-cyan-600 hover:to-blue-700'
  }
  
  const ringClasses = {
    parent: 'ring-purple-400',
    child: 'ring-blue-400'
  }
  
  const glowClasses = {
    parent: 'from-purple-500 via-pink-500 to-purple-600',
    child: 'from-blue-500 via-cyan-500 to-blue-600'
  }
  
  const iconGlowClasses = {
    parent: 'bg-purple-400/20',
    child: 'bg-blue-400/20'
  }

  const color = role === 'parent' ? 'purple' : 'blue'

  return (
    <div className="group relative">
      {/* Background Glow */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${glowClasses[role]} rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500`}></div>
      
      <div className={`relative bg-black/30 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-3xl ${
        selectedRole === role ? `ring-4 ${ringClasses[role]}` : ''
      }`}>
        {/* Glass Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-2xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="relative inline-block mb-3 sm:mb-4">
            <div 
              className={`text-4xl sm:text-5xl mb-1 group-hover:animate-bounce transition-all duration-300 ${role === 'child' ? 'cursor-pointer hover:scale-110' : ''}`}
              onClick={role === 'child' ? () => router.push('/') : undefined}
            >
              {icon}
            </div>
            <div className={`absolute -inset-2 ${iconGlowClasses[role]} rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">
            {title}
          </h3>
          <p className="text-white/90 mb-4 sm:mb-5 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
          
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-left">
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                icon={feature.icon}
                text={feature.text}
                color={color}
              />
            ))}
          </div>

          <button
            onClick={onSelect}
            disabled={isUpdating}
            className={`w-full py-3 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 bg-gradient-to-r ${gradientClasses[role]} text-white ${hoverGradientClasses[role]} disabled:opacity-50 shadow-xl hover:shadow-2xl transform hover:scale-105 cursor-pointer`}
          >
            {isCurrentlyUpdating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                <span className="text-sm sm:text-base">
                  {role === 'parent' ? 'Setting up...' : 'Starting...'}
                </span>
              </div>
            ) : (
              `I am a ${role === 'parent' ? 'Parent' : 'Child'}`
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoleCard 