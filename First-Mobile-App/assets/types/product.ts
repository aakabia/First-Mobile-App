import { ImageSourcePropType } from 'react-native';
import { Category } from './category';

export type Product = {
  id: number;
  title: string;
  slug: string;
  imagesUrl: ImageSourcePropType[];
  price: number;
  heroImage: ImageSourcePropType;
  category: Omit<Category, 'products'>;
  maxQuantity: number;
};

// Above is defining a Product object using TS.
// ImageSourcePropType is a TypeScript type used in React Native to define the source of an image. It ensures that the provided image source is either a local image or a remote URL.
// category: Omit<Category, 'products'>;, means that the category is of our custom typw category but omit the Products.