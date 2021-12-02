FROM node:12.19-alpine

# APP
ARG PORT
ARG API_URL

ENV ANALYZE false
ENV NODE_ENV development
ENV PORT $PORT
ENV NEXT_PUBLIC_API_URL $API_URL

WORKDIR /usr/src/app

RUN apk update
RUN apk add g++ make python
RUN apk add git bash

COPY package*.json ./

# add yarn
RUN npm i yarn@latest -g --force

# get runtime dependencies
RUN npm install

COPY . .

ENTRYPOINT [ "bash", "./init.sh" ]
