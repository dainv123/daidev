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
  tags: string[];
  isPublished: boolean;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

// Certificate types
export interface Certificate {
  _id: string;
  name: string;
  issuer: string;
  issueDate: string;
  certificateUrl: string;
  isPublished: boolean;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

// Tag types
export interface Tag {
  _id: string;
  name: string;
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
export interface ContactMessageReplyLog {
  content: string;
  repliedAt: string;
  adminEmail?: string;
  userMailStatus: MailStatus;
  userMailError?: string;
  adminMailStatus: MailStatus;
  adminMailError?: string;
}

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
  status: ContactMessageStatus;
  errorMessage?: string;
  replyLog?: ContactMessageReplyLog[];
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export enum ContactMessageStatus {
  NEW = 'new',
  REPLIED = 'replied',
  ERROR = 'error',
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

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    role: string;
    tenantId: string;
  };
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