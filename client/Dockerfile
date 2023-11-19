FROM node:latest

WORKDIR /client

COPY ./client/package*.json ./
COPY ./client/tsconfig.json ./
COPY ./client/tsconfig.node.json ./
COPY ./client/vite.config.ts ./
COPY ./client/public ./
COPY ./client/index.html ./

COPY ./client/src src

RUN npm install -g typescript

RUN npm install

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "dev"]