# UKVI Complaints Playwright Tests

The Java UKVIC tests are migrated from `hof-e2e-auto-tests/Function/src/main`, using the LMR page-object and BDD fixture conventions.

## Scope

- All 61 UKVIC source page classes and the shared UKVI page are registered in `fixture/fixtures.ts`.
- Cross-page journey branches and scenario-state checks remain in `steps/ukvic.step.ts` as `ukVicStepLib`. Single-page helpers and UI assertions belong to their page classes; simple delegates reuse existing page methods.
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

`test:e2e:parity` replays the original and refactored step implementations for all 291 descriptions, 2,880 application-guidance combinations and 15 boundary checks. It compares ordered page calls and errors and verifies 70 protected feature, page, fixture, data, constant and configuration files against their captured hashes. It creates `parity-audit.json` and fresh isolated selectors in `validation-manifest.json`. The original implementation is retained only as verification evidence in `test-data/step-refactor-baseline.json`, not as runtime journey data.

`test:e2e:isolated` launches a separate single-worker process for each active scenario. `--resume` skips matching previously passed cases only when the test-input fingerprint is unchanged; `--full` permits full-suite execution only after all active individual cases have passed. The runner sets CI mode for headless browser execution, without modifying the configured service or secrets.

To rerun a specific manifest case:

```powershell
yarn test:e2e:isolated --from 13 --to 13
```

The root Playwright configuration loads `.env` quietly and uses `PLAYWRIGHT_BASE_URL`, falling back to `http://localhost:8080`. The application and its existing dependencies must already be available; these tests do not provision infrastructure or modify service secrets.

## Description Selection

Journeys start with `Given I visit the Ukvic page`, followed by `When I fill out my answers for the Ukvic form pertaining to "<Description>"`. Field-validation journeys navigate first and then use `And I use the Ukvic scenario "..."` without completing the form automatically.

`getApplicantForDescription(description)` uses exact string cases to return the original applicant objects directly, including validation aliases and commented examples. No IDs are extracted and no branching is inferred from description wording. Blank and unknown descriptions are rejected; conflicting duplicate mappings were checked before conversion. Existing `applicantId` fields are retained only as unchanged data metadata.

## Compact Journey Dispatch

The UKVIC `When` callback validates and selects the exact description first, then displays the nine journey branches as awaited page-fixture and shared journey calls. The user approved dispatching on the selected applicant's complaint type instead of listing all 291 descriptions in the callback. Description lookup remains exact and case-sensitive.

The duplicated inside/outside-UK application flow now uses one location switch and one shared guidance helper. An explicit priority list retains the original inside-UK booking-issue precedence, with a flat switch dispatching the matched decision. Decision comparisons retain their original case-insensitive behavior.

Equivalent branches are grouped in the reference-number, representative-relationship, appointment-problem and original-complaint helpers. The old wrapper around the top-level complaint dispatch is removed. The existing unclear-guidance continuation is explicit rather than relying on switch fall-through. Page-specific actions remain in their page classes.

Strict TypeScript checking, BDD generation and the replay audit passed. The first three active scenarios passed individually; the remaining 32 individual cases and full-suite run were not executed because the user skipped the validation task. Run the isolated validation command with `--resume --from 4 --to 35 --full` to complete the remaining gates against unchanged inputs.

`page-method-mapping.json` records every relocated method, its owner, the reused or moved page method, and each retained method's orchestration/state responsibility. It also records pre-refactor feature, data and fixture hashes. Description checks still accompany the existing journey and field-validation assertions.

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