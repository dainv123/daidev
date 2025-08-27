# Docker Containerization Guide

This guide covers Docker configuration, containerization strategy, and deployment for the daidev platform.

## 🐳 Docker Architecture

### Container Structure
The daidev platform uses a microservices architecture with the following containers:

```plaintext
daidev/
├── mongodb/          # MongoDB Database
├── api/             # Nest.js Backend API
├── admin/           # React Admin Dashboard
├── web/             # Next.js Public Web App
├── theme-detail/    # Nuxt.js Theme Detail Micro Frontend
├── docs/            # Docusaurus Documentation
└── swagger-proxy/   # API Documentation Proxy
```

### Docker Compose Configuration

#### Development Environment (`docker-compose.yml`)
```yaml
version: "3.9"

services:
  # MongoDB Database
  mongodb:
    image: mongo:7.0
    container_name: daidev-mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: ${MONGODB_ROOT_PASSWORD:-your-mongodb-password}
      MONGO_INITDB_DATABASE: daidev
    volumes:
      - mongodb_data:/data/db
    networks:
      - daidev-network
    ports:
      - "27017:27017"

  # API Backend
  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile
    container_name: daidev-api
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - PORT=3001
      - MONGODB_URI=mongodb://admin:${MONGODB_ROOT_PASSWORD:-your-mongodb-password}@mongodb:27017/daidev?authSource=admin
      - JWT_SECRET=${JWT_SECRET:-your-super-secret-jwt-key-here}
      - JWT_EXPIRES_IN=${JWT_EXPIRES_IN:-7d}
      - RESEND_API_KEY=${RESEND_API_KEY}
      - CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
      - CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
      - CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
      - GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}
      - GOOGLE_RECAPTCHA_SITE_KEY=${GOOGLE_RECAPTCHA_SITE_KEY}
      - GOOGLE_RECAPTCHA_SECRET_KEY=${GOOGLE_RECAPTCHA_SECRET_KEY}
      - FRONTEND_URLS=${FRONTEND_URLS:-http://localhost:3002,http://localhost:3003,http://localhost:3004}
    depends_on:
      - mongodb
    networks:
      - daidev-network
    ports:
      - "3001:3001"

  # Admin Dashboard
  admin:
    build:
      context: ./apps/admin
      dockerfile: Dockerfile
    container_name: daidev-admin
    restart: unless-stopped
    environment:
      - VITE_API_URL=${VITE_API_URL:-http://localhost:3001/api/v1}
      - VITE_APP_NAME=${VITE_APP_NAME:-Daidev Admin}
      - VITE_APP_VERSION=${VITE_APP_VERSION:-1.0.0}
    networks:
      - daidev-network
    ports:
      - "3002:3002"

  # Web Frontend
  web:
    build:
      context: ./apps/web
      dockerfile: Dockerfile
    container_name: daidev-web
    restart: unless-stopped
    environment:
      - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:3001/api/v1}
      - NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME:-Daidev Portfolio}
      - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}
      - NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=${GOOGLE_RECAPTCHA_SITE_KEY}
    networks:
      - daidev-network
    ports:
      - "3003:3000"

  # Theme Detail
  theme-detail:
    build:
      context: ./apps/theme-detail
      dockerfile: Dockerfile
    container_name: daidev-theme-detail
    restart: unless-stopped
    networks:
      - daidev-network
    ports:
      - "3004:3004"

  # Documentation
  docs:
    build:
      context: ./apps/docs
      dockerfile: Dockerfile
    container_name: daidev-docs
    restart: unless-stopped
    networks:
      - daidev-network
    ports:
      - "3005:3000"

  # Swagger Proxy
  swagger-proxy:
    build:
      context: ./apps/swagger-proxy
      dockerfile: Dockerfile
    container_name: daidev-swagger-proxy
    restart: unless-stopped
    networks:
      - daidev-network
    ports:
      - "3006:3000"

networks:
  daidev-network:
    driver: bridge

volumes:
  mongodb_data:
```

#### Production Environment (`docker-compose.prod.yml`)
```yaml
version: "3.9"

services:
  # API Backend (Production)
  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile
    container_name: daidev-api-prod
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - PORT=3001
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
      - JWT_EXPIRES_IN=${JWT_EXPIRES_IN}
      - RESEND_API_KEY=${RESEND_API_KEY}
      - CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
      - CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
      - CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
      - GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}
      - GOOGLE_RECAPTCHA_SITE_KEY=${GOOGLE_RECAPTCHA_SITE_KEY}
      - GOOGLE_RECAPTCHA_SECRET_KEY=${GOOGLE_RECAPTCHA_SECRET_KEY}
      - FRONTEND_URLS=${FRONTEND_URLS}
    networks:
      - daidev-network
    ports:
      - "3001:3001"

  # Admin Dashboard (Production)
  admin:
    build:
      context: ./apps/admin
      dockerfile: Dockerfile
    container_name: daidev-admin-prod
    restart: unless-stopped
    environment:
      - VITE_API_URL=${VITE_API_URL}
      - VITE_APP_NAME=${VITE_APP_NAME}
      - VITE_APP_VERSION=${VITE_APP_VERSION}
    networks:
      - daidev-network
    ports:
      - "3002:3002"

  # Web Frontend (Production)
  web:
    build:
      context: ./apps/web
      dockerfile: Dockerfile
    container_name: daidev-web-prod
    restart: unless-stopped
    environment:
      - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
      - NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME}
      - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}
      - NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=${GOOGLE_RECAPTCHA_SITE_KEY}
    networks:
      - daidev-network
    ports:
      - "3003:3000"

  # Theme Detail (Production)
  theme-detail:
    build:
      context: ./apps/theme-detail
      dockerfile: Dockerfile
    container_name: daidev-theme-detail-prod
    restart: unless-stopped
    networks:
      - daidev-network
    ports:
      - "3004:3004"

  # Documentation (Production)
  docs:
    build:
      context: ./apps/docs
      dockerfile: Dockerfile
    container_name: daidev-docs-prod
    restart: unless-stopped
    networks:
      - daidev-network
    ports:
      - "3005:3000"

  # Swagger Proxy (Production)
  swagger-proxy:
    build:
      context: ./apps/swagger-proxy
      dockerfile: Dockerfile
    container_name: daidev-swagger-proxy-prod
    restart: unless-stopped
    networks:
      - daidev-network
    ports:
      - "3006:3000"

networks:
  daidev-network:
    driver: bridge
```

