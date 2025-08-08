import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  disabled = false
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700',
    secondary: 'bg-white/90 text-purple-900 hover:bg-white backdrop-blur-sm',
    ghost: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40',
    outline: 'bg-white/90 text-purple-900 hover:bg-white'
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg'
  }
  
  const responsiveSizes = {
    sm: 'sm:px-6 sm:py-2 sm:text-base',
    md: 'sm:px-6 sm:py-2 sm:text-base',
    lg: 'sm:px-8 sm:py-4 sm:text-lg'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${responsiveSizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button 