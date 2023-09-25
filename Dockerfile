FROM node:18.14 as build

WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:18.14 as production

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /app/dist ./dist
CMD npm run start:prod