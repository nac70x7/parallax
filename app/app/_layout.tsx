import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: {
            backgroundColor: "#000000",
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
