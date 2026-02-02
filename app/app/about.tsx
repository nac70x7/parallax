import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function AboutPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.padding}>
        <View style={styles.card}>
          <Text style={styles.title}>About Parallax</Text>
          <Text style={styles.description}>
            A multi-AI research platform that leverages multiple AI models to provide comprehensive, 
            fact-checked research results.
          </Text>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tech Stack</Text>
            <Text style={styles.text}>• Expo SDK 52+</Text>
            <Text style={styles.text}>• Expo Router v4</Text>
            <Text style={styles.text}>• NativeWind v4</Text>
            <Text style={styles.text}>• TypeScript</Text>
            <Text style={styles.text}>• Zustand</Text>
            <Text style={styles.text}>• TanStack Query</Text>
            <Text style={styles.text}>• FastAPI Backend</Text>
          </View>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    color: "#d1d5db",
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  text: {
    color: "#d1d5db",
    marginBottom: 8,
    fontSize: 16,
  },
});
