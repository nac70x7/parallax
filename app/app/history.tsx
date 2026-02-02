import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function HistoryPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.padding}>
        <View style={styles.card}>
          <Text style={styles.title}>Search History</Text>
          <Text style={styles.empty}>No past searches yet.</Text>
          <Text style={styles.footer}>
            This page will show your previous research queries and results.
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
  empty: {
    color: "#9ca3af",
    textAlign: "center",
    paddingVertical: 48,
    fontSize: 16,
  },
  footer: {
    color: "#6b7280",
    fontSize: 14,
  },
});
