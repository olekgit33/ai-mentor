'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useForm, useTimeout } from '@/hooks'
import { LoadingSpinner, ProtectedRoute, Button, AlertMessage, FormInput, AuthHeader, AuthCard } from '@/components'

interface AuthFormData extends Record<string, unknown> {
  email: string
  password: string
  confirmPassword: string
}

const AuthPage = () => {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [message, setMessage] = useState('')
  const { signIn, signUp, sessionError, loading: authLoading } = useAuth()
  const { setTimeoutWithCleanup } = useTimeout()

  const validateForm = (values: AuthFormData) => {
    if (!isLogin && values.password !== values.confirmPassword) {
      return 'Passwords do not match'
    }
    return null
  }

  const { values, loading, error, setError, setValue, handleSubmit } = useForm<AuthFormData>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validate: validateForm,
    onSubmit: async (formData) => {
      const { error } = isLogin 
        ? await signIn(formData.email, formData.password)
        : await signUp(formData.email, formData.password)

      if (error) {
        throw new Error(error.message)
      }

      // If signup was successful, redirect to role selection
      if (!isLogin && !error) {
        router.push('/role-selection')
      }
    }
  })

  // Clear local error when sessionError changes
  React.useEffect(() => {
    if (sessionError) {
      setError('') // Clear local error to avoid duplicate display
    }
  }, [sessionError, setError])

  // Safety mechanism: Reset loading state if it stays true too long
  React.useEffect(() => {
    if (loading && !authLoading) {
      const cleanup = setTimeoutWithCleanup(() => {
        setError('Authentication timed out. Please try again.')
      }, 10000) // 10 seconds timeout

      return cleanup
    }
  }, [loading, authLoading, setTimeoutWithCleanup, setError])

  const handleToggleMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setMessage('')
    setValue('email', '')
    setValue('password', '')
    setValue('confirmPassword', '')
  }

  if (loading || authLoading) {
    return <LoadingSpinner message={isLogin ? "Signing in..." : "Creating account..."} />
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Welcome to ONE EDU"
        subtitle={isLogin ? 'Sign in to your account' : 'Create your account'}
      />

      <AlertMessage message={error || sessionError || ''} type="error" />
      <AlertMessage message={message} type="success" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          id="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={(value) => setValue('email', value)}
          placeholder="Enter your email"
          required
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={(value) => setValue('password', value)}
          placeholder="Enter your password"
          required
        />

        {!isLogin && (
          <FormInput
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={values.confirmPassword}
            onChange={(value) => setValue('confirmPassword', value)}
            placeholder="Confirm your password"
            required
          />
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading}
          className="w-full font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <span
          onClick={handleToggleMode}
          className="text-purple-600 hover:text-purple-800 font-medium cursor-pointer transition-colors duration-200"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </span>
      </div>
    </AuthCard>
  )
}

export default function AuthPageWrapper() {
  return (
    <ProtectedRoute requireAuth={false} redirectTo="/auth">
      <AuthPage />
    </ProtectedRoute>
  )
} 