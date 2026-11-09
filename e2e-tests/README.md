# UKVI complaints end-to-end tests

The suite uses Playwright and Playwright BDD. Run the tests from your machine
against an **approved, already-running UAT environment**.

> **Warning:** The tests submit complaints and upload documents. Run them only
> against an authorised test environment with approved test data, email
> addresses and integrations. Some journeys also check external guidance links.

## Test structure

| Location                          | Contents                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| `features/`                       | Gherkin complaint journeys and field-validation scenarios.                           |
| `steps/`                          | TypeScript definitions that connect Gherkin steps to browser actions and assertions. |
| `fixture/fixtures.ts`             | Playwright fixtures, including the registered page objects.                           |
| `pages/`                          | Page objects, shared browser actions and page-specific assertions.                   |
| `test-data/user-upload-files/`    | Files used by document-upload steps.                                                 |
| `utility-helper/constants-lib.ts` | Shared test values and the required test email configuration.                        |

The root `playwright.config.ts` reads the feature and step files and generates
BDD tests in `.features-gen/`. The configured browser project is Chromium.

## Prerequisites

- Node.js `>=24.22.1 <25.0.0`, as specified in `package.json`.
- Yarn and access to the approved UAT environment from your machine.
- Project dependencies and the Chromium browser:

  ```sh
  yarn install
  npx playwright install chromium
  ```

Run these commands from the repository root.

## Configure the root `.env`

Playwright loads `.env` from the repository root. Set the following values
using an approved UAT host and test inbox:

```dotenv
PLAYWRIGHT_BASE_URL=https://<approved-uat-host>
SAS_HOF_EMAIL=test@example.test
```

These are placeholders, not actual UAT values. Replace the URL with the
authorised UAT base URL and use an approved test email address. Never commit
the `.env` file or share its contents.

| Variable              | Purpose                                                                                                              |
|-----------------------|----------------------------------------------------------------------------------------------------------------------|
| `PLAYWRIGHT_BASE_URL` | Points the suite to UAT. When set, Playwright uses the existing environment and does not start the local web server. |
| `SAS_HOF_EMAIL`       | Required test email used for applicant/contact details. The constants module throws if it is missing or empty.       |

`PLAYWRIGHT_PORT` is optional and defaults to `8080`; it controls the
automatic local server's port and default URL when `PLAYWRIGHT_BASE_URL` is
unset. In that case, Playwright starts `yarn start:dev` and uses
`http://localhost:8080` by default. Local application dependencies and
configuration are described in the [root README](../README.md).

## Run the suite and view the report

From the repository root:

```sh
yarn test:e2e
```

The `test:e2e` script runs `bddgen && playwright test`. When `CI` is unset,
the configuration runs Chromium headed locally. You can also explicitly
request headed mode:

```sh
yarn test:e2e --headed
```

Open the HTML report after the run:

```sh
yarn test:e2e:report
```

Any non-empty `CI` environment variable enables headless mode, two workers
and two retries; otherwise the configuration uses one worker and one retry.
Playwright's HTML report is written to `playwright-report/`.