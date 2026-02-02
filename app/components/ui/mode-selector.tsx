import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';

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

export function ModeSelector({
  defaultMode = 'standard',
  onChange,
}: ModeSelectorProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selected, setSelected] = useState<ResearchMode>(defaultMode);

  const handleSelect = (mode: ResearchMode) => {
    setSelected(mode);
    onChange?.(mode);
  };

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      {modes.map((mode) => (
        <TouchableOpacity
          key={mode.value}
          onPress={() => handleSelect(mode.value)}
          style={[
            styles.button,
            selected === mode.value &&
              (isDark ? styles.buttonSelectedDark : styles.buttonSelectedLight),
          ]}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.buttonText,
              selected === mode.value
                ? isDark
                  ? styles.buttonTextSelectedDark
                  : styles.buttonTextSelectedLight
                : isDark
                ? styles.buttonTextUnselectedDark
                : styles.buttonTextUnselectedLight,
            ]}
          >
            {mode.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  containerLight: {
    backgroundColor: '#F5F5F5', // neutral-100
    borderColor: '#E5E5E5', // neutral-200
  },
  containerDark: {
    backgroundColor: '#171717', // neutral-900
    borderColor: '#262626', // neutral-800
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonSelectedLight: {
    backgroundColor: '#171717', // neutral-900
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonSelectedDark: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonTextSelectedLight: {
    color: '#FFFFFF',
  },
  buttonTextSelectedDark: {
    color: '#171717', // neutral-900
  },
  buttonTextUnselectedLight: {
    color: '#737373', // neutral-500
  },
  buttonTextUnselectedDark: {
    color: '#A3A3A3', // neutral-400
  },
});
