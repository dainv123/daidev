# daidev Frontend Web Application Design

The **daidev** frontend web app is built with **Next.js**, serving as the public portfolio platform for showcasing user profiles, themes, blogs, certificates, and a contact form. It integrates a **Nuxt.js** sub-project for Theme Detail pages via Module Federation, supports **i18n** (English and Vietnamese), and features a modern, responsive UI with dark/light mode. The app is hosted on **Vercel** and interacts with the Nest.js backend for data retrieval and form submissions.

## Tech Stack
- **Framework**: Next.js (React-based, TypeScript)
- **Micro Frontend**: Nuxt.js (Vue-based) for Theme Detail pages, integrated via Module Federation
- **Styling**: Tailwind CSS for responsive, minimal design
- **i18n**: `next-i18next` for English and Vietnamese translations
- **Authentication**: Auth.js (client-side integration with Nest.js backend)
- **Image Rendering**: Cloudinary for optimized image delivery
- **Form Validation**: reCAPTCHA for contact form spam protection
- **Deployment**: Vercel

## Project Structure
```plaintext
daidev-web/
├── src/
│   ├── pages/
│   │   ├── index.tsx             # Home page
│   │   ├── about.tsx            # About Me page
│   │   ├── certificates.tsx     # Certificates page
│   │   ├── themes/
│   │   │   ├── index.tsx        # Themes list page
│   │   │   ├── [id].tsx         # Theme Detail (wrapper for Nuxt.js)
│   │   ├── blogs/
│   │   │   ├── index.tsx        # Blogs list page
│   │   │   ├── [id].tsx         # Blog Detail page
│   │   ├── contact.tsx          # Contact form page
│   │   ├── _app.tsx             # Custom App for global setup
│   │   ├── _document.tsx        # Custom Document for HTML setup
│   ├── components/
│   │   ├── Header.tsx           # Header with navigation
│   │   ├── Footer.tsx           # Footer with customizable text
│   │   ├── ThemeCard.tsx        # Theme preview card
│   │   ├── BlogCard.tsx         # Blog preview card
│   │   ├── CertificateCard.tsx  # Certificate card
│   │   ├── ContactForm.tsx      # Contact form with reCAPTCHA
│   │   ├── ThemeDetail.tsx      # Wrapper for Nuxt.js Theme Detail
│   ├── lib/
│   │   ├── api.ts              # API client for backend calls
│   │   ├── i18n.ts             # i18n configuration
│   │   ├── theme.ts            # Dark/light mode utilities
│   ├── public/
│   │   ├── locales/            # Translation files (en, vi)
│   │   ├── images/             # Static assets
│   ├── styles/
│   │   ├── globals.css         # Global styles with Tailwind
│   ├── next.config.js          # Next.js configuration
│   ├── webpack.config.js       # Module Federation setup
│   ├── .env.local              # Environment variables
│   ├── package.json
│   ├── tsconfig.json
│   ├── README.md
```

## Key Features
- **Pages**:
  - **Home**: Intro section, login link, and Contact CTA.
  - **About Me**: Displays user bio and social links.
  - **Certificates**: Lists certificates with issuer, date, and image.
  - **Themes**: Filters themes by tags, shows previews, links to Theme Detail (Nuxt.js).
  - **Blogs**: Filters blogs by tags, shows previews (title, date, tags).
  - **Contact**: Form with name, email, message, and reCAPTCHA, submits to backend.
- **i18n**: Supports English and Vietnamese via `next-i18next`.
- **Micro Frontend**: Nuxt.js renders Theme Detail pages, integrated via Module Federation.
- **UI**: Responsive, minimal design with Tailwind CSS, supporting dark/light mode.
- **Future Extensions**: Components and API calls prepared for bookmark, like, and search features.

## Key Components
### 1. **Header Component**
Renders a customizable navigation bar with menu items from `SiteSettings`.
```tsx
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const Header: React.FC<{ siteSettings: SiteSettings }> = ({ siteSettings }) => {
  const { t } = useTranslation('common');
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 p-4 shadow">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{siteSettings.header.title[t('locale')]}</h1>
        <ul className="flex space-x-4">
          {siteSettings.menu.map((item, index) => (
            <li key={index}>
              <Link href={item.url}>{item.label[t('locale')]}</Link>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded bg-gray-200 dark:bg-gray-700"
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
```

### 2. **ThemeCard Component**
Displays a theme preview with tags and a link to the Theme Detail page.
```tsx
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const ThemeCard: React.FC<{ theme: Theme }> = ({ theme }) => {
  const { t } = useTranslation('themes');

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow">
      <Image
        src={theme.previewImage}
        alt={theme.title[t('locale')]}
        width={300}
        height={200}
        className="rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{theme.title[t('locale')]}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {theme.description[t('locale')].substring(0, 100)}...
      </p>
      <div className="flex space-x-2 mt-2">
        {theme.tags.map((tag) => (
          <span key={tag._id} className="text-xs bg-blue-100 dark:bg-blue-900 p-1 rounded">
            {tag.name[t('locale')]}
          </span>
        ))}
      </div>
      <Link href={`/themes/${theme._id}`} className="text-blue-500 mt-2 inline-block">
        {t('viewDetails')}
      </Link>
    </div>
  );
};

export default ThemeCard;
```

