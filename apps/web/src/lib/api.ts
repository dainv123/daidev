import axios from 'axios';
import { 
  Theme, Blog, Certificate, Tag, Image, ContactMessage, SiteSettings,
  ApiResponse, PaginatedResponse 
} from '../types/api';

// Use environment variable or fallback to external API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://api.daidev.click/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Public API endpoints (no authentication required)
export const publicAPI = {
  // Themes
  getThemes: async (): Promise<Theme[]> => {
    const response = await api.get<Theme[]>('/themes');
    return response.data.data;
  },
  
  getThemeById: async (id: string): Promise<Theme> => {
    const response = await api.get<Theme>(`/themes/${id}`);
    return response.data.data;
  },
  
  // Blogs
  getBlogs: async (): Promise<Blog[]> => {
    const response = await api.get<{ data: Blog[] }>('/blogs');
    return response.data.data;
  },
  
  getBlogById: async (id: string): Promise<{ data: Blog }> => {
    const response = await api.get<{ data: Blog }>(`/blogs/${id}`);
    return response.data.data;
  },
  
  getBlogBySlug: async (slug: string): Promise<Blog> => {
    const response = await api.get<{ data: Blog }>(`/blogs/slug/${slug}`);
    return response.data.data;
  },
  
  // Certificates
  getCertificates: async (): Promise<Certificate[]> => {
    const response = await api.get<Certificate[]>('/certificates');
    return response.data.data;
  },
  
  // Tags
  getTags: async (): Promise<Tag[]> => {
    const response = await api.get<Tag[]>('/tags');
    return response.data.data;
  },
  
  // Images
  getImages: async (): Promise<Image[]> => {
    const response = await api.get<Image[]>('/images');
    return response.data.data;
  },
  
  // Site Settings
  getSiteSettings: async (): Promise<SiteSettings[]> => {
    const response = await api.get<SiteSettings[]>('/site-settings');
    return response.data.data;
  },
  
  // Contact Form
  submitContact: async (messageData: Partial<ContactMessage>): Promise<ContactMessage> => {
    const response = await api.post<ContactMessage>('/contact-messages', messageData);
    return response.data.data;
  },
  // Skills
  getSkills: async () => {
    const response = await api.get('/skills');
    return response.data.data;
  },
  // Experience
  getExperience: async () => {
    const response = await api.get('/experience');
    return response.data.data;
  },
  // Education
  getEducation: async () => {
    const response = await api.get('/education');
    return response.data.data;
  },
  // Languages
  getLanguages: async () => {
    const response = await api.get('/languages');
    return response.data.data;
  },
};

// Helper function to get site setting by key
export const getSiteSetting = async (key: string): Promise<any> => {
  try {
    const settings = await publicAPI.getSiteSettings();
    const setting = settings.find(s => s.key === key);
    return setting?.value || null;
  } catch (error) {
    console.error(`Failed to get site setting: ${key}`, error);
    return null;
  }
};

// Helper function to get multiple site settings
export const getSiteSettings = async (keys: string[]): Promise<Record<string, any>> => {
  try {
    const settings = await publicAPI.getSiteSettings();
    const result: Record<string, any> = {};
    
    keys.forEach(key => {
      const setting = settings.find(s => s.key === key);
      result[key] = setting?.value || null;
    });
    
    return result;
  } catch (error) {
    console.error('Failed to get site settings', error);
    return {};
  }
};

// Export individual functions for easier imports
export const getBlogs = publicAPI.getBlogs;
export const getBlogById = publicAPI.getBlogById;
export const getBlogBySlug = publicAPI.getBlogBySlug;
export const getThemes = publicAPI.getThemes;
export const getThemeById = publicAPI.getThemeById;
export const getCertificates = publicAPI.getCertificates;
export const getTags = publicAPI.getTags;
export const getImages = publicAPI.getImages;
export const submitContact = publicAPI.submitContact;
export const getSkills = publicAPI.getSkills;
export const getExperience = publicAPI.getExperience;
export const getEducation = publicAPI.getEducation;
export const getLanguages = publicAPI.getLanguages;

export const imagesAPI = {
  getSignedUrl: async (id: string): Promise<string> => {
    const response = await api.get<{ data: { url: string } }>(`/images/${id}/signed-url`);
    return response.data.data.url;
  },
};

export default api; 