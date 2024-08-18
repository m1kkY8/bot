FROM node:21
RUN apt-get update && apt-get install ffmpeg -y

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./ 

RUN npm install --production

# Bundle app source
COPY . .

CMD ["node", "src/bot.js"]

