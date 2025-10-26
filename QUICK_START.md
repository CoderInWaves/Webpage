# ZENTAXA Landing Page - Quick Start Guide

## 🎯 Goal
Push your front-end code to GitHub with CI/CD pipeline for automatic deployment.

## ⚡ Quick Deploy (3 Steps)

### Step 1: Run the Deployment Script

```bash
cd "/home/happy/Desktop/Python all/main_files/Startup/front-end"
./deploy-to-github.sh
```

The script will guide you through:
- Initializing Git repository
- Entering your GitHub username
- Setting repository name
- Committing files
- Pushing to GitHub

### Step 2: Create GitHub Repository (if needed)

If the repository doesn't exist:
1. Go to: https://github.com/new
2. Repository name: `zentaxa-landing-page` (or your choice)
3. Description: `ZENTAXA AI Agent Management Platform - Landing Page`
4. Choose **Public** or **Private**
5. **Do NOT** check "Initialize this repository with a README"
6. Click **"Create repository"**

Then run the script again!

### Step 3: Enable GitHub Pages

1. Go to your repository settings:
   `https://github.com/YOUR_USERNAME/zentaxa-landing-page/settings/pages`
2. Under "Build and deployment":
   - Source: Select **"GitHub Actions"**
3. Click **"Save"**

🎉 Your site will be live at:
`https://YOUR_USERNAME.github.io/zentaxa-landing-page/`

## 📋 What's Included

### Files Created:
- ✅ `README.md` - Comprehensive documentation
- ✅ `DEPLOYMENT.md` - Detailed deployment guide
- ✅ `.github/workflows/deploy.yml` - CI/CD pipeline
- ✅ `.gitignore` - Git ignore rules
- ✅ `deploy-to-github.sh` - Automated deployment script
- ✅ `package.json` - Node.js configuration (optional)
- ✅ `QUICK_START.md` - This file

### CI/CD Pipeline Features:
- 🔄 Auto-deploys on push to `main` branch
- 🚀 GitHub Pages integration
- ⚡ Fast deployment (1-2 minutes)
- 🔒 Secure deployment workflow
- 📊 Deployment status tracking

## 🛠️ Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
cd "/home/happy/Desktop/Python all/main_files/Startup/front-end"

# Initialize Git
git init

# Add files
git add .

# Commit
git commit -m "Initial commit: ZENTAXA landing page"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/zentaxa-landing-page.git

# Push
git branch -M main
git push -u origin main
```

## 🧪 Test Locally First

Before deploying, test locally:

```bash
cd "/home/happy/Desktop/Python all/main_files/Startup/front-end"

# Using Python
python3 -m http.server 8000

# Visit: http://localhost:8000
```

## 🔐 GitHub Authentication

### Using Personal Access Token (Recommended):

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Select scopes:
   - `repo` (all)
   - `workflow`
4. Copy the token
5. When pushing, use token as password:
   - Username: `YOUR_USERNAME`
   - Password: `YOUR_TOKEN`

### Using SSH (Alternative):

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: https://github.com/settings/keys

# Use SSH URL instead
git remote set-url origin git@github.com:YOUR_USERNAME/zentaxa-landing-page.git
```

## 📊 Check Deployment Status

After pushing:

1. Go to: `https://github.com/YOUR_USERNAME/zentaxa-landing-page/actions`
2. You'll see workflow runs
3. Green checkmark = Success ✅
4. Red X = Failed ❌ (click to see logs)

## 🎨 Deployment Options Comparison

| Platform | Speed | SSL | Custom Domain | Cost |
|----------|-------|-----|---------------|------|
| **GitHub Pages** | Fast | ✅ Free | ✅ Free | Free |
| **Netlify** | Very Fast | ✅ Free | ✅ Free | Free tier |
| **Vercel** | Very Fast | ✅ Free | ✅ Free | Free tier |
| **AWS S3** | Fast | 💰 Paid | 💰 Paid | Pay-as-you-go |

### Recommended: Start with GitHub Pages (Free & Easy)

## 🔄 Update Your Site

After initial deployment, updating is easy:

```bash
# Make changes to index.html
nano index.html

# Commit and push
git add .
git commit -m "Update: your changes"
git push

# Site updates automatically via CI/CD! 🎉
```

## ❓ Common Issues & Solutions

### Issue: "Repository not found"
**Solution:** Create the repository on GitHub first (Step 2)

### Issue: "Authentication failed"
**Solution:** Use personal access token instead of password

### Issue: "Push rejected"
**Solution:** Pull latest changes first: `git pull origin main`

### Issue: "Site not updating"
**Solution:** 
1. Check Actions tab for deployment status
2. Clear browser cache
3. Wait 2-3 minutes for deployment

## 📞 Need Help?

- 📧 Email: support@zentaxa.me
- 💼 LinkedIn: [Happy Raj](https://www.linkedin.com/in/happy-raj-63a056248/)
- 📚 Detailed docs: See `DEPLOYMENT.md`

## ✅ Deployment Checklist

Before deploying:
- [ ] Test site locally
- [ ] Update contact information in `index.html`
- [ ] Verify all links work
- [ ] Check mobile responsiveness
- [ ] Update social media links

After deploying:
- [ ] Visit live site URL
- [ ] Test on mobile device
- [ ] Check all features work
- [ ] Verify contact form
- [ ] Test all external links

## 🎉 Ready to Deploy?

Run this command now:

```bash
cd "/home/happy/Desktop/Python all/main_files/Startup/front-end"
./deploy-to-github.sh
```

**Your site will be live in 5 minutes!** 🚀

---

**Need the full documentation?** Check `README.md` and `DEPLOYMENT.md`
