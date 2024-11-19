FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm uninstall bcrypt && npm install bcrypt

EXPOSE 8080

ENTRYPOINT ["npm", "run"]

CMD ["start:prod"]