FROM node:22-alpine

# Create app directory and set permissions
WORKDIR /app

# Install global packages as root
RUN npm install -g @angular/cli

# Create a non-root user 
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Copy and install dependencies
COPY --chown=appuser:appgroup package*.json ./
RUN npm install

# Copy application code
COPY --chown=appuser:appgroup . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]