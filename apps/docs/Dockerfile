FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY docusaurus.config.ts ./
COPY sidebars.ts ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build real application
RUN echo "Building Docusaurus Documentation..." && \
  npm run build

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