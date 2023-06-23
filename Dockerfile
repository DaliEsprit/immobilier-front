FROM node:18.10 AS lets-dev

WORKDIR /app 

COPY package*.json ./

RUN npm install -g npm@9.6.7  --legacy-peer-deps --loglevel verbose

RUN npm install -g @angular/cli@15.2.8 --legacy-peer-deps

RUN npm install --legacy-peer-deps --loglevel verbose 

COPY . .

CMD bash -c "npm install --legacy-peer-deps --loglevel verbose && ng serve --host 0.0.0.0"
