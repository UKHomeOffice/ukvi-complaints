# UKVI-Complaints [![Docker Repository on Quay](https://quay.io/repository/ukhomeofficedigital/ukvi-complaints/status "Docker Repository on Quay")](https://quay.io/repository/ukhomeofficedigital/ukvi-complaints) [![Build Status](https://drone.digital.homeoffice.gov.uk/api/badges/UKHomeOffice/UKVI-Complaints/status.svg)](https://drone.digital.homeoffice.gov.uk/UKHomeOffice/UKVI-Complaints)

This project is built with [HOF-Bootstrap](https://github.com/UKHomeOffice/hof-bootstrap) and uses [Docker](https://www.docker.com/).

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

Getting your hands dirty (You'll need [Redis](http://redis.io/) for this)
```bash
$ npm run dev
```

For anything else UKVI Complaints-related, look in [package.json](./package.json) for a full list of scripts etc, or refer to [HOF-Bootstrap](https://github.com/UKHomeOffice/hof-bootstrap).
