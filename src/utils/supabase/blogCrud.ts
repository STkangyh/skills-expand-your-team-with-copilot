import { createClient as createBrowserClient } from './client'
import { createClient as createServerClient } from './server'

// Extended BlogPost interface with database fields
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  created_at?: string;
  updated_at?: string;
}

// Input type for creating a new blog post
export interface CreateBlogPostInput {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  readTime?: string;
}

// Input type for updating an existing blog post
export interface UpdateBlogPostInput {
  title?: string;
  content?: string;
  excerpt?: string;
  category?: string;
  author?: string;
  readTime?: string;
}

/**
 * Calculate estimated reading time based on content length
 * Assumes average reading speed of 200 words per minute
 */
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Generate a URL-friendly slug from a title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Create a new blog post in Supabase
 * Client-side version
 */
export async function createBlogPost(input: CreateBlogPostInput): Promise<{ data: BlogPost | null; error: Error | null }> {
  const supabase = createBrowserClient();
  
  const slug = generateSlug(input.title);
  const readTime = input.readTime || calculateReadTime(input.content);
  
  const { data, error } = await supabase
    .from('blogs')
    .insert({
      id: slug,
      title: input.title,
      content: input.content,
      excerpt: input.excerpt,
      category: input.category,
      author: input.author,
      readTime: readTime,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Get all blog posts from Supabase
 * Client-side version
 */
export async function getAllBlogPosts(): Promise<{ data: BlogPost[] | null; error: Error | null }> {
  const supabase = createBrowserClient();
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('date', { ascending: false });

  return { data, error };
}

/**
 * Get a single blog post by ID from Supabase
 * Client-side version
 */
export async function getBlogPostById(id: string): Promise<{ data: BlogPost | null; error: Error | null }> {
  const supabase = createBrowserClient();
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
}

/**
 * Update an existing blog post in Supabase
 * Client-side version
 */
export async function updateBlogPost(id: string, input: UpdateBlogPostInput): Promise<{ data: BlogPost | null; error: Error | null }> {
  const supabase = createBrowserClient();
  
  const updateData: Partial<BlogPost> = { ...input };
  
  // Recalculate read time if content is being updated
  if (input.content) {
    updateData.readTime = calculateReadTime(input.content);
  }
  
  const { data, error } = await supabase
    .from('blogs')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}

/**
 * Delete a blog post from Supabase
 * Client-side version
 */
export async function deleteBlogPost(id: string): Promise<{ error: Error | null }> {
  const supabase = createBrowserClient();
  
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);

  return { error };
}

/**
 * Server-side version: Create a new blog post in Supabase
 */
export async function createBlogPostServer(input: CreateBlogPostInput): Promise<{ data: BlogPost | null; error: Error | null }> {
  const supabase = await createServerClient();
  
  const slug = generateSlug(input.title);
  const readTime = input.readTime || calculateReadTime(input.content);
  
  const { data, error } = await supabase
    .from('blogs')
    .insert({
      id: slug,
      title: input.title,
      content: input.content,
      excerpt: input.excerpt,
      category: input.category,
      author: input.author,
      readTime: readTime,
      date: new Date().toISOString().split('T')[0],
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Server-side version: Get all blog posts from Supabase
 */
export async function getAllBlogPostsServer(): Promise<{ data: BlogPost[] | null; error: Error | null }> {
  const supabase = await createServerClient();
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('date', { ascending: false });

  return { data, error };
}

/**
 * Server-side version: Get a single blog post by ID from Supabase
 */
export async function getBlogPostByIdServer(id: string): Promise<{ data: BlogPost | null; error: Error | null }> {
  const supabase = await createServerClient();
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
}

/**
 * Server-side version: Update an existing blog post in Supabase
 */
export async function updateBlogPostServer(id: string, input: UpdateBlogPostInput): Promise<{ data: BlogPost | null; error: Error | null }> {
  const supabase = await createServerClient();
  
  const updateData: Partial<BlogPost> = { ...input };
  
  if (input.content) {
    updateData.readTime = calculateReadTime(input.content);
  }
  
  const { data, error } = await supabase
    .from('blogs')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}

/**
 * Server-side version: Delete a blog post from Supabase
 */
export async function deleteBlogPostServer(id: string): Promise<{ error: Error | null }> {
  const supabase = await createServerClient();
  
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);

  return { error };
}
