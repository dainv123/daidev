# Updated Documentation - Daidev Platform

## Tổng quan

Thư mục này chứa các tài liệu đã được cập nhật dựa trên việc phân tích và verify codebase hiện tại của hệ thống Daidev. Các tài liệu này phản ánh trạng thái thực tế của hệ thống sau quá trình phát triển.

## Các file trong thư mục này

### 1. **current-architecture-analysis.md**
- Phân tích kiến trúc hiện tại của hệ thống
- Mô tả chi tiết 6 subapps
- Kiến trúc network và data flow
- Recommendations cho cải thiện

### 2. **port-configuration-guide.md**
- Hướng dẫn cấu hình port cho tất cả subapps
- Port mapping chi tiết
- Environment variables setup
- Troubleshooting port conflicts

### 3. **environment-setup-guide.md**
- Hướng dẫn setup môi trường development
- Prerequisites và system requirements
- Installation steps chi tiết
- External services setup (Cloudinary, Resend, Google)
- Troubleshooting common issues

### 4. **api-modules-analysis.md**
- Phân tích chi tiết các API modules
- Database schemas cho tất cả collections
- API endpoints summary
- Security features và external integrations
- Multi-tenancy support

### 5. **differences-from-original-docs.md**
- So sánh documentation cũ vs hiện tại
- Những thay đổi chính trong architecture
- Tech stack updates
- Migration guide cho developers và DevOps

## Những thay đổi chính so với docs cũ

### 🔄 **Port Configuration**
- Admin Dashboard: 3000 → 3002
- Web Frontend: 3000 → 3003
- Thêm Swagger Proxy: 4001

### ➕ **New Subapps**
- Documentation (Docusaurus): 4002
- Swagger Proxy (Express): 4001

### 🔧 **Tech Stack Updates**
- Admin: Create React App → Vite
- Web: Next.js → Next.js 14
- API: Thêm Throttler, Health checks

### 📊 **New API Modules**
- SkillsModule
- LanguagesModule
- ExperienceModule
- EducationModule
- HealthModule

### 🛡️ **Enhanced Security**
- Rate limiting
- Enhanced CORS
- Better validation
- Health check endpoints

## Cách sử dụng

### Cho Developers
1. Đọc `environment-setup-guide.md` để setup môi trường
2. Tham khảo `port-configuration-guide.md` cho port setup
3. Xem `api-modules-analysis.md` để hiểu API structure

### Cho DevOps
1. Xem `current-architecture-analysis.md` để hiểu system architecture
2. Tham khảo `port-configuration-guide.md` cho deployment
3. Đọc `differences-from-original-docs.md` để update CI/CD

### Cho Documentation
1. Sử dụng các file này làm base cho docs chính thức
2. Update existing documentation với thông tin mới
3. Tạo migration guides cho users

## Development URLs

| Service | URL | Port | Framework |
|---------|-----|------|-----------|
| **API Backend** | http://localhost:3001 | 3001 | NestJS |
| **Admin Dashboard** | http://localhost:3002 | 3002 | React + Vite |
| **Web Frontend** | http://localhost:3003 | 3003 | Next.js 14 |
| **Theme Detail** | http://localhost:3004 | 3004 | Nuxt.js 3 |
| **Documentation** | http://localhost:4002 | 4002 | Docusaurus 3 |
| **Swagger Proxy** | http://localhost:4001 | 4001 | Express.js |

## Quick Start Commands

```bash
# Start all services
npx turbo dev

# Start specific services
npx turbo dev --filter=@daidev/api
npx turbo dev --filter=@daidev/admin
npx turbo dev --filter=@daidev/web

# Build all services
npx turbo build

# Run tests
npx turbo test
```

## Health Checks

```bash
# API Health
curl http://localhost:3001/api/v1/health

# Check all services
for port in 3001 3002 3003 3004 4001 4002; do
  echo "Port $port: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:$port || echo "DOWN")"
done
```

## Environment Variables

### Root Level (.env)
```env
MONGODB_URI=mongodb://localhost:27017/daidev
JWT_SECRET=your-jwt-secret
FRONTEND_URLS=http://localhost:3002,http://localhost:3003,http://localhost:3004
```

### API Backend (.env)
```env
PORT=3001
NODE_ENV=development
```

### Admin Dashboard (.env)
```env
VITE_API_URL=http://localhost:3001/api/v1
VITE_APP_PORT=3002
```

### Web Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_APP_PORT=3003
```

## Database Collections

### Core Collections
- `users` - User management
- `themes` - Portfolio themes
- `blogs` - Blog posts
- `certificates` - User certificates
- `tags` - Tag management
- `images` - Image metadata
- `contact_messages` - Contact form submissions
- `site_settings` - Website configuration

### New Collections
- `skills` - User skills
- `languages` - Language proficiency
- `experience` - Work experience
- `education` - Educational background

## API Endpoints

### Base URL
```
http://localhost:3001/api/v1
```

### Main Endpoints
- `GET /health` - Health check
- `POST /auth/login` - User login
- `GET /users` - Get users
- `GET /themes` - Get themes
- `GET /blogs` - Get blogs
- `GET /certificates` - Get certificates
- `GET /skills` - Get skills
- `GET /languages` - Get languages
- `GET /experience` - Get experience
- `GET /education` - Get education

## Troubleshooting

### Common Issues
1. **Port conflicts**: Check `port-configuration-guide.md`
2. **Environment variables**: Verify `.env` files
3. **Database connection**: Check MongoDB status
4. **CORS issues**: Verify `FRONTEND_URLS` configuration

### Debug Commands
```bash
# Check ports
lsof -i :3001
lsof -i :3002
lsof -i :3003
lsof -i :3004
lsof -i :4001
lsof -i :4002

# Check MongoDB
brew services list | grep mongodb

# Clear node_modules
rm -rf node_modules apps/*/node_modules
npm install
```

## Next Steps

1. **Update existing documentation** với thông tin mới
2. **Create migration guides** cho users
3. **Enhance monitoring** và logging
4. **Add comprehensive testing**
5. **Improve security measures**
6. **Deploy to production**

## Contributing

Khi cập nhật documentation:
1. Verify thông tin với codebase hiện tại
2. Test các commands và procedures
3. Update port numbers và URLs
4. Add troubleshooting guides
5. Keep documentation synchronized với code changes

---

**Lưu ý**: Các tài liệu này phản ánh trạng thái hiện tại của hệ thống. Hãy cập nhật khi có thay đổi trong codebase. 