"use client";

import Link from "next/link";
import { useState } from "react";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Development");

  const categories = ["AI Development", "Development", "Tutorial", "Open Source"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just log the data
    console.log({ title, excerpt, content, category });
    alert("Post preview logged to console! (Actual submission not implemented yet)");
  };

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
              <Link href="/write" className="text-blue-600 dark:text-blue-400 font-medium">
                Write
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Page Header */}
        <section className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
            ✍️
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Write a New Post
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Share your insights on project acknowledgements, AI collaboration, and development best practices
          </p>
        </section>

        {/* Writing Form */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Post Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your post title..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Category Field */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Excerpt Field */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Write a brief summary of your post..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Content Field */}
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here... (Markdown supported)"
                rows={15}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                required
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Tip: You can use Markdown formatting for your content
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Preview Post
              </button>
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setExcerpt("");
                  setContent("");
                  setCategory("Development");
                }}
                className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold transition-colors"
              >
                Clear
              </button>
            </div>
          </form>
        </section>

        {/* Writing Tips */}
        <section className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            💡 Writing Tips
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Write clear and concise titles that capture the essence of your post</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Use the excerpt to give readers a preview of what to expect</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Break up long content with headings and bullet points</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Include code examples and practical insights when relevant</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Remember to acknowledge tools and collaborators appropriately</span>
            </li>
          </ul>
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
