import React from 'react';
import { Text } from 'react-native';

type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'CONFLICTED';

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  className?: string;
}

export function ConfidenceBadge({ level, className }: ConfidenceBadgeProps) {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full transition-all duration-200";
  
  const levelClasses = {
    HIGH: "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 dark:shadow-[0_0_12px_rgba(255,255,255,0.3)]",
    MEDIUM: "bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200",
    LOW: "bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500",
    CONFLICTED: "bg-transparent text-neutral-600 dark:text-neutral-300 border border-neutral-400 dark:border-neutral-500 animate-pulse",
  };

  return (
    <Text className={`${baseClasses} ${levelClasses[level]} ${className || ''}`}>
      {level}
    </Text>
  );
}
