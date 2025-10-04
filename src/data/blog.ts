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

// Blog posts data
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
  },
  "open-source-contributions": {
    id: "open-source-contributions",
    title: "Acknowledging Open Source Dependencies",
    excerpt: "Best practices for crediting open source libraries, contributors, and maintainers in your projects and documentation.",
    date: "2024-01-01",
    category: "Open Source",
    readTime: "6 min read",
    author: "Developer",
    content: "# Acknowledging Open Source Dependencies\n\nOpen source software is the foundation of modern development. Properly acknowledging the libraries, contributors, and maintainers we depend on is both a professional responsibility and a way to give back to the community.\n\n## Why Acknowledge Open Source?\n\nAcknowledging open source dependencies serves multiple important purposes:\n\n### Community Recognition\nMaintainers and contributors invest significant time and effort into open source projects. Recognition shows appreciation for their work.\n\n### Transparency\nUsers and stakeholders deserve to know what dependencies your project relies on, including licensing information.\n\n### Professional Standards\nProper attribution demonstrates professionalism and respect for the broader development community.\n\n## Best Practices\n\n### 1. Maintain Updated Documentation\nKeep a current list of all dependencies in your README and documentation.\n\n### 2. License Compliance\nEnsure you comply with the licenses of all dependencies you use.\n\n### 3. Give Credit Publicly\nMention key libraries and tools in your project's public documentation.\n\n### 4. Contribute Back\nWhen possible, contribute bug fixes, documentation, or features back to the projects you use.\n\n## Conclusion\n\nAcknowledging open source dependencies is more than a courtesy—it's an essential part of ethical software development. By properly crediting the tools and libraries we use, we strengthen the entire open source ecosystem."
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
