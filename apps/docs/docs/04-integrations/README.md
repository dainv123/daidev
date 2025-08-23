# Integrations Documentation

This directory contains documentation for API integrations, external services, and workflow processes.

## 📋 Available Documents

### Core Integration Flows
- **[jwt-auth-authorization-guide.md](./jwt-auth-authorization-guide.md)** - Authentication system implementation
- **[resend-email-workflow.md](./resend-email-workflow.md)** - Contact form email workflow
- **[cloudinary-upload-process.md](./cloudinary-upload-process.md)** - S3/Cloudinary image upload process

### Web App Integrations
The `web/` directory contains API integration guides for the Next.js web application:
- **about-page-api-integration.md** - About page API integration
- **header-component-api-integration.md** - Header component API integration
- **home-page-api-integration.md** - Home page API integration
- **internationalization-setup.md** - Internationalization setup
- **nextjs-routing-configuration.md** - Next.js routing configuration
- **environment-setup-guide.md** - Environment setup guide

### Backend-for-Frontend (BFF)
The `bff/` directory contains BFF implementation documentation:
- **dataloader-implementation-guide.md** - DataLoader implementation guide
- **dataloader-architecture-discussion.md** - DataLoader architecture discussion

### AI Integrations
The `ai/` directory contains AI-related integration documentation:
- **ai-integration-overview.md** - AI integration overview
- **ai-integration-workflow.md** - AI integration workflow

## 🔗 Integration Guidelines

- All integrations should include proper error handling
- Implement rate limiting where appropriate
- Use environment variables for sensitive configuration
- Document API endpoints and response formats
- Include authentication and authorization details 