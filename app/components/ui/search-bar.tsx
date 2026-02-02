import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  onSubmit?: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export function SearchBar({
  onSubmit,
  placeholder = 'What do you want to research?',
  isLoading = false,
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (query.trim() && onSubmit) {
      onSubmit(query.trim());
    }
  };

  return (
    <View className="w-full max-w-[600px] mx-auto">
      <View className="relative group">
        <View
          className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 
          dark:from-neutral-700 dark:via-neutral-500 dark:to-neutral-700 
          opacity-0 group-focus-within:opacity-100 blur-sm transition-all duration-300"
        />
        <View
          className="relative flex-row items-center bg-white dark:bg-neutral-900 
          border border-neutral-200 dark:border-neutral-800 
          rounded-xl overflow-hidden
          focus-within:border-neutral-400 dark:focus-within:border-neutral-600
          transition-all duration-200"
        >
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={placeholder}
            editable={!isLoading}
            onSubmitEditing={handleSubmit}
            returnKeyType="search"
            className="flex-1 px-5 py-4 text-base md:text-lg 
              bg-transparent text-neutral-900 dark:text-neutral-100
              placeholder:text-neutral-400 dark:placeholder:text-neutral-500
              focus:outline-none disabled:opacity-50"
            placeholderTextColor="#A3A3A3"
          />
          <Pressable
            onPress={handleSubmit}
            disabled={!query.trim() || isLoading}
            className="flex-row items-center gap-2 px-5 py-4 
              text-neutral-500 dark:text-neutral-400
              hover:text-neutral-900 dark:hover:text-white
              disabled:opacity-30 disabled:cursor-not-allowed
              transition-colors duration-200"
          >
            <Text className="hidden sm:inline text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Research
            </Text>
            <Ionicons name="search" size={20} color="#737373" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
