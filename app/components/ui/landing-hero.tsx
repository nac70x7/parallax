import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Animated,
  Dimensions,
} from 'react-native';
import { SearchBar } from './search-bar';
import { ModeSelector } from './mode-selector';

interface LandingHeroProps {
  onSearch: (query: string) => void;
}

export function LandingHero({ onSearch }: LandingHeroProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in and slide up animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation for the glow
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleModeChange = (mode: string) => {
    console.log('Mode changed:', mode);
  };

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      {/* Animated background glow */}
      <Animated.View
        style={[
          styles.backgroundGlow,
          {
            opacity: pulseAnim.interpolate({
              inputRange: [1, 1.2],
              outputRange: [0.3, 0.5],
            }),
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />

      {/* Content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Logo/Brand */}
        <View style={styles.header}>
          <Text style={[styles.logo, isDark ? styles.logoDark : styles.logoLight]}>
            Parallax
          </Text>
          <Text style={[styles.tagline, isDark ? styles.taglineDark : styles.taglineLight]}>
            Multi-AI Research Platform
          </Text>
          <Text style={[styles.description, isDark ? styles.descriptionDark : styles.descriptionLight]}>
            Get comprehensive answers by querying multiple AI engines simultaneously.
            Compare perspectives, detect conflicts, and synthesize insights.
          </Text>
        </View>

        {/* Mode Selector */}
        <View style={styles.modeContainer}>
          <ModeSelector defaultMode="standard" onChange={handleModeChange} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            onSubmit={onSearch}
            placeholder="What do you want to research?"
            isLoading={false}
          />
        </View>

        {/* Features */}
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Text style={[styles.featureIcon, isDark ? styles.featureIconDark : styles.featureIconLight]}>
              ⚡
            </Text>
            <Text style={[styles.featureText, isDark ? styles.featureTextDark : styles.featureTextLight]}>
              Real-time synthesis
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={[styles.featureIcon, isDark ? styles.featureIconDark : styles.featureIconLight]}>
              🎯
            </Text>
            <Text style={[styles.featureText, isDark ? styles.featureTextDark : styles.featureTextLight]}>
              Conflict detection
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={[styles.featureIcon, isDark ? styles.featureIconDark : styles.featureIconLight]}>
              🔗
            </Text>
            <Text style={[styles.featureText, isDark ? styles.featureTextDark : styles.featureTextLight]}>
              Source verification
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
    position: 'relative',
  },
  containerLight: {
    backgroundColor: '#FAFAFA', // neutral-50
  },
  containerDark: {
    backgroundColor: '#171717', // neutral-900
  },
  backgroundGlow: {
    position: 'absolute',
    width: 600,
    height: 600,
    borderRadius: 300,
    backgroundColor: '#3B82F6',
    opacity: 0.3,
    top: '20%',
  },
  content: {
    maxWidth: 700,
    width: '100%',
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 16,
    letterSpacing: -2,
  },
  logoLight: {
    color: '#171717', // neutral-900
  },
  logoDark: {
    color: '#FFFFFF',
  },
  tagline: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  taglineLight: {
    color: '#404040', // neutral-700
  },
  taglineDark: {
    color: '#E5E5E5', // neutral-200
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 32,
  },
  descriptionLight: {
    color: '#737373', // neutral-500
  },
  descriptionDark: {
    color: '#A3A3A3', // neutral-400
  },
  modeContainer: {
    marginBottom: 24,
  },
  searchContainer: {
    marginBottom: 48,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 48,
    flexWrap: 'wrap',
  },
  featureItem: {
    alignItems: 'center',
    gap: 8,
  },
  featureIcon: {
    fontSize: 32,
  },
  featureIconLight: {
    opacity: 0.8,
  },
  featureIconDark: {
    opacity: 0.9,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
  },
  featureTextLight: {
    color: '#525252', // neutral-600
  },
  featureTextDark: {
    color: '#D4D4D4', // neutral-300
  },
});
