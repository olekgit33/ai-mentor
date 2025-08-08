// Mock XP System for MVP - Uses localStorage instead of database
// 🚫 NO API CALLS - Everything is synchronous and localStorage-based
// ✅ Perfect for MVP - No database or backend required

export interface XPRecord {
  id: string
  child_id: string
  total_xp: number
  level: number
  xp_to_next_level: number
  created_at: string
  updated_at: string
}

export interface XPActivity {
  id: string
  child_id: string
  activity_type: string
  xp_earned: number
  activity_data: Record<string, unknown>
  created_at: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: string
  requirement_type: string
  requirement_value: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  earned?: boolean
  earned_at?: string
}

export interface DailyStreak {
  id: string
  child_id: string
  current_streak: number
  longest_streak: number
  last_activity_date: string
  created_at: string
  updated_at: string
}

// XP amounts for different activities
export const XP_AMOUNTS = {
  CHAT_MESSAGE: 2,
  FIRST_CHAT: 10,
  DAILY_LOGIN: 5,
  BADGE_EARNED: 15,
  ACHIEVEMENT_COMPLETED: 25,
  LEVEL_UP: 50,
  STREAK_BONUS: 3,
} as const

// Mock badges data
const MOCK_BADGES: Badge[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Welcome to your learning journey!',
    icon: '👶',
    category: 'milestone',
    requirement_type: 'xp_total',
    requirement_value: 0,
    rarity: 'common'
  },
  {
    id: '2',
    name: 'Chatterbox',
    description: 'Sent your first message to Astra!',
    icon: '💬',
    category: 'chat',
    requirement_type: 'activity_count',
    requirement_value: 1,
    rarity: 'common'
  },
  {
    id: '3',
    name: 'Curious Mind',
    description: 'Asked 10 questions!',
    icon: '🤔',
    category: 'chat',
    requirement_type: 'activity_count',
    requirement_value: 10,
    rarity: 'common'
  },
  {
    id: '4',
    name: 'Rising Star',
    description: 'Earned your first 100 XP!',
    icon: '⭐',
    category: 'milestone',
    requirement_type: 'xp_total',
    requirement_value: 100,
    rarity: 'common'
  },
  {
    id: '5',
    name: 'Bright Spark',
    description: 'Reached 500 XP!',
    icon: '✨',
    category: 'milestone',
    requirement_type: 'xp_total',
    requirement_value: 500,
    rarity: 'rare'
  },
  {
    id: '6',
    name: 'Knowledge Seeker',
    description: 'Earned 1000 XP!',
    icon: '🧠',
    category: 'milestone',
    requirement_type: 'xp_total',
    requirement_value: 1000,
    rarity: 'rare'
  },
  {
    id: '7',
    name: 'Learning Champion',
    description: 'Reached 2500 XP!',
    icon: '🏆',
    category: 'milestone',
    requirement_type: 'xp_total',
    requirement_value: 2500,
    rarity: 'epic'
  },
  {
    id: '8',
    name: 'Conversation Master',
    description: 'Had 50 conversations with Astra!',
    icon: '🗣️',
    category: 'chat',
    requirement_type: 'activity_count',
    requirement_value: 50,
    rarity: 'rare'
  },
  {
    id: '9',
    name: 'Daily Dedication',
    description: 'Logged in for 7 days in a row!',
    icon: '📅',
    category: 'milestone',
    requirement_type: 'streak',
    requirement_value: 7,
    rarity: 'rare'
  },
  {
    id: '10',
    name: 'Wisdom Warrior',
    description: 'Earned 5000 XP!',
    icon: '⚔️',
    category: 'milestone',
    requirement_type: 'xp_total',
    requirement_value: 5000,
    rarity: 'epic'
  },
  {
    id: '11',
    name: 'Master Learner',
    description: 'Earned 10000 XP!',
    icon: '🎓',
    category: 'milestone',
    requirement_type: 'xp_total',
    requirement_value: 10000,
    rarity: 'legendary'
  },
  {
    id: '12',
    name: 'Streak Superstar',
    description: 'Maintained a 30-day streak!',
    icon: '🔥',
    category: 'milestone',
    requirement_type: 'streak',
    requirement_value: 30,
    rarity: 'legendary'
  }
]

