import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { ConfidenceBadge } from './confidence-badge';
import { SourceList, type Source } from './source-list';

type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'CONFLICTED';

interface ResultCardProps {
  claim: string;
  confidence: ConfidenceLevel;
  engines: string[];
  sources: Source[];
}

export function ResultCard({
  claim,
  confidence,
  engines,
  sources,
}: ResultCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      style={[
        styles.card,
        isDark ? styles.cardDark : styles.cardLight,
      ]}
    >
      {/* Header with confidence badge */}
      <View style={styles.header}>
        <Text
          style={[
            styles.claim,
            isDark ? styles.claimDark : styles.claimLight,
          ]}
        >
          {claim}
        </Text>
        <ConfidenceBadge level={confidence} style={styles.badge} />
      </View>

      {/* Agreeing engines */}
      <Text style={[styles.engines, isDark ? styles.enginesDark : styles.enginesLight]}>
        Validated by{' '}
        <Text style={isDark ? styles.enginesHighlightDark : styles.enginesHighlightLight}>
          {engines.join(', ')}
        </Text>
      </Text>

      {/* Citations */}
      {sources.length > 0 && (
        <View style={[styles.sourcesContainer, isDark && styles.sourcesContainerDark]}>
          <Text style={[styles.sourcesLabel, isDark && styles.sourcesLabelDark]}>
            SOURCES
          </Text>
          <SourceList sources={sources} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  cardLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5E5', // neutral-200
    shadowColor: '#000',
    shadowOpacity: 0.05,
  },
  cardDark: {
    backgroundColor: 'rgba(23, 23, 23, 0.8)', // neutral-900/80
    borderColor: '#262626', // neutral-800
    shadowOpacity: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 16,
  },
  claim: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
  },
  claimLight: {
    color: '#171717', // neutral-900
  },
  claimDark: {
    color: '#FFFFFF',
  },
  badge: {
    marginTop: 2,
  },
  engines: {
    fontSize: 14,
    marginBottom: 16,
  },
  enginesLight: {
    color: '#737373', // neutral-500
  },
  enginesDark: {
    color: '#A3A3A3', // neutral-400
  },
  enginesHighlightLight: {
    color: '#404040', // neutral-700
  },
  enginesHighlightDark: {
    color: '#D4D4D4', // neutral-300
  },
  sourcesContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5', // neutral-100
  },
  sourcesContainerDark: {
    borderTopColor: '#262626', // neutral-800
  },
  sourcesLabel: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1.2,
    marginBottom: 8,
    color: '#A3A3A3', // neutral-400
  },
  sourcesLabelDark: {
    color: '#737373', // neutral-500
  },
});
