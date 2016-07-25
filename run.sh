#!/bin/bash

if [ "$NODE_ENV" = "ci" ]
then echo "starting service"
  SITEROOT=/UKVI-Complaints
fi

cp -r /app/public/* /public/

su nodejs -c 'exec node app.js'

