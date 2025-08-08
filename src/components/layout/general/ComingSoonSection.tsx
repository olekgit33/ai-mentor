import React from 'react'
import { AnimatedProgressDots, PreviewFeatureCard } from '@/components'

const ComingSoonSection: React.FC = () => {
  const previewFeatures = [
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Monitor learning achievements',
      gradientFrom: 'from-blue-50',
      gradientTo: 'to-purple-50',
      animationDelay: '0s'
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Family Management',
      description: 'Manage multiple child profiles',
      gradientFrom: 'from-green-50',
      gradientTo: 'to-blue-50',
      animationDelay: '0.3s'
    },
    {
      icon: '🎯',
      title: 'Learning Goals',
      description: 'Set and track educational goals',
      gradientFrom: 'from-purple-50',
      gradientTo: 'to-pink-50',
      animationDelay: '0.6s'
    }
  ]

  return (
    <div className="text-center mb-6 sm:mb-12">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-8 md:p-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">Coming Soon!</h2>
        <p className="text-sm sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto px-2">
          We&apos;re working hard to bring you an amazing parent dashboard with comprehensive tools to manage your child&apos;s learning journey.
        </p>
        
        <AnimatedProgressDots />
        
        {/* Feature Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8">
          {previewFeatures.map((feature, index) => (
            <div key={index} className={index === 2 ? 'sm:col-span-2 md:col-span-1' : ''}>
              <PreviewFeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradientFrom={feature.gradientFrom}
                gradientTo={feature.gradientTo}
                animationDelay={feature.animationDelay}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ComingSoonSection 