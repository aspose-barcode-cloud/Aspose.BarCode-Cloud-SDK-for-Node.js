# Node submodule workflow

Use this reference when the task edits SDK source, tests, snippets, docs, package metadata, or generated files inside `submodules/node`.

## Layout

- `src`: generated API clients, `Configuration`, `JWTAuth`, `ApiClient`, multipart helpers, models, and root exports.
- `test`: Jest coverage for configuration, API client behavior, multipart encoding, generate, recognize, scan, end-to-end flows, and error handling.
- `snippets`: runnable documentation snippets grouped by `generate/*` and `read/*` scenarios.
- `scripts`: example and snippet runners, credential insertion, docs formatting, example insertion, and post-generation helpers.
- `dist`: built package output consumed by the example and snippet harnesses.
- `example.js`, `README.md`, and `docs/index.md`: user-facing usage examples.
- `package.json` and `Makefile`: local validation and automation entry points.

## Validation

On Windows, run repo scripts and Make targets through WSL.

From `submodules/node`:

- `make init`
- `make build`
- `make lint`
- `make typecheck`
- `make test`
- `make after-gen`

What these targets do:

- `make init`: run `npm clean-install`, which also executes the package `prepare` build.
- `make build`: run `npm run prepare` (`tsup`) to regenerate `dist`.
- `make lint`: run `npx eslint src test snippets`.
- `make typecheck`: run `npx tsc --noEmit`.
- `make test`: run `typecheck`, `npm test` (Jest), `example`, and `snippets`.
- `make after-gen`: run `format`, refresh the lockfile, and reinsert the README example.

`make format` is also useful when docs or generated sources change. It runs `scripts/annotate-deprecated.bash`, `scripts/docs_format.sh`, and `npm run format`.

Because the example and snippet harnesses run against `dist`, rebuild after changing `src` or generated code before treating those harnesses as meaningful validation.

## Example and snippet harnesses

- `scripts/run_example.sh` copies `example.js` into `demo`, symlinks the local `package.json` and `dist`, and runs `node example.js`.
- `scripts/run_snippets.sh` creates `snippets_test`, symlinks the local package metadata and `dist`, injects credentials into each snippet, runs every snippet except `manualFetchToken.js`, then installs `axios` and `qs` only for the manual token snippet.
- `scripts/run_snippet.sh` uses `scripts/insert-credentials.js` to replace the placeholder dashboard credentials in a copied snippet before executing it.

Treat example or snippet failures as consumer-facing regressions, not just sample breakage.

## Test configuration

- `test/helpers.ts` loads `test/configuration.json` first and then falls back to `TEST_CONFIGURATION_*` environment variables.
- Useful names include `TEST_CONFIGURATION_CLIENT_ID`, `TEST_CONFIGURATION_CLIENT_SECRET`, `TEST_CONFIGURATION_BASE_URL`, `TEST_CONFIGURATION_ACCESS_TOKEN`, and `TEST_CONFIGURATION_TOKEN_URL`.
- `test/configuration.example.json` contains only placeholder client credentials. Runtime defaults still point at `https://api.aspose.cloud` and `https://id.aspose.cloud/connect/token`.
- `example.js` optionally uses `TEST_CONFIGURATION_ACCESS_TOKEN` as the fourth `Configuration` constructor argument.
- `scripts/insert-credentials.js` replaces only the placeholder client id and client secret strings from `test/configuration.json`.

## Regenerated code workflow

If you change generated SDK code in this mono-repo:

1. Make the intended SDK edit in `submodules/node` so the target behavior is clear.
2. Mirror the change in the matching template under `codegen/Templates/nodejs` when the file is generated.
3. Stage the Node submodule changes.
4. From the repo root, run `make node` through WSL.
5. Ensure `submodules/node` has no new unstaged diffs after regeneration.
6. If regeneration reintroduces old code, keep fixing templates or post-generation helpers until the generated output matches the intended SDK change.

## Useful anchors

- `src/Configuration.ts`: auth defaults, constructor order, and base URLs.
- `src/JWTAuth.ts`: token-fetch behavior and auth failure shape.
- `src/api.ts`: request building, response decoding, and API result shapes.
- `src/models.ts`: request-wrapper constructors and model or enum names.
- `test/helpers.ts`: how tests discover config from JSON and environment variables.
- `test/end-to-end.test.ts`: generate a `Buffer`, then pass it directly into `ScanMultipartRequestWrapper`.
- `scripts/run_example.sh`, `scripts/run_snippets.sh`, and `scripts/run_snippet.sh`: consumer-style execution harnesses.
- `Makefile`: local validation, packaging, and post-generation entry points.
