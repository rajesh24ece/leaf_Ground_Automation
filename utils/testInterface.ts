export interface TextBoxTestData {
  typeName: string;
  typeNewName: string;
  mailID: string;
  appendCountry: string;
  aboutYourselfText: string;
  errorMessageText: string;
  dobYear: string;
  dobDate: string;
  monthInText: string;
  fullDate: string;
  typeNameDropValue: string;
  typeNameDropValueDisplay: string;
  courses: string[];
  india: string;
  chennai: string;
  tamil: string;
  customToolBarValue: string;
}

export interface DropdownTestData {
  playwrightText: string;
  india: string;
  chennai: string;
  tamil: string;
  rendu: string;
  courses: string[];
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

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
}

export interface CreateProductRequest {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
