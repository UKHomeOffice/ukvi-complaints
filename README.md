### UKVI-Complaints [![Docker Repository on Quay](https://quay.io/repository/ukhomeofficedigital/ukvi-complaints/status "Docker Repository on Quay")](https://quay.io/repository/ukhomeofficedigital/ukvi-complaints)

The UKVI complaints service is a HOF app that users of UKVI can use to send complaints about their experience to the UKVI team. The service sends the complaint by email to the UKVI team and also a confirmation email to the user. The service has been integrated with the DECS case working system, by pushing each form submission to an AWS SQS queue which the DECS system will retrieve.

## Getting started

- [Install & run locally](#install--run-the-application-locally)
- [Install & run locally with Docker Compose](#install--run-the-application-locally-with-docker-compose)

### Dependencies

- This form is built using the [HOF framework](https://github.com/UKHomeOfficeForms/hof)
- [Gov.uk Notify](https://www.notifications.service.gov.uk) to send notification emails
- [File Vault](https://github.com/UKHomeOffice/file-vault) to store and retrieve uploaded files

## Install & Run the Application locally

- [Node.js](https://nodejs.org/en/) - v.20 LTS
- [Redis server](http://redis.io/download) running on default port 6379
- [File Vault](https://github.com/UKHomeOffice/file-vault) Service - running port 3000
- [hof-rds-api](https://github.com/UKHomeOffice/hof-rds-api) Service - running port 3001 for service 'ukvic'

### Setup

1. Get the project from Github `git clone git@github.com:UKHomeOffice/ukvi-complaints.git && cd ukvi-complaints`.
2. Create a `.env` file in the root directory and populate it with all the required environment variables for the project.
3. Install redis and start the redis server.
4. Install dependencies using the command `yarn`.
5. Start the service in development mode using `yarn start:dev`.

## Install & Run the Application locally with Docker Compose

[Install Docker Compose](https://docs.docker.com/compose/install/)

When running the app in docker, the variables in your ```.env``` file will be overidden by the ```environment``` section in the ```docker-compose.yml``` file.

Run the services locally with Docker Compose

```bash
docker compose up
```

### Testing

#### Linting Tests
```bash
yarn test:lint
```

#### Unit Tests
```bash
yarn test:unit
```

### To download CSV report locally
```bash
yarn generate:local:reports
```
