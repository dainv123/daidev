## 📋 Tóm tắt cách fix biến môi trường Vite trong Docker

### �� **Nguyên nhân:**
- Vite chỉ đọc biến môi trường `VITE_*` tại **build time**, không phải runtime
- Dockerfile build mà không có build args → Vite build với giá trị mặc định

### 🛠️ **Cách fix:**

#### 1. **Thêm build args vào docker-compose.yml:**
```yaml
admin:
  build:
    context: ./apps/admin
    dockerfile: Dockerfile
    args:  # ← Thêm section này
      VITE_API_URL: ${VITE_API_URL}
      VITE_APP_NAME: ${VITE_APP_NAME:-Daidev Admin}
      VITE_APP_VERSION: ${VITE_APP_VERSION:-1.0.0}
  environment:  # ← Giữ nguyên
    - VITE_API_URL=${VITE_API_URL}
```

#### 2. **Thêm ARG vào Dockerfile:**
```dockerfile
FROM node:18-alpine as builder

# Thêm ARG declarations
ARG VITE_API_URL
ARG VITE_APP_NAME
ARG VITE_APP_VERSION

WORKDIR /app
# ... rest of Dockerfile
```

#### 3. **Build với env file:**
```bash
docker-compose --env-file .env -f docker-compose.prod.atlas.yml build --no-cache admin
```

#### 4. **Restart container:**
```bash
docker-compose --env-file .env -f docker-compose.prod.atlas.yml up -d admin
```

### ✅ **Kết quả:**
- `import.meta.env.VITE_API_URL` = `http://api.daidev.click/api/v1` ✅
- Thay vì `http://localhost:3001/api/v1` ❌

### �� **Điểm quan trọng:**
- **Build args** = truyền vào build time (cho Vite)
- **Environment** = truyền vào runtime (cho container)
- **Cần cả 2** để hoạt động đúng!


# Build tất cả services với build args
docker-compose --env-file .env -f docker-compose.prod.atlas.yml build --no-cache

# Hoặc build từng service
docker-compose --env-file .env -f docker-compose.prod.atlas.yml build --no-cache admin
docker-compose --env-file .env -f docker-compose.prod.atlas.yml build --no-cache web  
docker-compose --env-file .env -f docker-compose.prod.atlas.yml build --no-cache theme-detail