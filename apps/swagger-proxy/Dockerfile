FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including swagger-ui-dist)
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 4001

# Start application
CMD ["npm", "start"] 