'use client';

import { useState } from 'react';

export default function FlushCacheButton() {
  const [isFlushing, setIsFlushing] = useState(false);

  const handleFlushCache = async () => {
    setIsFlushing(true);
    
    try {
      // Call API route to clear cache on server
      const response = await fetch('/api/flush-cache', {
        method: 'POST',
      });
      
      if (response.ok) {
        // Wait a bit for the cache to clear
        await new Promise(resolve => setTimeout(resolve, 100));
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
    >
      {isFlushing ? '⏳ Flushing...' : '🗑️ Flush Cache'}
    </button>
  );
}
