import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { CATEGORIES } from "../../../assets/categories";
import { PRODUCTS } from "../../../assets/products";
import { ProductListItem } from "../../components/Product-list-item";

const Category = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  
  // Above sets a expected type for our route parameter.

  const category = CATEGORIES.find((category) => category.slug === slug);
  // dynamically search CATEGORIEs for the return slug route 

  if (!category) return <Redirect href={"/404"} />;
  // conditional check if any category with the returned slug is not found.

  const products = PRODUCTS.filter((product) => product.category.slug === slug);
  // filter products with ay products who category slug matches the page returned slug 

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: category.name }} />
      <Image source={{ uri: category.imageUrl }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{category.name}</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />} // each individual item
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.productRow}
      />
    </View>
  );
};

export default Category;

// Above is our dynamic categories page that renders a different category based on the returned [slug] from the route.
// We use Stack.Screen to edit the title of the route.
// Also, we use another FlatList to render the products of that category.
// [slug] allows for dynamic page rendering depending on the slug passed into the route ex. categories/[slug].

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  categoryImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productList: {
    flexGrow: 1,
  },
  productRow: {
    justifyContent: "space-between",
  },
  prductContainer: {
    flex: 1,
    margin: 8,
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productTitile: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
});
