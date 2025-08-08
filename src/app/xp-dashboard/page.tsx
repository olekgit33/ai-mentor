'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  LoadingSpinner, 
  ProtectedRoute, 
  ProfilePrompt,
  UniversalBackground,
  DashboardHeader,
  HeroWelcome,
  ProfileCard,
  PowerLevelCard,
  SkillsCard,
  AchievementGallery,
  LearningSuggestions
} from '@/components'
import { useSignOut } from '@/hooks'

const XPDashboard = React.memo(function XPDashboard() {
  const { childProfile, loading } = useAuth()
  const { signingOut, handleSignOut } = useSignOut()

  // Progressive XP requirements for individual skills (exponential growth)
  const skillXPRequirements = [20, 40, 80, 160, 320, 640, 1280] // XP needed for each level
  
  // Progressive XP requirements for global level (different progression)  
  const globalXPRequirements = [50, 120, 250, 500, 1000, 2000, 4000, 8000] // XP needed for each global level

  // Sample skill data with current XP in their active level
  const skillsRawData = {
    communication: { level: 4, currentXP: 120 }, // 120/320 XP toward level 5
    problemSolving: { level: 3, currentXP: 45 },  // 45/160 XP toward level 4  
    leadership: { level: 2, currentXP: 70 }       // 70/80 XP toward level 3
  }

  // Calculate total XP from all individual skills
  const calculateSkillTotals = () => {
    const skills: Record<string, {
      level: number
      currentXP: number
      maxXP: number
      totalXP: number
    }> = {}
    let totalCombinedXP = 0
    
    Object.keys(skillsRawData).forEach(skillName => {
      const skill = skillsRawData[skillName as keyof typeof skillsRawData]
      
      // Calculate total XP earned in this skill
      let skillTotalXP = 0
      for (let i = 0; i < skill.level; i++) {
        skillTotalXP += skillXPRequirements[i] || 0
      }
      skillTotalXP += skill.currentXP // Add current level progress
      
      skills[skillName] = {
        level: skill.level,
        currentXP: skill.currentXP,
        maxXP: skillXPRequirements[skill.level] || 320,
        totalXP: skillTotalXP
      }
      
      totalCombinedXP += skillTotalXP
    })
    
    return { skills, totalCombinedXP }
  }

  const { skills: skillsData, totalCombinedXP } = calculateSkillTotals()

  // Calculate global level and progress from total combined XP
  const calculateGlobalLevel = () => {
    let globalLevel = 0
    let xpUsed = 0
    
    // Find what global level the total XP corresponds to
    for (let i = 0; i < globalXPRequirements.length; i++) {
      if (totalCombinedXP >= xpUsed + globalXPRequirements[i]) {
        xpUsed += globalXPRequirements[i]
        globalLevel = i + 1
      } else {
        break
      }
    }
    
    const currentXP = totalCombinedXP - xpUsed
    const maxXP = globalXPRequirements[globalLevel] || 500
    
    return { globalLevel, currentXP, maxXP, totalXP: totalCombinedXP }
  }

  const globalData = calculateGlobalLevel()

  // Enhanced badge system with progression
  const allBadges = [
    // Milestone Badges
    {
      id: '1',
      name: 'First Steps',
      description: 'Welcome to your learning journey!',
      icon: '🌟',
      category: 'milestone',
      requirement_type: 'xp_total',
      requirement_value: 0,
      rarity: 'common' as const,
      earned: true,
      earned_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Rising Star',
      description: 'Reached Level 2 in your journey!',
      icon: '🌟',
      category: 'milestone',
      requirement_type: 'global_level',
      requirement_value: 2,
      rarity: 'common' as const,
      earned: globalData.globalLevel >= 2,
      earned_at: globalData.globalLevel >= 2 ? new Date().toISOString() : undefined
    },
    {
      id: '3',
      name: 'Power Player',
      description: 'Reached Level 5 - Unstoppable!',
      icon: '🚀',
      category: 'milestone',
      requirement_type: 'global_level',
      requirement_value: 5,
      rarity: 'rare' as const,
      earned: globalData.globalLevel >= 5,
      earned_at: globalData.globalLevel >= 5 ? new Date().toISOString() : undefined
    },
    {
      id: '4',
      name: 'Legend',
      description: 'Reached Level 10 - True mastery!',
      icon: '👑',
      category: 'milestone',
      requirement_type: 'global_level',
      requirement_value: 10,
      rarity: 'legendary' as const,
      earned: globalData.globalLevel >= 10,
      earned_at: globalData.globalLevel >= 10 ? new Date().toISOString() : undefined
    },

    // Communication Badges
    {
      id: '5',
      name: 'Great Communicator',
      description: 'Excellent communication skills!',
      icon: '🗣️',
      category: 'communication',
      requirement_type: 'skill_level',
      requirement_value: 3,
      skill: 'communication',
      rarity: 'rare' as const,
      earned: skillsData.communication.level >= 3,
      earned_at: skillsData.communication.level >= 3 ? new Date().toISOString() : undefined
    },
    {
      id: '6',
      name: 'Master Speaker',
      description: 'Communication Level 5 achieved!',
      icon: '🎤',
      category: 'communication',
      requirement_type: 'skill_level',
      requirement_value: 5,
      skill: 'communication',
      rarity: 'epic' as const,
      earned: skillsData.communication.level >= 5,
      earned_at: skillsData.communication.level >= 5 ? new Date().toISOString() : undefined
    },

    // Problem Solving Badges
    {
      id: '7',
      name: 'Problem Solver',
      description: 'Cracking puzzles like a pro!',
      icon: '🧩',
      category: 'problem_solving',
      requirement_type: 'skill_level',
      requirement_value: 3,
      skill: 'problemSolving',
      rarity: 'rare' as const,
      earned: skillsData.problemSolving.level >= 3,
      earned_at: skillsData.problemSolving.level >= 3 ? new Date().toISOString() : undefined
    },
    {
      id: '8',
      name: 'Puzzle Master',
      description: 'Problem Solving Level 5 achieved!',
      icon: '🔍',
      category: 'problem_solving',
      requirement_type: 'skill_level',
      requirement_value: 5,
      skill: 'problemSolving',
      rarity: 'epic' as const,
      earned: skillsData.problemSolving.level >= 5,
      earned_at: skillsData.problemSolving.level >= 5 ? new Date().toISOString() : undefined
    },

    // Leadership Badges
    {
      id: '9',
      name: 'Natural Leader',
      description: 'Leading by example!',
      icon: '👥',
      category: 'leadership',
      requirement_type: 'skill_level',
      requirement_value: 3,
      skill: 'leadership',
      rarity: 'rare' as const,
      earned: skillsData.leadership.level >= 3,
      earned_at: skillsData.leadership.level >= 3 ? new Date().toISOString() : undefined
    },
    {
      id: '10',
      name: 'True Leader',
      description: 'Leadership Level 5 achieved!',
      icon: '🏆',
      category: 'leadership',
      requirement_type: 'skill_level',
      requirement_value: 5,
      skill: 'leadership',
      rarity: 'epic' as const,
      earned: skillsData.leadership.level >= 5,
      earned_at: skillsData.leadership.level >= 5 ? new Date().toISOString() : undefined
    },

    // XP Collection Badges
    {
      id: '11',
      name: 'XP Collector',
      description: 'Earned 500 total XP!',
      icon: '💎',
      category: 'xp',
      requirement_type: 'xp_total',
      requirement_value: 500,
      rarity: 'rare' as const,
      earned: totalCombinedXP >= 500,
      earned_at: totalCombinedXP >= 500 ? new Date().toISOString() : undefined
    },
    {
      id: '12',
      name: 'XP Master',
      description: 'Earned 1000 total XP!',
      icon: '💰',
      category: 'xp',
      requirement_type: 'xp_total',
      requirement_value: 1000,
      rarity: 'epic' as const,
      earned: totalCombinedXP >= 1000,
      earned_at: totalCombinedXP >= 1000 ? new Date().toISOString() : undefined
    }
  ]

  // Group badges by category and separate earned vs locked
  const earnedBadges = allBadges.filter(badge => badge.earned)
  const lockedBadges = allBadges.filter(badge => !badge.earned)

  // Mock data structure for compatibility
  const dashboardData = {
    xpRecord: {
      current_xp: globalData.currentXP,
      max_xp: globalData.maxXP,
      global_level: globalData.globalLevel
    },
    skills: skillsData,
    badges: earnedBadges,
    allBadges: allBadges
  }

  if (loading) {
    return <LoadingSpinner message="Loading your achievements..." />
  }

  if (signingOut) {
    return <LoadingSpinner message="Signing out..." />
  }

  if (!childProfile) {
    return <ProfilePrompt fullScreen={true} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      <UniversalBackground />
      
      <DashboardHeader onSignOut={handleSignOut} />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-4 sm:py-8">
        <HeroWelcome childProfile={childProfile} />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Left Side - Profile Card */}
          <div className="lg:col-span-1">
            <ProfileCard 
              childProfile={childProfile}
              earnedBadges={earnedBadges}
              allBadges={allBadges}
              totalCombinedXP={totalCombinedXP}
              globalLevel={globalData.globalLevel}
              skillsData={skillsData as unknown as {
                communication: { totalXP: number }
                problemSolving: { totalXP: number }
                leadership: { totalXP: number }
              }}
            />
          </div>

          {/* Right Side - Power Level and Skills */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <PowerLevelCard dashboardData={dashboardData} />
            <SkillsCard skillsData={skillsData as unknown as {
              communication: { level: number; currentXP: number; maxXP: number; totalXP: number }
              problemSolving: { level: number; currentXP: number; maxXP: number; totalXP: number }
              leadership: { level: number; currentXP: number; maxXP: number; totalXP: number }
            }} />
          </div>
        </div>

        <AchievementGallery 
          earnedBadges={earnedBadges}
          lockedBadges={lockedBadges}
          allBadges={allBadges}
        />

        <LearningSuggestions 
          skillsData={skillsData as unknown as {
            communication: { level: number; currentXP: number; maxXP: number; totalXP: number }
            problemSolving: { level: number; currentXP: number; maxXP: number; totalXP: number }
            leadership: { level: number; currentXP: number; maxXP: number; totalXP: number }
          }}
          earnedBadges={earnedBadges}
          lockedBadges={lockedBadges}
        />
      </div>
    </div>
  )
})

export default function XPDashboardWrapper() {
  return (
    <ProtectedRoute>
      <XPDashboard />
    </ProtectedRoute>
  )
} 