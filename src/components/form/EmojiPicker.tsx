'use client'

import React from 'react'
import { useMobileDetection } from '@/hooks'

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
  isOpen: boolean
  onClose: () => void
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect, isOpen, onClose }) => {
  const { isMobile } = useMobileDetection()

  // Popular emojis organized by categories
  const emojiCategories = {
    'Faces': ['😊', '😄', '😍', '🤗', '😎', '🤔', '😅', '😂', '🥰', '😇', '🤩', '😋', '😴', '😭', '😡', '😱'],
    'Animals': ['🐶', '🐱', '🐰', '🐼', '🐨', '🦁', '🐯', '🐸', '🐙', '🦄', '🦋', '🐞', '🦅', '🐧', '🦒', '🐘'],
    'Food': ['🍕', '🍔', '🍦', '🍩', '🍪', '🍎', '🍌', '🍓', '🍇', '🍉', '🍕', '🍟', '🌭', '🥪', '🍰', '🍫'],
    'Activities': ['⚽', '🏀', '🎮', '🎨', '🎵', '🎭', '🎪', '🎯', '🎲', '🎸', '🎹', '🎤', '🎬', '🎨', '📚', '✏️'],
    'Nature': ['🌸', '🌺', '🌻', '🌹', '🌳', '🌴', '🌵', '🌾', '🌷', '🍀', '🌿', '🌱', '🌞', '🌙', '⭐', '🌈'],
    'Objects': ['🚗', '🚁', '🚀', '🎈', '🎁', '💎', '💍', '👑', '🏆', '🎖️', '🏅', '🥇', '🥈', '🥉', '💐', '🎊']
  }

  // Mobile detection is now handled by the hook

    // No positioning calculation needed - using CSS centering

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji)
    // Don't auto-close - let user select multiple emojis
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop for both mobile and desktop */}
    <div 
        className={`fixed inset-0 z-40 ${isMobile ? 'bg-black/20' : 'bg-transparent'}`}
        onClick={handleBackdropClick}
        style={{ touchAction: 'none' }}
      />
      
      {isMobile ? (
        <>
          {/* Mobile Bottom Sheet */}
          <div 
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm rounded-t-3xl shadow-2xl border-t border-gray-200 animate-in slide-in-from-bottom duration-300"
            style={{ maxHeight: '70vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="flex justify-center py-3">
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>
            
            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">Choose an Emoji 😊</h3>
              <button
      onClick={onClose}
                className="w-8 h-8 text-gray-500 hover:text-gray-700 text-xl flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                ×
              </button>
            </div>
            
            {/* Content */}
            <div className="p-4 overflow-y-auto scrollbar-none" style={{ maxHeight: 'calc(70vh - 80px)' }}>
              <div className="space-y-4">
                {Object.entries(emojiCategories).map(([category, emojis]) => (
                  <div key={category}>
                    <h4 className="text-sm font-semibold text-gray-600 mb-3 sticky top-0 bg-white/95 backdrop-blur-sm py-1 -mx-4 px-4">{category}</h4>
                    <div className="grid grid-cols-6 gap-2">
                      {emojis.map((emoji, index) => (
                        <button
                          key={`${category}-${index}`}
                          onClick={() => handleEmojiClick(emoji)}
                          className="w-12 h-12 text-2xl hover:bg-purple-100 active:bg-purple-200 hover:scale-105 active:scale-95 rounded-xl transition-all duration-200 flex items-center justify-center border-2 border-transparent hover:border-purple-300 cursor-pointer"
                          title={emoji}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
              ) : (
        /* Desktop Popover - No backdrop */
        <div 
          className="fixed z-50 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '384px',
            maxHeight: '380px'
          }}
        onClick={(e) => e.stopPropagation()}
      >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">Choose an Emoji 😊</h3>
          <button
            onClick={onClose}
              className="w-8 h-8 text-gray-500 hover:text-gray-700 text-xl flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            ×
          </button>
        </div>
        
          {/* Content */}
          <div className="p-4 overflow-y-auto custom-scrollbar" style={{ maxHeight: '300px' }}>
        <div className="space-y-4">
          {Object.entries(emojiCategories).map(([category, emojis]) => (
            <div key={category}>
                  <h4 className="text-sm font-semibold text-gray-600 mb-3 sticky top-0 bg-white/95 backdrop-blur-sm py-1 -mx-4 px-4">{category}</h4>
                  <div className="grid grid-cols-8 gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={`${category}-${index}`}
                    onClick={() => handleEmojiClick(emoji)}
                        className="w-10 h-10 text-xl hover:bg-purple-100 hover:scale-110 hover:shadow-lg rounded-lg transition-all duration-200 flex items-center justify-center border-2 border-transparent hover:border-purple-300 cursor-pointer"
                    title={emoji}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
      )}
    </>
  )
}

export default EmojiPicker 