### 3. **ContactForm Component**
Handles contact form submissions with reCAPTCHA validation.
```tsx
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import ReCAPTCHA from 'react-google-recaptcha';
import { apiClient } from '../lib/api';

const ContactForm: React.FC = () => {
  const { t } = useTranslation('contact');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaToken) {
      setStatus(t('recaptchaRequired'));
      return;
    }

    try {
      await apiClient.post('/contact', { ...formData, recaptchaToken });
      setStatus(t('messageSent'));
      setFormData({ name: '', email: '', message: '' });
      setRecaptchaToken(null);
    } catch (error) {
      setStatus(t('errorSending'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <input
        type="text"
        placeholder={t('name')}
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700"
        required
      />
      <input
        type="email"
        placeholder={t('email')}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700"
        required
      />
      <textarea
        placeholder={t('message')}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700"
        required
      />
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={setRecaptchaToken}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {t('send')}
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </form>
  );
};

export default ContactForm;
```

## Pages
### 1. **Home Page (`index.tsx`)**
Displays an intro, login link, and Contact CTA.
```tsx
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { apiClient } from '../lib/api';

const Home: React.FC<{ siteSettings: SiteSettings }> = ({ siteSettings }) => {
  const { t } = useTranslation('home');

  return (
    <div className="min-h-screen flex flex-col">
      <Header siteSettings={siteSettings} />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold">{t('welcome')}</h1>
        <p className="mt-4">{t('intro')}</p>
        <Link href="/login" className="text-blue-500 mr-4">{t('login')}</Link>
        <Link href="/contact" className="text-blue-500">{t('contact')}</Link>
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  );
};

export async function getServerSideProps({ locale }) {
  const siteSettings = await apiClient.get('/site-settings').then((res) => res.data);
  return {
    props: {
      siteSettings,
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
}

export default Home;
```

### 2. **Themes Page (`themes/index.tsx`)**
Lists themes with tag filtering.
```tsx
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ThemeCard from '../../components/ThemeCard';
import { apiClient } from '../../lib/api';

const Themes: React.FC<{ themes: Theme[]; tags: Tag[] }> = ({ themes, tags }) => {
  const { t } = useTranslation('themes');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredThemes = selectedTag
    ? themes.filter((theme) => theme.tags.some((tag) => tag._id === selectedTag))
    : themes;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{t('themes')}</h1>
      <div className="flex space-x-2 my-4">
        <button
          onClick={() => setSelectedTag(null)}
          className={`p-2 ${!selectedTag ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {t('all')}
        </button>
        {tags.map((tag) => (
          <button
            key={tag._id}
            onClick={() => setSelectedTag(tag._id)}
            className={`p-2 ${selectedTag === tag._id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {tag.name[t('locale')]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredThemes.map((theme) => (
          <ThemeCard key={theme._id} theme={theme} />
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps({ locale }) {
  const [themes, tags] = await Promise.all([
    apiClient.get('/themes').then((res) => res.data),
    apiClient.get('/tags').then((res) => res.data),
  ]);
  return {
    props: {
      themes,
      tags,
      ...(await serverSideTranslations(locale, ['common', 'themes'])),
    },
  };
}

export default Themes;
```

### 3. **Theme Detail Page (`themes/[id].tsx`)**
Wraps the Nuxt.js Theme Detail component via Module Federation.
```tsx
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ThemeDetail = dynamic(() => import('themeDetail/ThemeDetail'), { ssr: false });

const ThemeDetailPage: React.FC = () => {
  const { t } = useTranslation('themes');
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{t('themeDetail')}</h1>
      <ThemeDetail themeId={id as string} />
    </div>
  );
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'themes'])),
    },
  };
}

export default ThemeDetailPage;
```

## Module Federation Setup
### Next.js Configuration (`next.config.js`)
```javascript
const { withModuleFederation } = require('@module-federation/nextjs-mf');

module.exports = withModuleFederation({
  name: 'web',
  filename: 'static/chunks/remoteEntry.js',
  remotes: {
    themeDetail: 'themeDetail@http://localhost:3001/_nuxt/remoteEntry.js',
  },
  exposes: {},
});
```

## i18n Configuration
### Translation Files (`public/locales/en/common.json`)
```json
{
  "locale": "en",
  "welcome": "Welcome to my Portfolio",
  "login": "Login",
  "contact": "Contact Me"
}
```

### Translation Files (`public/locales/vi/common.json`)
```json
{
  "locale": "vi",
  "welcome": "Welcome to my Portfolio",
  "login": "Login",
  "contact": "Contact Me"
}
```

### i18n Setup (`lib/i18n.ts`)
```typescript
import { i18n } from 'next-i18next';

export const initI18n = () => {
  i18n?.init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common', 'home', 'themes', 'blogs', 'certificates', 'contact'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  });
};
```

## Environment Variables
```plaintext
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<recaptcha-site-key>
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
```

## Deployment
- **Vercel**: Deploy the Next.js app for fast, serverless hosting.
- **Module Federation**: Ensure the Nuxt.js app (Theme Detail) is deployed separately on Vercel and accessible via the remote URL.
- **CI/CD**: Use GitHub Actions to automate builds, tests, and deployments.
  - Example workflow: Lint, test, build, and deploy to Vercel on push to `main`.

## Security
- **reCAPTCHA**: Integrated into the Contact form to prevent spam.
- **API Calls**: Securely fetch data from the Nest.js backend using JWT tokens for authenticated requests.
- **Data Isolation**: Pass `tenantId` in API requests to ensure tenant-specific data retrieval.

## Future Considerations
- **Bookmark/Like**: Add buttons and API calls for bookmarking and liking themes/blogs.
- **Search**: Implement a search bar with backend text search support.
- **Theme Marketplace**: Extend Theme Detail to include purchase options and integrate with a payment API.
- **Performance**: Use Next.js Image Optimization with Cloudinary for faster image loading.

## Conclusion
The **daidev** frontend web app, built with Next.js and integrated with Nuxt.js for Theme Detail, provides a modern, responsive, and multilingual portfolio interface. It leverages Tailwind CSS for styling, `next-i18next` for i18n, and Module Federation for modularity, ensuring a seamless user experience and extensibility for future features.