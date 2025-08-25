FROM node:18-alpine as builder

# Add build args for Next.js environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_NAME
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ARG NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY next.config.js ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build real application 
RUN echo "Building real Web Frontend..." && \
  echo "NEXT_PUBLIC_API_URL: $NEXT_PUBLIC_API_URL" && \
  echo "NEXT_PUBLIC_APP_NAME: $NEXT_PUBLIC_APP_NAME" && \
  npm install axios && \
  npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built application
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static

# Copy public directory with proper permissions
COPY --from=builder /app/public ./public

# Copy next.config.js to production stage
COPY next.config.js ./

# Set proper permissions for public files
RUN chmod -R 755 ./public

# Create symlink for assets to work with Next.js
RUN ln -sf /app/public/assets /app/assets

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "server.js"] 
