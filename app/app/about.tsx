import { View, Text, ScrollView, StyleSheet, useColorScheme } from "react-native";
import { Link } from "expo-router";

export default function AboutPage() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ScrollView 
      style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={[styles.logo, isDark ? styles.logoDark : styles.logoLight]}>
          Parallax
        </Text>
        <Text style={[styles.tagline, isDark ? styles.taglineDark : styles.taglineLight]}>
          Multi-AI Research Platform
        </Text>
      </View>

      {/* Mission Card */}
      <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
        <Text style={[styles.cardTitle, isDark ? styles.cardTitleDark : styles.cardTitleLight]}>
          Our Mission
        </Text>
        <Text style={[styles.cardText, isDark ? styles.cardTextDark : styles.cardTextLight]}>
          Parallax leverages multiple AI engines simultaneously to provide comprehensive, 
          fact-checked research results. By synthesizing perspectives from different models, 
          we detect conflicts, verify sources, and deliver insights you can trust.
        </Text>
      </View>

      {/* How It Works Card */}
      <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
        <Text style={[styles.cardTitle, isDark ? styles.cardTitleDark : styles.cardTitleLight]}>
          How It Works
        </Text>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <View style={[styles.iconCircle, isDark ? styles.iconCircleDark : styles.iconCircleLight]}>
              <Text style={styles.featureIcon}>⚡</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, isDark ? styles.featureTitleDark : styles.featureTitleLight]}>
                Parallel Queries
              </Text>
              <Text style={[styles.featureText, isDark ? styles.featureTextDark : styles.featureTextLight]}>
                Query multiple AI engines simultaneously for faster, more comprehensive results
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.iconCircle, isDark ? styles.iconCircleDark : styles.iconCircleLight]}>
              <Text style={styles.featureIcon}>🎯</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, isDark ? styles.featureTitleDark : styles.featureTitleLight]}>
                Conflict Detection
              </Text>
              <Text style={[styles.featureText, isDark ? styles.featureTextDark : styles.featureTextLight]}>
                Automatically identify disagreements between sources and AI models
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.iconCircle, isDark ? styles.iconCircleDark : styles.iconCircleLight]}>
              <Text style={styles.featureIcon}>🔗</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, isDark ? styles.featureTitleDark : styles.featureTitleLight]}>
                Source Verification
              </Text>
              <Text style={[styles.featureText, isDark ? styles.featureTextDark : styles.featureTextLight]}>
                Track citations and verify claims across multiple authoritative sources
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.iconCircle, isDark ? styles.iconCircleDark : styles.iconCircleLight]}>
              <Text style={styles.featureIcon}>✨</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, isDark ? styles.featureTitleDark : styles.featureTitleLight]}>
                Smart Synthesis
              </Text>
              <Text style={[styles.featureText, isDark ? styles.featureTextDark : styles.featureTextLight]}>
                Combine insights from multiple perspectives into coherent, actionable findings
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tech Stack Card */}
      <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
        <Text style={[styles.cardTitle, isDark ? styles.cardTitleDark : styles.cardTitleLight]}>
          Tech Stack
        </Text>
        <View style={styles.techStack}>
          <View style={styles.techSection}>
            <Text style={[styles.techSectionTitle, isDark ? styles.techSectionTitleDark : styles.techSectionTitleLight]}>
              Frontend
            </Text>
            <Text style={[styles.techItem, isDark ? styles.techItemDark : styles.techItemLight]}>
              • React Native (Expo SDK 52+)
            </Text>
            <Text style={[styles.techItem, isDark ? styles.techItemDark : styles.techItemLight]}>
              • Expo Router v4
            </Text>
            <Text style={[styles.techItem, isDark ? styles.techItemDark : styles.techItemLight]}>
              • NativeWind v4
            </Text>
            <Text style={[styles.techItem, isDark ? styles.techItemDark : styles.techItemLight]}>
              • TypeScript
            </Text>
          </View>

          <View style={styles.techSection}>
            <Text style={[styles.techSectionTitle, isDark ? styles.techSectionTitleDark : styles.techSectionTitleLight]}>
              State & Data
            </Text>
            <Text style={[styles.techItem, isDark ? styles.techItemDark : styles.techItemLight]}>
              • Zustand (State Management)
            </Text>
            <Text style={[styles.techItem, isDark ? styles.techItemDark : styles.techItemLight]}>
              • TanStack Query (Data Fetching)
            </Text>
          </View>

          <View style={styles.techSection}>
            <Text style={[styles.techSectionTitle, isDark ? styles.techSectionTitleDark : styles.techSectionTitleLight]}>
              Backend
            </Text>
            <Text style={[styles.techItem, isDark ? styles.techItemDark : styles.techItemLight]}>
              • FastAPI (Python)
            </Text>
            <Text style={[styles.techItem, isDark ? styles.techItemDark : styles.techItemLight]}>
              • Multi-Engine AI Integration
            </Text>
          </View>
        </View>
      </View>

      {/* Back Link */}
      <View style={styles.backLink}>
        <Link href="/">
          <Text style={[styles.backLinkText, isDark ? styles.backLinkTextDark : styles.backLinkTextLight]}>
            ← Back to Home
          </Text>
        </Link>
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
    paddingBottom: 48,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 24,
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: -1,
  },
  logoLight: {
    color: "#171717", // neutral-900
  },
  logoDark: {
    color: "#FFFFFF",
  },
  tagline: {
    fontSize: 16,
    fontWeight: "600",
  },
  taglineLight: {
    color: "#525252", // neutral-600
  },
  taglineDark: {
    color: "#D4D4D4", // neutral-300
  },
  card: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
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
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cardTitleLight: {
    color: "#171717", // neutral-900
  },
  cardTitleDark: {
    color: "#FFFFFF",
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
  },
  cardTextLight: {
    color: "#525252", // neutral-600
  },
  cardTextDark: {
    color: "#D4D4D4", // neutral-300
  },
  featureList: {
    gap: 20,
  },
  featureItem: {
    flexDirection: "row",
    gap: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  iconCircleLight: {
    backgroundColor: "#F5F5F5", // neutral-100
    borderColor: "#E5E5E5", // neutral-200
  },
  iconCircleDark: {
    backgroundColor: "#171717", // neutral-900
    borderColor: "#404040", // neutral-700
  },
  featureIcon: {
    fontSize: 24,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  featureTitleLight: {
    color: "#171717", // neutral-900
  },
  featureTitleDark: {
    color: "#FFFFFF",
  },
  featureText: {
    fontSize: 14,
    lineHeight: 20,
  },
  featureTextLight: {
    color: "#737373", // neutral-500
  },
  featureTextDark: {
    color: "#A3A3A3", // neutral-400
  },
  techStack: {
    gap: 20,
  },
  techSection: {
    gap: 8,
  },
  techSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  techSectionTitleLight: {
    color: "#404040", // neutral-700
  },
  techSectionTitleDark: {
    color: "#E5E5E5", // neutral-200
  },
  techItem: {
    fontSize: 14,
    lineHeight: 20,
  },
  techItemLight: {
    color: "#525252", // neutral-600
  },
  techItemDark: {
    color: "#D4D4D4", // neutral-300
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
