export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'viewer';
  avatar?: string;
  bio?: {
    en: string;
    vi: string;
  };
  location?: {
    en: string;
    vi: string;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    behance?: string;
    youtube?: string;
    instagram?: string;
  };
  experience?: {
    years: number;
    projects: number;
    meetings: number;
  };
  services?: Service[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  _id: string;
  icon: string;
  title: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
}

export interface Theme {
  _id: string;
  title: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  previewImage: string;
  tags: Tag[];
  category: string;
  demoUrl?: string;
  sourceUrl?: string;
  features?: string[];
  technologies?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Blog {
  _id: string;
  title: {
    en: string;
    vi: string;
  };
  content: {
    en: string;
    vi: string;
  };
  excerpt: {
    en: string;
    vi: string;
  };
  coverImage: string;
  tags: Tag[];
  author: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Certificate {
  _id: string;
  title: {
    en: string;
    vi: string;
  };
  issuer: {
    en: string;
    vi: string;
  };
  image: string;
  url?: string;
  issuedAt: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  _id: string;
  name: {
    en: string;
    vi: string;
  };
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SiteSettings {
  _id: string;
  header: {
    title: {
      en: string;
      vi: string;
    };
    subtitle: {
      en: string;
      vi: string;
    };
  };
  menu: MenuItem[];
  footer: {
    text: {
      en: string;
      vi: string;
    };
    copyright: {
      en: string;
      vi: string;
    };
  };
  contact: {
    phone: string[];
    email: string[];
    address: {
      en: string;
      vi: string;
    };
    mapUrl?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItem {
  label: {
    en: string;
    vi: string;
  };
  url: string;
  icon?: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  recaptchaToken: string;
  createdAt: Date;
}

export interface Locale {
  locale: 'en' | 'vi';
} 