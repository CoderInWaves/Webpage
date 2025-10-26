# ZENTAXA Landing Page

A modern, responsive landing page for ZENTAXA - AI Agent Management Platform.

## 🚀 Features

- **Fully Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI/UX** - Built with Tailwind CSS for a professional look
- **Interactive Elements** - Smooth animations and hover effects
- **Performance Optimized** - Fast loading times with inline styles
- **SEO Ready** - Proper meta tags and semantic HTML

## 📋 Requirements

### Minimum Requirements
- A web browser (Chrome, Firefox, Safari, Edge)
- A web server (see options below)

### Development Requirements
- **Python 3.x** (recommended for local development)
- OR **Node.js 14+** (alternative)
- OR any static web server

## 🛠️ Installation & Setup

### Option 1: Python Simple Server (Recommended)

```bash
# Navigate to the project directory
cd front-end

# Start the server
python3 -m http.server 8000

# Open your browser and visit
# http://localhost:8000
```

### Option 2: Node.js http-server

```bash
# Install http-server globally (one time only)
npm install -g http-server

# Navigate to the project directory
cd front-end

# Start the server
http-server -p 8000

# Open your browser and visit
# http://localhost:8000
```

### Option 3: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Your browser will open automatically

## 📁 Project Structure

```
front-end/
├── index.html          # Main landing page
├── README.md          # This file
├── LICENSE            # MIT License
└── .github/
    └── workflows/
        └── deploy.yml # GitHub Actions CI/CD
```

## 🚢 Deployment

### Deploy to Netlify (Recommended - Free)

1. **Via Netlify Drop:**
   - Visit [Netlify Drop](https://app.netlify.com/drop)
   - Drag and drop the `front-end` folder
   - Get instant deployment with custom domain

2. **Via Git:**
   - Connect your GitHub repository
   - Set build settings:
     - Build command: (leave empty)
     - Publish directory: `front-end`
   - Auto-deploys on push

### Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to Settings → Pages
3. Select branch and `/front-end` folder
4. Save and get your URL

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd front-end
vercel
```

## 🔧 Configuration

### Update Contact Information

Edit `index.html` to update:
- Email: Search for `support@zentaxa.me`
- Social media links (YouTube, Instagram, LinkedIn, X, Reddit)
- Demo booking form: `https://tally.so/r/worBQx`

### Customize Branding

- **Colors:** Modify Tailwind classes in `index.html`
- **Logo:** Update the logo text in the navigation
- **Content:** Edit text directly in the HTML file

## 🎨 Design System

### Color Palette
- **Primary:** Blue (`#2563EB`)
- **Accent:** Custom accent color
- **Dark:** Dark backgrounds for sections
- **Success:** Green for positive metrics
- **Warning:** Yellow/Red for alerts

### Typography
- **Font:** System fonts (sans-serif)
- **Headings:** Bold, large sizes
- **Body:** Regular weight, readable sizes

## 🧪 Testing

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Mobile Responsive
- ✅ Mobile (320px - 767px)
- ✅ Tablet (768px - 1023px)
- ✅ Desktop (1024px+)

## 📊 Performance

- **Load Time:** < 2 seconds
- **First Contentful Paint:** < 1 second
- **Lighthouse Score:** 90+

## 🔒 Security

- HTTPS recommended for production
- No sensitive data stored client-side
- External links use `rel="noopener noreferrer"`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a private project. For questions or support, contact:
- Email: support@zentaxa.me
- LinkedIn: [Happy Raj](https://www.linkedin.com/in/happy-raj-63a056248/)

## 🆘 Support

If you encounter any issues:
1. Check browser console for errors
2. Ensure you're using a modern browser
3. Try clearing browser cache
4. Contact support@zentaxa.me

## 📚 Documentation

### Key Features

#### 1. Hero Section
- Eye-catching headline
- Call-to-action button
- Live dashboard preview

#### 2. Problem-Solution Framework
- Visual comparison
- Animated graphics
- Clear value proposition

#### 3. Feature Showcase
- Cost intelligence dashboard
- Real-time metrics
- Agent monitoring

#### 4. Before/After Comparison
- Side-by-side comparison cards
- Highlighted benefits
- Visual metrics

#### 5. Contact Form
- Integrated Tally form
- Professional styling
- Easy lead capture

## 🔄 Updates & Maintenance

### Regular Updates
- Keep Tailwind CDN version current
- Update copyright year annually
- Refresh testimonials and metrics
- Update social media links

### Monitoring
- Check form submissions
- Monitor page load times
- Review user feedback
- Update content as needed

## 🌟 Features Breakdown

### Interactive Elements
- Mobile hamburger menu
- Smooth scroll animations
- Hover effects on cards
- Animated dashboard components

### SEO Optimization
- Semantic HTML5
- Proper meta tags
- Alt text for images
- Structured data ready

### Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader friendly
- High contrast text

## 🚀 Quick Deploy Commands

```bash
# Clone repository
git clone <your-repo-url>
cd front-end

# Local development
python3 -m http.server 8000

# Deploy to Netlify
netlify deploy --prod

# Deploy to Vercel
vercel --prod
```

---

**Built with ❤️ by ZENTAXA Team**

**Version:** 1.0.0  
**Last Updated:** October 2025
