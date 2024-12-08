FROM node:18-alpine

LABEL authors="Mehmet Furkan Kaya <furkan.36kaya@gmail.com>"

WORKDIR /frontend

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY . .

CMD ["pnpm", "run", "dev"]