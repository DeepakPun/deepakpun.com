# 1. Use the most optimized 2026 image
FROM nginx:stable-alpine-slim

# 2. Cleanup default assets
RUN rm -rf /usr/share/nginx/html/*

# 3. Copy your site content
COPY . /usr/share/nginx/html/

# 4. Copy your custom config 
# (Ensure this file exists in your landing-page folder!)
COPY nginx.conf /etc/nginx/nginx.conf

# 5. Security: Ensure the nginx user owns the web files
# Note: Alpine's default nginx user is 'nginx'
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# 6. Health Check: Pings the server every 30s to ensure it's up
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:80/ || exit 1

EXPOSE 8080

# Run as the unprivileged user for security
USER nginx

CMD ["nginx", "-g", "daemon off;"]
