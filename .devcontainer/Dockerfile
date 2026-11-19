FROM quay.io/ukhomeofficedigital/hof-nodejs:24.22.3_1-alpine@sha256:8533bcedc2dc86aceadaa8bab422931e8a33a81504c67247392eeffec6603cd5

USER root

# Update Alpine packages with latest security and bug fixes
RUN apk upgrade --no-cache

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app
