import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ResultsPage() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.padding}>
        <View style={styles.card}>
          <Text style={styles.title}>Research Results</Text>
          <Text style={styles.subtitle}>Research ID: {id}</Text>
          <Text style={styles.text}>
            This page will display multi-AI research results.
          </Text>
          <Text style={styles.footer}>
            Ready for implementation with TanStack Query hooks.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  padding: {
    padding: 24,
  },
  card: {
    backgroundColor: "#18181b",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#27272a",
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    color: "#9ca3af",
    marginBottom: 16,
    fontSize: 16,
  },
  text: {
    color: "#d1d5db",
    fontSize: 16,
  },
  footer: {
    color: "#6b7280",
    fontSize: 14,
    marginTop: 16,
  },
});
