# landing-page/Dockerfile
FROM nginx:alpine

# Copy all HTML/CSS/JS files to nginx html directory
COPY . /usr/share/nginx/html/

# Remove non-web files from html directory
RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/README.md \
          /usr/share/nginx/html/.gitignore

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
