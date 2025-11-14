# Azure Static Web App - Complete Deployment Guide

## 🚀 Overview

This guide will help you deploy your ZENTAXA landing page to Azure Static Web Apps using GitHub Actions CI/CD pipeline.

## ✅ Pre-Deployment Checklist

Run the verification script first:
```bash
chmod +x verify-deployment.sh
./verify-deployment.sh
```

## 📋 Step-by-Step Deployment

### Step 1: Create Azure Static Web App

**Option A: Using Azure Portal (Recommended)**

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"**
3. Search for **"Static Web App"**
4. Click **"Create"**

**Configure the Static Web App:**
```
Subscription: [Your subscription]
Resource Group: [Create new or select existing]
Name: zentaxa-landing-page
Plan type: Free
Region: [Choose closest to your users]
```

**GitHub Integration:**
```
Sign in to GitHub: [Authorize Azure]
Organization: [Your GitHub username]
Repository: [Select your repo]
Branch: main
```

**Build Details:**
```
Build Presets: Custom
App location: /
API location: (leave empty)
Output location: (leave empty)
```

5. Click **"Review + create"**
6. Click **"Create"**

**Option B: Using Azure CLI**

```bash
# Login to Azure
az login

# Create resource group
az group create --name zentaxa-rg --location "East US"

# Create Static Web App
az staticwebapp create \
  --name zentaxa-landing-page \
  --resource-group zentaxa-rg \
  --source https://github.com/YOUR_USERNAME/YOUR_REPO \
  --location "East US" \
  --branch main \
  --app-location "/" \
  --login-with-github
```

### Step 2: Get Deployment Token

**Method 1: Azure Portal**
1. Go to your Static Web App resource
2. Click **"Manage deployment token"** (in Overview)
3. Copy the token

**Method 2: Azure CLI**
```bash
az staticwebapp secrets list \
  --name zentaxa-landing-page \
  --resource-group zentaxa-rg \
  --query "properties.apiKey" -o tsv
```

### Step 3: Add GitHub Secret

1. Go to your GitHub repository
2. Navigate to: **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Enter:
   - **Name:** `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - **Value:** [Paste the deployment token]
5. Click **"Add secret"**

### Step 4: Verify GitHub Workflow

Your workflow file `.github/workflows/azure-static-web-apps.yml` should look like this:

```yaml
name: Deploy to Azure Static Web Apps

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
          lfs: false
      
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          api_location: ""
          output_location: ""
          skip_app_build: true

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          action: "close"
```

### Step 5: Deploy to Azure

**Push to GitHub:**
```bash
# Make sure all changes are committed
git status

# If there are uncommitted changes
git add .
git commit -m "Ready for Azure Static Web App deployment"

# Push to main branch (triggers deployment)
git push origin main
```

### Step 6: Monitor Deployment

**Check GitHub Actions:**
1. Go to your GitHub repository
2. Click **"Actions"** tab
3. Watch the deployment workflow
4. Wait for green checkmark ✅

**Check Azure Portal:**
1. Go to your Static Web App in Azure Portal
2. Click **"GitHub Action runs"** in the left menu
3. Monitor deployment status
4. Once complete, click **"Browse"** to view your site

## 🌐 Your Website URL

After successful deployment, your site will be available at:
```
https://[random-name].azurestaticapps.net
```

You can find the exact URL in:
- Azure Portal → Your Static Web App → Overview → URL
- GitHub Actions → Deployment logs → "View deployment" link

## 🎯 Custom Domain Setup (Optional)

### Add Custom Domain:

1. Azure Portal → Your Static Web App
2. Click **"Custom domains"** in left menu
3. Click **"+ Add"**
4. Choose domain type:
   - **CNAME** (subdomain): `www.yourdomain.com`
   - **Apex** (root domain): `yourdomain.com`

5. Add DNS records at your domain provider:

**For CNAME (subdomain):**
```
Type: CNAME
Name: www
Value: [your-app].azurestaticapps.net
TTL: 3600
```

**For Apex (root domain):**
```
Type: TXT
Name: @
Value: [validation-code-from-azure]
TTL: 3600

