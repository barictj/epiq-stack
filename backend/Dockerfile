# Stage: backend-dev
FROM node:18 AS backend-dev
WORKDIR /usr/local/app

COPY package*.json ./
RUN npm install
RUN npm install --save-dev nodemon
COPY src ./src

EXPOSE 3001
CMD ["npm", "run", "dev"]

# Optional Stage: test
FROM backend-dev AS test
RUN npm run test

# Stage: final (production)
FROM node:18 AS final
WORKDIR /usr/local/app

COPY backend/package*.json ./
RUN npm install --omit=dev

COPY backend/src ./src

EXPOSE 3001
CMD ["npm", "start"]
