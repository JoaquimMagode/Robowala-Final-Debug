# Vercel Deployment Guide for Robowala

## Prerequisites
1. GitHub repository with your code
2. Vercel account (https://vercel.com)
3. PostgreSQL database (Neon, Supabase, or Vercel Postgres)

## Step 1: Database Setup
Choose one of these PostgreSQL providers:

### Option A: Vercel Postgres (Recommended)
1. Go to Vercel Dashboard → Storage → Create Database
2. Select "Postgres" 
3. Copy the connection string

### Option B: Neon (Free tier available)
1. Go to https://neon.tech
2. Create account and new project
3. Copy the connection string

### Option C: Supabase
1. Go to https://supabase.com
2. Create new project
3. Go to Settings → Database → Connection string

## Step 2: Deploy to Vercel

### Method 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: robowala-final-debug
# - Directory: ./
# - Override settings? No
```

### Method 2: GitHub Integration
1. Push code to GitHub
2. Go to Vercel Dashboard
3. Click "New Project"
4. Import your GitHub repository
5. Configure as follows:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: (leave default)
   - Output Directory: (leave default)

## Step 3: Environment Variables
In Vercel Dashboard → Project → Settings → Environment Variables, add:

```
DATABASE_URL=your_postgresql_connection_string
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production-make-it-long-and-random
NEXTAUTH_URL=https://your-app-name.vercel.app
```

## Step 4: Database Migration
After first deployment, run database migration:

```bash
# Using Vercel CLI
vercel env pull .env.local
npx prisma db push
npx prisma db seed
```

Or manually run SQL commands in your database provider's console.

## Step 5: Verify Deployment
1. Visit your Vercel app URL
2. Test admin login: `/admin`
3. Check API endpoints work
4. Verify database connections

## Troubleshooting

### Build Errors
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify environment variables are set

### Database Issues
- Verify connection string format
- Check database permissions
- Ensure database is accessible from Vercel

### Authentication Issues
- Verify NEXTAUTH_URL matches your domain
- Check NEXTAUTH_SECRET is set
- Ensure admin user exists in database

## Production Checklist
- [ ] Database connected and migrated
- [ ] Environment variables configured
- [ ] Admin user created
- [ ] SSL certificate active
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled
- [ ] Error monitoring setup

## Custom Domain (Optional)
1. Vercel Dashboard → Project → Settings → Domains
2. Add your domain
3. Configure DNS records as shown
4. Update NEXTAUTH_URL environment variable

Your Robowala e-commerce platform is now live on Vercel!