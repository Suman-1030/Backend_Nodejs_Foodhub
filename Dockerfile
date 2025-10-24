FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# Use npm start (which runs "node index.js" from your package.json)
CMD ["npm", "start"]