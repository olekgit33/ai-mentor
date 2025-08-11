"use client"
import Image from 'next/image'
import React from 'react'
import brand from '@/brand/config'

type BrandLogoProps = {
  showName?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: { img: 20, text: 'text-xs sm:text-sm' },
  md: { img: 24, text: 'text-sm sm:text-base' },
  lg: { img: 28, text: 'text-base sm:text-lg' },
}

const BrandLogo: React.FC<BrandLogoProps> = ({ showName = true, size = 'md', className = '' }) => {
  const dims = sizeMap[size]
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image src={brand.logoSrc} alt={brand.name} width={dims.img} height={dims.img} priority />
      {showName && (
        <span className={`text-white font-bold drop-shadow-lg whitespace-nowrap ${dims.text}`}>{brand.name}</span>
      )}
    </div>
  )
}

export default BrandLogo


