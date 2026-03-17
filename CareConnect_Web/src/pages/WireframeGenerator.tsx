import { useState } from 'react';
import { Download } from 'lucide-react';

export const WireframeGenerator = () => {
  const [selectedScreen, setSelectedScreen] = useState('today');
  const [wireframeStyle, setWireframeStyle] = useState<'sketch' | 'minimal' | 'detailed'>('minimal');
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(false);

  const screens = [
    { id: 'today', name: 'Today View', component: TodayWireframe },
    { id: 'medications', name: 'Medications List', component: MedicationsWireframe },
    { id: 'add-medication', name: 'Add Medication', component: AddMedicationWireframe },
    { id: 'medication-detail', name: 'Medication Detail', component: MedicationDetailWireframe },
    { id: 'refill', name: 'Refill Request', component: RefillWireframe },
    { id: 'calendar', name: 'Calendar', component: CalendarWireframe },
    { id: 'messages', name: 'Messages', component: MessagesWireframe },
    { id: 'settings', name: 'Settings', component: SettingsWireframe },
    { id: 'login', name: 'Login', component: LoginWireframe },
    { id: 'onboarding', name: 'Onboarding', component: OnboardingWireframe },
  ];

  const currentScreen = screens.find(s => s.id === selectedScreen);
  const WireframeComponent = currentScreen?.component;

  const exportAsSVG = () => {
    const svg = document.getElementById('wireframe-canvas');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedScreen}-wireframe.svg`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Control Panel */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">🎨 CareConnect Wireframe Generator</h1>
              <p className="text-sm text-gray-600">Create professional wireframes instantly</p>
            </div>

            <button
              onClick={exportAsSVG}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export SVG
            </button>
          </div>

          {/* Controls */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Screen</label>
              <select
                value={selectedScreen}
                onChange={(e) => setSelectedScreen(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {screens.map(screen => (
                  <option key={screen.id} value={screen.id}>{screen.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Wireframe Style</label>
              <select
                value={wireframeStyle}
                onChange={(e) => setWireframeStyle(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="sketch">Sketch Style</option>
                <option value="minimal">Minimal (Clean)</option>
                <option value="detailed">Detailed</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={showAnnotations}
                  onChange={(e) => setShowAnnotations(e.target.checked)}
                  className="w-4 h-4"
                />
                Show Annotations
              </label>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={showMeasurements}
                  onChange={(e) => setShowMeasurements(e.target.checked)}
                  className="w-4 h-4"
                />
                Show Measurements
              </label>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>💡 Tip:</strong> Right-click → "Capture node screenshot" on the wireframe to export as PNG. 
              Or click "Export SVG" to download as vector for Figma/Sketch.
            </p>
          </div>
        </div>
      </div>

      {/* Wireframe Canvas */}
      <div className="pt-64 pb-12 px-4">
        <div className="max-w-md mx-auto">
          <div id="wireframe-canvas" className="bg-white rounded-lg shadow-xl border-2 border-gray-300">
            {WireframeComponent && (
              <WireframeComponent 
                style={wireframeStyle}
                showAnnotations={showAnnotations}
                showMeasurements={showMeasurements}
              />
            )}
          </div>

          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{currentScreen?.name}</h2>
            <p className="text-sm text-gray-600">
              Style: <span className="font-medium capitalize">{wireframeStyle}</span> | 
              Annotations: <span className="font-medium">{showAnnotations ? 'On' : 'Off'}</span> |
              Measurements: <span className="font-medium">{showMeasurements ? 'On' : 'Off'}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wireframe Component Props
interface WireframeProps {
  style: 'sketch' | 'minimal' | 'detailed';
  showAnnotations: boolean;
  showMeasurements: boolean;
}

// Reusable Wireframe Components
const WireframeBox = ({ 
  className = '', 
  style, 
  label, 
  height = 'h-12',
  annotation
}: { 
  className?: string; 
  style: WireframeProps['style']; 
  label?: string;
  height?: string;
  annotation?: string;
}) => {
  const borderStyle = style === 'sketch' 
    ? 'border-2 border-gray-400 border-dashed' 
    : 'border-2 border-gray-300';
  
  return (
    <div className="relative">
      <div className={`${borderStyle} ${height} ${className} bg-gray-50 rounded flex items-center justify-center`}>
        {label && (
          <span className="text-xs text-gray-500 font-mono uppercase">{label}</span>
        )}
      </div>
      {annotation && (
        <div className="absolute -right-2 top-0 translate-x-full ml-2 text-xs text-blue-600 font-medium whitespace-nowrap">
          {annotation}
        </div>
      )}
    </div>
  );
};

const WireframeText = ({ 
  lines = 1, 
  style,
  width = 'w-full'
}: { 
  lines?: number; 
  style: WireframeProps['style'];
  width?: string;
}) => {
  const lineStyle = style === 'sketch' 
    ? 'h-2 bg-gray-400 rounded-sm' 
    : 'h-2 bg-gray-300 rounded';
  
  return (
    <div className={`space-y-1 ${width}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className={lineStyle}
          style={{ width: i === lines - 1 && lines > 1 ? '70%' : '100%' }}
        />
      ))}
    </div>
  );
};

