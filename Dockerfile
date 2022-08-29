FROM node:16
WORKDIR /Docker
COPY ./package.json .
RUN npm install
COPY ./dist ./dist
EXPOSE 5000
CMD npm start