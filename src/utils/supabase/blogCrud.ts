import { createClient as createBrowserClient } from './client'

// Extended BlogPost interface with database fields
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  category: string;
  readtime: string; // Changed to match database column
  author: string;
  created_at?: string;
  updated_at?: string;
}

// Display interface that maps database fields to UI-friendly names
export interface BlogPostDisplay {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  category: string;
  readtime: string; // UI-friendly name
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
  readtime?: string;
}

// Input type for updating an existing blog post
export interface UpdateBlogPostInput {
  title?: string;
  content?: string;
  excerpt?: string;
  category?: string;
  author?: string;
  readtime?: string;
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
 * Generate a unique slug by checking existing posts and adding a number if needed
 */
async function generateUniqueSlug(title: string): Promise<string> {
  const supabase = createBrowserClient();
  const baseSlug = generateSlug(title);
  
  // Check if the base slug exists
  const { data: existing } = await supabase
    .from('blogs')
    .select('id')
    .eq('id', baseSlug)
    .single();
  
  if (!existing) {
    return baseSlug;
  }
  
  // If it exists, try with numbers
  let counter = 1;
  let uniqueSlug = `${baseSlug}-${counter}`;
  
  while (true) {
    const { data: existingNumbered } = await supabase
      .from('blogs')
      .select('id')
      .eq('id', uniqueSlug)
      .single();
    
    if (!existingNumbered) {
      return uniqueSlug;
    }
    
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }
}

/**
 * Create a new blog post in Supabase
 * Client-side version
 */
export async function createBlogPost(input: CreateBlogPostInput): Promise<{ data: BlogPost | null; error: Error | null }> {
  const supabase = createBrowserClient();
  
  const slug = await generateUniqueSlug(input.title);
  const readtime = input.readtime || calculateReadTime(input.content);
  
  const { data, error } = await supabase
    .from('blogs')
    .insert({
      id: slug,
      title: input.title,
      content: input.content,
      excerpt: input.excerpt,
      category: input.category,
      author: input.author,
      readtime: readtime, // Changed from readTime to readtime to match database column
      date: new Date().toISOString().split('T')[0],
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

  const updateData: UpdateBlogPostInput = { ...input };

  // Add readTime calculation back - use database column name
  if (input.content) {
    updateData.readtime = calculateReadTime(input.content);
    // Remove the camelCase version to avoid confusion
    delete updateData.readtime;
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
 * Create or update a blog post (upsert)
 * Client-side version
 */
export async function upsertBlogPost(input: CreateBlogPostInput): Promise<{ data: BlogPost | null; error: Error | null }> {
  const supabase = createBrowserClient();
  
  const slug = generateSlug(input.title);
  const readtime = input.readtime || calculateReadTime(input.content);
  
  const { data, error } = await supabase
    .from('blogs')
    .upsert({
      id: slug,
      title: input.title,
      content: input.content,
      excerpt: input.excerpt,
      category: input.category,
      author: input.author,
      readtime: readtime,
      date: new Date().toISOString().split('T')[0],
    })
    .select()
    .single();

  return { data, error };
}