## 🏗️ Dockerfile Configurations

### API Backend (`apps/api/Dockerfile`)
```dockerfile
# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:prod"]
```

### Admin Dashboard (`apps/admin/Dockerfile`)
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 3002

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Web Frontend (`apps/web/Dockerfile`)
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

### Theme Detail (`apps/theme-detail/Dockerfile`)
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/.output/public /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 3004

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Documentation (`apps/docs/Dockerfile`)
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the documentation
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Swagger Proxy (`apps/swagger-proxy/Dockerfile`)
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "swagger-proxy.js"]
```

## 🚀 Docker Commands

### Development Commands
```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up -d api

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f api

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild and start
docker-compose up -d --build

# Rebuild specific service
docker-compose up -d --build api
```

### Production Commands
```bash
# Production deployment
docker-compose -f docker-compose.prod.yml up -d

# Production with MongoDB Atlas
docker-compose -f docker-compose.prod.atlas.yml up -d

# View production logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop production services
docker-compose -f docker-compose.prod.yml down
```

### Maintenance Commands
```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Remove stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune

# Clean up everything
docker system prune -a
```

## 🔧 Environment Configuration

### Environment Variables
Each service requires specific environment variables:

#### API Backend
```bash
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb://admin:password@mongodb:27017/daidev?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
RESEND_API_KEY=your-resend-api-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
GOOGLE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
GOOGLE_RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
FRONTEND_URLS=http://localhost:3002,http://localhost:3003,http://localhost:3004
```

#### Admin Dashboard
```bash
VITE_API_URL=http://localhost:3001/api/v1
VITE_APP_NAME=Daidev Admin
VITE_APP_VERSION=1.0.0
```

#### Web Frontend
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_APP_NAME=Daidev Portfolio
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```

### Environment File Setup
```bash
# Copy environment template
cp env.example .env

# Edit environment variables
nano .env

# Validate environment
./deployment/validate-env.sh
```

## 🔒 Security Considerations

### Container Security
- Use non-root users in containers
- Keep base images updated
- Scan images for vulnerabilities
- Use multi-stage builds
- Minimize attack surface

### Network Security
- Use internal networks for inter-service communication
- Expose only necessary ports
- Use reverse proxy (nginx) for external access
- Implement proper CORS configuration

### Data Security
- Use secrets management for sensitive data
- Encrypt data in transit and at rest
- Regular security updates
- Monitor container logs

## 📊 Monitoring and Logging

### Container Monitoring
```bash
# Monitor resource usage
docker stats

# Monitor specific container
docker stats daidev-api

# View container logs
docker logs daidev-api

# Follow logs in real-time
docker logs -f daidev-api
```

### Health Checks
```bash
# Check API health
curl http://localhost:3001/api/v1/health

# Check web app
curl http://localhost:3003

# Check admin dashboard
curl http://localhost:3002
```

### Log Management
```bash
# View all logs
docker-compose logs

# View logs with timestamps
docker-compose logs -t

# View logs for specific time period
docker-compose logs --since="2023-01-01T00:00:00"

# Export logs
docker-compose logs > logs.txt
```

## 🚨 Troubleshooting

### Common Issues

#### Container Won't Start
```bash
# Check container logs
docker logs container-name

# Check container status
docker ps -a

# Restart container
docker restart container-name

# Remove and recreate container
docker-compose up -d --force-recreate service-name
```

#### Port Conflicts
```bash
# Check port usage
netstat -tulpn | grep :3001

# Kill process using port
sudo kill -9 PID

# Use different port
docker-compose up -d -p 3001:3002
```

#### Memory Issues
```bash
# Check memory usage
docker stats

# Increase memory limit
docker-compose up -d --memory=2g

# Clean up unused resources
docker system prune
```

#### Network Issues
```bash
# Check network configuration
docker network ls

# Inspect network
docker network inspect daidev_daidev-network

# Recreate network
docker-compose down
docker network prune
docker-compose up -d
```

### Recovery Procedures

#### Complete System Recovery
```bash
# Stop all containers
docker-compose down

# Remove all containers and volumes
docker-compose down -v

# Clean up Docker system
docker system prune -a

# Rebuild and start
docker-compose up -d --build
```

#### Data Recovery
```bash
# Backup MongoDB data
docker exec daidev-mongodb mongodump --out /backup

# Copy backup from container
docker cp daidev-mongodb:/backup ./backup

# Restore MongoDB data
docker exec -i daidev-mongodb mongorestore /backup
```

## 📋 Best Practices

### Image Optimization
- Use multi-stage builds
- Minimize layer count
- Use .dockerignore files
- Optimize base images
- Remove unnecessary files

### Resource Management
- Set memory and CPU limits
- Use resource constraints
- Monitor resource usage
- Implement auto-scaling

### Security
- Keep images updated
- Use non-root users
- Implement secrets management
- Regular security scans
- Network segmentation

### Monitoring
- Implement health checks
- Set up log aggregation
- Monitor resource usage
- Alert on failures
- Regular backups 