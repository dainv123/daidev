FROM node:18-alpine as builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install only production dependencies first
RUN npm install --only=production --no-audit --no-fund

# Copy config files
COPY docusaurus.config.ts ./
COPY sidebars.ts ./
COPY tsconfig*.json ./

# Install dev dependencies
RUN npm install --no-audit --no-fund

# Copy source code
COPY . .

# Build with optimized memory settings
RUN echo "Building Docusaurus Documentation..." && \
  NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 4002

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 