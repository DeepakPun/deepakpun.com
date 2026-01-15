FROM node:24-bullseye-slim AS build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx site configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built React app
COPY --from=build /app/dist /usr/share/nginx/html

# Remove the default nginx config that might conflict
RUN rm -f /etc/nginx/conf.d/default.conf.bak

# Create a simple index.html if build failed (fallback)
RUN test -f /usr/share/nginx/html/index.html || echo '<h1>React App Build Error</h1>' > /usr/share/nginx/html/index.html

# Expose port
EXPOSE 3000

# Health check
# HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
#   CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

