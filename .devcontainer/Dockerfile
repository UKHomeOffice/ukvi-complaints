FROM quay.io/ukhomeofficedigital/hof-nodejs:24.21.0-alpine3.24-v8@sha256:a0c438317862e595f45a51e7cb234a0c7e8c67aef2b886844d788dbe21c3b410

USER root

# Update Alpine packages with latest security and bug fixes
RUN apk upgrade --no-cache

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app
