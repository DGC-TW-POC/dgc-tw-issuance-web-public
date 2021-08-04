FROM node:14.15.0-alpine as builder

RUN chown -R node:node /usr/local/lib/node_modules \
 && chown -R node:node /usr/local/bin


USER node
RUN npm install -g @angular/cli@9.1.0

# Bundle APP files
USER root
WORKDIR /
RUN mkdir -p /usr/app/
WORKDIR /usr/app/
COPY package*.json /usr/app/
COPY . /usr/app/

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
#RUN npm install
#RUN npm rebuild

# 指定建立build output資料夾，--prod為Production Mode
RUN yarn && yarn build -- --output-path=./dist/app --configuration production

FROM nginx:1.19.10 as app
COPY --from=builder /usr/app/dist/app /usr/share/nginx/html
COPY nginx/default.nginx.conf /etc/nginx/templates/default.conf.template
#COPY nginx/.htpasswd /etc/nginx/.htpasswd
ENV SERVER_PORT=80
ENV DGCA_ISSUANCE_SERVICE_URL=http://localhost:8080
ENV DGC_TW_VACCINE_SERVICE_URL=http://localhost:8081


