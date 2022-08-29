FROM node:16
WORKDIR /Docker
COPY ./package.json .
RUN npm install --omit=dev
COPY ./dist ./dist
EXPOSE 5000
CMD npm start