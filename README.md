# 🌿 leaf_Ground_Automation

A portfolio-grade test automation framework built with **Playwright** and **TypeScript**, following a clean three-level **Page Object Model (POM)** architecture. Designed for scalability, reusability, and CI/CD readiness.

![CI](https://github.com/rajesh24ece/leaf_Ground_Automation/actions/workflows/playwright-tests.yml/badge.svg)

---

## 🛠️ Tech Stack

| Tool                                  | Version |
| ------------------------------------- | ------- |
| [Playwright](https://playwright.dev/) | ^1.59.1 |
| TypeScript                            | ^6.0.3  |
| Node.js                               | ≥ 18.x  |
| Allure Playwright                     | ^3.10.1 |
| dotenv                                | ^17.4.2 |

---

## 📁 Project Structure

```
leaf_Ground_Automation/
├── .github/
│   └── workflows/
│       └── playwright-tests.yml  # GitHub Actions CI/CD pipeline
├── fixtures/
│   └── accessJsonFile.ts         # Custom Playwright fixture for JSON data loading
├── locators/                     # Locator files (one per feature)
│   ├── alertLocators.ts
│   ├── dropdownLocators.ts
│   ├── textBoxLocators.ts
│   ├── uploadLocators.ts
│   └── windowsLocator.ts
├── pages/                        # Page classes (one per feature)
│   ├── alertPage.ts
│   ├── dropdownPage.ts
│   ├── textBoxPage.ts
│   ├── uploadPage.ts
│   ├── webtablePage.ts
│   └── windowsPage.ts
├── test-data/                    # JSON test data files
│   ├── alert.json
│   ├── dropdown.json
│   ├── textBox.json
│   ├── upload.json
│   └── webTable.json
├── tests/                        # Test spec files
│   ├── alert.spec.ts
│   ├── dropdown.spec.ts
│   ├── textBox.spec.ts
│   ├── upload.spec.ts
│   ├── webtable.spec.ts
│   └── windows.spec.ts
├── utils/
│   ├── constants.ts              # Typed constants and enums
│   ├── methods.ts                # Reusable static utility methods
│   └── test-data.interface.ts   # TypeScript interfaces for test data
├── globalSetup.ts                # Cleans output folders before each run
├── playwright.config.ts          # Playwright configuration
└── .env.leafground               # Environment variables (BASE_URL etc.)
```

---

## 🏗️ Framework Architecture

This framework follows a **three-layer POM architecture**:

```
Layer 1 — Locators     (locators/*.ts)
              ↓
Layer 2 — Methods      (utils/methods.ts)    ← static utility methods
              ↓
Layer 3 — Page Classes (pages/*.ts)          ← action methods per page
```

### Layer 1 — Locators

- One file per feature (`alertLocators.ts`, `dropdownLocators.ts` etc.)
- All selectors declared as `as const` objects for type safety and autocomplete
- JSON data file paths resolved at runtime using `path.join(process.cwd(), ...)`

### Layer 2 — Methods

- Reusable `static` utility methods that accept `page` as a parameter
- Key utilities:
  - `alertHandling(page, action, text?)` — handles browser dialogs (accept/dismiss)
  - `clickDropdownHandling(page, locator, value, role)` — handles PrimeFaces custom dropdowns
  - `clickMatchingByRole(page, locator, roleType)` — clicks all elements matching a role
  - `assertText / assertVisible / assertVisibleWithText` — assertion helpers
  - `accessJsonData<T>(filePath)` — generic typed JSON loader
  - `captureAndLog(page, name)` — timestamped full-page screenshot capture

### Layer 3 — Page Classes

- One class per page/feature (`AlertPage`, `DropdownPage` etc.)
- Uses `#page` private class field for strict page encapsulation
- Extends `Methods` to inherit utility functions
- Each method wraps one logical user action

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/rajesh24ece/leaf_Ground_Automation.git
cd leaf_Ground_Automation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create `.env.leafground` in the project root:

```env
BASE_URL=https://leafground.com
WORKERS=1
```

---

## ▶️ Running Tests

```bash
# Run all tests (headless)
npx playwright test

# Run in headed mode (visible browser)
npx playwright test --headed

# Run a specific spec file
npx playwright test tests/dropdown.spec.ts

# Run with Playwright UI mode
npx playwright test --ui
```

---

## 📊 Reports

```bash
# Open Playwright HTML report
npx playwright show-report

# Generate Allure HTML report
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## 🧪 Test Coverage

| Feature                                          | Tests  | Status |
| ------------------------------------------------ | ------ | ------ |
| Alerts — simple, confirm, prompt, sweet alert    | 10     | ✅     |
| Dropdowns — native, PrimeFaces AJAX-dependent    | 1      | ✅     |
| Text Box — fill, append, clear, date picker, OSK | 11     | ✅     |
| File Upload & Download                           | 3      | ✅     |
| Multi-Window & Tab handling                      | 4      | ✅     |
| Web Table — create, search, paginate             | 1      | ✅     |
| **Total**                                        | **31** | ✅     |

---

## 🚀 CI/CD Pipeline

The framework runs on **GitHub Actions** using the official **Microsoft Playwright Docker image** (`mcr.microsoft.com/playwright:v1.59.1-noble`), which eliminates browser download steps entirely.

### Pipeline steps

1. Checkout → Install dependencies
2. Run all 31 tests headless inside Docker
3. Upload Playwright HTML report artifact
4. Upload test results (screenshots, videos, traces)
5. Install Java → Generate Allure HTML report
6. Upload Allure results + Allure HTML report artifacts
7. Send Slack Block Kit notification with pass/fail/flaky counts and run link

### Slack notification sample

```
✅ Playwright Tests — All Passed

Repository:   rajesh24ece/leaf_Ground_Automation
Branch:       main
Triggered by: rajesh24ece
Run:          View Run

Test Results:
🔢 Total         =>  31
✅ Passed        =>  31
❌ Failed        =>  0
⚠️ Flaky          =>  0
⏭️ Skipped       =>  0
📊 Success Rate  =>  100.0%
```

---

## 🔑 Key TypeScript Patterns Used

- **Private class fields** — `#page` for strict page encapsulation
- **Literal union types** — `type DialogAction = "accept" | "dismiss"` for type-safe constants
- **`as const`** — on locator objects to prevent type widening and enable autocomplete
- **Generics** — `accessJsonData<T>()` and `getJsonData<T>()` fixture for typed JSON loading
- **`Parameters<Page["getByRole"]>[0]`** — for `AriaRole` typing without importing internal Playwright types
- **Custom fixtures** — `getJsonData` fixture extends Playwright's base `test` for reusable data loading
- **`Promise.all`** — for concurrent page event listening and action triggering in multi-tab tests
- **`waitForLoadState("networkidle")`** — for AJAX-dependent dropdown timing in CI environments

---

## 👤 Author

**Rajesh Kumar Pandian**
Senior SDET | 11+ years experience | Playwright · TypeScript · CI/CD
[GitHub](https://github.com/rajesh24ece) · [LinkedIn](https://www.linkedin.com/in/rajeshkumarpandian/)

---

## 📄 License

ISC
