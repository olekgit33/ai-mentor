import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-white/5 backdrop-blur-md border-t border-white/10 mt-8 sm:mt-12 md:mt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="text-xl sm:text-2xl">🎓</div>
            <span className="text-white font-medium whitespace-nowrap">ONE EDU</span>
          </div>
          <div className="text-white/70 text-sm sm:text-base text-center sm:text-right">
            © 2025 ONE EDU. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 