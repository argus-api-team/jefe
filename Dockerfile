
FROM node:10.15.0

ENV APP_USER dev
ENV APP_FOLDER /app

EXPOSE 4200 7020 7357

# Install watchman build dependencies
RUN \
  apt-get update -y &&\
  apt-get install -y python-dev

# Install watchman
RUN \
  git clone https://github.com/facebook/watchman.git &&\
  cd watchman &&\
  git checkout v4.9.0 &&\
  ./autogen.sh &&\
  ./configure &&\
  make &&\
  make install

# Install chrome for default testem config (as of ember-cli 2.15.0)
RUN \
  apt-get update &&\
  apt-get install -y \
      apt-transport-https \
      gnupg \
      --no-install-recommends &&\
  curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - &&\
  echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list &&\
  apt-get update &&\
  apt-get install -y \
      google-chrome-stable \
      --no-install-recommends

# tweak chrome to run with --no-sandbox option
RUN \
  sed -i 's/"$@"/--no-sandbox "$@"/g' /opt/google/chrome/google-chrome

# Update NPM
RUN \
npm install -g npm

# Install bower
RUN \
npm install -g bower@1.8.4

# Install ember-cli
RUN \
npm install -g ember-cli@3.6.1

# Create app folder
RUN \
  mkdir $APP_FOLDER && \
  chown -R node:node $APP_FOLDER

# Switch to node user
USER node:node

WORKDIR $APP_FOLDER