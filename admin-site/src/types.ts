export interface AddnewProduct {
  id: string;
  productName: string;
  imgUrl: string;
  category: any;
  subcategory: string;
  price: number;
  shortDesc: string;
  description: string;
  quantity: number;
  status: string;
}
export interface Allproducts {
  id: string;
  _id: string;
  productName: string;
  imgUrl: string;
  category: any;
  subcategory: string;
  price: number;
  shortDesc: string;
  description: string;
  quantity: number;
  status: string;
}
export interface OrderedProduct {
  id: string;
  _id: string;
  productName: string;
  imgUrl: string;
  image: string;
  category: any;
  subcategory: string;
  price: number;
  shortDesc: string;
  description: string;
  quantity: number;
  status: string;
}
export interface AllOrders {
  totalQuantity: number;
  product: any;
  address1: String;
  address2: string;
  city: String;
  pincode: string;
  state: number;
  email: string;
  firstName: string;
  lastName: number;
  dateOrdered: Date;
}
