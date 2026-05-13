FROM node:22-alpine
WORKDIR /app
EXPOSE 3000
COPY package*.json .
RUN npm install
COPY . /app/
CMD ["npx","tsx","src/index.ts"]
