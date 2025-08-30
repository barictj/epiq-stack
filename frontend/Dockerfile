# Use a stable Node base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose dev port
EXPOSE 3000

# Start Next.js dev server
CMD ["npm", "run", "dev"]