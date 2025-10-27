import { NextResponse } from 'next/server';
import { clearCache } from '@/lib/api-cached';

export async function POST() {
  try {
    clearCache();
    return NextResponse.json({ 
      success: true, 
      message: 'Cache flushed successfully' 
    });
  } catch (error) {
    console.error('Error flushing cache:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to flush cache' },
      { status: 500 }
    );
  }
}
