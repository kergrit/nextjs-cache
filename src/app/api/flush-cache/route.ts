import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { clearCache } from '@/lib/api-cached';

export async function POST(request: Request) {
  try {
    // Get the route to revalidate from request body if provided
    const body = await request.json().catch(() => ({}));
    const path = body.path || '/full-route-cache';
    
    // Clear in-memory cache
    clearCache();
    
    // Revalidate the route cache in Next.js
    revalidatePath(path);
    
    return NextResponse.json({ 
      success: true, 
      message: `Cache flushed and route ${path} revalidated successfully` 
    });
  } catch (error) {
    console.error('Error flushing cache:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to flush cache' },
      { status: 500 }
    );
  }
}
