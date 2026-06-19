export type DialogAction = "accept" | "dismiss";

export type RoleActions = "button" | "option";

export class Locators {
  protected webTable = "grid.xhtml";

  protected accept: DialogAction = "accept";
  protected dismiss: DialogAction = "dismiss";
  protected dialogText = "Dialog";
  protected button: RoleActions = "button";
  protected option: RoleActions = "option";

  protected tableJson = "../test-data/webTable.json";
}
