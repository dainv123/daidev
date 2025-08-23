# daidev Documentation

This directory contains comprehensive documentation for the daidev project - a multi-tenant portfolio platform with public web app, admin dashboard, and robust backend.

## 📁 Documentation Structure

### 01-overview/
Project overview and high-level architecture documentation.
- **project-architecture-overview.md** - Complete project overview, goals, tech stack, and architecture
- **monorepo-structure-guide.md** - Project wrapper and monorepo structure details

### 02-design/
Design documents and specifications for different components.
- **admin-dashboard-ui-design.md** - Admin dashboard design specifications
- **frontend-web-app-design.md** - Frontend web app design and UI/UX guidelines
- **backend-api-architecture.md** - Backend architecture and API design

### 03-implementation/
Implementation guides and technical implementation details.
- **auth-implementation-roadmap.md** - Detailed implementation roadmap and milestones
- **completed-features-summary.md** - Summary of completed implementations
- **admin-dashboard-forms-guide.md** - Admin dashboard forms implementation guide
- **cloudinary-image-system.md** - Image upload and management system
- **nuxt-micro-frontend-setup.md** - Theme detail page implementation

### 04-integrations/
API integrations, external services, and workflow documentation.
- **jwt-auth-authorization-guide.md** - Authentication system implementation
- **resend-email-workflow.md** - Contact form email workflow
- **cloudinary-upload-process.md** - S3/Cloudinary image upload process
- **web/** - Web app API integration guides
  - about-page-api-integration.md
  - header-component-api-integration.md
  - home-page-api-integration.md
  - internationalization-setup.md
  - nextjs-routing-configuration.md
  - environment-setup-guide.md
- **bff/** - Backend-for-Frontend documentation
  - dataloader-implementation-guide.md
  - dataloader-architecture-discussion.md
- **ai/** - AI integration documentation
  - ai-integration-overview.md
  - ai-integration-workflow.md

### 05-troubleshooting/
Issues, fixes, and troubleshooting guides.
- **known-issues-status.md** - Current known issues and their status
- **admin-import-functionality-fix.md** - Admin import functionality fixes
- **admin-routing-issues-fix.md** - Admin routing issues and solutions
- **tags-component-troubleshooting.md** - Tags component troubleshooting

### 06-workflows/
Process flows and operational guides.
- *(Currently empty - for future workflow documentation)*

## 🚀 Quick Start

1. **New to the project?** Start with `01-overview/project-architecture-overview.md`
2. **Setting up development?** Check `04-integrations/web/environment-setup-guide.md`
3. **Implementing features?** Review `03-implementation/auth-implementation-roadmap.md`
4. **Facing issues?** Look in `05-troubleshooting/`

## 📋 Documentation Guidelines

### File Naming Convention
- Use kebab-case for file names
- Include descriptive names that indicate content type
- Use `.md` extension for all documentation files

### Content Structure
- Start with a clear title and brief description
- Use proper markdown formatting
- Include code examples where relevant
- Add links to related documentation

### Maintenance
- Keep documentation up-to-date with code changes
- Review and update regularly
- Add new documentation for new features
- Archive outdated documentation

## 🔗 Related Resources

- **Code Repository**: Main project code in `../apps/`
- **API Documentation**: Backend API specs in `../apps/api/`
- **Frontend Apps**: Web and admin apps in `../apps/web/` and `../apps/admin/`

## 📝 Contributing

When adding new documentation:
1. Choose the appropriate category folder
2. Follow the naming convention
3. Update this README if adding new categories
4. Ensure content is clear and well-structured

---

*Last updated: $(date)* 