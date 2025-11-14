#!/bin/bash

# Azure Static Web App Deployment Verification Script
echo "🔍 Verifying Azure Static Web App Deployment Setup..."

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

errors=0
warnings=0

echo ""
echo "========================================="
echo "   Azure Static Web App - Pre-Check"
echo "========================================="
echo ""

# Check 1: Verify index.html exists
echo -n "✓ Checking index.html... "
if [ -f "index.html" ]; then
    echo -e "${GREEN}✓ Found${NC}"
else
    echo -e "${RED}✗ Missing index.html${NC}"
    errors=$((errors + 1))
fi

# Check 2: Verify GitHub workflow exists
echo -n "✓ Checking GitHub Actions workflow... "
if [ -f ".github/workflows/azure-static-web-apps.yml" ]; then
    echo -e "${GREEN}✓ Found${NC}"
else
    echo -e "${RED}✗ Missing .github/workflows/azure-static-web-apps.yml${NC}"
    errors=$((errors + 1))
fi

# Check 3: Check for static assets
echo -n "✓ Checking CSS file... "
if [ -f "styles.css" ]; then
    echo -e "${GREEN}✓ Found${NC}"
else
    echo -e "${YELLOW}⚠ Missing styles.css${NC}"
    warnings=$((warnings + 1))
fi

echo -n "✓ Checking JavaScript file... "
if [ -f "script.js" ]; then
    echo -e "${GREEN}✓ Found${NC}"
else
    echo -e "${YELLOW}⚠ Missing script.js${NC}"
    warnings=$((warnings + 1))
fi

# Check 4: Verify HTML syntax
echo -n "✓ Checking HTML structure... "
if grep -q "<!DOCTYPE html>" index.html && grep -q "</html>" index.html; then
    echo -e "${GREEN}✓ Valid${NC}"
else
    echo -e "${RED}✗ Invalid HTML structure${NC}"
    errors=$((errors + 1))
fi

# Check 5: Check for meta tags
echo -n "✓ Checking meta tags... "
if grep -q "<meta name=\"viewport\"" index.html; then
    echo -e "${GREEN}✓ Viewport meta found${NC}"
else
    echo -e "${YELLOW}⚠ Missing viewport meta tag${NC}"
    warnings=$((warnings + 1))
fi

# Check 6: Check for external dependencies
echo -n "✓ Checking external CDN links... "
cdn_count=$(grep -c "cdn\." index.html)
if [ "$cdn_count" -gt 0 ]; then
    echo -e "${BLUE}ℹ Found $cdn_count CDN link(s)${NC}"
else
    echo -e "${GREEN}✓ No CDN dependencies${NC}"
fi

# Check 7: Look for API keys or secrets
echo -n "✓ Scanning for hardcoded secrets... "
if grep -E "(api[_-]?key|secret|password|token)" -i index.html script.js 2>/dev/null | grep -v "placeholder" | grep -q "="; then
    echo -e "${RED}✗ Potential secrets found!${NC}"
    echo -e "${RED}  Remove any hardcoded API keys or secrets${NC}"
    errors=$((errors + 1))
else
    echo -e "${GREEN}✓ No secrets detected${NC}"
fi

# Check 8: Verify file sizes
echo ""
echo "📊 File Size Analysis:"
if [ -f "index.html" ]; then
    size=$(du -h index.html | cut -f1)
    echo "   - index.html: $size"
fi
if [ -f "styles.css" ]; then
    size=$(du -h styles.css | cut -f1)
    echo "   - styles.css: $size"
fi
if [ -f "script.js" ]; then
    size=$(du -h script.js | cut -f1)
    echo "   - script.js: $size"
fi

# Check 9: Git status
echo ""
echo "📦 Git Repository Status:"
if [ -d ".git" ]; then
    echo -e "${GREEN}✓ Git repository initialized${NC}"
    
    # Check if there are uncommitted changes
    if [ -n "$(git status --porcelain)" ]; then
        echo -e "${YELLOW}⚠ Uncommitted changes detected${NC}"
        echo "  Run: git add . && git commit -m 'Update files'"
    else
        echo -e "${GREEN}✓ No uncommitted changes${NC}"
    fi
    
    # Check remote
    if git remote -v | grep -q "origin"; then
        remote_url=$(git remote get-url origin)
        echo -e "${GREEN}✓ Remote configured: $remote_url${NC}"
    else
        echo -e "${YELLOW}⚠ No remote repository configured${NC}"
        echo "  Run: git remote add origin <your-repo-url>"
    fi
else
    echo -e "${RED}✗ Not a git repository${NC}"
    errors=$((errors + 1))
fi

# Summary
echo ""
echo "========================================="
echo "           Summary Report"
echo "========================================="

if [ $errors -eq 0 ] && [ $warnings -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Ready for Azure deployment.${NC}"
    echo ""
    echo -e "${BLUE}📋 Next Steps:${NC}"
    echo ""
    echo "1. Create Azure Static Web App:"
    echo "   https://portal.azure.com/#create/Microsoft.StaticApp"
    echo ""
    echo "2. Get API Token:"
    echo "   - Go to your Static Web App in Azure Portal"
    echo "   - Click 'Manage deployment token'"
    echo "   - Copy the token"
    echo ""
    echo "3. Add GitHub Secret:"
    echo "   - Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions"
    echo "   - Click 'New repository secret'"
    echo "   - Name: AZURE_STATIC_WEB_APPS_API_TOKEN"
    echo "   - Value: [paste the token]"
    echo ""
    echo "4. Push to GitHub:"
    echo "   git add ."
    echo "   git commit -m 'Ready for Azure deployment'"
    echo "   git push origin main"
    echo ""
    echo "5. Monitor deployment:"
    echo "   - GitHub: Actions tab in your repository"
    echo "   - Azure Portal: Check deployment status"
    echo ""
    exit 0
elif [ $errors -eq 0 ]; then
    echo -e "${YELLOW}⚠ $warnings warning(s) found, but deployment can proceed.${NC}"
    echo ""
    echo -e "${BLUE}Warnings are non-critical. Review them if needed.${NC}"
    exit 0
else
    echo -e "${RED}❌ Found $errors error(s) and $warnings warning(s).${NC}"
    echo -e "${RED}Please fix errors before deployment.${NC}"
    echo ""
    exit 1
fi
