FROM node:latest

WORKDIR /server

COPY ./server/package*.json ./
COPY ./server/tsconfig.json ./

COPY ./server/src src

RUN npm install -g typescript

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]