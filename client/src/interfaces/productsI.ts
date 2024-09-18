export interface ProductI {
  _id: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
  specifications: Array<{ name: string; desc: string }>;
  createdAt: string;
  updatedAt: string;
}

export interface ResponseProductsI {
  products: ProductI[];
  total: number;
  count: number;
  page: number;
  minValue: number;
  maxValue: number;
}

export interface ResponseProductsSWRI {
  status: number;
  data: ResponseProductsI;
}

export interface ResponseProductsArrayI {
  status: number;
  data: ProductI[];
}

export interface ResponseProductI {
  status: number;
  data: ProductI;
}
