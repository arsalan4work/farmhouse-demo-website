# App Router (Next.js 16)

## File-System Routing

```
app/
├── page.tsx                → /
├── about/page.tsx          → /about
├── blog/
│   ├── page.tsx            → /blog
│   └── [slug]/page.tsx     → /blog/:slug
├── docs/[...slug]/page.tsx → /docs/a/b/c
└── shop/[[...slug]]/page.tsx → /shop or /shop/a/b
```

---

## Dynamic Routes (Async Params — v15+)

```tsx
// app/posts/[slug]/page.tsx
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return <article><h1>{post.title}</h1></article>;
}

// Multiple dynamic segments
// app/shop/[category]/[product]/page.tsx
export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>
}) {
  const { category, product } = await params;
  // ...
}
```

## Search Params (Async — v15+)

```tsx
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const { q, page } = await searchParams;
  const results = q ? await search(q, Number(page || 1)) : [];
  return <div>{results.length} results for "{q}"</div>;
}
```

### Client-Side Search Params

```tsx
'use client'
import { useSearchParams } from 'next/navigation';

export function SearchInput() {
  const searchParams = useSearchParams(); // Must wrap in Suspense
  const query = searchParams.get('q');
  return <input defaultValue={query || ''} />;
}

// Wrap in Suspense to avoid CSR bailout
<Suspense fallback={null}>
  <SearchInput />
</Suspense>
```

---

## Layouts

```tsx
// app/layout.tsx — Root Layout (required)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/dashboard/layout.tsx — Nested Layout (persists across child navigation)
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

---

## Route Groups

Organize without affecting URL:

```
app/
├── (marketing)/
│   ├── layout.tsx         # Marketing-specific layout
│   ├── about/page.tsx     → /about
│   └── contact/page.tsx   → /contact
├── (app)/
│   ├── layout.tsx         # App-specific layout
│   └── dashboard/page.tsx → /dashboard
```

---

## Parallel Routes

Render multiple pages simultaneously in the same layout:

```
app/
├── layout.tsx
├── @analytics/page.tsx
├── @feed/page.tsx
├── @feed/default.tsx      # Required fallback
└── page.tsx
```

```tsx
// app/layout.tsx
export default function Layout({
  children,
  analytics,
  feed,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  feed: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div className="grid grid-cols-2">{analytics}{feed}</div>
    </div>
  );
}
```

> Every `@slot` needs a `default.tsx` to avoid 404 on soft navigation.

---

## Intercepting Routes (Modals)

```
app/
├── photos/
│   ├── page.tsx                 # /photos (list)
│   └── [id]/page.tsx            # /photos/123 (full page)
└── @modal/
    └── (.)photos/[id]/page.tsx  # Intercepts /photos/123 as modal
```

| Pattern | Level |
|---------|-------|
| `(.)` | Same level |
| `(..)` | One level up |
| `(..)(..)` | Two levels up |
| `(...)` | From root |

### Modal Close Pattern

```tsx
'use client'
import { useRouter } from 'next/navigation';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div onClick={() => router.back()}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
```

---

## Navigation

```tsx
// Link component (preferred for most navigation)
import Link from 'next/link';
<Link href="/about">About</Link>
<Link href="/posts/123" prefetch={false}>Post</Link> // Disable prefetch

// Programmatic navigation (client components only)
'use client'
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/dashboard');
router.replace('/login');
router.back();
router.refresh(); // Re-fetch server data
```

### Active Link Detection

```tsx
'use client'
import { usePathname } from 'next/navigation';
const pathname = usePathname();
const isActive = pathname === '/about' || pathname.startsWith('/about/');
```

---

## Loading & Error States

```tsx
// app/dashboard/loading.tsx — Auto Suspense wrapper
export default function Loading() {
  return <div className="animate-pulse h-32 bg-gray-200 rounded" />;
}

// app/dashboard/error.tsx — Must be 'use client'
'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <div><p>{error.message}</p><button onClick={reset}>Retry</button></div>;
}

// app/not-found.tsx — 404
export default function NotFound() { return <h1>404 - Not Found</h1>; }

// app/forbidden.tsx — 403 (v16)
export default function Forbidden() { return <h1>403 - Forbidden</h1>; }

// app/unauthorized.tsx — 401 (v16)
export default function Unauthorized() { return <h1>401 - Unauthorized</h1>; }
```

Trigger programmatically:

```tsx
import { notFound, forbidden, unauthorized } from 'next/navigation';

if (!post) notFound();
if (!isAdmin) forbidden();
if (!isAuthenticated) unauthorized();
```

---

## Metadata

### Static

```tsx
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'About',
  description: 'About page',
  openGraph: { title: 'About', images: ['/og.jpg'] },
};
```

### Dynamic

```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return { title: post.title, description: post.excerpt };
}
```

### Title Template

```tsx
// app/layout.tsx
export const metadata = {
  title: { template: '%s | MyApp', default: 'MyApp' },
};
// app/about/page.tsx
export const metadata = { title: 'About' }; // → "About | MyApp"
```

---

## Static Generation

```tsx
// Pre-render dynamic routes at build time
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

---

## Redirects

```tsx
import { redirect, permanentRedirect } from 'next/navigation';

// In Server Components, Server Actions, Route Handlers
redirect('/login');          // 307 temporary
permanentRedirect('/new');   // 308 permanent
```

```typescript
// next.config.ts — static redirects
const nextConfig = {
  async redirects() {
    return [{ source: '/old/:path*', destination: '/new/:path*', permanent: true }];
  },
};
```
