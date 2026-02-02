# Parallax - Mobile App

Multi-AI research platform built with Expo and React Native.

## Tech Stack

- **Expo SDK 52+** - React Native framework
- **Expo Router v4** - File-based routing
- **NativeWind v4** - Tailwind CSS for React Native
- **TypeScript** - Type safety
- **Zustand** - State management
- **TanStack Query** - Data fetching and caching

## Project Structure

```
app/
├── app/                    # Expo Router (file-based routing)
│   ├── _layout.tsx         # Root layout with providers
│   ├── index.tsx           # Home/Landing page
│   ├── results/[id].tsx    # Research results (dynamic route)
│   ├── about.tsx           # About page
│   └── history.tsx         # Search history
│
├── components/
│   └── ui/                 # Reusable UI components
│
├── lib/
│   ├── api.ts              # API client (FastAPI backend)
│   ├── types.ts            # TypeScript types
│   └── store.ts            # Zustand store
│
└── hooks/
    └── useResearch.ts      # TanStack Query hooks
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on web:
```bash
npm run web
```

4. Run on iOS:
```bash
npm run ios
```

5. Run on Android:
```bash
npm run android
```

## Backend

The app connects to a FastAPI backend running at:
- **Local**: http://localhost:8000/api/v1

## Development

### Adding New Pages

Create a new file in `app/` directory:
- `app/new-page.tsx` → `/new-page` route
- `app/folder/page.tsx` → `/folder/page` route

### Using Tailwind

NativeWind v4 is configured. Use `className` prop:

```tsx
<View className="bg-black p-4 rounded-lg">
  <Text className="text-white text-xl font-bold">
    Hello Parallax
  </Text>
</View>
```

### API Calls

Use the provided hooks:

```tsx
import { useResearch } from '@/hooks/useResearch';

function Component() {
  const { data, isLoading } = useResearch(id);
  // ...
}
```

### State Management

Use Zustand store:

```tsx
import { useAppStore } from '@/lib/store';

function Component() {
  const { recentSearches, addRecentSearch } = useAppStore();
  // ...
}
```

## Configuration

- **Expo Config**: `app.json`
- **Tailwind Config**: `tailwind.config.js`
- **TypeScript Config**: `tsconfig.json`
- **Babel Config**: `babel.config.js`
- **Metro Config**: `metro.config.js` (NativeWind)

## Next Steps

1. ✅ Foundation setup complete
2. Add v0 UI components to `components/ui/`
3. Implement search functionality
4. Connect to FastAPI backend
5. Add multi-AI research views
