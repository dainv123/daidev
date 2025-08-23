FROM node:18-alpine as builder

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