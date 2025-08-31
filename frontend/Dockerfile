FROM node:22

WORKDIR /usr/local/app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy app files
COPY public ./public
COPY src ./src
COPY next.config.js ./
COPY tsconfig.json ./

# Build the Next.js app
RUN npm run build

# Expose and start
EXPOSE 3000
CMD ["npm", "run", "start"]
