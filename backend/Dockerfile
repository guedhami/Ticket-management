FROM node:lts-alpine


WORKDIR /app

COPY package*.json ./


RUN npm install


COPY . .

RUN npm install -g serve

CMD ["node", "index.js" ]

EXPOSE 3001