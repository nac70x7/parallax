import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Source {
  title: string;
  url: string;
  domain: string;
}

interface SourceListProps {
  sources: Source[];
}

export function SourceList({ sources }: SourceListProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  return (
    <View style={styles.container}>
      {sources.map((source, index) => (
        <TouchableOpacity
          key={`${source.url}-${index}`}
          style={[
            styles.sourceItem,
            isDark ? styles.sourceItemDark : styles.sourceItemLight,
          ]}
          onPress={() => handlePress(source.url)}
          activeOpacity={0.7}
        >
          {/* Favicon placeholder - colored circle with first letter */}
          <View
            style={[
              styles.favicon,
              isDark ? styles.faviconDark : styles.faviconLight,
            ]}
          >
            <Text
              style={[
                styles.faviconText,
                isDark ? styles.faviconTextDark : styles.faviconTextLight,
              ]}
            >
              {source.domain.charAt(0).toUpperCase()}
            </Text>
          </View>

          {/* Source info */}
          <View style={styles.sourceInfo}>
            <Text
              style={[
                styles.sourceTitle,
                isDark ? styles.sourceTitleDark : styles.sourceTitleLight,
              ]}
              numberOfLines={1}
            >
              {source.title}
            </Text>
            <Text
              style={[
                styles.sourceDomain,
                isDark ? styles.sourceDomainDark : styles.sourceDomainLight,
              ]}
              numberOfLines={1}
            >
              {source.domain}
            </Text>
          </View>

          {/* External link icon */}
          <Ionicons
            name="open-outline"
            size={16}
            color={isDark ? '#A3A3A3' : '#737373'}
            style={styles.externalIcon}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  sourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  sourceItemLight: {
    backgroundColor: '#FAFAFA', // neutral-50
    borderColor: '#E5E5E5', // neutral-200
  },
  sourceItemDark: {
    backgroundColor: 'rgba(38, 38, 38, 0.5)', // neutral-800/50
    borderColor: '#404040', // neutral-700
  },
  favicon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faviconLight: {
    backgroundColor: '#E5E5E5', // neutral-200
  },
  faviconDark: {
    backgroundColor: '#404040', // neutral-700
  },
  faviconText: {
    fontSize: 14,
    fontWeight: '600',
  },
  faviconTextLight: {
    color: '#525252', // neutral-600
  },
  faviconTextDark: {
    color: '#D4D4D4', // neutral-300
  },
  sourceInfo: {
    flex: 1,
    gap: 2,
  },
  sourceTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  sourceTitleLight: {
    color: '#171717', // neutral-900
  },
  sourceTitleDark: {
    color: '#FFFFFF',
  },
  sourceDomain: {
    fontSize: 12,
  },
  sourceDomainLight: {
    color: '#737373', // neutral-500
  },
  sourceDomainDark: {
    color: '#A3A3A3', // neutral-400
  },
  externalIcon: {
    opacity: 0.5,
  },
});
