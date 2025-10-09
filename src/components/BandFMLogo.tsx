'use client'

import Image from 'next/image'

interface BandFMLogoProps {
  size?: 'sm' | 'md' | 'lg'
  showFrequency?: boolean
  className?: string
}

export default function BandFMLogo({ 
  size = 'md', 
  showFrequency = true,
  className = '' 
}: BandFMLogoProps) {
  const sizes = {
    sm: {
      width: 120,
      height: 60
    },
    md: {
      width: 180,
      height: 90
    },
    lg: {
      width: 280,
      height: 140
    }
  }

  return (
    <div className={`flex items-center ${className}`}>
      <Image 
        src="/logo-bandfm.png" 
        alt="Band FM 96.1 Livramento"
        width={sizes[size].width}
        height={sizes[size].height}
        className="object-contain"
        priority
      />
    </div>
  )
}
