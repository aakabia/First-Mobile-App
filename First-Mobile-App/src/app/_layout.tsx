import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import AuthProvider from "../providers/auth-provider";

export default function RootLayout() {
  return (
    <ToastProvider>
      <AuthProvider>
      <Stack>
        <Stack.Screen
          name="(shop)"
          options={{ headerShown: false, title: "Shop" }}
        />
        <Stack.Screen
          name="categories"
          options={{ headerShown: false, title: "Categories" }}
        />
        <Stack.Screen
          name="products"
          options={{ headerShown: false, title: "Product" }}
        />
        <Stack.Screen
          name="cart"
          options={{ presentation: "modal", title: "Shopping Cart" }}
        />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
      </AuthProvider>


    </ToastProvider>
  );
}

// This RootLayout component defines the navigation structure for your app using Expo Router's Stack navigator.
