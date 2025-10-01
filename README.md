### UKVI-Complaints [![Docker Repository on Quay](https://quay.io/repository/ukhomeofficedigital/ukvi-complaints/status "Docker Repository on Quay")](https://quay.io/repository/ukhomeofficedigital/ukvi-complaints)

## Getting started
test push to drone
The UKVI complaints service is a HOF app that users of UKVI can use to send complaints about their experience to the UKVI team. The service sends the complaint by email to the UKVI team and also a confirmation email to the user. The service has been integrated with the DECS case working system, by pushing each form submission to an AWS SQS queue which the DECS system will retrieve.

### Dependencies

- This form is built using the [HOF framework](https://github.com/UKHomeOfficeForms/hof)
- [Gov.uk Notify](https://www.notifications.service.gov.uk) to send notification emails
- [File Vault](https://github.com/UKHomeOffice/file-vault) to store and retrieve uploaded files

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
$ yarn start
```

