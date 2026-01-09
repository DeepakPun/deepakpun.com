# --- Stage 1: Build ---
FROM node:24-bullseye-slim AS builder
WORKDIR /app
COPY package*.json ./
# Install ALL dependencies (including devDeps) to build/test if needed
RUN npm ci

COPY . .
# If you use TypeScript or a build step, run it here:
# RUN npm run build

# --- Stage 2: Production ---
FROM node:24-bullseye-slim AS runner

# 1. Standard Production Environment
ENV NODE_ENV=production
WORKDIR /app

# 2. Security and minimal tooling
# Use the official Debian-slim image and install a minimal set of packages (wget for HEALTHCHECK)
RUN apt-get update && apt-get install -y --no-install-recommends wget ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Use the built-in 'node' user instead of creating a new one
# The 'node' user (UID 1000) already exists in the official Debian-based image
RUN chown -R node:node /app

# 3. Optimized Dependency Install
# Only copy package files and install production-only deps
COPY --chown=node:node package*.json ./
RUN npm ci --only=production && npm cache clean --force

# 4. Copy Application Code
COPY --chown=node:node . .

# 5. Switch to Non-Root User
USER node

# 6. Port Documentation
EXPOSE 3001

# 7. Health Check (Using wget because curl isn't in alpine by default)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# 8. THE MOST IMPORTANT FIX: Use 'node' directly, not 'npm start'
# This ensures SIGTERM signals reach your app for graceful shutdowns
CMD ["node", "index.js"]
