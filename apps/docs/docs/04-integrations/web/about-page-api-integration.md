# About Page API Integration

## Overview

The About page now fetches dynamic content from the API, including skills, work experience, and education data with multi-language support.

## Architecture

### 1. About Data Hook (`useAboutData`)

**File:** `apps/web/src/hooks/useAboutData.ts`

```typescript
interface AboutData {
  title: { en: string; vi: string };
  subtitle: { en: string; vi: string };
  description: { en: string; vi: string };
  skills: Array<{
    name: { en: string; vi: string };
    percentage: number;
    category: string;
  }>;
  experience: Array<{
    title: { en: string; vi: string };
    company: { en: string; vi: string };
    period: { en: string; vi: string };
    description: { en: string; vi: string };
    order: number;
  }>;
  education: Array<{
    degree: { en: string; vi: string };
    institution: { en: string; vi: string };
    period: { en: string; vi: string };
    description: { en: string; vi: string };
    order: number;
  }>;
}
```

**Features:**
- Fetches data from site settings API
- Handles multi-language content
- Provides fallback values
- Manages loading and error states

### 2. Skills Section Component

**File:** `apps/web/src/components/SkillsSection.tsx`

Displays skills with progress bars, grouped by category:

```typescript
interface Skill {
  name: { en: string; vi: string };
  percentage: number;
  category: string;
}
```

**Features:**
- Groups skills by category (frontend, backend, database, tools)
- Animated progress bars with shimmer effect
- Hover animations
- Multi-language support

### 3. Experience Section Component

**File:** `apps/web/src/components/ExperienceSection.tsx`

Displays work experience and education in timeline format:

```typescript
interface ExperienceItem {
  title: { en: string; vi: string };
  company: { en: string; vi: string };
  period: { en: string; vi: string };
  description: { en: string; vi: string };
  order: number;
}
```

**Features:**
- Timeline layout with markers
- Sorted by order
- Hover effects
- Multi-language support

## API Endpoints

### Site Settings API

**Endpoint:** `GET /api/v1/site-settings`

**Response:** Array of site settings with keys:
- `about_title`
- `about_subtitle`
- `about_description`
- `about_skills`
- `about_experience`
- `about_education`

### Example API Response

```json
{
  "about_title": {
    "en": "About Me",
    "vi": "Giới thiệu"
  },
  "about_skills": [
    {
      "name": {
        "en": "React",
        "vi": "React"
      },
      "percentage": 85,
      "category": "frontend"
    }
  ],
  "about_experience": [
    {
      "title": {
        "en": "Senior Web Developer",
        "vi": "Lập trình viên Web cao cấp"
      },
      "company": {
        "en": "Tech Company",
        "vi": "Công ty Công nghệ"
      },
      "period": {
        "en": "2022 - Present",
        "vi": "2022 - Hiện tại"
      },
      "description": {
        "en": "Leading web development projects...",
        "vi": "Lãnh đạo các dự án phát triển web..."
      },
      "order": 1
    }
  ]
}
```

## Database Schema

### Site Settings Structure

**File:** `apps/api/src/database/seeds/all-settings.seed.ts`

```typescript
{
  key: 'about_skills',
  value: JSON.stringify([
    { 
      name: { en: 'HTML/CSS', vi: 'HTML/CSS' }, 
      percentage: 95, 
      category: 'frontend' 
    }
  ]),
  tenantId: 'default'
}
```

## Components Integration

### AboutSection Component

**File:** `apps/web/src/components/AboutSection.tsx`

```typescript
const AboutSection: React.FC = () => {
  const { aboutData, loading, error } = useAboutData();
  const { t } = useLanguage();

  return (
    <section id="about-me" className="sub-page">
      <div className="section-title">
        <h4>{t(aboutData.title)}</h4>
        <p>{t(aboutData.subtitle)}</p>
      </div>
      
      <div className="section-content">
        <p>{t(aboutData.description)}</p>
        
        <SkillsSection skills={aboutData.skills} />
        
        <ExperienceSection 
          experience={aboutData.experience} 
          education={aboutData.education} 
        />
      </div>
    </section>
  );
};
```

