# Parallax UI Components

React Native component library converted from the v0 web components. All components maintain the same visual design with dark mode support, glass effects, glows, and depth.

## Components

### 1. ConfidenceBadge
Badge component showing confidence levels (HIGH, MEDIUM, LOW, CONFLICTED) with appropriate styling.

```tsx
import { ConfidenceBadge } from './ui';

<ConfidenceBadge level="HIGH" />
```

### 2. EngineStatus
Status indicators for research engines showing contributed, failed, or pending states.

```tsx
import { EngineStatus } from './ui';

<EngineStatus engines={[
  { name: 'Perplexity', status: 'contributed' },
  { name: 'Kimi', status: 'pending' }
]} />
```

### 3. LoadingState
Animated loading skeleton with rotating engine names and pulsing cards.

```tsx
import { LoadingState } from './ui';

<LoadingState engines={['Perplexity', 'Kimi', 'Gemini', 'OpenAI']} />
```

### 4. ModeSelector
Segmented control for selecting research mode (Quick, Standard, Deep).

```tsx
import { ModeSelector } from './ui';

<ModeSelector 
  defaultMode="standard"
  onChange={(mode) => console.log(mode)}
/>
```

### 5. SearchBar
Search input with animated gradient glow on focus.

```tsx
import { SearchBar } from './ui';

<SearchBar 
  onSubmit={(query) => console.log(query)}
  placeholder="What do you want to research?"
  isLoading={false}
/>
```

### 6. SourceList
List of sources with favicons, titles, and external link icons.

```tsx
import { SourceList } from './ui';

<SourceList sources={[
  { title: 'Article Title', url: 'https://example.com', domain: 'example.com' }
]} />
```

### 7. ResultCard
Card displaying research results with confidence badge and sources.

```tsx
import { ResultCard } from './ui';

<ResultCard 
  claim="Research finding..."
  confidence="HIGH"
  engines={['Perplexity', 'Gemini']}
  sources={[...]}
/>
```

### 8. ConflictCard
Card showing conflicting positions from different engines with pulsing border.

```tsx
import { ConflictCard } from './ui';

<ConflictCard 
  topic="Topic with conflicting views"
  positions={[
    { engine: 'Perplexity', position: 'View A', citation: {...} }
  ]}
  resolutionHint="Further research needed"
/>
```

### 9. LandingHero
Full-screen hero section with animated 3D network background.

```tsx
import { LandingHero } from './ui';

<LandingHero onSearch={(query) => console.log(query)} />
```

## Dependencies Required

Install these packages in your React Native project:

```bash
npm install react-native-svg @expo/vector-icons
# or
yarn add react-native-svg @expo/vector-icons
```

## Notes

- All components support dark mode via `useColorScheme()`
- Components use native animations (`Animated` API) for performance
- SVG components use `react-native-svg` for the network visualization
- Icons use `@expo/vector-icons` (Ionicons)
- No placeholder image is included - you'll need to add one for `source-list.tsx` or remove that line

## Color Palette

The components use a neutral color palette:

- **Light Mode**: White backgrounds, dark text, neutral grays
- **Dark Mode**: Black/dark gray backgrounds, white text, inverted contrast

All colors follow the Tailwind neutral palette:
- neutral-50: #FAFAFA
- neutral-100: #F5F5F5
- neutral-200: #E5E5E5
- neutral-300: #D4D4D4
- neutral-400: #A3A3A3
- neutral-500: #737373
- neutral-600: #525252
- neutral-700: #404040
- neutral-800: #262626
- neutral-900: #171717

## Glass Effects & Depth

Components use:
- Semi-transparent backgrounds with backdrop blur
- Layered shadows for depth
- Animated glows and pulses
- 3D positioning in the network background
