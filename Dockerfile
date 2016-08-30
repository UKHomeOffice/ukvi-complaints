FROM quay.io/ukhomeofficedigital/nodejs-base:v4.4.2

RUN mkdir /public
RUN yum clean all && \
  yum update -y -q && \
  yum install -y -q git && \
  yum clean all && \
  rpm --rebuilddb && \
  npm --loglevel warn install -g npm@3

COPY package.json /app/package.json
RUN npm install --loglevel warn --production --no-optional
RUN npm --loglevel warn run postinstall
COPY . /app
CMD rm -rf /app/**/acceptance

CMD /app/run.sh
