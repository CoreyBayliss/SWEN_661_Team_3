import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Fingerprint, Lock, User, Eye, EyeOff } from 'lucide-react';

export const Login = () => {
  const { login, leftHandMode, setLeftHandMode, biometricEnabled } = useApp();
  const [showPasscode, setShowPasscode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isOnboarding, setIsOnboarding] = useState(() => {
    // Only show onboarding if hand preference has never been set
    const hasHandPreference = localStorage.getItem('leftHandMode') !== null;
    const onboardingComplete = localStorage.getItem('onboardingComplete') === 'true';
    return !hasHandPreference && !onboardingComplete;
  });

  const handleBiometric = () => {
    // Simulate biometric authentication
    setTimeout(() => {
      login();
      if (isOnboarding) {
        localStorage.setItem('onboardingComplete', 'true');
      }
    }, 500);
  };

  const handlePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.length >= 4) {
      login();
      if (isOnboarding) {
        localStorage.setItem('onboardingComplete', 'true');
      }
    }
  };

  const handleUsernamePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    // Validate inputs
    if (!username || !password) {
      setLoginError('Please enter both username and password');
      return;
    }

    // Demo credentials - in production, this would authenticate against a real backend
    if (username === 'demo' && password === 'demo123') {
      login();
      if (isOnboarding) {
        localStorage.setItem('onboardingComplete', 'true');
      }
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleOnboardingComplete = () => {
    setIsOnboarding(false);
    localStorage.setItem('onboardingComplete', 'true');
  };

  if (isOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col safe-area-top safe-area-bottom">
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 landscape:py-6">
          <div className="w-full max-w-sm space-y-8 landscape:space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 landscape:w-14 landscape:h-14 bg-blue-600 rounded-2xl mx-auto mb-4 landscape:mb-3 flex items-center justify-center">
                <span className="text-white text-2xl landscape:text-xl font-bold">CC</span>
              </div>
              <h1 className="text-3xl landscape:text-2xl font-bold text-gray-900">Welcome to CareConnect</h1>
              <p className="mt-2 landscape:mt-1 text-gray-600 landscape:text-sm">Let's personalize your experience</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 landscape:p-4 space-y-6 landscape:space-y-4">
              <div>
                <h2 className="text-lg landscape:text-base font-semibold text-gray-900 mb-4 landscape:mb-2">Hand Preference</h2>
                <p className="text-sm landscape:text-xs text-gray-600 mb-4 landscape:mb-3">
                  Choose your preferred hand for easier one-handed use. This moves buttons and controls to your thumb zone.
                </p>
                <div className="grid grid-cols-2 gap-3 landscape:gap-2">
                  <button
                    onClick={() => setLeftHandMode(false)}
                    className={`p-4 landscape:p-3 rounded-xl border-2 transition-all min-h-[56px] landscape:min-h-[48px] ${
                      !leftHandMode
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl landscape:text-xl mb-2 landscape:mb-1">🤚</div>
                      <div className="font-medium text-sm landscape:text-xs">Right Hand</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setLeftHandMode(true)}
                    className={`p-4 landscape:p-3 rounded-xl border-2 transition-all min-h-[56px] landscape:min-h-[48px] ${
                      leftHandMode
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl landscape:text-xl mb-2 landscape:mb-1">🖐️</div>
                      <div className="font-medium text-sm landscape:text-xs">Left Hand</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`p-6 landscape:p-4 bg-white border-t border-gray-200 safe-area-bottom ${leftHandMode ? 'text-left' : 'text-right'}`}>
          <button
            onClick={handleOnboardingComplete}
            className={`px-8 landscape:px-6 py-4 landscape:py-3 bg-blue-600 text-white rounded-xl font-medium shadow-sm hover:bg-blue-700 transition-colors min-w-[56px] min-h-[56px] landscape:min-h-[48px] ${
              leftHandMode ? 'float-left' : 'float-right'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col max-w-screen overflow-x-hidden safe-area-top safe-area-bottom">
      {/* Landscape content wrapper with scrolling */}
      <div className="flex-1 flex flex-col landscape:flex-row items-center justify-center px-6 landscape:px-8 py-12 landscape:py-4 landscape:gap-8 landscape:overflow-y-auto landscape:max-h-screen">
        <div className="w-full max-w-sm landscape:max-w-md space-y-8 landscape:space-y-4 landscape:my-auto">
          {/* Logo and Title - Always centered */}
          <div className="text-center">
            <div className="w-20 h-20 landscape:w-16 landscape:h-16 bg-blue-600 rounded-3xl landscape:rounded-2xl mx-auto mb-6 landscape:mb-3 flex items-center justify-center">
              <span className="text-white text-3xl landscape:text-2xl font-bold">CC</span>
            </div>
            <h1 className="text-3xl landscape:text-2xl font-bold text-gray-900">CareConnect</h1>
            <p className="mt-2 landscape:mt-1 text-gray-600 landscape:text-sm">Your health, simplified</p>
          </div>

          {!showPasscode ? (
            <div className="space-y-4 landscape:space-y-3">
              {/* Username & Password Form */}
              <form onSubmit={handleUsernamePasswordLogin} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 landscape:p-4 space-y-4 landscape:space-y-3">
                <h2 className="text-lg landscape:text-base font-semibold text-gray-900 mb-2 landscape:mb-1">Sign In</h2>
                
                {loginError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 landscape:py-2 rounded-xl text-sm">
                    {loginError}
                  </div>
                )}

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2 landscape:mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 landscape:pl-3 flex items-center pointer-events-none">
                      <User className="w-5 h-5 landscape:w-4 landscape:h-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      inputMode="email"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 landscape:pl-10 pr-4 landscape:pr-3 py-4 landscape:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 min-h-[56px] landscape:min-h-[48px]"
                      placeholder="Enter your username"
                      autoComplete="username"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 landscape:mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 landscape:pl-3 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 landscape:w-4 landscape:h-4 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 landscape:pl-10 pr-14 landscape:pr-12 py-4 landscape:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 min-h-[56px] landscape:min-h-[48px]"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 landscape:pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 landscape:w-4 landscape:h-4 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="w-5 h-5 landscape:w-4 landscape:h-4 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-xl py-4 landscape:py-3 font-medium shadow-sm hover:bg-blue-700 transition-colors min-h-[56px] landscape:min-h-[48px]"
                >
                  Sign In
                </button>

                <p className="text-xs text-center text-gray-500">
                  Demo credentials: username: <span className="font-medium">demo</span>, password: <span className="font-medium">demo123</span>
                </p>
              </form>

              {/* Divider */}
              <div className="relative py-2 landscape:py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm landscape:text-xs">
                  <span className="px-4 landscape:px-3 bg-gradient-to-b from-blue-50 to-white text-gray-500">Or sign in with</span>
                </div>
              </div>

              {/* Alternative Login Methods */}
              <div className="space-y-3 landscape:space-y-2">
                {biometricEnabled && (
                  <button
                    onClick={handleBiometric}
                    className="w-full bg-white border-2 border-gray-200 text-gray-900 rounded-xl p-4 landscape:p-3 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 landscape:gap-2 min-h-[56px] landscape:min-h-[48px]"
                  >
                    <Fingerprint className="w-6 h-6 landscape:w-5 landscape:h-5" />
                    <span className="landscape:text-sm">Sign in with Biometrics</span>
                  </button>
                )}
                <button
                  onClick={() => setShowPasscode(true)}
                  className="w-full bg-white border-2 border-gray-200 text-gray-900 rounded-xl p-4 landscape:p-3 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 landscape:gap-2 min-h-[56px] landscape:min-h-[48px]"
                >
                  <Lock className="w-6 h-6 landscape:w-5 landscape:h-5" />
                  <span className="landscape:text-sm">Use Passcode</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePasscode} className="space-y-4 landscape:space-y-3">
              <div>
                <label htmlFor="passcode" className="block text-sm font-medium text-gray-700 mb-2 landscape:mb-1">
                  Enter Passcode
                </label>
                <input
                  type="password"
                  id="passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 landscape:px-3 py-4 landscape:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 text-lg text-center tracking-widest min-h-[56px] landscape:min-h-[48px]"
                  placeholder="••••"
                  maxLength={6}
                  autoFocus
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-xl p-4 landscape:p-3 font-medium shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50 min-h-[56px] landscape:min-h-[48px]"
                disabled={passcode.length < 4}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPasscode(false);
                  setPasscode('');
                }}
                className="w-full text-blue-600 p-4 landscape:p-3 font-medium min-h-[56px] landscape:min-h-[48px]"
              >
                Back
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};