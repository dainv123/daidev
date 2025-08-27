# daidev Project Wrapper

**daidev** is a multi-tenant portfolio platform designed to showcase personal themes, blogs, certificates, and contact functionality, with planned extensions for selling themes. It consists of a **Next.js** public web app, a **Nuxt.js** sub-project for Theme Detail pages, a **React** admin dashboard, and a **Nest.js** backend, all integrated within a monorepo. The platform supports **i18n** (English and Vietnamese), dark/light mode, and multi-tenancy with isolated data per user. It leverages modern tools like MongoDB, Cloudinary, and Resend, and is deployed on Vercel and Railway.

## Project Goals
- **Public Web App**: A profile-like portfolio with Home, About, Certificates, Themes, Blogs, and Contact pages, supporting i18n and responsive design.
- **Admin Dashboard**: A secure interface for managing content (themes, blogs, certificates, tags, images, site settings) with role-based access (admin, viewer).
- **Multi-Tenancy**: Data isolation per user via `tenantId` in all data models.
- **Extensibility**: Support for future features like bookmarking, liking, searching, and a theme marketplace.
- **Modern UI**: Minimal, responsive design with dark/light mode.

## Tech Stack
### Backend
- **Nest.js**: API and BFF layer (REST, with GraphQL as a future option).
- **MongoDB**: Multi-tenant data storage with `tenantId` isolation.
- **Resend**: Email service for contact form submissions, protected by reCAPTCHA.
- **Cloudinary**: Image storage and management.

### Frontend
- **Public Web App**:
  - **Next.js**: Main framework for portfolio pages.
  - **Nuxt.js**: Micro Frontend for Theme Detail pages, integrated via Module Federation.
  - **i18n**: `next-i18next` for English and Vietnamese.
- **Admin Dashboard**:
  - **React + Tailwind CSS**: Responsive dashboard with role-based access.
  - **Auth.js**: Authentication for admin and viewer roles.

### DevOps / Tooling
- **Monorepo**: Turborepo or Nx for managing multiple apps (Next.js, Nuxt.js, React, Nest.js).
- **Hosting**:
  - **Vercel**: Hosts Next.js, Nuxt.js, and React apps.
  - **Railway**: Hosts Nest.js and MongoDB Atlas.
- **CI/CD**: GitHub Actions for automated builds, tests, and deployments.
- **Image Management**: Cloudinary SDK for uploads and transformations.
- **Email**: Resend SDK for contact form emails.

## Overall Architecture
### Components and Interactions
1. **Next.js Web App**:
   - Renders public portfolio pages (Home, About, Certificates, Themes, Blogs, Contact).
   - Fetches data from the Nest.js backend via REST APIs.
   - Embeds Nuxt.js for Theme Detail pages using Module Federation.
   - Supports i18n and dark/light mode with Tailwind CSS.
2. **Nuxt.js Sub-project**:
   - Renders Theme Detail pages as a Micro Frontend.
   - Integrated into Next.js via Module Federation.
   - Fetches theme data from the backend.
3. **React Admin Dashboard**:
   - Provides a secure interface for content management.
   - Supports CRUD operations for Themes, Blogs, Certificates, Tags, Images, and SiteSettings.
   - Uses Auth.js for role-based access (admin: full CRUD, viewer: read-only).
   - Styled with Tailwind CSS, supports i18n and dark/light mode.
4. **Nest.js Backend**:
   - Exposes REST APIs for CRUD operations, image uploads, and contact form submissions.
   - Enforces multi-tenancy with `tenantId` filtering.
   - Integrates with Cloudinary for image uploads and Resend for email sending.
   - Uses Mongoose for MongoDB interactions.
5. **MongoDB Database**:
   - Stores tenant-specific data in collections: Users, Themes, Blogs, Certificates, Tags, Images, ContactMessages, SiteSettings.
   - Includes `tenantId` in all documents for data isolation.
   - Indexes for fast queries (e.g., tags, text search).
