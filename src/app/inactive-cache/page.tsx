// Phase 1: No Cache - Direct API calls
import { getAllApiData } from '@/lib/api';
import ApiCard from '@/components/ApiCard';

// Force dynamic rendering to get accurate timings
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function InactiveCachePage() {
  const startTime = Date.now();
  const apiData = await getAllApiData();
  const totalPageLoadTime = Date.now() - startTime;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
            <span className="text-2xl">🚀</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Phase 1: No Cache</h1>
            <p className="text-gray-600">Direct API calls without caching</p>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Performance Metrics</h3>
              <p className="text-blue-700">Total page load time: <span className="font-bold">{totalPageLoadTime}ms</span></p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-600">
                <div>Total API calls: {apiData.results.length}</div>
                <div>Cache status: <span className="font-bold text-red-600">DISABLED</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apiData.results.map((result, index) => (
          <ApiCard key={index} result={result} index={index} />
        ))}
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Phase 1 Summary</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Characteristics:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Direct fetch() calls to external APIs</li>
              <li>• No request deduplication</li>
              <li>• Fresh data on every page load</li>
              <li>• Higher server load and slower response times</li>
              <li>• No caching overhead</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Use Cases:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Real-time data requirements</li>
              <li>• Development and testing</li>
              <li>• When data changes frequently</li>
              <li>• Small-scale applications</li>
              <li>• Baseline performance measurement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
