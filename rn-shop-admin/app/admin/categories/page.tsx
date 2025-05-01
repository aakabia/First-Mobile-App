import { getCategoriesWithProduct } from "@/actions/categories";
import CategoryPageComponent from "@/app/admin/categories/page-component";

export default async function Categories() {
   // fetch our data from the server 
  const categories = await getCategoriesWithProduct();
 

  //then render our page on the client 
  return <CategoryPageComponent categories={categories}/>

}
