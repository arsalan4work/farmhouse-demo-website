# Next.js Best Practices (from Vercel Labs)

## Hydration Errors

### Common Causes

| Cause | Example | Fix |
|-------|---------|-----|
| Browser-only APIs in render | `typeof window !== 'undefined'` conditional | Use `useEffect` or `suppressHydrationWarning` |
| Date/time rendering | `new Date().toLocaleString()` differs server/client | Format server-side or use `suppressHydrationWarning` |
| Invalid HTML nesting | `<p><div>...</div></p>` | Fix nesting (`<div>` cannot be inside `<p>`) |
| Browser extensions | Extensions inject DOM nodes | Detect and ignore |
| Third-party scripts | Scripts modify DOM before hydration | Use `next/script` with `afterInteractive` |

### Debugging

```tsx
// next.config.ts — enable React strict mode for better error messages
const nextConfig = { reactStrictMode: true };
```

> Hydration errors show as `Warning: Text content did not match` or `Hydration failed because the server rendered HTML didn't match the client`.

---

## Suspense Boundaries

### CSR Bailout Prevention

`useSearchParams()` and `usePathname()` in a component without a Suspense boundary cause the entire page to CSR bailout.

```tsx
// BAD: No Suspense wrapper
export default function Page() {
  return <SearchInput />;  // Uses useSearchParams() → entire page CSR
}

// GOOD: Wrap in Suspense
export default function Page() {
  return (
    <Suspense fallback={null}>
      <SearchInput />  // CSR contained to this boundary
    </Suspense>
  );
}
```

---

## Data Fetching Patterns

### When to Use What

| Pattern | Use For |
|---------|---------|
| **Server Components** | Initial data load, DB queries, secrets |
| **Server Actions** | Mutations (create, update, delete) |
| **Route Handlers** | Third-party webhooks, external APIs, non-React clients |

### Avoid Waterfalls

```tsx
// BAD: Sequential fetches
async function Page() {
  const user = await getUser();      // 200ms
  const posts = await getPosts();    // 300ms → Total: 500ms
}

// GOOD: Parallel
async function Page() {
  const [user, posts] = await Promise.all([getUser(), getPosts()]); // 300ms
}

// BEST: Suspense for progressive rendering
function Page() {
  return (
    <>
      <Suspense fallback={<Skeleton />}><UserCard /></Suspense>
      <Suspense fallback={<Skeleton />}><PostList /></Suspense>
    </>
  );
}
```

---

## Bundling Issues

### Server-Incompatible Packages

Some npm packages use browser APIs (`window`, `document`) at import time.

```typescript
// next.config.ts — exclude from server bundle
const nextConfig = {
  serverExternalPackages: ['pdf-lib', 'canvas'],
};
```

### CSS Imports

```tsx
// GOOD: Import CSS in layout.tsx or page.tsx
import './globals.css';

// BAD: Dynamic CSS imports in components
import(`./theme-${name}.css`); // Won't work reliably
```

### ESM/CJS Compatibility

```typescript
// If a package only provides CJS and causes issues:
const nextConfig = {
  transpilePackages: ['legacy-cjs-package'],
};
```

---

## Middleware Best Practices (proxy.ts)

```typescript
// proxy.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',  // Webhooks must be public
  '/api/health',
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});
```

> Don't do heavy work in middleware — it runs on EVERY matched request. Keep it fast.

---

## Runtime Selection

| Runtime | Default | When to Use |
|---------|---------|-------------|
| **Node.js** | Yes | Most routes — full Node.js APIs, DB access |
| **Edge** | No | Auth checks, geolocation, A/B testing (low latency, limited APIs) |

```tsx
// Force edge runtime for specific route
export const runtime = 'edge';
```

> Prefer Node.js runtime unless you specifically need Edge's latency characteristics. Edge has limited Node.js API support.

---

## `after()` Function

Run code after the response is sent (Next.js 15+):

```tsx
import { after } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  const result = await processData(data);

  after(async () => {
    // Runs AFTER response is sent — doesn't block the user
    await logAnalytics(data);
    await sendNotification(result);
  });

  return Response.json(result);
}
```

---

## Instrumentation

```tsx
// instrumentation.ts (project root)
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Initialize server-side observability (OpenTelemetry, Sentry, etc.)
    await import('./sentry.server.config');
  }
}

// instrumentation-client.ts (client-side)
export function onRequestError({ error, request }) {
  // Report client errors
}
```

---

## Debug Tricks

### Build Path Debugging

```bash
# See which routes are rebuilt during development
next dev --debug-build-paths
```

### MCP Endpoint

Next.js Dev Server exposes an MCP endpoint for AI-assisted debugging at `http://localhost:3000/__nextjs_mcp`.

---

## Performance Checklist

| Area | Check |
|------|-------|
| **Images** | Use `next/image`, set `priority` on LCP image, provide `sizes` |
| **Fonts** | Use `next/font`, set `display: 'swap'` |
| **Scripts** | Use `next/script` with `afterInteractive` or `lazyOnload` |
| **Data** | Fetch in Server Components, parallel with `Promise.all` |
| **Caching** | Use `use cache` for expensive operations, `revalidateTag` for targeted invalidation |
| **Bundle** | Analyze with `@next/bundle-analyzer`, dynamic import heavy components |
| **Components** | Server Components by default, minimize `'use client'` surface |
| **Rendering** | Use Suspense for streaming, avoid full-page loading states |

---

## Security Checklist

| Area | Check |
|------|-------|
| Env vars | No secrets in `NEXT_PUBLIC_*`, `.env` in `.gitignore` |
| Auth | Verify in middleware AND at data access layer |
| Server Actions | Validate all inputs, check auth |
| Route Handlers | Validate inputs, check auth, return safe error messages |
| Headers | Set `X-Frame-Options`, `Content-Security-Policy` via `next.config.ts` |
| Dependencies | Regular `npm audit`, update vulnerable packages |
