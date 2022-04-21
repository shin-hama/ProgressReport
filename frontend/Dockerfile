FROM node:16-slim

WORKDIR /app

COPY package.json yarn.lock ./

RUN apt-get update && \
    yarn install && \
    yarn cache clean

COPY . .

CMD yarn start
