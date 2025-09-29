'use client'

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
      main: 'text-xl',
      sub: 'text-xs',
      frequency: 'text-lg'
    },
    md: {
      main: 'text-3xl',
      sub: 'text-xs',
      frequency: 'text-2xl'
    },
    lg: {
      main: 'text-4xl md:text-6xl',
      sub: 'text-sm',
      frequency: 'text-3xl md:text-5xl'
    }
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {showFrequency && (
        <div className={`${sizes[size].frequency} font-bold text-bandfm-green-500 font-sans`}>
          96.1
        </div>
      )}
      <div className={`${sizes[size].main} font-bold font-sans -mt-1`}>
        <span className="text-bandfm-orange-500">Band</span>
        <span className="text-bandfm-green-500">fm</span>
      </div>
      {size !== 'sm' && (
        <div className={`${sizes[size].sub} text-gray-500 font-sans tracking-wider uppercase -mt-1`}>
          Livramento
        </div>
      )}
    </div>
  )
}
