import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PRODUCTS } from "../../../assets/products";
import { useToast } from "react-native-toast-notifications";
import { useCartStore } from "../../store/cart-store";
import { useState } from "react";

const ProductDetails = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const toast = useToast();
  // create instance of toast

  const product = PRODUCTS.find((product) => product.slug === slug);
  // dynamically search PRODUCTS for the return slug route matching product

  if (!product) return <Redirect href={"/404"} />;
  // conditional check if any product with the returned slug is not found.

  const { items, addItem, incrementItem, decrementItem } = useCartStore();
  // import our cart store that manages the state of the items in the cart

  const cartItem = items.find((item) => item.id === product.id);
  // find the item in the cart that matches our product id 

  const initialQantity = cartItem ? cartItem.quantity : 1;
  // get our intial quantity from cartItem.quantity if item exists in store or 1 

  const [quantity, setQuantity] = useState(initialQantity);

  // useState to manage thse state of quantity for the frontend and set our initial quantity

  const increaseQuantity = () => {
    if(quantity < product.maxQuantity){
      setQuantity(prev => prev + 1) // quantity for store
      incrementItem(product.id)
    }else{
      toast.show(`Cannot add more than maximum qunatity of ${product.maxQuantity}`, {
        type: "warning",
        placement: "top",
        duration: 1500,

      });
    };
  };

  // increaseQuantity checks if quantity is less than maxQuantity
  // if condition is true we call setQuantity (frontend) and  incrementItem (backend / our cart)
  // else we render a toast notification 

  const decreaseQuantity = () => {
    if(quantity > 1){
      setQuantity(prev => prev -1);
      decrementItem(product.id)
    }
  };

   // decreaseQuantity checks if quantity is greater than 1
  // if condition is true we call setQuantity (frontend) and  decrementItem (backend / our cart)
  

  const addToCart = () => {
    addItem({
      id:product.id,
      title: product.title,
      image: product.heroImage,
      price:product.price,
      quantity:quantity
    })

    toast.show("Added to cart", {
      type: "success",
      placement: "top",
      duration: 1500,
    });
  };

  // addToCart adds a item to our cart with addItem and then displays a toast message
  

  const totalPrice = (product.price * quantity).toFixed(2);
  // get total price of all the of for item going in your cart. 

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.title }} />
      {/* Above changes the title of our page */}
      <Image source={product.heroImage} style={styles.heroImage} />
      
      <View style={{ padding: 16, flex: 1 }}>
        <Text style={styles.title}>Title: {product.title}</Text>

        <Text style={styles.slug}>Slug: {product.slug}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            Unit Price: ${product.price.toFixed(2)}
          </Text>
          <Text style={styles.price}>Total Price: ${totalPrice}</Text>
        </View>
        {/* Above is a view component containing our product price.*/}

        <FlatList
          data={product.imagesUrl}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={styles.image} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imagesContainer}
        ></FlatList>

        {/* Above flat list containing other pictures of the product.*/}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={increaseQuantity}
            disabled={quantity >= product.maxQuantity}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[styles.addToCartButton, {opacity: quantity === 0 ? 0.5 : 1  }]}
            onPress={addToCart}
            disabled={quantity === 0 }
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>

        </View>
         {/* Above is a view component containing all our buttons.*/}
      </View>
    </View>
  );
};

export default ProductDetails;


// Above is our dynamic ProductDetails page that renders a different prouduct based on the returned [slug] from the route.
// Also, we dynamically update our useCartStore with this page and render the values where needed


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heroImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  slug: {
    fontSize: 18,
    color: "#555",
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  price: {
    fontWeight: "bold",
    color: "#000",
  },

  imagesContainer: {
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  addToCartButton: {
    backgroundColor:"#28a745",
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessage: {
    fontSize: 18,
    color: "#f00",
    textAlign: "center",
    marginTop: 20,
  },
});
