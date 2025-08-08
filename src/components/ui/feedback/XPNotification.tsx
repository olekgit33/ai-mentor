import React from 'react'

interface XPNotificationProps {
  show: boolean
  xpEarned: number
  leveledUp: boolean
  newLevel: number
  newBadges: unknown[]
  onClose: () => void
}

const XPNotification: React.FC<XPNotificationProps> = ({
  show,
  xpEarned,
  leveledUp,
  newLevel,
  newBadges,
  onClose
}) => {
  if (!show) return null

  return (
    <div className="fixed top-16 right-2 sm:right-4 z-50 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-3 shadow-xl transform transition-all duration-500 ease-in-out max-w-xs">
      <div className="flex items-center space-x-2">
        <div className="text-lg animate-bounce">✨</div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm">+{xpEarned} XP earned!</p>
          {leveledUp && (
            <p className="text-xs">🎉 Level up! You&apos;re now level {newLevel}!</p>
          )}
          {newBadges.length > 0 && (
            <p className="text-xs">🏆 New badge{newBadges.length > 1 ? 's' : ''} earned!</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white text-lg leading-none cursor-pointer"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default XPNotification 