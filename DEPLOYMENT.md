# ZENTAXA Landing Page - Deployment Guide

## 🚀 Quick GitHub Deployment

### Step 1: Initialize Git Repository

```bash
cd /home/happy/Desktop/Python\ all/main_files/Startup/front-end

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: ZENTAXA landing page"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Repository name: `zentaxa-landing-page` (or your choice)
3. Description: "ZENTAXA AI Agent Management Platform - Landing Page"
4. Choose Public or Private
5. **Do NOT** initialize with README (we already have one)
6. Click "Create repository"

### Step 3: Push to GitHub

```bash
# Add remote (replace with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/zentaxa-landing-page.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## 🔄 CI/CD Pipeline

The `.github/workflows/deploy.yml` file is already configured for automatic deployment.

### GitHub Actions Workflow Features:
- ✅ Auto-deploys on push to `main` branch
- ✅ Deploys to GitHub Pages
- ✅ Manual deployment trigger available
- ✅ Concurrent deployment protection

### Enable GitHub Pages:

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: **GitHub Actions**
4. Save changes

Your site will be live at: `https://YOUR_USERNAME.github.io/zentaxa-landing-page/`

## 🌐 Alternative Deployment Options

### Option 1: Netlify (Recommended for Production)

**Via Drag & Drop:**
1. Visit [Netlify Drop](https://app.netlify.com/drop)
2. Drag the `front-end` folder
3. Get instant HTTPS URL
4. Free custom domain support

**Via Git:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
cd /home/happy/Desktop/Python\ all/main_files/Startup/front-end
netlify deploy --prod
```

**Configuration:**
- Build command: (leave empty)
- Publish directory: `.` or `front-end`
- Auto-deploy on push: Yes

### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /home/happy/Desktop/Python\ all/main_files/Startup/front-end
vercel

# Production deployment
vercel --prod
```

### Option 3: AWS S3 + CloudFront

```bash
# Install AWS CLI
pip install awscli

# Configure AWS
aws configure

# Create S3 bucket
aws s3 mb s3://zentaxa-landing-page

# Enable static website hosting
aws s3 website s3://zentaxa-landing-page --index-document index.html

# Upload files
aws s3 sync . s3://zentaxa-landing-page --acl public-read

# (Optional) Set up CloudFront for CDN
```

## 🔧 Environment Setup

### Local Development Server

**Python (Recommended):**
```bash
cd /home/happy/Desktop/Python\ all/main_files/Startup/front-end
python3 -m http.server 8000
# Visit: http://localhost:8000
```

**Node.js:**
```bash
npx http-server -p 8000
# Visit: http://localhost:8000
```

**PHP:**
```bash
php -S localhost:8000
```

## 📊 CI/CD Pipeline Flow

```
┌─────────────────┐
│  Push to main   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GitHub Actions  │
│   Triggered     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Build Job      │
│ - Checkout code │
│ - Setup Pages   │
│ - Upload files  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Deploy Job     │
│ - Deploy Pages  │
│ - Update URL    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Live Website   │
│   Updated! 🎉   │
└─────────────────┘
```

## 🔐 Security Best Practices

### Before Deploying:

1. **Remove sensitive data:**
   - API keys (if any)
   - Database credentials
   - Internal comments

2. **Verify external links:**
   - Tally form URL
   - Social media links
   - Email addresses

3. **Check SSL/HTTPS:**
   - Always use HTTPS in production
   - Update mixed content warnings

### After Deploying:

1. **Test all features:**
   - Mobile menu
   - Contact form
   - External links
   - Responsive design

2. **Monitor:**
   - GitHub Actions status
   - Deployment logs
   - Website uptime

## 📝 Updating Your Site

### Make Changes Locally:

```bash
# Edit index.html
nano index.html  # or use your preferred editor

# Test locally
python3 -m http.server 8000

# Commit changes
git add .
git commit -m "Update: description of changes"

# Push to GitHub (auto-deploys via CI/CD)
git push origin main
```

### Changes Deploy Automatically:
- Push to `main` → GitHub Actions runs → Site updates
- Typical deployment time: 1-2 minutes

## 🎯 Post-Deployment Checklist

- [ ] Site is live and accessible
- [ ] Mobile responsive design works
- [ ] All links open correctly
- [ ] Contact form submits properly
- [ ] Social media icons link correctly
- [ ] Images/graphics load properly
- [ ] Page load time < 3 seconds
- [ ] HTTPS enabled (green padlock)
- [ ] SEO meta tags present
- [ ] No console errors in browser

## 🐛 Troubleshooting

### Deployment Failed?

**Check GitHub Actions:**
1. Go to repository → Actions tab
2. Click on failed workflow
3. Review error logs
4. Common fixes:
   - Check file paths
   - Verify permissions
   - Ensure `index.html` exists

### Site Not Loading?

**Check GitHub Pages:**
1. Settings → Pages
2. Verify source is set to "GitHub Actions"
3. Check deployment status
4. Wait 5-10 minutes for DNS propagation

### 404 Error?

- Ensure `index.html` is in root of deployment folder
- Check repository settings → Pages → Source
- Verify branch name is correct

## 📞 Support

For deployment issues:
- Email: support@zentaxa.me
- GitHub Issues: Create an issue in your repository
- LinkedIn: [Happy Raj](https://www.linkedin.com/in/happy-raj-63a056248/)

## 🔄 Continuous Improvement

### Regular Maintenance:
- Update dependencies monthly
- Review and update content quarterly
- Monitor performance metrics
- Collect user feedback
- A/B test CTAs

### Performance Monitoring:
- Google Analytics (optional)
- Google Search Console
- Lighthouse CI
- WebPageTest

---

**Ready to Deploy?** Follow Step 1-3 above to get started! 🚀
