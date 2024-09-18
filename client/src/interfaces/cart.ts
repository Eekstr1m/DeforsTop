export interface CartI {
  _id: string;
  userId: string;
  products: CartProductI[];
  totalPrice: number;
  totalQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartProductI {
  productId: string;
  title: string;
  photoPath: string;
  price: number;
  quantity: number;
  total: number;
}

export interface ResponseCartI {
  status: number;
  data: CartI;
}
