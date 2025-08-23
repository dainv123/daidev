# Next.js Routing Implementation

## Overview

The web application now uses Next.js App Router for navigation instead of hash-based routing. This provides better SEO, faster page loads, and proper browser history management.

## File Structure

```
apps/web/src/app/
├── page.tsx              # Home page (/)
├── about/
│   └── page.tsx          # About page (/about)
├── portfolio/
│   └── page.tsx          # Portfolio page (/portfolio)
├── contact/
│   └── page.tsx          # Contact page (/contact)
├── resume/
│   └── page.tsx          # Resume page (/resume)
├── blog/
│   └── page.tsx          # Blog page (/blog)
└── layout.tsx            # Root layout
```

## Route Mapping

| Hash Route | Next.js Route | Component |
|------------|---------------|-----------|
| `#home` | `/` | `HomeSection` |
| `#about-me` | `/about` | `AboutSection` |
| `#portfolio` | `/portfolio` | `PortfolioSection` |
| `#contact` | `/contact` | `ContactSection` |
| `#resume` | `/resume` | `ResumeSection` |
| `#blog` | `/blog` | `BlogSection` |

## Components

### 1. Navigation Component

**File:** `apps/web/src/components/Navigation.tsx`

Handles menu rendering and active state management:

```typescript
interface MenuItem {
  label: { en: string; vi: string };
  url: string;
  icon: string;
  order: number;
}

const Navigation: React.FC<NavigationProps> = ({ menuItems }) => {
  const { t } = useLanguage();
  const pathname = usePathname();

  return (
    <ul className="header-main-menu">
      {sortedMenuItems.map((item, index) => {
        const isActive = (item.url === "/" && pathname === "/") || 
                        (item.url !== "/" && pathname === item.url);
        
        return (
          <li key={index}>
            <Link href={item.url} className={isActive ? "active" : ""}>
              <i className={item.icon}></i> {t(item.label)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
```

### 2. Page Components

Each page follows the same structure:

```typescript
"use client";

import React from "react";
import Header from "../../components/Header";
import SectionComponent from "../../components/SectionComponent";

export default function PageName() {
  return (
    <>
      <Header />
      <div className="content-pages">
        <div className="sub-home-pages">
          <SectionComponent />
        </div>
      </div>
    </>
  );
}
```

## Database Configuration

### Menu Items Structure

Updated in `apps/api/src/database/seeds/all-settings.seed.ts`:

```typescript
{
  key: 'header_menu_items',
  value: JSON.stringify([
    { 
      label: { en: 'Home', vi: 'Trang chủ' }, 
      url: '/', 
      icon: 'fas fa-home', 
      order: 1 
    },
    { 
      label: { en: 'About Me', vi: 'Giới thiệu' }, 
      url: '/about', 
      icon: 'fas fa-user-tie', 
      order: 2 
    },
    // ... other menu items
  ]),
  tenantId: 'default'
}
```

## Active State Management

### Current Route Detection

Uses `usePathname()` from Next.js to detect current route:

```typescript
import { usePathname } from "next/navigation";

const pathname = usePathname();
const isActive = (item.url === "/" && pathname === "/") || 
                (item.url !== "/" && pathname === item.url);
```

### CSS Classes

Active menu items get the `active` class:

```css
.header-main-menu li a.active {
  color: #007bff;
  background: rgba(0, 123, 255, 0.1);
}
```

## Link Components

### Next.js Link Usage

All navigation uses Next.js `Link` component for client-side routing:

```typescript
import Link from "next/link";

<Link href="/about" className={isActive ? "active" : ""}>
  <i className="fas fa-user-tie"></i> About Me
</Link>
```

### Button Links

Home page buttons also use Next.js routing:

```typescript
<Link href="/contact" className="bt-submit">
  <i className="lnr lnr-envelope"></i> Contact Me
</Link>
```

## Benefits

### 1. SEO Improvements
- Each page has its own URL
- Better search engine indexing
- Proper meta tags per page

### 2. Performance
- Faster page transitions
- No full page reloads
- Better caching

### 3. User Experience
- Proper browser back/forward buttons
- Bookmarkable URLs
- Shareable links

### 4. Development
- Type-safe routing
- Better error handling
- Easier testing

## Migration from Hash Routing

### Before (Hash Routing)
```typescript
<a href="#about-me">About Me</a>
<a href="#portfolio">Portfolio</a>
```

### After (Next.js Routing)
```typescript
<Link href="/about">About Me</Link>
<Link href="/portfolio">Portfolio</Link>
```

## Testing

### Manual Testing
1. **Home Page:** `http://localhost:3000/`
2. **About Page:** `http://localhost:3000/about`
3. **Portfolio Page:** `http://localhost:3000/portfolio`
4. **Contact Page:** `http://localhost:3000/contact`
5. **Resume Page:** `http://localhost:3000/resume`
6. **Blog Page:** `http://localhost:3000/blog`

### Navigation Testing
- Click menu items
- Verify active states
- Test browser back/forward
- Check URL changes
- Test direct URL access

## Troubleshooting

### Common Issues

1. **404 Errors**
   - Ensure page files exist in correct locations
   - Check file naming (`page.tsx`)
   - Verify export default function

2. **Active State Not Working**
   - Check `usePathname()` hook
   - Verify route matching logic
   - Ensure CSS classes are applied

3. **Links Not Working**
   - Verify `Link` component import
   - Check href values
   - Ensure Next.js is properly configured

### Debug Tips

1. **Check Current Route:**
   ```typescript
   console.log('Current pathname:', pathname);
   ```

2. **Verify Menu Items:**
   ```typescript
   console.log('Menu items:', menuItems);
   ```

3. **Test Active State:**
   ```typescript
   console.log('Is active:', isActive);
   ```

## Future Enhancements

1. **Dynamic Routes** - Support for dynamic blog posts
2. **Nested Routes** - Sub-sections within pages
3. **Route Guards** - Authentication-based routing
4. **Loading States** - Page transition animations
5. **Error Boundaries** - Better error handling 