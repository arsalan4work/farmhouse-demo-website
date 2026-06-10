# Deployment (Next.js 16)

## Pre-Deployment Checklist

```bash
npm run build     # Verify production build
npm run start     # Test locally
npm run lint      # Check for issues
```

---

## Vercel (Recommended)

```bash
# CLI
npm i -g vercel && vercel login
vercel           # Preview
vercel --prod    # Production

# Or connect GitHub repo at vercel.com → auto-deploys on push
```

### Environment Variables

Set in Vercel Dashboard > Project Settings > Environment Variables.

```bash
vercel env add DATABASE_URL production
vercel env add CLERK_SECRET_KEY production
```

---

## Self-Hosting with Docker

### 1. Enable Standalone Output

```typescript
// next.config.ts
const nextConfig = { output: 'standalone' };
export default nextConfig;
```

### 2. Dockerfile

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
RUN mkdir .next && chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000 HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

### 3. Docker Compose

```yaml
services:
  app:
    build: .
    ports: ["3000:3000"]
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    restart: unless-stopped
```

---

## Self-Hosting: Multi-Instance ISR

When running multiple instances behind a load balancer, ISR cache isn't shared by default.

```typescript
// next.config.ts — Custom cache handler for shared storage
const nextConfig = {
  cacheHandler: './cache-handler.mjs',
  cacheMaxMemorySize: 0, // Disable in-memory cache
};
```

```javascript
// cache-handler.mjs — Redis example
export default class CacheHandler {
  async get(key) { return redis.get(key); }
  async set(key, data, ctx) { await redis.set(key, data, ctx.revalidate); }
  async revalidateTag(tags) { /* invalidate by tag */ }
}
```

---

## Environment Variables

| Prefix | Accessible | Location |
|--------|-----------|----------|
| `NEXT_PUBLIC_*` | Client + Server | Browser + Server |
| No prefix | Server only | Server only |

```bash
# .env.local (never commit)
NEXT_PUBLIC_API_URL=http://localhost:8000
DATABASE_URL=postgresql://localhost/mydb
CLERK_SECRET_KEY=sk_test_...
```

---

## Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.example.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Redirects
  async redirects() {
    return [{ source: '/old', destination: '/new', permanent: true }];
  },

  // Headers
  async headers() {
    return [{
      source: '/(.*)',
      headers: [{ key: 'X-Frame-Options', value: 'DENY' }],
    }];
  },

  // Standalone for Docker
  // output: 'standalone',

  // Static export (no server)
  // output: 'export',

  // Server Actions config
  experimental: {
    serverActions: { bodySizeLimit: '2mb' },
  },
};

export default nextConfig;
```

---

## Performance Optimization

### Image Optimization

```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority          // LCP image — load immediately
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Font Optimization

```tsx
import { Inter, Geist_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });

// In root layout:
<html className={`${inter.variable} ${mono.variable}`}>
```

### Bundle Analysis

```bash
npm install @next/bundle-analyzer
ANALYZE=true npm run build
```

### Script Optimization

```tsx
import Script from 'next/script';
// Load after page is interactive
<Script src="https://analytics.js" strategy="afterInteractive" />
// Load during idle time
<Script src="https://widget.js" strategy="lazyOnload" />
```

---

## Monitoring

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
// Add <Analytics /> in body
```

### Health Check

```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    await db.query('SELECT 1');
    return Response.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch {
    return Response.json({ status: 'error' }, { status: 503 });
  }
}
```

---

## CI/CD (GitHub Actions)

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```
