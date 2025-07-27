FROM node:20-alpine

RUN apk add --no-cache python3 make g++ curl

WORKDIR /app

COPY package*.json ./
RUN yarn install 

COPY . ./
RUN yarn run build

EXPOSE 4000

CMD ["sh", "-c", "yarn db:migrate && yarn db:seed && yarn start:dev"]

