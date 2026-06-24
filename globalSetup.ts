import fs from "fs";

async function globalSetup() {
  const folders = [
    "playwright-report",
    "test-results",
    "screenshots",
    "allure-results",
  ];

  folders.forEach((folder) => {
    if (fs.existsSync(folder)) {
      fs.rmSync(folder, { recursive: true, force: true });
      console.log(`Deleted: ${folder}`);
    }
  });
}

export default globalSetup;
