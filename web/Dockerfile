FROM node:alpine as stage-0
WORKDIR /web
COPY . .
RUN ["npm", "install"]
RUN ["npm", "run", "build"]
FROM nginx
COPY --from=stage-0 /web/build /usr/share/nginx/html
COPY custom_nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443