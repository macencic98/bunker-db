FROM node:20.15
WORKDIR /usr/local/apps/myapp

COPY package.json ./
RUN npm install --force && npm cache clean --force
ENV PATH=/usr/local/myapp/node_modules/.bin:$PATH
COPY tsconfig.json ./
COPY src ./src
COPY .env.local ./
COPY ormconfig.ts ./
COPY ./init.sql /docker-entrypoint-initdb.d/
COPY ./dynamotablecreation.js /docker-entrypoint-initdb.d/
COPY ./rabbitmqdefinitions.json /etc/rabbitmq/definitions.json
EXPOSE 3000

CMD ["npm", "run", "start:local-docker"]