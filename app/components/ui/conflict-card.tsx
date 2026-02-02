import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Animated,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ConfidenceBadge } from './confidence-badge';

interface EnginePosition {
  engine: string;
  position: string;
  citation?: {
    title: string;
    url: string;
  };
}

interface ConflictCardProps {
  topic: string;
  positions: EnginePosition[];
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
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

  const borderColor = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: isDark ? ['#404040', '#737373'] : ['#D4D4D4', '#A3A3A3'],
  });

  return (
    <Animated.View
      style={[
        styles.card,
        isDark ? styles.cardDark : styles.cardLight,
        { borderColor },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons
            name="alert-circle-outline"
            size={20}
            color={isDark ? '#A3A3A3' : '#737373'}
          />
          <Text
            style={[
              styles.topic,
              isDark ? styles.topicDark : styles.topicLight,
            ]}
          >
            {topic}
          </Text>
        </View>
        <ConfidenceBadge level="CONFLICTED" style={styles.badge} />
      </View>

      {/* Positions grid */}
      <View style={styles.positionsContainer}>
        {positions.map((pos, index) => (
          <PositionItem key={index} position={pos} isDark={isDark} />
        ))}
      </View>

      {/* Resolution hint */}
      {resolutionHint && (
        <View
          style={[
            styles.hintContainer,
            isDark && styles.hintContainerDark,
          ]}
        >
          <Text
            style={[
              styles.hint,
              isDark ? styles.hintDark : styles.hintLight,
            ]}
          >
            {resolutionHint}
          </Text>
        </View>
      )}
    </Animated.View>
  );
}

interface PositionItemProps {
  position: EnginePosition;
  isDark: boolean;
}

function PositionItem({ position, isDark }: PositionItemProps) {
  const handlePress = () => {
    if (position.citation?.url) {
      Linking.openURL(position.citation.url);
    }
  };

  return (
    <View
      style={[
        styles.position,
        isDark ? styles.positionDark : styles.positionLight,
      ]}
    >
      <Text
        style={[
          styles.engineLabel,
          isDark ? styles.engineLabelDark : styles.engineLabelLight,
        ]}
      >
        {position.engine}
      </Text>
      <Text
        style={[
          styles.positionText,
          isDark ? styles.positionTextDark : styles.positionTextLight,
        ]}
      >
        {position.position}
      </Text>
      {position.citation && (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
          <Text
            style={[
              styles.citation,
              isDark ? styles.citationDark : styles.citationLight,
            ]}
          >
            {position.citation.title}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  cardLight: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  cardDark: {
    backgroundColor: 'rgba(23, 23, 23, 0.8)', // neutral-900/80
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  topic: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
  },
  topicLight: {
    color: '#171717', // neutral-900
  },
  topicDark: {
    color: '#FFFFFF',
  },
  badge: {
    flexShrink: 0,
  },
  positionsContainer: {
    gap: 16,
  },
  position: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  positionLight: {
    backgroundColor: '#FAFAFA', // neutral-50
    borderColor: '#F5F5F5', // neutral-100
  },
  positionDark: {
    backgroundColor: 'rgba(38, 38, 38, 0.5)', // neutral-800/50
    borderColor: '#262626', // neutral-800
  },
  engineLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  engineLabelLight: {
    color: '#737373', // neutral-500
  },
  engineLabelDark: {
    color: '#A3A3A3', // neutral-400
  },
  positionText: {
    fontSize: 14,
    lineHeight: 21,
  },
  positionTextLight: {
    color: '#404040', // neutral-700
  },
  positionTextDark: {
    color: '#D4D4D4', // neutral-300
  },
  citation: {
    fontSize: 12,
    marginTop: 8,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  citationLight: {
    color: '#A3A3A3', // neutral-400
  },
  citationDark: {
    color: '#D4D4D4', // neutral-300
  },
  hintContainer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5', // neutral-100
  },
  hintContainerDark: {
    borderTopColor: '#262626', // neutral-800
  },
  hint: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  hintLight: {
    color: '#737373', // neutral-500
  },
  hintDark: {
    color: '#A3A3A3', // neutral-400
  },
});
