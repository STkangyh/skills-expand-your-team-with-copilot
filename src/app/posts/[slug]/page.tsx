import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostById } from "@/data/blog";

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostById(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
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
              <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                About
              </Link>
              <Link href="/write" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Write
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li><Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link></li>
            <li>→</li>
            <li><Link href="/posts" className="hover:text-blue-600 dark:hover:text-blue-400">Posts</Link></li>
            <li>→</li>
            <li className="text-gray-900 dark:text-white">{post.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                D
              </div>
              <span>{post.author}</span>
            </div>
            <time>{new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</time>
            <span>{post.readTime}</span>
          </div>
        </header>

        {/* Article Content */}
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div style={{ whiteSpace: 'pre-wrap' }}>
              {post.content}
            </div>
          </div>
        </article>

        {/* Back to Posts */}
        <div className="text-center">
          <Link 
            href="/posts" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p className="mb-2">
              Built with ❤️ using Next.js and Tailwind CSS
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