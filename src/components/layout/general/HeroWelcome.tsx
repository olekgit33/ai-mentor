import React from 'react'

interface HeroWelcomeProps {
  childProfile?: {
    name?: string
  } | null
}

const HeroWelcome: React.FC<HeroWelcomeProps> = ({ childProfile }) => {
  return (
    <div className="text-center mb-6 sm:mb-12">
      <div className="relative inline-block">
        {/* Celebration Sparkles - Hidden on Mobile */}
        <div className="hidden sm:block absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="hidden sm:block absolute -top-2 -right-2 w-3 h-3 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="hidden sm:block absolute -bottom-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="hidden sm:block absolute -bottom-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
      </div>
      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg">
        {childProfile?.name ? `Welcome back, ${childProfile.name}!` : 'Welcome, Champion!'}
      </h2>
      <p className="hidden sm:block text-white/90 text-xl max-w-2xl mx-auto">
        Behold your constellation of achievements! Every star represents your incredible journey with Astra.
      </p>
    </div>
  )
}

export default HeroWelcome 