import React from 'react';
import { View, Text, Pressable, Linking } from 'react-native';
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

export function ConflictCard({ topic, positions, resolutionHint }: ConflictCardProps) {
  return (
    <View
      className="relative p-6 rounded-xl
        bg-white dark:bg-neutral-900/80
        border border-neutral-300 dark:border-neutral-700
        shadow-sm dark:shadow-none
        backdrop-blur-sm
        animate-[pulse_3s_ease-in-out_infinite]"
    >
      {/* Header */}
      <View className="flex-row items-start justify-between gap-4 mb-5">
        <View className="flex-row items-center gap-3">
          <Ionicons name="alert-circle-outline" size={20} color="#A3A3A3" className="flex-shrink-0" />
          <Text className="text-lg font-medium text-neutral-900 dark:text-white leading-snug">
            {topic}
          </Text>
        </View>
        <ConfidenceBadge level="CONFLICTED" className="flex-shrink-0" />
      </View>

      {/* Positions grid */}
      <View className="gap-4">
        {positions.map((pos, index) => (
          <View
            key={index}
            className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800"
          >
            <Text className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
              {pos.engine}
            </Text>
            <Text className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {pos.position}
            </Text>
            {pos.citation && (
              <Pressable
                onPress={() => Linking.openURL(pos.citation!.url)}
                className="inline-block mt-2"
              >
                <Text className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 underline underline-offset-2 transition-colors">
                  {pos.citation.title}
                </Text>
              </Pressable>
            )}
          </View>
        ))}
      </View>

      {/* Resolution hint */}
      {resolutionHint && (
        <Text className="mt-5 pt-4 text-sm text-neutral-500 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-800 italic">
          {resolutionHint}
        </Text>
      )}
    </View>
  );
}
