'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface GifPickerProps {
  onGifSelect: (gifUrl: string) => void
  isOpen: boolean
  onClose: () => void
  buttonRef?: React.RefObject<HTMLButtonElement | null>
}

const GifPicker: React.FC<GifPickerProps> = ({ onGifSelect, isOpen, onClose, buttonRef }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [gifs, setGifs] = useState<Array<{
    id: string
    title: string
    images: {
      original: { url: string }
      fixed_height_small: { url: string }
    }
  }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)

  const popularGifs = [
    'https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif', // Minions
    'https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif', // Adventure Time
    'https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif', // Cartoon dog
  ]

  const searchGifs = async (query: string) => {
    if (!query.trim()) {
      setGifs([])
      return
    }

    setIsLoading(true)
    try {
      // Using a public GIPHY API key (you should use your own in production)
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${encodeURIComponent(query)}&limit=20&rating=g`
      )
      const data = await response.json()
      setGifs(data.data || [])
    } catch (error) {
      console.error('Error fetching GIFs:', error)
      setGifs([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    if (searchTerm.trim()) {
      const timeout = setTimeout(() => {
        searchGifs(searchTerm)
      }, 500) // Debounce search
      setSearchTimeout(timeout)
    } else {
      setGifs([])
    }

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
    }
  }, [searchTerm, searchTimeout])

  const handleGifClick = (gifUrl: string) => {
    onGifSelect(gifUrl)
    onClose()
  }

  if (!isOpen) return null

  // Calculate position above the button
  const getPosition = () => {
    if (!buttonRef?.current) {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    }
    
    const buttonRect = buttonRef.current.getBoundingClientRect()
    const isMobile = window.innerWidth < 640
    const isMedium = window.innerWidth < 1024
    
    const pickerHeight = isMobile ? 400 : 450
    const pickerWidth = isMobile ? 320 : (isMedium ? 384 : 448)
    
    let top = buttonRect.top - pickerHeight - 10
    
    if (top < 20) {
      top = buttonRect.bottom + 10
    }
    
    top = Math.max(20, top)
    
    let left = buttonRect.left + (buttonRect.width / 2) - (pickerWidth / 2)
    
    if (left < 20) {
      left = 20
    }
    
    if (left + pickerWidth > window.innerWidth - 20) {
      left = window.innerWidth - pickerWidth - 20
    }
    
    return {
      position: 'fixed' as const,
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 50
    }
  }

  return (
    <div 
      className="fixed inset-0 z-40 cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-3 sm:p-4 lg:p-6 w-80 sm:w-96 lg:w-[28rem] max-h-80 sm:max-h-96 lg:max-h-[32rem] overflow-y-auto border border-gray-200 custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
        style={getPosition()}
      >
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-bold text-gray-800">Search GIFs 🎬</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg sm:text-xl"
          >
            ×
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for GIFs..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>

        {/* GIF Grid */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          ) : gifs.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {gifs.map((gif) => (
                <button
                  key={gif.id}
                  onClick={() => handleGifClick(gif.images.original.url)}
                  className="w-full aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 border-2 border-transparent hover:border-purple-300"
                >
                  <Image
                    src={gif.images.fixed_height_small.url}
                    alt={gif.title}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                    priority={false}
                  />
                </button>
              ))}
            </div>
          ) : searchTerm ? (
            <div className="text-center py-8 text-gray-500">
              No GIFs found for &quot;{searchTerm}&quot;
            </div>
          ) : (
            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-2">Popular GIFs</h4>
              <div className="grid grid-cols-2 gap-2">
                {popularGifs.map((gifUrl, index) => (
                  <button
                    key={index}
                    onClick={() => handleGifClick(gifUrl)}
                    className="w-full aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 border-2 border-transparent hover:border-purple-300"
                  >
                    <Image
                      src={gifUrl}
                      alt="Popular GIF"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                      priority={false}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GifPicker 