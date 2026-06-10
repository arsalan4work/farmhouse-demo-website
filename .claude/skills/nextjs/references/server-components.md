# Server & Client Components (Next.js 16)

## Decision Rule

**Start with Server Components (default). Add `'use client'` only when needed.**

| Feature | Server Component | Client Component |
|---------|-----------------|------------------|
| Default | Yes | No (`'use client'`) |
| Hooks (`useState`, `useEffect`) | No | Yes |
| Event handlers (`onClick`) | No | Yes |
| Browser APIs (`window`, `localStorage`) | No | Yes |
| DB/filesystem/env secrets | Yes | No |
| `async/await` in component body | Yes | No |
| Bundle size impact | Zero | Adds to bundle |

---

## Server Component Patterns

```tsx
// Default — no directive needed
import { cookies, headers } from 'next/headers';

export default async function Dashboard() {
  // Direct data access
  const data = await db.query('SELECT * FROM stats');

  // Async cookies/headers (v15+)
  const cookieStore = await cookies();
  const token = cookieStore.get('auth');

  const headersList = await headers();
  const ua = headersList.get('user-agent');

  return <div>{data.count} items</div>;
}
```

### Protect Server-Only Code

```tsx
// lib/db.ts
import 'server-only'; // Errors if imported in a client component

export async function getSecrets() {
  return process.env.SECRET_KEY;
}
```

---

## Client Component Patterns

```tsx
'use client'

import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark';
    if (saved) setTheme(saved);
  }, []);

  return (
    <button onClick={() => {
      const next = theme === 'light' ? 'dark' : 'light';
      setTheme(next);
      localStorage.setItem('theme', next);
    }}>
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}
```

---

## Composition Patterns

### Pattern 1: Server parent + Client children

```tsx
// app/page.tsx (Server)
import { LikeButton } from '@/components/LikeButton'; // Client

export default async function Page() {
  const posts = await getPosts(); // Server-side data
  return (
    <div>
      {posts.map(p => (
        <div key={p.id}>
          <h2>{p.title}</h2>
          <LikeButton postId={p.id} /> {/* Client for interactivity */}
        </div>
      ))}
    </div>
  );
}
```

### Pattern 2: Pass Server Component as children to Client

```tsx
// components/Sidebar.tsx (Client)
'use client'
export function Sidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return open ? <aside>{children}</aside> : null;
}

// app/page.tsx (Server)
import { Sidebar } from '@/components/Sidebar';

export default async function Page() {
  const nav = await getNavItems(); // Server data
  return (
    <Sidebar>
      {nav.map(n => <a key={n.href} href={n.href}>{n.label}</a>)}
    </Sidebar>
  );
}
```

### Pattern 3: Split interactive parts out

```tsx
// BAD: Entire page is client
'use client'
export default function ProductPage() {
  const [qty, setQty] = useState(1);
  return <div><h1>Product</h1><p>Description...</p><input value={qty} onChange={...} /></div>;
}

// GOOD: Only the interactive part is client
// components/QuantityInput.tsx
'use client'
export function QuantityInput() {
  const [qty, setQty] = useState(1);
  return <input type="number" value={qty} onChange={e => setQty(Number(e.target.value))} />;
}

// app/products/[id]/page.tsx (Server)
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  return <div><h1>{product.name}</h1><p>{product.desc}</p><QuantityInput /></div>;
}
```

---

## RSC Boundary Rules

### Invalid Patterns (Common Errors)

**1. Async Client Component**

```tsx
// ERROR: Client components cannot be async
'use client'
export default async function BadComponent() { // ← Error
  const data = await fetch('/api/data');
}

// FIX: Use useEffect or pass data from Server parent
'use client'
export default function GoodComponent({ data }: { data: Data }) {
  return <div>{data.name}</div>;
}
```

**2. Non-Serializable Props**

```tsx
// ERROR: Functions, Classes, Dates cannot cross server → client boundary
<ClientComponent onSubmit={serverFn} />     // ← Error
<ClientComponent data={new Map()} />        // ← Error
<ClientComponent date={new Date()} />       // ← Error

// FIX: Pass serializable data (strings, numbers, plain objects, arrays)
<ClientComponent date={date.toISOString()} />
```

**3. Server Action in wrong context**

```tsx
// ERROR: Server Actions must use 'use server'
<ClientComponent onSubmit={async (data) => { await db.insert(data); }} />

// FIX: Define as Server Action
'use server'
export async function submit(data: FormData) { await db.insert(data); }

// Then pass the action
<ClientComponent action={submit} />
```

---

## Context & Providers

```tsx
// providers/QueryProvider.tsx (Client — wraps children)
'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

// app/layout.tsx (Server — uses Provider as wrapper)
import { QueryProvider } from '@/providers/QueryProvider';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html><body><QueryProvider>{children}</QueryProvider></body></html>
  );
}
```

---

## Streaming with Suspense

```tsx
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading stats...</div>}>
        <Stats />  {/* Streams in when ready */}
      </Suspense>
      <Suspense fallback={<div>Loading activity...</div>}>
        <Activity />
      </Suspense>
    </div>
  );
}

async function Stats() {
  const stats = await getStats(); // Slow query
  return <div>{stats.total} total</div>;
}
```

---

## Third-Party Client Libraries

```tsx
// Libraries that use hooks/browser APIs need 'use client'
'use client'
import { LineChart, Line, XAxis, YAxis } from 'recharts';

export function Chart({ data }: { data: any[] }) {
  return (
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey="name" /><YAxis />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
}
```

---

## Dynamic Imports (Code Splitting)

```tsx
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/Chart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // Skip server rendering for browser-only components
});
```
