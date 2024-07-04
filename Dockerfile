FROM node:18.19.1-alpine AS builder

ARG APP_NAME
ARG ENV_NAME

LABEL app=${APP_NAME}

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --force

COPY . .

RUN npm run build:${ENV_NAME}

FROM nginx:1.24.0-alpine AS deploy

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /usr/src/app/dist/captai-web/ /usr/share/nginx/html