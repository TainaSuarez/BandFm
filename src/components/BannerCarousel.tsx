'use client'

import { useState, useEffect } from 'react'
import { Banner } from '@/types'

interface BannerCarouselProps {
  banners: Banner[]
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (banners.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // Change banner every 5 seconds

    return () => clearInterval(interval)
  }, [banners.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1)
  }

  if (banners.length === 0) {
    return null
  }

  const currentBanner = banners[currentIndex]

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-6">
      <div className="relative w-full h-72 md:h-96 lg:h-[28rem] overflow-hidden bg-gray-200 shadow-lg rounded-lg">
      {/* Banner Image */}
      <div 
        className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out"
        style={{ backgroundImage: `url(${currentBanner.imagem})` }}
      ></div>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
            aria-label="Banner anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
            aria-label="Próximo banner"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Ir para banner ${index + 1}`}
            />
          ))}
        </div>
      )}
      </div>
    </div>
  )
}
