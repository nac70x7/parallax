import { View, Text, ScrollView, StyleSheet, useColorScheme } from "react-native";
import { Link } from "expo-router";

export default function HistoryPage() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ScrollView 
      style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
        <Text style={[styles.title, isDark ? styles.titleDark : styles.titleLight]}>
          Search History
        </Text>
        <View style={[styles.emptyState, isDark ? styles.emptyStateDark : styles.emptyStateLight]}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={[styles.emptyTitle, isDark ? styles.emptyTitleDark : styles.emptyTitleLight]}>
            No searches yet
          </Text>
          <Text style={[styles.emptyText, isDark ? styles.emptyTextDark : styles.emptyTextLight]}>
            Your research queries and results will appear here after you perform your first search.
          </Text>
        </View>
        <View style={styles.backLink}>
          <Link href="/">
            <Text style={[styles.backLinkText, isDark ? styles.backLinkTextDark : styles.backLinkTextLight]}>
              ← Start a new search
            </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLight: {
    backgroundColor: "#FAFAFA", // neutral-50
  },
  containerDark: {
    backgroundColor: "#171717", // neutral-900
  },
  contentContainer: {
    padding: 24,
  },
  card: {
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
  },
  cardLight: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E5E5", // neutral-200
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: "#262626", // neutral-800
    borderColor: "#404040", // neutral-700
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  titleLight: {
    color: "#171717", // neutral-900
  },
  titleDark: {
    color: "#FFFFFF",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  emptyStateLight: {
    borderColor: "#E5E5E5", // neutral-200
    backgroundColor: "#FAFAFA", // neutral-50
  },
  emptyStateDark: {
    borderColor: "#404040", // neutral-700
    backgroundColor: "#171717", // neutral-900
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyTitleLight: {
    color: "#171717", // neutral-900
  },
  emptyTitleDark: {
    color: "#FFFFFF",
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  emptyTextLight: {
    color: "#737373", // neutral-500
  },
  emptyTextDark: {
    color: "#A3A3A3", // neutral-400
  },
  backLink: {
    marginTop: 24,
    alignSelf: "center",
  },
  backLinkText: {
    fontSize: 16,
    fontWeight: "600",
  },
  backLinkTextLight: {
    color: "#171717", // neutral-900
  },
  backLinkTextDark: {
    color: "#FFFFFF",
  },
});
