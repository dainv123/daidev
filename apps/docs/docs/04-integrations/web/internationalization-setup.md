# Multi-Language Support Documentation

## Overview

The web application now supports multiple languages (English and Vietnamese) with a flexible translation system.

## Architecture

### 1. Language Management Hook (`useLanguage`)

**File:** `apps/web/src/hooks/useLanguage.ts`

```typescript
interface LanguageContext {
  language: Language;           // Current language ('en' | 'vi')
  setLanguage: (lang: Language) => void;  // Change language
  t: (text: string | { en: string; vi: string }) => string;  // Translation function
}
```

**Features:**
- Auto-detects browser language
- Persists language preference in localStorage
- Provides translation function `t()`
- Fallback to English if translation not available

### 2. Translation Function

```typescript
const { t } = useLanguage();

// For simple strings
t("Hello") // Returns "Hello" (no translation needed)

// For localized objects
t({ en: "Hello", vi: "Xin chào" }) // Returns based on current language
```

### 3. Language Switcher Component

**File:** `apps/web/src/components/LanguageSwitcher.tsx`

- Fixed position in top-right corner
- EN/VI toggle buttons
- Visual feedback for active language
- Responsive design

## Data Structure

### API Response Format

```json
{
  "hero_title": {
    "en": "Hello I'm Dai Nguyen",
    "vi": "Xin chào, tôi là Đại Nguyễn"
  },
  "contact_button_text": {
    "en": "Contact Me",
    "vi": "Liên hệ"
  }
}
```

### Menu Items Format

```json
{
  "header_menu_items": [
    {
      "label": {
        "en": "Home",
        "vi": "Trang chủ"
      },
      "url": "#home",
      "icon": "fas fa-home",
      "order": 1
    }
  ]
}
```

## Implementation in Components

### 1. HomeSection Component

```typescript
const HomeSection: React.FC = () => {
  const { homeData, loading, error } = useHomeData();
  const { t } = useLanguage();

  return (
    <h2>{t(homeData.heroTitle)}</h2>
    <button>{t(homeData.contactButtonText)}</button>
  );
};
```

### 2. Header Component

```typescript
const Header: React.FC = () => {
  const { headerData, loading, error } = useHeaderData();
  const { t } = useLanguage();

  return (
    <div className="site-title">{t(headerData.title)}</div>
    {sortedMenuItems.map(item => (
      <a href={item.url}>
        <i className={item.icon}></i> {t(item.label)}
      </a>
    ))}
  );
};
```

## Backward Compatibility

The system handles both old and new data formats:

### Old Format (String)
```json
{
  "hero_title": "Hello I'm Dai Nguyen"
}
```

### New Format (Object)
```json
{
  "hero_title": {
    "en": "Hello I'm Dai Nguyen",
    "vi": "Xin chào, tôi là Đại Nguyễn"
  }
}
```

**Helper Function:**
```typescript
const getLocalizedValue = (value: any, defaultValue: { en: string; vi: string }) => {
  if (!value) return defaultValue;
  if (typeof value === 'string') {
    // Old format - return as English
    return { en: value, vi: value };
  }
  if (typeof value === 'object' && value.en && value.vi) {
    // New format
    return value;
  }
  return defaultValue;
};
```

## Database Seed Data

### Multi-Language Settings

**File:** `apps/api/src/database/seeds/all-settings.seed.ts`

Contains 30 site settings with multi-language support:

- **Home Page:** hero_title, hero_subtitle, contact_button_text, etc.
- **Header:** header_name, header_title, header_menu_items, etc.
- **About Page:** about_title, about_description, etc.
- **Portfolio Page:** portfolio_title, portfolio_subtitle, etc.
- **Contact Page:** contact_title, contact_description, etc.

### Example Seed Entry

```typescript
{
  key: 'hero_title',
  value: {
    en: "Hello I'm Dai Nguyen",
    vi: "Xin chào, tôi là Đại Nguyễn"
  },
  tenantId: 'default'
}
```

## Usage Instructions

### 1. Adding New Localized Content

1. **Update API Schema** (if needed)
2. **Add to Seed Data** with both languages
3. **Update Hook Interface** to use localized format
4. **Use `t()` function** in component

### 2. Adding New Language

1. **Update Language Type:**
   ```typescript
   export type Language = 'en' | 'vi' | 'fr'; // Add new language
   ```

2. **Update Translation Function:**
   ```typescript
   const t = (text: string | { en: string; vi: string; fr: string }) => {
     if (typeof text === 'string') return text;
     return text[language] || text.en || '';
   };
   ```

3. **Update Seed Data** with new language translations
4. **Update Language Switcher** to include new language

### 3. Testing

1. **Start API Server:**
   ```bash
   cd apps/api && npm run start:dev
   ```

2. **Start Web App:**
   ```bash
   cd apps/web && npm run dev
   ```

3. **Test Language Switching:**
   - Click EN/VI buttons in top-right corner
   - Verify content changes
   - Check localStorage persistence

## CSS Styling

### Language Switcher Styles

```css
.language-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  gap: 5px;
  background: rgba(255, 255, 255, 0.9);
  padding: 5px;
  border-radius: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.lang-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 20px;
  background: transparent;
  color: #666;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.lang-btn.active {
  background: #007bff;
  color: white;
}
```

## Troubleshooting

### Common Issues

1. **"Objects are not valid as React child" Error**
   - Ensure using `t()` function for localized objects
   - Check data format in API response

2. **Language Not Persisting**
   - Check localStorage permissions
   - Verify `setLanguage` function is called

3. **Translation Not Working**
   - Verify data format in database
   - Check `getLocalizedValue` helper function
   - Ensure fallback values are provided

### Debug Tips

1. **Check Current Language:**
   ```typescript
   console.log('Current language:', language);
   ```

2. **Check Translation Function:**
   ```typescript
   console.log('Translation result:', t({ en: 'Hello', vi: 'Xin chào' }));
   ```

3. **Check API Data:**
   ```bash
   curl http://localhost:3001/api/v1/site-settings
   ```

## Future Enhancements

1. **Dynamic Language Loading** - Load translations from API
2. **RTL Support** - Right-to-left language support
3. **Pluralization** - Handle plural forms
4. **Date/Number Formatting** - Locale-specific formatting
5. **SEO Optimization** - Language-specific meta tags 