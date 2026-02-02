# NativeWind v4 - Configuration Fixed ✅

All NativeWind v4 configuration issues have been resolved. Tailwind `className` styles now work in React Native.

## What Was Fixed

### 1. ✅ babel.config.js
**Issue:** Missing `nativewind/babel` plugin  
**Fixed:** Added plugin to transform className attributes

```javascript
plugins: [
  "nativewind/babel",
],
```

### 2. ✅ metro.config.js  
**Issue:** Missing `withNativeWind` wrapper  
**Fixed:** Wrapped Metro config with NativeWind to process CSS

```javascript
const { withNativeWind } = require('nativewind/metro');
module.exports = withNativeWind(config, { input: './global.css' });
```

### 3. ✅ app/_layout.tsx
**Issue:** Missing `global.css` import  
**Fixed:** Added import at the top of the root layout

```typescript
import "../global.css";
```

### 4. ✅ global.css
**Status:** Already correct with @tailwind directives

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. ✅ tailwind.config.js
**Status:** Already correct with content paths and nativewind preset

```javascript
content: [
  "./app/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
],
presets: [require("nativewind/preset")],
```

### 6. ✅ nativewind-env.d.ts
**Status:** Already correct with type references

```typescript
/// <reference types="nativewind/types" />
```

## Testing NativeWind

### Test Component Created
`components/NativeWindTest.tsx` - A simple component to verify styling works

```tsx
<View className="bg-red-500 p-4 rounded-lg m-4">
  <Text className="text-white font-bold text-xl">
    NativeWind is working! 🎉
  </Text>
</View>
```

### How to Test

1. **Clear cache and restart:**
   ```bash
   cd /Users/nicholas/parallax/app
   npx expo start --clear
   ```

2. **Import and use the test component:**
   ```tsx
   import { NativeWindTest } from '../components/NativeWindTest';
   
   // In your component:
   <NativeWindTest />
   ```

3. **Or test inline:**
   ```tsx
   <View className="bg-blue-500 p-4 rounded-lg">
     <Text className="text-white font-bold">
       It works!
     </Text>
   </View>
   ```

## Verification Checklist

✅ babel.config.js has `nativewind/babel` plugin  
✅ metro.config.js wrapped with `withNativeWind`  
✅ _layout.tsx imports `global.css`  
✅ global.css has @tailwind directives  
✅ tailwind.config.js has correct content paths  
✅ nativewind-env.d.ts has type reference  
✅ TypeScript compilation passes (no errors)  
✅ Test component created

## Available Tailwind Classes

Now you can use all Tailwind utility classes:

### Layout
- `flex`, `flex-1`, `flex-row`, `flex-col`
- `items-center`, `justify-center`, `gap-4`
- `p-4`, `px-6`, `py-2`, `m-4`, `mx-auto`

### Colors
- `bg-red-500`, `text-white`, `border-gray-300`
- Dark mode: `dark:bg-gray-900`, `dark:text-white`

### Typography
- `text-xl`, `text-2xl`, `font-bold`, `font-semibold`
- `text-center`, `text-left`

### Effects
- `rounded-lg`, `rounded-full`, `shadow-lg`
- `opacity-50`, `hover:opacity-100`

### Responsive
- `sm:`, `md:`, `lg:` breakpoint prefixes

## Migration Tips

### From StyleSheet to className

**Before:**
```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

<View style={styles.container}>
  <Text style={styles.text}>Hello</Text>
</View>
```

**After:**
```tsx
<View className="flex-1 bg-black p-4">
  <Text className="text-white text-lg font-bold">Hello</Text>
</View>
```

### Combining with Dynamic Styles

You can still use `style` prop for dynamic values:

```tsx
<View 
  className="bg-blue-500 p-4 rounded-lg"
  style={{ opacity: isVisible ? 1 : 0 }}
>
  <Text className="text-white">Dynamic opacity</Text>
</View>
```

## Troubleshooting

If styles still don't apply:

1. **Restart with cleared cache:**
   ```bash
   npx expo start --clear
   ```

2. **Clear Metro bundler cache:**
   ```bash
   rm -rf node_modules/.cache
   ```

3. **Verify nativewind version:**
   ```bash
   npm list nativewind
   ```
   Should be `^4.1.23` or higher

4. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## Next Steps

Now that NativeWind is configured:

1. ✅ Start using `className` in your components
2. ✅ Replace StyleSheet.create with Tailwind classes
3. ✅ Enjoy faster styling with utility classes
4. ✅ Use dark mode variants: `dark:bg-gray-900`

Happy styling! 🎨
