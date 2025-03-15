# Use a base image with Node.js pre-installed (e.g., Node.js 22)
FROM node:22.9.0

# Install PostgreSQL client tools
RUN apt-get update && \
    apt-get install -y postgresql-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory for Node.js app
WORKDIR /app

# Copy application files
COPY .././ /app

# Install dependencies
RUN yarn install


# Expose any ports your app needs (optional)
EXPOSE 3336

# Command to start your Node.js app (uncomment if needed)
CMD ["yarn", "run", "start"]

