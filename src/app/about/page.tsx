import Link from "next/link";

export default function AboutPage() {
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
              <Link href="/about" className="text-blue-600 dark:text-blue-400 font-medium">
                About
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-8 flex items-center justify-center text-4xl">
            👨‍💻
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About This Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A dedicated space for professional acknowledgements, project insights, 
            and collaboration stories in modern software development.
          </p>
        </section>

        {/* Main Content */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Purpose Section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🎯 Purpose & Mission
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                This blog serves as a professional platform for acknowledging the tools, 
                collaborators, and communities that make modern software development possible.
              </p>
              <p>
                In an era of AI-assisted development and open-source collaboration, 
                proper attribution and acknowledgement are more important than ever.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Credit AI coding assistants like GitHub Copilot</li>
                <li>Acknowledge open-source dependencies and contributors</li>
                <li>Share insights from collaborative development experiences</li>
                <li>Document best practices for project attribution</li>
              </ul>
            </div>
          </section>

          {/* Topics Section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📚 What You&apos;ll Find Here
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  AI Development Insights
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Stories and best practices from working with AI coding assistants
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Project Acknowledgements
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Proper ways to credit tools, libraries, and collaborators
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Development Tutorials
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Technical guides and setup instructions for modern development
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Open Source Stories
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Experiences contributing to and using open-source projects
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Values Section */}
        <section className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🌟 Core Values
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                🤝
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Collaboration
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Recognizing that great software is built through teamwork and community
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                🏷️
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Attribution
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Properly crediting tools, libraries, and contributors who make projects possible
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                🚀
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Embracing new tools and technologies while maintaining ethical practices
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Explore?
            </h2>
            <p className="mb-6 opacity-90">
              Discover insights on professional acknowledgements and collaborative development
            </p>
            <Link 
              href="/posts" 
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse All Posts
            </Link>
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