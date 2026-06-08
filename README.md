# 🌿 leaf_Ground_Automation

A production-grade test automation framework built with **Playwright** and **TypeScript**, following a clean three-level **Page Object Model (POM)** architecture. Designed for scalability, reusability, and maintainability.

---

## 🛠️ Tech Stack

| Tool                                  | Version |
| ------------------------------------- | ------- |
| [Playwright](https://playwright.dev/) | ^1.59.1 |
| TypeScript                            | ^6.0.3  |
| Node.js                               | ≥ 18.x  |
| dotenv                                | ^17.4.2 |

---

## 📁 Project Structure

```
leaf_Ground_Automation/
├── pages/                    # Page classes (one per feature/page)
│   ├── alertPage.ts
│   ├── dropdownPage.ts
│   ├── textBoxPage.ts
│   └── windowsPage.ts
├── tests/                    # Test spec files
│   └── leafground.spec.ts
├── utils/                    # Base framework classes
│   ├── locators.ts           # All locators and test data (base class)
│   └── methods.ts            # Reusable static utility methods
├── screenshots/              # Auto-captured screenshots per action
├── playwright-report/        # HTML test report
├── playwright.config.ts      # Playwright configuration
├── .env.leafground            # Environment variables (BASE_URL, etc.)
└── package.json
```

---

## 🏗️ Framework Architecture

This framework follows a strict **three-level class hierarchy**:

```
Locators  (utils/locators.ts)
    └── Methods extends Locators  (utils/methods.ts)
            └── Page Classes e.g. AlertPage extends Methods  (pages/)
```

### Level 1 — `Locators`

- Holds all CSS/XPath selectors as `protected readonly` properties
- Holds all test data (expected texts, URLs, input values)
- Typed constants using literal union types (e.g. `DialogAction`, `RoleActions`)

### Level 2 — `Methods`

- Extends `Locators`
- Contains `protected static` utility methods that accept `page` as a parameter (no constructor dependency)
- Key utilities:
  - `alertHandling(page, action, text?)` — handles browser dialogs (accept/dismiss) with optional prompt text
  - `assertText(page, locator, text, isVisible?)` — optional visibility check + text assertion
  - `loopClickWithByRole(page, name, role)` — clicks all matching role elements with screenshot capture
  - `captureAndLog(page, name)` — takes a timestamped full-page screenshot

### Level 3 — Page Classes

- Extends `Methods`
- Uses `#page` (private class field) for page isolation
- Contains `private async` action methods
- Exposes a single `public async` entry method (e.g. `handlingAlert()`)

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

### 3. Install Playwright browsers

```bash
npx playwright install
```

### 4. Configure environment

Create or update `.env.leafground` in the project root:

```env
BASE_URL=https://www.primefaces.org/primefaces-tur/
```

---

## ▶️ Running Tests

```bash
# Run all tests
npx playwright test

# Run in headed mode (visible browser)
npx playwright test --headed

# Run a specific test file
npx playwright test tests/leafground.spec.ts

# Run with UI mode
npx playwright test --ui
```

---

## 📊 View Test Report

```bash
npx playwright show-report
```

The HTML report opens in your browser with full test details, screenshots, and traces.

---

## 🧪 Test Coverage

| Feature                                  | Status |
| ---------------------------------------- | ------ |
| Text Box interactions                    | ✅     |
| Dropdown selections                      | ✅     |
| Multiple window handling                 | ✅     |
| Browser alert / confirm / prompt dialogs | ✅     |
| Sweet Alert popups                       | ✅     |
| Modal dialogs                            | ✅     |

---

## 📸 Screenshot Strategy

Screenshots are automatically captured after every significant action via `captureAndLog()` and saved to the `screenshots/` directory with a timestamped filename:

```
screenshots/dismiss_click_0-1780850708878.png
screenshots/Yes_click_0-1780850710281.png
```

---

## 🔑 Key TypeScript Patterns Used

- **Literal union types** — `type DialogAction = "accept" | "dismiss"` for type-safe dialog handling
- **`as const`** — used with property declarations to prevent type widening
- **Private class fields** — `#page` for strict page encapsulation
- **`Parameters<Page["getByRole"]>[0]`** — for `AriaRole` typing without importing internal types
- **Nullish coalescing** — `text ?? ""` for optional dialog prompt text
- **Static methods with `page` parameter** — avoids constructor coupling in utility layer

---

## 👤 Author

**Rajesh Kumar Pandian**  
Senior Specialist QA / SDET  
[GitHub](https://github.com/rajesh24ece) · [LinkedIn](https://www.linkedin.com/in/rajeshkumarpandian/)

---

## 📄 License

ISC
