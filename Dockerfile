FROM node:9.6.1

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -qy

COPY . .

EXPOSE 3000

CMD ["npm", "start"]