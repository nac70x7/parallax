import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Animated,
} from 'react-native';

interface Citation {
  title: string;
  url: string;
  domain: string;
}

interface Position {
  engine: string;
  position: string;
  citation: Citation;
}

interface ConflictCardProps {
  topic: string;
  positions: Position[];
  resolutionHint?: string;
}

export function ConflictCard({
  topic,
  positions,
  resolutionHint,
}: ConflictCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulsing border animation
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const borderColor = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: isDark
      ? ['#737373', '#A3A3A3'] // neutral-500 to neutral-400
      : ['#D4D4D4', '#A3A3A3'], // neutral-300 to neutral-400
  });

  return (
    <Animated.View
      style={[
        styles.card,
        isDark ? styles.cardDark : styles.cardLight,
        { borderColor },
      ]}
    >
      {/* Conflict badge */}
      <View style={styles.header}>
        <View
          style={[
            styles.badge,
            isDark ? styles.badgeDark : styles.badgeLight,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              isDark ? styles.badgeTextDark : styles.badgeTextLight,
            ]}
          >
            ⚠️ CONFLICTING INFORMATION
          </Text>
        </View>
      </View>

      {/* Topic */}
      <Text
        style={[
          styles.topic,
          isDark ? styles.topicDark : styles.topicLight,
        ]}
      >
        {topic}
      </Text>

      {/* Positions */}
      <View style={styles.positions}>
        {positions.map((pos, index) => (
          <View key={`${pos.engine}-${index}`} style={styles.positionItem}>
            <View style={styles.positionHeader}>
              <View
                style={[
                  styles.engineDot,
                  isDark ? styles.engineDotDark : styles.engineDotLight,
                ]}
              />
              <Text
                style={[
                  styles.engineName,
                  isDark ? styles.engineNameDark : styles.engineNameLight,
                ]}
              >
                {pos.engine}
              </Text>
            </View>
            <Text
              style={[
                styles.position,
                isDark ? styles.positionDark : styles.positionLight,
              ]}
            >
              {pos.position}
            </Text>
            <Text
              style={[
                styles.citation,
                isDark ? styles.citationDark : styles.citationLight,
              ]}
            >
              Source: {pos.citation.domain}
            </Text>
          </View>
        ))}
      </View>

      {/* Resolution hint */}
      {resolutionHint && (
        <View
          style={[
            styles.resolutionHint,
            isDark ? styles.resolutionHintDark : styles.resolutionHintLight,
          ]}
        >
          <Text
            style={[
              styles.resolutionText,
              isDark ? styles.resolutionTextDark : styles.resolutionTextLight,
            ]}
          >
            💡 {resolutionHint}
          </Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
  cardLight: {
    backgroundColor: '#FFFFFF',
  },
  cardDark: {
    backgroundColor: 'rgba(23, 23, 23, 0.8)', // neutral-900/80
  },
  header: {
    marginBottom: 16,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeLight: {
    backgroundColor: '#FAFAFA', // neutral-50
    borderWidth: 1,
    borderColor: '#E5E5E5', // neutral-200
  },
  badgeDark: {
    backgroundColor: '#262626', // neutral-800
    borderWidth: 1,
    borderColor: '#404040', // neutral-700
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  badgeTextLight: {
    color: '#737373', // neutral-500
  },
  badgeTextDark: {
    color: '#A3A3A3', // neutral-400
  },
  topic: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    marginBottom: 20,
  },
  topicLight: {
    color: '#171717', // neutral-900
  },
  topicDark: {
    color: '#FFFFFF',
  },
  positions: {
    gap: 16,
  },
  positionItem: {
    gap: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(229, 229, 229, 0.5)', // neutral-200/50
  },
  positionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  engineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  engineDotLight: {
    backgroundColor: '#A3A3A3', // neutral-400
  },
  engineDotDark: {
    backgroundColor: '#737373', // neutral-500
  },
  engineName: {
    fontSize: 14,
    fontWeight: '600',
  },
  engineNameLight: {
    color: '#404040', // neutral-700
  },
  engineNameDark: {
    color: '#D4D4D4', // neutral-300
  },
  position: {
    fontSize: 15,
    lineHeight: 22,
  },
  positionLight: {
    color: '#525252', // neutral-600
  },
  positionDark: {
    color: '#E5E5E5', // neutral-200
  },
  citation: {
    fontSize: 12,
  },
  citationLight: {
    color: '#A3A3A3', // neutral-400
  },
  citationDark: {
    color: '#737373', // neutral-500
  },
  resolutionHint: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
  },
  resolutionHintLight: {
    backgroundColor: '#FAFAFA', // neutral-50
  },
  resolutionHintDark: {
    backgroundColor: '#262626', // neutral-800
  },
  resolutionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  resolutionTextLight: {
    color: '#525252', // neutral-600
  },
  resolutionTextDark: {
    color: '#D4D4D4', // neutral-300
  },
});
