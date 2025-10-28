// API fetch functions without caching (Phase 1)
import { 
  JsonPlaceholderPost, 
  JsonPlaceholderUser, 
  RandomUser, 
  DogImage, 
  CatFact, 
  AdviceSlip, 
  BoredActivity, 
  ChuckNorrisJoke, 
  Quote, 
  NumberFact, 
  Country, 
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

// Helper function to measure load time with better error handling
async function measureLoadTime<T>(fn: () => Promise<T>): Promise<{ data: T; loadTime: number }> {
  const startTime = Date.now();
  try {
    const data = await fn();
    const loadTime = Date.now() - startTime;
    return { data, loadTime };
  } catch (error) {
    const loadTime = Date.now() - startTime;
    // Create a simple error message that can be serialized
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(errorMessage);
  }
}

// JSONPlaceholder APIs
export async function getJsonPlaceholderPosts(): Promise<ApiResponse<JsonPlaceholderPost[]>> {
  const { data, loadTime } = await measureLoadTime(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  });
  
  return {
    data,
    timestamp: Date.now(),
    source: 'JSONPlaceholder Posts',
    loadTime
  };
}

export async function getJsonPlaceholderUsers(): Promise<ApiResponse<JsonPlaceholderUser[]>> {
  const { data, loadTime } = await measureLoadTime(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  });
  
  return {
    data,
    timestamp: Date.now(),
    source: 'JSONPlaceholder Users',
    loadTime
  };
}

// Random User API - COMMENTED OUT due to Cloudflare blocking
// export async function getRandomUsers(): Promise<ApiResponse<RandomUser>> {
//   const { data, loadTime } = await measureLoadTime(async () => {
//     const response = await fetch('https://randomuser.me/api/?results=3');
//     if (!response.ok) throw new Error('Failed to fetch random users');
//     return response.json();
//   });
//   
//   return {
//     data,
//     timestamp: Date.now(),
//     source: 'Random User API',
//     loadTime
//   };
// }

// Dog CEO API
export async function getDogImage(): Promise<ApiResponse<DogImage>> {
  const { data, loadTime } = await measureLoadTime(async () => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    if (!response.ok) throw new Error('Failed to fetch dog image');
    return response.json();
  });
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Dog CEO API',
    loadTime
  };
}

// Cat Facts API
export async function getCatFact(): Promise<ApiResponse<CatFact>> {
  const { data, loadTime } = await measureLoadTime(async () => {
    const response = await fetch('https://catfact.ninja/fact');
    if (!response.ok) throw new Error('Failed to fetch cat fact');
    return response.json();
  });
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Cat Facts API',
    loadTime
  };
}

// Advice Slip API
export async function getAdviceSlip(): Promise<ApiResponse<AdviceSlip>> {
  const { data, loadTime } = await measureLoadTime(async () => {
    const response = await fetch('https://api.adviceslip.com/advice');
    if (!response.ok) throw new Error('Failed to fetch advice');
    return response.json();
  });
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Advice Slip API',
    loadTime
  };
}

// Removed problematic API: Bored API

// Chuck Norris Jokes API
export async function getChuckNorrisJoke(): Promise<ApiResponse<ChuckNorrisJoke>> {
  const { data, loadTime } = await measureLoadTime(async () => {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    if (!response.ok) throw new Error('Failed to fetch Chuck Norris joke');
    return response.json();
  });
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Chuck Norris Jokes API',
    loadTime
  };
}

// Removed problematic API: Quotes API

// Removed problematic APIs: Numbers API, Rest Countries API

// Open Library API
export async function getBooks(): Promise<ApiResponse<Book[]>> {
  const { data, loadTime } = await measureLoadTime(async () => {
    const response = await fetch('https://openlibrary.org/search.json?q=javascript&limit=5');
    if (!response.ok) throw new Error('Failed to fetch books');
    const result = await response.json();
    return result.docs;
  });
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Open Library API',
    loadTime
  };
}

// PokéAPI
export async function getPokemon(): Promise<ApiResponse<Pokemon>> {
  const randomId = Math.floor(Math.random() * 151) + 1; // First 151 Pokemon
  const { data, loadTime } = await measureLoadTime(async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    if (!response.ok) throw new Error('Failed to fetch Pokemon');
    return response.json();
  });
  
  return {
    data,
    timestamp: Date.now(),
    source: 'PokéAPI',
    loadTime
  };
}

