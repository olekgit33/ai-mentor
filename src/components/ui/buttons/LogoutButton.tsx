import React from 'react'

interface LogoutButtonProps {
  onSignOut: () => void
  signingOut: boolean
  disabled?: boolean
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  onSignOut,
  signingOut,
  disabled = false
}) => {
  return (
    <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
      <button
        onClick={onSignOut}
        disabled={signingOut || disabled}
        className="group relative px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-black/20 backdrop-blur-sm border border-white/20 text-white/90 hover:text-white hover:bg-black/30 transition-all duration-300 disabled:opacity-50 cursor-pointer"
      >
        {signingOut ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span className="text-sm hidden sm:inline">Signing out...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-lg">🔓</span>
            <span className="text-sm hidden sm:inline">Logout</span>
          </div>
        )}
      </button>
    </div>
  )
}

export default LogoutButton 