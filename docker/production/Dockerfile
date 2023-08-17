FROM node:18-alpine
WORKDIR /app
RUN apk --update add postgresql-client
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

EXPOSE 3000
