FROM node:24.15.0-alpine3.23@sha256:8e2c930fda481a6ec141fe5a88e8c249c69f8102fe98af505f38c081649ea749

USER root

# Switch to UK Alpine mirrors, update package index and upgrade all installed packages
RUN echo "http://uk.alpinelinux.org/alpine/v3.21/main" > /etc/apk/repositories ; \
    echo "http://uk.alpinelinux.org/alpine/v3.21/community" >> /etc/apk/repositories ; \
    apk update && apk upgrade --no-cache

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app

COPY --chown=999:998 . /app

RUN yarn install --frozen-lockfile --production && \
    yarn run postinstall

HEALTHCHECK --interval=5m --timeout=3s \
 CMD curl --fail http://localhost:8080 || exit 1

CMD ["sh", "/app/run.sh"]

EXPOSE 8080
