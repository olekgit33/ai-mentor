'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { BrandLogo } from '@/components'

const OnboardingLogo: React.FC = () => {
  const router = useRouter()

  return (
    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
      <div className="cursor-pointer hover:scale-105 transition-transform duration-300 bg-white/20 backdrop-blur-md rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-lg" onClick={() => router.push('/') }>
        <BrandLogo size="sm" />
      </div>
    </div>
  )
}

export default OnboardingLogo 