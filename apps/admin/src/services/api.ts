import axios from 'axios';
import { 
  User, Theme, Blog, Certificate, Tag, Image, ContactMessage, SiteSettings,
  LoginCredentials, AuthResponse, ApiResponse, PaginatedResponse 
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add global error handler for toast
api.interceptors.response.use(
  (response) => {
    // If the response returns success: false, show error toast and reject
    if (response.data && response.data.success === false) {
      window.dispatchEvent(
        new CustomEvent("app-error", {
          detail: response.data.message || "Có lỗi xảy ra!",
        })
      );
      return Promise.reject(new Error(response.data.message || "Có lỗi xảy ra!"));
    }
    // If there is a success message, show success toast (unless it is an error)
    if (response.data && response.data.message && response.data.success !== false) {
      window.dispatchEvent(
        new CustomEvent("app-success", {
          detail: response.data.message,
        })
      );
    }
    return response;
  },
  (error) => {
    console.log('[AXIOS ERROR INTERCEPT]', error);
    const msg = error?.response?.data?.message || error.message || 'Request error';
    window.dispatchEvent(new CustomEvent('app-error', { detail: msg }));
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data.data;
  },
  
  register: async (userData: any): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data.data;
  },
  
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },
  
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/auth/profile');
    return response.data.data;
  },
};

// Users API
export const usersAPI = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data.data;
  },
  
  getById: async (id: string): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data.data;
  },
  
  create: async (userData: Partial<User>): Promise<User> => {
    const response = await api.post<User>('/users', userData);
    return response.data.data;
  },
  
  update: async (id: string, userData: Partial<User>): Promise<User> => {
    const response = await api.put<User>(`/users/${id}`, userData);
    return response.data.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

// Themes API
export const themesAPI = {
  getAll: async (): Promise<Theme[]> => {
    const response = await api.get<Theme[]>('/themes');
    return response.data.data;
  },
  
  getById: async (id: string): Promise<Theme> => {
    const response = await api.get<Theme>(`/themes/${id}`);
    return response.data.data;
  },
  
  create: async (themeData: Partial<Theme>): Promise<Theme> => {
    const response = await api.post<Theme>('/themes', themeData);
    return response.data.data;
  },
  
  update: async (id: string, themeData: Partial<Theme>): Promise<Theme> => {
    const response = await api.put<Theme>(`/themes/${id}`, themeData);
    return response.data.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/themes/${id}`);
  },
  
  togglePublish: async (id: string): Promise<Theme> => {
    const response = await api.put<Theme>(`/themes/${id}/toggle-publish`, {});
    return response.data.data;
  },
};

// Blogs API
export const blogsAPI = {
  getAll: async (): Promise<Blog[]> => {
    const response = await api.get<Blog[]>('/blogs');
    return response.data.data;
  },
  
  getById: async (id: string): Promise<Blog> => {
    const response = await api.get<Blog>(`/blogs/${id}`);
    return response.data.data;
  },
  
  create: async (blogData: Partial<Blog>): Promise<Blog> => {
    const response = await api.post<Blog>('/blogs', blogData);
    return response.data.data;
  },
  
  update: async (id: string, blogData: Partial<Blog>): Promise<Blog> => {
    const response = await api.put<Blog>(`/blogs/${id}`, blogData);
    return response.data.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/blogs/${id}`);
  },
  
  togglePublish: async (id: string): Promise<Blog> => {
    const response = await api.put<Blog>(`/blogs/${id}/toggle-publish`, {});
    return response.data.data;
  },
};

// Certificates API
export const certificatesAPI = {
  getAll: async (): Promise<Certificate[]> => {
    const response = await api.get<Certificate[]>('/certificates');
    return response.data.data;
  },
  
  getById: async (id: string): Promise<Certificate> => {
    const response = await api.get<Certificate>(`/certificates/${id}`);
    return response.data.data;
  },
  
  create: async (certificateData: Partial<Certificate>): Promise<Certificate> => {
    const response = await api.post<Certificate>('/certificates', certificateData);
    return response.data.data;
  },
  
  update: async (id: string, certificateData: Partial<Certificate>): Promise<Certificate> => {
    const response = await api.put<Certificate>(`/certificates/${id}`, certificateData);
    return response.data.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/certificates/${id}`);
  },
  
  togglePublish: async (id: string): Promise<Certificate> => {
    const response = await api.put<Certificate>(`/certificates/${id}/toggle-publish`, {});
    return response.data.data;
  },
};

// Tags API
export const tagsAPI = {
  getAll: async (): Promise<Tag[]> => {
    const response = await api.get<Tag[]>('/tags');
    return response.data.data;
  },
  
  getById: async (id: string): Promise<Tag> => {
    const response = await api.get<Tag>(`/tags/${id}`);
    return response.data.data;
  },
  
  create: async (tagData: Partial<Tag>): Promise<Tag> => {
    const response = await api.post<Tag>('/tags', tagData);
    return response.data.data;
  },
  
  update: async (id: string, tagData: Partial<Tag>): Promise<Tag> => {
    const response = await api.put<Tag>(`/tags/${id}`, tagData);
    return response.data.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/tags/${id}`);
  },
};

