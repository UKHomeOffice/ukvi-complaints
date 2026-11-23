# UKVI complaints end-to-end tests

The end-to-end suite uses Playwright and Playwright BDD to exercise the
complaints journeys in an approved UAT environment.

> **Warning:** These tests submit complaints and upload documents. Run them
> only against an authorised test environment, using approved test data, email
> addresses and integrations. Some scenarios also check external guidance
> links.

## Test structure

```text
e2e-tests/
  features/                 Gherkin complaint journeys and validation scenarios
  steps/                    Step definitions that perform actions and assertions
  fixture/                  Playwright fixtures and registered page objects
  pages/                    Page objects for the complaint form
  test-data/
    user-upload-files/      Documents used by upload scenarios
  utility-helper/           Shared test values and environment configuration
playwright.config.ts        BDD discovery, browser and UAT configuration
```

The Playwright configuration reads feature files from `e2e-tests/features/`
and step definitions from `e2e-tests/steps/` and `e2e-tests/fixture/`. BDD
generates the Playwright tests into `.features-gen/` when the test command
runs. Page objects in `pages/` are provided to steps through the shared
fixture. The configured browser is Chromium.

## Run locally against UAT

You need Node.js, Yarn, access to the approved UAT environment, and the
project dependencies and Chromium browser installed.

1. From the repository root (the directory containing `package.json` and
   `playwright.config.ts`), install the project dependencies and browser:

   ```sh
   yarn install
   npx playwright install chromium
   ```

2. Create or edit the `.env` file in that same repository root. Add the
   approved UAT base URL and a test email address:

   ```dotenv
   PLAYWRIGHT_BASE_URL=https://<approved-uat-host>
   SAS_HOF_EMAIL=<approved-test-email>
   ```

   Replace both placeholders with values approved for your test environment.
   `PLAYWRIGHT_BASE_URL` must be the UAT application's base URL. The tests
   require `SAS_HOF_EMAIL` for complaint contact details; the test setup
   reports an error if it is missing. Do not commit `.env` or share its
   contents.

3. Run the tests from the repository root:

   ```sh
   yarn test:e2e
   ```

When `PLAYWRIGHT_BASE_URL` is set, Playwright uses that existing UAT site and
does not start the local application. If it is unset, the configuration
instead starts the local app with `yarn start:dev`; set it to the approved UAT
URL to run against UAT.

The local run opens Chromium in headed mode. To request headed mode explicitly:

```sh
yarn test:e2e --headed
```

An HTML report is created in `playwright-report/`. Open it after the run with:

```sh
yarn test:e2e:report
```

For local application setup and configuration, see the
[repository README](../README.md).

## CI

Pull-request builds run against the deployed branch environment. The nightly
Drone run uses the UAT URL configured in its `NIGHTLY_E2E_BASE_URL` secret.
Both CI paths use the `SAS_HOF_EMAIL` secret. Keep these values in the
approved secret store rather than adding them to the repository.
