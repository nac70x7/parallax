import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Dimensions,
} from 'react-native';
import Svg, {
  Defs,
  RadialGradient,
  Stop,
  G,
  Path,
  Circle,
} from 'react-native-svg';
import { SearchBar } from './search-bar';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Node {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
}

interface Connection {
  id: string;
  x1: number;
  y1: number;
  z1: number;
  x2: number;
  y2: number;
  z2: number;
  opacity: number;
  cx: number;
  cy: number;
}

function NetworkBackground({ isDark }: { isDark: boolean }) {
  const { nodes, connections } = useMemo(() => {
    const seed = 42;
    const random = (i: number) => {
      const x = Math.sin(seed + i * 9999) * 10000;
      return x - Math.floor(x);
    };

    const nodeCount = 40; // Reduced for mobile performance
    const nodesList: Node[] = [];

    const minBound = -35;
    const maxBound = 135;
    const range = maxBound - minBound;
    const minDistance = 18;
    const gridSize = Math.ceil(Math.sqrt(nodeCount));
    const cellSize = range / gridSize;

    let attempts = 0;
    while (nodesList.length < nodeCount && attempts < nodeCount * 10) {
      attempts++;
      const i = nodesList.length;
      const gridX = (i % gridSize) * cellSize + minBound;
      const gridY = Math.floor(i / gridSize) * cellSize + minBound;

      const offsetX = (random(attempts) - 0.5) * cellSize * 1.0;
      const offsetY = (random(attempts * 2) - 0.5) * cellSize * 1.0;

      const x = gridX + cellSize / 2 + offsetX;
      const y = gridY + cellSize / 2 + offsetY;
      const z = random(attempts * 3);

      const tooClose = nodesList.some((node) => {
        const dx = node.x - x;
        const dy = node.y - y;
        return Math.sqrt(dx * dx + dy * dy) < minDistance;
      });

      if (!tooClose) {
        nodesList.push({
          id: i,
          x,
          y,
          z,
          size: 0.8 + z * 3.5,
          opacity: 0.08 + z * 0.35,
        });
      }
    }

    const connectionsList: Connection[] = [];
    const maxDistance = 38;

    for (let i = 0; i < nodesList.length; i++) {
      for (let j = i + 1; j < nodesList.length; j++) {
        const n1 = nodesList[i];
        const n2 = nodesList[j];
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dz = n1.z - n2.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz * 100);

        if (distance < maxDistance) {
          const strength = 1 - distance / maxDistance;
          const avgZ = (n1.z + n2.z) / 2;
          const midX = (n1.x + n2.x) / 2;
          const midY = (n1.y + n2.y) / 2;
          const zDiff = Math.abs(n1.z - n2.z);
          const curveOffset = zDiff * 8 * (random(i * 1000 + j) - 0.5);

          connectionsList.push({
            id: `${i}-${j}`,
            x1: n1.x,
            y1: n1.y,
            z1: n1.z,
            x2: n2.x,
            y2: n2.y,
            z2: n2.z,
            cx: midX + curveOffset,
            cy: midY + curveOffset * 0.5,
            opacity: (0.03 + strength * 0.12) * (0.5 + avgZ * 0.5),
          });
        }
      }
    }

    return { nodes: nodesList, connections: connectionsList };
  }, []);

  const strokeColor = isDark ? '#FFFFFF' : '#000000';
  const fillColor = isDark ? '#FFFFFF' : '#000000';

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="-35 -35 170 170"
      preserveAspectRatio="none"
      style={StyleSheet.absoluteFillObject}
    >
      <Defs>
        <RadialGradient id="pulseGlow">
          <Stop offset="0%" stopColor={fillColor} stopOpacity="0.9" />
          <Stop offset="40%" stopColor={fillColor} stopOpacity="0.4" />
          <Stop offset="100%" stopColor={fillColor} stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* Static connections */}
      <G>
        {connections
          .sort((a, b) => (a.z1 + a.z2) / 2 - (b.z1 + b.z2) / 2)
          .map((conn) => {
            const avgZ = (conn.z1 + conn.z2) / 2;
            return (
              <Path
                key={conn.id}
                d={`M${conn.x1},${conn.y1} Q${conn.cx},${conn.cy} ${conn.x2},${conn.y2}`}
                fill="none"
                stroke={strokeColor}
                strokeOpacity={conn.opacity}
                strokeWidth={0.08 + avgZ * 0.12}
              />
            );
          })}
      </G>

      {/* Static nodes */}
      <G>
        {nodes
          .sort((a, b) => a.z - b.z)
          .map((node) => (
            <Circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={node.size * 0.18}
              fill={fillColor}
              fillOpacity={node.opacity}
            />
          ))}
      </G>
    </Svg>
  );
}

