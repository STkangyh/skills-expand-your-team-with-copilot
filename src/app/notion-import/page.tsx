"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface NotionPage {
  id: string;
  title: string;
  lastEditedTime: string;
  url: string;
}

const categories = ["Notes", "AI Development", "Development", "Tutorial", "Open Source"];

export default function NotionImportPage() {
  const router = useRouter();
  const [pages, setPages] = useState<NotionPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [importingId, setImportingId] = useState<string | null>(null);
  const [importedIds, setImportedIds] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState("Notes");
  const [author, setAuthor] = useState("Developer");

  const fetchPages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/notion/pages");
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to fetch Notion pages");
      }
      setPages(json.pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleImport = async (page: NotionPage) => {
    setImportingId(page.id);
    try {
      const res = await fetch("/api/notion/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId: page.id,
          category: selectedCategory,
          author,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to import page");
      }
      setImportedIds((prev) => new Set(prev).add(page.id));
      if (json.post?.id) {
        router.push(`/posts/${json.post.id}`);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Import failed");
    } finally {
      setImportingId(null);
    }
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
              <Link href="/write" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Write
              </Link>
              <Link href="/notion-import" className="text-blue-600 dark:text-blue-400 font-medium">
                Notion Import
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Page Header */}
        <section className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
            📓
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Import from Notion
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select a page from your Notion database to publish it as a blog post.
          </p>
        </section>

        {/* Import Settings */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Import Settings
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-800 dark:text-red-300">{error}</p>
            {error.includes("NOTION_API_KEY") || error.includes("NOTION_DATABASE_ID") ? (
              <p className="mt-2 text-sm text-red-700 dark:text-red-400">
                Please set the <code className="font-mono">NOTION_API_KEY</code> and{" "}
                <code className="font-mono">NOTION_DATABASE_ID</code> environment variables.
                See <code className="font-mono">.env.example</code> for details.
              </p>
            ) : null}
            <button
              onClick={fetchPages}
              className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mr-3"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading Notion pages…</p>
          </div>
        )}

        {/* Pages List */}
        {!loading && !error && pages.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No pages found in your Notion database.
            </p>
          </div>
        )}

        {!loading && pages.length > 0 && (
          <section className="space-y-4">
            {pages.map((page) => (
              <div
                key={page.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {page.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Last edited:{" "}
                    {new Date(page.lastEditedTime).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <a
                    href={page.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="Open in Notion"
                  >
                    Open ↗
                  </a>
                  {importedIds.has(page.id) ? (
                    <span className="px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium">
                      ✓ Imported
                    </span>
                  ) : (
                    <button
                      onClick={() => handleImport(page)}
                      disabled={importingId !== null}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
                    >
                      {importingId === page.id ? "Importing…" : "Import as Post"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Setup Instructions */}
        <section className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            🔧 Setup Instructions
          </h2>
          <ol className="space-y-3 text-gray-600 dark:text-gray-300 list-decimal pl-5">
            <li>
              Go to{" "}
              <a
                href="https://www.notion.so/my-integrations"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                notion.so/my-integrations
              </a>{" "}
              and create a new integration. Copy the <strong>Internal Integration Secret</strong>.
            </li>
            <li>
              Open your Notion database, click <strong>⋯ → Add connections</strong> and connect your integration.
            </li>
            <li>
              Copy your database ID from the URL — it is the 32-character string after the last <code className="font-mono">/</code> and before the <code className="font-mono">?</code>.
              <br />
              Example URL:{" "}
              <code className="text-xs font-mono break-all">
                https://www.notion.so/afced50fec9748c5a8c3658a09d8d934?v=…
              </code>{" "}
              → ID is <code className="font-mono">afced50fec9748c5a8c3658a09d8d934</code>
            </li>
            <li>
              Add these to your <code className="font-mono">.env.local</code> file:
              <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">
                {`NOTION_API_KEY=secret_…\nNOTION_DATABASE_ID=afced50fec9748c5a8c3658a09d8d934`}
              </pre>
            </li>
            <li>Restart the development server and return to this page.</li>
          </ol>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p className="mb-2">Built with ❤️ using Next.js and Tailwind CSS</p>
            <p className="text-sm">
              A professional blog for project acknowledgements and development insights
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
