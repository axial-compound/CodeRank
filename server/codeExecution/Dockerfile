FROM node:lts-alpine3.19
WORKDIR /app/server/codeExecution
COPY . .
RUN npm install
EXPOSE 8000
CMD node codeExecutorApp.js