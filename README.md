# ONE EDU MVP - Setup Instructions

## Overview
ONE EDU is an AI-powered educational platform designed to help children aged 8-13 learn real-world life skills through voice-enabled AI mentoring.

## Prerequisites
- Node.js (v20 or later)
- npm or yarn
- Supabase account
- OpenAI API key

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to find your project URL and anon key
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
OPENAI_API_KEY=your-openai-api-key
```

**⚠️ Important:** For AI Mentor Chat functionality, you'll need an **OpenAI API key**. Get yours at [platform.openai.com](https://platform.openai.com/api-keys)

### 3. Set up Database Tables

Go to your Supabase SQL Editor and run the database schema:

**📋 Go to:** https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql

**Copy and paste the contents of the `database/schema.sql` file and run.**

### 4. Configure Authentication

1. Go to Authentication > Settings in your Supabase dashboard
2. Turn off "Enable email confirmations" for development (optional)
3. Set up any additional authentication providers if needed

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
src/
├── app/                         # Next.js 13+ App Router
│   ├── api/                    # API routes
│   ├── auth/                   # Authentication page
│   ├── child-onboarding/      # Child profile creation
│   ├── role-selection/        # Role selection (parent/child)
│   ├── parent-dashboard/      # Parent management dashboard
│   ├── mentor-chat/          # AI mentor chat interface
│   ├── xp-dashboard/         # XP and achievements
│   └── layout.tsx            # Root layout with providers
├── components/
│   ├── development/          # Development tools
│   ├── features/            # Feature-specific components
│   ├── form/               # Form components
│   ├── layout/            # Layout components
│   └── ui/                # Reusable UI components
├── contexts/
│   └── AuthContext.tsx    # Authentication context
├── hooks/                # Custom hooks
│   ├── app/             # Application-specific hooks
│   ├── core/           # Core utility hooks
│   ├── form/          # Form-related hooks
│   ├── storage/       # Storage hooks
│   └── ui/           # UI-related hooks
└── lib/              # Core utilities
    ├── supabase.ts  # Supabase client
    ├── openai.ts    # OpenAI integration
    └── mock-xp-system.ts # Temporary XP system
```

## User Flow

1. **Landing Page** (`/`) - Welcome and feature overview
2. **Authentication** (`/auth`) - Login/signup with email
3. **Role Selection** (`/role-selection`) - Choose parent or child role
4. **Child Onboarding** (`/child-onboarding`) - Create child profile
5. **Parent Dashboard** (`/parent-dashboard`) - Manage children and progress (Comming soon)
6. **Mentor Chat** (`/mentor-chat`) - AI mentor chat
7. **XP Dashboard** (`/xp-dashboard`) - Track achievements and skills

## Features

✅ **Authentication & Profiles:**
- Email-based authentication with Supabase
- Role-based access (parent/child)
- Child profile management
- Session persistence with sessionStorage

✅ **AI Mentor Chat:**
- Voice-enabled chat with OpenAI
- Child-safe content filtering
- Personalized responses based on profile
- Real-time chat with typing indicators
- Emoji and GIF support

✅ **XP System:**
- Achievement tracking
- Skill progression
- Visual progress indicators
- Badge collection system
- Daily streaks

✅ **Parent Features:**
- Comming soon

## Development Features

- TypeScript strict mode
- ESLint configuration
- Tailwind CSS with PostCSS
- Development debugging tools
- Mobile-responsive design
- Loading states for all actions

## Troubleshooting

### Common Issues

1. **Authentication Issues**
   - Verify Supabase credentials in `.env.local`
   - Check browser console for errors
   - Ensure proper RLS policies

2. **Database Errors**
   - Confirm schema installation
   - Check RLS policies
   - Verify user permissions

3. **Chat Issues**
   - Validate OpenAI API key
   - Check rate limits
   - Verify network connectivity

### Environment Setup
Ensure `.env.local` is configured with all required variables and excluded from version control.

## Next Steps

1. Implement voice chat persistence
2. Add parent insights dashboard
3. Expand skill tracking system
4. Enhance achievement mechanics
5. Add learning resource library 