// CoinGecko API
export async function getCryptoPrices(): Promise<ApiResponse<CryptoPrice[]>> {
  const { data, loadTime } = await measureLoadTime(async () => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false');
    if (!response.ok) throw new Error('Failed to fetch crypto prices');
    return response.json();
  });
  
  return {
    data,
    timestamp: Date.now(),
    source: 'CoinGecko API',
    loadTime
  };
}

// JokeAPI
export async function getProgrammingJoke(): Promise<ApiResponse<ProgrammingJoke>> {
  const { data, loadTime } = await measureLoadTime(async () => {
    const response = await fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
    if (!response.ok) throw new Error('Failed to fetch programming joke');
    return response.json();
  });
  
  return {
    data,
    timestamp: Date.now(),
    source: 'JokeAPI',
    loadTime
  };
}

// Wikipedia API
export async function getWikipediaArticle(): Promise<ApiResponse<WikipediaArticle>> {
  const { data, loadTime } = await measureLoadTime(async () => {
    const response = await fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary');
    if (!response.ok) throw new Error('Failed to fetch Wikipedia article');
    return response.json();
  });
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Wikipedia API',
    loadTime
  };
}

// Function to get all API data (removed problematic APIs)
// New API functions for financial and environmental data

// Air Quality API (using aqicn.org - free tier)
export async function getAirQuality(): Promise<ApiResponse<AirQuality>> {
  const { data, loadTime } = await measureLoadTime(async () => {
    const response = await fetch('https://api.waqi.info/feed/bangkok/?token=demo');
    if (!response.ok) throw new Error('Failed to fetch air quality data');
    return response.json();
  });
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Air Quality API',
    loadTime
  };
}


// Currency Exchange API (using exchangerate-api.com - free tier)
export async function getCurrencyExchange(): Promise<ApiResponse<CurrencyExchange>> {
  const { data, loadTime } = await measureLoadTime(async () => {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    if (!response.ok) throw new Error('Failed to fetch currency exchange rates');
    return response.json();
  });
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Currency Exchange API',
    loadTime
  };
}

// Aviation Weather API (using aviationweather.gov - free tier)
export async function getAviationWeather(): Promise<ApiResponse<AviationWeather>> {
  const { data, loadTime } = await measureLoadTime(async () => {
    const response = await fetch('https://aviationweather.gov/api/data/metar?ids=KJFK,KLAX,KORD,KDFW,KATL&format=json');
    if (!response.ok) throw new Error('Failed to fetch aviation weather data');
    return response.json();
  });
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Aviation Weather API',
    loadTime
  };
}

// Foodish API (using foodish-api.com - free tier)
export async function getFoodishImage(): Promise<ApiResponse<FoodishImage>> {
  const { data, loadTime } = await measureLoadTime(async () => {
    const response = await fetch('https://foodish-api.com/api/');
    if (!response.ok) throw new Error('Failed to fetch food image');
    return response.json();
  });
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Foodish API',
    loadTime
  };
}

// MealDB API (using themeadb.com - free tier)
export async function getMealDB(): Promise<ApiResponse<MealDB>> {
  const { data, loadTime } = await measureLoadTime(async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    if (!response.ok) throw new Error('Failed to fetch meal data');
    return response.json();
  });
  
  return {
    data,
    timestamp: Date.now(),
    source: 'MealDB API',
    loadTime
  };
}






// Get all APIs (updated with real APIs only)
export async function getAllApiData() {
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
    getJsonPlaceholderPosts(),
    getJsonPlaceholderUsers(),
    // getRandomUsers(), // COMMENTED OUT due to Cloudflare blocking
    getDogImage(),
    getCatFact(),
    getAdviceSlip(),
    getChuckNorrisJoke(),
    getBooks(),
    getPokemon(),
    getCryptoPrices(),
    getProgrammingJoke(),
    getWikipediaArticle(),
    getAirQuality(),
    getCurrencyExchange(),
    getAviationWeather(),
    getMealDB()
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
    timestamp: Date.now()
  };
}
