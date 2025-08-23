# Port Configuration Guide - Daidev Platform

## Tổng quan Port Configuration

Hệ thống Daidev sử dụng 6 subapps với các port khác nhau để tránh xung đột và dễ quản lý.

## Port Mapping

| Subapp | Port | Framework | Mục đích |
|--------|------|-----------|----------|
| **API Backend** | 3001 | NestJS | REST API cho toàn bộ hệ thống |
| **Admin Dashboard** | 3002 | React + Vite | Giao diện quản trị |
| **Web Frontend** | 3003 | Next.js | Website portfolio chính |
| **Theme Detail** | 3004 | Nuxt.js | Micro frontend cho theme details |
| **Documentation** | 4002 | Docusaurus | Tài liệu kỹ thuật |
| **Swagger Proxy** | 4001 | Express.js | Swagger UI interface |

## Cấu hình Port trong từng App

### 1. API Backend (Port 3001)

**File**: `apps/api/src/main.ts`
```typescript
const port = 3001;
await app.listen(port);
console.log(`🚀 Application is running on: http://localhost:${port}`);
```

### 2. Admin Dashboard (Port 3002)

**File**: `apps/admin/vite.config.ts`
```typescript
export default defineConfig({
  server: {
    port: 3002,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
```

### 3. Web Frontend (Port 3003)

**File**: `apps/web/package.json`
```json
{
  "scripts": {
    "dev": "next dev -p 3003"
  }
}
```

### 4. Theme Detail (Port 3004)

**File**: `apps/theme-detail/nuxt.config.ts`
```typescript
export default defineNuxtConfig({
  vite: {
    server: {
      port: 3004,
      strictPort: true
    }
  }
})
```

### 5. Documentation (Port 4002)

**File**: `apps/docs/package.json`
```json
{
  "scripts": {
    "start": "PORT=4002, docusaurus start"
  }
}
```

### 6. Swagger Proxy (Port 4001)

**File**: `apps/swagger-proxy/swagger-proxy.js`
```javascript
app.listen(4001, () => {
  console.log('Swagger Proxy UI running at http://localhost:4001/');
});
```

## Environment Variables

### API Backend
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/daidev
JWT_SECRET=your-jwt-secret
FRONTEND_URLS=http://localhost:3002,http://localhost:3003
```

### Admin Dashboard
```env
VITE_API_URL=http://localhost:3001/api/v1
VITE_APP_PORT=3002
```

### Web Frontend
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_APP_PORT=3003
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
```

## Development Workflow

### Khởi động tất cả services
```bash
# Terminal 1 - API Backend
cd apps/api && npm run dev

# Terminal 2 - Admin Dashboard  
cd apps/admin && npm run dev

# Terminal 3 - Web Frontend
cd apps/web && npm run dev

# Terminal 4 - Theme Detail
cd apps/theme-detail && npm run dev

# Terminal 5 - Documentation
cd apps/docs && npm start

# Terminal 6 - Swagger Proxy
cd apps/swagger-proxy && npm start
```

### URLs trong Development
- **API**: http://localhost:3001
- **Admin**: http://localhost:3002
- **Web**: http://localhost:3003
- **Theme Detail**: http://localhost:3004
- **Docs**: http://localhost:4002
- **Swagger**: http://localhost:4001

## Production Configuration

### Docker Compose Example
```yaml
version: '3.8'
services:
  api:
    build: ./apps/api
    ports:
      - "3001:3001"
    environment:
      - PORT=3001
      
  admin:
    build: ./apps/admin
    ports:
      - "3002:3002"
    environment:
      - VITE_API_URL=https://api.daidev.com
      
  web:
    build: ./apps/web
    ports:
      - "3003:3003"
    environment:
      - NEXT_PUBLIC_API_URL=https://api.daidev.com
      
  theme-detail:
    build: ./apps/theme-detail
    ports:
      - "3004:3004"
      
  docs:
    build: ./apps/docs
    ports:
      - "4002:4002"
      
  swagger-proxy:
    build: ./apps/swagger-proxy
    ports:
      - "4001:4001"
```

## Troubleshooting

### Port đã được sử dụng
```bash
# Kiểm tra port đang sử dụng
lsof -i :3001
lsof -i :3002
lsof -i :3003
lsof -i :3004
lsof -i :4001
lsof -i :4002

# Kill process sử dụng port
kill -9 <PID>
```

### CORS Issues
Đảm bảo API backend có cấu hình CORS đúng:
```typescript
app.enableCors({
  origin: ['http://localhost:3002', 'http://localhost:3003'],
  credentials: true,
});
```

### Proxy Issues
Kiểm tra cấu hình proxy trong Vite config của admin dashboard.

## Monitoring

### Health Check Endpoints
- **API**: http://localhost:3001/api/v1/health
- **Admin**: http://localhost:3002 (frontend app)
- **Web**: http://localhost:3003 (frontend app)

### Logs
Mỗi service có logs riêng:
- API: Console logs + file logs
- Admin: Browser console + Vite dev server
- Web: Browser console + Next.js dev server
- Theme Detail: Browser console + Nuxt dev server 