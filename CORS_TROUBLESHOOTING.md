# CORS Troubleshooting Guide

## Understanding the CORS Error

If you see an error like this in your browser console:

```
Access to fetch at 'https://qlpuksmjgytqeizhsmql.supabase.co/rest/v1/blogs?select=*' 
from origin 'https://skills-expand-your-team-with-copilo.vercel.app' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

This means your Supabase project is not configured to accept requests from your deployed application domain.

## What is CORS?

CORS (Cross-Origin Resource Sharing) is a security feature that prevents web pages from making requests to a different domain than the one that served the page. Supabase enforces CORS policies to protect your API.

## Quick Fix

### Solution 1: Update Supabase CORS Settings (Recommended)

**Note:** As of recent Supabase updates, the CORS settings are automatically configured to allow all origins (`*`) for the anon key. If you're still experiencing CORS issues, try the following:

1. **Verify Your Supabase URL**
   - Go to your Supabase project: https://supabase.com/dashboard
   - Navigate to **Settings** > **API**
   - Verify the **Project URL** matches what you have in your `.env.local` file
   - The URL should look like: `https://your-project-id.supabase.co`

2. **Check Your API Keys**
   - Make sure you're using the **anon/public key**, not the service role key
   - The anon key is safe to use in client-side code
   - Verify the key in your `.env.local` matches the one in Supabase dashboard

3. **Verify Row Level Security (RLS) Policies**
   
   The CORS error might actually be masking an RLS permissions issue. Check your RLS policies:
   
   ```sql
   -- Check if RLS is enabled
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE tablename = 'blogs';
   
   -- View existing policies
   SELECT * FROM pg_policies WHERE tablename = 'blogs';
   ```

4. **Add/Update RLS Policies for Public Access**
   
   If you want public read access and authenticated write access:
   
   ```sql
   -- Enable RLS on the blogs table
   ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
   
   -- Allow public read access (SELECT)
   CREATE POLICY "Allow public read access" ON blogs
     FOR SELECT USING (true);
   
   -- Allow anyone to insert (for development/testing)
   -- Note: In production, you might want to restrict this to authenticated users
   CREATE POLICY "Allow public insert" ON blogs
     FOR INSERT WITH CHECK (true);
   
   -- Allow anyone to update (for development/testing)
   CREATE POLICY "Allow public update" ON blogs
     FOR UPDATE USING (true);
   
   -- Allow anyone to delete (for development/testing)
   CREATE POLICY "Allow public delete" ON blogs
     FOR DELETE USING (true);
   ```

   **Security Note:** The above policies allow public access for testing. In production, you should restrict INSERT, UPDATE, and DELETE to authenticated users:
   
   ```sql
   -- Production-ready policies (authenticated users only for writes)
   CREATE POLICY "Allow authenticated insert" ON blogs
     FOR INSERT WITH CHECK (auth.role() = 'authenticated');
   
   CREATE POLICY "Allow authenticated update" ON blogs
     FOR UPDATE USING (auth.role() = 'authenticated');
   
   CREATE POLICY "Allow authenticated delete" ON blogs
     FOR DELETE USING (auth.role() = 'authenticated');
   ```

### Solution 2: Disable RLS (Not Recommended for Production)

If you're just testing and want to bypass RLS entirely:

```sql
ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;
```

**Warning:** This makes your table completely public and anyone can read/write/delete data. Only use this for development/testing!

### Solution 3: Update Environment Variables

Ensure your environment variables are correctly set:

1. **Local Development** (`.env.local`):
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
   ```

2. **Vercel Deployment**:
   - Go to your Vercel project dashboard
   - Navigate to **Settings** > **Environment Variables**
   - Add both variables:
     - `NEXT_PUBLIC_SUPABASE_URL`: your Supabase URL
     - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: your anon/public key
   - Redeploy your application

3. **Other Platforms** (Netlify, GitHub Pages, etc.):
   - Add the environment variables in your platform's settings
   - Make sure the variables are available at build time
   - Redeploy your application

## Debugging Steps

### 1. Check Browser Console

Open your browser's Developer Tools (F12) and check the Console tab for detailed error messages.

### 2. Verify Network Request

In the Network tab:
- Look for requests to your Supabase URL
- Check the response headers
- Look for CORS-related headers like `Access-Control-Allow-Origin`

### 3. Test with cURL

Test your Supabase endpoint directly:

```bash
curl -X GET 'https://your-project-id.supabase.co/rest/v1/blogs?select=*' \
  -H "apikey: your-anon-key" \
  -H "Authorization: Bearer your-anon-key"
```

If this works but the browser request doesn't, it's definitely a CORS issue.

### 4. Check RLS Policies

In Supabase SQL Editor:

```sql
-- Check which policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'blogs';
```

### 5. Test RLS Policies

Try to read data with the anon key:

```sql
-- This simulates what your app does
SET ROLE anon;
SELECT * FROM blogs;
RESET ROLE;
```

## Common Issues and Solutions

### Issue: "Failed to load resource: net::ERR_FAILED"

**Cause:** The request failed before it even reached the server.

**Solutions:**
1. Check your internet connection
2. Verify the Supabase URL is correct
3. Check if Supabase is experiencing downtime: https://status.supabase.com/

### Issue: CORS error only on deployed site, not locally

**Cause:** Environment variables are not set in your deployment platform.

**Solution:**
1. Add environment variables to your deployment platform (Vercel, Netlify, etc.)
2. Make sure to use the exact same keys from `.env.local`
3. Redeploy your application

### Issue: CORS error on specific routes only

**Cause:** RLS policies might be blocking certain operations.

**Solution:**
1. Check your RLS policies for the specific operation (SELECT, INSERT, UPDATE, DELETE)
2. Make sure you have a policy for the operation you're trying to perform
3. Verify the policy condition allows the request

### Issue: "row-level security policy" error

**Cause:** RLS is enabled but no policy allows the operation.

**Solution:**
1. Add appropriate RLS policies (see Solution 1 above)
2. Or temporarily disable RLS for testing (see Solution 2 above)

## Testing Your Fix

After applying the fixes:

1. **Clear Browser Cache**
   - Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Or clear cache in browser settings

2. **Test Locally**
   ```bash
   npm run dev
   ```
   - Visit http://localhost:3000/write
   - Try creating a post
   - Check for errors in console

3. **Test Deployed Site**
   - Redeploy your application
   - Visit your deployed URL
   - Try creating a post
   - Check for errors in console

## Still Having Issues?

If you're still experiencing CORS errors after trying all the above:

1. **Check Supabase Status**: https://status.supabase.com/
2. **Review Supabase Logs**: In your Supabase dashboard, check the Logs section
3. **Contact Support**: Open an issue in this repository or reach out to Supabase support

## Best Practices

1. **Use Environment Variables**: Never hardcode your Supabase credentials
2. **Use RLS in Production**: Always enable RLS and create appropriate policies
3. **Test Locally First**: Test your changes locally before deploying
4. **Monitor Errors**: Set up error monitoring (e.g., Sentry) to catch issues early
5. **Keep Dependencies Updated**: Regularly update `@supabase/supabase-js` and related packages

## Additional Resources

- [Supabase CORS Documentation](https://supabase.com/docs/guides/api/cors)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Understanding CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
