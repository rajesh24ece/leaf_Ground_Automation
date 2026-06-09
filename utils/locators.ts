export type DialogAction = "accept" | "dismiss";

export type RoleActions = "button" | "option";

export class Locators {
  protected textPage = "input.xhtml";
  protected dropdownPage = "select.xhtml";
  protected alertPage = "alert.xhtml";
  protected typeName = "Babu Manickam";
  protected typeNewName = "Rajesh Kumar Pandian";
  protected appendTextLocator = "#j_idt88\\:j_idt91";
  protected appendCountry = "India";
  protected isDisabledLocator = "#j_idt88\\:j_idt93";
  protected clearTextLocator = "#j_idt88\\:j_idt95";
  protected mailIDLocator = "Your email and tab";
  protected mailID = "example@example.com";
  protected aboutYouLocator = "About yourself";
  protected aboutYourselfText =
    "I am a software tester with experience in automation testing using Playwright. I enjoy learning new technologies and improving my skills in test automation.";
  protected errorMessageLocator = "#j_idt106\\:thisform\\:age";
  protected errorMessageText = "Age is mandatory";
  protected typeNameDrop = "#j_idt106\\:auto-complete";
  protected typeNameDropValue = "Rajesh";
  protected typeNameDropValueDisplay = "Rajesh2";
  protected dropDownClickLocator = "#j_idt106\\:auto-complete_panel";
  protected dropDownDisplayValueLocator = ".ui-autocomplete-token-label";
  protected calendariconLocator =
    ".ui-button-icon-left.ui-icon.ui-icon-calendar";
  protected calendarPanelLocator = "#j_idt106\\:j_idt116_panel";
  protected dobYear = "2019";
  protected currentYearLocator = ".ui-datepicker-year";
  protected calendarLeftArrow = ".ui-datepicker-prev.ui-corner-all";
  protected currentMonthLocator = ".ui-datepicker-month";
  protected calendarDates = "a.ui-state-default";
  protected dobDate = "3";
  protected openOneBrowserlocator = "#j_idt88\\:new";
  protected openThreeBrowsersCloseLocator = "#j_idt88\\:j_idt93";
  protected fullDate = "9/3/2019";
  protected fullDateInput = "#j_idt106\\:j_idt116_input";
  protected monthInText = "September";
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
  protected customToolBarValue = "Hello World";
  protected paragraphLocator = "p";
  protected simpleAlertButton = "#j_idt88\\:j_idt91";
  protected simpleAlertResult = "#simple_result";
  protected simpleAlertResultText = "You have successfully clicked an alert";
  protected simpleAlertConfirmButton = "#j_idt88\\:j_idt93";
  protected simpleAlertConfirmResult = "#result";
  protected simpleAlertConfirmTextOk = "User Clicked : OK";
  protected simpleAlertConfirmTextCancel = "User Clicked : Cancel";

  protected sweetAlertSimpleButton = "#j_idt88\\:j_idt95";
  protected sweetAlertSimplePopup = "#j_idt88\\:j_idt96";
  protected sweetAlertSimplePopupTitle = "#j_idt88\\:j_idt96_title";
  protected sweetAlertSimplePopupBody = "#j_idt88\\:j_idt96_content p";
  protected sweetAlertSimplePopupBodyText =
    "You have clicked and open a dialog that can be inspectable.";

  protected accept: DialogAction = "accept";
  protected dismiss: DialogAction = "dismiss";
  protected dialogText = "Dialog";
  protected button: RoleActions = "button";
  protected option: RoleActions = "option";

  protected sweetModalButton = "#j_idt88\\:j_idt100";
  protected sweetModalButtonPopup = "#j_idt88\\:j_idt101";
  protected sweetModalTitle = "#j_idt88\\:j_idt101_title";
  protected sweetModalPopUpText = "Modal Dialog (Sweet Alert)";
  protected sweetModalBody = "#j_idt88\\:j_idt101_content p";
  protected sweetModalBodyText =
    "Unless you close this, you cannot interact with other element. But am inspectable !";
  protected alertPromptDialogButton = "#j_idt88\\:j_idt104";
  protected alertPromptDialogConfirmButton = "#confirm_result";
  protected alertPromptDialogEmptyText = "User cancelled the prompt.";
  protected alertPromptDialogGivenText = "User entered name as: Rajesh";
  protected alertPromptDialogNullText = "User entered name as: ";
  protected delete = "Delete";
  protected sweetAlertButton = "#j_idt88\\:j_idt107";
  protected sweetAlertTitle = "#j_idt88\\:j_idt107_title";
  protected confirmationButton = "Confirmation";
  protected sweetAlertMessage = ".ui-confirm-dialog-message";
  protected sweetAlertBody = "Are you sure you want to proceed?";
  protected noText = "No";
  protected yesText = "Yes";

  protected selectToolLocator = "select.ui-selectonemenu";
  protected playwrightText = "Playwright";
  protected countryLocator = "#j_idt87\\:country_label";
  protected india = "India";

  protected cityLocator = "#j_idt87\\:city_label";
  protected chennai = "Chennai";

  protected showOptions = "Show Options";
  protected aws = "AWS";
  protected languageLocator = "#j_idt87\\:lang_label";
  protected tamil = "Tamil";
  protected languageValue = "#j_idt87\\:value_label";
  protected rendu = "இரண்டு";
}
