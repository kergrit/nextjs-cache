// Navigation component
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Next.js Cache Demo
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link 
              href="/inactive-cache" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Phase 1: No Cache
            </Link>
            <Link 
              href="/active-cache" 
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Phase 2: With Cache
            </Link>
            <Link 
              href="/full-route-cache" 
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Phase 3: Full Route
            </Link>
            <Link 
              href="/comparison" 
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              📊 Comparison
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
