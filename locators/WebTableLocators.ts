import path from "path";

export const WebTableLocators = {
  webTableJson: path.join(process.cwd(), "test-data", "webTable.json"),
  webTablePage: "grid.xhtml",
} as const;
