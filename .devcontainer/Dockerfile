FROM quay.io/ukhomeofficedigital/hof-nodejs:24.22.2_3-alpine@sha256:ebf742568d6fa9505e5b8740dbb6bf7f4d38ea3a22fc2a940ee57cfa3a95a41e

USER root

# Update Alpine packages with latest security and bug fixes
RUN apk upgrade --no-cache

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app
