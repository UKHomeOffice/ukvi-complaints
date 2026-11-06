# UKVI Complaints Playwright Tests

The Java UKVIC tests are migrated from `hof-e2e-auto-tests/Function/src/main`, using the LMR page-object and BDD fixture conventions.

## Scope

- All 61 UKVIC source page classes and the shared UKVI page are registered in `fixture/fixtures.ts`.
- Journey branches and validation helpers are implemented in `steps/ukvic.step.ts` as `ukVicStepLib`.
- All active step phrases are bound. Shared field-validation assertions are in `steps/ukvic-validation.step.ts`.
- All 291 feature description variants select their existing applicant objects directly through the switch in `test-data/ukvic-applicant.ts`. Runtime tests do not read CSV or look up numeric IDs.
- Page objects keep test data out of the page layer. Values are centralised in `utility-helper/constants-lib.ts`.
- Screenshots and videos follow the existing Playwright configuration. Validation artifacts use unique directories under `.playwright-runs/`.

Feature files and their current enabled/commented coverage are preserved. The audit reports the current active and commented-case counts; validation does not enable deferred examples.

## Commands

From the service repository root:

```powershell
yarn install --ignore-scripts
npx playwright install chromium
yarn test:e2e:typecheck
yarn test:e2e:generate
yarn test:e2e:parity
yarn test:e2e:isolated
yarn test:e2e:isolated --resume --full
```

`test:e2e:parity` checks all feature descriptions against the original applicant-data hashes, including validation aliases and commented examples. It creates `parity-audit.json`, `migration-report.md`, and `validation-manifest.json`; the latter contains each active case's exact isolated command. Feature contents are also compared with the local pre-conversion snapshot when available.

`test:e2e:isolated` launches a separate single-worker process for each active scenario. `--resume` skips matching previously passed cases only when the test-input fingerprint is unchanged; `--full` permits full-suite execution only after all active individual cases have passed. The runner sets CI mode for headless browser execution, without modifying the configured service or secrets.

To rerun a specific manifest case:

```powershell
yarn test:e2e:isolated --from 13 --to 13
```

The root Playwright configuration loads `.env` quietly and uses `PLAYWRIGHT_BASE_URL`, falling back to `http://localhost:8080`. The application and its existing dependencies must already be available; these tests do not provision infrastructure or modify service secrets.

## Description Selection

Journeys start with `Given I visit the Ukvic page`, followed by `When I fill out my answers for the Ukvic form pertaining to "<Description>"`. Field-validation journeys navigate first and then use `And I use the Ukvic scenario "..."` without completing the form automatically.

`getApplicantForDescription(description)` uses exact string cases to return the original applicant objects directly, including validation aliases and commented examples. No IDs are extracted and no branching is inferred from description wording. Blank and unknown descriptions are rejected; conflicting duplicate mappings were checked before conversion. Existing `applicantId` fields are retained only as unchanged data metadata.

`test-data/legacy-description-mapping.json` preserves the original features, descriptions, tags, journey steps and applicant-data hashes for verification. Do not overwrite this baseline. Description checks accompany the existing journey and field-validation assertions.

## Reports

- `migration-report.md`: description-refactor completeness and explicit coverage deferrals.
- `parity-audit.json`: machine-readable checks against the original ID-selected applicant-data hashes and feature inventory.
- `validation-results.json`: individual scenario results, commands, duration, diagnostics and artifact directories.
- `validation-report.md`: individual results and full-run status.
- `validation-full-run.json`: structured Playwright output for the final full active run.

## Migration Corrections

The following concrete defects were fixed during validation without changing source scenario expectations:

- Align `playwright` and `@playwright/test` versions to prevent duplicate-runner collection errors.
- Select the rendered `Panama` autocomplete option for the source `PANAMA` value, using an exact case-insensitive match.
- Target the verified `Complaint details` label and retain keyboard entry.
- Await Back navigation and resolve the uploaded source image relative to the step file.
- Isolate run artifact directories after two full-run failures reported missing trace files during browser-context cleanup. Both affected cases passed individually after isolation.

Source descriptions that disagree with CSV values remain unchanged; CSV values determine branching. The source's commented-out documents-link invocation and literal future DOB validation date are also preserved.