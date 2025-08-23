FROM node:18-alpine as builder

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

# Set proper permissions for public files
RUN chmod -R 755 ./public

# Create symlink for assets to work with Next.js
RUN ln -sf /app/public/assets /app/assets

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "server.js"] 
