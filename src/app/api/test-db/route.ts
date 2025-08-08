import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Test basic connection
    const { data: testData, error: testError } = await supabase
      .from('child_profiles')
      .select('count')
      .limit(1)

    if (testError) {
      return NextResponse.json({ 
        error: 'Database connection failed', 
        details: testError 
      }, { status: 500 })
    }

    // Test with a specific user ID (you can replace this with a real user ID for testing)
    const testUserId = '00000000-0000-0000-0000-000000000000'
    const { data: profiles, error: profilesError } = await supabase
      .from('child_profiles')
      .select('*')
      .eq('user_id', testUserId)

    return NextResponse.json({
      success: true,
      connection: 'OK',
      testQuery: {
        data: testData,
        error: testError
      },
      profilesQuery: {
        data: profiles,
        error: profilesError,
        count: profiles?.length || 0
      }
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'API error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 