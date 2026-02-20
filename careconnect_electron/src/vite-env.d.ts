/// <reference types="vite/client" />

interface Window {
  electronAPI: {
    store: {
      get: (key: string) => Promise<any>;
      set: (key: string, value: any) => Promise<boolean>;
      delete: (key: string) => Promise<boolean>;
      clear: () => Promise<boolean>;
    };
  };
}
