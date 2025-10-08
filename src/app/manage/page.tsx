'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllBlogPosts, deleteBlogPost, BlogPost } from '@/utils/supabase/blogCrud';

export default function ManageBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await getAllBlogPosts();
      
      if (fetchError) {
        throw new Error(fetchError.message || 'Failed to fetch blogs');
      }
      
      if (data) {
        setBlogs(data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const { error: deleteError } = await deleteBlogPost(id);
      
      if (deleteError) {
        throw new Error(deleteError.message || 'Failed to delete blog');
      }
      
      alert('Blog post deleted successfully!');
      fetchBlogs(); // Refresh the list
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      alert(`Error: ${errorMessage}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              🚀 Developer Blog
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Home
              </Link>
              <Link href="/posts" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Posts
              </Link>
              <Link href="/write" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Write
              </Link>
              <Link href="/manage" className="text-blue-600 dark:text-blue-400 font-medium">
                Manage
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Page Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Manage Blog Posts
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            View, edit, and delete blog posts from your Supabase database
          </p>
        </section>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-800 dark:text-red-300 text-center">{error}</p>
          </div>
        )}

        {/* Blog Posts Table */}
        {blogs.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
              No blog posts found in Supabase database
            </p>
            <Link 
              href="/write"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4">
                        <Link 
                          href={`/posts/${blog.id}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                          {blog.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full text-xs">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {blog.author}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {new Date(blog.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p className="mb-2">
              Built with ❤️ using Next.js, Tailwind CSS, and Supabase
            </p>
            <p className="text-sm">
              A professional blog for project acknowledgements and development insights
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
