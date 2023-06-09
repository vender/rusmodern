export type CartItem = {
  id: string;
  quantity: number;
  cart_id : number;
  cost: {
    totalAmount: Money;
  };
};

export type Product = {
  product_id: number;
  name: string;
  image: string;
  description: string;
  discount: string;
  formatted_price: string;
  formatted_special: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  information_id: number;
  bottom: number;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type SEO = {
  title: string;
  description: string;
};
