---
layout: home
hero:
  name: daidev Documentation
  text: Documentation for multi-tenant portfolio platform
  tagline: Detailed guides for architecture, implementation and system integration
  actions:
    - theme: brand
      text: Get Started
      link: /01-overview/
    - theme: alt
      text: View on GitHub
      link: https://github.com/your-username/daidev

features:
  - icon: 🏗️
    title: System Architecture
    details: Learn about system architecture, tech stack and monorepo structure of the daidev project
  - icon: 🎨
    title: System Design
    details: UI/UX design guides for admin dashboard, frontend web app and backend API
  - icon: ⚡
    title: Quick Implementation
    details: Detailed guides for implementing features and system integration
  - icon: 🔧
    title: Easy Integration
    details: Documentation for JWT auth, Cloudinary, Resend email and third-party service integrations
  - icon: 🐛
    title: Troubleshooting
    details: Guides for fixing common errors and troubleshooting
  - icon: 📋
    title: Workflows
    details: Development, deployment and operational procedures

---

## 🚀 Quick Start

### For Beginners
If you're new to the daidev project, start with:

- **[System Architecture](/01-overview/project-architecture-overview)** - Project overview
- **[Monorepo Structure](/01-overview/monorepo-structure-guide)** - Understanding the codebase structure

### For Developers
If you're developing new features:

- **[Auth Implementation Roadmap](/03-implementation/auth-implementation-roadmap)** - Authentication implementation guide
- **[Admin Dashboard Forms Guide](/03-implementation/admin-dashboard-forms-guide)** - Building forms in admin dashboard

### For DevOps
If you're responsible for deployment and infrastructure:

- **[Environment Setup Guide](/04-integrations/web/environment-setup-guide)** - Setup development environment
- **[Cloudinary Upload Process](/04-integrations/cloudinary-upload-process)** - Image management configuration

## 📚 Documentation Structure

The documentation is organized into 6 main sections:

### 1. **01-overview/** - Project overview and architecture
- [Project Architecture Overview](/01-overview/project-architecture-overview) - High-level system architecture
- [Monorepo Structure Guide](/01-overview/monorepo-structure-guide) - Detailed codebase structure
- [README](/01-overview/README) - Overview section introduction

### 2. **02-design/** - UI/UX design and system architecture
- [Admin Dashboard UI Design](/02-design/admin-dashboard-ui-design) - Admin interface design
- [Backend API Architecture](/02-design/backend-api-architecture) - API design patterns
- [Frontend Web App Design](/02-design/frontend-web-app-design) - Web app design principles

### 3. **03-implementation/** - Detailed implementation guides
- [Admin Dashboard Forms Guide](/03-implementation/admin-dashboard-forms-guide) - Form implementation
- [Auth Implementation Roadmap](/03-implementation/auth-implementation-roadmap) - Authentication setup
- [Cloudinary Image System](/03-implementation/cloudinary-image-system) - Image management
- [Multi-tenant Data Architecture](/03-implementation/multi-tenant-data-architecture) - Data isolation

### 4. **04-integrations/** - API integrations and third-party services
- [JWT Auth Authorization Guide](/04-integrations/jwt-auth-authorization-guide) - Authentication system
- [Cloudinary Upload Process](/04-integrations/cloudinary-upload-process) - Image upload workflow
- [Resend Email Workflow](/04-integrations/resend-email-workflow) - Email service integration
- [Snyk vs Codacy](/04-integrations/snyk-vs-codacy) - Security scanning tools
- [Docker Containerization Guide](/04-integrations/docker-containerization-guide) - Docker setup and deployment
- [Environment Setup Guide](/04-integrations/environment-setup-guide) - Environment configuration
- [API Documentation Guide](/04-integrations/api-documentation-guide) - API docs and testing

#### Web App Integrations
- [Environment Setup Guide](/04-integrations/web/environment-setup-guide) - Development environment
- [Internationalization Setup](/04-integrations/web/internationalization-setup) - i18n configuration
- [Next.js Routing Configuration](/04-integrations/web/nextjs-routing-configuration) - Routing setup
- [Home Page API Integration](/04-integrations/web/home-page-api-integration) - Home page data
- [About Page API Integration](/04-integrations/web/about-page-api-integration) - About page data
- [Header Component API Integration](/04-integrations/web/header-component-api-integration) - Header data

#### AI & BFF Integrations
- [AI Integration Guide](/04-integrations/ai/) - AI service integrations
- [BFF (Backend for Frontend)](/04-integrations/bff/) - BFF architecture

### 5. **05-troubleshooting/** - Error handling and troubleshooting
- [Admin Import Functionality Fix](/05-troubleshooting/admin-import-functionality-fix) - Import issues
- [Admin Routing Issues Fix](/05-troubleshooting/admin-routing-issues-fix) - Routing problems
- [Common Error Solutions](/05-troubleshooting/) - General troubleshooting

### 6. **06-workflows/** - Workflows and operational procedures
- [Development Workflows](/06-workflows/) - Development procedures
- [Deployment Workflows](/06-workflows/deployment-workflows) - Complete deployment guide

## 🏗️ Apps Structure

The daidev project consists of the following applications:

### **apps/web/** - Next.js Public Web App
- Portfolio website with Home, About, Certificates, Themes, Blogs, and Contact pages
- Supports i18n (English/Vietnamese) and dark/light mode
- Responsive design with Tailwind CSS

### **apps/admin/** - React Admin Dashboard
- Secure content management interface
- Role-based access (admin/viewer)
- CRUD operations for themes, blogs, certificates, tags, images, site settings

### **apps/api/** - Nest.js Backend API
- REST API endpoints for all data operations
- Multi-tenant data isolation with `tenantId`
- MongoDB integration with Mongoose
- Cloudinary and Resend integrations

### **apps/theme-detail/** - Nuxt.js Theme Detail Micro Frontend
- Micro frontend for theme detail pages
- Integrated via Module Federation
- Fetches theme data from backend

### **apps/docs/** - Documentation Site
- Docusaurus-based documentation
- Comprehensive guides and tutorials
- API reference and integration docs

### **apps/swagger-proxy/** - API Documentation Proxy
- Swagger UI for API documentation
- API testing interface

### **apps/assets/** - Static Assets
- File storage (CV, templates, themes)
- Image assets for themes and portfolio
- Web assets and templates

## 🔍 Search

Use the search bar in the top right corner to quickly find the documentation you need.

## 🤝 Contributing

If you find errors or want to improve the documentation, please create an issue or pull request on the GitHub repository. 