FROM alpine:latest
RUN apk update && apk upgrade
RUN apk add --no-cache nodejs npm openssl
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run generateCert
EXPOSE 8000
CMD ["npm", "run", "dev"]
