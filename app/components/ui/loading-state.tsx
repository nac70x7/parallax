import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

interface LoadingStateProps {
  engines?: string[];
}

export function LoadingState({ engines = ['Perplexity', 'Kimi', 'Gemini', 'OpenAI'] }: LoadingStateProps) {
  const [currentEngine, setCurrentEngine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEngine((prev) => (prev + 1) % engines.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [engines.length]);

  return (
    <View className="w-full max-w-2xl mx-auto space-y-6">
      {/* Progress text */}
      <View className="flex-row items-center justify-center gap-3">
        <View className="flex-row gap-1">
          <View className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-[bounce_1s_ease-in-out_infinite]" />
          <View className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-[bounce_1s_ease-in-out_0.1s_infinite]" />
          <View className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-[bounce_1s_ease-in-out_0.2s_infinite]" />
        </View>
        <Text className="text-sm text-neutral-500 dark:text-neutral-400">
          Searching{' '}
          <Text className="text-neutral-900 dark:text-white font-medium transition-all duration-300">
            {engines[currentEngine]}
          </Text>
          ...
        </Text>
      </View>

      {/* Skeleton cards */}
      <View className="space-y-4">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} delay={i * 100} />
        ))}
      </View>
    </View>
  );
}

function SkeletonCard({ delay = 0 }: { delay?: number }) {
  return (
    <View className="p-6 rounded-xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 animate-pulse">
      {/* Header skeleton */}
      <View className="flex-row items-start justify-between gap-4 mb-4">
        <View className="flex-1 space-y-2">
          <View className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded-md w-3/4" />
          <View className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded-md w-1/2" />
        </View>
        <View className="h-5 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full flex-shrink-0" />
      </View>

      {/* Meta skeleton */}
      <View className="h-4 bg-neutral-100 dark:bg-neutral-800/50 rounded w-1/3 mb-4" />

      {/* Sources skeleton */}
      <View className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
        <View className="h-3 bg-neutral-100 dark:bg-neutral-800/50 rounded w-16" />
        <View className="h-4 bg-neutral-100 dark:bg-neutral-800/50 rounded w-2/3" />
        <View className="h-4 bg-neutral-100 dark:bg-neutral-800/50 rounded w-1/2" />
      </View>
    </View>
  );
}
