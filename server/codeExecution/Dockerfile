FROM node:lts-alpine3.19
WORKDIR /server/codeExecution
COPY . /server/codeExecution
RUN npm install
EXPOSE 8000
CMD node codeExecutorApp.js