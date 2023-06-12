export interface Product {
  id: string;
  _id: string;
  productName: string;
  imgUrl: string;
  category: string;
  status: string;
  subcategory: string;
  price: number;
  quantity: number;
  shortDesc: string;
  description: string;
  reviews: {
    rating: number;
    text: string;
  }[];
  avgRating: number;
}
export interface AddnewProduct {
  id: string;
  productName: string;
  imgUrl: string;
  category: string;
  subcategory: string;
  price: number;
  shortDesc: string;
  description: string;
  quantity: number;
}
export interface section {
  title: string;
}
export interface BillingDetail {
  id: any;
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
}
export interface CheckOutData {
  id: any;
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
  paymentMethod: string;
}
export enum PageEnum {
  list,
  add,
  edit,
}

export interface Color {
  light: String;
  main: string;
}
export interface UserData {
  id: string;
  fullname: string;
  email: string;
  image: string;
  // address:string;
  // salary:string;
}
export interface LoginFormState {
  email: string;
  password: string;
}
export interface SignupFormState {
  username: string;
  email: string;
  password: string;
}
