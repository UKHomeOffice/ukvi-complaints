### UKVI-Complaints [![Docker Repository on Quay](https://quay.io/repository/ukhomeofficedigital/ukvi-complaints/status "Docker Repository on Quay")](https://quay.io/repository/ukhomeofficedigital/ukvi-complaints)

The UKVI Complaints Service is a Home Office Forms (HOF) application that allows UKVI users to submit complaints about their experience. Each complaint is emailed to the UKVI team, and a confirmation email is sent to the user. The service is integrated with the DECS caseworking system by pushing each form submission to an AWS SQS queue for DECS to retrieve. Additionally, the service generates and sends a CSV export of all complaints to the UKVI team every Monday at 07:00 AM.

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
3. Install dependencies using the command `yarn`.
4. Start the service in development mode using `yarn start:dev`.

## Install & Run the Application locally with Docker Compose

You can containerise the application using [Docker](https://www.docker.com). The `.devcontainer` directory includes a `docker-compose.dev.yml` file for orchestrating multi-container application.

### Prerequisites

   - [Docker](https://www.docker.com)

### Setup

By following these steps, you should be able to install and run your application using a Docker Compose. This provides a consistent development environment across different machines and ensures that all required dependencies are available.

1. Make sure you have Docker installed and running on your machine. Docker is needed to create and manage your containers.

2. To configure your dev environment, copy `/.devcontainer/devcontainer.env.sample` to `devcontainer.env` in the same directory and fill in the necessary values. This ensures your development container is set up with the required environment variables.

3. Open a terminal, navigate to the project directory and run: `docker compose -f .devcontainer/docker-compose.dev.yml up -d`

4. Once the containers are built and started, you can go inside the app container: `docker exec -it devcontainer-hof-ukvic-app-1 sh` (note: Docker containers may be named differently)

5. Run the necessary commands to install dependencies `yarn` and `yarn start:dev` to start your application.

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

To download CSV reports generated via the Docker development container, the sample file URL will look like:

`http://file-vault:3000/file/generate-link/file/<id>`

Replace the base URL with:

`http://localhost:3000/file/generate-link/<id>` 
