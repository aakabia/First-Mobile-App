import { FlatList, StyleSheet, View } from "react-native";
import { PRODUCTS } from "../../../assets/products";
import { ProductListItem } from "../../components/Product-list-item";
import { ListHeader } from "../../components/List-header";
import Auth from "../auth";

const Home = () => {
  return (
    <View>
      <FlatList
        data={PRODUCTS}
        renderItem={({ item }) => <ProductListItem product={item} />} // each individual item
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.flatListColumn}
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
      />
    </View>
  );
};

export default Home;

// Above we use a FlatList to render our PRODUCTS from product.tsx to the page.
// To render each item in PRODUCTS we use the renderItem prop and pass a function that returns our custom component ProductListItem.
// In this Flatlist we pass in a custom Id with keyExtractor but by defualt it refers to the index in the data array.
// As the ListHeaderComponent prop we add our custom component ListHeader

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: 20,
  },
  flatListColumn: {
    justifyContent: "space-between",
  },
});
