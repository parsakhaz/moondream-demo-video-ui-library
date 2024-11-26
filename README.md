# Moondream Video Component Library

A specialized open source UI component library designed for video content creators, featuring animated components with chroma key backgrounds for easy integration into video productions.

## 🎯 Features

- **Chroma Key Ready**: All components render on a pure blue (#0000FF) background for easy keying
- **Live Configuration**: Real-time component configuration with JSON editor
- **Persistent Settings**: Configurations automatically save to localStorage
- **Responsive Design**: Works across all screen sizes
- **Documentation System**: Built-in documentation with Next.js routing
- **Type Safety**: Full TypeScript support throughout the project

## 🚀 Video Production Features

### Chroma Keying

- Pure blue background (#0000FF) optimized for keying
- Clean edges for better masking
- Consistent color throughout components
- No color bleeding into component UI

### Animation Control

- Reset animations on demand
- Configurable animation speeds
- Smooth 60fps animations
- Predictable animation loops

### Recording Tips

- Use high-quality screen recording software
- Record at 60fps minimum
- Use lossless codec if possible
- Consider recording at 2x resolution

## 🔧 Technical Details

### State Management

```typescript
// Example of using the Config Context
import { useConfig } from "@/context/ConfigContext";

function MyComponent() {
  const { config, updateConfig } = useConfig();

  // Access configuration
  const { typingSpeed } = config.terminal;

  // Update configuration
  const handleSpeedChange = (speed: number) => {
    updateConfig({
      ...config,
      terminal: {
        ...config.terminal,
        typingSpeed: speed,
      },
    });
  };
}
```

### Component Architecture

```typescript
// Example of creating a new demo component
import type { DemoComponent } from '@/types/demo';

const NewDemo: DemoComponent = () => {
  const { config } = useConfig();

  return (
    <MacWindow className='max-w-2xl'>
      {/* Component content */}
    </MacWindow>
  );
};

NewDemo.title = "My New Demo";

export default NewDemo;
```

### Configuration System

```typescript
// Example configuration type
interface Config {
  terminal: {
    commands: string[];
    prompt: string;
    typingSpeed: number;
    deleteSpeed: number;
  };
  codeEditor: {
    code: string;
    language: string;
    theme: string;
  };
  // Add new component configs here
}
```

## 🎨 Styling System

### Tailwind Utilities

```css
/* Custom utility classes */
.text-gradient {
  @apply bg-clip-text text-transparent bg-gradient-to-r 
    from-white via-white/90 to-white/80;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
```

### Animation Presets

```typescript
// Common animation variants
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
};

const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6 },
};
```

## 🛠️ Development Workflow

### Component Development

1. Create component file in `src/components/demos/`
2. Add configuration interface to `ConfigContext.tsx`
3. Add component to `demos` array
4. Create documentation
5. Test animations
6. Verify chroma key compatibility

### Testing

- Visual testing for animations
- Configuration persistence testing
- Mobile responsiveness
- Cross-browser compatibility
- Performance monitoring

### Performance Considerations

- Lazy load components
- Optimize animations
- Minimize re-renders
- Use proper memoization
- Monitor bundle size

## 📱 Responsive Design

### Breakpoints

```typescript
// Tailwind breakpoints used
sm: '640px'   // Small devices
md: '768px'   // Medium devices
lg: '1024px'  // Large devices
xl: '1280px'  // Extra large devices
2xl: '1536px' // 2X Extra large devices
```

### Mobile Considerations

- Touch-friendly controls
- Appropriate text sizes
- Optimized animations
- Proper spacing
- Gesture support

## 🔒 Security

### Local Storage

- Configuration validation
- JSON sanitization
- Size limits
- Error handling
- Default fallbacks

### Input Sanitization

- Code editor input validation
- Command injection prevention
- XSS protection
- Safe JSON parsing

## 🚀 Deployment

### Build Process

```bash
# Production build
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

### Environment Variables

```env
NEXT_PUBLIC_APP_URL=your-url
NEXT_PUBLIC_API_URL=api-url
```

## 📚 Additional Resources

### Useful Links

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### Video Editing Software Compatibility

- Adobe Premiere Pro
- Final Cut Pro
- DaVinci Resolve
- OBS Studio
- Camtasia

## 🎨 Components

### Terminal Animation

- Configurable typing speed
- Custom prompt
- Editable command list
- Real-time updates
- JetBrains Mono font

### Interactive Typewriter

- Category-based commands
  - Object Detection
  - Visual Q&A
  - Image Captioning
- Enter key interaction
- Real-time configuration
- Smooth animations

### Code Editor

- Syntax highlighting
- Line numbers
- Hover effects
- Configurable code content
- Typing animation

## ⚙️ Configuration

Each component can be configured through the UI:

1. Click the "Edit Config" button next to any component
2. Modify the JSON configuration
3. Save changes to see immediate updates

### Terminal Configuration

```json
{
  "commands": ["detect: \"trucks\"", "detect: \"cars\"", "detect: \"faces\""],
  "prompt": "$",
  "typingSpeed": 75,
  "deleteSpeed": 50
}
```

### Code Editor Configuration

```json
{
  "code": "function animate() {\n  // Your code here\n}",
  "language": "javascript",
  "theme": "dark"
}
```

## 📁 Project Structure

```
src/
├── components/
│   ├── demos/           # Component demonstrations
│   │   ├── TerminalDemo.tsx
│   │   └── CodeBlockDemo.tsx
│   ├── ui/             # Shared UI components
│   │   ├── Search.tsx
│   │   └── ConfigEditor.tsx
│   └── DocsLayout.tsx  # Main layout component
├── context/
│   └── ConfigContext.tsx # Global configuration state
├── pages/
│   ├── docs/           # Documentation pages
│   │   ├── overview.tsx
│   │   ├── installation.tsx
│   │   └── usage.tsx
│   └── index.tsx       # Main component showcase
└── styles/
    └── globals.css     # Global styles and utilities
```

## 🎬 Recording Components

1. Enable desired components using the sidebar toggles
2. Position your recording software to capture the component area
3. Use the "Reset Animations" button to restart animations
4. Key out the blue background (#0000FF) in your video editor

## 🛠️ Development

### Adding New Components

1. Create component in `src/components/demos/`
2. Add configuration schema to `ConfigContext.tsx`
3. Add component to `demos` array in `src/components/demos/index.ts`
4. Implement config integration using `useConfig` hook

### Best Practices

- Keep animations smooth (60fps)
- Maintain chroma key compatibility
- Implement real-time configuration updates
- Add proper TypeScript types
- Follow existing component patterns

## 📦 Technologies

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- React Context

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE.md

## 🔧 Component Configuration System

### Configuration Structure

Each component must have its configuration defined in three places:

1. **Type Definition** (ConfigContext.tsx):

```typescript
interface Config {
  componentName: {
    // Required base settings
    content: ContentType[];
    // Animation settings
    animations: {
      duration: number;
      delay: number;
      // ... other animation properties
    };
    // Visual settings
    style: {
      colors: string;
      spacing: number;
      // ... other style properties
    };
  };
}
```

2. **Default Values** (config/defaults.ts):

```typescript
export const defaultConfig = {
  componentName: {
    content: [...],
    animations: {
      duration: 300,
      delay: 0.2,
    },
    style: {
      colors: '#ffffff',
      spacing: 8,
    }
  }
};
```

3. **Component Implementation**:

```typescript
const MyComponent: DemoComponent = () => {
  const { config } = useConfig();

  // Safely access config with fallback to defaults
  const {
    animations: { duration, delay },
    style: { colors, spacing }
  } = config?.componentName || defaultConfig.componentName;

  return (
    <MacWindow>
      <motion.div
        animate={{ duration, delay }}
        style={{ color: colors, gap: spacing }}
      >
        {/* Component content */}
      </motion.div>
    </MacWindow>
  );
};
```

### Real-time Configuration

Components can be configured through the UI:

1. Click "Edit Config" next to component title
2. Modify the JSON configuration
3. Changes are applied immediately
4. Settings persist in localStorage

### Configuration Categories

Each component should organize its config into these sections:

- **Content**: Component-specific data (commands, items, etc.)
- **Animations**: Timing, transitions, and motion settings
- **Style**: Visual properties (colors, spacing, dimensions)

### Example Configuration

```json
{
  "commandPalette": {
    "commands": [
      {
        "id": "1",
        "title": "New File",
        "icon": "📄"
      }
    ],
    "animations": {
      "searchInputDelay": 0.2,
      "itemStaggerDelay": 0.05,
      "hoverTransitionDuration": 0.2
    },
    "style": {
      "maxHeight": "400px",
      "backgroundColor": "rgba(0, 0, 0, 0.5)"
    }
  }
}
```

## ⚡ Performance

### Client-Side Rendering

This library is optimized for client-side rendering to ensure smooth animations and consistent behavior:

- No server-side rendering
- No hydration mismatches
- Consistent animation timing
- Better performance for complex animations

### Implementation

```typescript
// ClientOnly wrapper ensures consistent rendering
"use client";

function MyComponent() {
  // Your component code
}
```

### Configuration

```javascript
// next.config.mjs
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    runtime: "edge",
  },
  unstable_runtimeJS: true,
  unstable_JsPreload: false,
};
```
