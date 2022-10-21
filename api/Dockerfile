FROM node:16.17-alpine3.15

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD npm run dev