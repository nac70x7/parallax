# NativeWind v4 Setup Guide

The foundation is running without NativeWind to avoid configuration issues. Follow these steps to add NativeWind v4 properly:

## Step 1: Update babel.config.js

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
    ],
  };
};
```

## Step 2: Update metro.config.js

```javascript
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
```

## Step 3: Update app/_layout.tsx

Add this import at the top:

```typescript
import "../global.css";
```

## Step 4: Convert Components

Replace `StyleSheet` with `className`:

### Before (StyleSheet):
```tsx
<View style={styles.container}>
  <Text style={styles.title}>Hello</Text>
</View>

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  title: { color: "#ffffff", fontSize: 24 }
});
```

### After (NativeWind):
```tsx
<View className="flex-1 bg-black">
  <Text className="text-white text-2xl">Hello</Text>
</View>
```

## Step 5: Clear Cache and Restart

```bash
npx expo start --web --clear
```

## Common Issues

1. **".plugins is not a valid Plugin property"**
   - Make sure you're using the latest nativewind@^4.1.23
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`

2. **className not working**
   - Verify global.css is imported in _layout.tsx
   - Check metro.config.js has withNativeWind wrapper
   - Restart dev server with --clear flag

3. **TypeScript errors**
   - Ensure nativewind-env.d.ts exists and is included in tsconfig.json

## Testing

Once set up, test with:

```tsx
<View className="bg-blue-500 p-4 rounded-lg">
  <Text className="text-white font-bold">
    NativeWind is working!
  </Text>
</View>
```

If you see proper styling, NativeWind is configured correctly.
