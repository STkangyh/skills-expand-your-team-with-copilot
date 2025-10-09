import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogPostsServer, getBlogPostByIdServer } from "@/utils/supabase/blogCrudServer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export async function generateStaticParams() {
  // Define known slugs as fallback
  const fallbackSlugs = [
    { slug: 'test' },
    { slug: 'github-copilot-acknowledgement' },
    { slug: 'getting-started-with-nextjs' },
    { slug: 'building-modern-web-apps' },
    { slug: 'typescript-best-practices' }
  ];
  
  try {
    const { data: posts, error } = await getAllBlogPostsServer();
    
    if (error || !posts) {
      console.warn('Using fallback slugs due to Supabase error:', error);
      return fallbackSlugs;
    }
    
    const params = posts.map((post) => ({
      slug: post.id,
    }));
    
    // Merge Supabase posts with fallback slugs to ensure all known posts are included
    const allSlugs = [...params];
    fallbackSlugs.forEach(fallback => {
      if (!allSlugs.some(p => p.slug === fallback.slug)) {
        allSlugs.push(fallback);
      }
    });
    
    console.log('Generated static params:', allSlugs);
    return allSlugs;
  } catch (error) {
    console.warn('Error generating static params, using fallback:', error);
    return fallbackSlugs;
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { data: post, error } = await getBlogPostByIdServer(params.slug);

  if (!post) {
    if (error) {
      console.error('Error fetching post:', error);
    }
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
            <span>{post.readtime}</span>
          </div>
        </header>

        {/* Article Content */}
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12">
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-pink-600 dark:prose-code:text-pink-400">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                // Custom components for better styling
                h1: ({children}) => <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{children}</h3>,
                p: ({children}) => <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">{children}</p>,
                code: ({children}) => <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm text-pink-600 dark:text-pink-400">{children}</code>,
                pre: ({children}) => <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
                blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4">{children}</blockquote>,
                ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-700 dark:text-gray-300">{children}</ol>,
                li: ({children}) => <li className="mb-1">{children}</li>,
                a: ({href, children}) => <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline">{children}</a>,
                strong: ({children}) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>,
                em: ({children}) => <em className="italic">{children}</em>,
              }}
            >
              {post.content}
            </ReactMarkdown>
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