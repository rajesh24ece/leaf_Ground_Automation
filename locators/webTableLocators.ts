import path from "path";

export const WebTableLocators = {
  webTableJson: "webTable.json",
  webTablePage: "grid.xhtml",
  newButton: "New",
  nameLocator: "#form\\:name",
  description: "#form\\:description",
  price: "#form\\:price_input",
  quantity: "#form\\:quantity_input",
  saveButton: "Save",
  alertLocator: ".ui-growl-message",
  alertHeader: "Product Added",
  searchPlaceholder: "Search",
} as const;
