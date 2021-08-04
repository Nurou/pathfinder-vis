FROM node:14  

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

RUN yarn global add serve

EXPOSE 5000

CMD serve -s -l 5000 build
