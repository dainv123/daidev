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

# Create public directory and copy if it exists
RUN mkdir -p ./public
RUN sh -c 'if [ -d "/app/public" ]; then cp -r /app/public/* ./public/; fi' || true

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "server.js"] 
