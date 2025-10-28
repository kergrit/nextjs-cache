// Home page with navigation and overview
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Next.js Cache Performance Demo
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Compare the performance difference between uncached and cached API calls 
          using Next.js 14 caching strategies with 15 different APIs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Phase 1: No Cache</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Direct API calls without any caching mechanism. Each request fetches fresh data 
            from external APIs, demonstrating baseline performance.
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Direct fetch() calls
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              No request deduplication
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Fresh data every time
            </div>
          </div>
          <Link 
            href="/inactive-cache"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            View Phase 1
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Phase 2: With Cache</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Optimized API calls using Next.js caching strategies including fetch cache, 
            React cache, and unstable_cache for maximum performance.
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Next.js fetch() cache
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              React cache() deduplication
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Time-based revalidation
            </div>
          </div>
          <Link 
            href="/active-cache"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            View Phase 2
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">APIs Included in Demo (15 APIs)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'JSONPlaceholder Posts', endpoint: 'https://jsonplaceholder.typicode.com/posts?_limit=5' },
              { name: 'JSONPlaceholder Users', endpoint: 'https://jsonplaceholder.typicode.com/users?_limit=5' },
              { name: 'Dog CEO', endpoint: 'https://dog.ceo/api/breeds/image/random' },
              { name: 'Cat Facts', endpoint: 'https://catfact.ninja/fact' },
              { name: 'Advice Slip', endpoint: 'https://api.adviceslip.com/advice' },
              { name: 'Chuck Norris', endpoint: 'https://api.chucknorris.io/jokes/random' },
              { name: 'Open Library', endpoint: 'https://openlibrary.org/search.json?q=javascript&limit=5' },
              { name: 'PokéAPI', endpoint: 'https://pokeapi.co/api/v2/pokemon/25' },
              { name: 'CoinGecko', endpoint: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false' },
              { name: 'JokeAPI', endpoint: 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit' },
              { name: 'Wikipedia', endpoint: 'https://en.wikipedia.org/api/rest_v1/page/random/summary' },
              { name: 'Air Quality', endpoint: 'https://api.waqi.info/feed/bangkok/?token=demo' },
              { name: 'Currency Exchange', endpoint: 'https://api.exchangerate-api.com/v4/latest/USD' },
              { name: 'Aviation Weather', endpoint: 'https://aviationweather.gov/api/data/metar?ids=KJFK,KLAX,KORD,KDFW,KATL&format=json' },
              { name: 'MealDB', endpoint: 'https://www.themealdb.com/api/json/v1/1/random.php' }
            ].map((api, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="mb-2">
                  <span className="text-sm font-semibold text-gray-900">{api.name}</span>
                </div>
                <a 
                  href={api.endpoint}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 font-mono bg-gray-100 p-2 rounded block hover:bg-gray-200 transition-colors break-all"
                >
                  {api.endpoint}
                </a>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}