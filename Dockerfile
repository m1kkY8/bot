FROM node:21

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./ 

RUN npm install --production

# Bundle app source
COPY . .

CMD ["node", "src/bot.js"]

