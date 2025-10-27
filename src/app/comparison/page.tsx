// Comparison page showing performance difference
import { getAllApiData } from '@/lib/api';
import { getAllCachedApiData } from '@/lib/api-cached';

// Force dynamic rendering to get accurate timings
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ComparisonPage() {
  // Fetch data from both phases - run sequentially to avoid cache contamination
  const noCacheStart = Date.now();
  const noCacheData = await getAllApiData();
  const noCacheTime = Date.now() - noCacheStart;
  
  const cachedStart = Date.now();
  const cachedData = await getAllCachedApiData();
  const cachedTime = Date.now() - cachedStart;

  // Calculate statistics
  const noCacheResults = noCacheData.results.filter(r => r.status === 'fulfilled') as PromiseFulfilledResult<any>[];
  const cachedResults = cachedData.results.filter(r => r.status === 'fulfilled') as PromiseFulfilledResult<any>[];
  
  const cachedHits = cachedResults.filter(r => r.value.cached).length;
  const cachedMisses = cachedResults.length - cachedHits;
  
  // Calculate average API load times
  const avgNoCacheTime = noCacheResults.length > 0 
    ? Math.round(noCacheResults.reduce((sum, r) => sum + r.value.loadTime, 0) / noCacheResults.length)
    : 0;
    
  const avgCachedTime = cachedResults.length > 0
    ? Math.round(cachedResults.reduce((sum, r) => sum + r.value.loadTime, 0) / cachedResults.length)
    : 0;
  
  // Calculate speed improvement percentages
  const pageLoadImprovement = noCacheTime > 0 
    ? Math.round(((noCacheTime - cachedTime) / noCacheTime) * 100) 
    : 0;
  const apiTimeImprovement = avgNoCacheTime > 0
    ? Math.round(((avgNoCacheTime - avgCachedTime) / avgNoCacheTime) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Performance Comparison</h1>
        <p className="text-xl text-gray-600">Side-by-side comparison of caching performance</p>
      </div>

      {/* Summary Box */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{noCacheTime}ms</div>
            <div className="text-sm text-gray-600">No Cache Load Time</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{cachedTime}ms</div>
            <div className="text-sm text-gray-600">Cached Load Time</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{cachedHits}/{cachedResults.length}</div>
            <div className="text-sm text-gray-600">Cache Hit Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{cachedMisses}</div>
            <div className="text-sm text-gray-600">Cache Misses</div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-2xl font-semibold text-blue-900">Phase 1: No Cache</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-blue-700">Total page load time:</span>
              <span className="font-bold text-blue-800">{noCacheTime}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Average API time:</span>
              <span className="font-bold text-blue-800">{avgNoCacheTime}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Cache hits:</span>
              <span className="font-bold text-red-600">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Cache misses:</span>
              <span className="font-bold text-orange-600">{noCacheResults.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h2 className="text-2xl font-semibold text-green-900">Phase 2: With Cache</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-green-700">Total page load time:</span>
              <span className="font-bold text-green-800">{cachedTime}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Average API time:</span>
              <span className="font-bold text-green-800">{avgCachedTime}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Cache hits:</span>
              <span className="font-bold text-green-600">{cachedHits}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Cache misses:</span>
              <span className="font-bold text-orange-600">{cachedMisses}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Improvement */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Performance Improvement</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {pageLoadImprovement}%
            </div>
            <div className="text-sm text-gray-600">Faster Page Load</div>
            <div className="text-xs text-gray-500 mt-1">
              {noCacheTime}ms → {cachedTime}ms
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {apiTimeImprovement}%
            </div>
            <div className="text-sm text-gray-600">Faster API Response</div>
            <div className="text-xs text-gray-500 mt-1">
              {avgNoCacheTime}ms → {avgCachedTime}ms avg
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {noCacheTime - cachedTime}ms
            </div>
            <div className="text-sm text-gray-600">Time Saved</div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round((noCacheTime - cachedTime) / 1000 * 10) / 10}s saved
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed API Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300 bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">API</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-800">No Cache (ms)</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-800">With Cache (ms)</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-800">Improvement</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">Status</th>
              </tr>
            </thead>
            <tbody>
              {noCacheResults.map((noCacheResult, index) => {
                const cachedResult = cachedResults[index];
                if (!cachedResult || cachedResult.status !== 'fulfilled') return null;
                
                const noCacheTime = noCacheResult.value.loadTime;
                const cachedTime = cachedResult.value.loadTime;
                const improvement = Math.round(((noCacheTime - cachedTime) / noCacheTime) * 100);
                
                return (
                  <tr 
                    key={index} 
                    className={`border-b hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">{noCacheResult.value.source}</td>
                    <td className="text-right py-3 px-4 text-gray-700">{noCacheTime}</td>
                    <td className="text-right py-3 px-4 text-gray-700">{cachedTime}</td>
                    <td className="text-right py-3 px-4">
                      <span className={`font-bold ${improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {improvement > 0 ? `+${improvement}%` : `${improvement}%`}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        cachedResult.value.cached 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-orange-100 text-orange-800 border border-orange-200'
                      }`}>
                        {cachedResult.value.cached ? '⚡ HIT' : '🔄 MISS'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