const WireframeButton = ({ 
  label, 
  style,
  variant = 'primary',
  annotation
}: { 
  label: string; 
  style: WireframeProps['style'];
  variant?: 'primary' | 'secondary';
  annotation?: string;
}) => {
  const buttonStyle = style === 'sketch'
    ? 'border-2 border-gray-900 border-dashed bg-gray-100'
    : variant === 'primary'
    ? 'bg-gray-900 text-white border-2 border-gray-900'
    : 'border-2 border-gray-300 bg-white';

  return (
    <div className="relative">
      <div className={`h-14 ${buttonStyle} rounded-lg flex items-center justify-center`}>
        <span className={`text-sm font-semibold ${variant === 'primary' && style !== 'sketch' ? 'text-white' : 'text-gray-700'}`}>
          {label}
        </span>
      </div>
      {annotation && (
        <div className="absolute -right-2 top-0 translate-x-full ml-2 text-xs text-blue-600 font-medium whitespace-nowrap">
          {annotation}
        </div>
      )}
    </div>
  );
};

const WireframeIcon = ({ 
  size = 'w-6 h-6',
  style
}: { 
  size?: string;
  style: WireframeProps['style'];
}) => {
  const iconStyle = style === 'sketch'
    ? 'border-2 border-gray-400 border-dashed bg-gray-100'
    : 'border-2 border-gray-300 bg-gray-50';

  return (
    <div className={`${size} ${iconStyle} rounded`} />
  );
};

const WireframeInput = ({ 
  label,
  placeholder,
  style,
  annotation
}: { 
  label: string;
  placeholder: string;
  style: WireframeProps['style'];
  annotation?: string;
}) => {
  const inputStyle = style === 'sketch'
    ? 'border-2 border-gray-400 border-dashed'
    : 'border-2 border-gray-300';

  return (
    <div className="space-y-2 relative">
      <div className="text-xs font-semibold text-gray-700">{label}</div>
      <div className={`h-12 ${inputStyle} rounded-lg px-3 flex items-center bg-white`}>
        <span className="text-xs text-gray-400">{placeholder}</span>
      </div>
      {annotation && (
        <div className="absolute -right-2 top-0 translate-x-full ml-2 text-xs text-blue-600 font-medium whitespace-nowrap">
          {annotation}
        </div>
      )}
    </div>
  );
};

