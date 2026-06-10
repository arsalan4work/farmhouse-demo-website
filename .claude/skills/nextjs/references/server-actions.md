# Server Actions (Next.js 16 + React 19)

## Basics

Server Actions are `async` functions marked with `'use server'` that run on the server.

```tsx
// app/actions.ts — file-level directive (all exports are Server Actions)
'use server'

import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  if (!title || title.length < 3) return { error: 'Title too short' };
  await db.insert('posts', { title });
  revalidatePath('/posts');
  return { success: true };
}
```

```tsx
// Or function-level directive (inline in Server Components)
export default function Page() {
  async function handleSubmit(formData: FormData) {
    'use server'
    await db.insert('items', Object.fromEntries(formData));
  }
  return <form action={handleSubmit}><input name="name" /><button>Add</button></form>;
}
```

---

## useActionState (React 19)

**Replaces `useFormState` from react-dom.**

```tsx
'use client'
import { useActionState } from 'react';
import { createPost } from '@/app/actions';

export function PostForm() {
  const [state, action, pending] = useActionState(createPost, null);

  return (
    <form action={action}>
      <input name="title" required />
      <button disabled={pending}>{pending ? 'Saving...' : 'Save'}</button>
      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && <p className="text-green-500">Created!</p>}
    </form>
  );
}
```

> The action receives `(prevState, formData)` — first arg is previous return value.

```tsx
// Server Action compatible with useActionState
'use server'
export async function createPost(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  if (!title) return { error: 'Title required' };
  await db.insert('posts', { title });
  revalidatePath('/posts');
  return { success: true };
}
```

---

## useFormStatus

Track pending state in a **child** component of the form:

```tsx
'use client'
import { useFormStatus } from 'react-dom';

export function SubmitButton({ label = 'Submit' }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : label}
    </button>
  );
}

// Usage (must be child of <form>)
<form action={serverAction}>
  <input name="email" />
  <SubmitButton label="Sign Up" />
</form>
```

---

## Validation with Zod

```tsx
'use server'
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export async function createUser(prevState: any, formData: FormData) {
  const result = schema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }
  await db.insert('users', result.data);
  revalidatePath('/users');
  return { success: true };
}
```

---

## Non-Form Server Actions

Call from event handlers:

```tsx
'use client'
import { likePost } from '@/app/actions';

export function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={async () => {
      setLiked(true);
      await likePost(postId);
    }}>
      {liked ? 'Liked' : 'Like'}
    </button>
  );
}
```

---

## Optimistic Updates

```tsx
'use client'
import { useOptimistic } from 'react';
import { addTodo } from '@/app/actions';

export function TodoList({ todos }: { todos: Todo[] }) {
  const [optimistic, addOptimistic] = useOptimistic(
    todos,
    (state, text: string) => [...state, { id: crypto.randomUUID(), text, completed: false }]
  );

  async function handleSubmit(formData: FormData) {
    const text = formData.get('text') as string;
    addOptimistic(text);
    await addTodo(formData);
  }

  return (
    <div>
      <ul>{optimistic.map(t => <li key={t.id}>{t.text}</li>)}</ul>
      <form action={handleSubmit}>
        <input name="text" required /><button>Add</button>
      </form>
    </div>
  );
}
```

---

## Revalidation After Mutations

```tsx
'use server'
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updatePost(id: string, formData: FormData) {
  await db.update('posts', { id }, Object.fromEntries(formData));

  revalidatePath('/posts');       // Revalidate list page
  revalidatePath(`/posts/${id}`); // Revalidate detail page
  revalidateTag('posts');         // Revalidate by cache tag
  redirect(`/posts/${id}`);       // Redirect after mutation
}
```

---

## File Uploads

```tsx
'use server'

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) return { error: 'No file' };
  if (!file.type.startsWith('image/')) return { error: 'Images only' };
  if (file.size > 5 * 1024 * 1024) return { error: 'Max 5MB' };

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name}`;
  await fs.writeFile(`./public/uploads/${filename}`, buffer);
  return { success: true, url: `/uploads/${filename}` };
}
```

---

## Auth Check in Server Actions

```tsx
'use server'
import { auth } from '@clerk/nextjs/server';

export async function createPost(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  await db.insert('posts', {
    title: formData.get('title'),
    authorId: userId,
  });
  revalidatePath('/posts');
}
```

---

## Best Practices

| Do | Don't |
|----|-------|
| Validate all inputs server-side | Trust client-side validation alone |
| Return `{ success, error }` objects | Throw errors (unless using error boundary) |
| `revalidatePath`/`revalidateTag` after mutations | Forget to revalidate (stale UI) |
| Use `useActionState` for form state | Use `useFormState` (deprecated in React 19) |
| Keep actions in separate `actions.ts` files | Inline complex logic in components |
| Use Zod for schema validation | Parse FormData manually for complex forms |
| Use Server Actions for mutations | Use Server Actions for data fetching (use Server Components) |
