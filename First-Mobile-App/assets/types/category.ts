import { Product } from './product';

export type Category = {
  name: string;
  imageUrl: string;
  slug: string;
  products: Product[];
};

// Above is defining a Category object using TS.
// Each property is given a data type 
// Product[] means that the products in category is an array with every entry being our custom Product type.