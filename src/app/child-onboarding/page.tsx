'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useForm, useProfile, useNavigation, useProfileFormSync } from '@/hooks'
import { 
  LoadingSpinner, 
  ProtectedRoute,
  UniversalBackground,
  AnimatedContainer,
  OnboardingLogo,
  OnboardingHeader,
  OnboardingError,
  OnboardingForm,
  OnboardingNavigation
} from '@/components'

interface ProfileFormData extends Record<string, unknown> {
  name: string
  age: string
  interests: string
}

const ChildOnboardingPage = React.memo(function ChildOnboardingPage() {
  const { user, childProfile, createChildProfile, updateChildProfile } = useAuth()
  const { loading: profileLoading, isEditing } = useProfile({ requireChildProfile: true })
  const { navigateTo } = useNavigation()

  const validateProfile = (values: ProfileFormData) => {
    if (!values.name.trim()) {
      return 'Please enter a name'
    }
    if (!values.age || parseInt(values.age) < 8 || parseInt(values.age) > 13) {
      return 'Please enter a valid age (8-13)'
    }
    return null
  }

  const { values, loading, error, setValue, handleSubmit } = useForm<ProfileFormData>({
    initialValues: {
      name: '',
      age: '',
      interests: ''
    },
    validate: validateProfile,
    onSubmit: async (formData) => {
    if (!user) {
        throw new Error('Please sign in first')
      }

      const profileData = {
        name: formData.name.trim(),
        age: parseInt(formData.age),
        interests: formData.interests.trim()
      }

      if (isEditing && childProfile) {
        await updateChildProfile(profileData)
      } else {
        await createChildProfile(profileData)
      }
      
      // Redirect to mentor chat after success
      navigateTo('/mentor-chat', 'Setting up your chat...')
    }
  })

  // Sync profile data with form values
  useProfileFormSync<ProfileFormData>(childProfile, setValue)

  const handleInterestClick = (interest: string) => {
    const currentInterests = values.interests.split(',').map(i => i.trim()).filter(i => i)
    
    if (currentInterests.includes(interest)) {
      // Remove interest
      const updatedInterests = currentInterests.filter(i => i !== interest)
      setValue('interests', updatedInterests.join(', '))
    } else {
      // Add interest
      const updatedInterests = [...currentInterests, interest]
      setValue('interests', updatedInterests.join(', '))
    }
  }

  if (profileLoading) {
    return <LoadingSpinner message="Loading your profile..." />
  }

  if (loading) {
    return <LoadingSpinner message={isEditing ? "Updating your profile..." : "Creating your profile..."} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-blue-500 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
      <OnboardingLogo />
      <UniversalBackground variant="particles" />

      {/* Mobile - Direct Form without Container */}
      <div className="sm:hidden relative z-10 w-full p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
          <OnboardingHeader isEditing={isEditing} isMobile={true} />
          <OnboardingError error={error} />
          <OnboardingForm
            name={values.name}
            age={values.age}
            interests={values.interests}
            isEditing={isEditing}
            isMobile={true}
            onNameChange={(value) => setValue('name', value)}
            onAgeChange={(value) => setValue('age', value)}
            onInterestsChange={(value) => setValue('interests', value)}
            onInterestClick={handleInterestClick}
            onSubmit={handleSubmit}
          />
          {isEditing && <OnboardingNavigation isMobile={true} />}
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Ready to learn with your AI mentor? Let&apos;s go! ✨
            </p>
          </div>
        </div>
      </div>

      {/* Desktop - Full Container with Rainbow Border */}
      <AnimatedContainer variant="onboarding">
        <OnboardingHeader isEditing={isEditing} />
        <OnboardingError error={error} />
        <OnboardingForm
          name={values.name}
          age={values.age}
          interests={values.interests}
          isEditing={isEditing}
          onNameChange={(value) => setValue('name', value)}
          onAgeChange={(value) => setValue('age', value)}
          onInterestsChange={(value) => setValue('interests', value)}
          onInterestClick={handleInterestClick}
          onSubmit={handleSubmit}
        />
        {isEditing && <OnboardingNavigation />}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-gray-600 text-xs sm:text-sm px-2 sm:px-0">
            Ready to learn with your AI mentor? Let&apos;s go!
          </p>
        </div>
      </AnimatedContainer>
    </div>
  )
})

export default function ChildOnboardingPageWrapper() {
  return (
    <ProtectedRoute requireAuth={true} requireRole="child">
      <ChildOnboardingPage />
    </ProtectedRoute>
  )
} 