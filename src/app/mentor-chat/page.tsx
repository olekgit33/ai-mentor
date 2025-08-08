'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useSignOut, useChat, useVoiceRecording, useNavigation, useToggle } from '@/hooks'
import { 
  LoadingSpinner, 
  ProtectedRoute, 
  ProfilePrompt,
  UniversalBackground,
  AnimatedContainer,
  ChatArea,
  ChatHeader,
  XPNotification
} from '@/components'

const MentorChatPage = React.memo(function MentorChatPage() {
  const { childProfile } = useAuth()
  const { signingOut, handleSignOut } = useSignOut()
  const { isNavigating, navigationMessage, navigateTo } = useNavigation()
  const { value: showEmojiPicker, setValue: setShowEmojiPicker } = useToggle(false)
  
  const { 
    messages, 
    inputMessage, 
    setInputMessage, 
    isLoading, 
    xpNotification, 
    sendMessage, 
    handleKeyPress, 
    addToInput 
  } = useChat({ childProfile })
  
  const { isRecording, isSupported, startRecording } = useVoiceRecording()

  const handleEmojiSelect = (emoji: string) => {
    addToInput(emoji)
  }

  const handleVoiceRecording = () => {
    startRecording((transcript: string) => {
      addToInput(inputMessage ? ' ' + transcript : transcript)
    })
  }

  const handleNavigateToDashboard = () => {
    navigateTo('/xp-dashboard', 'Loading XP Dashboard...')
  }

  const handleNavigateToProfile = () => {
    navigateTo('/child-onboarding', 'Loading Profile...')
  }

  if (signingOut) {
    return <LoadingSpinner message="Signing out..." />
  }

  if (isNavigating) {
    return <LoadingSpinner message={navigationMessage} />
  }

  if (!childProfile) {
    return <ProfilePrompt fullScreen={true} />
  }

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col relative overflow-hidden">
      <UniversalBackground variant="constellation" />

      <ChatHeader
        isMobile={false}
        onNavigateToDashboard={handleNavigateToDashboard}
        onNavigateToProfile={handleNavigateToProfile}
        onSignOut={handleSignOut}
      />

      <XPNotification
        show={xpNotification.show}
        xpEarned={xpNotification.xpEarned}
        leveledUp={xpNotification.leveledUp}
        newLevel={xpNotification.newLevel}
        newBadges={xpNotification.newBadges}
        onClose={() => {/* XP notification auto-closes */}}
      />

      {/* Mobile - Direct Chat without Container */}
      <div className="sm:hidden flex-1 flex flex-col min-h-0">
        <ChatArea
          messages={messages}
          isLoading={isLoading}
          isMobile={true}
          voiceSupported={isSupported}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onSendMessage={sendMessage}
          onKeyPress={handleKeyPress}
          onEmojiSelect={handleEmojiSelect}
          onVoiceRecording={handleVoiceRecording}
          showEmojiPicker={showEmojiPicker}
          setShowEmojiPicker={setShowEmojiPicker}
          isVoiceRecording={isRecording}
          onNavigateToDashboard={handleNavigateToDashboard}
          onNavigateToProfile={handleNavigateToProfile}
          onSignOut={handleSignOut}
        />
      </div>

      {/* Desktop - Chat with Container */}
      <div className="hidden sm:flex flex-1 p-4 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full w-full">
          <AnimatedContainer variant="chat">
            <ChatArea
              messages={messages}
              isLoading={isLoading}
              isMobile={false}
              voiceSupported={isSupported}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              onSendMessage={sendMessage}
              onKeyPress={handleKeyPress}
              onEmojiSelect={handleEmojiSelect}
              onVoiceRecording={handleVoiceRecording}
              showEmojiPicker={showEmojiPicker}
              setShowEmojiPicker={setShowEmojiPicker}
              isVoiceRecording={isRecording}
              onNavigateToDashboard={handleNavigateToDashboard}
              onNavigateToProfile={handleNavigateToProfile}
              onSignOut={handleSignOut}
            />
          </AnimatedContainer>
        </div>
      </div>
    </div>
  )
})

export default function MentorChatPageWrapper() {
  return (
    <ProtectedRoute requireAuth={true} requireRole="child">
      <MentorChatPage />
    </ProtectedRoute>
  )
} 