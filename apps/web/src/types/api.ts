// User types
export interface User {
  _id: string;
  email: string;
  role: 'admin' | 'viewer';
  tenantId: string;
  profile?: {
    name: string;
    bio: { en: string; vi: string };
    avatar: string;
    socialLinks: { github: string; linkedin: string; twitter: string };
  };
  createdAt: string;
  updatedAt: string;
}

// Theme types
export interface Theme {
  _id: string;
  title: { en: string; vi: string };
  description: { en: string; vi: string };
  previewImage: string;
  category: string;
  technologies: string[];
  demoUrl?: string;
  sourceUrl?: string;
  slug?: string;
  tags: string[];
  isPublished: boolean;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

// Blog types
export interface Blog {
  _id: string;
  title: { en: string; vi: string };
  content: { en: string; vi: string };
  excerpt: { en: string; vi: string };
  coverImage: string;
  tags: string[];
  author: { en: string; vi: string };
  slug: string;
  readTime: number;
  commentCount?: number;
  likeCount?: number;
  publishedAt?: string;
  isPublished: boolean;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

// Certificate types
export interface Certificate {
  _id: string;
  name: { en: string; vi: string } | string;
  issuer: { en: string; vi: string } | string;
  description?: { en: string; vi: string } | string;
  issueDate: string;
  expiryDate?: string | null;
  credentialId?: string;
  certificateUrl: string;
  image?: string;
  isPublished: boolean;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

// Tag types
export interface Tag {
  _id: string;
  name: { en: string; vi: string };
  slug: string;
  description: { en: string; vi: string };
  isActive: boolean;
  usageCount: number;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

// Image types
export interface Image {
  _id: string;
  filename: string;
  mimetype: string;
  size: number;
  url: string;
  type: string;
  metadata?: {
    width?: number;
    height?: number;
    format?: string;
    cloudinaryId?: string;
  };
  isActive: boolean;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

// Contact Message types
export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  readAt?: string;
  repliedAt?: string;
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    referrer?: string;
  };
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

// Site Settings types
export interface SiteSettings {
  _id: string;
  key: string;
  value: any;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 