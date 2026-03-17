import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '*.config.ts',
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
      thresholds: {
        statements: 85,
        branches: 80,
        functions: 85,
        lines: 85,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@components': path.resolve(__dirname, './components'),
      '@contexts': path.resolve(__dirname, './contexts'),
      '@utils': path.resolve(__dirname, './utils'),
      '@pages': path.resolve(__dirname, './pages'),
    },
  },
});
