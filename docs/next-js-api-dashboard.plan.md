# Next.js API Dashboard Application

## Overview

Build a Next.js 14+ application using App Router, TypeScript, and Tailwind CSS that displays data from multiple open APIs in a single-page list view.

## API Selection (15-20 Open APIs)

The following free, no-auth APIs will be integrated:

1. **JSONPlaceholder** - Sample posts/users
2. **Random User API** - Random user profiles
3. **Dog CEO** - Random dog images
4. **Cat Facts** - Random cat facts
5. **Advice Slip** - Random advice
6. **Bored API** - Activity suggestions
7. **Chuck Norris Jokes** - Random jokes
8. **Quotes API** - Inspirational quotes
9. **Numbers API** - Number facts
10. **Rest Countries** - Country information
11. **Open Library** - Book data
12. **PokéAPI** - Pokemon data
13. **CoinGecko** - Crypto prices (limited endpoints)
14. **JokeAPI** - Programming jokes
15. **Wikipedia** - Random articles

## Project Structure

```
nextjs-cache/
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home/landing page with navigation
│   ├── inactive-cache/
│   │   └── page.tsx                  # Phase 1: No caching
│   ├── active-cache/
│   │   └── page.tsx                  # Phase 2: With caching
│   └── globals.css                   # Global styles
├── components/
│   ├── ApiCard.tsx                   # Reusable card component
│   ├── LoadingCard.tsx               # Loading skeleton
│   └── Navigation.tsx                # Navigation between routes
├── lib/
│   ├── api.ts                        # API fetch functions (no cache)
│   └── api-cached.ts                 # API fetch functions (with cache)
├── types/
│   └── api.ts                        # TypeScript interfaces
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Implementation Phases

### Phase 1: Basic Implementation (Without Caching)

Build the application with standard API fetching to establish baseline functionality and performance.

#### Steps:

1. **Project Setup**

   - Initialize Next.js 14+ with TypeScript
   - Configure Tailwind CSS
   - Set up project structure

2. **Type Definitions**

   - Create TypeScript interfaces for each API response in `types/api.ts`

3. **API Functions (No Cache)**

   - Implement basic fetch functions in `lib/api.ts`
   - Error handling and loading states
   - No caching - direct API calls every time

4. **Components**

   - **ApiCard.tsx**: Display individual API results
   - **LoadingCard.tsx**: Skeleton loader

5. **Main Page**

   - Server Components for data fetching
   - Display all API results in responsive grid
   - Handle loading and error states

6. **Styling**

   - Responsive design with Tailwind CSS
   - Card-based layout

### Phase 2: Cache Implementation (Performance Optimization)

Apply various caching strategies to improve performance and reduce API calls on `/active-cache` route.

#### Caching Technologies Summary

**1. Next.js Data Cache (fetch API)**

- **Tool**: Built-in `fetch()` with cache options
- **Method**: 
  ```typescript
  fetch(url, { 
    next: { revalidate: 60 } // Cache for 60 seconds
  })
  ```

- **Use Case**: Server-side data caching with time-based revalidation
- **Benefits**: Automatic cache management, reduces API calls

**2. Route Segment Config**

- **Tool**: Next.js route configuration
- **Method**:
  ```typescript
  export const revalidate = 60; // Revalidate every 60 seconds
  export const dynamic = 'force-static'; // or 'force-dynamic'
  ```

- **Use Case**: Configure caching behavior for entire route
- **Benefits**: Simple page-level cache control

**3. React Cache Function**

- **Tool**: React's `cache()` from 'react'
- **Method**:
  ```typescript
  import { cache } from 'react';
  export const getCachedData = cache(async () => {
    return fetch(url);
  });
  ```

- **Use Case**: Request deduplication during React render
- **Benefits**: Prevents duplicate API calls in same render cycle

**4. Unstable_cache (Next.js)**

- **Tool**: `unstable_cache` from 'next/cache'
- **Method**:
  ```typescript
  import { unstable_cache } from 'next/cache';
  const getData = unstable_cache(
    async () => fetchData(),
    ['cache-key'],
    { revalidate: 3600, tags: ['api-data'] }
  );
  ```

- **Use Case**: Fine-grained cache control with tags
- **Benefits**: Manual cache invalidation, tag-based purging

**5. In-Memory Cache (Custom)**

- **Tool**: Simple JavaScript Map/Object
- **Method**:
  ```typescript
  const cache = new Map();
  if (cache.has(key) && !isExpired(key)) {
    return cache.get(key);
  }
  ```

- **Use Case**: Application-level caching
- **Benefits**: Full control, fastest access

#### Implementation Strategy for /active-cache:

1. **Primary**: Use `fetch()` with `next: { revalidate }` for all API calls
2. **Secondary**: Add `export const revalidate = 60` to route config
3. **Optimization**: Wrap API functions with React `cache()` for deduplication
4. **Monitoring**: Add performance metrics to compare with `/inactive-cache`

#### Performance Tracking:

- Display load time for each API call
- Show total page load time
- Add cache status badges (HIT/MISS/STALE)
- Create side-by-side comparison table

## Key Features

**Phase 1:**

- Server-side data fetching using Next.js 14 App Router
- TypeScript for type safety
- Error boundaries for failed API calls
- Responsive grid layout
- Clean, modern UI with Tailwind CSS

**Phase 2:**

- Multiple caching layers (Next.js fetch cache, React cache)
- Incremental Static Regeneration (ISR)
- Performance metrics and comparison
- Cache status visualization
- Significant speed improvements on subsequent loads