import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CategoryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[slug]"
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

// [slug].tsx Serves as a dynamic route, allowing for varying content based on the slug parameter.
// options, prop for a Stack.Screen,  can take a function and destructure the navigation for backward navigation 
// Header left allows us to return a component on the left side of the header by returning a function 
// TouchableOpacity is a component in React Native that allows you to create a button-like element that responds to touch interactions
// Ionicons is a popular open-source icon set that provides a wide range of icons for use in mobile and web applications