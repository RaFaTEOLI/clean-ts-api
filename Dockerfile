FROM node:16
WORKDIR /home/rafael/Development/courses/clean-ts-api/Docker/clean-ts-api
COPY ./package.json .
RUN npm install