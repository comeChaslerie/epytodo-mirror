FROM node
WORKDIR /app
EXPOSE 3000
RUN npm install express dotenv mysql2
COPY . /app/
CMD ["npx", "tsx index.ts"]
