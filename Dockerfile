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
EXPOSE 3000

CMD ["npm", "run", "migrate:up"]
CMD ["npm", "run", "start:local-docker"]