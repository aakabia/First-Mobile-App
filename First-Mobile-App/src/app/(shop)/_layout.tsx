import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const TabsLayout = () => {
  function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome6>["name"];
    // Above is extracting props from frontAwesome to make sure our input matches that of FontAwesome
    color?: string;
    focused: boolean;
  }) {
    return (
      <FontAwesome6
        size={24}
        {...props}
        style={{ color: props.focused ? "#2196F3" : "gray" }}
      ></FontAwesome6>
    );
  }

  /* TabBarIcon is a function that takes a object with the props name and color and 
  returns a FontAwesome icon with the props spread into it and a default color.*/

  // The default color in style helps override the prop color.

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2196F3",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: { fontSize: 16 },
          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
          },
          headerShown: false,
        }}
      >
        {/*Above is styling the tabs */}
        {/* 
            SafeAreaView ensures content is displayed within the device's safe area, 
            preventing overlap with notches or screen edges. 
            adding a flex one to its styles covers the parent container
        */}
        <Tabs.Screen
          name="index"
          options={{
            title: "shop",
            tabBarIcon(props) {
              return <TabBarIcon {...props} name="shop" />;
            },
          }}
          // Above options can take a fucntion that returns a nav component to use as our icon for the tab.
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: "orders",
            tabBarIcon(props) {
              return <TabBarIcon {...props} name="list" />;
            },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

// Tabs allow us to implement navigation for different sections within a single layout, providing a user-friendly way to switch between various views or functionalities without losing the context of the current screen.