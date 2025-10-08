# Supabase CRUD Operations Guide

This document provides comprehensive information about the blog CRUD operations using Supabase.

## Table of Contents
- [Setup](#setup)
- [Database Schema](#database-schema)
- [CRUD Functions](#crud-functions)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)

## Setup

### 1. Environment Variables
Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

> **Important**: The application will throw a clear error message if these environment variables are not set, directing you to configure them properly. Make sure to replace the placeholder values with your actual Supabase credentials from your project settings.

### 2. Database Table Schema
Execute this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE blogs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  readTime TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add an updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 3. Row Level Security (Optional but Recommended)
If you want to enable RLS for better security:

```sql
-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON blogs
  FOR SELECT USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON blogs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update their own posts
CREATE POLICY "Allow authenticated update" ON blogs
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON blogs
  FOR DELETE USING (auth.role() = 'authenticated');
```

## Database Schema

### BlogPost Interface
```typescript
interface BlogPost {
  id: string;              // URL-friendly slug (auto-generated from title)
  title: string;           // Post title
  content: string;         // Full post content (supports Markdown)
  excerpt: string;         // Short description
  date: string;            // Publication date (YYYY-MM-DD)
  category: string;        // Post category
  readTime: string;        // Estimated reading time
  author: string;          // Author name
  created_at?: string;     // Auto-generated creation timestamp
  updated_at?: string;     // Auto-updated timestamp
}
```

### Input Types
```typescript
interface CreateBlogPostInput {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  readTime?: string;       // Optional: Auto-calculated if not provided
}

interface UpdateBlogPostInput {
  title?: string;
  content?: string;
  excerpt?: string;
  category?: string;
  author?: string;
  readTime?: string;       // Optional: Auto-calculated if content changes
}
```

## CRUD Functions

### Client-Side Functions
Located in `src/utils/supabase/blogCrud.ts`

#### Create
```typescript
createBlogPost(input: CreateBlogPostInput): Promise<{ data: BlogPost | null; error: Error | null }>
```
- Automatically generates a URL-friendly slug from the title
- Calculates reading time if not provided
- Sets the current date automatically

#### Read All
```typescript
getAllBlogPosts(): Promise<{ data: BlogPost[] | null; error: Error | null }>
```
- Returns all blog posts
- Sorted by date (newest first)

#### Read One
```typescript
getBlogPostById(id: string): Promise<{ data: BlogPost | null; error: Error | null }>
```
- Retrieves a single blog post by its ID

#### Update
```typescript
updateBlogPost(id: string, input: UpdateBlogPostInput): Promise<{ data: BlogPost | null; error: Error | null }>
```
- Updates specified fields only
- Automatically recalculates reading time if content changes
- Auto-updates the `updated_at` timestamp

#### Delete
```typescript
deleteBlogPost(id: string): Promise<{ error: Error | null }>
```
- Permanently deletes a blog post

### Server-Side Functions
All client-side functions have server-side equivalents with the `Server` suffix:
- `createBlogPostServer()`
- `getAllBlogPostsServer()`
- `getBlogPostByIdServer()`
- `updateBlogPostServer()`
- `deleteBlogPostServer()`

Use server-side functions in:
- Server Components
- API Routes
- Server Actions

## Usage Examples

### Creating a Blog Post (Client Component)
```typescript
'use client';

import { createBlogPost } from '@/utils/supabase/blogCrud';

async function handleSubmit() {
  const { data, error } = await createBlogPost({
    title: "Getting Started with Next.js",
    content: "# Introduction\n\nNext.js is a powerful React framework...",
    excerpt: "Learn the basics of Next.js in this comprehensive guide",
    category: "Tutorial",
    author: "John Doe"
  });

  if (error) {
    console.error('Error creating post:', error);
    alert('Failed to create post');
  } else {
    console.log('Created post:', data);
    alert('Post created successfully!');
  }
}
```

### Reading All Posts (Client Component)
```typescript
'use client';

import { useEffect, useState } from 'react';
import { getAllBlogPosts, BlogPost } from '@/utils/supabase/blogCrud';

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await getAllBlogPosts();
      
      if (error) {
        console.error('Error fetching posts:', error);
      } else if (data) {
        setPosts(data);
      }
      
      setLoading(false);
    }
    
    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
```

### Reading a Single Post (Server Component)
```typescript
import { getBlogPostByIdServer } from '@/utils/supabase/blogCrud';
import { notFound } from 'next/navigation';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { data: post, error } = await getBlogPostByIdServer(params.slug);

  if (error || !post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
      <div>{post.content}</div>
    </article>
  );
}
```

### Updating a Post (Client Component)
```typescript
'use client';

import { updateBlogPost } from '@/utils/supabase/blogCrud';

async function handleUpdate(postId: string) {
  const { data, error } = await updateBlogPost(postId, {
    title: "Updated Title",
    content: "Updated content..."
  });

  if (error) {
    console.error('Error updating post:', error);
  } else {
    console.log('Updated post:', data);
  }
}
```

### Deleting a Post (Client Component)
```typescript
'use client';

import { deleteBlogPost } from '@/utils/supabase/blogCrud';

async function handleDelete(postId: string) {
  if (!confirm('Are you sure you want to delete this post?')) {
    return;
  }

  const { error } = await deleteBlogPost(postId);

  if (error) {
    console.error('Error deleting post:', error);
    alert('Failed to delete post');
  } else {
    alert('Post deleted successfully');
    // Refresh the page or update state
  }
}
```

## Error Handling

All CRUD functions return an object with `data` and `error` properties:

```typescript
const { data, error } = await createBlogPost(input);

if (error) {
  // Handle error
  console.error('Operation failed:', error);
  // Show user-friendly error message
  alert(`Error: ${error.message}`);
} else {
  // Handle success
  console.log('Operation succeeded:', data);
}
```

### Common Error Scenarios

1. **Network Error**: Supabase connection failed
2. **Permission Error**: RLS policy denied the operation
3. **Validation Error**: Invalid input data
4. **Not Found Error**: Post ID doesn't exist

## Helper Functions

### Slug Generation
Posts automatically get a URL-friendly slug generated from the title:
- "Hello World!" → "hello-world"
- "Getting Started with Next.js" → "getting-started-with-nextjs"

### Reading Time Calculation
If not provided, reading time is automatically calculated based on:
- Average reading speed: 200 words per minute
- Word count from content
- Rounds up to nearest minute

## Best Practices

1. **Always handle errors**: Check the `error` property before using `data`
2. **Use loading states**: Show loading indicators during async operations
3. **Validate input**: Validate form data before calling CRUD functions
4. **User feedback**: Provide clear feedback for success and error states
5. **Optimistic updates**: Update UI immediately, then sync with database
6. **Server-side when possible**: Use server-side functions for initial page loads

## Testing

To test the CRUD operations:

1. Visit `/write` to create a new blog post
2. Visit `/manage` to view and delete posts
3. Visit `/posts` to see all published posts
4. Visit `/posts/[slug]` to view individual posts

## Troubleshooting

### Missing environment variables error?
If you see an error like "Missing Supabase environment variables", this means your `.env.local` file is not properly configured:
1. Create a `.env.local` file in the root directory if it doesn't exist
2. Copy the contents from `.env.example`
3. Replace the placeholder values with your actual Supabase credentials from: https://supabase.com/dashboard/project/_/settings/api
4. Restart your development server (`npm run dev`)

### Posts not appearing?
- Check Supabase credentials in `.env.local`
- Verify database table exists
- Check browser console for errors
- Verify RLS policies if enabled

### Cannot create posts?
- Check Supabase permissions
- Verify all required fields are provided
- Check for duplicate IDs (slugs)

### Slug generation issues?
- Ensure title contains valid characters
- Check for very long titles (may need truncation)

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
