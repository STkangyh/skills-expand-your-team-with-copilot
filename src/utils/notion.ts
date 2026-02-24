import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

export interface NotionPage {
  id: string;
  title: string;
  lastEditedTime: string;
  url: string;
}

/**
 * Create a Notion client using the server-side API key
 */
function createNotionClient(): Client {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) {
    throw new Error("NOTION_API_KEY environment variable is not set");
  }
  return new Client({ auth: apiKey });
}

/**
 * Extract plain text from a Notion rich text array
 */
function richTextToPlain(richText: RichTextItemResponse[]): string {
  return richText.map((t) => t.plain_text).join("");
}

/**
 * Get the title of a Notion page from its properties
 */
function getPageTitle(page: PageObjectResponse): string {
  const props = page.properties;
  for (const key of Object.keys(props)) {
    const prop = props[key];
    if (prop.type === "title" && prop.title.length > 0) {
      return richTextToPlain(prop.title);
    }
  }
  return "Untitled";
}

/**
 * Fetch all pages from the configured Notion database
 */
export async function getNotionPages(): Promise<NotionPage[]> {
  const notion = createNotionClient();
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) {
    throw new Error("NOTION_DATABASE_ID environment variable is not set");
  }

  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
  });

  return response.results
    .filter((page): page is PageObjectResponse => page.object === "page")
    .map((page) => ({
      id: page.id,
      title: getPageTitle(page),
      lastEditedTime: page.last_edited_time,
      url: page.url,
    }));
}

/**
 * Convert a single Notion block to Markdown text
 */
function blockToMarkdown(block: BlockObjectResponse): string {
  switch (block.type) {
    case "paragraph":
      return richTextToPlain(block.paragraph.rich_text) + "\n\n";
    case "heading_1":
      return `# ${richTextToPlain(block.heading_1.rich_text)}\n\n`;
    case "heading_2":
      return `## ${richTextToPlain(block.heading_2.rich_text)}\n\n`;
    case "heading_3":
      return `### ${richTextToPlain(block.heading_3.rich_text)}\n\n`;
    case "bulleted_list_item":
      return `- ${richTextToPlain(block.bulleted_list_item.rich_text)}\n`;
    case "numbered_list_item":
      return `1. ${richTextToPlain(block.numbered_list_item.rich_text)}\n`;
    case "to_do":
      return `- [${block.to_do.checked ? "x" : " "}] ${richTextToPlain(block.to_do.rich_text)}\n`;
    case "toggle":
      return richTextToPlain(block.toggle.rich_text) + "\n\n";
    case "quote":
      return `> ${richTextToPlain(block.quote.rich_text)}\n\n`;
    case "code":
      return `\`\`\`${block.code.language}\n${richTextToPlain(block.code.rich_text)}\n\`\`\`\n\n`;
    case "divider":
      return `---\n\n`;
    case "callout":
      return `> ${richTextToPlain(block.callout.rich_text)}\n\n`;
    default:
      return "";
  }
}

/**
 * Fetch a Notion page's content and convert it to Markdown
 */
export async function getNotionPageContent(pageId: string): Promise<{
  title: string;
  content: string;
}> {
  const notion = createNotionClient();

  // Fetch page metadata
  const page = (await notion.pages.retrieve({
    page_id: pageId,
  })) as PageObjectResponse;
  const title = getPageTitle(page);

  // Fetch all blocks
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined = undefined;
  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });
    blocks.push(
      ...response.results.filter(
        (b): b is BlockObjectResponse => b.object === "block"
      )
    );
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  const content = blocks.map(blockToMarkdown).join("");

  return { title, content };
}
