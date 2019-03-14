
FROM node:lts-alpine

ENV APP_FOLDER /app
ENV APP_USER node
ENV APP_GROUP node
# Packages Watchman requires to work properly
ENV BUILD_PACKAGES git \
                   libgcc \
                   libressl-dev \
                   libstdc++
ENV EMBER_VERSION 3.6.1

# Copy pre-built Watchman binary
COPY --from=icalialabs/watchman:4.9.0-alpine3.8 /usr/local/bin/watchman* /usr/local/bin/

RUN apk --update add --no-cache $BUILD_PACKAGES && \
    ln -s /usr/lib/libcrypto.so /usr/lib/libcrypto.so.1.0.0 && \
    # Create the watchman STATEDIR directory
    mkdir -p /usr/local/var/run/watchman && \
    touch $_/.not-empty && \
    chown -R $APP_USER:$APP_GROUP /usr/local/var/run/watchman/

RUN \
  # Update NPM
  npm install -g npm && \
  # Install bower
  npm install -g bower && \
  # Install ember-cli
  npm install -g ember-cli@$EMBER_VERSION && \
  mkdir $APP_FOLDER && \
  chown -R $APP_USER:$APP_GROUP $APP_FOLDER

# Switch to node user
USER $APP_USER:$APP_GROUP

WORKDIR $APP_FOLDER
