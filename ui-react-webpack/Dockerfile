FROM node:latest

WORKDIR /app 

COPY package.json /app 
COPY yarn.lock /app
RUN yarn

COPY . /app 

RUN yarn webpack

CMD yarn start

EXPOSE 8999
