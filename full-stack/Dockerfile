FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci && npm cache clean --force
# RUN npm ci --only=production && npm cache clean --force
RUN npm install @dotenvx/dotenvx

COPY . .

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app
USER nodejs

ENV NODE_ENV=production

EXPOSE 3002
CMD ["npm", "start"]
