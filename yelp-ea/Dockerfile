FROM node:19-alpine

WORKDIR /src/app
COPY . ./
RUN npm install -g @angular/cli
RUN npm install

ENTRYPOINT ["ng", "serve"]