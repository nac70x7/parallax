import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

interface Engine {
  name: string;
  status: 'contributed' | 'failed' | 'pending';
}

interface EngineStatusProps {
  engines: Engine[];
}

export function EngineStatus({ engines }: EngineStatusProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={styles.container}>
      {engines.map((engine) => (
        <EngineStatusItem
          key={engine.name}
          engine={engine}
          isDark={isDark}
        />
      ))}
    </View>
  );
}

interface EngineStatusItemProps {
  engine: Engine;
  isDark: boolean;
}

function EngineStatusItem({ engine, isDark }: EngineStatusItemProps) {
  const getContainerStyle = () => {
    switch (engine.status) {
      case 'contributed':
        return isDark ? styles.contributedDark : styles.contributedLight;
      case 'failed':
        return [
          isDark ? styles.failedDark : styles.failedLight,
          { opacity: 0.6 },
        ];
      case 'pending':
        return isDark ? styles.pendingDark : styles.pendingLight;
    }
  };

  const getTextStyle = () => {
    switch (engine.status) {
      case 'contributed':
        return isDark ? styles.contributedTextDark : styles.contributedTextLight;
      case 'failed':
        return isDark ? styles.failedTextDark : styles.failedTextLight;
      case 'pending':
        return isDark ? styles.pendingTextDark : styles.pendingTextLight;
    }
  };

  const getDotStyle = () => {
    switch (engine.status) {
      case 'contributed':
        return isDark ? styles.dotContributedDark : styles.dotContributedLight;
      case 'failed':
        return isDark ? styles.dotFailedDark : styles.dotFailedLight;
      case 'pending':
        return isDark ? styles.dotPendingDark : styles.dotPendingLight;
    }
  };

  return (
    <View style={[styles.itemContainer, getContainerStyle()]}>
      <View style={[styles.dot, getDotStyle()]} />
      <Text style={[styles.itemText, getTextStyle()]}>{engine.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  itemText: {
    fontSize: 12,
    fontWeight: '500',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  // Contributed styles
  contributedLight: {
    backgroundColor: '#F5F5F5', // neutral-100
  },
  contributedDark: {
    backgroundColor: '#262626', // neutral-800
  },
  contributedTextLight: {
    color: '#171717', // neutral-900
  },
  contributedTextDark: {
    color: '#FFFFFF',
  },
  dotContributedLight: {
    backgroundColor: '#171717', // neutral-900
  },
  dotContributedDark: {
    backgroundColor: '#FFFFFF',
  },
  // Failed styles
  failedLight: {
    backgroundColor: '#FAFAFA', // neutral-50
  },
  failedDark: {
    backgroundColor: '#171717', // neutral-900
  },
  failedTextLight: {
    color: '#A3A3A3', // neutral-400
  },
  failedTextDark: {
    color: '#525252', // neutral-600
  },
  dotFailedLight: {
    backgroundColor: '#D4D4D4', // neutral-300
  },
  dotFailedDark: {
    backgroundColor: '#404040', // neutral-700
  },
  // Pending styles
  pendingLight: {
    backgroundColor: '#F5F5F5', // neutral-100
  },
  pendingDark: {
    backgroundColor: '#262626', // neutral-800
  },
  pendingTextLight: {
    color: '#737373', // neutral-500
  },
  pendingTextDark: {
    color: '#A3A3A3', // neutral-400
  },
  dotPendingLight: {
    backgroundColor: '#A3A3A3', // neutral-400
  },
  dotPendingDark: {
    backgroundColor: '#737373', // neutral-500
  },
});
