import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'CONFLICTED';

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  style?: any;
}

export function ConfidenceBadge({ level, style }: ConfidenceBadgeProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getStyles = () => {
    switch (level) {
      case 'HIGH':
        return {
          container: isDark ? styles.highDark : styles.highLight,
          text: isDark ? styles.highTextDark : styles.highTextLight,
        };
      case 'MEDIUM':
        return {
          container: isDark ? styles.mediumDark : styles.mediumLight,
          text: isDark ? styles.mediumTextDark : styles.mediumTextLight,
        };
      case 'LOW':
        return {
          container: isDark ? styles.lowDark : styles.lowLight,
          text: isDark ? styles.lowTextDark : styles.lowTextLight,
        };
      case 'CONFLICTED':
        return {
          container: isDark ? styles.conflictedDark : styles.conflictedLight,
          text: isDark ? styles.conflictedTextDark : styles.conflictedTextLight,
        };
    }
  };

  const componentStyles = getStyles();

  return (
    <View style={[styles.base, componentStyles.container, style]}>
      <Text style={[styles.baseText, componentStyles.text]}>{level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  baseText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  // HIGH - Luminous, prominent
  highLight: {
    backgroundColor: '#171717', // neutral-900
  },
  highTextLight: {
    color: '#FFFFFF',
  },
  highDark: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  highTextDark: {
    color: '#171717', // neutral-900
  },
  // MEDIUM - Standard contrast
  mediumLight: {
    backgroundColor: '#E5E5E5', // neutral-200
  },
  mediumTextLight: {
    color: '#404040', // neutral-700
  },
  mediumDark: {
    backgroundColor: '#404040', // neutral-700
  },
  mediumTextDark: {
    color: '#E5E5E5', // neutral-200
  },
  // LOW - Muted, faded
  lowLight: {
    backgroundColor: '#F5F5F5', // neutral-100
  },
  lowTextLight: {
    color: '#A3A3A3', // neutral-400
  },
  lowDark: {
    backgroundColor: '#262626', // neutral-800
  },
  lowTextDark: {
    color: '#737373', // neutral-500
  },
  // CONFLICTED - Border with pulsing effect
  conflictedLight: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#A3A3A3', // neutral-400
  },
  conflictedTextLight: {
    color: '#525252', // neutral-600
  },
  conflictedDark: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#737373', // neutral-500
  },
  conflictedTextDark: {
    color: '#D4D4D4', // neutral-300
  },
});
