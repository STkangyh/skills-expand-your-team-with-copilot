import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
}

// Sample blog posts data (in a real app, this would come from a CMS or database)
const blogPosts: Record<string, BlogPost> = {
  "github-copilot-acknowledgement": {
    id: "github-copilot-acknowledgement",
    title: "Acknowledging GitHub Copilot in My Projects",
    excerpt: "How I properly credit AI assistance and collaboration in my development projects, including best practices for acknowledgements.",
    date: "2024-01-15",
    category: "AI Development",
    readTime: "5 min read",
    author: "Developer",
    content: "# Acknowledging GitHub Copilot in My Projects\n\nAs AI-assisted development becomes increasingly common, it's important to properly acknowledge the tools and technologies that help us build better software. GitHub Copilot has become an invaluable collaborator in my development workflow, and I believe in giving credit where credit is due.\n\n## Why Acknowledgement Matters\n\nIn the spirit of open and ethical development, acknowledging AI assistance serves several important purposes:\n\n### Transparency\nBeing transparent about the tools and assistance used in development helps maintain trust with users, collaborators, and the broader development community.\n\n### Professional Integrity\nProper attribution demonstrates professional integrity and respect for the collaborative nature of modern software development.\n\n### Educational Value\nSharing information about AI-assisted development helps others learn about these tools and their potential applications.\n\n## How I Acknowledge Copilot\n\nHere are the specific ways I credit GitHub Copilot in my projects:\n\n### 1. README Documentation\nI include a dedicated section in my README files that acknowledges AI assistance.\n\n### 2. Code Comments\nFor particularly complex or AI-suggested code blocks, I add comments.\n\n### 3. Commit Messages\nI sometimes include references to AI assistance in commit messages.\n\n### 4. Project Metadata\nIn package.json or similar files, I include acknowledgements.\n\n## Conclusion\n\nAcknowledging AI assistance like GitHub Copilot isn't just about giving credit—it's about being part of a transparent, ethical development community. By properly attributing AI contributions, we contribute to a culture of openness and integrity in software development."
  },
  "project-collaboration-insights": {
    id: "project-collaboration-insights", 
    title: "Lessons from Human-AI Collaboration",
    excerpt: "Key insights and learnings from working with AI coding assistants on real-world projects.",
    date: "2024-01-10",
    category: "Development",
    readTime: "8 min read",
    author: "Developer",
    content: "# Lessons from Human-AI Collaboration\n\nAfter months of working with AI coding assistants like GitHub Copilot, I've gathered valuable insights about the dynamics of human-AI collaboration in software development.\n\n## The Partnership Dynamic\n\nAI coding assistants work best when treated as collaborative partners rather than replacement tools. The most effective approach combines human creativity and judgment with AI's pattern recognition and code generation capabilities.\n\n### What Humans Excel At\n- Problem decomposition and architecture decisions\n- Understanding business requirements and user needs\n- Creative problem-solving and innovation\n- Code review and quality assessment\n- Ethical considerations and edge case handling\n\n### What AI Excels At\n- Rapid code generation based on patterns\n- Boilerplate and repetitive code creation\n- Syntax and API suggestions\n- Documentation generation\n- Common algorithm implementations\n\n## Practical Collaboration Strategies\n\n### 1. Clear Intent Communication\nThe quality of AI suggestions directly correlates with the clarity of your intent. Specific comments and function names lead to better results.\n\n### 2. Iterative Refinement\nRather than expecting perfect code on the first try, use AI suggestions as starting points for refinement.\n\n### 3. Domain Context Matters\nAI performs better when given sufficient domain context through descriptive names and relevant comments.\n\n## Conclusion\n\nHuman-AI collaboration in software development is not about replacement—it's about augmentation. The most successful developers will be those who learn to effectively collaborate with AI tools while maintaining their critical thinking, creativity, and technical expertise."
  },
  "next-js-blog-setup": {
    id: "next-js-blog-setup",
    title: "Setting Up a Professional Blog with Next.js",
    excerpt: "A comprehensive guide to creating a blog for project documentation and acknowledgements.",
    date: "2024-01-05",
    category: "Tutorial",
    readTime: "12 min read",
    author: "Developer",
    content: "# Setting Up a Professional Blog with Next.js\n\nCreating a professional blog for project documentation and acknowledgements is an excellent way to maintain transparency and share insights with the development community. This guide walks through setting up a modern blog using Next.js, TypeScript, and Tailwind CSS.\n\n## Why Next.js for Blogging?\n\nNext.js provides several advantages for blog development:\n\n### Performance Benefits\n- Static Site Generation (SSG): Pre-rendered pages for fast loading\n- Automatic Code Splitting: Optimized bundle sizes\n- Image Optimization: Built-in image optimization and lazy loading\n- SEO Optimization: Server-side rendering for better search engine visibility\n\n### Developer Experience\n- TypeScript Support: Built-in TypeScript support for type safety\n- Hot Reloading: Instant feedback during development\n- API Routes: Backend functionality when needed\n- Deployment Ready: Optimized for platforms like Vercel\n\n## Project Setup\n\nCreate a new Next.js project with TypeScript and Tailwind CSS for the best development experience.\n\n## Building the Blog Components\n\nCreate reusable components for layout, navigation, and content display.\n\n## Content Management\n\nImplement a flexible content management system using markdown or a headless CMS.\n\n## Styling and Design\n\nUse Tailwind CSS for responsive design and consistent styling across all pages.\n\n## SEO and Performance\n\nImplement proper SEO metadata and performance optimization techniques.\n\n## Deployment and Hosting\n\nConfigure the blog for deployment on various hosting platforms.\n\n## Conclusion\n\nA well-designed Next.js blog provides an excellent platform for sharing project acknowledgements, development insights, and professional growth. The combination of Next.js, TypeScript, and Tailwind CSS offers a powerful foundation for creating a fast, maintainable, and professional blog."
  }
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];

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