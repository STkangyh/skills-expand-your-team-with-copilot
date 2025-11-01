# Deployment Guide

This guide covers deploying your blog application to various platforms and ensuring proper Supabase configuration.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Supabase Configuration](#supabase-configuration)
- [Vercel Deployment](#vercel-deployment)
- [Netlify Deployment](#netlify-deployment)
- [Other Platforms](#other-platforms)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, make sure you have:

1. ✅ A Supabase account and project set up
2. ✅ Database table created (see README.md for schema)
3. ✅ Supabase credentials (URL and anon key)
4. ✅ Working local development environment
5. ✅ Git repository connected to your deployment platform

## Supabase Configuration

### 1. Row Level Security (RLS) Setup

RLS is **critical** for preventing CORS and permission errors. Follow these steps:

#### Enable RLS and Create Policies

Run this SQL in your Supabase SQL Editor:

```sql
-- Enable RLS on the blogs table
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can view posts)
CREATE POLICY "Allow public read access" ON blogs
  FOR SELECT USING (true);

-- For development: Allow public write access
-- WARNING: Use this only for testing!
CREATE POLICY "Allow public insert" ON blogs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON blogs
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete" ON blogs
  FOR DELETE USING (true);
```

#### Production RLS Policies (Recommended)

For production, restrict write operations to authenticated users:

```sql
-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view)
CREATE POLICY "Allow public read access" ON blogs
  FOR SELECT USING (true);

-- Authenticated write access (only logged-in users can create/edit/delete)
CREATE POLICY "Allow authenticated insert" ON blogs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON blogs
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON blogs
  FOR DELETE USING (auth.role() = 'authenticated');
```

### 2. Verify API Settings

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Settings** > **API**
4. Verify:
   - ✅ Project URL is correct
   - ✅ Anon/public key is available
   - ✅ Service role key is NOT used in client code

### 3. CORS Configuration

Good news! Supabase automatically allows CORS requests from all origins when using the anon key. If you're experiencing CORS issues, it's likely an RLS policy problem, not CORS configuration.

## Vercel Deployment

Vercel is the recommended platform for Next.js applications.

### Step 1: Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" > "Project"
3. Import your Git repository
4. Vercel will auto-detect Next.js settings

### Step 2: Configure Environment Variables

**Important:** Add these in Vercel before deploying!

1. In your Vercel project, go to **Settings** > **Environment Variables**
2. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-id.supabase.co` | All |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Your anon key from Supabase | All |

3. Click "Save"

### Step 3: Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Visit your deployed URL
4. Test the `/write` page to create a post

### Step 4: Configure Custom Domain (Optional)

1. Go to **Settings** > **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

### Common Vercel Issues

**Issue: Environment variables not working**
- Make sure variables are added to all environments (Production, Preview, Development)
- Redeploy after adding variables

**Issue: Build fails**
- Check build logs for errors
- Ensure all dependencies are in `package.json`
- Try building locally first: `npm run build`

## Netlify Deployment

### Step 1: Connect Repository

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "Add new site" > "Import an existing project"
3. Connect your Git repository

### Step 2: Build Settings

Configure the following build settings:

- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Node version:** 18 or later

### Step 3: Environment Variables

1. Go to **Site settings** > **Environment variables**
2. Add the following:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
```

### Step 4: Deploy

1. Click "Deploy site"
2. Wait for the build to complete
3. Visit your deployed URL

### Netlify-Specific Configuration

Create a `netlify.toml` file in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"
```

## Other Platforms

### Railway

1. Connect your repository
2. Add environment variables in the Variables tab
3. Railway auto-detects Next.js and deploys

### Render

1. Create a new Web Service
2. Connect repository
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Add environment variables

### GitHub Pages (Static Export)

For static export, update `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

Then:

```bash
npm run build
# Deploy the 'out' directory to GitHub Pages
```

**Note:** Some features like API routes won't work with static export.

## Post-Deployment Checklist

After deploying, verify:

- [ ] Home page loads without errors
- [ ] `/posts` page displays correctly
- [ ] `/write` page loads
- [ ] Can create a new post successfully
- [ ] Posts are saved to Supabase
- [ ] No CORS errors in browser console
- [ ] No RLS policy errors
- [ ] Environment variables are set correctly

## Testing Your Deployment

### 1. Test Read Operations

Visit your deployed site and:
- Navigate to `/posts` 
- Verify posts are displayed
- Open individual post pages

### 2. Test Write Operations

1. Go to `/write`
2. Fill in the form with test data
3. Submit the form
4. Verify:
   - No errors in console
   - Success message appears
   - Redirected to the new post
   - Post appears in `/posts` list

### 3. Test Manage Operations

1. Go to `/manage`
2. Verify posts are listed
3. Try deleting a test post
4. Verify it's removed from the database

## Troubleshooting

### CORS Errors

If you see CORS errors after deployment:

1. **Check RLS Policies**: The most common cause
   ```sql
   -- Verify policies exist
   SELECT * FROM pg_policies WHERE tablename = 'blogs';
   ```

2. **Verify Environment Variables**: 
   - Make sure they're set in your deployment platform
   - Check for typos in variable names
   - Ensure values match your Supabase project

3. **Check Supabase URL**:
   - Should be `https://your-project-id.supabase.co`
   - No trailing slash
   - Uses HTTPS, not HTTP

4. **See Detailed Guide**: Check [CORS_TROUBLESHOOTING.md](./CORS_TROUBLESHOOTING.md)

### Build Failures

**Error: "Missing environment variables"**
- Environment variables are not available during build
- Add them to your deployment platform settings
- For Next.js, public variables must start with `NEXT_PUBLIC_`

**Error: "Module not found"**
- Run `npm install` locally to ensure all dependencies are in package.json
- Delete `node_modules` and `package-lock.json`, then reinstall
- Check for typos in import statements

### Runtime Errors

**Error: "Failed to fetch"**
- Check network tab in browser dev tools
- Verify Supabase URL is correct
- Check Supabase status: https://status.supabase.com/

**Error: "row-level security policy"**
- RLS is enabled but no policy allows the operation
- Add or update RLS policies (see [Supabase Configuration](#supabase-configuration))

## Performance Optimization

### 1. Enable Caching

Add caching headers in your Next.js pages:

```typescript
export const revalidate = 3600; // Revalidate every hour
```

### 2. Optimize Images

Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image 
  src="/path/to/image.jpg" 
  alt="Description"
  width={800}
  height={600}
/>
```

### 3. Use Server Components

Fetch data in Server Components when possible:

```typescript
// app/posts/page.tsx
import { getAllBlogPostsServer } from '@/utils/supabase/blogCrudServer';

export default async function PostsPage() {
  const { data: posts } = await getAllBlogPostsServer();
  // ...
}
```

### 4. Enable Edge Runtime (Optional)

For faster response times:

```typescript
export const runtime = 'edge';
```

## Monitoring and Analytics

### 1. Set Up Error Tracking

Consider adding:
- [Sentry](https://sentry.io/) for error tracking
- [LogRocket](https://logrocket.com/) for session replay
- [Datadog](https://www.datadoghq.com/) for comprehensive monitoring

### 2. Add Analytics

Popular options:
- [Vercel Analytics](https://vercel.com/analytics) (built-in for Vercel)
- [Google Analytics](https://analytics.google.com/)
- [Plausible](https://plausible.io/) (privacy-friendly)

### 3. Monitor Supabase

Check your Supabase dashboard regularly:
- Database usage
- API requests
- Error rates
- Response times

## Security Best Practices

1. ✅ **Never commit `.env.local`** to version control
2. ✅ **Use RLS policies** to protect your data
3. ✅ **Rotate keys** if they're ever exposed
4. ✅ **Use anon key** in client code, never service role key
5. ✅ **Enable HTTPS** on your domain
6. ✅ **Keep dependencies updated** regularly
7. ✅ **Review Supabase logs** for suspicious activity

## Updating Your Deployment

### Automatic Deployments

Most platforms auto-deploy on git push:

1. Make changes locally
2. Commit and push to your repository
3. Deployment platform automatically rebuilds and deploys

### Manual Deployments

If needed, trigger manual deployments in your platform's dashboard.

### Rollback

If something goes wrong:

1. Go to your deployment platform
2. Find previous successful deployment
3. Click "Rollback" or "Redeploy"

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [CORS Troubleshooting Guide](./CORS_TROUBLESHOOTING.md)

## Need Help?

If you're still having issues:

1. Check the [CORS_TROUBLESHOOTING.md](./CORS_TROUBLESHOOTING.md) guide
2. Review [Supabase documentation](https://supabase.com/docs)
3. Check [Next.js deployment docs](https://nextjs.org/docs/deployment)
4. Open an issue in the repository
5. Contact Supabase support if it's a platform issue
