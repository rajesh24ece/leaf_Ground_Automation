export type DialogAction = "accept" | "dismiss";

export type RoleActions = "button" | "option";

export const DialogActions = {
  ACCEPT: "accept" as DialogAction,
  DISMISS: "dismiss" as DialogAction,
};

export const Roles = {
  BUTTON: "button" as RoleActions,
  OPTION: "option" as RoleActions,
  GRIDCELL: "gridcell" as RoleActions,
};

export const DialogText = "Dialog";
