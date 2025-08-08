import React from 'react'

interface OnboardingFormProps {
  name: string
  age: string
  interests: string
  isEditing: boolean
  isMobile?: boolean
  onNameChange: (value: string) => void
  onAgeChange: (value: string) => void
  onInterestsChange: (value: string) => void
  onInterestClick: (interest: string) => void
  onSubmit: (e: React.FormEvent) => void
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({
  name,
  age,
  interests,
  isEditing,
  isMobile = false,
  onNameChange,
  onAgeChange,
  onInterestsChange,
  onInterestClick,
  onSubmit
}) => {
  const interestOptions = [
    'Art & Drawing', 'Sports', 'Music', 'Science', 'Reading', 'Gaming',
    'Cooking', 'Animals', 'Technology', 'Dancing', 'Building & Making',
    'Nature & Outdoors', 'Math', 'History', 'Space & Astronomy'
  ]

  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${isMobile ? '' : 'sm:space-y-6'}`}>
      {/* Enhanced Name and Age Fields - Side by Side */}
      <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 gap-4 sm:gap-6'}`}>
        {/* Enhanced Name Field */}
        <div className="relative">
          <label htmlFor="name" className={`block ${isMobile ? 'text-sm' : 'text-xs sm:text-sm'} font-bold text-gray-600 dark:text-gray-400 mb-2 ${isMobile ? '' : 'sm:mb-3'} flex items-center`}>
            <span className={`${isMobile ? 'text-lg mr-2' : 'text-lg sm:text-xl mr-1 sm:mr-2'}`}></span>
            What&apos;s your name? <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              required
              className={`w-full ${isMobile ? 'px-3 py-3' : 'px-3 sm:px-4 md:px-6 py-3 sm:py-4'} border-2 border-purple-200 dark:border-purple-400/30 rounded-xl ${isMobile ? '' : 'sm:rounded-2xl'} focus:ring-2 ${isMobile ? '' : 'sm:focus:ring-4'} focus:ring-purple-300 focus:border-purple-400 ${isMobile ? 'text-sm' : 'text-sm sm:text-base md:text-lg'} font-medium transition-all duration-300 hover:border-purple-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg cursor-pointer text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400`}
              placeholder="Enter your amazing name! ✨"
              maxLength={50}
            />
            <div className={`absolute ${isMobile ? 'right-3' : 'right-3 sm:right-4'} top-1/2 transform -translate-y-1/2 text-purple-400`}>
            </div>
          </div>
        </div>

