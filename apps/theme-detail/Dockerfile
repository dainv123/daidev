FROM node:18-alpine as builder

# Add build args for Nuxt.js environment variables
ARG NUXT_PUBLIC_API_URL
ARG NUXT_APP_NAME

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nuxt.config.ts ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build Nuxt.js application
RUN echo "Building real Nuxt.js Theme Detail..." && \
  echo "NUXT_PUBLIC_API_URL: $NUXT_PUBLIC_API_URL" && \
  echo "NUXT_APP_NAME: $NUXT_APP_NAME" && \
  npm run build

# Production stage
FROM node:18-alpine

# Copy built files
COPY --from=builder /app/.output /app/.output

# Set working directory
WORKDIR /app

# Expose port
EXPOSE 3004

# Start Nuxt.js server
CMD ["node", ".output/server/index.mjs"] 