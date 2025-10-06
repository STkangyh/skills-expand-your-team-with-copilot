import Link from "next/link";
import { getAllPosts } from "@/data/blog";

export default function Home() {
  const blogPosts = getAllPosts().slice(0, 3); // Get first 3 posts for homepage
  
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Professional Project Acknowledgements
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            A dedicated space for acknowledging contributions, tools, and collaborations 
            in my development projects, including AI assistance and community support.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/posts" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Posts
            </Link>
            <Link 
              href="/about" 
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* Featured Posts */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Recent Acknowledgements
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <time className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  <Link 
                    href={`/posts/${post.id}`} 
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <Link 
                  href={`/posts/${post.id}`} 
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </section>
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
