// API fetch functions with caching (Phase 2) - Working version
import { 
  JsonPlaceholderPost, 
  JsonPlaceholderUser, 
  RandomUser, 
  DogImage, 
  CatFact, 
  AdviceSlip, 
  ChuckNorrisJoke, 
  Book, 
  Pokemon, 
  CryptoPrice, 
  ProgrammingJoke, 
  WikipediaArticle,
  AirQuality,
  GoldPrice,
  CurrencyExchange,
  OilPrice,
  WeatherData,
  StockPrice,
  NewsArticle,
  SpaceData,
  AviationWeather,
  FoodishImage,
  MealDB,
  ApiResponse 
} from '@/types/api';

// Global cache that persists across requests
declare global {
  var __apiCache: Map<string, { data: any; timestamp: number; ttl: number }> | undefined;
}

// Initialize global cache (use globalThis for Edge Runtime compatibility)
if (typeof globalThis !== 'undefined' && !globalThis.__apiCache) {
  globalThis.__apiCache = new Map();
}

const globalCache = (typeof globalThis !== 'undefined' ? globalThis : global)?.__apiCache || new Map<string, { data: any; timestamp: number; ttl: number }>();

// Helper function to check if cache entry is valid
function isCacheValid(timestamp: number, ttl: number): boolean {
  return Date.now() - timestamp < ttl;
}

// Helper function for fetch with Next.js cache
function cachedFetch(url: string, revalidate: number = 60) {
  return fetch(url, {
    next: { revalidate }
  });
}

// Helper function to measure load time with cache and timeout
async function measureCachedLoadTime<T>(
  cacheKey: string, 
  fetchFn: () => Promise<T>, 
  ttlSeconds: number = 60,
  timeoutMs: number = 5000
): Promise<{ data: T; loadTime: number; cacheHit: boolean }> {
  const startTime = Date.now();
  
  // Check in-memory cache first (for single-request deduplication)
  const cachedEntry = globalCache.get(cacheKey);
  if (cachedEntry && isCacheValid(cachedEntry.timestamp, cachedEntry.ttl)) {
    const loadTime = Date.now() - startTime;
    console.log(`🎯 Cache HIT (memory) for ${cacheKey}: ${loadTime}ms`);
    return { data: cachedEntry.data, loadTime, cacheHit: true };
  }

  // Cache miss - fetch from API with timeout
  console.log(`🔄 Cache MISS for ${cacheKey} - fetching from API...`);
  
  try {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(`Timeout after ${timeoutMs}ms`)), timeoutMs);
    });
    
    const data = await Promise.race([fetchFn(), timeoutPromise]);
    
    // Store in both in-memory and Next.js cache
    globalCache.set(cacheKey, {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000
    });
    
    const loadTime = Date.now() - startTime;
    console.log(`✅ API fetch completed for ${cacheKey}: ${loadTime}ms`);
    
    return { data, loadTime, cacheHit: false };
  } catch (error) {
    const loadTime = Date.now() - startTime;
    console.log(`❌ API fetch failed for ${cacheKey}: ${loadTime}ms - ${error}`);
    // Create a simple error message that can be serialized
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(errorMessage);
  }
}

// JSONPlaceholder APIs with caching
export async function getJsonPlaceholderPostsCached(): Promise<ApiResponse<JsonPlaceholderPost[]>> {
  const { data, loadTime, cacheHit } = await measureCachedLoadTime(
    'jsonplaceholder-posts',
    async () => {
      const response = await cachedFetch('https://jsonplaceholder.typicode.com/posts?_limit=5', 300);
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    },
    300 // 5 minutes cache
  );
  
  return {
    data,
    timestamp: Date.now(),
    source: 'JSONPlaceholder Posts',
    cached: cacheHit,
    loadTime
  };
}

export async function getJsonPlaceholderUsersCached(): Promise<ApiResponse<JsonPlaceholderUser[]>> {
  const { data, loadTime, cacheHit } = await measureCachedLoadTime(
    'jsonplaceholder-users',
    async () => {
      const response = await cachedFetch('https://jsonplaceholder.typicode.com/users?_limit=5', 300);
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    },
    300
  );
  
  return {
    data,
    timestamp: Date.now(),
    source: 'JSONPlaceholder Users',
    cached: cacheHit,
    loadTime
  };
}

// Random User API with caching - COMMENTED OUT due to Cloudflare blocking
// export async function getRandomUsersCached(): Promise<ApiResponse<RandomUser>> {
//   const { data, loadTime, cacheHit } = await measureCachedLoadTime(
//     'random-users',
//     async () => {
//       const response = await cachedFetch('https://randomuser.me/api/?results=3', 60);
//       if (!response.ok) throw new Error('Failed to fetch random users');
//       return response.json();
//     },
//     60
//   );
//   
//   return {
//     data,
//     timestamp: Date.now(),
//     source: 'Random User API',
//     cached: cacheHit,
//     loadTime
//   };
// }

