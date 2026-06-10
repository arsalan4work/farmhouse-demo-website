# Data Fetching & Caching (Next.js 16)

## Server Component Data Fetching

```tsx
// Direct data access in Server Components — no API needed
export default async function PostsPage() {
  const posts = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
  return <div>{posts.map(p => <h2 key={p.id}>{p.title}</h2>)}</div>;
}
```

---

## `use cache` Directive (v16)

Replaces `unstable_cache()`. Caches the output of a function or component.

```tsx
'use cache'
import { cacheLife, cacheTag } from 'next/cache';

export default async function ProductsPage() {
  cacheLife('hours');       // Cache for hours
  cacheTag('products');     // Tag for targeted revalidation
  const products = await getProducts();
  return <div>{/* render */}</div>;
}
```

### Cache Variants

| Directive | Behavior |
|-----------|----------|
| `'use cache'` | Default caching (shared) |
| `'use cache: private'` | User-specific, not shared across users |
| `'use cache: remote'` | Server-only cache, not in browser |

### cacheLife Presets

```tsx
cacheLife('seconds');  // Short-lived
cacheLife('minutes');
cacheLife('hours');
cacheLife('days');
cacheLife('weeks');
cacheLife('max');      // Long-lived
```

### Custom cacheLife

```tsx
cacheLife({ stale: 300, revalidate: 60, expire: 3600 });
```

---

## fetch() Caching Options

```tsx
// Cached indefinitely (default in static routes)
const res = await fetch('https://api.example.com/data');

// No caching (always fresh)
const res = await fetch('https://api.example.com/data', {
  cache: 'no-store',
});

// Time-based revalidation (ISR)
const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }, // Revalidate every 60 seconds
});

// Tag-based revalidation
const res = await fetch('https://api.example.com/data', {
  next: { tags: ['posts'] },
});
```

---

## Route Segment Config

```tsx
// Force dynamic rendering for entire route
export const dynamic = 'force-dynamic';

// Set revalidation for entire route
export const revalidate = 60; // seconds

// Force static generation
export const dynamic = 'force-static';
```

---

## Revalidation

### On-Demand (from Server Actions)

```tsx
'use server'
import { revalidatePath, revalidateTag } from 'next/cache';

export async function updatePost(id: string) {
  await db.update('posts', id, { /* ... */ });
  revalidatePath('/posts');          // Specific path
  revalidatePath('/posts', 'layout'); // Path + layout
  revalidateTag('posts');            // All tagged fetches
}
```

### Webhook Revalidation

```tsx
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Invalid' }, { status: 401 });
  }
  const { tag } = await request.json();
  revalidateTag(tag);
  return Response.json({ revalidated: true });
}
```

---

## Parallel Data Fetching

```tsx
// BAD: Sequential (waterfall)
const user = await getUser(id);
const posts = await getPosts(id);    // Waits for user
const comments = await getComments(id); // Waits for posts

// GOOD: Parallel
const [user, posts, comments] = await Promise.all([
  getUser(id),
  getPosts(id),
  getComments(id),
]);
```

### With Error Handling

```tsx
const [userResult, postsResult] = await Promise.allSettled([
  getUser(id),
  getPosts(id),
]);

const user = userResult.status === 'fulfilled' ? userResult.value : null;
const posts = postsResult.status === 'fulfilled' ? postsResult.value : [];
```

---

## Streaming with Suspense

```tsx
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Fast component renders immediately */}
      <Suspense fallback={<Skeleton />}>
        <Stats />
      </Suspense>
      {/* Slow component streams in when ready */}
      <Suspense fallback={<Skeleton />}>
        <Activity />
      </Suspense>
    </div>
  );
}
```

### Preload Pattern (Avoid Waterfalls)

```tsx
// lib/data.ts
import { cache } from 'react';

export const getUser = cache(async (id: string) => {
  return db.query('SELECT * FROM users WHERE id = $1', [id]);
});

// Preload in layout (doesn't block rendering)
export function preloadUser(id: string) {
  void getUser(id);
}

// app/user/[id]/layout.tsx
import { preloadUser } from '@/lib/data';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  const { id } = await params;
  preloadUser(id); // Start fetching early
  return <div>{children}</div>;
}
```

---

## Request Deduplication

React's `cache()` deduplicates within a single render:

```tsx
import { cache } from 'react';

export const getPost = cache(async (id: string) => {
  return db.query('SELECT * FROM posts WHERE id = $1', [id]);
});

// Multiple components calling getPost(same-id) → only ONE query
```

---

## Static Generation (generateStaticParams)

```tsx
// Pre-render dynamic routes at build time
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

// ISR: fallback for non-pre-rendered pages
export const dynamicParams = true; // Allow on-demand generation (default)
// export const dynamicParams = false; // Return 404 for non-pre-rendered
```

---

## Client-Side Data Fetching

For data that changes based on user interaction (search, filters):

```tsx
'use client'
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';

export function useApiData(endpoint: string) {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const token = await getToken();
      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    },
  });
}
```

---

## Best Practices

| Do | Don't |
|----|-------|
| Fetch in Server Components | Fetch in `useEffect` for initial data |
| Use `Promise.all` for parallel fetches | Sequential `await` chains |
| Use Suspense for progressive loading | Block entire page on slow queries |
| Use `use cache` for expensive operations | Cache user-specific data with shared cache |
| Use `revalidateTag` for targeted revalidation | Over-revalidate entire paths |
| Use `cache: 'no-store'` for real-time data | Cache data that must always be fresh |
