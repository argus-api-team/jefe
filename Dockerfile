
FROM node:lts-alpine

ENV APP_FOLDER /app
ENV APP_USER node
ENV APP_GROUP node
# Packages Watchman requires to work properly
ENV BUILD_PACKAGES chromium \
                   git \
                   libgcc \
                   libressl-dev \
                   libstdc++
ENV EMBER_VERSION 3.6.1
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Copy pre-built Watchman binary
COPY --from=icalialabs/watchman:4.9.0-alpine3.8 /usr/local/bin/watchman* /usr/local/bin/

RUN apk --update add --no-cache $BUILD_PACKAGES && \
    ln -s /usr/lib/libcrypto.so /usr/lib/libcrypto.so.1.0.0 && \
    # Create the watchman STATEDIR directory
    mkdir -p /usr/local/var/run/watchman && \
    touch $_/.not-empty && \
    chown -R $APP_USER:$APP_GROUP /usr/local/var/run/watchman/

RUN \
  mkdir $APP_FOLDER && \
  chown -R $APP_USER:$APP_GROUP $APP_FOLDER

WORKDIR /usr/local/bin
RUN \
    wget -P /usr/local/bin -O git-chglog https://github.com/git-chglog/git-chglog/releases/download/0.8.0/git-chglog_linux_amd64 && \
    chmod 755 git-chglog

WORKDIR $APP_FOLDER
# Switch to node user
USER $APP_USER:$APP_GROUP

RUN \
   # Update NPM and install Ember as non-root user
  npm install -g npm && \
  npm install -g ember-cli@$EMBER_VERSION
