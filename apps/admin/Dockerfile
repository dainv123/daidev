FROM node:18-alpine as builder

# Add build args for Vite environment variables
ARG VITE_API_URL
ARG VITE_APP_NAME
ARG VITE_APP_VERSION

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build real application with build args
RUN echo "Building real Admin Dashboard..." && \
  echo "VITE_API_URL: $VITE_API_URL" && \
  echo "VITE_APP_NAME: $VITE_APP_NAME" && \
  echo "VITE_APP_VERSION: $VITE_APP_VERSION" && \
  npx vite build --mode production

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 3002

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 