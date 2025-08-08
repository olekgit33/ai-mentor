import { useEffect } from 'react'

// Configuration options for form data synchronization
interface UseFormSyncOptions<T> {
  data: T | null | undefined                                    // Data to sync with form
  setValue: (key: keyof T, value: unknown) => void             // Form field updater
  syncMap?: Partial<Record<keyof T, (value: unknown) => unknown>> // Value transformers
}

// Hook for synchronizing external data with form
export const useFormSync = <T extends Record<string, unknown>>({
  data,
  setValue,
  syncMap = {}
}: UseFormSyncOptions<T>) => {
  useEffect(() => {
    if (data) {
      (Object.keys(data) as Array<keyof T>).forEach((key) => {
        const rawValue = data[key]
        
        // Apply transformation if provided in syncMap
        const transformedValue = syncMap[key] 
          ? syncMap[key]!(rawValue)
          : rawValue
        
        setValue(key, transformedValue)
      })
    }
  }, [data, setValue, syncMap])
}

// Interface for profile data structure
interface ProfileData {
  name?: string       // User's name
  age?: number        // User's age
  interests?: string  // User's interests
}

// Specialized hook for syncing profile data with form
export const useProfileFormSync = <T extends Record<string, unknown>>(
  profile: ProfileData | null | undefined,
  setValue: (key: keyof T, value: unknown) => void
) => {
  useEffect(() => {
    if (profile) {
      setValue('name' as keyof T, profile.name || '')          // Sync name
      setValue('age' as keyof T, profile.age?.toString() || '') // Sync age as string
      setValue('interests' as keyof T, profile.interests || '') // Sync interests
    }
  }, [profile, setValue])
} 