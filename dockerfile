
FROM node:20 AS build

WORKDIR /app


COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:20 AS development

WORKDIR /app


COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules


ENV NODE_ENV=development

EXPOSE 3000

CMD ["yarn", "start:dev"]