6. **External Services**:
   - **Cloudinary**: Stores and serves images for themes, blogs, certificates, and avatars.
   - **Resend**: Sends contact form emails, validated by reCAPTCHA.
   - **Auth.js**: Manages authentication for the admin dashboard.

### Data Flow
- **Public Web App**:
  - Users access the portfolio via Next.js, which fetches tenant-specific data (e.g., themes, blogs) from the backend.
  - Theme Detail pages are rendered by Nuxt.js, loaded dynamically via Module Federation.
  - Contact form submissions are sent to the backend, validated with reCAPTCHA, stored in MongoDB, and emailed via Resend.
- **Admin Dashboard**:
  - Admins/viewers log in via Auth.js, accessing the React dashboard.
  - Admins perform CRUD operations on content, uploading images to Cloudinary and updating MongoDB via the backend.
  - Viewers have read-only access to content.
- **Backend**:
  - Processes API requests, enforcing `tenantId` isolation.
  - Integrates with Cloudinary for image uploads and Resend for email sending.
  - Queries MongoDB with tenant-specific filters.

## Monorepo Structure
```plaintext
daidev/
├── apps/
│   ├── web/                  # Next.js (Public Web App)
│   ├── theme-detail/         # Nuxt.js (Theme Detail Micro Frontend)
│   ├── admin/                # React + Tailwind CSS (Admin Dashboard)
│   ├── api/                  # Nest.js (Backend API)
│   ├── docs/                 # Docusaurus Documentation Site
│   ├── swagger-proxy/        # API Documentation Proxy
│   └── assets/               # Static Assets (CV, templates, images)
├── packages/
│   ├── shared/               # Shared utilities, types, DTOs
│   │   ├── lib/
│   │   │   ├── api-client.ts # Shared API client
│   │   │   ├── types.ts     # Shared TypeScript interfaces
│   └── config/               # Monorepo configs (Turborepo/Nx)
├── deployment/               # Deployment scripts and configurations
│   ├── nginx/                # Nginx configuration files
│   ├── ssl/                  # SSL certificates
│   └── *.sh                  # Deployment and maintenance scripts
├── docker-compose.yml        # Development Docker configuration
├── docker-compose.prod.yml   # Production Docker configuration
├── docker-compose.prod.atlas.yml # Production with MongoDB Atlas
├── .env                      # Shared environment variables
├── env.example               # Environment variables template
├── turbo.json / nx.json      # Monorepo configuration
├── package.json
└── README.md
```

## Database Schema
- **Collections**:
  - **Users**: Stores user profiles, roles, and auth data (`tenantId`, email, password, role, profile).
  - **Themes**: Manages themes with tags, previews, and i18n (`tenantId`, title, description, tags, previewImage).
  - **Blogs**: Stores blog posts with tags and content (`tenantId`, title, content, tags, previewImage).
  - **Certificates**: Tracks certificates (`tenantId`, title, issuer, issueDate, certificateUrl).
  - **Tags**: Categorizes themes and blogs (`tenantId`, name).
  - **Images**: Stores Cloudinary metadata (`tenantId`, cloudinaryId, url, type).
  - **ContactMessages**: Saves contact form submissions (`tenantId`, name, email, message, sentAt).
  - **SiteSettings**: Customizes header, menu, and footer (`tenantId`, header, menu, footer).
- **Multi-Tenancy**: `tenantId` in every collection ensures data isolation.
- **Indexes**: Support fast queries for `tenantId`, tags, and text search.

## Workflows
### Public Web App
1. **Home**: Displays intro, login link, and Contact CTA, fetched from `SiteSettings`.
2. **About**: Shows user bio and social links from `Users`.
3. **Certificates**: Lists certificates from `Certificates` with issuer and date.
4. **Themes**: Filters themes by tags, shows previews, links to Nuxt.js Theme Detail.
5. **Blogs**: Filters blogs by tags, shows previews (title, date, tags).
6. **Contact**: Submits form data to the backend, validated by reCAPTCHA, stored in `ContactMessages`, and emailed via Resend.

