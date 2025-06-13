FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Inject environment variables here
ENV PORT=4000
ENV MONGO_URI=mongodb://admin:password@mongo:27017/my-sample-db?authSource=admin

EXPOSE 4000

CMD ["node", "server.js"]
