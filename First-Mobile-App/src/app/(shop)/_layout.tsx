import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native";

const TabsLayout = () => {
  return (
    <SafeAreaView>
      <Tabs>
        <Tabs.Screen name="index" options={{ headerShown: false }} />
        <Tabs.Screen name="orders" options={{}} />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;

/*Tabs typically exist at the top or bottom of the screen and 
provide navigation between different screens 
within the same context or section of the app.*/

/*SafeAreaView is a component provided by React Native that helps ensure your 
app's content is rendered within the safe boundaries of a device's screen */