// Dog CEO API with caching
export async function getDogImageCached(): Promise<ApiResponse<DogImage>> {
  const { data, loadTime, cacheHit } = await measureCachedLoadTime(
    'dog-image',
    async () => {
      const response = await cachedFetch('https://dog.ceo/api/breeds/image/random', 30);
      if (!response.ok) throw new Error('Failed to fetch dog image');
      return response.json();
    },
    30
  );
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Dog CEO API',
    cached: cacheHit,
    loadTime
  };
}

// Cat Facts API with caching
export async function getCatFactCached(): Promise<ApiResponse<CatFact>> {
  const { data, loadTime, cacheHit } = await measureCachedLoadTime(
    'cat-fact',
    async () => {
      const response = await cachedFetch('https://catfact.ninja/fact', 60);
      if (!response.ok) throw new Error('Failed to fetch cat fact');
      return response.json();
    },
    60
  );
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Cat Facts API',
    cached: cacheHit,
    loadTime
  };
}

// Advice Slip API with caching
export async function getAdviceSlipCached(): Promise<ApiResponse<AdviceSlip>> {
  const { data, loadTime, cacheHit } = await measureCachedLoadTime(
    'advice-slip',
    async () => {
      const response = await cachedFetch('https://api.adviceslip.com/advice', 120);
      if (!response.ok) throw new Error('Failed to fetch advice');
      return response.json();
    },
    120
  );
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Advice Slip API',
    cached: cacheHit,
    loadTime
  };
}

// Removed problematic API: Bored API

// Chuck Norris Jokes API with caching - Fixed with timeout
export async function getChuckNorrisJokeCached(): Promise<ApiResponse<ChuckNorrisJoke>> {
  const { data, loadTime, cacheHit } = await measureCachedLoadTime(
    'chuck-norris-joke',
    async () => {
      const response = await cachedFetch('https://api.chucknorris.io/jokes/random', 30);
      if (!response.ok) throw new Error('Failed to fetch Chuck Norris joke');
      return response.json();
    },
    30, // 30 seconds cache
    5000  // 5 second timeout
  );
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Chuck Norris Jokes API',
    cached: cacheHit,
    loadTime
  };
}

// Removed problematic API: Quotes API

// Removed problematic APIs: Numbers API, Rest Countries API

// Open Library API with caching - Fixed with timeout
export async function getBooksCached(): Promise<ApiResponse<Book[]>> {
  const { data, loadTime, cacheHit } = await measureCachedLoadTime(
    'books',
    async () => {
      const response = await cachedFetch('https://openlibrary.org/search.json?q=javascript&limit=5', 600);
      if (!response.ok) throw new Error('Failed to fetch books');
      const result = await response.json();
      return result.docs;
    },
    600, // 10 minutes cache
    8000  // 8 second timeout
  );
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Open Library API',
    cached: cacheHit,
    loadTime
  };
}

// PokéAPI with caching - Fixed to use consistent cache key
export async function getPokemonCached(): Promise<ApiResponse<Pokemon>> {
  // Use a fixed Pokemon ID for consistent caching
  const fixedId = 25; // Pikachu - a popular Pokemon
  const { data, loadTime, cacheHit } = await measureCachedLoadTime(
    'pokemon-fixed',
    async () => {
      const response = await cachedFetch(`https://pokeapi.co/api/v2/pokemon/${fixedId}`, 1800);
      if (!response.ok) throw new Error('Failed to fetch Pokemon');
      return response.json();
    },
    1800
  );
  
  return {
    data,
    timestamp: Date.now(),
    source: 'PokéAPI',
    cached: cacheHit,
    loadTime
  };
}

// CoinGecko API with caching
export async function getCryptoPricesCached(): Promise<ApiResponse<CryptoPrice[]>> {
  const { data, loadTime, cacheHit } = await measureCachedLoadTime(
    'crypto-prices',
    async () => {
      const response = await cachedFetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false', 60);
      if (!response.ok) throw new Error('Failed to fetch crypto prices');
      return response.json();
    },
    60
  );
  
  return {
    data,
    timestamp: Date.now(),
    source: 'CoinGecko API',
    cached: cacheHit,
    loadTime
  };
}

// JokeAPI with caching
export async function getProgrammingJokeCached(): Promise<ApiResponse<ProgrammingJoke>> {
  const { data, loadTime, cacheHit } = await measureCachedLoadTime(
    'programming-joke',
    async () => {
      const response = await cachedFetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit', 30);
      if (!response.ok) throw new Error('Failed to fetch programming joke');
      return response.json();
    },
    30
  );
  
  return {
    data,
    timestamp: Date.now(),
    source: 'JokeAPI',
    cached: cacheHit,
    loadTime
  };
}

// Wikipedia API with caching
export async function getWikipediaArticleCached(): Promise<ApiResponse<WikipediaArticle>> {
  const { data, loadTime, cacheHit } = await measureCachedLoadTime(
    'wikipedia-article',
    async () => {
      const response = await cachedFetch('https://en.wikipedia.org/api/rest_v1/page/random/summary', 300);
      if (!response.ok) throw new Error('Failed to fetch Wikipedia article');
      return response.json();
    },
    300
  );
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Wikipedia API',
    cached: cacheHit,
    loadTime
  };
}

