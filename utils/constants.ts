export type DialogAction = "accept" | "dismiss";

export type RoleActions = "button" | "option";

export class Locators {
  protected webTable = "grid.xhtml";
  protected tableJson = "../test-data/webTable.json";
}

export const DialogActions = {
  ACCEPT: "accept" as DialogAction,
  DISMISS: "dismiss" as DialogAction,
};

export const Roles = {
  BUTTON: "button" as RoleActions,
  OPTION: "option" as RoleActions,
};

export const DialogText = "Dialog";

export const JsonPaths = {
  TABLE: "./test-data/webTable.json",
};
