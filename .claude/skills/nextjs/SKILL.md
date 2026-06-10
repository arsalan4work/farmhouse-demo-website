---
name: nextjs
description: |
  Next.js 16 is a React framework for building full-stack web applications with App Router, Server Components, Server Actions, and built-in optimizations.
  This skill should be used when users need to create Next.js projects, configure routing and layouts, implement server/client components, handle data fetching and caching, build API endpoints, optimize images/fonts/scripts, or deploy to production.
---

# Next.js 16

## What This Skill Does

- Create and configure Next.js 16 App Router projects
- Implement Server Components, Client Components, and Server Actions
- Configure `clerkMiddleware` / custom middleware via `proxy.ts`
- Handle data fetching, caching (`use cache`), and revalidation
- Build Route Handlers (API endpoints)
- Optimize images, fonts, scripts, and bundles
- Deploy to Vercel, Docker, or self-hosted environments

## What This Skill Does NOT Do

- Pages Router patterns (legacy — use App Router)
- React Native / mobile development
- Non-Next.js React setups (Vite, CRA)

---

## Before Implementation

| Source | Gather |
|--------|--------|
| **Codebase** | Existing routes, layouts, components, middleware, API client |
| **Conversation** | User's requirements, constraints, preferences |
| **Skill References** | Patterns from `references/` files listed below |
| **User Guidelines** | Project conventions, team standards |

---

## Critical v16 Changes (from v14/v15)

| Change | Before | After (v15+/v16) |
|--------|--------|-------------------|
| Middleware file | `middleware.ts` | `proxy.ts` (Next.js 16) |
| `params` | `{ params: { id: string } }` | `{ params: Promise<{ id: string }> }` — must `await` |
| `searchParams` | `{ searchParams: { q: string } }` | `{ searchParams: Promise<{ q?: string }> }` — must `await` |
| `cookies()` | `const c = cookies()` | `const c = await cookies()` |
| `headers()` | `const h = headers()` | `const h = await headers()` |
| `useFormState` | `useFormState` | `useActionState` (React 19) |
| Cache directive | `unstable_cache()` | `'use cache'` directive |
| Error files | `error.tsx`, `not-found.tsx` | + `forbidden.tsx` (403), `unauthorized.tsx` (401) |

---

## 1. Project Structure

```
app/
├── layout.tsx              # Root layout (required)
├── page.tsx                # Home page
├── globals.css             # Global styles
├── loading.tsx             # Global loading
├── error.tsx               # Global error boundary
├── not-found.tsx           # 404 page
├── forbidden.tsx           # 403 page (v16)
├── unauthorized.tsx        # 401 page (v16)
├── (routes)/               # Route groups
│   └── dashboard/
│       ├── layout.tsx
│       └── page.tsx
├── api/                    # Route Handlers
│   └── route.ts
proxy.ts                    # Middleware (v16)
next.config.ts              # Configuration
```

### File Conventions

| File | Purpose |
|------|---------|
| `page.tsx` | Route segment — makes URL accessible |
| `layout.tsx` | Shared UI, persists across navigation |
| `template.tsx` | Like layout, but re-renders each navigation |
| `loading.tsx` | Suspense fallback for route segment |
| `error.tsx` | Error boundary (must be `'use client'`) |
| `not-found.tsx` | 404 UI (trigger with `notFound()`) |
| `forbidden.tsx` | 403 UI (trigger with `forbidden()`) — v16 |
| `unauthorized.tsx` | 401 UI (trigger with `unauthorized()`) — v16 |
| `route.ts` | API endpoint (Route Handler) |
| `default.tsx` | Parallel route fallback |

---

## 2. Server vs Client Components

**Default = Server Component.** Add `'use client'` only when needed.

| Need | Component |
|------|-----------|
| Database/API access, env secrets | Server |
| Static content, SEO | Server |
| `onClick`, `onChange`, forms | Client |
| `useState`, `useEffect`, hooks | Client |
| `window`, `localStorage`, browser APIs | Client |

```tsx
// Server Component (default) — async, direct data access
export default async function Page() {
  const data = await db.query("SELECT * FROM posts");
  return <div>{data.map(p => <p key={p.id}>{p.title}</p>)}</div>;
}
```

