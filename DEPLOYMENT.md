# Cloudflare Pages Deployment Guide

## Important: This is a Static Site, NOT a Cloudflare Workers Project

Your portfolio is a **static Vite application** that should be deployed as a **Cloudflare Pages** project, not using Wrangler (which is for Cloudflare Workers).

## Deployment Configuration

### Framework Preset
- **Framework preset:** `None` or `Vite`
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (leave blank or use root)

### Node.js Version
- Node.js version: **20** (specified in `.node-version`)

## Step-by-Step Deployment

1. **Go to Cloudflare Pages Dashboard**
   - Navigate to: https://dash.cloudflare.com/
   - Click on "Workers & Pages" in the sidebar
   - Click "Create application" → "Pages" tab

2. **Connect Your Repository**
   - Click "Connect to Git"
   - Authorize Cloudflare to access your GitHub/GitLab
   - Select your repository: `haikaitech-portfolio`

3. **Configure Build Settings**
   ```
   Production branch: main (or your default branch)
   Build command: npm run build
   Build output directory: dist
   ```

4. **Environment Variables** (Optional)
   - If you need `GEMINI_API_KEY`, add it in the environment variables section
   - For a static portfolio, you likely don't need any environment variables

5. **Deploy**
   - Click "Save and Deploy"
   - Cloudflare will automatically build and deploy your site
   - You'll get a URL like: `your-project.pages.dev`

## Common Issues

### ❌ "Wrangler requires Node.js v20" Error
**Cause:** Cloudflare is trying to use Wrangler (Workers deployment) instead of Pages (static site deployment)

**Solution:** 
- Make sure you're creating a **Pages** project, not a Workers project
- In the Cloudflare dashboard, use "Workers & Pages" → "Create" → "Pages" tab
- Do NOT use a `wrangler.toml` file (this is for Workers only)

### ❌ Build Command Not Found
**Cause:** Build command is incorrect

**Solution:**
- Use exactly: `npm run build`
- Make sure "Build output directory" is set to: `dist`

### ❌ Assets Not Loading
**Cause:** Incorrect asset paths

**Solution:**
- Already fixed! All asset paths use relative URLs (no leading slashes)
- The `_redirects` file handles SPA routing

## Verify Your Setup

Before deploying, verify locally:

```bash
# Build the production version
npm run build

# Preview the production build
npm run preview
```

Open the preview URL and check:
- ✅ All images load correctly
- ✅ Navigation works
- ✅ No console errors
- ✅ Favicon appears

## After Deployment

Once deployed, your site will be available at:
- Production: `https://your-project.pages.dev`
- You can also add a custom domain in Cloudflare Pages settings

### Automatic Deployments
- Every push to your main branch will trigger a new deployment
- Preview deployments are created for pull requests
- You can see deployment history in the Cloudflare dashboard

## Need Help?

If you're still seeing the Wrangler error:
1. Double-check you're using **Cloudflare Pages**, not Workers
2. Make sure there's no `wrangler.toml` file in your project
3. The build command should be `npm run build`, NOT `npx wrangler deploy`

Your project is correctly configured for Cloudflare Pages static site deployment! 🚀
