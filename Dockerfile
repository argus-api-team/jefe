
FROM node:10.15.0-slim

ENV APP_USER node
ENV APP_FOLDER /app

EXPOSE 4200 7020 7357

RUN \
# Install watchman build & chrome install dependencies
  apt-get update -y && \
  apt-get install -y \
    python-dev \
    git \
    libssl-dev \
    build-essential \
    autoconf \
    automake \
    libtool \
    pkg-config \
    apt-transport-https \
    gnupg \
    --no-install-recommends && \
# Install watchman
  git clone https://github.com/facebook/watchman.git && \
  cd watchman && \
  git checkout v4.9.0 && \
  ./autogen.sh && \
  ./configure && \
  make && \
  make install && \
  cd / && \
# Install chrome for default testem config (as of ember-cli 2.15.0)
  curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list && \
  apt-get update && \
  apt-get install -y \
      google-chrome-stable \
      --no-install-recommends && \
# Tweak chrome to run with --no-sandbox option
  sed -i 's/"$@"/--no-sandbox "$@"/g' /opt/google/chrome/google-chrome && \
# Clean installation source and package
  apt-get remove -y \
    python-dev \
    libssl-dev \
    build-essential \
    autoconf \
    automake \
    libtool \
    pkg-config \
    apt-transport-https \
    gnupg && \
# Remove watchman bbuild Dir
  rm -rf watchman

  RUN \
# Update NPM
  npm install -g npm && \
# Install bower
  npm install -g bower@1.8.4 && \
# Install ember-cli
  npm install -g ember-cli@3.6.1 && \
# Create app folder
  mkdir $APP_FOLDER && \
  chown -R node:node $APP_FOLDER

# Switch to node user
USER $APP_USER:$APP_USER

WORKDIR $APP_FOLDER
