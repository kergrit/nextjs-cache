'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function FlushCacheButton() {
  const [isFlushing, setIsFlushing] = useState(false);
  const pathname = usePathname();

  const handleFlushCache = async () => {
    setIsFlushing(true);
    
    try {
      // Call API route to clear cache and revalidate route on server
      const response = await fetch('/api/flush-cache', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: pathname }),
      });
      
      if (response.ok) {
        // Wait a bit for the cache to clear and route to revalidate
        await new Promise(resolve => setTimeout(resolve, 500));
        // Reload the page to see the effect with fresh data
        window.location.reload();
      } else {
        console.error('Failed to flush cache');
        setIsFlushing(false);
      }
    } catch (error) {
      console.error('Error flushing cache:', error);
      setIsFlushing(false);
    }
  };

  return (
    <button
      onClick={handleFlushCache}
      disabled={isFlushing}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      title="Flush cache and revalidate this route"
    >
      {isFlushing ? '⏳ Revalidating...' : '🗑️ Flush & Revalidate'}
    </button>
  );
}
