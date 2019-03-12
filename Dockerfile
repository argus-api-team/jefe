
FROM node:10.15.0-slim

ENV APP_FOLDER /app
ENV APP_USER node
ENV APP_GROUP node
ENV BUILD_PACKAGES apt-transport-https \
                   autoconf \
                   automake \
                   build-essential \
                   gnupg \
                   libssl-dev \
                   libtool \
                   pkg-config \
                   python-dev

# Ember App
EXPOSE 4200
# LiveReload
EXPOSE 7020
# TestEm
EXPOSE 7357

COPY . $APP_FOLDER

WORKDIR $APP_FOLDER

RUN \
  # Install watchman build & chrome install dependencies
  apt-get update -y && \
  apt-get install -y --no-install-recommends \
    $BUILD_PACKAGES \
    git \
    procps && \
  # Install watchman
  curl -L https://github.com/facebook/watchman/archive/v4.9.0.tar.gz | tar xzf - && \
  cd watchman-4.9.0 && \
  ./autogen.sh && \
  ./configure && \
  make && \
  make install && \
  cd $APP_FOLDER / && \
  rm -rf watchman-4.9.0 && \
  # Install chrome for default testem config (as of ember-cli 2.15.0)
  curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > \
    /etc/apt/sources.list.d/google-chrome.list && \
  apt-get update -y && \
  apt-get install -y --no-install-recommends \
    google-chrome-stable && \
  # Tweak chrome to run with --no-sandbox option
  sed -i 's/"$@"/--no-sandbox "$@"/g' /opt/google/chrome/google-chrome && \
  # Removes build packages
  apt-get remove -y $BUILD_PACKAGES

RUN \
  # Update NPM
  npm install -g npm && \
  # Install bower
  npm install -g bower@1.8.4 && \
  # Install ember-cli
  npm install -g ember-cli@3.6.1 && \
  chown -R $APP_USER:$APP_GROUP $APP_FOLDER

# Switch to node user
USER $APP_USER:$APP_GROUP

CMD ["ember", "s"]