Type: ALIAS or A
Name: @
Value: [ip-from-azure]
TTL: 3600
```

6. Click **"Validate"** in Azure Portal
7. Wait for DNS propagation (5-60 minutes)
8. SSL certificate auto-generated

## 🔧 Configuration Options

### Environment Variables

Add environment variables in Azure Portal:
1. Static Web App → Configuration
2. Click **"+ Add"**
3. Enter Name and Value
4. Click **"Save"**

### Custom Headers

Create `staticwebapp.config.json` in your root:
```json
{
  "globalHeaders": {
    "content-security-policy": "default-src 'self' https:;",
    "x-frame-options": "DENY",
    "x-content-type-options": "nosniff"
  },
  "routes": [
    {
      "route": "/*",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    }
  ]
}
```

### Authentication (Optional)

Add authentication providers:
```json
{
  "auth": {
    "identityProviders": {
      "azureActiveDirectory": {
        "registration": {
          "openIdIssuer": "https://login.microsoftonline.com/[tenant-id]",
          "clientIdSettingName": "AAD_CLIENT_ID",
          "clientSecretSettingName": "AAD_CLIENT_SECRET"
        }
      }
    }
  }
}
```

## 📊 Monitoring & Analytics

### View Metrics:

1. Azure Portal → Your Static Web App
2. Click **"Metrics"** in left menu
3. View:
   - Request count
   - Bandwidth usage
   - Response times
   - Error rates

### Application Insights (Optional):

```bash
az monitor app-insights component create \
  --app zentaxa-insights \
  --location "East US" \
  --resource-group zentaxa-rg
```

## 🔍 Troubleshooting

### Deployment Fails

**Check GitHub Actions logs:**
```
GitHub → Actions → Failed workflow → View logs
```

**Common issues:**
- Missing `AZURE_STATIC_WEB_APPS_API_TOKEN` secret
- Incorrect `app_location` in workflow
- Branch name mismatch

**Fix:**
```bash
# Verify secret exists
# GitHub → Settings → Secrets → AZURE_STATIC_WEB_APPS_API_TOKEN

# Check branch name
git branch --show-current

# Trigger manual deployment
# GitHub → Actions → Deploy to Azure Static Web Apps → Run workflow
```

### Site Not Loading

**Clear cache:**
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

**Check browser console:**
```
F12 → Console tab → Look for errors
```

**Verify files deployed:**
```
Azure Portal → Static Web App → Functions and routing → Files
```

### 404 Errors

**For SPAs, add to `staticwebapp.config.json`:**
```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/static/*", "/*.{css,js,png,jpg,jpeg,gif,svg,ico}"]
  }
}
```

## 🛡️ Security Best Practices

1. **Enable HTTPS Only:**
   - Azure Static Web Apps enforces HTTPS by default ✅

2. **Add Security Headers:**
   ```json
   {
     "globalHeaders": {
       "X-Frame-Options": "DENY",
       "X-Content-Type-Options": "nosniff",
       "Referrer-Policy": "strict-origin-when-cross-origin",
       "Permissions-Policy": "geolocation=(), microphone=(), camera=()"
     }
   }
   ```

3. **Content Security Policy:**
   - Add CSP headers to prevent XSS attacks

4. **Regular Updates:**
   - Keep dependencies updated
   - Monitor GitHub security alerts

## 💰 Cost Optimization

**Free Tier Includes:**
- ✅ 100 GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Custom domains

**Standard Tier:** ($9/month per app)
- 100 GB bandwidth + $0.20/GB
- SLA 99.95%
- More staging environments

## 📞 Support Resources

- **Azure Documentation:** https://docs.microsoft.com/azure/static-web-apps/
- **GitHub Actions:** https://docs.github.com/actions
- **Azure Portal:** https://portal.azure.com
- **Azure CLI Docs:** https://docs.microsoft.com/cli/azure/

## 🚀 Quick Commands Reference

```bash
# View deployment status
az staticwebapp show \
  --name zentaxa-landing-page \
  --resource-group zentaxa-rg

# List all static web apps
az staticwebapp list --resource-group zentaxa-rg

# Delete static web app
az staticwebapp delete \
  --name zentaxa-landing-page \
  --resource-group zentaxa-rg

# Get deployment token
az staticwebapp secrets list \
  --name zentaxa-landing-page \
  --resource-group zentaxa-rg

# View logs
az staticwebapp logs show \
  --name zentaxa-landing-page \
  --resource-group zentaxa-rg
```

## ✅ Post-Deployment Checklist

- [ ] Site loads successfully
- [ ] All pages working correctly
- [ ] Forms submitting properly
- [ ] Images loading
- [ ] CSS styles applied
- [ ] JavaScript functioning
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Custom domain configured (if applicable)
- [ ] Analytics tracking working
- [ ] Social media links verified
- [ ] Contact information correct

## 🎉 Success!

Your ZENTAXA landing page is now live on Azure Static Web Apps with:
- ✅ Automatic CI/CD from GitHub
- ✅ Free SSL/HTTPS
- ✅ Global CDN distribution
- ✅ 99.95% uptime SLA (Standard tier)
- ✅ Instant rollback capability

**Share your live URL:** `https://[your-app].azurestaticapps.net`
