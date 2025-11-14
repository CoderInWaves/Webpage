# 🚀 Quick Start: Deploy to Azure Static Web Apps

## ⚡ 5-Minute Setup

### 1️⃣ Create Azure Static Web App (2 min)

Visit: https://portal.azure.com/#create/Microsoft.StaticApp

**Fill in:**
- Name: `zentaxa-landing-page`
- Plan: **Free**
- GitHub: **Authorize and select your repo**
- Branch: `main`
- App location: `/`

Click **"Review + create"** → **"Create"**

### 2️⃣ Get Deployment Token (30 sec)

In Azure Portal:
1. Go to your new Static Web App
2. Click **"Manage deployment token"**
3. **Copy** the token

### 3️⃣ Add GitHub Secret (1 min)

Visit: https://github.com/CoderInWaves/Webpage/settings/secrets/actions

1. Click **"New repository secret"**
2. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
3. Value: **Paste token**
4. Click **"Add secret"**

### 4️⃣ Deploy! (30 sec)

```bash
cd "/home/happy/Desktop/Python all/main_files/Startup/front-end"

# Commit the new files
git add verify-deployment.sh AZURE_STATIC_WEB_APP_GUIDE.md QUICK_AZURE_START.md
git commit -m "Add Azure deployment verification and guides"

# Push to trigger deployment
git push origin main
```

### 5️⃣ Watch it Deploy (1 min)

**GitHub:** https://github.com/CoderInWaves/Webpage/actions
- Watch the workflow run
- Wait for green ✅

**Azure Portal:** Your Static Web App → Overview
- See deployment status
- Get your live URL: `https://[random-name].azurestaticapps.net`

---

## ✅ Verification Checklist

Before deployment, run:
```bash
./verify-deployment.sh
```

After deployment:
- [ ] Visit your Azure URL
- [ ] Check all sections load
- [ ] Test forms (Tally)
- [ ] Verify social links
- [ ] Test on mobile

---

## 🆘 Quick Troubleshooting

**Deployment failed?**
- Check GitHub Actions logs
- Verify `AZURE_STATIC_WEB_APPS_API_TOKEN` secret exists
- Make sure workflow file is in `.github/workflows/`

**Site not updating?**
- Clear browser cache (Ctrl+Shift+R)
- Check GitHub Actions completed successfully
- Wait 1-2 minutes for CDN propagation

**404 Error?**
- Verify `app_location: "/"` in workflow
- Check files deployed in Azure Portal

---

## 📚 Need More Help?

- Full Guide: `AZURE_STATIC_WEB_APP_GUIDE.md`
- Azure Docs: https://docs.microsoft.com/azure/static-web-apps/
- Support: Azure Portal → Help + support

---

## 🎉 Success!

Your site will be live at:
**`https://[your-app-name].azurestaticapps.net`**

Share it with the world! 🌍
