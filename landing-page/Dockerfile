# 1. Use the most optimized 2026 image
FROM nginx:stable-alpine-slim

# 2. Cleanup default assets
RUN rm -rf /usr/share/nginx/html/*

# 3. Copy your site content
COPY . /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/nginx.conf
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:80/ || exit 1

EXPOSE 80
USER nginx
CMD ["nginx", "-g", "daemon off;"]
