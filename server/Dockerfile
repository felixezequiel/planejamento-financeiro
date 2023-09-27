FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install -g pm2

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "dev" ]
