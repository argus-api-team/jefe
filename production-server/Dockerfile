FROM node:lts-alpine as builder

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

ENV API_URL __API_URL
ENV OAUTH_URL __OAUTH_URL
ENV ABLY_KEY __ABLY_KEY

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

# Switch to node user
USER $APP_USER:$APP_GROUP

RUN \
   # Update NPM and install Ember as non-root user
  npm install -g npm && \
  npm install -g ember-cli@$EMBER_VERSION

WORKDIR $APP_FOLDER

COPY [--chown=$APP_USER:$APP_GROUP] . $APP_FOLDER

RUN \
  npm i && \
  ember build --environment production

FROM nginx:alpine

ENV BUILDER_DIST_FOLDER /app/dist/
ENV APP_FOLDER /app
ENV APP_USER appuser
ENV APP_GROUP appuser

ENV PORT 8080

EXPOSE $PORT

RUN apk --update add --no-cache bash

RUN addgroup -g 1000 -S $APP_GROUP && \
    adduser -u 1000 -S $APP_USER -G $APP_GROUP && \
    touch /var/run/nginx.pid && \
    chown -R $APP_USER:$APP_GROUP /var/run/nginx.pid /var/cache/nginx

COPY --from=builder $BUILDER_DIST_FOLDER $APP_FOLDER
COPY production-server/nginx.conf.tpl $APP_FOLDER
COPY production-server/docker-entrypoint $APP_FOLDER

RUN \
  chown -R $APP_USER:$APP_GROUP $APP_FOLDER && \
  chmod 754 $APP_FOLDER/docker-entrypoint

USER $APP_USER

WORKDIR $APP_FOLDER

ENTRYPOINT ["./docker-entrypoint"]

CMD ["nginx"]
