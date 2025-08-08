import React from 'react'

interface AlertMessageProps {
  message: string
  type?: 'error' | 'success' | 'warning' | 'info'
  className?: string
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  type = 'info',
  className = ''
}) => {
  if (!message) return null

  const styles = {
    error: 'bg-red-100 border-red-400 text-red-700',
    success: 'bg-green-100 border-green-400 text-green-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700'
  }

  return (
    <div className={`mb-4 p-3 border rounded-lg ${styles[type]} ${className}`}>
      {message}
    </div>
  )
}

export default AlertMessage 