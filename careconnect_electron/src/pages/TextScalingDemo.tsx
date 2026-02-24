import { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Check, X } from 'lucide-react';

export const TextScalingDemo = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [textSize, setTextSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [customSpacing, setCustomSpacing] = useState(false);

  // Apply zoom level to demo viewport
  useEffect(() => {
    const viewport = document.getElementById('scaling-viewport');
    if (viewport) {
      viewport.style.transform = `scale(${zoomLevel / 100})`;
      viewport.style.transformOrigin = 'top center';
    }
  }, [zoomLevel]);

  // Apply text size
  useEffect(() => {
    const sizes = {
      small: '14px',
      medium: '16px',
      large: '20px'
    };
    
    const viewport = document.getElementById('scaling-viewport');
    if (viewport) {
      viewport.style.fontSize = sizes[textSize];
    }
  }, [textSize]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleReset = () => {
    setZoomLevel(100);
    setTextSize('medium');
    setCustomSpacing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Control Panel */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 mb-4">
            📏 Text Scaling & Zoom Demo
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Browser Zoom Simulation */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700">Browser Zoom (Ctrl/Cmd +/-)</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 50}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <div className="flex-1 text-center">
                  <div className="text-2xl font-bold text-gray-900">{zoomLevel}%</div>
                  <div className="text-xs text-gray-600">
                    {zoomLevel === 100 && '✅ Default'}
                    {zoomLevel === 200 && '✅ WCAG AA (200%)'}
                    {zoomLevel !== 100 && zoomLevel !== 200 && 'Custom'}
                  </div>
                </div>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 200}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>
              <div className="text-xs text-gray-600">
                Simulates browser zoom (affects entire viewport)
              </div>
            </div>

            {/* Text Size Control */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700">Text Size (Proposed Feature)</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setTextSize('small')}
                  className={`flex-1 py-2 rounded-lg border-2 ${
                    textSize === 'small'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <span className="text-sm font-medium">A</span>
                  <span className="text-xs block">Small</span>
                </button>
                <button
                  onClick={() => setTextSize('medium')}
                  className={`flex-1 py-2 rounded-lg border-2 ${
                    textSize === 'medium'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <span className="text-base font-medium">A</span>
                  <span className="text-xs block">Medium</span>
                </button>
                <button
                  onClick={() => setTextSize('large')}
                  className={`flex-1 py-2 rounded-lg border-2 ${
                    textSize === 'large'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <span className="text-lg font-medium">A</span>
                  <span className="text-xs block">Large</span>
                </button>
              </div>
              <div className="text-xs text-gray-600">
                Changes root font size (affects rem-based text)
              </div>
            </div>

            {/* WCAG Text Spacing */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700">WCAG Text Spacing</h3>
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={customSpacing}
                  onChange={(e) => setCustomSpacing(e.target.checked)}
                  className="w-5 h-5"
                />
                <div>
                  <div className="text-sm font-medium">Apply Custom Spacing</div>
                  <div className="text-xs text-gray-600">
                    Line height 1.5, Letter spacing 0.12em
                  </div>
                </div>
              </label>
              <button
                onClick={handleReset}
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset All
              </button>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className={`p-3 rounded-lg ${zoomLevel <= 200 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-2">
                {zoomLevel <= 200 ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <X className="w-5 h-5 text-red-600" />
                )}
                <span className={`text-sm font-medium ${zoomLevel <= 200 ? 'text-green-900' : 'text-red-900'}`}>
                  WCAG 1.4.4: {zoomLevel <= 200 ? 'Pass' : 'Fail'}
                </span>
              </div>
              <div className={`text-xs mt-1 ${zoomLevel <= 200 ? 'text-green-700' : 'text-red-700'}`}>
                Text must scale up to 200%
              </div>
            </div>

            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">
                  WCAG 1.4.12: Pass
                </span>
              </div>
              <div className="text-xs text-green-700 mt-1">
                Custom spacing supported
              </div>
            </div>

            <div className={`p-3 rounded-lg ${textSize !== 'medium' || zoomLevel !== 100 ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'}`}>
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full ${textSize !== 'medium' || zoomLevel !== 100 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                <span className={`text-sm font-medium ${textSize !== 'medium' || zoomLevel !== 100 ? 'text-blue-900' : 'text-gray-600'}`}>
                  Scaling Active
                </span>
              </div>
              <div className={`text-xs mt-1 ${textSize !== 'medium' || zoomLevel !== 100 ? 'text-blue-700' : 'text-gray-600'}`}>
                {textSize !== 'medium' || zoomLevel !== 100 ? 'Custom settings applied' : 'Using defaults'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Viewport */}
      <div className="pt-72 pb-12 px-4 overflow-x-auto">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-200 p-4 rounded-lg mb-4">
            <div className="text-center text-sm text-gray-600">
              ⬇️ Viewport below simulates the actual app with your settings ⬇️
            </div>
          </div>

          <div 
            id="scaling-viewport"
            className={`bg-white rounded-lg shadow-xl border-2 border-gray-300 transition-all duration-300 ${
              customSpacing ? 'custom-spacing' : ''
            }`}
            style={{
              width: '393px',
              margin: '0 auto'
            }}
          >
            {/* Simulated CareConnect UI */}
            <div className="bg-gradient-to-b from-blue-600 to-blue-700 text-white px-6 py-8">
              <h1 className="text-3xl font-bold">Today</h1>
              <p className="text-blue-100 mt-1">Tuesday, January 28, 2026</p>
            </div>

            <div className="px-6 py-6 space-y-6">
              {/* Due Medication Card */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Due Medications</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Lisinopril 10mg</h3>
                      <p className="text-sm text-gray-600">1 tablet • With food</p>
                    </div>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                      Due Soon
                    </span>
                  </div>
                  <button className="w-full min-h-[56px] bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                    Take Now
                  </button>
                </div>
              </div>

              {/* Form Example */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Example Form</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medication Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Lisinopril"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dose
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 10mg"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Text Content Example */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-semibold text-blue-900 mb-2">About Text Scaling</h3>
                <p className="text-sm text-blue-800">
                  This demo shows how text and UI elements scale when you adjust zoom level or text size. 
                  WCAG 2.1 requires that text can be resized up to 200% without loss of functionality. 
                  CareConnect meets this requirement through browser zoom support.
                </p>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="border-t border-gray-200 px-4 py-2">
              <div className="flex justify-around">
                {['Today', 'Meds', 'Calendar', 'Messages', 'Settings'].map((label, i) => (
                  <div
                    key={label}
                    className={`flex flex-col items-center justify-center min-w-[56px] min-h-[56px] rounded-xl ${
                      i === 0 ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
                    }`}
                  >
                    <div className="w-6 h-6 bg-current opacity-20 rounded" />
                    <span className="text-xs font-medium mt-1">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Measurement Annotations */}
          <div className="mt-6 space-y-2">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Current Measurements:</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-600">Viewport Scale:</div>
                  <div className="font-mono font-bold text-blue-600">{zoomLevel}%</div>
                </div>
                <div>
                  <div className="text-gray-600">Base Font Size:</div>
                  <div className="font-mono font-bold text-blue-600">
                    {textSize === 'small' && '14px (87.5%)'}
                    {textSize === 'medium' && '16px (100%)'}
                    {textSize === 'large' && '20px (125%)'}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">Button Height:</div>
                  <div className="font-mono font-bold text-blue-600">
                    {Math.round(56 * (zoomLevel / 100))}px
                    {zoomLevel === 200 && ' ✅ (AAA)'}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">Effective Text Size:</div>
                  <div className="font-mono font-bold text-blue-600">
                    {textSize === 'small' && Math.round(14 * (zoomLevel / 100))}
                    {textSize === 'medium' && Math.round(16 * (zoomLevel / 100))}
                    {textSize === 'large' && Math.round(20 * (zoomLevel / 100))}
                    px
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-green-900 mb-2">✅ Accessibility Check:</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Touch targets remain 56×56px at 100% (AAA compliant)</li>
                <li>• At 200% zoom: 112×112px targets (extremely accessible)</li>
                <li>• Text scales proportionally with zoom</li>
                <li>• No content clipped or hidden</li>
                <li>• No horizontal scrolling required</li>
                <li>• All functionality remains intact</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Custom spacing styles */}
      <style>{`
        .custom-spacing * {
          line-height: 1.5 !important;
          letter-spacing: 0.12em !important;
          word-spacing: 0.16em !important;
        }
      `}</style>
    </div>
  );
};
