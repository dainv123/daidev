# daidev Project Overview

**daidev** is a multi-tenant portfolio platform designed to showcase personal themes, blogs, certificates, and contact functionality, with future expansion to support theme sales. It includes a public web app, an admin dashboard, and a robust backend, all built with modern technologies to ensure scalability, modularity, and user-friendly design.

## Project Goals
- **Public Web App**: A profile-like portfolio with sections for Home, About, Certificates, Themes, Blogs, and Contact, supporting English and Vietnamese (i18n).
- **Admin Dashboard**: A secure interface for managing user-generated content (themes, blogs, certificates, images, tags, and site settings).
- **Multi-Tenancy**: Isolated data per user/tenant, ensuring privacy and scalability.
- **Extensibility**: Prepare for future features like bookmarking, liking, searching, and a theme marketplace.
- **Modern UI**: Minimal, responsive design with dark/light mode support.

## Tech Stack
### Backend
- **Nest.js**: API and Backend-for-Frontend (BFF) layer, supporting REST or GraphQL.
- **MongoDB**: Multi-tenant data storage with tenantId-based isolation.
- **Resend**: Email service for contact form submissions, protected by reCAPTCHA.
- **Cloudinary**: Image storage and management for themes, blogs, certificates, and avatars.

### Frontend
- **Public Web App**:
  - **Next.js**: Main framework for the portfolio, handling pages like Home, About, Certificates, Themes, Blogs, and Contact.
  - **Nuxt.js**: Micro Frontend for rendering Theme Detail pages, integrated via Module Federation.
  - **i18n**: Supports English and Vietnamese via libraries like `next-i18next`.
- **Admin Dashboard**:
  - **React + Tailwind CSS**: For building a responsive, modular dashboard.
  - **Auth.js**: Authentication with role-based access (admin, viewer).

### DevOps / Tooling
- **Monorepo**: Managed with Turborepo or Nx for organizing Next.js, Nuxt.js, React Admin, and Nest.js codebases.
- **Hosting**:
  - Vercel: Hosts Next.js (Web App), Nuxt.js (Theme Detail), and React (Admin Dashboard).
  - Railway: Hosts Nest.js backend and MongoDB Atlas.
- **CI/CD**: GitHub Actions for automated builds, tests, and deployments (optional).
- **Image Management**: Cloudinary SDK for uploads and transformations.

## Architecture
### High-Level Structure
- **Frontend (Next.js Web App)**: Serves the public portfolio, rendering pages and embedding Nuxt.js for Theme Detail via Module Federation.
- **Frontend (Nuxt.js Sub-project)**: Handles Theme Detail pages, integrated as a Micro Frontend.
- **Frontend (React Admin Dashboard)**: Provides a secure interface for content management, styled with Tailwind CSS.
- **Backend (Nest.js)**: Exposes APIs (REST or GraphQL) for CRUD operations, image uploads, and email sending.
- **Database (MongoDB)**: Stores isolated tenant data across collections (Users, Themes, Blogs, Certificates, Tags, Images, ContactMessages, SiteSettings).
- **External Services**:
  - **Cloudinary**: Stores and serves images.
  - **Resend**: Sends emails from the Contact form, protected by reCAPTCHA.
  - **Auth.js**: Manages authentication for the Admin Dashboard.

### Data Flow
1. **User Interaction (Public Web App)**:
   - Users visit the portfolio (Next.js) to view Home, About, Certificates, Themes, or Blogs.
   - Theme Detail pages are rendered by Nuxt.js, embedded via Module Federation.
   - Contact form submissions are sent to the Nest.js backend, validated with reCAPTCHA, and emailed via Resend.
2. **Admin Interaction (Dashboard)**:
   - Admins log in via Auth.js to manage content (e.g., upload images to Cloudinary, CRUD Themes/Blogs).
   - Role-based access ensures only admins can edit, while viewers can only read.
3. **Backend Processing**:
   - Nest.js handles API requests, queries MongoDB with tenantId filtering, and integrates with Cloudinary/Resend.
   - GraphQL (optional) provides flexible querying for Themes and Blogs.
4. **Database**:
   - MongoDB stores tenant-specific data, with indexes for fast queries (e.g., tags, text search).
   - Collections include Users, Themes, Blogs, Certificates, Tags, Images, ContactMessages, and SiteSettings.

