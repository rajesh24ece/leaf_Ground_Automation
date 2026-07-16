export interface CreateProductRequest {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface DOBData {
  value: Date;
  date: string;
  month: string;
  year: string;
  fullDate: string;
}

export interface AlertTestData {
  simpleAlertResultText: string;
  simpleAlertConfirmTextOk: string;
  simpleAlertConfirmTextCancel: string;
  sweetAlertSimplePopupBodyText: string;
  sweetModalPopUpText: string;
  sweetModalBodyText: string;
  alertPromptDialogEmptyText: string;
  alertPromptDialogGivenText: string;
  alertPromptDialogNullText: string;
  sweetAlertBody: string;
  typeNameDropValue: string;
  dialogText: string;
}

export interface WebTableTestData {
  ProductName: string;
  Description: string;
  Category: string;
  Price: number;
  Quantity: number;
  SearchProduct: string;
}

export interface UploadTestData {
  fileName: string;
}

export interface DropdownTestData {
  tool: string[];
  country: string[];
  city: Record<string, string[]>;
  langauge: string[];
  twos: Record<string, string[]>;
  courses: string[];
}

export interface OperationResult {
  success: boolean;
  message: string;
}
