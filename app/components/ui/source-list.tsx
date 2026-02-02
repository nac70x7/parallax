import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  useColorScheme,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Source {
  title: string;
  url: string;
  domain?: string;
}

interface SourceListProps {
  sources: Source[];
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return '';
  }
}

export function SourceList({ sources }: SourceListProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  if (sources.length === 0) return null;

  return (
    <View style={styles.container}>
      {sources.map((source, index) => {
        const domain = source.domain || getDomain(source.url);
        const favicon = getFaviconUrl(source.url);

        return (
          <SourceItem
            key={index}
            source={source}
            domain={domain}
            favicon={favicon}
            isDark={isDark}
          />
        );
      })}
    </View>
  );
}

interface SourceItemProps {
  source: Source;
  domain: string;
  favicon: string;
  isDark: boolean;
}

function SourceItem({ source, domain, favicon, isDark }: SourceItemProps) {
  const handlePress = () => {
    Linking.openURL(source.url);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.item,
        isDark ? styles.itemDark : styles.itemLight,
      ]}
      activeOpacity={0.7}
    >
      {favicon ? (
        <Image
          source={{ uri: favicon }}
          style={styles.favicon}
          defaultSource={require('./placeholder.png')} // You'll need to add a placeholder
        />
      ) : null}

      <View style={styles.textContainer}>
        <Text
          style={[styles.title, isDark ? styles.titleDark : styles.titleLight]}
          numberOfLines={1}
        >
          {source.title || source.url}
        </Text>
        <Text
          style={[styles.domain, isDark ? styles.domainDark : styles.domainLight]}
          numberOfLines={1}
        >
          {domain}
        </Text>
      </View>

      <Ionicons
        name="open-outline"
        size={14}
        color={isDark ? '#A3A3A3' : '#737373'}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: -12,
    borderRadius: 8,
  },
  itemLight: {
    backgroundColor: 'transparent',
  },
  itemDark: {
    backgroundColor: 'transparent',
  },
  favicon: {
    width: 16,
    height: 16,
    borderRadius: 2,
  },
  textContainer: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 14,
  },
  titleLight: {
    color: '#404040', // neutral-700
  },
  titleDark: {
    color: '#D4D4D4', // neutral-300
  },
  domain: {
    fontSize: 12,
    marginTop: 2,
  },
  domainLight: {
    color: '#A3A3A3', // neutral-400
  },
  domainDark: {
    color: '#737373', // neutral-500
  },
  icon: {
    opacity: 0.7,
  },
});
