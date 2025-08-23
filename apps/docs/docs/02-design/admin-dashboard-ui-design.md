# daidev Admin Dashboard Design

The **daidev** admin dashboard is a **React** application built with **Tailwind CSS**, providing a secure interface for managing user-generated content (Themes, Blogs, Certificates, Tags, Images, and SiteSettings). It uses **Auth.js** for authentication with role-based access (admin, viewer), supports **i18n** (English and Vietnamese), and features a responsive, minimal design with dark/light mode. The dashboard communicates with the Nest.js backend via REST APIs and integrates with Cloudinary for image uploads. It is hosted on **Vercel** within the monorepo.

## Tech Stack
- **Framework**: React (TypeScript)
- **Styling**: Tailwind CSS for responsive, minimal design
- **Authentication**: Auth.js (NextAuth.js client-side integration)
- **i18n**: `i18next` and `react-i18next` for English and Vietnamese
- **Image Uploads**: Cloudinary SDK for uploading and managing images
- **API Client**: Axios for backend communication
- **Routing**: React Router for navigation
- **Deployment**: Vercel

## Project Structure
```plaintext
daidev-admin/
├── public/
│   ├── index.html               # HTML entry point
│   ├── locales/                # Translation files (en, vi)
│   │   ├── en/
│   │   │   ├── common.json
│   │   │   ├── dashboard.json
│   │   ├── vi/
│   │       ├── common.json
│   │       ├── dashboard.json
├── src/
│   ├── components/
│   │   ├── Layout.tsx           # Dashboard layout with sidebar
│   │   ├── ThemeManager.tsx     # CRUD interface for Themes
│   │   ├── BlogManager.tsx      # CRUD interface for Blogs
│   │   ├── CertificateManager.tsx # CRUD interface for Certificates
│   │   ├── TagManager.tsx       # CRUD interface for Tags
│   │   ├── ImageManager.tsx     # Image upload and management
│   │   ├── SiteSettingsManager.tsx # Header, menu, footer settings
│   │   ├── AuthGuard.tsx        # Role-based access control
│   ├── pages/
│   │   ├── Dashboard.tsx        # Main dashboard overview
│   │   ├── Login.tsx            # Login page
│   │   ├── Themes.tsx           # Themes management page
│   │   ├── Blogs.tsx            # Blogs management page
│   │   ├── Certificates.tsx     # Certificates management page
│   │   ├── Tags.tsx             # Tags management page
│   │   ├── Images.tsx           # Images management page
│   │   ├── Settings.tsx         # Site settings page
│   ├── lib/
│   │   ├── api.ts              # API client for backend calls
│   │   ├── auth.ts             # Auth.js utilities
│   │   ├── i18n.ts             # i18n configuration
│   │   ├── theme.ts            # Dark/light mode utilities
│   ├── App.tsx                  # Root component with routing
│   ├── index.tsx               # Application entry point
│   ├── styles/
│   │   ├── globals.css         # Global styles with Tailwind
├── vite.config.ts              # Vite configuration for React
├── .env.local                  # Environment variables
├── package.json
├── tsconfig.json
├── README.md
```

## Key Features
- **Modules**:
  - **User Info Management**: Update user profile (name, bio, avatar, social links).
  - **Image Management**: Upload and manage images to Cloudinary.
  - **CRUD Operations**: Manage Themes, Blogs, Certificates, Tags, and SiteSettings.
  - **Site Customization**: Configure header, menu, and footer.
- **Authentication**: Auth.js with role-based access (admin: full CRUD, viewer: read-only).
- **i18n**: English and Vietnamese translations using `i18next`.
- **UI**: Responsive, minimal design with Tailwind CSS, supporting dark/light mode.
- **Future Extensions**: Components prepared for bookmark, like, and search features.

## Key Components
### 1. **Layout Component**
Provides a sidebar navigation and main content area.
```tsx
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/auth';
import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '../lib/theme';

const Layout: React.FC = () => {
  const { t } = useTranslation('dashboard');
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow">
        <nav className="p-4">
          <h2 className="text-xl font-bold">{t('dashboard')}</h2>
          <ul className="mt-4 space-y-2">
            <li><Link to="/dashboard" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700">{t('overview')}</Link></li>
            {user?.role === 'admin' && (
              <>
                <li><Link to="/themes" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700">{t('themes')}</Link></li>
                <li><Link to="/blogs" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700">{t('blogs')}</Link></li>
                <li><Link to="/certificates" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700">{t('certificates')}</Link></li>
                <li><Link to="/tags" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700">{t('tags')}</Link></li>
                <li><Link to="/images" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700">{t('images')}</Link></li>
                <li><Link to="/settings" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700">{t('settings')}</Link></li>
              </>
            )}
          </ul>
          <button onClick={logout} className="mt-4 p-2 text-red-500">{t('logout')}</button>
          <button onClick={toggleTheme} className="mt-2 p-2 bg-gray-200 dark:bg-gray-700">
            {theme === 'dark' ? t('lightMode') : t('darkMode')}
          </button>
        </nav>
      </aside>
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
```

