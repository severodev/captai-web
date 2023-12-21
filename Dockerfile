FROM node:14.15.5-alpine3.11 AS builder

ARG APP_NAME
ARG ENV_NAME

LABEL app=${APP_NAME}

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build:${ENV_NAME}

FROM nginx:1.18.0-alpine AS deploy

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /usr/src/app/dist/captia-web/ /usr/share/nginx/html