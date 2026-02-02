import React from 'react';
import { View, Text, Pressable, Linking } from 'react-native';
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

export function SourceList({ sources }: SourceListProps) {
  if (sources.length === 0) return null;

  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  return (
    <View className="space-y-1">
      {sources.map((source, index) => {
        const domain = source.domain || getDomain(source.url);

        return (
          <Pressable
            key={index}
            onPress={() => handlePress(source.url)}
            className="group flex-row items-center gap-3 px-3 py-2 -mx-3 rounded-lg
              hover:bg-neutral-100 dark:hover:bg-neutral-800/50
              transition-colors duration-150"
          >
            {/* Favicon - first letter of domain */}
            <View className="w-4 h-4 rounded-sm flex-shrink-0 items-center justify-center bg-neutral-200 dark:bg-neutral-700">
              <Text className="text-[8px] font-semibold text-neutral-600 dark:text-neutral-400">
                {domain.charAt(0).toUpperCase()}
              </Text>
            </View>

            <View className="flex-1 min-w-0">
              <Text 
                className="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors"
                numberOfLines={1}
              >
                {source.title || source.url}
              </Text>
              <Text className="text-xs text-neutral-400 dark:text-neutral-500" numberOfLines={1}>
                {domain}
              </Text>
            </View>
            <Ionicons 
              name="open-outline" 
              size={14} 
              color="#A3A3A3" 
              className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" 
            />
          </Pressable>
        );
      })}
    </View>
  );
}