### 2. **ThemeManager Component**
Manages CRUD operations for Themes.
```tsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { apiClient } from '../lib/api';
import { useAuth } from '../lib/auth';

const ThemeManager: React.FC = () => {
  const { t } = useTranslation('dashboard');
  const { user } = useAuth();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [formData, setFormData] = useState({ title: { en: '', vi: '' }, description: { en: '', vi: '' }, tags: [] });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    apiClient.get('/themes').then((res) => setThemes(res.data));
  }, []);

  const handleSubmit = async () => {
    if (user?.role !== 'admin') return;
    if (editingId) {
      await apiClient.put(`/themes/${editingId}`, formData);
    } else {
      await apiClient.post('/themes', formData);
    }
    setFormData({ title: { en: '', vi: '' }, description: { en: '', vi: '' }, tags: [] });
    setEditingId(null);
    apiClient.get('/themes').then((res) => setThemes(res.data));
  };

  const handleDelete = async (id: string) => {
    if (user?.role !== 'admin') return;
    await apiClient.delete(`/themes/${id}`);
    setThemes(themes.filter((theme) => theme._id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">{t('themes')}</h2>
      {user?.role === 'admin' && (
        <div className="my-4">
          <input
            type="text"
            placeholder={t('titleEn')}
            value={formData.title.en}
            onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })}
            className="p-2 border rounded dark:bg-gray-700 mr-2"
          />
          <input
            type="text"
            placeholder={t('titleVi')}
            value={formData.title.vi}
            onChange={(e) => setFormData({ ...formData, title: { ...formData.title, vi: e.target.value } })}
            className="p-2 border rounded dark:bg-gray-700 mr-2"
          />
          <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded">
            {editingId ? t('update') : t('create')}
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4">
        {themes.map((theme) => (
          <div key={theme._id} className="border p-4 rounded bg-white dark:bg-gray-800">
            <h3>{theme.title[user?.locale || 'en']}</h3>
            {user?.role === 'admin' && (
              <div>
                <button
                  onClick={() => {
                    setEditingId(theme._id);
                    setFormData({ title: theme.title, description: theme.description, tags: theme.tags });
                  }}
                  className="p-2 bg-yellow-500 text-white rounded mr-2"
                >
                  {t('edit')}
                </button>
                <button onClick={() => handleDelete(theme._id)} className="p-2 bg-red-500 text-white rounded">
                  {t('delete')}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeManager;
```

### 3. **ImageManager Component**
Handles image uploads to Cloudinary.
```tsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { apiClient } from '../lib/api';
import { useAuth } from '../lib/auth';

const ImageManager: React.FC = () => {
  const { t } = useTranslation('dashboard');
  const { user } = useAuth();
  const [images, setImages] = useState<Image[]>([]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    apiClient.get('/images').then((res) => setImages(res.data));
  }, []);

  const handleUpload = async () => {
    if (user?.role !== 'admin' || !file) return;
    const formData = new FormData();
    formData.append('file', file);
    await apiClient.post('/images/upload', formData);
    setFile(null);
    apiClient.get('/images').then((res) => setImages(res.data));
  };

  const handleDelete = async (id: string) => {
    if (user?.role !== 'admin') return;
    await apiClient.delete(`/images/${id}`);
    setImages(images.filter((image) => image._id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">{t('images')}</h2>
      {user?.role === 'admin' && (
        <div className="my-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="p-2 border rounded dark:bg-gray-700"
          />
          <button onClick={handleUpload} className="p-2 bg-blue-500 text-white rounded ml-2">
            {t('upload')}
          </button>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image._id} className="border p-4 rounded bg-white dark:bg-gray-800">
            <img src={image.url} alt="Uploaded" className="w-full h-32 object-cover rounded" />
            {user?.role === 'admin' && (
              <button onClick={() => handleDelete(image._id)} className="mt-2 p-2 bg-red-500 text-white rounded">
                {t('delete')}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageManager;
```

