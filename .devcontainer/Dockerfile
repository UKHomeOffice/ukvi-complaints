FROM quay.io/ukhomeofficedigital/hof-nodejs:24.21.0-alpine3.24-v4@sha256:c5d1333e7e965464258596faf4ac16a0eadd36029270ed0d8d94ec9003cae19d

USER root

# Update Alpine packages with latest security and bug fixes
RUN apk upgrade --no-cache

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app
