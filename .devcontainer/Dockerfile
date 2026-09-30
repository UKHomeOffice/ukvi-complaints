FROM quay.io/ukhomeofficedigital/hof-nodejs:24.21.0-alpine3.24@sha256:80b294ce5027fdc87c58cc990f4d9804323a1734c1e8a1ae9d6bbe569fa8b01e

USER root

# Update Alpine packages with latest security and bug fixes
RUN apk upgrade --no-cache

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app
