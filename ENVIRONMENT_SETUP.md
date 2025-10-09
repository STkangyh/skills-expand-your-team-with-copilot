# Environment Variables Setup Guide

## Quick Start

A `.env.local` file has been created in the root directory of this project. This file contains the environment variables needed for Supabase integration.

## Required Environment Variables

The following environment variables are required for the application to work with Supabase:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## How to Get Your Supabase Credentials

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to Settings > API
4. Copy the following values:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon/Public Key** → Use for `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## Update Your .env.local File

Replace the placeholder values in `.env.local` with your actual Supabase credentials:

```bash
# Before
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

# After (example - use your actual values)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...your-actual-key
```

## Important Notes

- ✅ The `.env.local` file is already created and git-ignored for security
- ⚠️ Never commit `.env.local` to version control
- ⚠️ The placeholder values will not work - you must replace them with your actual Supabase credentials
- 🔄 After updating `.env.local`, restart your development server (`npm run dev`)

## Troubleshooting

### Still seeing "Missing Supabase environment variables" error?

1. Verify `.env.local` exists in the project root directory
2. Check that the values are not the placeholders
3. Restart your development server
4. Clear the Next.js cache: `rm -rf .next`

### Variables not being loaded?

- Ensure the file is named exactly `.env.local` (not `.env` or `.env.development`)
- Check that the variables start with `NEXT_PUBLIC_` prefix
- Verify there are no extra spaces or quotes around the values

## For Different Environments

- **Development**: `.env.local` (this file)
- **Production**: Set environment variables in your deployment platform (Vercel, Netlify, etc.)
- **CI/CD**: Set as repository secrets or environment variables in your CI/CD platform

## Security Best Practices

- Use the Anon/Public key for client-side code (already configured)
- Never expose your Service Role key in client-side code
- Rotate your keys if they're ever exposed publicly
- Use Row Level Security (RLS) policies in Supabase for data protection
