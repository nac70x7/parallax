import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Animated,
} from 'react-native';
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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const glowAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(glowAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(glowAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleSubmit = () => {
    if (query.trim() && onSubmit) {
      onSubmit(query.trim());
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.glowContainer,
          {
            opacity: glowAnim,
          },
        ]}
      >
        <View
          style={[
            styles.glow,
            isDark ? styles.glowDark : styles.glowLight,
          ]}
        />
      </Animated.View>

      <View
        style={[
          styles.inputContainer,
          isDark ? styles.inputContainerDark : styles.inputContainerLight,
          isFocused && (isDark ? styles.inputFocusedDark : styles.inputFocusedLight),
        ]}
      >
        <TextInput
          style={[
            styles.input,
            isDark ? styles.inputTextDark : styles.inputTextLight,
          ]}
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          placeholderTextColor={isDark ? '#737373' : '#A3A3A3'}
          editable={!isLoading}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
        />

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!query.trim() || isLoading}
          style={styles.button}
          activeOpacity={0.7}
        >
          <Ionicons
            name="search"
            size={20}
            color={
              !query.trim() || isLoading
                ? isDark
                  ? '#40404030'
                  : '#73737330'
                : isDark
                ? '#FFFFFF'
                : '#171717'
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 600,
    position: 'relative',
  },
  glowContainer: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  glow: {
    flex: 1,
    borderRadius: 12,
  },
  glowLight: {
    backgroundColor: '#E5E5E5',
    shadowColor: '#D4D4D4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  glowDark: {
    backgroundColor: '#404040',
    shadowColor: '#737373',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  inputContainerLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5E5', // neutral-200
  },
  inputContainerDark: {
    backgroundColor: '#171717', // neutral-900
    borderColor: '#262626', // neutral-800
  },
  inputFocusedLight: {
    borderColor: '#A3A3A3', // neutral-400
  },
  inputFocusedDark: {
    borderColor: '#525252', // neutral-600
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
  },
  inputTextLight: {
    color: '#171717', // neutral-900
  },
  inputTextDark: {
    color: '#F5F5F5', // neutral-100
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
