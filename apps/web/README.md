# DaiDev Web App

A modern portfolio website built with Next.js 14, featuring a beautiful template design with full API integration.

## 🚀 Features

### ✨ Template Integration
- **Professional Portfolio Design**: Based on a premium HTML template
- **Responsive Layout**: Works perfectly on all devices
- **Smooth Animations**: Typing effects, counters, hover animations
- **Modern UI**: Clean and professional appearance

### 🎯 Core Sections
- **Home**: Hero section with typing animation
- **About**: Professional information and services
- **Portfolio**: Theme showcase with filtering
- **Contact**: Contact form with API integration

### 🔧 Technical Features
- **Next.js 14**: Latest React framework
- **TypeScript**: Type-safe development
- **API Integration**: Real-time data from backend
- **Template Assets**: CSS, JS, images from original template
- **Responsive Design**: Mobile-first approach

## 🛠️ Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 🌐 Access

- **Web App**: http://localhost:3003
- **API**: http://localhost:3001
- **Admin Dashboard**: http://localhost:3002
- **Theme Demo**: http://localhost:3004

## 📁 Project Structure

```
apps/web/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with template assets
│   │   ├── page.tsx            # Main page component
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── Header.tsx          # Sidebar navigation
│   │   ├── HomeSection.tsx     # Hero section
│   │   ├── AboutSection.tsx    # About and services
│   │   ├── PortfolioSection.tsx # Theme showcase
│   │   └── ContactSection.tsx  # Contact form
│   └── types/
│       └── api.ts              # TypeScript interfaces
├── public/
│   └── assets/                 # Template assets
│       ├── css/                # Template CSS files
│       ├── js/                 # Template JS files
│       ├── images/             # Template images
│       └── fonts/              # Template fonts
└── template/                   # Original HTML template
```

## 🎨 Template Features Preserved

### CSS & Styling
- ✅ Bootstrap framework
- ✅ Custom animations (animate.css)
- ✅ Typography and colors
- ✅ Responsive grid system
- ✅ Hover effects and transitions

### JavaScript Functionality
- ✅ Typing animation (typed.js)
- ✅ Portfolio filtering (isotope.js)
- ✅ Lightbox gallery (lightcase.js)
- ✅ Counter animations (stats.js)
- ✅ Smooth scrolling
- ✅ Mobile navigation

### Components
- ✅ Sidebar navigation
- ✅ Hero section with typing
- ✅ Services showcase
- ✅ Portfolio grid with filters
- ✅ Contact form
- ✅ Social media links

## 🔌 API Integration

### Portfolio Section
- Fetches themes from `GET /api/v1/themes`
- Displays themes with filtering
- Click to open theme demo
- Fallback data if API unavailable

### Contact Section
- Submits to `POST /api/v1/contact-messages`
- Form validation
- Success/error messages
- Real-time feedback

## 🎯 Usage

### Navigation
- Use sidebar navigation for desktop
- Mobile header for responsive design
- Smooth scrolling between sections

### Portfolio
- Filter themes by category (React, Next.js, E-commerce)
- Click on theme to view demo
- Lightbox gallery for images

### Contact
- Fill out contact form
- Submit to backend API
- Receive confirmation message

## 🚀 Deployment

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 🔧 Customization

### Colors & Styling
- Edit `src/app/globals.css` for custom styles
- Modify template CSS in `public/assets/css/`
- Update color scheme in CSS variables

### Content
- Update personal information in components
- Modify services in `AboutSection.tsx`
- Add new portfolio items via API

### API Endpoints
- Update API URLs in components
- Modify data structure in `types/api.ts`
- Add new API integrations

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation
- **Tablet**: Responsive grid layout
- **Mobile**: Mobile header with hamburger menu

## 🎨 Theme Integration

The web app successfully integrates the original HTML template while maintaining:
- All visual styling and animations
- JavaScript functionality
- Responsive behavior
- Professional appearance

## 🔗 Related Apps

- **API**: Backend server with Swagger docs
- **Admin**: Dashboard for content management
- **Theme Demo**: Individual theme previews

## 📄 License

This project is part of the DaiDev portfolio system. 