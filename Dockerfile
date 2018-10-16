FROM node:alpine

LABEL version="v1.0"
LABEL description="aikido-randori-service"

COPY server.js .
COPY ./api ./api
COPY ./test ./test
COPY package.json .
COPY package-lock.json .
COPY newrelic.js .

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet && \
  apk del native-deps