FROM node:7-alpine

MAINTAINER Isman Usoh <isman.usoh@gmail.com>

ENV NPM_CONFIG_LOGLEVEL warn
ENV YARN_VERSION 0.24.5

ENV NODE_ENV production

ENV DB_HOST 127.0.0.1
ENV DB_NAME meschool_production
ENV DB_USERNAME root
ENV DB_PASSWORD 123456789

# Create app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Install app dependencies and build 
COPY package.json yarn.lock /usr/app/
RUN yarn install --ignore-scripts --production && yarn cache clean

COPY . /usr/app/

# Port
EXPOSE 3000

# Run
CMD [ "yarn", "start" ]