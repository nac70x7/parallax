import React from 'react';
import { View, Text } from 'react-native';
import { ConfidenceBadge } from './confidence-badge';
import { SourceList, type Source } from './source-list';

type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'CONFLICTED';

interface ResultCardProps {
  claim: string;
  confidence: ConfidenceLevel;
  engines: string[];
  sources: Source[];
}

export function ResultCard({ claim, confidence, engines, sources }: ResultCardProps) {
  return (
    <View
      className="group relative p-6 rounded-xl
        bg-white dark:bg-neutral-900/80 
        border border-neutral-200 dark:border-neutral-800
        shadow-sm dark:shadow-none
        hover:shadow-md dark:hover:border-neutral-700
        hover:-translate-y-0.5
        backdrop-blur-sm
        transition-all duration-200"
    >
      {/* Header with confidence badge */}
      <View className="flex-row items-start justify-between gap-4 mb-4">
        <Text className="flex-1 text-lg font-medium text-neutral-900 dark:text-white leading-snug text-balance">
          {claim}
        </Text>
        <ConfidenceBadge level={confidence} className="flex-shrink-0 mt-0.5" />
      </View>

      {/* Agreeing engines */}
      <Text className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
        Validated by{' '}
        <Text className="text-neutral-700 dark:text-neutral-300">
          {engines.join(', ')}
        </Text>
      </Text>

      {/* Citations */}
      {sources.length > 0 && (
        <View className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <Text className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
            Sources
          </Text>
          <SourceList sources={sources} />
        </View>
      )}
    </View>
  );
}
