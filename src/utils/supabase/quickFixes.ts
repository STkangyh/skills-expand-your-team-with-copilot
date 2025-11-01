export const QUICK_FIX_STEPS = {
  cors: {
    title: "Fix CORS Error",
    emoji: "🔒",
    steps: [
      "Open Supabase SQL Editor",
      "Run: ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;",
      "Add SELECT policy: CREATE POLICY \"Allow public read\" ON blogs FOR SELECT USING (true);",
      "Add INSERT policy: CREATE POLICY \"Allow public insert\" ON blogs FOR INSERT WITH CHECK (true);",
      "Refresh your browser and try again"
    ],
    learnMore: "/CORS_TROUBLESHOOTING.md"
  },
  rls: {
    title: "Fix RLS Permission Error",
    emoji: "🔐",
    steps: [
      "Open Supabase SQL Editor",
      "Check existing policies: SELECT * FROM pg_policies WHERE tablename = 'blogs';",
      "Add missing policies for INSERT, UPDATE, or DELETE",
      "Or temporarily disable RLS for testing: ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;",
      "⚠️ Remember to re-enable RLS for production!"
    ],
    learnMore: "/CORS_TROUBLESHOOTING.md"
  },
  network: {
    title: "Fix Network Error",
    emoji: "🌐",
    steps: [
      "Check your internet connection",
      "Verify NEXT_PUBLIC_SUPABASE_URL in .env.local",
      "Ensure the URL starts with https://",
      "Check Supabase status at https://status.supabase.com/",
      "Restart your development server"
    ],
    learnMore: "/DEPLOYMENT_GUIDE.md"
  }
};

export const SUPABASE_RLS_POLICIES = {
  development: `
-- Development RLS Policies (Public Access)
-- WARNING: Use only for testing!

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON blogs
  FOR SELECT USING (true);

-- Allow public insert
CREATE POLICY "Allow public insert" ON blogs
  FOR INSERT WITH CHECK (true);

-- Allow public update
CREATE POLICY "Allow public update" ON blogs
  FOR UPDATE USING (true);

-- Allow public delete
CREATE POLICY "Allow public delete" ON blogs
  FOR DELETE USING (true);
`,
  production: `
-- Production RLS Policies (Authenticated Access)
-- Secure policies for production use

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can view posts)
CREATE POLICY "Allow public read access" ON blogs
  FOR SELECT USING (true);

-- Restrict write operations to authenticated users
CREATE POLICY "Allow authenticated insert" ON blogs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON blogs
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON blogs
  FOR DELETE USING (auth.role() = 'authenticated');
`
};

export const ENVIRONMENT_VARIABLES_CHECKLIST = [
  {
    name: "NEXT_PUBLIC_SUPABASE_URL",
    description: "Your Supabase project URL",
    example: "https://abcdefghijklmnop.supabase.co",
    required: true
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    description: "Your Supabase anon/public key",
    example: "eyJhbGc...(long key)",
    required: true
  }
];

export const DEPLOYMENT_CHECKLIST = [
  {
    step: "Create Supabase project",
    done: false,
    description: "Sign up at supabase.com and create a new project"
  },
  {
    step: "Create blogs table",
    done: false,
    description: "Run the SQL schema from README.md"
  },
  {
    step: "Enable RLS policies",
    done: false,
    description: "Run RLS policies from CORS_TROUBLESHOOTING.md"
  },
  {
    step: "Copy environment variables",
    done: false,
    description: "Get URL and anon key from Supabase dashboard"
  },
  {
    step: "Set local environment variables",
    done: false,
    description: "Create .env.local with your credentials"
  },
  {
    step: "Test locally",
    done: false,
    description: "Run npm run dev and test /write page"
  },
  {
    step: "Set deployment environment variables",
    done: false,
    description: "Add variables in Vercel/Netlify/etc."
  },
  {
    step: "Deploy application",
    done: false,
    description: "Deploy to your chosen platform"
  },
  {
    step: "Test deployed application",
    done: false,
    description: "Try creating a post on deployed site"
  }
];
