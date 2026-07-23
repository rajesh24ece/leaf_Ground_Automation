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
  tableRow: "tbody[id='form:dt-products_data'] tr",
  paginationCount: ".ui-paginator-pages a",
  alerWindow: ".ui-growl-item-container",
} as const;
