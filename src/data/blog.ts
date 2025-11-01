// Blog post type definition
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
}

// Blog posts data - keeping one example for reference
export const blogPosts: Record<string, BlogPost> = {
  "github-copilot-acknowledgement": {
    id: "github-copilot-acknowledgement",
    title: "Acknowledging GitHub Copilot in My Projects",
    excerpt: "How I properly credit AI assistance and collaboration in my development projects, including best practices for acknowledgements.",
    date: "2024-01-15",
    category: "AI Development",
    readTime: "5 min read",
    author: "Developer",
    content: "# Acknowledging GitHub Copilot in My Projects\n\nAs AI-assisted development becomes increasingly common, it's important to properly acknowledge the tools and technologies that help us build better software. GitHub Copilot has become an invaluable collaborator in my development workflow, and I believe in giving credit where credit is due.\n\n## Why Acknowledgement Matters\n\nIn the spirit of open and ethical development, acknowledging AI assistance serves several important purposes:\n\n### Transparency\nBeing transparent about the tools and assistance used in development helps maintain trust with users, collaborators, and the broader development community.\n\n### Professional Integrity\nProper attribution demonstrates professional integrity and respect for the collaborative nature of modern software development.\n\n### Educational Value\nSharing information about AI-assisted development helps others learn about these tools and their potential applications.\n\n## How I Acknowledge Copilot\n\nHere are the specific ways I credit GitHub Copilot in my projects:\n\n### 1. README Documentation\nI include a dedicated section in my README files that acknowledges AI assistance.\n\n### 2. Code Comments\nFor particularly complex or AI-suggested code blocks, I add comments.\n\n### 3. Commit Messages\nI sometimes include references to AI assistance in commit messages.\n\n### 4. Project Metadata\nIn package.json or similar files, I include acknowledgements.\n\n## Conclusion\n\nAcknowledging AI assistance like GitHub Copilot isn't just about giving credit—it's about being part of a transparent, ethical development community. By properly attributing AI contributions, we contribute to a culture of openness and integrity in software development."
  }
};

// Helper function to get all posts as an array
export function getAllPosts(): BlogPost[] {
  return Object.values(blogPosts).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Helper function to get a single post by ID
export function getPostById(id: string): BlogPost | undefined {
  return blogPosts[id];
}
