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
