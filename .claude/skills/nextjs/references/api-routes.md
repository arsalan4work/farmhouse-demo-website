# Route Handlers / API Routes (Next.js 16)

## Basics

Route Handlers use Web APIs (`Request`, `Response`).

```typescript
// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: 'Hello' });
}
```

## HTTP Methods

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

---

## Dynamic Routes (Async Params — v15+)

```typescript
// app/api/posts/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await db.findOne('posts', id);
  if (!post) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json(post);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.delete('posts', id);
  return Response.json({ success: true });
}
```

---

## Request Data

### Query Params

```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const limit = Number(searchParams.get('limit') || 10);
  return Response.json(await search(q, limit));
}
```

### Headers & Cookies

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization');
  const token = request.cookies.get('session')?.value;
  return NextResponse.json({ auth, token });
}
```

### Setting Cookies

```typescript
export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.set('session', 'token-value', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
```

---

## Validation with Zod

```typescript
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    const user = await db.insert('users', data);
    return Response.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ errors: error.errors }, { status: 400 });
    }
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

---

## CORS

```typescript
export async function GET() {
  return Response.json({ data: 'public' }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
```

---

## Caching Route Handlers

```typescript
// Cached GET (default for static — no dynamic input)
export async function GET() {
  return Response.json(await getStaticData());
}

// Force dynamic (use request, cookies, headers)
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  return Response.json(await getUserData());
}

// Custom cache headers
export async function GET() {
  return Response.json(await getData(), {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30' },
  });
}
```

> GET handlers without dynamic input (request, cookies, headers) are static by default. Adding any dynamic input opts into dynamic rendering.

---

## Important: route.ts vs page.tsx

A directory can have **either** `route.ts` **or** `page.tsx`, **not both**.

```
app/api/posts/route.ts   ← API endpoint
app/posts/page.tsx       ← Page component
// These are different directories, so this is fine
```

---

## Streaming Responses

```typescript
export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (const chunk of ['Hello', ' ', 'World']) {
        controller.enqueue(encoder.encode(chunk));
        await new Promise(r => setTimeout(r, 100));
      }
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
```

---

## Webhook Handler Pattern

```typescript
// app/api/webhooks/clerk/route.ts
export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('svix-signature');

  // Verify signature first
  if (!verifySignature(body, signature)) {
    return Response.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(body);
  switch (event.type) {
    case 'user.created': await handleUserCreated(event.data); break;
    case 'user.deleted': await handleUserDeleted(event.data); break;
  }

  return Response.json({ received: true });
}
```

---

## Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful GET/PUT/PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE, OPTIONS |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | No/invalid auth |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected error |
