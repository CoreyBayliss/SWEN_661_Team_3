import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Vitest compatibility shim for copied tests
(globalThis as any).vi = {
  fn: jest.fn.bind(jest),
  spyOn: jest.spyOn.bind(jest),
  clearAllMocks: jest.clearAllMocks.bind(jest),
  useFakeTimers: jest.useFakeTimers.bind(jest),
  useRealTimers: jest.useRealTimers.bind(jest),
  advanceTimersByTime: jest.advanceTimersByTime.bind(jest),
};

// Mock window.electron API
(globalThis as any).window = (globalThis as any).window || {};
(globalThis as any).window.electron = {
  store: {
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
    clear: jest.fn(),
  },
} as any;
