import { createClient as createServerClient } from './server'
import { BlogPost, CreateBlogPostInput, UpdateBlogPostInput } from './blogCrud'

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
async function generateUniqueSlugServer(title: string): Promise<string> {
  const supabase = await createServerClient();
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
 * Server-side version: Create a new blog post in Supabase
 */
export async function createBlogPostServer(input: CreateBlogPostInput): Promise<{ data: BlogPost | null; error: Error | null }> {
  const supabase = await createServerClient();
  
  const slug = await generateUniqueSlugServer(input.title);
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
      readtime: readtime,
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

  const updateData: UpdateBlogPostInput = { ...input };

  if (input.content) {
    updateData.readtime = calculateReadTime(input.content);
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