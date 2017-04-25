FROM ubuntu:16.04

# Installing wget - needed to download node.js
RUN apt-get update
RUN apt-get install -y wget

ENV NODE_VERSION v6.9.1

# Downloading and installing Node.
RUN wget -O - https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-linux-x64.tar.gz \
    | tar xzf - --strip-components=1 --exclude="README.md" --exclude="LICENSE" \
    --exclude="ChangeLog" -C "/usr/local"

WORKDIR /myaccount-weekendavisen

COPY . /myaccount-weekendavisen/

RUN npm install -g typescript
RUN npm install -g @angular/cli
RUN npm install -g http-server
RUN npm install -g node-gyp@3.6.0
RUN npm install --production
RUN npm run server:compile
RUN npm run client:build

# Exposing our endpoint to Docker.
EXPOSE 4200 8000 8084 9099

# When starting a container with our image, this command will be run.
CMD ["npm", "start"]