// Images API
export const imagesAPI = {
  getAll: async (): Promise<Image[]> => {
    const response = await api.get<Image[]>('/images');
    return response.data.data;
  },
  
  getById: async (id: string): Promise<Image> => {
    const response = await api.get<Image>(`/images/${id}`);
    return response.data.data;
  },
  
  upload: async (file: File): Promise<{ url: string; filename: string; mimetype: string; size: number }> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/images/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },
  create: async (meta: Partial<Image>): Promise<Image> => {
    const response = await api.post('/images', meta);
    return response.data.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/images/${id}`);
  },

  getSignedUrl: async (id: string): Promise<string> => {
    const response = await api.get(`/images/${id}/signed-url`);
    return response.data.data.url;
  },
};

// Contact Messages API
export const contactMessagesAPI = {
  getAll: async (): Promise<ContactMessage[]> => {
    const response = await api.get<ContactMessage[]>('/contact-messages');
    return response.data.data;
  },
  
  getById: async (id: string): Promise<ContactMessage> => {
    const response = await api.get<ContactMessage>(`/contact-messages/${id}`);
    return response.data.data;
  },
  
  create: async (messageData: Partial<ContactMessage>): Promise<ContactMessage> => {
    const response = await api.post<ContactMessage>('/contact-messages', messageData);
    return response.data.data;
  },
  
  update: async (id: string, messageData: Partial<ContactMessage>): Promise<ContactMessage> => {
    const response = await api.put<ContactMessage>(`/contact-messages/${id}`, messageData);
    return response.data.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/contact-messages/${id}`);
  },
  
  markAsRead: async (id: string): Promise<ContactMessage> => {
    const response = await api.put<ContactMessage>(`/contact-messages/${id}/mark-read`, {});
    return response.data.data;
  },
  
  markAsReplied: async (id: string): Promise<ContactMessage> => {
    const response = await api.put<ContactMessage>(`/contact-messages/${id}/mark-replied`, {});
    return response.data.data;
  },
  reply: async (id: string, replyContent: string): Promise<ContactMessage> => {
    const response = await api.put(`/contact-messages/${id}/reply`, { replyContent });
    return response.data.data;
  },
};

// Site Settings API
export const siteSettingsAPI = {
  getAll: async (): Promise<SiteSettings[]> => {
    const response = await api.get<SiteSettings[]>('/site-settings');
    return response.data.data;
  },
  
  getById: async (id: string): Promise<SiteSettings> => {
    const response = await api.get<SiteSettings>(`/site-settings/${id}`);
    return response.data.data;
  },
  
  create: async (settingData: Partial<SiteSettings>): Promise<SiteSettings> => {
    const response = await api.post<SiteSettings>('/site-settings', settingData);
    return response.data.data;
  },
  
  update: async (id: string, settingData: Partial<SiteSettings>): Promise<SiteSettings> => {
    const response = await api.put<SiteSettings>(`/site-settings/${id}`, settingData);
    return response.data.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/site-settings/${id}`);
  },
};

// Skills API
export const skillsAPI = {
  getAll: async () => (await api.get('/skills')).data.data,
  getById: async (id) => (await api.get(`/skills/${id}`)).data.data,
  create: async (data) => (await api.post('/skills', data)).data.data,
  update: async (id, data) => (await api.put(`/skills/${id}`, data)).data.data,
  delete: async (id) => api.delete(`/skills/${id}`),
};
// Languages API
export const languagesAPI = {
  getAll: async () => (await api.get('/languages')).data.data,
  getById: async (id) => (await api.get(`/languages/${id}`)).data.data,
  create: async (data) => (await api.post('/languages', data)).data.data,
  update: async (id, data) => (await api.put(`/languages/${id}`, data)).data.data,
  delete: async (id) => api.delete(`/languages/${id}`),
};
// Experience API
export const experienceAPI = {
  getAll: async () => (await api.get('/experience')).data.data,
  getById: async (id) => (await api.get(`/experience/${id}`)).data.data,
  create: async (data) => (await api.post('/experience', data)).data.data,
  update: async (id, data) => (await api.put(`/experience/${id}`, data)).data.data,
  delete: async (id) => api.delete(`/experience/${id}`),
};
// Education API
export const educationAPI = {
  getAll: async () => (await api.get('/education')).data.data,
  getById: async (id) => (await api.get(`/education/${id}`)).data.data,
  create: async (data) => (await api.post('/education', data)).data.data,
  update: async (id, data) => (await api.put(`/education/${id}`, data)).data.data,
  delete: async (id) => api.delete(`/education/${id}`),
};

export default api; 