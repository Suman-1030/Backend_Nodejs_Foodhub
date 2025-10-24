# docker file from node.js  'asia-south1-docker.pkg.dev/poetic-loop-471609-h3/foodhub-backend'

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]