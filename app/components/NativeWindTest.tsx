import React from 'react';
import { View, Text } from 'react-native';

export function NativeWindTest() {
  return (
    <View className="bg-red-500 p-4 rounded-lg m-4">
      <Text className="text-white font-bold text-xl mb-2">
        NativeWind is working! 🎉
      </Text>
      <Text className="text-white text-sm">
        If you see a red background with white text, Tailwind classes are being applied correctly.
      </Text>
      <View className="bg-blue-600 p-3 rounded mt-4">
        <Text className="text-yellow-300 font-semibold">
          Nested styles work too!
        </Text>
      </View>
    </View>
  );
}
