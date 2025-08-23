# Phân tích Kiến trúc Hiện tại - Daidev Platform

## Tổng quan Hệ thống

**Daidev** là một platform portfolio đa tenant với 6 subapps chính, được xây dựng theo kiến trúc microservices và monorepo.

## Các Subapps Hiện tại

### 1. **API Backend** (`apps/api/`)
- **Framework**: NestJS + TypeScript
- **Port**: 3001
- **Database**: MongoDB với Mongoose
- **Các Module chính**:
  - `AuthModule` - JWT authentication
  - `UsersModule` - Quản lý người dùng
  - `ThemesModule` - Quản lý themes
  - `BlogsModule` - Quản lý blog posts
  - `CertificatesModule` - Quản lý chứng chỉ
  - `TagsModule` - Quản lý tags
  - `ImagesModule` - Quản lý hình ảnh
  - `ContactMessagesModule` - Quản lý tin nhắn liên hệ
  - `SiteSettingsModule` - Cài đặt website
  - `SkillsModule` - Quản lý kỹ năng
  - `LanguagesModule` - Quản lý ngôn ngữ
  - `ExperienceModule` - Quản lý kinh nghiệm
  - `EducationModule` - Quản lý học vấn
  - `HealthModule` - Health check

**Features**:
- JWT Authentication với Passport
- Rate limiting với Throttler
- Swagger documentation
- CORS configuration
- Multi-tenancy support
- AWS S3 integration (đã cấu hình)

### 2. **Admin Dashboard** (`apps/admin/`)
- **Framework**: React + Vite + TypeScript
- **Port**: 3002
- **UI Framework**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form + Zod validation

**Các trang chính**:
- Dashboard tổng quan
- Users management
- Themes management
- Blogs management
- Certificates management
- Tags management
- Images management
- Messages management
- Site Settings
- Skills management
- Languages management
- Experience management
- Education management

**Features**:
- Role-based access control
- Protected routes
- Real-time data với React Query
- Form validation với Zod
- Responsive design với Tailwind

### 3. **Web Frontend** (`apps/web/`)
- **Framework**: Next.js 14 + TypeScript
- **Port**: 3003
- **Features**: i18n, SSR, API routes

**Các trang chính**:
- Home page
- About page
- Portfolio page
- Resume page
- Blog pages
- Contact page
- Theme demo page
- Dashboard page
- Login page

**Features**:
- Internationalization (i18n)
- Google reCAPTCHA
- Framer Motion animations
- Cloudinary image optimization
- API proxy configuration

### 4. **Theme Detail** (`apps/theme-detail/`)
- **Framework**: Nuxt 3 + Vue.js
- **Port**: 3004
- **Features**: SSR disabled, static rendering

**Chức năng**:
- Hiển thị chi tiết themes
- Micro frontend architecture
- Vue.js components

### 5. **Documentation** (`apps/docs/`)
- **Framework**: Docusaurus 3
- **Port**: 4002
- **Features**: Mermaid diagrams, MDX support

**Nội dung**:
- Architecture documentation
- Implementation guides
- Troubleshooting guides
- Workflow documentation

### 6. **Swagger Proxy** (`apps/swagger-proxy/`)
- **Framework**: Express.js
- **Port**: 4001
- **Chức năng**: Custom Swagger UI interface

## So sánh với Documentation Cũ

### Những điểm đã thay đổi:

1. **Port Configuration**:
   - Admin: 3002 (thay vì 3000)
   - Web: 3003 (thay vì 3000)
   - API: 3001 (giữ nguyên)
   - Theme Detail: 3004 (mới)
   - Docs: 4002 (giữ nguyên)

2. **Tech Stack Updates**:
   - Admin: Sử dụng Vite thay vì Create React App
   - Web: Next.js 14 (cập nhật từ phiên bản cũ)
   - API: Thêm Throttler, Health check
   - Theme Detail: Nuxt 3 (mới)

3. **Features mới**:
   - Rate limiting trong API
   - Health check endpoints
   - Swagger proxy server
   - Enhanced admin dashboard với nhiều modules

4. **Database Schema**:
   - Thêm Skills, Languages, Experience, Education modules
   - Enhanced multi-tenancy support

## Kiến trúc Network

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web App       │    │  Admin Dashboard│    │  Theme Detail   │
│   (Next.js)     │    │   (React)       │    │   (Nuxt.js)     │
│   Port: 3003    │    │   Port: 3002    │    │   Port: 3004    │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │      API Backend          │
                    │      (NestJS)             │
                    │      Port: 3001           │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │      MongoDB              │
                    │      Database             │
                    └───────────────────────────┘

┌─────────────────┐    ┌─────────────────┐
│  Documentation  │    │ Swagger Proxy   │
│  (Docusaurus)   │    │   (Express)     │
│  Port: 4002     │    │   Port: 4001    │
└─────────────────┘    └─────────────────┘
```

## Recommendations

1. **Cập nhật Documentation**: Cần cập nhật tất cả docs để phản ánh port numbers mới
2. **Environment Variables**: Cần document đầy đủ các env vars cho từng app
3. **Deployment**: Cần cập nhật deployment guides cho các port mới
4. **Testing**: Cần thêm integration tests giữa các services
5. **Monitoring**: Cần thêm health checks và monitoring cho tất cả services 