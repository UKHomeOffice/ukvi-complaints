FROM quay.io/ukhomeofficedigital/hof-nodejs@sha256:b5363fcb205423820cabe7605de5fb997b78688aad3a2bc5555e7f26bfa22181

USER root

# Update packages as a result of Trivy security vulnerability checks
RUN apk update && apk upgrade --no-cache

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
