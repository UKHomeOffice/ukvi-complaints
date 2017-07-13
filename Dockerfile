FROM quay.io/ukhomeofficedigital/nodejs-base:v6.11.1

RUN mkdir /public

COPY package.json /app/package.json
RUN npm --loglevel warn install --production --no-optional
COPY . /app
RUN npm --loglevel warn run postinstall

CMD /app/run.sh
