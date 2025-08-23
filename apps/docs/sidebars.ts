import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Project Overview',
      link: {
        type: 'doc',
        id: 'overview/index',
      },
      items: [
        'overview/project-architecture-overview',
        'overview/monorepo-structure-guide',
      ],
    },
    {
      type: 'category',
      label: 'System Design',
      link: {
        type: 'doc',
        id: 'design/index',
      },
      items: [
        'design/admin-dashboard-ui-design',
        'design/frontend-web-app-design',
        'design/backend-api-architecture',
      ],
    },
    {
      type: 'category',
      label: 'Implementation Guide',
      link: {
        type: 'doc',
        id: 'implementation/index',
      },
      items: [
        'implementation/auth-implementation-roadmap',
        'implementation/completed-features-summary',
        'implementation/admin-dashboard-forms-guide',
        'implementation/cloudinary-image-system',
        'implementation/nuxt-micro-frontend-setup',
      ],
    },
    {
      type: 'category',
      label: 'System Integration',
      link: {
        type: 'doc',
        id: 'integrations/index',
      },
      items: [
        'integrations/jwt-auth-authorization-guide',
        'integrations/resend-email-workflow',
        'integrations/cloudinary-upload-process',
        'integrations/snyk-vs-codacy',
        {
          type: 'category',
          label: 'Web App Integration',
          items: [
            'integrations/web/about-page-api-integration',
            'integrations/web/header-component-api-integration',
            'integrations/web/home-page-api-integration',
            'integrations/web/internationalization-setup',
            'integrations/web/nextjs-routing-configuration',
            'integrations/web/environment-setup-guide',
          ],
        },
        {
          type: 'category',
          label: 'Backend-for-Frontend (BFF)',
          items: [
            'integrations/bff/dataloader-implementation-guide',
            'integrations/bff/dataloader-architecture-discussion',
          ],
        },
        {
          type: 'category',
          label: 'AI Integration',
          items: [
            'integrations/ai/ai-integration-overview',
            'integrations/ai/ai-integration-workflow',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      link: {
        type: 'doc',
        id: 'troubleshooting/index',
      },
      items: [
        'troubleshooting/known-issues-status',
        'troubleshooting/admin-import-functionality-fix',
        'troubleshooting/admin-routing-issues-fix',
        'troubleshooting/tags-component-troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Workflows',
      link: {
        type: 'doc',
        id: 'workflows/index',
      },
      items: [
      ],
    },
    // {
    //   type: 'category',
    //   label: 'Testing',
    //   items: [
    //     'test-mermaid',
    //     'mermaid-working-test',
    //     'mermaid-basic-test',
    //   ],
    // },
  ],
};

export default sidebars;
