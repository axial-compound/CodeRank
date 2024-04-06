FROM node:lts-alpine3.19
WORKDIR /codeexecutor/
COPY . .
RUN npm install
EXPOSE 8000
CMD node codeExecutorApp.js