import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "github-copilot-acknowledgement",
    title: "Acknowledging GitHub Copilot in My Projects",
    excerpt: "How I properly credit AI assistance and collaboration in my development projects, including best practices for acknowledgements and ethical considerations.",
    date: "2024-01-15",
    category: "AI Development",
    readTime: "5 min read"
  },
  {
    id: "project-collaboration-insights",
    title: "Lessons from Human-AI Collaboration",
    excerpt: "Key insights and learnings from working with AI coding assistants on real-world projects, including productivity gains and collaboration patterns.",
    date: "2024-01-10",
    category: "Development",
    readTime: "8 min read"
  },
  {
    id: "next-js-blog-setup",
    title: "Setting Up a Professional Blog with Next.js",
    excerpt: "A comprehensive guide to creating a blog for project documentation and acknowledgements using Next.js, TypeScript, and Tailwind CSS.",
    date: "2024-01-05",
    category: "Tutorial",
    readTime: "12 min read"
  },
  {
    id: "open-source-contributions",
    title: "Acknowledging Open Source Dependencies",
    excerpt: "Best practices for crediting open source libraries, contributors, and maintainers in your projects and documentation.",
    date: "2024-01-01",
    category: "Open Source",
    readTime: "6 min read"
  }
];

export default function PostsPage() {
  const uniqueCategories = new Set(blogPosts.map(post => post.category));
  const categories = Array.from(uniqueCategories);

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
              <Link href="/posts" className="text-blue-600 dark:text-blue-400 font-medium">
                Posts
              </Link>
              <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                About
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Page Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            All Posts
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore insights on project acknowledgements, AI collaboration, and development best practices
          </p>
        </section>

        {/* Categories Filter */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium">
              All Posts
            </button>
            {categories.map((category) => (
              <button 
                key={category}
                className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Posts Grid */}
        <section className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <time>{new Date(post.date).toLocaleDateString()}</time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                <Link 
                  href={`/posts/${post.id}`} 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <Link 
                href={`/posts/${post.id}`} 
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Read full post
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
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