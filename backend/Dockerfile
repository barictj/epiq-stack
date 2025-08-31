FROM node:18
WORKDIR /usr/local/app
COPY package*.json ./
RUN npm install
RUN npm install --save-dev nodemon
COPY src ./src
EXPOSE 3001
CMD ["npx", "nodemon", "src/index.js"]
