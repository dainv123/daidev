---
sidebar_position: 1
---

# Welcome to daidev Documentation

**daidev** is a multi-tenant portfolio platform designed to showcase themes, blogs, certificates and contact functionality, with future expansion to support theme sales.

## 🚀 Quick Start

### For Beginners
If you're new to the daidev project, start with:

- **[Project Architecture Overview](./overview/project-architecture-overview)** - Project overview
- **[Monorepo Structure Guide](./overview/monorepo-structure-guide)** - Understanding the codebase structure

### For Developers
If you're developing new features:

- **[Auth Implementation Roadmap](./implementation/auth-implementation-roadmap)** - Authentication implementation guide
- **[Admin Dashboard Forms Guide](./implementation/admin-dashboard-forms-guide)** - Building forms in admin dashboard

### For DevOps
If you're responsible for deployment and infrastructure:

- **[Environment Setup Guide](./integrations/web/environment-setup-guide)** - Setup development environment
- **[Cloudinary Upload Process](./integrations/cloudinary-upload-process)** - Image management configuration

## 🏗️ System Architecture

The project consists of 4 main applications:

1. **Next.js Web App** - Public portfolio with Home, About, Certificates, Themes, Blogs, Contact pages
2. **Nuxt.js Theme Detail** - Micro frontend for theme detail pages
3. **React Admin Dashboard** - Admin interface with role-based access
4. **Nest.js Backend** - API and BFF layer with multi-tenancy

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React framework for web app
- **Nuxt.js** - Vue framework for micro frontend
- **React** - UI library for admin dashboard
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

### Backend
- **Nest.js** - Node.js framework
- **MongoDB** - NoSQL database with multi-tenancy
- **JWT** - Authentication and authorization
- **Cloudinary** - Image management
- **Resend** - Email service

### DevOps
- **Monorepo** - Turborepo/Nx
- **Vercel** - Hosting for frontend apps
- **Railway** - Hosting for backend and database

## 📚 Documentation Structure

The documentation is organized into 6 main sections:

1. **[Overview](./overview/)** - Project architecture and goals
2. **[Design](./design/)** - UI/UX design and system architecture
3. **[Implementation](./implementation/)** - Detailed implementation guides
4. **[Integrations](./integrations/)** - API integrations and external services
5. **[Troubleshooting](./troubleshooting/)** - Troubleshooting and fixes
6. **[Workflows](./workflows/)** - Workflows and operational guides

## 🔍 Search

Use the search bar in the top right corner to quickly find the documentation you need.

## 🤝 Contributing

If you find errors or want to improve the documentation, please create an issue or pull request on the GitHub repository.

---

**Start now with [Project Architecture Overview](./overview/project-architecture-overview) to understand the project!**
