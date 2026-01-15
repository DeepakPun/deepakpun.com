# Build stage - Build React app
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Production stage - Serve with nginx
FROM nginx:stable-alpine

# Update Alpine packages to pick up security fixes
RUN apk update && apk upgrade --no-cache

# Remove default nginx config
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy our custom nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

# Copy built React files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx (nginx user already exists in nginx:alpine)
CMD ["nginx", "-g", "daemon off;"]