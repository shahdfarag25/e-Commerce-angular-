import { Product } from '../interfaces/product';
import { User } from '../interfaces/user';
export interface Order {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}