## CSS Styling

### Skills Section

```css
.skills-section {
  margin: 40px 0;
}

.skill-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  transition: all 0.3s ease;
}

.skill-progress-bar {
  background: linear-gradient(90deg, #007bff, #0056b3);
  transition: width 1s ease-in-out;
}
```

### Experience Section

```css
.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #007bff;
}

.timeline-marker {
  position: absolute;
  left: -22px;
  top: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #007bff;
}
```

## Usage Instructions

### 1. Adding New Skills

1. **Update Seed Data:**
   ```typescript
   {
     key: 'about_skills',
     value: JSON.stringify([
       // Add new skill here
       { 
         name: { en: 'New Skill', vi: 'Kỹ năng mới' }, 
         percentage: 90, 
         category: 'frontend' 
       }
     ])
   }
   ```

2. **Run Seed Script:**
   ```bash
   cd apps/api && npx ts-node src/database/seeds/seed.ts
   ```

### 2. Adding New Experience

1. **Update Seed Data:**
   ```typescript
   {
     key: 'about_experience',
     value: JSON.stringify([
       // Add new experience here
       {
         title: { en: 'New Position', vi: 'Vị trí mới' },
         company: { en: 'New Company', vi: 'Công ty mới' },
         period: { en: '2023 - Present', vi: '2023 - Hiện tại' },
         description: { en: 'Description...', vi: 'Mô tả...' },
         order: 1
       }
     ])
   }
   ```

### 3. Adding New Language

1. **Update Interface:**
   ```typescript
   interface AboutData {
     title: { en: string; vi: string; fr: string };
     // ... other fields
   }
   ```

2. **Update Translation Function:**
   ```typescript
   const getLocalizedValue = (value: any, defaultValue: { en: string; vi: string; fr: string }) => {
     // ... handle new language
   };
   ```

## Testing

### Manual Testing

1. **Load About Page:**
   ```bash
   # Visit about page
   open http://localhost:3000/about
   ```

2. **Test Language Switching:**
   - Click EN/VI buttons
   - Verify content changes
   - Check skills percentages
   - Verify timeline content

3. **Test API Response:**
   ```bash
   # Check API data
   curl http://localhost:3001/api/v1/site-settings | jq '.[] | select(.key | startswith("about_"))'
   ```

### Debug Tips

1. **Check Loading State:**
   ```typescript
   console.log('Loading:', loading);
   console.log('Error:', error);
   ```

2. **Check Data:**
   ```typescript
   console.log('About Data:', aboutData);
   ```

3. **Check Skills:**
   ```typescript
   console.log('Skills:', aboutData.skills);
   ```

## Troubleshooting

### Common Issues

1. **Skills Not Loading**
   - Check API response format
   - Verify JSON parsing
   - Check category mapping

2. **Timeline Not Displaying**
   - Verify experience/education data
   - Check order sorting
   - Ensure CSS is loaded

3. **Language Not Switching**
   - Check translation function
   - Verify data format
   - Test with different languages

### Performance Optimization

1. **Memoization:**
   ```typescript
   const sortedSkills = useMemo(() => 
     skills.sort((a, b) => a.order - b.order), 
     [skills]
   );
   ```

2. **Lazy Loading:**
   ```typescript
   const SkillsSection = lazy(() => import('./SkillsSection'));
   ```

## Future Enhancements

1. **Dynamic Skill Categories** - Load from API
2. **Skill Icons** - Add icons for each skill
3. **Interactive Timeline** - Click to expand details
4. **Skill Filtering** - Filter by category
5. **Export Resume** - Generate PDF from data
6. **Admin Interface** - Manage content via admin panel 