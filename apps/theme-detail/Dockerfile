FROM node:20.18-alpine as builder

# Add build args for Nuxt.js environment variables
ARG NUXT_PUBLIC_API_URL
ARG NUXT_APP_NAME

# Set environment variables
ENV NODE_ENV=production
ENV NUXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nuxt.config.ts ./
COPY tsconfig*.json ./

# Install dependencies (including devDependencies for build)
RUN npm ci --no-audit --no-fund

# Copy source code
COPY . .

# Build Nuxt.js application
RUN echo "Building real Nuxt.js Theme Detail..." && \
  echo "NUXT_PUBLIC_API_URL: $NUXT_PUBLIC_API_URL" && \
  echo "NUXT_APP_NAME: $NUXT_APP_NAME" && \
  npm run build

# Production stage
FROM node:20.18-alpine

# Set environment variables
ENV NODE_ENV=production
ENV NUXT_TELEMETRY_DISABLED=1

# Copy built files
COPY --from=builder /app/.output /app/.output

# Set working directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nuxt -u 1001
USER nuxt

# Expose port
EXPOSE 3004

# Start Nuxt.js server
CMD ["node", ".output/server/index.mjs"] 