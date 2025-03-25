FROM node:alpine

WORKDIR /usr/src/app
COPY . ./
RUN npm install -g @angular/cli
RUN npm install

ENTRYPOINT ["ng", "serve"]