export class MockXPSystem {
  private static getStorageKey(childId: string, key: string): string {
    return `xp_${childId}_${key}`
  }

  // Calculate level from XP
  private static calculateLevel(xp: number): number {
    if (xp < 100) return 1
    return Math.floor(xp / 100) + 1
  }

  // Calculate XP needed for next level
  private static calculateXPToNextLevel(currentXP: number): number {
    const currentLevel = this.calculateLevel(currentXP)
    const nextLevelXP = currentLevel * 100
    return nextLevelXP - currentXP
  }

  // Get child's XP record
  static getChildXP(childId: string): XPRecord {
    const stored = localStorage.getItem(this.getStorageKey(childId, 'xp'))
    const defaultXP = {
      id: '1',
      child_id: childId,
      total_xp: 0,
      level: 1,
      xp_to_next_level: 100,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    if (!stored) {
      localStorage.setItem(this.getStorageKey(childId, 'xp'), JSON.stringify(defaultXP))
      return defaultXP
    }

    return JSON.parse(stored)
  }

  // Add XP to child
  static addXP(childId: string, xpAmount: number, activityType: string): {
    newLevel: number
    leveledUp: boolean
    totalXP: number
    newBadges: Badge[]
  } {
    const currentXP = this.getChildXP(childId)
    const newTotalXP = currentXP.total_xp + xpAmount
    const newLevel = this.calculateLevel(newTotalXP)
    const leveledUp = newLevel > currentXP.level
    const xpToNextLevel = this.calculateXPToNextLevel(newTotalXP)

    // Update XP record
    const updatedXP: XPRecord = {
      ...currentXP,
      total_xp: newTotalXP,
      level: newLevel,
      xp_to_next_level: xpToNextLevel,
      updated_at: new Date().toISOString()
    }

    localStorage.setItem(this.getStorageKey(childId, 'xp'), JSON.stringify(updatedXP))

    // Add activity
    this.addActivity(childId, activityType, xpAmount)

    // Check for new badges
    const newBadges = this.checkAndAwardBadges(childId)

    // Award bonus XP for level up
    if (leveledUp) {
      this.addXP(childId, XP_AMOUNTS.LEVEL_UP, 'level_up')
    }

    return {
      newLevel,
      leveledUp,
      totalXP: newTotalXP,
      newBadges
    }
  }

  // Add activity
  private static addActivity(childId: string, activityType: string, xpEarned: number): void {
    const activities = this.getActivities(childId)
    const newActivity: XPActivity = {
      id: Date.now().toString(),
      child_id: childId,
      activity_type: activityType,
      xp_earned: xpEarned,
      activity_data: {},
      created_at: new Date().toISOString()
    }

    activities.unshift(newActivity)
    
    // Keep only last 20 activities
    if (activities.length > 20) {
      activities.splice(20)
    }

    localStorage.setItem(this.getStorageKey(childId, 'activities'), JSON.stringify(activities))
  }

  // Get activities
  private static getActivities(childId: string): XPActivity[] {
    const stored = localStorage.getItem(this.getStorageKey(childId, 'activities'))
    return stored ? JSON.parse(stored) : []
  }

  // Check and award badges
  private static checkAndAwardBadges(childId: string): Badge[] {
    const earnedBadges = this.getEarnedBadges(childId)
    const earnedBadgeIds = earnedBadges.map(b => b.id)
    const xpRecord = this.getChildXP(childId)
    const activities = this.getActivities(childId)
    const chatCount = activities.filter(a => a.activity_type === 'chat_message').length
    const streak = this.getDailyStreak(childId)

    const newBadges: Badge[] = []

    for (const badge of MOCK_BADGES) {
      if (earnedBadgeIds.includes(badge.id)) continue

      let shouldAward = false

      switch (badge.requirement_type) {
        case 'xp_total':
          shouldAward = xpRecord.total_xp >= badge.requirement_value
          break
        case 'activity_count':
          shouldAward = chatCount >= badge.requirement_value
          break
        case 'streak':
          shouldAward = streak.current_streak >= badge.requirement_value
          break
      }

      if (shouldAward) {
        const earnedBadge = {
          ...badge,
          earned: true,
          earned_at: new Date().toISOString()
        }
        earnedBadges.push(earnedBadge)
        newBadges.push(earnedBadge)
      }
    }

    localStorage.setItem(this.getStorageKey(childId, 'badges'), JSON.stringify(earnedBadges))
    return newBadges
  }

  // Get earned badges
  static getEarnedBadges(childId: string): Badge[] {
    const stored = localStorage.getItem(this.getStorageKey(childId, 'badges'))
    return stored ? JSON.parse(stored) : []
  }

  // Get daily streak
  static getDailyStreak(childId: string): DailyStreak {
    const stored = localStorage.getItem(this.getStorageKey(childId, 'streak'))
    const defaultStreak = {
      id: '1',
      child_id: childId,
      current_streak: 0,
      longest_streak: 0,
      last_activity_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    if (!stored) {
      localStorage.setItem(this.getStorageKey(childId, 'streak'), JSON.stringify(defaultStreak))
      return defaultStreak
    }

    return JSON.parse(stored)
  }

  // Update daily streak
  static updateDailyStreak(childId: string): { streakIncreased: boolean; currentStreak: number } {
    const streak = this.getDailyStreak(childId)
    const today = new Date().toISOString().split('T')[0]
    const lastActivity = streak.last_activity_date

    if (lastActivity === today) {
      return { streakIncreased: false, currentStreak: streak.current_streak }
    }

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    let newStreak = streak.current_streak
    let streakIncreased = false

    if (lastActivity === yesterdayStr) {
      // Consecutive day
      newStreak = streak.current_streak + 1
      streakIncreased = true
    } else {
      // Streak broken, reset to 1
      newStreak = 1
      streakIncreased = false
    }

    const updatedStreak = {
      ...streak,
      current_streak: newStreak,
      longest_streak: Math.max(streak.longest_streak, newStreak),
      last_activity_date: today,
      updated_at: new Date().toISOString()
    }

    localStorage.setItem(this.getStorageKey(childId, 'streak'), JSON.stringify(updatedStreak))

    return { streakIncreased, currentStreak: newStreak }
  }

  // Process chat message
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static processChatMessage(childId: string, _messageContent: string): {
    xpEarned: number
    leveledUp: boolean
    newLevel: number
    newBadges: Badge[]
    streakBonus: boolean
  } {
    // Update daily streak
    const { streakIncreased } = this.updateDailyStreak(childId)

    // Award XP for chat message
    const { newLevel, leveledUp, newBadges } = this.addXP(
      childId,
      XP_AMOUNTS.CHAT_MESSAGE,
      'chat_message'
    )

    return {
      xpEarned: XP_AMOUNTS.CHAT_MESSAGE,
      leveledUp,
      newLevel,
      newBadges,
      streakBonus: streakIncreased
    }
  }

  // Get dashboard data
  static getDashboardData(childId: string): {
    xpRecord: XPRecord
    badges: Badge[]
    recentActivities: XPActivity[]
    streak: DailyStreak
    totalBadges: number
    nextBadges: Badge[]
  } {
    const xpRecord = this.getChildXP(childId)
    const badges = this.getEarnedBadges(childId)
    const recentActivities = this.getActivities(childId).slice(0, 10)
    const streak = this.getDailyStreak(childId)
    const totalBadges = MOCK_BADGES.length
    
    // Find next badges to earn
    const earnedBadgeIds = badges.map(b => b.id)
    const nextBadges = MOCK_BADGES
      .filter(badge => !earnedBadgeIds.includes(badge.id))
      .sort((a, b) => a.requirement_value - b.requirement_value)
      .slice(0, 3)

    return {
      xpRecord,
      badges,
      recentActivities,
      streak,
      totalBadges,
      nextBadges
    }
  }

  // Get all badges
  static getAllBadges(): Badge[] {
    return MOCK_BADGES
  }
}