interface LandingHeroProps {
  onSearch?: (query: string) => void;
}

export function LandingHero({ onSearch }: LandingHeroProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.containerDark : styles.containerLight,
      ]}
    >
      {/* Neural network visualization */}
      <View style={styles.networkContainer}>
        <NetworkBackground isDark={isDark} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Badge */}
        <View
          style={[
            styles.badge,
            isDark ? styles.badgeDark : styles.badgeLight,
          ]}
        >
          <View
            style={[
              styles.badgeDot,
              isDark ? styles.badgeDotDark : styles.badgeDotLight,
            ]}
          />
          <Text
            style={[
              styles.badgeText,
              isDark ? styles.badgeTextDark : styles.badgeTextLight,
            ]}
          >
            Multi-engine research orchestration
          </Text>
        </View>

        {/* Headline */}
        <Text
          style={[
            styles.headline,
            isDark ? styles.headlineDark : styles.headlineLight,
          ]}
        >
          Research, peer-reviewed by AI
        </Text>

        {/* Subheadline */}
        <Text
          style={[
            styles.subheadline,
            isDark ? styles.subheadlineDark : styles.subheadlineLight,
          ]}
        >
          A team of AI engines working together — cross-referencing, validating,
          and synthesizing the best of every perspective into one reliable answer.
        </Text>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <SearchBar onSubmit={onSearch} />
        </View>

        {/* CTA button */}
        <TouchableOpacity
          style={[
            styles.ctaButton,
            isDark ? styles.ctaButtonDark : styles.ctaButtonLight,
          ]}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.ctaText,
              isDark ? styles.ctaTextDark : styles.ctaTextLight,
            ]}
          >
            Start Researching
          </Text>
        </TouchableOpacity>

        {/* Trust indicators */}
        <View style={styles.trustContainer}>
          {['Perplexity', 'Kimi', 'Gemini', 'OpenAI'].map((engine) => (
            <View key={engine} style={styles.trustItem}>
              <View
                style={[
                  styles.trustDot,
                  isDark ? styles.trustDotDark : styles.trustDotLight,
                ]}
              />
              <Text
                style={[
                  styles.trustText,
                  isDark ? styles.trustTextDark : styles.trustTextLight,
                ]}
              >
                {engine}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  containerLight: {
    backgroundColor: '#FFFFFF',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  networkContainer: {
    position: 'absolute',
    top: '-15%',
    left: '-15%',
    width: '130%',
    height: '130%',
  },
  content: {
    width: '100%',
    maxWidth: 672,
    paddingHorizontal: 24,
    paddingVertical: 80,
    alignItems: 'center',
    zIndex: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 32,
    borderRadius: 9999,
    borderWidth: 1,
  },
  badgeLight: {
    backgroundColor: '#F5F5F5', // neutral-100
    borderColor: '#E5E5E5', // neutral-200
  },
  badgeDark: {
    backgroundColor: 'rgba(38, 38, 38, 0.8)', // neutral-800/80
    borderColor: '#404040', // neutral-700
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeDotLight: {
    backgroundColor: '#171717', // neutral-900
  },
  badgeDotDark: {
    backgroundColor: '#FFFFFF',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  badgeTextLight: {
    color: '#525252', // neutral-600
  },
  badgeTextDark: {
    color: '#A3A3A3', // neutral-400
  },
  headline: {
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 40,
    letterSpacing: -0.5,
    marginBottom: 24,
    textAlign: 'center',
  },
  headlineLight: {
    color: '#171717', // neutral-900
  },
  headlineDark: {
    color: '#FFFFFF',
  },
  subheadline: {
    fontSize: 18,
    lineHeight: 28,
    maxWidth: 560,
    marginBottom: 48,
    textAlign: 'center',
  },
  subheadlineLight: {
    color: '#525252', // neutral-600
  },
  subheadlineDark: {
    color: '#A3A3A3', // neutral-400
  },
  searchContainer: {
    width: '100%',
    marginBottom: 32,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },
  ctaButtonLight: {
    backgroundColor: '#171717', // neutral-900
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  ctaButtonDark: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFF',
    shadowOpacity: 0.15,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '500',
  },
  ctaTextLight: {
    color: '#FFFFFF',
  },
  ctaTextDark: {
    color: '#171717', // neutral-900
  },
  trustContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginTop: 64,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trustDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  trustDotLight: {
    backgroundColor: '#D4D4D4', // neutral-300
  },
  trustDotDark: {
    backgroundColor: '#525252', // neutral-600
  },
  trustText: {
    fontSize: 12,
  },
  trustTextLight: {
    color: '#A3A3A3', // neutral-400
  },
  trustTextDark: {
    color: '#737373', // neutral-500
  },
});
