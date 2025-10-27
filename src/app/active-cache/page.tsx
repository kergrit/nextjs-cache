// Phase 2: With Cache - Optimized API calls
import { getAllCachedApiData, getCacheStats, clearCache } from '@/lib/api-cached';
import ApiCard from '@/components/ApiCard';
import FlushCacheButton from '@/components/FlushCacheButton';

// Force dynamic rendering to get accurate timings
export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

export default async function ActiveCachePage() {
  const startTime = Date.now();
  const apiData = await getAllCachedApiData();
  const totalPageLoadTime = Date.now() - startTime;

  // Calculate cache statistics
  const successfulResults = apiData.results.filter(result => result.status === 'fulfilled') as PromiseFulfilledResult<any>[];
  const cacheHits = successfulResults.filter(result => result.value.cached).length;
  const cacheMisses = successfulResults.length - cacheHits;
  const cacheHitRate = successfulResults.length > 0 ? Math.round((cacheHits / successfulResults.length) * 100) : 0;
  const cacheStats = getCacheStats();
  
  // Calculate average load time for cache hits vs misses
  const cacheHitResults = successfulResults.filter(result => result.value.cached);
  const cacheMissResults = successfulResults.filter(result => !result.value.cached);
  
  const avgCacheHitTime = cacheHitResults.length > 0 
    ? Math.round(cacheHitResults.reduce((sum, result) => sum + result.value.loadTime, 0) / cacheHitResults.length)
    : 0;
    
  const avgCacheMissTime = cacheMissResults.length > 0
    ? Math.round(cacheMissResults.reduce((sum, result) => sum + result.value.loadTime, 0) / cacheMissResults.length)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Phase 2: With Cache</h1>
              <p className="text-gray-600">Optimized API calls with multiple caching strategies</p>
            </div>
          </div>
          <FlushCacheButton />
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-900">Performance Metrics</h3>
              <p className="text-green-700">Total page load time: <span className="font-bold">{totalPageLoadTime}ms</span></p>
              <p className="text-sm text-green-600 mt-1">
                💡 <strong>Tip:</strong> Refresh this page to see cache performance! 
                First load = cache misses, subsequent loads = cache hits with faster response times.
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-600">
                <div>Total API calls: 12</div>
                <div>Cache hits: <span className="font-bold text-green-600">{cacheHits}</span></div>
                <div>Cache misses: <span className="font-bold text-orange-600">{cacheMisses}</span></div>
                <div>Hit rate: <span className="font-bold text-green-600">{cacheHitRate}%</span></div>
                <div>Cache entries: <span className="font-bold text-blue-600">{cacheStats.size}</span></div>
              </div>
            </div>
          </div>
          
          {/* Performance Comparison */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">⚡ Cache Hits</h4>
              <div className="text-sm text-green-700">
                <div>Count: <span className="font-bold">{cacheHits}</span></div>
                <div>Avg time: <span className="font-bold">{avgCacheHitTime}ms</span></div>
                <div className="text-xs text-green-600">Lightning fast! 🚀</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">🔄 Cache Misses</h4>
              <div className="text-sm text-orange-700">
                <div>Count: <span className="font-bold">{cacheMisses}</span></div>
                <div>Avg time: <span className="font-bold">{avgCacheMissTime}ms</span></div>
                <div className="text-xs text-orange-600">API call required 📡</div>
              </div>
            </div>
          </div>
          
          {/* Performance Improvement */}
          {avgCacheHitTime > 0 && avgCacheMissTime > 0 && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">📊 Performance Improvement</h4>
              <div className="text-sm text-blue-700">
                <div>Speed improvement: <span className="font-bold text-blue-600">
                  {Math.round(((avgCacheMissTime - avgCacheHitTime) / avgCacheMissTime) * 100)}% faster
                </span></div>
                <div>Time saved per request: <span className="font-bold text-blue-600">
                  {avgCacheMissTime - avgCacheHitTime}ms
                </span></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apiData.results.map((result, index) => (
          <ApiCard key={index} result={result} index={index} />
        ))}
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Phase 2 Summary</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Caching Strategies Used:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Next.js fetch() cache with revalidation</li>
              <li>• React cache() for request deduplication</li>
              <li>• unstable_cache for fine-grained control</li>
              <li>• Route-level revalidation (60s)</li>
              <li>• Tag-based cache invalidation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Faster subsequent page loads</li>
              <li>• Reduced API server load</li>
              <li>• Better user experience</li>
              <li>• Lower bandwidth usage</li>
              <li>• Improved scalability</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-medium text-yellow-900 mb-2">Cache Configuration:</h4>
          <div className="text-sm text-yellow-800 space-y-1">
            <div>• JSONPlaceholder: 5 minutes cache</div>
            <div>• Random APIs: 30-60 seconds cache</div>
            <div>• Static data: 30 minutes cache</div>
            <div>• Crypto prices: 1 minute cache (frequent updates)</div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Debug Info:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <div>• Cache entries: {cacheStats.entries.join(', ')}</div>
            <div>• Total cache size: {cacheStats.size}</div>
            <div>• Check browser console for cache logs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
