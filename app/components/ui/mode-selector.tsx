import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

type ResearchMode = 'quick' | 'standard' | 'deep';

interface ModeSelectorProps {
  defaultMode?: ResearchMode;
  onChange?: (mode: ResearchMode) => void;
}

const modes: { value: ResearchMode; label: string }[] = [
  { value: 'quick', label: 'Quick' },
  { value: 'standard', label: 'Standard' },
  { value: 'deep', label: 'Deep' },
];

export function ModeSelector({ defaultMode = 'standard', onChange }: ModeSelectorProps) {
  const [selected, setSelected] = useState<ResearchMode>(defaultMode);

  const handleSelect = (mode: ResearchMode) => {
    setSelected(mode);
    onChange?.(mode);
  };

  return (
    <View className="inline-flex flex-row items-center p-1 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
      {modes.map((mode) => (
        <Pressable
          key={mode.value}
          onPress={() => handleSelect(mode.value)}
          className={`relative px-4 py-1.5 rounded-md transition-all duration-200 ${
            selected === mode.value
              ? "bg-neutral-900 dark:bg-white shadow-sm"
              : ""
          }`}
        >
          <Text
            className={`text-sm font-medium ${
              selected === mode.value
                ? "text-white dark:text-neutral-900"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            {mode.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
