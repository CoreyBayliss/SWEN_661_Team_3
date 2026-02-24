import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

export const Login = () => {
  const { login } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

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
    } else {
      setLoginError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl font-bold">CC</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">CareConnect</h1>
          <p className="text-gray-600">Desktop Healthcare Management</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleUsernamePasswordLogin} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 text-sm mt-1">Sign in to continue to your dashboard</p>
          </div>
          
          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {loginError}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-14 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg py-3 font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            Sign In
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-500 bg-gray-50 px-4 py-3 rounded-lg">
              Demo credentials: <span className="font-semibold text-gray-700">demo</span> / <span className="font-semibold text-gray-700">demo123</span>
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Your health data is secure and private</p>
        </div>
      </div>
    </div>
  );
};