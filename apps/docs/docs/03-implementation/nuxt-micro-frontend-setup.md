# Theme Detail Webview Implementation

## Overview
Implemented webview system to display HTML themes from modules in theme-detail subapp. Web app can load theme-detail component to preview themes.

## Cấu trúc đã tạo

### 1. Theme Registry (`apps/theme-detail/src/utils/themeRegistry.ts`)
- Quản lý danh sách themes có sẵn
- Các themes: netlify, lovebirds, elisc, dahlia, barbershop
- Functions: `getThemeById`, `getThemesByCategory`, `searchThemes`

### 2. Theme Viewer Component (`apps/theme-detail/src/components/ThemeViewer.vue`)
- Hiển thị theme trong iframe
- Controls: device preview, zoom, fullscreen
- Loading states và error handling

### 3. Theme Gallery Component (`apps/theme-detail/src/components/ThemeGallery.vue`)
- Grid layout hiển thị tất cả themes
- Search và filter theo category
- Preview images và theme info

### 4. Web App Integration
- **ThemeDetail Component** (`apps/web/src/components/ThemeDetail.tsx`)
  - Client component với "use client" directive
  - Embed theme-detail app trong iframe
  - Controls cho device preview và zoom

- **Routes**:
  - `/theme-demo` - Hardcode demo với netlify theme
  - `/theme/[name]` - Dynamic route cho specific theme

### 5. API Endpoints
- `GET /api/themes` - Lấy danh sách themes
- `GET /api/themes/[id]` - Lấy theme theo ID

### 6. Nuxt Configuration
- Static file serving cho modules directory
- CORS và security settings

## Cách test

### 1. Start các apps
```bash
# Terminal 1: Start web app
pnpm dev:web

# Terminal 2: Start theme-detail app  
cd apps/theme-detail && pnpm dev

# Terminal 3: Start API
pnpm dev:api
```

### 2. Test URLs
- **Web App**: http://localhost:3000
- **Theme Demo**: http://localhost:3000/theme-demo
- **Theme Detail**: http://localhost:3000/theme/netlify
- **Theme Detail App**: http://localhost:3003
- **Theme Detail Theme**: http://localhost:3003/theme/netlify

### 3. Navigation
- Click "Theme Demo" trong navigation của web app
- Hoặc truy cập trực tiếp `/theme-demo`

## Vấn đề hiện tại

### 1. Theme-detail app chưa chạy đúng
- Đang serve Next.js content thay vì Nuxt content
- Cần restart theme-detail app với cấu hình đúng

### 2. Static file serving
- Modules directory chưa được serve đúng cách
- Cần cấu hình Nuxt static file serving

## Next Steps

### 1. Fix theme-detail app
```bash
# Stop current theme-detail process
pkill -f "theme-detail"

# Restart với cấu hình đúng
cd apps/theme-detail
pnpm dev
```

### 2. Test static file serving
```bash
# Test modules access
curl http://localhost:3003/modules/netlify/index.html
```

### 3. Verify iframe loading
- Kiểm tra browser console cho CORS errors
- Verify theme HTML files có thể load được

### 4. Add more themes
- Tạo preview images cho các themes
- Update theme registry với thông tin đầy đủ

## Cấu trúc files

```
apps/
├── web/
│   ├── src/
│   │   ├── components/
│   │   │   └── ThemeDetail.tsx
│   │   └── app/
│   │       ├── theme-demo/
│   │       │   └── page.tsx
│   │       └── theme/[name]/
│   │           └── page.tsx
│   └── package.json
└── theme-detail/
    ├── src/
    │   ├── components/
    │   │   ├── ThemeViewer.vue
    │   │   └── ThemeGallery.vue
    │   ├── utils/
    │   │   └── themeRegistry.ts
    │   ├── modules/
    │   │   ├── netlify/
    │   │   ├── lovebirds/
    │   │   ├── elisc/
    │   │   ├── dahlia/
    │   │   └── barbershop/
    │   ├── pages/
    │   │   ├── index.vue
    │   │   └── theme/[name].vue
    │   └── server/api/
    │       └── themes/
    │           ├── index.get.ts
    │           └── [id].get.ts
    ├── nuxt.config.ts
    └── package.json
```

## Features đã implement

### ✅ Completed
- [x] Theme registry với 5 themes
- [x] ThemeViewer component với controls
- [x] ThemeGallery component với search/filter
- [x] Web app integration với iframe
- [x] Dynamic routing cho themes
- [x] API endpoints cho themes
- [x] Navigation integration

### 🔄 In Progress
- [ ] Fix theme-detail app configuration
- [ ] Test static file serving
- [ ] Verify iframe loading

### 📋 Todo
- [ ] Add preview images cho themes
- [ ] Implement theme download functionality
- [ ] Add theme documentation
- [ ] Implement theme customization
- [ ] Add theme categories và tags
- [ ] Implement theme search functionality

## Troubleshooting

### Theme-detail app không load đúng
```bash
# Check process
ps aux | grep theme-detail

# Kill và restart
pkill -f theme-detail
cd apps/theme-detail && pnpm dev
```

### CORS errors
- Kiểm tra nuxt.config.ts CORS settings
- Verify API endpoints có đúng headers

### Static files không load
- Kiểm tra nuxt.config.ts static configuration
- Verify modules directory structure

## ⏱️ Time Spent: ~45 minutes 