```tsx
// Client Component — interactivity required
'use client'
import { useState } from 'react';
export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

See `references/server-components.md` for composition patterns and RSC boundary rules.

---

## 3. Routing & Navigation

### Dynamic Routes (async params in v15+)

```tsx
// app/posts/[slug]/page.tsx
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <article><h1>{post.title}</h1></article>;
}
```

### Search Params (async in v15+)

```tsx
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams;
  const results = q ? await search(q) : [];
  return <div>{results.length} results</div>;
}
```

See `references/app-router.md` for route groups, parallel/intercepting routes, metadata.

---

## 4. Middleware (`proxy.ts` in v16)

```typescript
// proxy.ts (project root)
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

---

## 5. Data Fetching & Caching

### `use cache` Directive (v16)

```tsx
'use cache'
import { cacheLife, cacheTag } from 'next/cache';

export default async function ProductsPage() {
  cacheLife('hours');
  cacheTag('products');
  const products = await getProducts();
  return <div>{/* render */}</div>;
}
```

### Revalidation

```tsx
'use server'
import { revalidatePath, revalidateTag } from 'next/cache';

export async function createProduct(formData: FormData) {
  await db.insert('products', Object.fromEntries(formData));
  revalidateTag('products');   // Tag-based
  revalidatePath('/products'); // Path-based
}
```

### Avoid Waterfalls

```tsx
// Use Promise.all for parallel fetching
const [user, posts] = await Promise.all([getUser(id), getPosts(id)]);

// Or use Suspense boundaries for progressive rendering
<Suspense fallback={<Skeleton />}>
  <SlowComponent />
</Suspense>
```

See `references/data-fetching.md` for caching strategies, ISR, streaming.

---

## 6. Server Actions

```tsx
// app/actions.ts
'use server'
import { revalidatePath } from 'next/cache';

export async function createPost(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  if (!title) return { error: 'Title required' };
  await db.insert('posts', { title });
  revalidatePath('/posts');
  return { success: true };
}
```

```tsx
// Client component using useActionState (React 19)
'use client'
import { useActionState } from 'react';
import { createPost } from './actions';

export function PostForm() {
  const [state, action, pending] = useActionState(createPost, null);
  return (
    <form action={action}>
      <input name="title" required />
      <button disabled={pending}>{pending ? 'Creating...' : 'Create'}</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

See `references/server-actions.md` for validation, file uploads, optimistic updates.

---

## 7. Route Handlers

```typescript
// app/api/posts/route.ts
export async function GET() {
  const posts = await db.query('SELECT * FROM posts');
  return Response.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const post = await db.insert('posts', body);
  return Response.json(post, { status: 201 });
}
```

```typescript
// Dynamic: app/api/posts/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await db.findOne('posts', id);
  if (!post) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json(post);
}
```

See `references/api-routes.md` for CRUD, auth, webhooks, file uploads.

---

## 8. Optimizations

### Images

```tsx
import Image from 'next/image';
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} priority />
```

### Fonts

```tsx
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// Use: <html className={inter.variable}>
```

### Scripts

```tsx
import Script from 'next/script';
<Script src="https://analytics.example.com/script.js" strategy="afterInteractive" />
```

---

## 9. Directives

| Directive | Scope | Purpose |
|-----------|-------|---------|
| `'use client'` | React | Marks client component boundary |
| `'use server'` | React | Marks server action |
| `'use cache'` | Next.js | Caches function/component output (v16) |

---

## 10. Common Anti-Patterns

| Anti-Pattern | Fix |
|-------------|-----|
| Entire page as `'use client'` | Extract only interactive parts to client components |
| `useEffect` for data fetching | Use Server Components with `await` |
| Sequential data fetching | Use `Promise.all` or Suspense boundaries |
| Sync `params`/`searchParams` access | `await params` / `await searchParams` (v15+) |
| Sync `cookies()`/`headers()` | `await cookies()` / `await headers()` (v15+) |
| `useFormState` | Use `useActionState` (React 19) |
| `middleware.ts` in Next.js 16 | Rename to `proxy.ts` |
| Caching user-specific data | Use `cache: 'no-store'` or `'use cache: private'` |

---

## Reference Files

| File | When to Read |
|------|--------------|
| `references/app-router.md` | Routing, layouts, dynamic routes, parallel/intercepting routes, metadata |
| `references/server-components.md` | Server vs Client, RSC boundaries, composition, Context/Providers |
| `references/server-actions.md` | Forms, mutations, validation, optimistic updates, file uploads |
| `references/data-fetching.md` | Caching, revalidation, streaming, `use cache`, ISR |
| `references/api-routes.md` | Route Handlers, CRUD, auth, webhooks |
| `references/deployment.md` | Vercel, Docker, self-hosting, env vars, CI/CD |
| `references/best-practices.md` | Hydration errors, bundling, Suspense, debugging |
