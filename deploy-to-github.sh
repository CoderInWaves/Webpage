#!/bin/bash

# ZENTAXA Landing Page - GitHub Deployment Script
# This script automates the process of pushing your code to GitHub

set -e  # Exit on error

echo "🚀 ZENTAXA Landing Page - GitHub Deployment"
echo "==========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the correct directory
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ Error: index.html not found!${NC}"
    echo "Please run this script from the front-end directory."
    exit 1
fi

echo -e "${BLUE}📂 Current directory: $(pwd)${NC}"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Error: Git is not installed!${NC}"
    echo "Please install git first: sudo apt-get install git"
    exit 1
fi

echo -e "${GREEN}✅ Git is installed${NC}"

# Check if already initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}🔧 Initializing Git repository...${NC}"
    git init
    echo -e "${GREEN}✅ Git initialized${NC}"
else
    echo -e "${GREEN}✅ Git repository already initialized${NC}"
fi

# Get GitHub username
echo ""
echo -e "${BLUE}Please enter your GitHub username:${NC}"
read -p "Username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo -e "${RED}❌ Error: GitHub username cannot be empty!${NC}"
    exit 1
fi

# Get repository name
echo ""
echo -e "${BLUE}Please enter repository name (default: zentaxa-landing-page):${NC}"
read -p "Repository name: " REPO_NAME
REPO_NAME=${REPO_NAME:-zentaxa-landing-page}

echo ""
echo -e "${YELLOW}🔍 Repository will be: https://github.com/$GITHUB_USERNAME/$REPO_NAME${NC}"
echo ""
read -p "Is this correct? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo -e "${RED}❌ Cancelled by user${NC}"
    exit 1
fi

# Configure git (if not already configured)
if [ -z "$(git config --global user.email)" ]; then
    echo ""
    echo -e "${YELLOW}🔧 Configuring Git...${NC}"
    read -p "Enter your email: " GIT_EMAIL
    read -p "Enter your name: " GIT_NAME
    git config --global user.email "$GIT_EMAIL"
    git config --global user.name "$GIT_NAME"
    echo -e "${GREEN}✅ Git configured${NC}"
fi

# Add all files
echo ""
echo -e "${YELLOW}📦 Adding files to Git...${NC}"
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo -e "${YELLOW}⚠️  No changes to commit${NC}"
else
    # Commit changes
    echo ""
    echo -e "${BLUE}Enter commit message (default: 'Initial commit: ZENTAXA landing page'):${NC}"
    read -p "Commit message: " COMMIT_MSG
    COMMIT_MSG=${COMMIT_MSG:-"Initial commit: ZENTAXA landing page"}
    
    git commit -m "$COMMIT_MSG"
    echo -e "${GREEN}✅ Changes committed${NC}"
fi

# Check if remote already exists
if git remote | grep -q "^origin$"; then
    echo -e "${YELLOW}⚠️  Remote 'origin' already exists. Removing...${NC}"
    git remote remove origin
fi

# Add remote
echo ""
echo -e "${YELLOW}🔗 Adding GitHub remote...${NC}"
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
echo -e "${GREEN}✅ Remote added${NC}"

# Rename branch to main
echo ""
echo -e "${YELLOW}🌿 Ensuring branch is named 'main'...${NC}"
git branch -M main
echo -e "${GREEN}✅ Branch set to 'main'${NC}"

# Push to GitHub
echo ""
echo -e "${YELLOW}🚀 Pushing to GitHub...${NC}"
echo -e "${BLUE}You may be prompted for your GitHub credentials.${NC}"
echo ""

if git push -u origin main; then
    echo ""
    echo -e "${GREEN}================================================${NC}"
    echo -e "${GREEN}✅ SUCCESS! Code pushed to GitHub!${NC}"
    echo -e "${GREEN}================================================${NC}"
    echo ""
    echo -e "${BLUE}📍 Repository URL:${NC}"
    echo "   https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo ""
    echo -e "${BLUE}🌐 To enable GitHub Pages:${NC}"
    echo "   1. Go to: https://github.com/$GITHUB_USERNAME/$REPO_NAME/settings/pages"
    echo "   2. Under 'Build and deployment' → Source: Select 'GitHub Actions'"
    echo "   3. Save changes"
    echo ""
    echo -e "${BLUE}📺 Your site will be live at:${NC}"
    echo "   https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
    echo ""
    echo -e "${GREEN}🎉 Deployment complete!${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}================================================${NC}"
    echo -e "${RED}❌ Push failed!${NC}"
    echo -e "${RED}================================================${NC}"
    echo ""
    echo -e "${YELLOW}Possible reasons:${NC}"
    echo "1. Repository doesn't exist on GitHub"
    echo "   → Create it at: https://github.com/new"
    echo "2. Authentication failed"
    echo "   → Use personal access token instead of password"
    echo "3. No permission to push"
    echo "   → Check repository permissions"
    echo ""
    echo -e "${BLUE}To create repository:${NC}"
    echo "1. Go to: https://github.com/new"
    echo "2. Name: $REPO_NAME"
    echo "3. Description: ZENTAXA AI Agent Management Platform - Landing Page"
    echo "4. Choose Public or Private"
    echo "5. Do NOT initialize with README"
    echo "6. Click 'Create repository'"
    echo ""
    echo "Then run this script again!"
    exit 1
fi
