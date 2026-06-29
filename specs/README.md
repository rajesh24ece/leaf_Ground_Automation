# Test Specifications

This folder contains the Playwright test spec files for the leaf_Ground_Automation framework.

## Test Files

| Spec File          | Page Under Test        | No. of Tests |
| ------------------ | ---------------------- | ------------ |
| `textBox.spec.ts`  | Text Box Page          | 11           |
| `alert.spec.ts`    | Alert Page             | 10           |
| `dropdown.spec.ts` | Dropdown Page          | 1            |
| `upload.spec.ts`   | Upload & Download Page | 3            |
| `webtable.spec.ts` | Web Table Page         | WIP          |
| `windows.spec.ts`  | Windows & Tabs Page    | 4            |

## How to Run

```bash
# Run all tests
npx playwright test

# Run a specific spec file
npx playwright test tests/alert.spec.ts

# Run in headed mode
npx playwright test --headed
```

## Test Data

All test data is stored in `/test-data` folder as JSON files.