## Pages
### 1. **Dashboard Page (`pages/Dashboard.tsx`)**
Shows an overview of content.
```tsx
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/auth';

const Dashboard: React.FC = () => {
  const { t } = useTranslation('dashboard');
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold">{t('welcome', { name: user?.profile.name })}</h1>
      <p className="mt-4">{t('overview')}</p>
    </div>
  );
};

export default Dashboard;
```

### 2. **Login Page (`pages/Login.tsx`)**
Handles authentication with Auth.js.
```tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { t } = useTranslation('dashboard');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (err) {
      setError(t('loginFailed'));
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold">{t('login')}</h2>
      <input
        type="email"
        placeholder={t('email')}
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700"
      />
      <input
        type="password"
        placeholder={t('password')}
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700"
      />
      <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded">
        {t('login')}
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default Login;
```

## i18n Configuration
### Translation Files (`public/locales/en/dashboard.json`)
```json
{
  "dashboard": "Dashboard",
  "overview": "Overview",
  "themes": "Themes",
  "blogs": "Blogs",
  "certificates": "Certificates",
  "tags": "Tags",
  "images": "Images",
  "settings": "Settings",
  "logout": "Logout",
  "lightMode": "Light Mode",
  "darkMode": "Dark Mode",
  "welcome": "Welcome, {{name}}",
  "titleEn": "Title (English)",
  "titleVi": "Title (Vietnamese)",
  "create": "Create",
  "update": "Update",
  "delete": "Delete",
  "upload": "Upload",
  "login": "Login",
  "email": "Email",
  "password": "Password",
  "loginFailed": "Login failed. Please check your credentials."
}
```

### Translation Files (`public/locales/vi/dashboard.json`)
```json
{
  "dashboard": "Dashboard",
  "overview": "Overview",
  "themes": "Themes",
  "blogs": "Blogs",
  "certificates": "Certificates",
  "tags": "Tags",
  "images": "Images",
  "settings": "Settings",
  "logout": "Logout",
  "lightMode": "Light Mode",
  "darkMode": "Dark Mode",
  "welcome": "Welcome, {{name}}",
  "titleEn": "Title (English)",
  "titleVi": "Title (Vietnamese)",
  "create": "Create",
  "update": "Update",
  "delete": "Delete",
  "upload": "Upload",
  "login": "Login",
  "email": "Email",
  "password": "Password",
  "loginFailed": "Login failed. Please check your credentials."
}
```

### i18n Setup (`src/lib/i18n.ts`)
```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../public/locales/en/dashboard.json';
import vi from '../../public/locales/vi/dashboard.json';

const resources = {
  en: { dashboard: en },
  vi: { dashboard: vi },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  ns: ['dashboard'],
  defaultNS: 'dashboard',
  interpolation: { escapeValue: false },
});

export default i18n;
```

## Authentication Setup
### Auth Utilities (`src/lib/auth.ts`)
```typescript
import { createContext, useContext, useState } from 'react';
import { apiClient } from './api';

interface AuthContextType {
  user: { tenantId: string; role: string; profile: { name: string } } | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);

  const login = async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post('/auth/login', credentials);
    setUser(response.data.user);
  };

  const logout = () => {
    setUser(null);
    apiClient.post('/auth/logout');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

## API Client (`src/lib/api.ts`)
```typescript
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Environment Variables
```plaintext
# .env.local
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
```

## Deployment
- **Vercel**: Deploy the React app for fast, serverless hosting.
- **CI/CD**: Use GitHub Actions to automate builds, tests, and deployments.
  - Example workflow: Lint, test, build, and deploy to Vercel on push to `main`.

## Security
- **Authentication**: Use Auth.js with JWT for secure sessions.
- **Role-Based Access**: Restrict CRUD operations to `admin` role using `AuthGuard`.
- **API Calls**: Securely fetch data from the Nest.js backend with tenantId filtering.

## Future Considerations
- **Bookmark/Like**: Add management interfaces for bookmark and like interactions.
- **Search**: Implement a search interface with backend text search support.
- **Theme Marketplace**: Extend ThemeManager with pricing and sales options.
- **Performance**: Optimize with lazy loading for large content lists.

## Conclusion
The **daidev** admin dashboard, built with React and Tailwind CSS, provides a secure, multilingual, and user-friendly interface for managing portfolio content. It integrates seamlessly with the Nest.js backend, supports role-based access, and is designed for extensibility with future features like a theme marketplace.