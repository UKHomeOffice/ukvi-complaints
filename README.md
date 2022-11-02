# UKVI-Complaints [![Docker Repository on Quay](https://quay.io/repository/ukhomeofficedigital/ukvi-complaints/status "Docker Repository on Quay")](https://quay.io/repository/ukhomeofficedigital/ukvi-complaints)

## Getting started

The UKVI complaints service is a HOF app that users of UKVI can use to send complaints about their experience to the UKVI team.
The service has been integrated with the DECS case working system, by pushing each form submission to an AWS SQS queue which the DECS system will retrieve.

Get the project from Github
```bash
$ git clone git@github.com:UKHomeOffice/UKVI-Complaints.git && cd UKVI-Complaints
```

Install the dependencies and build the project resources
```bash
$ yarn install
```

[Install Docker Compose](https://docs.docker.com/compose/install/)

Run the services locally with Docker Compose
```bash
$ docker-compose up
```

Getting your hands dirty (You'll need [Redis](http://redis.io/) for this)
```bash
$ npm start
```

### SQS Service


As the form has been integrated with the DECS case working system, we have added functionality to output the form to an SQS queue.
To set up the SQS queue locally you can use the command:
```bash
$ npm run sqs-setup
```
This uses the Dockerfile in the sqs-mock folder to create an SQS queue on your system which can be pushed to.

You can view the next message on the queue by using the command:
```bash
$  node test/get-from-sqs.js
```
The messages will be returned one at a time.

You can then close the docker image by using the command:
```bash
$ npm run sqs-cleanup
```