// Function to get all cached API data (real APIs only)
export async function getAllCachedApiData() {
  const startTime = Date.now();
  
  const [
    posts,
    users,
    // randomUsers, // COMMENTED OUT due to Cloudflare blocking
    dogImage,
    catFact,
    adviceSlip,
    chuckNorrisJoke,
    books,
    pokemon,
    cryptoPrices,
    programmingJoke,
    wikipediaArticle,
    airQuality,
    currencyExchange,
    aviationWeather,
    mealDB
  ] = await Promise.allSettled([
    getJsonPlaceholderPostsCached(),
    getJsonPlaceholderUsersCached(),
    // getRandomUsersCached(), // COMMENTED OUT due to Cloudflare blocking
    getDogImageCached(),
    getCatFactCached(),
    getAdviceSlipCached(),
    getChuckNorrisJokeCached(),
    getBooksCached(),
    getPokemonCached(),
    getCryptoPricesCached(),
    getProgrammingJokeCached(),
    getWikipediaArticleCached(),
    getAirQualityCached(),
    getCurrencyExchangeCached(),
    getAviationWeatherCached(),
    getMealDBCached()
  ]);

  const totalTime = Date.now() - startTime;
  
  return {
    results: [
      posts,
      users,
      // randomUsers, // COMMENTED OUT due to Cloudflare blocking
      dogImage,
      catFact,
      adviceSlip,
      chuckNorrisJoke,
      books,
      pokemon,
      cryptoPrices,
      programmingJoke,
      wikipediaArticle,
      airQuality,
      currencyExchange,
      aviationWeather,
      mealDB
    ],
    totalTime,
    timestamp: Date.now(),
    cached: true,
    cacheSize: globalCache.size
  };
}

// New cached API functions for financial and environmental data

// Air Quality API with caching
export async function getAirQualityCached(): Promise<ApiResponse<AirQuality>> {
  const { data, loadTime, cacheHit } = await measureCachedLoadTime(
    'air-quality',
    async () => {
      const response = await cachedFetch('https://api.waqi.info/feed/bangkok/?token=demo', 300);
      if (!response.ok) throw new Error('Failed to fetch air quality data');
      return response.json();
    },
    300
  );
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Air Quality API',
    cached: cacheHit,
    loadTime
  };
}


// Currency Exchange API with caching
export async function getCurrencyExchangeCached(): Promise<ApiResponse<CurrencyExchange>> {
  const { data, loadTime, cacheHit } = await measureCachedLoadTime(
    'currency-exchange',
    async () => {
      const response = await cachedFetch('https://api.exchangerate-api.com/v4/latest/USD', 300);
      if (!response.ok) throw new Error('Failed to fetch currency exchange rates');
      return response.json();
    },
    300
  );
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Currency Exchange API',
    cached: cacheHit,
    loadTime
  };
}

// Aviation Weather API with caching
export async function getAviationWeatherCached(): Promise<ApiResponse<AviationWeather>> {
  const { data, loadTime, cacheHit } = await measureCachedLoadTime(
    'aviation-weather',
    async () => {
      const response = await cachedFetch('https://aviationweather.gov/api/data/metar?ids=KJFK,KLAX,KORD,KDFW,KATL&format=json', 300);
      if (!response.ok) throw new Error('Failed to fetch aviation weather data');
      return response.json();
    },
    300
  );
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Aviation Weather API',
    cached: cacheHit,
    loadTime
  };
}

// Foodish API with caching
export async function getFoodishImageCached(): Promise<ApiResponse<FoodishImage>> {
  const { data, loadTime, cacheHit } = await measureCachedLoadTime(
    'foodish-image',
    async () => {
      const response = await cachedFetch('https://foodish-api.com/api/', 60);
      if (!response.ok) throw new Error('Failed to fetch food image');
      return response.json();
    },
    60
  );
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Foodish API',
    cached: cacheHit,
    loadTime
  };
}

// MealDB API with caching
export async function getMealDBCached(): Promise<ApiResponse<MealDB>> {
  const { data, loadTime, cacheHit } = await measureCachedLoadTime(
    'mealdb',
    async () => {
      const response = await cachedFetch('https://www.themealdb.com/api/json/v1/1/random.php', 300);
      if (!response.ok) throw new Error('Failed to fetch meal data');
      return response.json();
    },
    300
  );
  
  return {
    data,
    timestamp: Date.now(),
    source: 'MealDB API',
    cached: cacheHit,
    loadTime
  };
}






// Export cache utilities for debugging
export function getCacheStats() {
  return {
    size: globalCache.size,
    entries: Array.from(globalCache.keys())
  };
}

export function clearCache() {
  globalCache.clear();
  console.log('🗑️ Cache cleared');
}