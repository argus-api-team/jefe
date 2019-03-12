
FROM node:lts-alpine

ENV APP_FOLDER /app
ENV APP_USER node
ENV APP_GROUP node

# Ember App
EXPOSE 4200
# LiveReload
EXPOSE 7020
# TestEm
EXPOSE 7357

COPY . $APP_FOLDER

WORKDIR $APP_FOLDER

# Install the packages required for watchman to work properly:
RUN apk add --no-cache \
                    libressl-dev \
                    libgcc \
                    libstdc++ \
                    git \
                    bash

RUN cd /usr/lib && \
    ln -s libcrypto.so libcrypto.so.1.0.0

# Copy the watchman executable binary directly from our image:
COPY --from=icalialabs/watchman:4.9.0-alpine3.8 /usr/local/bin/watchman* /usr/local/bin/



# Create the watchman STATEDIR directory:
RUN mkdir -p /usr/local/var/run/watchman && \
    touch /usr/local/var/run/watchman/.not-empty && \
    chown -R $APP_USER:$APP_GROUP /usr/local/var/run/watchman/

WORKDIR $APP_FOLDER

RUN \
  # Update NPM
  npm install -g npm && \
  # Install bower
  npm install -g bower && \
  # Install ember-cli
  npm install -g ember-cli@3.6.1 && \
  chown -R $APP_USER:$APP_GROUP $APP_FOLDER

# Switch to node user
USER $APP_USER:$APP_GROUP

CMD ["ember", "s"]
