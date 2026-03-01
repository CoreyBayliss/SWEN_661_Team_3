import { AppProvider } from './context/AppContext';
import { Root } from './components/Root';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Suspense } from 'react';
import { Toaster } from './components/ui/sonner';

// CareConnect - Desktop Healthcare Application
function App() {
  return (
    <div id="careconnect-app" className="w-full h-full overflow-hidden">
      <ErrorBoundary>
        <Suspense fallback={
          <div className="h-screen bg-gray-900 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl animate-pulse flex items-center justify-center shadow-2xl">
                <span className="text-white text-4xl font-bold">CC</span>
              </div>
              <div className="text-center">
                <p className="text-white text-lg font-medium mb-1">CareConnect</p>
                <p className="text-gray-400 text-sm">Loading desktop application...</p>
              </div>
              <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 animate-[loading_2s_ease-in-out_infinite]" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
        }>
          <AppProvider>
            <Root />
            <Toaster />
          </AppProvider>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
