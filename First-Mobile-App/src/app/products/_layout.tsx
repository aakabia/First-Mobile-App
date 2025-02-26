import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProductLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[slug]" // route will be /product/slug
        options={({navigation})=>({
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={"black"} />
              </TouchableOpacity>
            ),
          })}
      />
    </Stack>
  );
}

// [slug] allows for dynamic page rendering depending on the slug passed into the route ex. categories/[slug]