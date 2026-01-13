# Root Dockerfile - for testing purposes
FROM node:24-alpine

WORKDIR /app

# Copy package.json if it exists in root
COPY package*.json ./

# Install dependencies if package.json exists
RUN if [ -f package.json ]; then npm install; fi

# Copy all source code
COPY . .

# Default command
CMD ["echo", "Root container ready - specify service to run"]

