FROM node:20-alpine

WORKDIR /src/app
COPY . ./
RUN npm install -g @angular/cli
RUN npm install

ENTRYPOINT ["ng", "serve"]