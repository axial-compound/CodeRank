FROM node:18.12.1 

WORKDIR /server
COPY package.json /server

RUN npm install

COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
