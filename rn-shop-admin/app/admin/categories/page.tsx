import { getCategoriesWithProduct } from "@/actions/categories";

export default async function Categories() {
     const categories = await getCategoriesWithProduct();

     console.log(categories);
  return <>Categories</>;
}