const Measurement = ({ value, orientation = 'vertical' }: { value: string; orientation?: 'vertical' | 'horizontal' }) => {
  if (orientation === 'vertical') {
    return (
      <div className="absolute left-0 top-0 bottom-0 -translate-x-8 flex flex-col items-center justify-center">
        <div className="h-full w-px bg-red-400" />
        <div className="absolute bg-white px-1 text-xs font-mono text-red-600 rotate-90 whitespace-nowrap">
          {value}
        </div>
      </div>
    );
  }
  
  return (
    <div className="absolute top-0 left-0 right-0 -translate-y-6 flex items-center justify-center">
      <div className="w-full h-px bg-red-400" />
      <div className="absolute bg-white px-1 text-xs font-mono text-red-600">
        {value}
      </div>
    </div>
  );
};

// Screen Wireframes
const TodayWireframe = ({ style, showAnnotations, showMeasurements }: WireframeProps) => (
  <div className="relative">
    {/* Header */}
    <div className="h-32 bg-gray-100 border-b-2 border-gray-300 p-6 relative">
      {showMeasurements && <Measurement value="128px" />}
      <WireframeText lines={1} style={style} width="w-32" />
      <div className="mt-2">
        <WireframeText lines={1} style={style} width="w-48" />
      </div>
      {showAnnotations && (
        <div className="absolute top-2 right-2 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
          Gradient Header
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-6 space-y-6">
      {/* Section Title */}
      <div>
        <WireframeText lines={1} style={style} width="w-40" />
      </div>

      {/* Medication Card */}
      <div className="relative">
        {showMeasurements && <Measurement value="140px" />}
        <WireframeBox 
          style={style} 
          height="h-36" 
          className="p-4 space-y-3"
          annotation={showAnnotations ? '56×56px button' : undefined}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1 space-y-2">
              <WireframeText lines={1} style={style} width="w-32" />
              <WireframeText lines={1} style={style} width="w-24" />
            </div>
            <WireframeBox style={style} height="h-8" className="w-20" label="BADGE" />
          </div>
          <WireframeButton label="Take Now" style={style} />
        </WireframeBox>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <WireframeText lines={1} style={style} width="w-32" />
        <div className="grid grid-cols-2 gap-3">
          <WireframeBox style={style} height="h-20" label="ACTION" />
          <WireframeBox style={style} height="h-20" label="ACTION" />
        </div>
      </div>
    </div>

    {/* Bottom Navigation */}
    <div className="border-t-2 border-gray-300 p-4 relative">
      {showMeasurements && <Measurement value="72px" />}
      <div className="flex justify-around">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex flex-col items-center gap-1">
            <WireframeIcon size="w-6 h-6" style={style} />
            <div className="w-8 h-1 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
      {showAnnotations && (
        <div className="absolute top-2 right-2 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
          Tab Bar (56×56px targets)
        </div>
      )}
    </div>
  </div>
);

const MedicationsWireframe = ({ style, showAnnotations, showMeasurements }: WireframeProps) => (
  <div className="relative">
    {/* Header */}
    <div className="border-b-2 border-gray-300 p-6">
      <WireframeText lines={1} style={style} width="w-40" />
    </div>

    {/* Content */}
    <div className="p-6 space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="relative">
          {showMeasurements && i === 1 && <Measurement value="96px" />}
          <WireframeBox 
            style={style} 
            height="h-24" 
            className="p-4 space-y-2"
            annotation={showAnnotations && i === 1 ? 'Medication Card' : undefined}
          >
            <WireframeText lines={1} style={style} width="w-32" />
            <WireframeText lines={1} style={style} width="w-48" />
          </WireframeBox>
        </div>
      ))}
    </div>

    {/* FAB */}
    <div className="absolute bottom-24 right-6">
      <div className="relative">
        <div className={`w-14 h-14 rounded-full ${style === 'sketch' ? 'border-2 border-gray-900 border-dashed bg-gray-100' : 'bg-gray-900'} flex items-center justify-center`}>
          <div className="w-6 h-1 bg-white rounded" />
        </div>
        {showAnnotations && (
          <div className="absolute -top-2 -right-2 translate-x-full ml-2 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded whitespace-nowrap">
            FAB: Add Button
          </div>
        )}
      </div>
    </div>

    {/* Bottom Nav */}
    <div className="absolute bottom-0 left-0 right-0 border-t-2 border-gray-300 p-4">
      <div className="flex justify-around">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex flex-col items-center gap-1">
            <WireframeIcon size="w-6 h-6" style={style} />
            <div className="w-8 h-1 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AddMedicationWireframe = ({ style, showAnnotations, showMeasurements }: WireframeProps) => (
  <div className="relative min-h-[600px] flex flex-col">
    {/* Header */}
    <div className="border-b-2 border-gray-300 p-6 space-y-4">
      <div className="flex items-center gap-3">
        <WireframeIcon size="w-6 h-6" style={style} />
        <WireframeText lines={1} style={style} width="w-16" />
      </div>
      <WireframeText lines={1} style={style} width="w-40" />
    </div>

    {/* Form */}
    <div className="flex-1 p-6 space-y-6">
      <WireframeInput 
        label="Medication Name *" 
        placeholder="e.g., Lisinopril" 
        style={style}
        annotation={showAnnotations ? 'Required field' : undefined}
      />
      <div className="relative">
        {showMeasurements && <Measurement value="68px" />}
        <WireframeInput 
          label="Dose *" 
          placeholder="e.g., 10mg" 
          style={style}
          annotation={showAnnotations ? 'Numeric keyboard' : undefined}
        />
      </div>
      <WireframeInput label="Frequency *" placeholder="Choose frequency" style={style} />
      <WireframeInput label="Time" placeholder="Select time" style={style} />
      <div className="relative">
        <WireframeBox 
          style={style} 
          height="h-24" 
          label="NOTES"
          annotation={showAnnotations ? 'Optional textarea' : undefined}
        />
      </div>
    </div>

    {/* Bottom Button */}
    <div className="border-t-2 border-gray-300 p-6 relative">
      {showMeasurements && <Measurement value="88px" />}
      <WireframeButton 
        label="Save Medication" 
        style={style}
        annotation={showAnnotations ? '56px height (AAA)' : undefined}
      />
    </div>
  </div>
);

