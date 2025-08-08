import { useState, useEffect, useCallback } from 'react'

// Hook for managing voice recording functionality using Web Speech API
export const useVoiceRecording = () => {
  // Track recording state and browser support
  const [isRecording, setIsRecording] = useState(false)
  const [isSupported, setIsSupported] = useState(false)

  // Check browser support for Web Speech API
  useEffect(() => {
    // Check if voice recording is supported
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      setIsSupported(true)
    }
  }, [])

  // Start voice recording and handle transcription
  const startRecording = useCallback((onResult: (transcript: string) => void) => {
    if (!isSupported) {
      alert('Voice recording is not supported in your browser. Please use Chrome or Edge.')
      return
    }

    if (isRecording) {
      setIsRecording(false)
      return
    }

    setIsRecording(true)

    // Initialize speech recognition with Chrome's API
    // @ts-expect-error - webkitSpeechRecognition is not in TypeScript types
    const recognition = new window.webkitSpeechRecognition()
    recognition.continuous = false     // Stop after single utterance
    recognition.interimResults = false // Only return final results
    recognition.lang = 'en-US'        // Set language to English

    // Handle recording start
    recognition.onstart = () => {
      setIsRecording(true)
    }

    // Process speech recognition results
    recognition.onresult = (event: { results: Array<Array<{ transcript: string }>> }) => {
      const transcript = event.results[0][0].transcript
      onResult(transcript)
      setIsRecording(false)
    }

    // Handle recognition errors
    recognition.onerror = (event: { error: string }) => {
      console.error('Speech recognition error:', event.error)
      setIsRecording(false)
      if (event.error === 'not-allowed') {
        alert('Please allow microphone access to use voice chat.')
      }
    }

    // Clean up when recognition ends
    recognition.onend = () => {
      setIsRecording(false)
    }

    recognition.start()
  }, [isSupported, isRecording])

  // Stop current recording session
  const stopRecording = useCallback(() => {
    setIsRecording(false)
  }, [])

  return {
    isRecording,    // Current recording state
    isSupported,    // Browser support status
    startRecording, // Start recording function
    stopRecording   // Stop recording function
  }
} 