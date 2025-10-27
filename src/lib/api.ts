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
  ApiResponse 
} from '@/types/api';

// Helper function to measure load time
async function measureLoadTime<T>(fn: () => Promise<T>): Promise<{ data: T; loadTime: number }> {
  const startTime = Date.now();
  const data = await fn();
  const loadTime = Date.now() - startTime;
  return { data, loadTime };
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

// Random User API
export async function getRandomUsers(): Promise<ApiResponse<RandomUser>> {
  const { data, loadTime } = await measureLoadTime(async () => {
    const response = await fetch('https://randomuser.me/api/?results=3');
    if (!response.ok) throw new Error('Failed to fetch random users');
    return response.json();
  });
  
  return {
    data,
    timestamp: Date.now(),
    source: 'Random User API',
    loadTime
  };
}

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
export async function getAllApiData() {
  const startTime = Date.now();
  
  const [
    posts,
    users,
    randomUsers,
    dogImage,
    catFact,
    adviceSlip,
    chuckNorrisJoke,
    books,
    pokemon,
    cryptoPrices,
    programmingJoke,
    wikipediaArticle
  ] = await Promise.allSettled([
    getJsonPlaceholderPosts(),
    getJsonPlaceholderUsers(),
    getRandomUsers(),
    getDogImage(),
    getCatFact(),
    getAdviceSlip(),
    getChuckNorrisJoke(),
    getBooks(),
    getPokemon(),
    getCryptoPrices(),
    getProgrammingJoke(),
    getWikipediaArticle()
  ]);

  const totalLoadTime = Date.now() - startTime;
  
  return {
    results: [
      posts,
      users,
      randomUsers,
      dogImage,
      catFact,
      adviceSlip,
      chuckNorrisJoke,
      books,
      pokemon,
      cryptoPrices,
      programmingJoke,
      wikipediaArticle
    ],
    totalLoadTime,
    timestamp: Date.now()
  };
}