const MedicationDetailWireframe = ({ style, showAnnotations, showMeasurements }: WireframeProps) => (
  <div className="relative">
    {/* Header */}
    <div className="border-b-2 border-gray-300 p-6 space-y-4">
      <div className="flex items-center gap-3">
        <WireframeIcon size="w-6 h-6" style={style} />
        <WireframeText lines={1} style={style} width="w-16" />
      </div>
      <div className="space-y-2">
        <WireframeText lines={1} style={style} width="w-48" />
        <WireframeText lines={1} style={style} width="w-32" />
      </div>
    </div>

    {/* Content */}
    <div className="p-6 space-y-6">
      {/* Info Sections */}
      <div className="space-y-3">
        <WireframeText lines={1} style={style} width="w-24" />
        <WireframeBox style={style} height="h-20" className="p-3">
          <WireframeText lines={2} style={style} />
        </WireframeBox>
      </div>

      <div className="space-y-3">
        <WireframeText lines={1} style={style} width="w-32" />
        <WireframeBox style={style} height="h-16" className="p-3">
          <WireframeText lines={1} style={style} />
        </WireframeBox>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <WireframeButton label="Request Refill" style={style} />
        <WireframeButton label="Edit Medication" style={style} variant="secondary" />
        <WireframeButton label="Delete Medication" style={style} variant="secondary" />
      </div>
    </div>
  </div>
);

