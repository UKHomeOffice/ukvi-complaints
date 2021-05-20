# UKVI-Complaints [![Docker Repository on Quay](https://quay.io/repository/ukhomeofficedigital/ukvi-complaints/status "Docker Repository on Quay")](https://quay.io/repository/ukhomeofficedigital/ukvi-complaints)

## Getting started

Get the project from Github
```bash
$ git clone git@github.com:UKHomeOffice/UKVI-Complaints.git && cd UKVI-Complaints
```

Install the dependencies and build the project resources
```bash
$ npm install
```

[Install Docker Compose](https://docs.docker.com/compose/install/)

Run the services locally with Docker Compose
```bash
$ docker-compose up
```

### Set up AWS SQS queue locally

Run AWS services locally using localstack.

```bash
$ docker run --rm -p 4566:4566 -p 4571:4571 localstack/localstack
```

To create an SQS queue on the localstack instance.
```bash
aws \
sqs create-queue \
--queue-name local-queue \
--endpoint-url http://localhost:4566 \
--region eu-west-2
```

This will return a url, add this is the url of the localstack sqs queue:
```
http://localhost:4566/000000000000/local-queue
```

To view what is on the queue currently run:
```bash
aws --endpoint-url=http://localhost:4566 --region eu-west-2 sqs receive-message --queue-url http://localhost:4566/000000000000/local-queue --max-number-of-messages 10
```


### Running in dev

Getting your hands dirty (You'll need [Redis](http://redis.io/) for this)
```bash
$ npm run dev
```
