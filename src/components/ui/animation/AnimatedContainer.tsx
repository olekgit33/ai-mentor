import React from 'react'

interface AnimatedContainerProps {
  children: React.ReactNode
  variant?: 'chat' | 'onboarding' | 'default'
  showSparkles?: boolean
  className?: string
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ 
  children, 
  variant = 'default',
  showSparkles = true,
  className = ''
}) => {
  // Variant-specific styling
  const getVariantStyles = () => {
    switch (variant) {
      case 'chat':
        return {
          containerClass: 'relative h-full rounded-3xl p-1 shadow-2xl rainbow-border',
          innerClass: 'relative z-10 bg-gradient-to-br from-blue-50/90 via-cyan-50/80 to-purple-50/90 backdrop-blur-lg rounded-[22px] h-full flex flex-col overflow-hidden',
          showGradientBorder: true,
          showInnerEffects: false
        }
      case 'onboarding':
        return {
          containerClass: 'hidden sm:block relative z-10 w-full max-w-6xl',
          innerClass: 'bg-gradient-to-br from-white/95 via-blue-50/90 to-purple-50/95 backdrop-blur-md rounded-[15px] sm:rounded-[25px] shadow-[0_20px_60px_rgba(59,130,246,0.3)] p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden',
          showGradientBorder: false,
          showInnerEffects: true
        }
      default:
        return {
          containerClass: 'relative h-full rounded-3xl p-1 shadow-2xl rainbow-border',
          innerClass: 'relative z-10 bg-gradient-to-br from-blue-50/90 via-cyan-50/80 to-purple-50/90 backdrop-blur-lg rounded-[22px] h-full flex flex-col overflow-hidden',
          showGradientBorder: true,
          showInnerEffects: false
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <div className={`${styles.containerClass} ${className}`}>
      {/* Rainbow Border for onboarding variant */}
      {variant === 'onboarding' && (
        <div className="relative p-1 rounded-[20px] sm:rounded-[30px] bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 rainbow-border">
          <div className={styles.innerClass}>
            {/* Card Inner Effects */}
            {styles.showInnerEffects && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 rounded-[25px]"></div>
                <div className="absolute top-0 right-1/4 w-16 h-16 bg-white/30 rounded-full blur-sm animate-pulse"></div>
                <div className="absolute bottom-8 left-1/4 w-12 h-12 bg-white/20 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
              </>
            )}
            
            {/* Content */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>
      )}

      {/* Chat/Default variant */}
      {variant !== 'onboarding' && (
        <>
          {/* Rainbow Gradient Border */}
          {styles.showGradientBorder && (
            <div className="absolute inset-0 rounded-3xl rainbow-gradient p-1">
              <div className="w-full h-full rounded-[22px] bg-gradient-to-br from-blue-50/90 via-cyan-50/80 to-purple-50/90 backdrop-blur-lg"></div>
            </div>
          )}
          
          {/* Additional Rainbow Glow Effect */}
          {styles.showGradientBorder && (
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/15 via-violet-500/15 via-pink-500/15 via-blue-500/15 via-cyan-500/15 to-emerald-500/15 blur-sm animate-pulse"></div>
          )}
          
          {/* Rainbow Sparkles */}
          {showSparkles && styles.showGradientBorder && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => {
                const colors = ['#8B5CF6', '#A855F7', '#EC4899', '#3B82F6', '#22D3EE', '#10B981'];
                const color = colors[i % colors.length];
                return (
                  <div
                    key={`rainbow-sparkle-${i}`}
                    className="absolute w-2 h-2 rounded-full animate-pulse"
                    style={{
                      left: `${(i * 15 + 10) % 90}%`,
                      top: `${(i * 20 + 15) % 80}%`,
                      background: color,
                      animationDelay: `${(i * 0.3) % 2}s`,
                      animationDuration: `${1.5 + (i * 0.2) % 1}s`,
                      boxShadow: `0 0 8px ${color}`
                    }}
                  />
                );
              })}
            </div>
          )}
          
          {/* Main Content */}
          <div className={styles.innerClass}>
            {children}
          </div>
        </>
      )}
    </div>
  )
}

export default AnimatedContainer 