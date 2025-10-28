// Phase 3: Full Route Cache - Static Generation with ISR
import { getAllCachedApiData, getCacheStats } from '@/lib/api-cached';
import ApiCard from '@/components/ApiCard';
import FlushCacheButton from '@/components/FlushCacheButton';

// Full Route Cache with ISR (Incremental Static Regeneration)
// No force-dynamic = allows static generation
export const revalidate = 60; // Revalidate every 60 seconds

export default async function FullRouteCachePage() {
  const startTime = Date.now();
  const apiData = await getAllCachedApiData();
  const totalPageLoadTime = Date.now() - startTime;
  
  // Get generation time for display - use current time as this could be a revalidation
  const generationTime = Date.now();
  const revalidationTime = generationTime + (60 * 1000);
  const isProduction = process.env.NODE_ENV === 'production';

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
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-gray-900">Phase 3: Full Route Cache</h1>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                  Static Generated
                </span>
              </div>
              <p className="text-gray-600">Static HTML with ISR for maximum performance</p>
            </div>
          </div>
          <FlushCacheButton />
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-purple-900">Performance Metrics</h3>
              <p className="text-purple-700">Total page load time: <span className="font-bold">{totalPageLoadTime}ms</span></p>
              <p className="text-sm text-purple-600 mt-1">
                💡 <strong>Static Generated:</strong> This page is pre-rendered as static HTML. 
                Fastest possible response time! Regenerates every 60 seconds.
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-purple-600">
                <div>Total API calls: {apiData.results.length}</div>
                <div>Cache hits: <span className="font-bold text-purple-600">{cacheHits}</span></div>
                <div>Cache misses: <span className="font-bold text-orange-600">{cacheMisses}</span></div>
                <div>Hit rate: <span className="font-bold text-purple-600">{cacheHitRate}%</span></div>
                <div>Cache entries: <span className="font-bold text-blue-600">{cacheStats.size}</span></div>
              </div>
            </div>
          </div>
          
          {/* Static Generation Info */}
          <div className="mt-4 bg-white p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2">📄 Static Generation Status</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-purple-700">Generated at:</div>
                <div className="font-mono text-purple-900">{new Date(generationTime).toLocaleString('en-US', { timeZone: 'Asia/Bangkok', timeZoneName: 'short' })}</div>
              </div>
              <div>
                <div className="text-purple-700">Next revalidation:</div>
                <div className="font-mono text-purple-900">{new Date(revalidationTime).toLocaleString('en-US', { timeZone: 'Asia/Bangkok', timeZoneName: 'short' })}</div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
              ⚠️ <strong>Note:</strong> {isProduction ? 
                'ISR revalidation will occur every 60 seconds. The page regenerates in the background while serving cached content.' :
                'ISR (Incremental Static Regeneration) works best in production mode. In development mode, pages regenerate on every request. To test ISR properly, build and run with: '}
              {!isProduction && <code className="ml-1 bg-yellow-100 px-1 rounded">npm run build && npm start</code>}
            </div>
          </div>
          
          {/* Performance Comparison */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">⚡ Cache Hits</h4>
              <div className="text-sm text-purple-700">
                <div>Count: <span className="font-bold">{cacheHits}</span></div>
                <div>Avg time: <span className="font-bold">{avgCacheHitTime}ms</span></div>
                <div className="text-xs text-purple-600">Lightning fast! 🚀</div>
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
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Phase 3 Summary</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Full Route Cache Strategy:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Static HTML pre-generated at build time</li>
              <li>• Served from cache/CDN for fastest response</li>
              <li>• ISR (Incremental Static Regeneration) every 60s</li>
              <li>• Next.js Data Cache for API calls</li>
              <li>• CDN-friendly for edge deployment</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Fastest possible response time (~1-5ms)</li>
              <li>• Perfect for CDN distribution</li>
              <li>• Better SEO with pre-rendered content</li>
              <li>• Lower server load</li>
              <li>• Excellent scalability</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h4 className="font-medium text-purple-900 mb-2">Cache Configuration:</h4>
          <div className="text-sm text-purple-800 space-y-1">
            <div>• Static HTML: Generated at build/first request</div>
            <div>• ISR Revalidation: Every 60 seconds</div>
            <div>• Data Cache: Same as Phase 2 (30s - 5min based on API)</div>
            <div>• CDN Cache: Can be deployed to edge locations</div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Debug Info:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <div>• Total APIs: {apiData.results.length} (15 APIs implemented)</div>
            <div>• API Categories: Entertainment (6), Financial (2), Environmental (2), News (1), Sample Data (2), Advice (1), Food (1)</div>
            <div>• Cache entries: {cacheStats.size}</div>
            <div>• Cache keys: {cacheStats.entries.length > 0 ? cacheStats.entries.slice(0, 5).join(', ') + (cacheStats.entries.length > 5 ? '...' : '') : 'None'}</div>
            <div>• Page load time: {totalPageLoadTime}ms</div>
            <div>• API total time: {apiData.totalTime}ms</div>
            <div>• Cache hit rate: {cacheHitRate}%</div>
            <div>• Rendering mode: Static (with ISR)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

