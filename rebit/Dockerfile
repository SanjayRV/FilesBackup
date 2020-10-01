FROM node:12.18.3-alpine
WORKDIR '/.app'
COPY package.json ./
RUN npm clean-install
COPY . .
CMD ["npm" , "start"]