import "../global.css";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? "#171717" : "#FFFFFF",
          },
          headerTintColor: isDark ? "#FFFFFF" : "#171717",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: {
            backgroundColor: isDark ? "#171717" : "#FAFAFA",
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: "Parallax",
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="results/[id]" 
          options={{ 
            title: "Research Results",
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="about" 
          options={{ 
            title: "About",
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="history" 
          options={{ 
            title: "History",
            headerShown: true 
          }} 
        />
      </Stack>
    </QueryClientProvider>
  );
}
