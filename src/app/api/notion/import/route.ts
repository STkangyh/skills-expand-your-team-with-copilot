import { NextRequest, NextResponse } from "next/server";
import { getNotionPageContent } from "@/utils/notion";
import { createBlogPostServer } from "@/utils/supabase/blogCrudServer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageId, category, author } = body as {
      pageId: string;
      category?: string;
      author?: string;
    };

    if (!pageId) {
      return NextResponse.json(
        { error: "pageId is required" },
        { status: 400 }
      );
    }

    // Fetch content from Notion
    const { title, content } = await getNotionPageContent(pageId);

    if (!content.trim()) {
      return NextResponse.json(
        { error: "Notion page has no content to import" },
        { status: 400 }
      );
    }

    // Generate a plain-text excerpt from the first paragraph
    const excerpt =
      content
        .split("\n")
        .filter((line) => line.trim() && !line.startsWith("#"))
        .slice(0, 3)
        .join(" ")
        .replace(/[*_`>#-]/g, "")
        .substring(0, 200)
        .trim() || title;

    // Save to Supabase via the existing server-side helper
    const { data, error } = await createBlogPostServer({
      title,
      content,
      excerpt,
      category: category || "Notes",
      author: author || "Developer",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
