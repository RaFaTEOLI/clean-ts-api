FROM node:16
WORKDIR /home/rafael/Development/courses/clean-ts-api/Docker
COPY ./package.json .
RUN npm install