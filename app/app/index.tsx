import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Title */}
        <Text style={styles.title}>Parallax</Text>
        <Text style={styles.subtitle}>Multi-AI Research Platform</Text>

        {/* Test Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Foundation Ready</Text>
          <Text style={styles.cardText}>✓ Expo Router v4 configured</Text>
          <Text style={styles.cardText}>✓ NativeWind v4 ready to configure</Text>
          <Text style={styles.cardText}>✓ TanStack Query provider set up</Text>
          <Text style={styles.cardText}>✓ Dark mode as default</Text>
        </View>

        {/* Navigation Links */}
        <View style={styles.buttons}>
          <Link href="/about" asChild>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.buttonText}>About</Text>
            </Pressable>
          </Link>

          <Link href="/history" asChild>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.buttonText}>History</Text>
            </Pressable>
          </Link>
        </View>

        <Text style={styles.footer}>Ready for v0 components</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  content: {
    maxWidth: 600,
    width: "100%",
  },
  title: {
    color: "#ffffff",
    fontSize: 60,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 18,
    marginBottom: 48,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#18181b",
    borderRadius: 16,
    padding: 32,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#27272a",
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
  cardText: {
    color: "#d1d5db",
    marginBottom: 16,
    fontSize: 16,
  },
  buttons: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    padding: 16,
  },
  secondaryButton: {
    backgroundColor: "#27272a",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#3f3f46",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
  footer: {
    color: "#6b7280",
    fontSize: 14,
    textAlign: "center",
    marginTop: 32,
  },
});
