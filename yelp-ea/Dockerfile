FROM node:19-alpine

WORKDIR /src/app
COPY . ./
RUN npm install -g @angular/cli@19.2.4
RUN npm install

ENTRYPOINT ["ng", "serve"]