## Key Features
- **Multi-Tenancy**: `tenantId` in all MongoDB collections ensures data isolation per user.
- **i18n**: English and Vietnamese translations for titles, descriptions, and UI elements, managed via nested fields in MongoDB.
- **Contact Form**: Submits messages to MongoDB, sends emails via Resend, and uses reCAPTCHA for spam protection.
- **Dark/Light Mode**: Implemented in Next.js and React using Tailwind CSS.
- **Micro Frontend**: Nuxt.js renders Theme Detail pages, integrated into Next.js via Module Federation.
- **Future Extensions**:
  - Bookmark/Like: Arrays in Themes/Blogs for user interactions.
  - Search: Text indexes in MongoDB for title-based search.
  - Theme Marketplace: Planned schema extensions for pricing and orders.

## Project Structure (Monorepo)
```plaintext
daidev/
├── apps/
│   ├── web/                  # Next.js (Public Web App)
│   ├── theme-detail/         # Nuxt.js (Theme Detail Micro Frontend)
│   ├── admin/                # React + Tailwind CSS (Admin Dashboard)
│   ├── api/                  # Nest.js (Backend API)
├── packages/
│   ├── shared/               # Shared utilities, types, or components
│   ├── config/               # Monorepo configs (Turborepo/Nx)
├── README.md
├── turbo.json / nx.json      # Monorepo configuration
```

## Database Schema
- **Collections**:
  - **Users**: Stores user profiles, roles, and auth data.
  - **Themes**: Manages portfolio themes with tags, previews, and i18n.
  - **Blogs**: Stores blog posts with tags, content, and i18n.
  - **Certificates**: Tracks user certificates with issuer and URLs.
  - **Tags**: Categorizes Themes and Blogs, with i18n support.
  - **Images**: Stores Cloudinary metadata for uploaded images.
  - **ContactMessages**: Saves contact form submissions.
  - **SiteSettings**: Customizes header, menu, and footer with i18n.
- **Multi-Tenancy**: `tenantId` in every collection for data isolation.
- **Indexes**: Support fast queries for tags, text search, and tenant filtering.

## Workflows
### Public Web App
1. **Home**: Displays intro, login link, and Contact CTA.
2. **About**: Shows user bio and social links.
3. **Certificates**: Lists certificates with issuer and date.
4. **Themes**: Filters by tags, shows previews, links to Nuxt.js Theme Detail.
5. **Blogs**: Filters by tags, shows previews (title, date, tags).
6. **Contact**: Submits form data to Nest.js, validated by reCAPTCHA, sent via Resend.

### Admin Dashboard
1. **Authentication**: Login via Auth.js, with admin/viewer roles.
2. **Content Management**:
   - CRUD operations for Themes, Blogs, Certificates, and Tags.
   - Image uploads to Cloudinary with metadata stored in MongoDB.
   - Customize SiteSettings (header, menu, footer).
3. **UI**: Responsive design with Tailwind CSS, supporting dark/light mode.

### Backend
1. **APIs**: Expose endpoints for CRUD, image uploads, and contact form processing.
2. **Multi-Tenancy**: Filter all queries by `tenantId`.
3. **External Integrations**:
   - Cloudinary: Upload and retrieve images.
   - Resend: Send contact emails.
   - reCAPTCHA: Validate form submissions.

## DevOps
- **Monorepo**: Turborepo/Nx for build, test, and dependency management.
- **Hosting**:
  - Vercel: Deploys Next.js, Nuxt.js, and React apps.
  - Railway: Hosts Nest.js and MongoDB Atlas.
- **CI/CD**: GitHub Actions for automated testing and deployment.
- **Monitoring**: MongoDB Atlas for database metrics, Vercel for frontend analytics.

## Future Roadmap
- **Bookmark/Like**: Implement user interactions using arrays in Themes/Blogs.
- **Search**: Enable full-text search on titles and tags.
- **Theme Marketplace**: Add pricing and order management for theme sales.
- **Additional Languages**: Expand i18n support beyond English and Vietnamese.

## Conclusion
The **daidev** platform is a modular, scalable, and user-centric solution for personal portfolios, with a robust backend, flexible frontend, and multi-tenant architecture. By leveraging modern tools like Nest.js, Next.js, Nuxt.js, and MongoDB, it ensures performance, maintainability, and extensibility for future features like a theme marketplace.