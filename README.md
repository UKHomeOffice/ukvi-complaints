### UKVI-Complaints [![Docker Repository on Quay](https://quay.io/repository/ukhomeofficedigital/ukvi-complaints/status "Docker Repository on Quay")](https://quay.io/repository/ukhomeofficedigital/ukvi-complaints)

The UKVI Complaints Service is a Home Office Forms (HOF) application that allows UKVI users to submit complaints about their experience. Each complaint is emailed to the UKVI team, and a confirmation email is sent to the user. The service is integrated with the DECS caseworking system by pushing each form submission to an AWS SQS queue for DECS to retrieve Additionally, the service generates a CSV export of all complaints received between Saturday 00:00:00 and Friday 23:59:59, and sends it to the UKVI team every Monday at 07:00 AM.

## Getting started

- [Install & run locally](#install--run-the-application-locally)
- [Install & run locally with Docker Compose](#install--run-the-application-locally-with-docker-compose)
- [Install & run locally with VS Code Devcontainers](#install--run-the-application-locally-with-vs-code-dev-containers)

### Dependencies

- This form is built using the [HOF framework](https://github.com/UKHomeOfficeForms/hof)
- [Gov.uk Notify](https://www.notifications.service.gov.uk) to send notification emails
- [File Vault](https://github.com/UKHomeOffice/file-vault) to store and retrieve uploaded files
- [HOF RDS API](https://github.com/UKHomeOffice/hof-rds-api) to store and retrieve data

### Local environment focus

The local setup is config-driven. This service uses [.local-service.env.example](.local-service.env.example) to declare which secrets file, sidecars, env checks, and local overrides are needed. The reusable runner is [bin/start_local.sh](bin/start_local.sh). Copy the example to `.local-service.env` only when you need machine-specific overrides.

Security is the first priority for local development. Never commit secrets, tokens, generated `.env` files, `.local-service.env`, `.devcontainer/*.env`, `.npmrc`, private key files, `hof-services-secrets`, or `instructions.md`. The local bootstrap and startup scripts automatically add those local-only files to `.gitignore` before they copy secrets from Keybase, and Drone runs the security check automatically on pushes and pull requests.

For `ukvi-complaints`, the runner starts these sidecar services:

- File Vault on port 3000, which automatically starts its local ClamAV mock and local S3 storage
- Redis on port 6379
- Postgres on port 5432
- HOF RDS API on port 5000
- An SQS mock on port 9324 for the DECS queue integration

Docker Desktop groups these containers under one Compose application. They remain separate containers with their own processes, health state, and logs.

The application itself still runs with `yarn start:dev`, so code changes are handled by the existing HOF watcher.

To apply the same pattern to another HOF service, copy [bin/start_local.sh](bin/start_local.sh), [bin/bootstrap_colleague_local.sh](bin/bootstrap_colleague_local.sh), and [.local-service.env.example](.local-service.env.example), then update the config values:

- `APP_SECRETS_FILE_NAME` for that service's file in `hof-services-secrets`
- `DEPENDENCY_SERVICES` for the Compose services required by the app
- `FIRST_DEPENDENCY_SERVICE` when one Compose service must be started before the others
- `DEPENDENCY_STARTUP_TIMEOUT_SECONDS` for the maximum readiness wait for each Compose service
- `REQUIRED_ENV_KEYS` for the env vars the app must have before startup
- `LOCAL_ENV_OVERRIDES` for host-machine URLs and ports that differ from Docker/Kubernetes names
- `SIDECAR_SECRETS_FILE_NAME` if a sidecar needs its own env file
- `SECRETS_SYNC_TIMEOUT_SECONDS` if the Keybase-backed secrets repository needs a longer sync window

### Local secrets from Keybase

The root `.env` file is ignored by git and should be treated as the local source of runtime secrets. The local startup command refreshes secrets from the cloned `hof-services-secrets` repository before it starts anything. The secrets repository, app env file, sidecar env file, and required variables are configured in [.local-service.env.example](.local-service.env.example), or `.local-service.env` when you need local overrides. For this service, it reads from `../hof-services-secrets/UKVIC-env`, copies that into `.env`, copies `../hof-services-secrets/file-vault-env` into `.devcontainer/devcontainer.env` for the File Vault sidecar, and checks that the expected variable names are present without printing any secret values.

Developers must have Keybase installed and signed in locally before running `yarn local:up`. They must also have access to the `hoforms/hof-services-secrets` team and keep the `hof-services-secrets` repository outside this application's git repository, usually as a sibling directory. The local scripts refuse to use a secrets repository or explicit Keybase env source from inside this repository.

After installing dependencies, start the full local environment with:

```bash
yarn local:up
```

That command clones or updates `keybase://team/hoforms/hof-services-secrets` next to this service, refreshes `.env`, refreshes `.devcontainer/devcontainer.env`, then starts File Vault, Redis, Postgres, HOF RDS API, and the SQS mock sequentially. It waits for each service container to start before continuing and starts the app last.

For a brand-new machine where dependencies may not be installed yet, `yarn local:bootstrap` is available as a helper. It installs dependencies when `node_modules` is missing, then runs the same local startup flow.

To check the local env file without starting the micro services or app, run:

```bash
yarn local:check-env
```

If your secrets repository is somewhere else, set `HOF_SERVICES_SECRETS_DIR`:

```bash
HOF_SERVICES_SECRETS_DIR="/path/to/hof-services-secrets" yarn local:up
```

To copy from a single explicit env file instead, set `KEYBASE_ENV_SOURCE`:

```bash
KEYBASE_ENV_SOURCE="/path/to/env-file" yarn local:up
```

To run the full first-time bootstrap check, including required local tools and Keybase access, run:

```bash
yarn local:bootstrap-check
```

Local dependency wiring is normalised for host-machine startup after secrets are copied: `NODE_ENV`, `REDIS_HOST`, `REDIS_PORT`, `FILE_VAULT_URL`, `DATASERVICE_USE_HTTPS`, `DATASERVICE_SERVICE_HOST`, `DATASERVICE_SERVICE_PORT_HTTPS`, `SEND_TO_DECS_QUEUE`, `SQS_URL`, and `AWS_REGION`. If `SESSION_SECRET` is missing, the command generates and persists a local 32-byte value in `.env`.

## Install & Run the Application locally

### What you need before starting

- [Node.js](https://nodejs.org/en/) - use the version supported by `engines.node` in [package.json](package.json)
- [Yarn](https://yarnpkg.com/) for installing dependencies and running scripts
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Keybase](https://keybase.io/) installed and signed in locally
- Access to the Keybase team `hoforms/hof-services-secrets`

You do not need to manually start File Vault, its local ClamAV mock and S3 storage, Redis, Postgres, HOF RDS API, or the SQS mock. `yarn local:up` starts those required micro services for you through Docker Compose.

### Setup

1. Get the project from Github `git clone git@github.com:UKHomeOffice/ukvi-complaints.git && cd ukvi-complaints`.
2. Install dependencies with `yarn`.
3. Start everything with `yarn local:up`.

`yarn local:up` clones or updates `hof-services-secrets` from Keybase, creates or refreshes `.env`, creates or refreshes `.devcontainer/devcontainer.env`, checks that the configured services match the Docker Compose file, starts File Vault and its local ClamAV mock first, then starts Redis, Postgres, HOF RDS API, and the SQS mock one at a time before running `yarn start:dev` last. Compose waits for each service container to start before continuing.

When the app is running, open:

```text
http://localhost:8080
```

Drone runs the security check automatically on pushes and pull requests.

If the sidecar services are already running, you can still start only the application in development mode using `yarn start:dev`.

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

6. To run acceptance tests manually inside the Playwright container, after completing the above 5 steps, connect to the running container using: `docker exec -it playwright-run bash`. Then run the test: `yarn test:acceptance`

## Install & Run the Application locally with VS Code Dev Containers

Alternatively, if you are using [Visual Studio Code](https://code.visualstudio.com/) (VS Code), you can run the application with a [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers).

The `.devcontainer` folder contains the necessary configuration files for the devcontainer.

### Prerequisites
   - [Docker](https://www.docker.com)
   - [VS Code Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extention

### Setup

By following these steps, you should be able to run your application using a devcontainer in VS Code. The Dev Containers extension lets you use a Docker container as a full-featured development environment. This provides a consistent development environment across different machines and ensures that all required dependencies are available. A `devcontainer.json` file in this project tells VS Code how to access (or create) a development container with a well-defined tool and runtime stack.

1. Make sure you have Docker installed and running on your machine. Docker is needed to create and manage your containers.

2. Install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extention in VS Code. This extension allows you to develop inside a containerised environment.

3. To configure your dev environment, copy `/.devcontainer/devcontainer.env.sample` to `devcontainer.env` in the same directory and fill in the necessary values. This ensures your development container is set up with the required environment variables.

4. Run the `Dev Containers: Open Folder in Container...` command from the Command Palette (F1) or click on the Remote Indicator (≶) in the status bar. This command will build and start the devcontainer based on the configuration files in the `.devcontainer` folder.

5. Once the devcontainer is built and started, you will be inside the containerised environment. You can now work on your project as if you were working locally, but with all the necessary dependencies and tools installed within the container.

6. To start the application, open a terminal within VS Code by going to `View -> Terminal` or by pressing `Ctrl+backtick`. In the terminal, navigate to the project directory if you're not already there.

7. Run the necessary commands to install dependencies `yarn` and `yarn start:dev` to start your application.

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
