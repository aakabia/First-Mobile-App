import { Product } from './product';

export type OrderStatus = 'Pending' | 'Completed' | 'Shipped' | 'InTransit';

export type Order = {
  id: string;
  slug: string;
  item: string;
  details: string;
  status: OrderStatus;
  date: string;
  items: Product[];
};

// Above is defining a Order object using TS.
// OrderStatus is given four custom choices
// Product[] means that the products in category is an array with every entry being our custom Product type.
