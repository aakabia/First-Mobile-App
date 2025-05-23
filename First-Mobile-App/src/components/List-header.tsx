import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CATEGORIES } from "../../assets/categories";
import { useCartStore } from "../store/cart-store";
import { supabase } from "../lib/supabase";

export const ListHeader = () => {

  const {getItemCount} = useCartStore()


  const handleSignOut = async () =>{

    await supabase.auth.signOut();

  }

  // handleSignOut currently logs out of our current supabase session 

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/images/userIcon.png")}
              style={styles.avatarImage}
            />
            <Text style={styles.avatarText}> Hello userName</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <Link style={styles.cartContainer} href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <View>
                  <FontAwesome6
                    name="cart-shopping"
                    size={25}
                    color="gray"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{getItemCount()}</Text>
                  </View>
                </View>
              )}
            </Pressable>
          </Link>
          <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
            <FontAwesome name="sign-out" size={25} color="red"></FontAwesome>
          </TouchableOpacity>
        </View>
      </View>
      {/* Above is avatar, userName and shop view of the hompage */}
      {/* We use require to retrieve local images and fontAwesome for icons.*/}
      {/* handleSignOut to log out of our session from supabase.*/}

      <View style={styles.heroContainer}>
        <Image
          source={require("../../assets/images/hero.png")}
          style={styles.heroImage}
        />
      </View>
      {/* Above is the hero section or discount banner on the homepage */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          horizontal
          data={CATEGORIES}
          renderItem={({ item }) => (
            <Link asChild href={`/categories/${item.slug}`}>
              {/* used slug above to dynamically render different category routes for one page */}
              <Pressable style={styles.category}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{item.name}</Text>
              </Pressable>
            </Link>
          )}
        />
      </View>
      {/* Above is the coatgories section of the homepage */}
      {/* We use a flatlist to render a link for each of our CATEGORIES from categories.tsx */}
    </View>
  );
};

// Above, the ListHeader component is the header of our flat list on the home page.
 

const styles = StyleSheet.create({
  headerContainer: {
    gap: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
  },
  cartContainer: {
    padding: 10,
  },
  signOutButton: {
    padding: 10,
  },
  heroContainer: {
    width: "100%",
    height: 200,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  categoriesContainer: {},
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    width: 100,
    alignItems: "center",
    marginBottom: 16,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryText: {},
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: 10,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