        {/* Enhanced Age Field */}
        <div className="relative">
          <label htmlFor="age" className={`block ${isMobile ? 'text-sm' : 'text-xs sm:text-sm'} font-bold text-gray-600 dark:text-gray-400 mb-2 ${isMobile ? '' : 'sm:mb-3'} flex items-center`}>
            <span className={`${isMobile ? 'text-lg mr-2' : 'text-lg sm:text-xl mr-1 sm:mr-2'}`}></span>
            How old are you? <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <select
              id="age"
              value={age}
              onChange={(e) => onAgeChange(e.target.value)}
              required
              className={`w-full ${isMobile ? 'px-3 py-3' : 'px-3 sm:px-4 md:px-6 py-3 sm:py-4'} border-2 border-purple-200 dark:border-purple-400/30 rounded-xl ${isMobile ? '' : 'sm:rounded-2xl'} focus:ring-2 ${isMobile ? '' : 'sm:focus:ring-4'} focus:ring-purple-300 focus:border-purple-400 ${isMobile ? 'text-sm' : 'text-sm sm:text-base md:text-lg'} font-medium transition-all duration-300 hover:border-purple-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg appearance-none ${isMobile ? '' : 'custom-select'} cursor-pointer text-gray-800 dark:text-gray-100`}
            >
              <option value="" className="bg-purple-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400">Select your age 🎈</option>
              {Array.from({ length: 6 }, (_, i) => i + 8).map(ageOption => (
                <option key={ageOption} value={ageOption} className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-purple-100 dark:hover:bg-purple-900/50 py-2">
                  {ageOption} years old
                </option>
              ))}
            </select>
            <div className={`absolute ${isMobile ? 'right-3' : 'right-3 sm:right-4'} top-1/2 transform -translate-y-1/2 text-purple-400 pointer-events-none`}>
              <span className={`${isMobile ? 'text-lg' : 'text-lg sm:text-xl'}`}>🔽</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Interests Section */}
      <div className="relative">
        <label className={`block ${isMobile ? 'text-sm' : 'text-xs sm:text-sm'} font-bold text-gray-600 dark:text-gray-400 mb-3 ${isMobile ? '' : 'sm:mb-4'} flex items-center`}>
          <span className={`${isMobile ? 'text-lg mr-2' : 'text-lg sm:text-xl mr-1 sm:mr-2'}`}></span>
          What are you interested in? (Click to select your favorites!)
        </label>
        
        <div className={`${isMobile ? 'space-y-4' : 'space-y-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0'}`}>
          {/* Enhanced Interest Buttons */}
          <div className={`${isMobile ? '' : 'lg:col-span-2'}`}>
            <div className={`grid grid-cols-2 ${isMobile ? 'gap-2' : 'sm:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-2'} mb-4`}>
              {interestOptions.map((interest) => {
                const isSelected = interests.split(',').map(i => i.trim()).includes(interest)
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => onInterestClick(interest)}
                    className={`${isMobile ? 'px-2 py-2' : 'px-2 sm:px-3 py-2'} rounded-lg ${isMobile ? '' : 'sm:rounded-xl'} text-xs font-bold transition-all duration-300 transform hover:scale-105 shadow-md cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-300 animate-pulse'
                        : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 border-2 border-purple-200 dark:border-purple-400/30 hover:border-purple-300'
                    }`}
                  >
                    {interest}
                  </button>
                )
              })}
            </div>
          </div>
          
          {/* Enhanced Textarea */}
          <div className={`${isMobile ? '' : 'lg:col-span-1'}`}>
            <div className="relative h-full">
              <textarea
                value={interests}
                onChange={(e) => onInterestsChange(e.target.value)}
                className={`w-full h-full ${isMobile ? 'h-[100px]' : 'min-h-[100px] sm:min-h-[120px]'} ${isMobile ? 'px-3 py-3' : 'px-3 sm:px-4 py-3'} border-2 border-purple-200 dark:border-purple-400/30 rounded-xl ${isMobile ? '' : 'sm:rounded-2xl'} focus:ring-2 ${isMobile ? '' : 'sm:focus:ring-4'} focus:ring-purple-300 focus:border-purple-400 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'} font-medium transition-all duration-300 hover:border-purple-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg resize-none text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400`}
                placeholder="You can also type your interests here... 🌟"
                maxLength={500}
              />
              <div className="absolute right-3 bottom-3 text-purple-400">
                <span className={`${isMobile ? 'text-base' : 'text-base sm:text-lg'}`}>💭</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Submit Button */}
      <div className="relative">
        <button
          type="submit"
          className={`w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white ${isMobile ? 'py-3 px-4' : 'py-3 sm:py-4 px-4 sm:px-6'} rounded-xl ${isMobile ? '' : 'sm:rounded-2xl'} font-bold ${isMobile ? 'text-base' : 'text-base sm:text-lg md:text-xl'} hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 ${isMobile ? '' : 'sm:focus:ring-4'} focus:ring-purple-300 shadow-2xl hover:shadow-purple-400/50 relative overflow-hidden cursor-pointer`}
        >
          {/* Button Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
          
          {/* Button Content */}
          <div className="relative z-10 flex items-center justify-center space-x-2">
            <span>{isEditing ? 'Update Profile' : 'Start My Adventure!'}</span>
          </div>
          
          {/* Sparkle Effects */}
          <div className={`absolute top-1 right-1 ${isMobile ? 'w-1.5 h-1.5' : 'w-1.5 sm:w-2 h-1.5 sm:h-2'} bg-white rounded-full animate-ping`}></div>
          <div className="absolute bottom-1 left-1 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
        </button>
      </div>
    </form>
  )
}

export default OnboardingForm 