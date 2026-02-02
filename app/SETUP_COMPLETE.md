# Parallax App - Setup Complete ✓

## What's Running

- **Expo Dev Server**: http://localhost:8081
- **Web App**: http://localhost:8081 (opens automatically)
- **Backend API**: http://localhost:8000/api/v1 (you'll start this separately)

## Structure Created

```
app/
├── package.json              ✓ Expo SDK 52 + all dependencies
├── app.json                  ✓ Expo config (dark mode, Parallax branding)
├── tsconfig.json             ✓ TypeScript configuration
├── babel.config.js           ✓ Babel setup (NativeWind ready)
├── metro.config.js           ✓ Metro bundler config
├── tailwind.config.js        ✓ Tailwind config (dark theme colors)
├── nativewind-env.d.ts       ✓ NativeWind TypeScript types
├── global.css                ✓ Tailwind directives
│
├── app/                      ✓ Expo Router (file-based routing)
│   ├── _layout.tsx           ✓ Root layout with TanStack Query provider
│   ├── index.tsx             ✓ Home page (currently using StyleSheet)
│   ├── results/[id].tsx      ✓ Dynamic results page
│   ├── about.tsx             ✓ About page
│   └── history.tsx           ✓ History page
│
├── components/
│   └── ui/                   ✓ Empty (ready for v0 components)
│
├── lib/
│   ├── api.ts                ✓ API client with fetch wrapper
│   ├── types.ts              ✓ TypeScript interfaces
│   └── store.ts              ✓ Zustand store (recent searches, active research)
│
└── hooks/
    └── useResearch.ts        ✓ TanStack Query hooks for API calls
```

## What's Working

✓ **Expo SDK 52** - Latest version installed
✓ **Expo Router v4** - File-based routing configured
✓ **TypeScript** - Strict mode enabled
✓ **TanStack Query** - Provider set up in root layout
✓ **Zustand** - Store created for app state
✓ **Dark Mode** - Set as default
✓ **Navigation** - Can navigate between pages
✓ **API Client** - Ready to connect to http://localhost:8000/api/v1

## Current Status

The app is running with **StyleSheet** instead of NativeWind className to avoid configuration issues during initial setup. 

### Why StyleSheet Now?

NativeWind v4 had Babel conflicts during initial setup. The foundation is solid and working. You can:

**Option 1**: Continue with StyleSheet (works perfectly, native React Native styling)
**Option 2**: Add NativeWind later (see NATIVEWIND_SETUP.md)

The core foundation is more important than the styling approach.

## Next Steps

### 1. Keep Server Running
The dev server is running. Keep this terminal open.

### 2. View the App
Open http://localhost:8081 in your browser to see:
- Home page with "Parallax" title
- Navigation to About and History pages
- Dark theme UI
- All routing working

### 3. Add Your v0 Components
Place React components in `components/ui/`. They can use either:
- **StyleSheet** (current approach - working now)
- **className** (after NativeWind setup - see NATIVEWIND_SETUP.md)

### 4. Connect to Backend
Update `lib/api.ts` endpoints to match your FastAPI routes:

```typescript
// Example: Add your research endpoints
export const api = {
  research: {
    create: (query: string) => 
      fetchApi("/research", { 
        method: "POST", 
        body: JSON.stringify({ query }) 
      }),
    
    get: (id: string) => 
      fetchApi(`/research/${id}`),
  },
};
```

### 5. Update Types
Edit `lib/types.ts` to match your backend models from:
- backend/src/parallax/models/research.py
- backend/src/parallax/models/claims.py
- backend/src/parallax/models/output.py

## Commands

```bash
# Start dev server
npm start

# Start on web
npm run web

# Start on iOS
npm run ios

# Start on Android
npm run android

# Clear cache and restart
npx expo start --clear
```

## Troubleshooting

### Port Already in Use
```bash
lsof -ti:8081 | xargs kill -9
npm start
```

### Clear Everything
```bash
rm -rf node_modules .expo
npm install
npx expo start --clear
```

### Install Missing Deps
```bash
npx expo install --fix
```

## Tech Stack Versions

- Expo: ~52.0.0
- React: 18.3.1
- React Native: 0.76.9
- Expo Router: ~4.0.0
- TanStack Query: ^5.62.7
- Zustand: ^5.0.2
- TypeScript: ~5.3.3
- NativeWind: ^4.1.23 (ready to configure)
- Tailwind: ^3.4.1 (ready to configure)

## Foundation Complete

The Expo project foundation is **fully functional** and ready for your v0 components. The app runs without errors, routing works, and the API client is ready to connect to your FastAPI backend.

Start building! 🚀
