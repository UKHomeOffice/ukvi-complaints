FROM node:lts-bullseye-slim@sha256:afa1dce5757ec9be0ab8a9ed567b2b3c60cf39b4ca3281df3f7d9e0fdec0c8fb

USER root

# Update packages as a result of Anchore security vulnerability checks
RUN apt-get update && \
    apt-get install -y gnutls-bin binutils nodejs npm libjpeg62-turbo libcurl4 libx11-6 libxml2

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app

COPY --chown=999:998 . /app

RUN yarn install --frozen-lockfile --production --ignore-optional && \
    yarn run postinstall

HEALTHCHECK --interval=5m --timeout=3s \
 CMD curl --fail http://localhost:8080 || exit 1

CMD ["sh", "/app/run.sh"]

EXPOSE 8080
