
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSmsVerification, setShowSmsVerification] = useState(false);
  const [smsCode, setSmsCode] = useState('');
  const [smsError, setSmsError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock authentication - gerçek uygulamada güvenli backend authentication kullanılacak
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setTimeout(() => {
        setShowSmsVerification(true);
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setError('Kullanıcı adı veya şifre hatalı');
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleSmsVerification = () => {
    if (smsCode === '1269') {
      setTimeout(() => {
        onLogin();
      }, 500);
    } else {
      setSmsError('SMS doğrulama kodu hatalı');
    }
  };

  const resendSms = () => {
    // Fake SMS resend functionality
    setSmsError('');
    // Show success message for demo
    setSmsError('SMS kodu tekrar gönderildi (1269)');
    setTimeout(() => setSmsError(''), 3000);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://readdy.ai/api/search-image?query=modern%20office%20building%20interior%20with%20glass%20walls%2C%20professional%20business%20environment%2C%20clean%20corporate%20design%2C%20administrative%20workspace&width=1200&height=800&seq=admin_bg&orientation=landscape')`
      }}
    >
      {/* Back to Home Link */}
      <div className="absolute top-6 left-6">
        <Link 
          href="/" 
          className="group flex items-center bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20 hover:border-white/30 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center mr-2 group-hover:-translate-x-1 transition-transform duration-300"></i>
          <span className="font-medium">Ana Sayfaya Dön</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4 transform transition-all duration-300 hover:scale-105">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <i className="ri-shield-user-fill w-10 h-10 flex items-center justify-center text-white text-3xl"></i>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-2">
            Yönetici Paneli
          </h1>
          <p className="text-gray-600 font-medium">
            diyarbakirsahibinden.com
          </p>
        </div>

        {!showSmsVerification ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kullanıcı Adı
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-user-3-line w-5 h-5 flex items-center justify-center text-purple-400"></i>
                </div>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm font-medium transition-all duration-300"
                  placeholder="Kullanıcı adınızı girin"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Şifre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-lock-2-line w-5 h-5 flex items-center justify-center text-purple-400"></i>
                </div>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm font-medium transition-all duration-300"
                  placeholder="Şifrenizi girin"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-sm text-red-700 font-medium animate-shake">
                <div className="flex items-center">
                  <i className="ri-error-warning-line w-5 h-5 flex items-center justify-center mr-2"></i>
                  {error}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <i className="ri-loader-4-line w-6 h-6 flex items-center justify-center animate-spin mr-2"></i>
                  Giriş yapılıyor...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <i className="ri-login-circle-line w-6 h-6 flex items-center justify-center mr-2"></i>
                  Giriş Yap
                </div>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
                <i className="ri-smartphone-line w-10 h-10 flex items-center justify-center text-white text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">SMS Doğrulama</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Güvenliğiniz için telefonunuza gönderilen 4 haneli doğrulama kodunu girin.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <p className="text-blue-800 font-semibold text-sm">
                📱 +90 531 939 33 86 numarasına SMS gönderildi
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">
                SMS Doğrulama Kodu
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={smsCode}
                  onChange={(e) => {
                    setSmsCode(e.target.value);
                    setSmsError('');
                  }}
                  maxLength={4}
                  className="w-full text-center py-4 px-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-2xl font-bold tracking-widest transition-all duration-300"
                  placeholder="----"
                />
              </div>
            </div>

            {smsError && (
              <div className={`border-2 rounded-xl p-4 text-sm font-medium animate-bounce ${
                smsError.includes('gönderildi') 
                  ? 'bg-green-50 border-green-200 text-green-700' 
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                <div className="flex items-center">
                  <i className={`${smsError.includes('gönderildi') ? 'ri-check-line' : 'ri-error-warning-line'} w-5 h-5 flex items-center justify-center mr-2`}></i>
                  {smsError}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handleSmsVerification}
                disabled={smsCode.length !== 4}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <div className="flex items-center justify-center">
                  <i className="ri-shield-check-line w-6 h-6 flex items-center justify-center mr-2"></i>
                  Doğrula ve Giriş Yap
                </div>
              </button>

              <button
                onClick={resendSms}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <div className="flex items-center justify-center">
                  <i className="ri-refresh-line w-5 h-5 flex items-center justify-center mr-2"></i>
                  SMS Kodunu Tekrar Gönder
                </div>
              </button>

              <button
                onClick={() => {
                  setShowSmsVerification(false);
                  setSmsCode('');
                  setSmsError('');
                }}
                className="w-full text-gray-500 hover:text-gray-700 py-2 font-medium transition-colors cursor-pointer text-sm"
              >
                ← Geri Dön
              </button>
            </div>

            <div className="text-center text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
              <p className="mb-1">💡 Demo için doğrulama kodu: <span className="font-bold text-green-600">1269</span></p>
              <p>Bu kod tüm admin ve danışman hesapları için geçerlidir.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
