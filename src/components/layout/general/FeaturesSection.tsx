import React from 'react'
import { FeatureCard } from '@/components'

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: '🧠',
      title: 'AI-Powered Learning',
      description: 'Chat with Astra, our friendly AI mentor who adapts to your child\'s learning style'
    },
    {
      icon: '💬',
      title: 'Interactive Conversations',
      description: 'Natural conversations with Astra that adapt to your child\'s interests and learning style'
    },
    {
      icon: '🤱',
      title: 'Parent Dashboard',
      description: 'Track progress and stay involved in your child\'s learning journey',
      className: 'sm:col-span-2 md:col-span-1'
    }
  ]

  return (
    <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 md:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            className={feature.className}
          />
        ))}
      </div>
    </div>
  )
}

export default FeaturesSection 