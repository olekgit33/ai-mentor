import React from 'react'

interface SparkleEffectProps {
  variant?: 'celebration' | 'button' | 'rainbow' | 'simple'
  count?: number
  size?: 'sm' | 'md' | 'lg'
  colors?: string[]
  className?: string
  animated?: boolean
  density?: 'sparse' | 'normal' | 'dense'
}

const SparkleEffect: React.FC<SparkleEffectProps> = ({
  variant = 'simple',
  count = 4,
  size = 'md',
  colors = ['#8B5CF6', '#A855F7', '#EC4899', '#3B82F6', '#22D3EE', '#10B981'],
  className = '',
  animated = true,
  density = 'normal'
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return { width: '1.5', height: '1.5' }
      case 'md':
        return { width: '2', height: '2' }
      case 'lg':
        return { width: '3', height: '3' }
      default:
        return { width: '2', height: '2' }
    }
  }

  const getSparkleCount = () => {
    switch (density) {
      case 'sparse':
        return Math.max(2, Math.floor(count * 0.5))
      case 'normal':
        return count
      case 'dense':
        return count * 2
      default:
        return count
    }
  }

  const renderCelebrationSparkles = () => {
    const sparkles = []
    const sparkleCount = getSparkleCount()
    const sparkleSize = getSizeClasses()
    
    for (let i = 0; i < sparkleCount; i++) {
      const color = colors[i % colors.length]
      const delays = [0, 0.5, 1, 1.5, 2, 2.5, 0.8, 1.8]
      const positions = [
        { top: '12%', left: '35%' },
        { top: '28%', left: '15%' },
        { top: '45%', left: '85%' },
        { top: '65%', left: '40%' },
        { top: '85%', left: '70%' },
        { top: '35%', left: '65%' },
        { top: '18%', left: '90%' },
        { top: '75%', left: '20%' }
      ]
      
      const position = positions[i % positions.length]
      const delay = delays[i % delays.length]
      
      sparkles.push(
        <div
          key={`sparkle-${i}`}
          className={`absolute w-${sparkleSize.width} h-${sparkleSize.height} bg-white rounded-full ${animated ? 'animate-pulse' : ''}`}
          style={{
            ...position,
            animationDelay: `${delay}s`,
            background: color,
            boxShadow: `0 0 8px ${color}`
          }}
        />
      )
    }
    
    return sparkles
  }

  const renderButtonSparkles = () => {
    return (
      <>
        <div className={`absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full ${animated ? 'animate-ping' : ''}`}></div>
        <div className="absolute bottom-1 left-1 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
      </>
    )
  }

  const renderRainbowSparkles = () => {
    const sparkles = []
    const sparkleCount = getSparkleCount()
    
    for (let i = 0; i < sparkleCount; i++) {
      const color = colors[i % colors.length]
      sparkles.push(
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
      )
    }
    
    return sparkles
  }

  const renderSimpleSparkles = () => {
    const sparkles = []
    const sparkleCount = getSparkleCount()
    
    for (let i = 0; i < sparkleCount; i++) {
      const color = colors[i % colors.length]
      sparkles.push(
        <div
          key={`simple-sparkle-${i}`}
          className={`absolute w-1.5 h-1.5 rounded-full ${animated ? 'animate-pulse' : ''}`}
          style={{
            left: `${(i * 25 + 15) % 85}%`,
            top: `${(i * 30 + 20) % 80}%`,
            background: color,
            animationDelay: `${(i * 0.5) % 2}s`,
            opacity: 0.8
          }}
        />
      )
    }
    
    return sparkles
  }

  const renderSparkles = () => {
    switch (variant) {
      case 'celebration':
        return renderCelebrationSparkles()
      case 'button':
        return renderButtonSparkles()
      case 'rainbow':
        return renderRainbowSparkles()
      case 'simple':
      default:
        return renderSimpleSparkles()
    }
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {renderSparkles()}
    </div>
  )
}

export default SparkleEffect 