const RefillWireframe = ({ style, showAnnotations, showMeasurements }: WireframeProps) => (
  <div className="relative min-h-[600px] flex flex-col">
    {/* Header */}
    <div className="border-b-2 border-gray-300 p-6 space-y-4">
      <div className="flex items-center gap-3">
        <WireframeIcon size="w-6 h-6" style={style} />
        <WireframeText lines={1} style={style} width="w-16" />
      </div>
      <WireframeText lines={1} style={style} width="w-40" />
    </div>

    {/* Progress Indicator */}
    <div className="border-b-2 border-gray-300 p-6">
      <div className="flex justify-between items-center relative">
        {showAnnotations && (
          <div className="absolute -top-2 right-0 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            3-step process
          </div>
        )}
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center">
            <div className={`w-8 h-8 rounded-full border-2 ${i === 1 ? 'border-gray-900 bg-gray-900' : 'border-gray-300'} flex items-center justify-center`}>
              <span className={`text-xs font-bold ${i === 1 ? 'text-white' : 'text-gray-400'}`}>{i}</span>
            </div>
            {i < 3 && <div className="w-16 h-px bg-gray-300" />}
          </div>
        ))}
      </div>
    </div>

    {/* Content */}
    <div className="flex-1 p-6 space-y-6">
      <div className="space-y-3">
        <WireframeText lines={1} style={style} width="w-32" />
        <WireframeBox style={style} height="h-24" className="p-4">
          <WireframeText lines={2} style={style} />
        </WireframeBox>
      </div>

      <WireframeInput label="Quantity" placeholder="Enter quantity" style={style} />
      <WireframeInput label="Pharmacy" placeholder="Select pharmacy" style={style} />
    </div>

    {/* Bottom Buttons */}
    <div className="border-t-2 border-gray-300 p-6 space-y-3">
      <WireframeButton label="Continue" style={style} />
      <WireframeButton label="Cancel" style={style} variant="secondary" />
    </div>
  </div>
);

