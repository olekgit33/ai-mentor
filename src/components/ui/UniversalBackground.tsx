import React from 'react'

interface UniversalBackgroundProps {
  variant?: 'constellation' | 'particles' | 'simple' | 'minimal'
  starCount?: number
  showConstellationLines?: boolean
  showGeometricPatterns?: boolean
  showParticles?: boolean
  showLightRays?: boolean
  showSparkles?: boolean
  showLightOrbs?: boolean
  opacity?: number
  className?: string
}

const UniversalBackground: React.FC<UniversalBackgroundProps> = ({
  variant = 'constellation',
  starCount = 50,
  showConstellationLines = true,
  showGeometricPatterns = true,
  showParticles = false,
  showLightRays = false,
  showSparkles = false,
  showLightOrbs = false,
  opacity = 1,
  className = ''
}) => {
  // Variant presets
  const getVariantSettings = () => {
    switch (variant) {
      case 'constellation':
        return {
          starCount: 50,
          showConstellationLines: true,
          showGeometricPatterns: true,
          showParticles: false,
          showLightRays: false,
          showSparkles: false,
          showLightOrbs: false
        }
      case 'particles':
        return {
          starCount: 0,
          showConstellationLines: false,
          showGeometricPatterns: false,
          showParticles: true,
          showLightRays: true,
          showSparkles: true,
          showLightOrbs: true
        }
      case 'simple':
        return {
          starCount: 0,
          showConstellationLines: false,
          showGeometricPatterns: false,
          showParticles: false,
          showLightRays: false,
          showSparkles: false,
          showLightOrbs: false
        }
      case 'minimal':
        return {
          starCount: 30,
          showConstellationLines: false,
          showGeometricPatterns: false,
          showParticles: false,
          showLightRays: false,
          showSparkles: false,
          showLightOrbs: false
        }
      default:
        return {}
    }
  }

  const settings = {
    starCount,
    showConstellationLines,
    showGeometricPatterns,
    showParticles,
    showLightRays,
    showSparkles,
    showLightOrbs,
    ...getVariantSettings()
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ opacity }}>
      {/* Stars */}
      {settings.starCount > 0 && (
        <>
          {[...Array(settings.starCount)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse opacity-60"
              style={{
                left: `${(i * 13 + 17) % 100}%`,
                top: `${(i * 17 + 23) % 100}%`,
                animationDelay: `${(i * 0.1) % 3}s`,
                animationDuration: `${2 + (i * 0.05) % 2}s`
              }}
            />
          ))}
        </>
      )}
      
      {/* Constellation Lines */}
      {settings.showConstellationLines && (
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <path d="M 100,200 Q 250,100 400,200 T 700,200" stroke="url(#constellation-gradient)" strokeWidth="2" fill="none" className="animate-pulse" />
          <path d="M 200,400 Q 350,300 500,400 T 800,400" stroke="url(#constellation-gradient)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <path d="M 150,600 Q 300,500 450,600 T 750,600" stroke="url(#constellation-gradient)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDelay: '2s' }} />
        </svg>
      )}
      
      {/* Geometric Pattern Overlay */}
      {settings.showGeometricPatterns && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-purple-400 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-pink-400 rotate-12 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border-2 border-blue-400 rotate-90 animate-spin" style={{ animationDuration: '18s' }}></div>
        </div>
      )}

      {/* Floating Particles */}
      {settings.showParticles && (
        <div className="floating-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
        </div>
      )}

      {/* Background Shapes */}
      {settings.showParticles && (
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      )}

      {/* Light Rays */}
      {settings.showLightRays && (
        <div className="light-rays">
          <div className="ray ray-1"></div>
          <div className="ray ray-2"></div>
        </div>
      )}

      {/* Sparkles */}
      {settings.showSparkles && (
        <div className="sparkles">
          <div className="sparkle sparkle-1"></div>
          <div className="sparkle sparkle-2"></div>
          <div className="sparkle sparkle-3"></div>
          <div className="sparkle sparkle-4"></div>
        </div>
      )}

      {/* Light Orbs */}
      {settings.showLightOrbs && (
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/6 w-6 h-6 bg-purple-400/30 rounded-full blur-sm animate-bounce opacity-80"></div>
          <div className="absolute top-3/4 right-1/6 w-8 h-8 bg-pink-400/30 rounded-full blur-sm animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-blue-400/30 rounded-full blur-sm animate-bounce opacity-70" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/2 w-5 h-5 bg-cyan-400/30 rounded-full blur-sm animate-bounce opacity-50" style={{ animationDelay: '0.5s' }}></div>
        </div>
      )}

      {/* Simple Pulse Blobs for 'simple' variant */}
      {variant === 'simple' && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-3/4 left-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </>
      )}
    </div>
  )
}

export default UniversalBackground 