### Admin Dashboard
1. **Authentication**: Login via Auth.js with admin/viewer roles.
2. **Content Management**:
   - CRUD operations for Themes, Blogs, Certificates, Tags, and SiteSettings.
   - Image uploads to Cloudinary, with metadata stored in `Images`.
   - Viewer role has read-only access.
3. **UI**: Responsive design with Tailwind CSS, i18n, and dark/light mode.

### Backend
1. **APIs**: Expose REST endpoints for CRUD, image uploads, and contact form processing.
2. **Multi-Tenancy**: Filter queries by `tenantId` using middleware.
3. **Integrations**:
   - **Cloudinary**: Upload and retrieve images.
   - **Resend**: Send contact emails with reCAPTCHA validation.
   - **Auth.js**: Secure sessions with JWT.

### Nuxt.js Sub-project
1. **Theme Detail**: Renders detailed theme views with data fetched from the backend.
2. **Integration**: Loaded into Next.js via Module Federation for seamless navigation.

## DevOps
- **Monorepo**: Managed with Turborepo or Nx for build, test, and dependency management.
- **Hosting**:
  - **Vercel**: Deploys Next.js (web), Nuxt.js (theme-detail), and React (admin).
  - **Railway**: Hosts Nest.js and MongoDB Atlas.
- **CI/CD**: GitHub Actions for automated linting, testing, building, and deployment.
  ```yaml
  name: CI/CD
  on:
    push:
      branches: [main]
    pull_request:
      branches: [main]
  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
          with:
            node-version: '18'
        - run: npm install
        - run: npm run build
        - name: Deploy to Vercel
          run: npx vercel --prod
          env:
            VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        - name: Deploy to Railway
          run: railway up
          env:
            RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
  ```
- **Environment Variables**:
  ```plaintext
  # .env
  MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/daidev
  RESEND_API_KEY=<resend-api-key>
  CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
  CLOUDINARY_API_KEY=<cloudinary-api-key>
  CLOUDINARY_API_SECRET=<cloudinary-api-secret>
  JWT_SECRET=<jwt-secret>
  NEXT_PUBLIC_API_URL=http://localhost:3000/api
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<recaptcha-site-key>
  REACT_APP_API_URL=http://localhost:3000/api
  ```

## Security
- **Authentication**: Auth.js with JWT for secure sessions in the admin dashboard.
- **Role-Based Access**: Admin role for CRUD, viewer role for read-only access.
- **reCAPTCHA**: Validates contact form submissions to prevent spam.
- **Multi-Tenancy**: `tenantId` filtering in all backend queries and API calls.
- **HTTPS**: Enforced by Vercel and Railway for secure communication.

## Future Roadmap
- **Bookmark/Like**: Implement user interactions with arrays in `Themes` and `Blogs`.
- **Search**: Add full-text search on titles and tags using MongoDB text indexes.
- **Theme Marketplace**: Extend `Themes` with `price` and `isForSale` fields, add an `Orders` collection, and integrate a payment gateway.
- **Additional Languages**: Expand i18n support beyond English and Vietnamese.
- **Performance**: Optimize with lazy loading, image compression, and caching.

## Sample Workflow Example
### Creating a Theme
1. **Admin Dashboard**:
   - Admin logs in via Auth.js, navigates to Themes page.
   - Fills out a form with title (en/vi), description (en/vi), tags, and uploads a preview image to Cloudinary.
   - Submits form, which calls `POST /themes` with `tenantId`.
2. **Backend**:
   - Validates request, stores image metadata in `Images`, and saves theme in `Themes`.
   - Returns the created theme.
3. **Web App**:
   - Fetches updated themes via `GET /themes` with `tenantId`.
   - Displays the new theme on the Themes page, with a link to the Nuxt.js Theme Detail.

## Conclusion
The **daidev** platform is a modular, scalable, and user-centric solution for personal portfolios, integrating a Next.js web app, Nuxt.js Theme Detail, React admin dashboard, and Nest.js backend within a monorepo. It leverages MongoDB for multi-tenant data, Cloudinary for images, and Resend for emails, with a robust DevOps setup on Vercel and Railway. The architecture ensures maintainability, performance, and extensibility for future features like a theme marketplace.