const CalendarWireframe = ({ style, showAnnotations, showMeasurements }: WireframeProps) => (
  <div className="relative">
    {/* Header */}
    <div className="border-b-2 border-gray-300 p-6">
      <WireframeText lines={1} style={style} width="w-32" />
    </div>

    {/* Calendar Grid */}
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <WireframeText lines={1} style={style} width="w-40" />
        <WireframeBox 
          style={style} 
          height="h-48" 
          label="CALENDAR GRID"
          annotation={showAnnotations ? 'Interactive calendar' : undefined}
        />
      </div>

      {/* Appointments */}
      <div className="space-y-3">
        <WireframeText lines={1} style={style} width="w-32" />
        {[1, 2].map(i => (
          <WireframeBox key={i} style={style} height="h-20" className="p-3 flex gap-3">
            <WireframeIcon size="w-12 h-12" style={style} />
            <div className="flex-1 space-y-2">
              <WireframeText lines={1} style={style} />
              <WireframeText lines={1} style={style} width="w-32" />
            </div>
          </WireframeBox>
        ))}
      </div>
    </div>

    {/* Bottom Nav */}
    <div className="border-t-2 border-gray-300 p-4">
      <div className="flex justify-around">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex flex-col items-center gap-1">
            <WireframeIcon size="w-6 h-6" style={style} />
            <div className="w-8 h-1 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MessagesWireframe = ({ style, showAnnotations, showMeasurements }: WireframeProps) => (
  <div className="relative">
    {/* Header */}
    <div className="border-b-2 border-gray-300 p-6">
      <WireframeText lines={1} style={style} width="w-32" />
    </div>

    {/* Quick Templates */}
    <div className="p-6 space-y-4">
      <div className="space-y-3">
        <WireframeText lines={1} style={style} width="w-40" />
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map(i => (
            <WireframeBox 
              key={i} 
              style={style} 
              height="h-20" 
              label="TEMPLATE"
              annotation={showAnnotations && i === 1 ? 'Quick message' : undefined}
            />
          ))}
        </div>
      </div>

      {/* Recent Messages */}
      <div className="space-y-3">
        <WireframeText lines={1} style={style} width="w-32" />
        {[1, 2].map(i => (
          <WireframeBox key={i} style={style} height="h-16" className="p-3">
            <WireframeText lines={2} style={style} />
          </WireframeBox>
        ))}
      </div>
    </div>

    {/* Bottom Nav */}
    <div className="border-t-2 border-gray-300 p-4">
      <div className="flex justify-around">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex flex-col items-center gap-1">
            <WireframeIcon size="w-6 h-6" style={style} />
            <div className="w-8 h-1 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SettingsWireframe = ({ style, showAnnotations, showMeasurements }: WireframeProps) => (
  <div className="relative">
    {/* Header */}
    <div className="border-b-2 border-gray-300 p-6">
      <WireframeText lines={1} style={style} width="w-24" />
    </div>

    {/* Settings List */}
    <div className="p-6 space-y-4">
      <WireframeBox style={style} height="h-auto" className="divide-y-2 divide-gray-300">
        {['Profile', 'Notifications', 'Left-Hand Mode', 'Security', 'Privacy'].map((item, i) => (
          <div 
            key={item} 
            className="p-4 flex items-center justify-between relative"
          >
            <div className="flex items-center gap-3">
              <WireframeIcon size="w-5 h-5" style={style} />
              <span className="text-sm font-medium text-gray-700">{item}</span>
            </div>
            {item === 'Left-Hand Mode' ? (
              <div className="w-12 h-6 bg-gray-300 rounded-full" />
            ) : (
              <WireframeIcon size="w-4 h-4" style={style} />
            )}
            {showAnnotations && item === 'Left-Hand Mode' && (
              <div className="absolute -right-2 top-2 translate-x-full ml-2 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded whitespace-nowrap">
                Toggle switch
              </div>
            )}
          </div>
        ))}
      </WireframeBox>

      {/* Logout */}
      <WireframeButton label="Log Out" style={style} variant="secondary" />
    </div>

    {/* Bottom Nav */}
    <div className="border-t-2 border-gray-300 p-4">
      <div className="flex justify-around">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex flex-col items-center gap-1">
            <WireframeIcon size="w-6 h-6" style={style} />
            <div className="w-8 h-1 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LoginWireframe = ({ style, showAnnotations, showMeasurements }: WireframeProps) => (
  <div className="relative min-h-[600px] flex flex-col items-center justify-center p-6 bg-gray-50">
    <div className="w-full max-w-sm space-y-6">
      {/* Logo & Title */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <WireframeIcon size="w-20 h-20" style={style} />
        </div>
        <WireframeText lines={1} style={style} width="w-40 mx-auto" />
        <WireframeText lines={1} style={style} width="w-48 mx-auto" />
      </div>

      {/* Login Form */}
      <WireframeBox style={style} height="h-auto" className="p-6 space-y-4 bg-white">
        <WireframeInput label="Username" placeholder="Enter username" style={style} />
        <WireframeInput label="Password" placeholder="Enter password" style={style} />
        <WireframeButton label="Sign In" style={style} />
      </WireframeBox>

      {showAnnotations && (
        <div className="absolute top-4 right-4 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
          Centered layout
        </div>
      )}
    </div>
  </div>
);

const OnboardingWireframe = ({ style, showAnnotations, showMeasurements }: WireframeProps) => (
  <div className="relative min-h-[600px] flex flex-col items-center justify-center p-6 bg-gray-50">
    <div className="w-full max-w-sm space-y-8">
      {/* Icon */}
      <div className="flex justify-center">
        <WireframeIcon size="w-24 h-24" style={style} />
      </div>

      {/* Title & Description */}
      <div className="text-center space-y-3">
        <WireframeText lines={1} style={style} width="w-48 mx-auto" />
        <WireframeText lines={2} style={style} width="w-64 mx-auto" />
      </div>

      {/* Hand Selection */}
      <div className="space-y-4 relative">
        {showAnnotations && (
          <div className="absolute -top-2 right-0 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            Critical choice
          </div>
        )}
        <WireframeButton label="👈 Left Hand" style={style} />
        <WireframeButton label="👉 Right Hand" style={style} variant="secondary" />
      </div>
    </div>
  </div>
);
