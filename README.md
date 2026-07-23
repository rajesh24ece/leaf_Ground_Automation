# 🌿 leaf_Ground_Automation

A portfolio-grade test automation framework built with Playwright and TypeScript, combining UI and API testing under a single, layered architecture. Designed for scalability, reusability, and CI/CD readiness.

![CI](https://github.com/rajesh24ece/leaf_Ground_Automation/actions/workflows/playwright-tests.yml/badge.svg)

## 🛠️ Tech Stack

| Tool                         | Version |
| ---------------------------- | ------- |
| Playwright                   | ^1.59.1 |
| TypeScript                   | ^6.0.3  |
| Node.js                      | ≥ 18.x  |
| Allure Playwright            | ^3.10.1 |
| Winston (logging)            | ^3.19.0 |
| Faker.js                     | ^10.5.0 |
| Ajv (JSON schema validation) | ^8.20.0 |
| dotenv                       | ^17.4.2 |

## 📁 Project Structure

```
leaf_Ground_Automation/
├── .github/
│   ├── workflows/
│   │   └── playwright-tests.yml     # CI/CD pipeline (Docker, Allure, Slack)
│   └── agents/                      # Copilot agent configs for test generation/healing
├── fixtures/
│   ├── accessJsonFile.ts            # Custom fixture for typed JSON test-data loading
│   └── apiFixture.ts                # Custom fixture providing an APIRequestContext + DummyJsonApiPage
├── helpers/                         # Single-responsibility static helper classes
│   ├── clickHelper.ts               # Click actions (safe click, clickIfVisible, etc.)
│   ├── inputHelper.ts               # Fill / type / clear actions
│   ├── dropdownHelper.ts            # Native + custom (PrimeFaces-style) dropdown handling
│   ├── alertHelper.ts               # Browser dialog (alert/confirm) handling
│   ├── navigationHelper.ts          # Tab/window navigation and waits
│   ├── fileHelper.ts                # File upload/download handling
│   ├── screenshotHelper.ts          # Timestamped screenshot capture
│   ├── assertionHelper.ts           # Centralized soft/hard assertion wrapper
│   ├── dataGenerator.ts             # Faker-based test data generation (UI + API)
│   ├── dummyJsonApiHelper.ts        # Generic REST helper (GET/POST/PUT + status/JSON handling)
│   ├── SchemaHelper.ts              # Ajv-based JSON schema validation wrapper
│   └── LocatorHelper.ts             # `PageLocators` — role/text/label/testId locator shortcuts
├── interface/                       # TypeScript interfaces for test data and API payload shapes
│   ├── uiInterface.ts               # UI test data interfaces (per feature)
│   └── apiInterface.ts              # API request/response payload interfaces
├── locators/                        # One file per feature, `as const` for type safety
│   ├── alertLocators.ts
│   ├── dropdownLocators.ts
│   ├── textBoxLocators.ts
│   ├── uploadLocators.ts
│   ├── webTableLocators.ts
│   ├── windowsLocator.ts
│   └── dummyJsonApiLocator.ts
├── pages/                           # Page Object classes, one per feature
│   ├── alertPage.ts
│   ├── dropdownPage.ts
│   ├── textBoxPage.ts
│   ├── uploadPage.ts
│   ├── webTablePage.ts
│   ├── windowsPage.ts
│   └── dummyJsonApiPage.ts          # API "page object" wrapping DummyJSON endpoints
├── schemas/                         # Ajv JSON schemas for API response validation
│   ├── ProductSchema.ts
│   └── productResponseSchema.ts
├── specs/                           # Test-spec reference docs (per-suite test counts, run commands)
│   └── README.md
├── test-data/                       # JSON test data per feature
│   ├── alert.json
│   ├── dropdown.json
│   ├── textBox.json
│   ├── upload.json
│   ├── webTable.json
│   └── files/                       # Sample files used for upload tests
├── tests/                           # Test spec files
│   ├── alert.spec.ts
│   ├── dropdown.spec.ts
│   ├── textBox.spec.ts
│   ├── upload.spec.ts
│   ├── webtable.spec.ts
│   ├── windows.spec.ts
│   └── dummyJsonApi.spec.ts         # API test suite (DummyJSON)
├── utils/
│   ├── constants.ts                 # Typed constants and enums
│   ├── textUtils.ts                 # Shared text-handling utilities
│   ├── errorUtils.ts                # Centralized error handling
│   ├── gitUtils.ts                  # Git branch/commit info for Allure environment
│   ├── logger.ts                    # Winston logger configuration
│   └── allureEnvironment.ts         # Injects environment + git metadata into Allure
├── globalSetup.ts                   # Cleans output folders before each run
├── playwright.config.ts             # Playwright configuration (loads .env.qe)
├── tsconfig.json                    # Strict TypeScript configuration
└── .env.qe                          # Environment variables (BASE_URL, API_BASE_URL, etc.)
```

## 🏗️ Framework Architecture

This framework follows a three-layer architecture, applied consistently across both UI and API testing:

```
Layer 1 — Locators        (locators/*.ts)
               ↓
Layer 2 — Helpers         (helpers/*.ts)     ← single-responsibility static helper classes
               ↓
Layer 3 — Page Classes    (pages/*.ts)       ← action methods per feature/page
```

**Design principles**

- **Composition over inheritance** — every Page class holds its own private `#page` (or `#request`, for API pages) field rather than extending a shared base class. This keeps each page class self-contained and avoids the fragile-base-class problem.
- **Single-responsibility helpers** — instead of one large `Methods` utility class, functionality is split into focused static classes (`ClickHelper`, `InputHelper`, `DropdownHelper`, `AlertHelper`, `NavigationHelper`, `FileHelper`, `ScreenshotHelper`, `AssertionHelper`), each with one clear purpose.
- **Typed by default** — `strict: true` in `tsconfig.json`, `as const` locator objects for autocomplete and immutability, and typed interfaces (`interface/uiInterface.ts`, `interface/apiInterface.ts`) for every piece of test data and API payload.
- **Centralized assertions** — all assertions (soft or hard) go through `AssertionHelper`, so assertion behavior (e.g., soft-assert mode) is controlled in one place rather than scattered across test files.
- **Centralized logging** — all actions and API calls are logged through a Winston-based logger (`utils/logger.ts`), giving structured, leveled logs across both UI and API test runs.
- **Randomized, data-driven flows** — UI test data (e.g., dropdown selections) is picked at random from JSON fixtures via `DataGenerator`, rather than hardcoded to a fixed index/value, so repeated runs exercise a wider range of real option values instead of the same path every time.

## 🌐 API Testing Layer

Alongside the UI framework, this project includes a REST API testing layer built against the public **DummyJSON** API, following the same layered pattern as the UI tests:

- `helpers/dummyJsonApiHelper.ts` (`ApiHelper`) — a generic, reusable REST helper:
  - `get<T>()` — GET request with built-in status assertion and safe JSON parsing
  - `getStatusCode()` — returns the raw HTTP status (intentionally assertion-free, for tests that need to check an arbitrary/unexpected status)
  - `getLength()` — returns the length of an array-based response
  - `post<T>()` / `put<T>()` — write requests with status assertion, safe JSON parsing, and full request/response logging
- `pages/dummyJsonApiPage.ts` (`DummyJsonApiPage`) — wraps the above into feature-level methods (`getProducts`, `getSingleProduct`, `getProductsCount`, `addProduct`, `putProduct`, etc.)
- `helpers/dataGenerator.ts` (`DataGenerator`) — generates realistic fake product payloads (via `@faker-js/faker`) for POST/PUT requests, and random product IDs for single-record lookups
- `helpers/SchemaHelper.ts` + `schemas/*.ts` — Ajv-based JSON schema validation for API responses, ensuring response shape (types, required fields) is verified independently of individual field-value assertions
- `tests/dummyJsonApi.spec.ts` — covers status codes, record counts, single/all product retrieval, product creation, product updates, and schema validation

### ⚠️ Important note on API validation

DummyJSON is a public demo/test API with no real backend database — it is designed for practicing HTTP requests, not for persisting data. This has a direct effect on what can and cannot be validated:

- POST and PUT requests succeed and echo back a realistic-looking response (including a generated `id`), but nothing is actually saved server-side.
- A follow-up GET request will **not** reflect any data created or updated via POST/PUT — it will always return the original seed data.
- Because of this, all write-operation tests (`addProduct`, `putProduct`) validate the **echoed response from the same request** (e.g., confirming the response contains the fields that were sent and conforms to the expected schema), rather than attempting to verify persistence via a subsequent GET or checking that record counts changed. This is intentional and documented inline in the test file — not a gap in coverage, but a deliberate boundary based on what this specific public API actually supports.
- If full end-to-end persistence testing is required in the future, this would need either a real backend or a local mock server (e.g., `json-server`) that genuinely persists writes.

## 🔁 CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/playwright-tests.yml`) runs on every push to `main`, on a daily schedule, and on manual dispatch:

- Runs inside the official Microsoft Playwright Docker image (`mcr.microsoft.com/playwright:v1.59.1-noble`) for consistent, pre-provisioned browser dependencies
- Loads environment configuration from `.env.qe`, populated from GitHub Secrets at runtime
- Parses Playwright's JSON test results to compute pass/fail/flaky/skipped counts and a success percentage
- Generates and uploads both the Playwright HTML report and the Allure HTML report as build artifacts (30-day retention)
- Sends a Slack notification (via Block Kit) summarizing the run — repository, branch, triggering actor, run link, and full pass/fail/flaky/skipped breakdown — regardless of whether the run passed or failed

## 📊 Allure Reporting

- `allure-playwright` integration captures step-level detail, screenshots, and traces per test
- `utils/allureEnvironment.ts` and `utils/gitUtils.ts` inject environment info and git branch/commit metadata into the report, so every run is traceable back to the exact code state that produced it
- Generate and view locally:

```bash
npm run allure:generate
npm run allure:open
```

## ⚙️ Environment Configuration

Environment variables are loaded from `.env.qe` via `dotenv`, referenced in `playwright.config.ts`. Required variables:

```
BASE_URL=https://leafground.com/
API_BASE_URL=https://dummyjson.com
WORKERS=<parallel worker count>
```

In CI, these are populated from GitHub Secrets directly into `.env.qe` at runtime, so the same file is the single source of truth for both local and CI runs.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# View the Playwright HTML report
npm run report

# Generate and open the Allure report
npm run allure:generate
npm run allure:open
```

## ✅ What This Project Demonstrates

- A layered, composition-based POM architecture applied consistently across UI and API testing
- Custom Playwright fixtures for both JSON test-data injection and API request context
- Strict TypeScript with typed locators, typed test data, and typed API payloads/responses
- Centralized, reusable assertion and logging layers, plus Ajv-based JSON schema validation for API responses
- Randomized, data-driven UI flows that exercise a range of real values instead of a single hardcoded path
- A production-style CI/CD pipeline: containerized test execution, artifact retention, Allure reporting, and real-time Slack notifications
- Realistic handling of a public test API's limitations, with validation strategy adjusted (and documented) accordingly rather than ignored

## 👤 Author

**Rajesh Kumar Pandian**
Senior SDET / QA Automation Engineer / Senior Specialist - Quality Engineering
GitHub: [@rajesh24ece](https://github.com/rajesh24ece)
