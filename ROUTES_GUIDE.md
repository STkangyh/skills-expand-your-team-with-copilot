# Blog Application Routes Guide

## Available Routes

### Public Routes

#### 🏠 Home Page (`/`)
- **Purpose**: Main landing page
- **Features**: 
  - Latest 3 blog posts
  - Navigation to all sections
  - Responsive design
- **File**: `src/app/page.tsx`

#### 📚 All Posts (`/posts`)
- **Purpose**: List all blog posts
- **Features**:
  - Complete list of all posts
  - Category filters
  - Reading time estimates
  - Responsive grid layout
- **File**: `src/app/posts/page.tsx`

#### 📄 Single Post (`/posts/[slug]`)
- **Purpose**: View individual blog post
- **Features**:
  - Full post content with Markdown support
  - Author and date information
  - Breadcrumb navigation
- **File**: `src/app/posts/[slug]/page.tsx`
- **Example**: `/posts/github-copilot-acknowledgement`

#### ℹ️ About Page (`/about`)
- **Purpose**: Information about the blog
- **Features**:
  - Blog mission and purpose
  - Author information
- **File**: `src/app/about/page.tsx`

### Blog Management Routes (NEW)

#### ✍️ Write Post (`/write`)
- **Purpose**: Create new blog posts
- **Features**:
  - Form with title, excerpt, content, category, author fields
  - Markdown support in content
  - Auto-saves to Supabase database
  - Loading states and error handling
  - Automatic slug generation
  - Reading time calculation
- **File**: `src/app/write/page.tsx` (Enhanced with Supabase)
- **Supabase Integration**: ✅ Full create functionality

#### 🗂️ Manage Posts (`/manage`)
- **Purpose**: View and manage all blog posts
- **Features**:
  - Table view of all posts from Supabase
  - Post metadata (title, category, author, date)
  - Delete functionality with confirmation
  - Links to view each post
  - Loading states and error handling
- **File**: `src/app/manage/page.tsx` (NEW)
- **Supabase Integration**: ✅ Read and delete functionality

### Demo/Testing Route

#### 🎸 Instruments (`/instruments`)
- **Purpose**: Example Supabase connection
- **Features**: Demonstrates basic Supabase query
- **File**: `src/app/instruments/page.tsx`

## Route Navigation Flow

```
Home (/) 
  ├─→ Posts (/posts)
  │    └─→ Single Post (/posts/[slug])
  ├─→ About (/about)
  ├─→ Write (/write)
  │    └─→ [Creates post] → Redirects to (/posts/[slug])
  └─→ Manage (/manage)
       └─→ [View/Delete posts] → Links to (/posts/[slug])
```

## Navigation Menu

The navigation menu is consistent across all pages:

```
🚀 Developer Blog
  - Home
  - Posts
  - About
  - Write    (For creating content)
  - Manage   (For managing content - available in /manage page)
```

## API/Data Layer

### Supabase Integration Points

1. **Write Page** (`/write`)
   - Uses: `createBlogPost()` from `blogCrud.ts`
   - Action: Creates new posts in Supabase `blogs` table

2. **Manage Page** (`/manage`)
   - Uses: `getAllBlogPosts()` and `deleteBlogPost()` from `blogCrud.ts`
   - Actions: 
     - Fetches all posts from Supabase
     - Deletes posts from Supabase

3. **Future Enhancement: Posts Pages**
   - Can use: `getAllBlogPostsServer()` and `getBlogPostByIdServer()`
   - Would replace static data with Supabase data

## Quick Reference

| Route | Method | Supabase Function | Purpose |
|-------|--------|------------------|---------|
| `/write` | POST | `createBlogPost()` | Create new blog post |
| `/manage` | GET | `getAllBlogPosts()` | Fetch all posts |
| `/manage` | DELETE | `deleteBlogPost()` | Delete specific post |
| `/posts` | GET | `getAllBlogPostsServer()` | Fetch all posts (future) |
| `/posts/[slug]` | GET | `getBlogPostByIdServer()` | Fetch single post (future) |

## Environment Setup

All Supabase-integrated routes require:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

## Testing Routes

To test the implementation:

1. **Create a Post**: Visit `/write` and fill out the form
2. **View All Posts**: Visit `/manage` to see all posts in database
3. **View Single Post**: Click on any post title or visit `/posts/[slug]`
4. **Delete a Post**: Use delete button in `/manage` page
5. **Browse Posts**: Visit `/posts` to see all published posts

## Route Protection (Optional Future Enhancement)

Currently all routes are public. Consider adding:
- Authentication for `/write` and `/manage` routes
- Role-based access control
- Session management
- User-specific post management

## Related Files

- **CRUD Functions**: `src/utils/supabase/blogCrud.ts`
- **Supabase Client**: `src/utils/supabase/client.ts`
- **Supabase Server**: `src/utils/supabase/server.ts`
- **Type Definitions**: Included in `blogCrud.ts`

## Documentation

- **Setup Guide**: `SUPABASE_CRUD_GUIDE.md`
- **Implementation Details**: `IMPLEMENTATION_SUMMARY.md`
- **Main README**: `README.md`
