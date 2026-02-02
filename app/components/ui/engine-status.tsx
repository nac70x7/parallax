import React from 'react';
import { View, Text } from 'react-native';

interface Engine {
  name: string;
  status: 'contributed' | 'failed' | 'pending';
}

interface EngineStatusProps {
  engines: Engine[];
}

export function EngineStatus({ engines }: EngineStatusProps) {
  const getStatusClasses = (status: Engine['status']) => {
    switch (status) {
      case 'contributed':
        return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white';
      case 'failed':
        return 'bg-neutral-50 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600 opacity-60';
      case 'pending':
        return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 animate-pulse';
    }
  };

  const getDotClasses = (status: Engine['status']) => {
    switch (status) {
      case 'contributed':
        return 'bg-neutral-900 dark:bg-white';
      case 'failed':
        return 'bg-neutral-300 dark:bg-neutral-700';
      case 'pending':
        return 'bg-neutral-400 dark:bg-neutral-500';
    }
  };

  return (
    <View className="flex flex-wrap flex-row items-center gap-3">
      {engines.map((engine) => (
        <View
          key={engine.name}
          className="group relative"
        >
          <View
            className={`flex-row items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${getStatusClasses(engine.status)}`}
          >
            <View className={`w-1.5 h-1.5 rounded-full ${getDotClasses(engine.status)}`} />
            <Text className={getStatusClasses(engine.status)}>{engine.name}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
