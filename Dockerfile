FROM node:10.16-alpine

WORKDIR /usr/src/app

ADD package.json yarn.lock ./

COPY src ./src

RUN yarn --pure-lockfile && \
  yarn build

COPY . ./

CMD [ "yarn", "serve" ]
