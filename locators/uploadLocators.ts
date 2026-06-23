import path from "path";

export const UploadLocators = {
  pageUrl: "/file.xhtml",
  uploadJson: path.join(process.cwd(), "test-data", "upload.json"),
  uploadOne: "../test-data/files/file_one.png",
  uploadOneLocator: "input[type='file']",
  uploadTwo: "../test-data/files/file_two.png",
  uploadTwoLocator: "#j_idt97\\:j_idt98_input",
} as const;
