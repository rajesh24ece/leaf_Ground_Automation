export type DialogAction = "accept" | "dismiss";

export type RoleActions = "button" | "option";

export class Locators {
  // Page Links
  protected textPage = "input.xhtml";
  protected dropdownPage = "select.xhtml";
  protected alertPage = "alert.xhtml";
  protected multipleWindowsPage = "window.xhtml";

  protected typeNamePlaceHolder = "Babu Manickam";
  protected appendTextLocator = "#j_idt88\\:j_idt91";
  protected isDisabledLocator = "#j_idt88\\:j_idt93";
  protected clearTextLocator = "#j_idt88\\:j_idt95";
  protected mailIDLocator = "Your email and tab";
  protected aboutYouLocator = "About yourself";
  protected errorMessageLocator = "#j_idt106\\:thisform\\:age";
  protected errorMessageTextLocator =
    "#j_idt106\\:thisform\\:j_idt110_error-detail";
  protected typeNameDrop = "#j_idt106\\:auto-complete";
  protected dropDownClickLocator = "#j_idt106\\:auto-complete_panel";
  protected dropDownDisplayValueLocator = ".ui-autocomplete-token-label";
  protected calendariconLocator =
    ".ui-button-icon-left.ui-icon.ui-icon-calendar";
  protected calendarPanelLocator = "#j_idt106\\:j_idt116_panel";
  protected currentYearLocator = ".ui-datepicker-year";
  protected calendarLeftArrow = ".ui-datepicker-prev.ui-corner-all";
  protected currentMonthLocator = ".ui-datepicker-month";
  protected calendarDates = "a.ui-state-default";
  protected openOneBrowserlocator = "#j_idt88\\:new";
  protected openThreeBrowsersCloseLocator = "#j_idt88\\:j_idt93";
  protected fullDateInput = "#j_idt106\\:j_idt116_input";
  protected sliderLocator = "#j_idt106\\:slider";
  protected sliderValue = "55";
  protected sliderRangeWidth = '[class*="ui-slider-range ui-corner-all"]';
  protected sliderStyle = "style";
  protected sliderLeft = '[class*="ui-slider-handle"]';
  protected sliderZeroPercentage = "0%";
  protected oskLocator = "#j_idt106\\:j_idt122";
  protected oskKeyPad = "[class*=keypad-key]";
  protected closeButton = "Close";
  protected oskKeypadClick = '[class*="keypad-special"]';
  protected oskInputValue = "#j_idt106\\:j_idt122";
  protected customToolBarEditor = ".ql-editor";
  protected paragraphLocator = "p";
  protected simpleAlertButton = "#j_idt88\\:j_idt91";
  protected simpleAlertResult = "#simple_result";

  protected simpleAlertConfirmButton = "#j_idt88\\:j_idt93";
  protected simpleAlertConfirmResult = "#result";

  protected sweetAlertSimpleButton = "#j_idt88\\:j_idt95";
  protected sweetAlertSimplePopup = "#j_idt88\\:j_idt96";
  protected sweetAlertSimplePopupTitle = "#j_idt88\\:j_idt96_title";
  protected sweetAlertSimplePopupBody = "#j_idt88\\:j_idt96_content p";

  protected accept: DialogAction = "accept";
  protected dismiss: DialogAction = "dismiss";
  protected dialogText = "Dialog";
  protected button: RoleActions = "button";
  protected option: RoleActions = "option";

  protected sweetModalButton = "#j_idt88\\:j_idt100";
  protected sweetModalButtonPopup = "#j_idt88\\:j_idt101";
  protected sweetModalTitle = "#j_idt88\\:j_idt101_title";

  protected sweetModalBody = "#j_idt88\\:j_idt101_content p";

  protected alertPromptDialogButton = "#j_idt88\\:j_idt104";
  protected alertPromptDialogConfirmButton = "#confirm_result";

  protected delete = "Delete";
  protected sweetAlertButton = "#j_idt88\\:j_idt107";
  protected sweetAlertTitle = "#j_idt88\\:j_idt107_title";
  protected confirmationButton = "Confirmation";
  protected sweetAlertMessage = ".ui-confirm-dialog-message";

  protected noText = "No";
  protected yesText = "Yes";

  protected selectToolLocator = "select.ui-selectonemenu";

  protected courseDropdownPanel = "#j_idt87\\:auto-complete_panel";

  protected countryLocator = "#j_idt87\\:country_label";

  protected cityLocator = "#j_idt87\\:city_label";

  protected showOptions = "Show Options";
  protected languageLocator = "#j_idt87\\:lang_label";

  protected languageValue = "#j_idt87\\:value_label";

  protected typeNumberToSpin = "55";
  protected upArrow = ".ui-icon.ui-c.ui-icon-triangle-1-n";
  protected typeNumberToSpinLocator = "#j_idt106\\:j_idt118_input";
  protected typedNumber = "aria-valuenow";

  protected textBoxJson = "../test-data/textBox.json";
  protected dropdownJson = "../test-data/dropdown.json";
  protected alertJson = "../test-data/alert.json";
}
