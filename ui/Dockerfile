# --- STAGE 1: Build ---
FROM node:24-alpine AS builder

WORKDIR /app

# Install dependencies (better caching)
COPY package*.json ./
RUN npm ci

# Copy source and build for production
COPY . .
RUN npm run build

CMD ["npm", "run", "preview"]
