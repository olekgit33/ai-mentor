import React from 'react'
import { Button } from '@/components'

interface SessionErrorProps {
  error: string
  onRetry: () => void
  onSignOut: () => void
}

const SessionError: React.FC<SessionErrorProps> = ({
  error,
  onRetry,
  onSignOut
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-blue-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
          <div className="text-8xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Session Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Button
              onClick={onRetry}
              variant="primary"
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Retry
            </Button>
            <Button
              onClick={onSignOut}
              variant="secondary"
              size="lg"
              className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionError 