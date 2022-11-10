FROM node:alpine
EXPOSE 5000
WORKDIR /api
COPY . .
RUN ["npm", "install"]
CMD ["node", "index.js"]