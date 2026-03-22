import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    {
      name: 'strip-versioned-imports',
      enforce: 'pre',
      async resolveId(source, importer, options) {
        const match = /^(.*)@(\d[\w.-]*)$/.exec(source);
        if (!match) return null;
        return this.resolve(match[1], importer, { ...options, skipSelf: true });
      },
    },
    react(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/tests/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['src/tests/e2e/**'],
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/',
        'src/tests/',
        'src/components/ui/**',
        'src/components/figma/**',
        'src/components/layouts/**',
        'src/components/*.tsx',
        '__tests__/',
        'e2e/',
        'build/',
        'coverage/',
        '*.config.ts',
        'jest.config.cjs',
        'jest.setup.ts',
        'dist/',
        'public/',
        'flutter/',
        '**/*.d.ts',
        '**/types.ts',
        '**/__tests__/**',
        '**/demo/**',
        '**/ScreenshotDemo.tsx',
        '**/TextScalingDemo.tsx',
        '**/WireframeGenerator.tsx',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@tests': path.resolve(__dirname, './tests'),
      '@components': path.resolve(__dirname, './components'),
      '@contexts': path.resolve(__dirname, './contexts'),
      '@utils': path.resolve(__dirname, './utils'),
      '@pages': path.resolve(__dirname, './pages'),
    },
  },
});
