import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, useColorScheme, Animated } from 'react-native';

interface LoadingStateProps {
  engines?: string[];
}

export function LoadingState({
  engines = ['Perplexity', 'Kimi', 'Gemini', 'OpenAI'],
}: LoadingStateProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [currentEngine, setCurrentEngine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEngine((prev) => (prev + 1) % engines.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [engines.length]);

  return (
    <View style={styles.container}>
      {/* Progress text */}
      <View style={styles.progressContainer}>
        <View style={styles.dotsContainer}>
          <AnimatedDot delay={0} isDark={isDark} />
          <AnimatedDot delay={100} isDark={isDark} />
          <AnimatedDot delay={200} isDark={isDark} />
        </View>
        <Text style={[styles.searchingText, isDark && styles.searchingTextDark]}>
          Searching{' '}
          <Text style={[styles.engineName, isDark && styles.engineNameDark]}>
            {engines[currentEngine]}
          </Text>
          ...
        </Text>
      </View>

      {/* Skeleton cards */}
      <View style={styles.cardsContainer}>
        <SkeletonCard delay={0} isDark={isDark} />
        <SkeletonCard delay={100} isDark={isDark} />
        <SkeletonCard delay={200} isDark={isDark} />
      </View>
    </View>
  );
}

function AnimatedDot({ delay, isDark }: { delay: number; isDark: boolean }) {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -8,
          duration: 500,
          delay: delay,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [delay, bounceAnim]);

  return (
    <Animated.View
      style={[
        styles.dot,
        isDark ? styles.dotDark : styles.dotLight,
        { transform: [{ translateY: bounceAnim }] },
      ]}
    />
  );
}

function SkeletonCard({ delay, isDark }: { delay: number; isDark: boolean }) {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return animation;
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [delay, pulseAnim]);

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });

  return (
    <Animated.View
      style={[
        styles.card,
        isDark ? styles.cardDark : styles.cardLight,
        { opacity },
      ]}
    >
      {/* Header skeleton */}
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <View
            style={[
              styles.skeletonLine,
              styles.skeletonTitleLong,
              isDark ? styles.skeletonDark : styles.skeletonLight,
            ]}
          />
          <View
            style={[
              styles.skeletonLine,
              styles.skeletonTitleShort,
              isDark ? styles.skeletonDark : styles.skeletonLight,
            ]}
          />
        </View>
        <View
          style={[
            styles.skeletonBadge,
            isDark ? styles.skeletonDark : styles.skeletonLight,
          ]}
        />
      </View>

      {/* Meta skeleton */}
      <View
        style={[
          styles.skeletonLine,
          styles.skeletonMeta,
          isDark ? styles.skeletonMetaDark : styles.skeletonMetaLight,
        ]}
      />

      {/* Sources skeleton */}
      <View style={styles.sourcesContainer}>
        <View
          style={[
            styles.skeletonLine,
            styles.skeletonSourceLabel,
            isDark ? styles.skeletonMetaDark : styles.skeletonMetaLight,
          ]}
        />
        <View
          style={[
            styles.skeletonLine,
            styles.skeletonSourceLong,
            isDark ? styles.skeletonMetaDark : styles.skeletonMetaLight,
          ]}
        />
        <View
          style={[
            styles.skeletonLine,
            styles.skeletonSourceShort,
            isDark ? styles.skeletonMetaDark : styles.skeletonMetaLight,
          ]}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 672,
    marginHorizontal: 'auto',
    gap: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotLight: {
    backgroundColor: '#A3A3A3', // neutral-400
  },
  dotDark: {
    backgroundColor: '#737373', // neutral-500
  },
  searchingText: {
    fontSize: 14,
    color: '#737373', // neutral-500
  },
  searchingTextDark: {
    color: '#A3A3A3', // neutral-400
  },
  engineName: {
    color: '#171717', // neutral-900
    fontWeight: '500',
  },
  engineNameDark: {
    color: '#FFFFFF',
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  cardLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5E5', // neutral-200
  },
  cardDark: {
    backgroundColor: 'rgba(23, 23, 23, 0.8)', // neutral-900/80
    borderColor: '#262626', // neutral-800
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flex: 1,
    gap: 8,
  },
  skeletonLine: {
    height: 20,
    borderRadius: 6,
  },
  skeletonTitleLong: {
    width: '75%',
  },
  skeletonTitleShort: {
    width: '50%',
  },
  skeletonLight: {
    backgroundColor: '#E5E5E5', // neutral-200
  },
  skeletonDark: {
    backgroundColor: '#262626', // neutral-800
  },
  skeletonBadge: {
    height: 20,
    width: 64,
    borderRadius: 9999,
  },
  skeletonMeta: {
    height: 16,
    width: '33%',
    marginBottom: 16,
  },
  skeletonMetaLight: {
    backgroundColor: '#F5F5F5', // neutral-100
  },
  skeletonMetaDark: {
    backgroundColor: 'rgba(38, 38, 38, 0.5)', // neutral-800/50
  },
  sourcesContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5', // neutral-100
    gap: 8,
  },
  skeletonSourceLabel: {
    height: 12,
    width: 64,
  },
  skeletonSourceLong: {
    height: 16,
    width: '66%',
  },
  skeletonSourceShort: {
    height: 16,
    width: '50%',
  },
});
