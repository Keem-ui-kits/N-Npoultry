import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Lightweight endpoint that pings Supabase to prevent the free-tier
 * project from pausing due to inactivity (7-day limit).
 *
 * Triggered automatically by the Vercel cron defined in vercel.json.
 */
export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return NextResponse.json(
      { status: 'skipped', reason: 'Supabase credentials not configured' },
      { status: 200 }
    );
  }

  try {
    const supabase = createClient(url, key);
    const { error } = await supabase
      .from('contact_submissions')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Supabase keep-alive query failed:', error.message);
      return NextResponse.json(
        { status: 'error', message: error.message, timestamp: new Date().toISOString() },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 'alive',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Supabase keep-alive failed:', message);
    return NextResponse.json(
      { status: 'error', message, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
