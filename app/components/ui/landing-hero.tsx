import React, { useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, G, Path, Circle } from 'react-native-svg';
import { SearchBar } from './search-bar';

interface Node {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  blur: number;
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

export function NetworkBackground() {
  const { nodes, connections } = useMemo(() => {
    const seed = 42;
    const random = (i: number) => {
      const x = Math.sin(seed + i * 9999) * 10000;
      return x - Math.floor(x);
    };

    const nodeCount = 60;
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
      
      const tooClose = nodesList.some(node => {
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
          blur: (1 - z) * 1.5,
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

  return (
    <Svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="-35 -35 170 170"
      preserveAspectRatio="none"
      style={{ width: '100%', height: '100%' }}
    >
      <Defs>
        <RadialGradient id="pulseGlow">
          <Stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <Stop offset="40%" stopColor="currentColor" stopOpacity="0.4" />
          <Stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* Static connections */}
      <G className="text-black dark:text-white stroke-current">
        {[...connections]
          .sort((a, b) => (a.z1 + a.z2) / 2 - (b.z1 + b.z2) / 2)
          .map((conn) => {
            const avgZ = (conn.z1 + conn.z2) / 2;
            return (
              <Path
                key={conn.id}
                d={`M${conn.x1},${conn.y1} Q${conn.cx},${conn.cy} ${conn.x2},${conn.y2}`}
                fill="none"
                stroke="currentColor"
                strokeOpacity={conn.opacity}
                strokeWidth={0.08 + avgZ * 0.12}
              />
            );
          })}
      </G>

      {/* Static nodes */}
      <G className="text-black dark:text-white fill-current">
        {[...nodes]
          .sort((a, b) => a.z - b.z)
          .map((node) => (
            <Circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={node.size * 0.18}
              fill="currentColor"
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
  return (
    <View className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black">
      {/* Neural network visualization */}
      <View className="absolute pointer-events-none" style={{ 
        top: '-15%', 
        left: '-15%', 
        width: '130%', 
        height: '130%' 
      }}>
        <NetworkBackground />
      </View>

      {/* Content */}
      <View className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20 text-center">
        {/* Badge */}
        <View className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700">
          <View className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white" />
          <Text className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Multi-engine research orchestration
          </Text>
        </View>

        {/* Headline */}
        <Text className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white leading-[1.1] tracking-tight mb-6 text-balance">
          Research, peer-reviewed by AI
        </Text>

        {/* Subheadline */}
        <Text className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-12 text-pretty">
          A team of AI engines working together — cross-referencing, validating, and synthesizing the best of every perspective into one reliable answer.
        </Text>

        {/* Search bar */}
        <View className="mb-8">
          <SearchBar onSubmit={onSearch} />
        </View>

        {/* CTA button */}
        <Pressable
          onPress={() => onSearch?.("")}
          className="inline-flex items-center gap-2 px-6 py-3 
            bg-neutral-900 dark:bg-white 
            text-white dark:text-neutral-900 
            font-medium rounded-xl
            hover:bg-neutral-800 dark:hover:bg-neutral-100
            hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]
            transition-all duration-200"
        >
          <Text className="font-medium text-white dark:text-neutral-900">
            Start Researching
          </Text>
        </Pressable>

        {/* Trust indicators */}
        <View className="mt-16 flex-row flex-wrap items-center justify-center gap-6">
          <View className="flex-row items-center gap-2">
            <View className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
            <Text className="text-xs text-neutral-400 dark:text-neutral-500">Perplexity</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
            <Text className="text-xs text-neutral-400 dark:text-neutral-500">Kimi</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
            <Text className="text-xs text-neutral-400 dark:text-neutral-500">Gemini</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
            <Text className="text-xs text-neutral-400 dark:text-neutral-500">OpenAI</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
