
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderim işlemi burada yapılacak
    console.log('Form gönderildi:', formData);
    setIsSubmitted(true);
    
    // 3 saniye sonra formu sıfırla
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/905319393386"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer flex items-center justify-center animate-bounce"
        >
          <i className="ri-whatsapp-line w-6 h-6 flex items-center justify-center"></i>
        </a>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-white via-blue-50 to-white shadow-xl border-b border-blue-100 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-2xl shadow-lg group-hover:scale-105 transition-all duration-300 group-hover:shadow-xl">
                <i className="ri-home-heart-fill w-8 h-8 flex items-center justify-center text-white"></i>
              </div>
              <div className="group-hover:scale-105 transition-all duration-300">
                <div className="flex items-baseline">
                  <span className="text-3xl font-[\'Pacifico\'] bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">diyarbakır</span>
                  <span className="text-2xl font-black text-gray-800 ml-1">emlak</span>
                </div>
                <div className="text-xs text-blue-600 font-semibold tracking-wide -mt-1">güvenilir emlak rehberi</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link 
                href="/" 
                className="group relative px-6 py-3 rounded-xl font-semibold text-gray-700 hover:text-blue-700 bg-white hover:bg-blue-50 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-nowrap border border-transparent hover:border-blue-200"
              >
                <span className="flex items-center">
                  <i className="ri-home-4-line w-5 h-5 flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300"></i>
                  Anasayfa
                </span>
              </Link>
              
              <Link 
                href="/ilanlar" 
                className="group relative px-6 py-3 rounded-xl font-semibold text-gray-700 hover:text-blue-700 bg-white hover:bg-blue-50 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-nowrap border border-transparent hover:border-blue-200"
              >
                <span className="flex items-center">
                  <i className="ri-list-check-2 w-5 h-5 flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300"></i>
                  Tüm İlanlar
                </span>
              </Link>
              
              <Link 
                href="/hizmetlerimiz" 
                className="group relative px-6 py-3 rounded-xl font-semibold text-gray-700 hover:text-blue-700 bg-white hover:bg-blue-50 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-nowrap border border-transparent hover:border-blue-200"
              >
                <span className="flex items-center">
                  <i className="ri-service-line w-5 h-5 flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300"></i>
                  Hizmetlerimiz
                </span>
              </Link>
              
              <Link 
                href="/hakkimizda" 
                className="group relative px-6 py-3 rounded-xl font-semibold text-gray-700 hover:text-blue-700 bg-white hover:bg-blue-50 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-nowrap border border-transparent hover:border-blue-200"
              >
                <span className="flex items-center">
                  <i className="ri-information-line w-5 h-5 flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300"></i>
                  Hakkımızda
                </span>
              </Link>
              
              <Link 
                href="/iletisim" 
                className="group relative px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-nowrap overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
                  <i className="ri-phone-line w-5 h-5 flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300"></i>
                  İletişim
                </span>
              </Link>
            </nav>

            {/* Admin Panel Button */}
            <div className="hidden lg:block">
              <Link 
                href="/admin" 
                className="group relative px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-nowrap overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
                  <i className="ri-admin-line w-5 h-5 flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300"></i>
                  Yönetici Paneli
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute inset-0 bg-gray-700 h-0.5 rounded transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                <span className={`absolute inset-0 bg-gray-700 h-0.5 rounded transform transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'top-2.5'}`}></span>
                <span className={`absolute inset-0 bg-gray-700 h-0.5 rounded transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 top-3' : 'top-4'}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 mt-4 space-y-2">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center w-full p-4 rounded-xl font-semibold text-gray-700 hover:text-blue-700 bg-gray-50 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
              >
                <i className="ri-home-4-line w-5 h-5 flex items-center justify-center mr-3"></i>
                Anasayfa
              </Link>
              
              <Link 
                href="/ilanlar" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center w-full p-4 rounded-xl font-semibold text-gray-700 hover:text-blue-700 bg-gray-50 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
              >
                <i className="ri-list-check-2 w-5 h-5 flex items-center justify-center mr-3"></i>
                Tüm İlanlar
              </Link>
              
              <Link 
                href="/hizmetlerimiz" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center w-full p-4 rounded-xl font-semibold text-gray-700 hover:text-blue-700 bg-gray-50 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
              >
                <i className="ri-service-line w-5 h-5 flex items-center justify-center mr-3"></i>
                Hizmetlerimiz
              </Link>
              
              <Link 
                href="/hakkimizda" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center w-full p-4 rounded-xl font-semibold text-gray-700 hover:text-blue-700 bg-gray-50 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
              >
                <i className="ri-information-line w-5 h-5 flex items-center justify-center mr-3"></i>
                Hakkımızda
              </Link>
              
              <Link 
                href="/iletisim" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center w-full p-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <i className="ri-phone-line w-5 h-5 flex items-center justify-center mr-3"></i>
                İletişim
              </Link>
              
              <div className="pt-2 border-t border-gray-200">
                <Link 
                  href="/admin" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center w-full p-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-purple-700 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <i className="ri-admin-line w-5 h-5 flex items-center justify-center mr-3"></i>
                  Yönetici Paneli
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            İletişime Geçin
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Size yardımcı olmak için buradayız. Herhangi bir sorunuz varsa bize ulaşın.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                İletişim Bilgileri
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <i className="ri-user-line w-6 h-6 flex items-center justify-center text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">İletişim Kişisi</h3>
                    <p className="text-gray-600">Halil İbrahim Ayverdi</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <i className="ri-phone-line w-6 h-6 flex items-center justify-center text-green-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Telefon</h3>
                    <p className="text-gray-600">+90 531 939 3386</p>
                    <p className="text-sm text-gray-500 mt-1">7/24 ulaşılabilir</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <i className="ri-map-pin-line w-6 h-6 flex items-center justify-center text-red-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Adres</h3>
                    <p className="text-gray-600">Diyarbakır, Türkiye</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <i className="ri-time-line w-6 h-6 flex items-center justify-center text-yellow-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Çalışma Saatleri</h3>
                    <p className="text-gray-600">Pazartesi - Cumartesi: 09:00 - 19:00</p>
                    <p className="text-gray-600">Pazar: 10:00 - 17:00</p>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Hızlı İletişim</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+905319393386"
                    className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-phone-line w-5 h-5 flex items-center justify-center mr-2"></i>
                    Hemen Ara
                  </a>
                  <a
                    href="https://wa.me/905319393386"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-whatsapp-line w-5 h-5 flex items-center justify-center mr-2"></i>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Mesaj Gönder
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="bg-green-100 p-4 rounded-lg mb-4">
                      <i className="ri-check-circle-line w-12 h-12 flex items-center justify-center text-green-600 text-4xl mx-auto mb-4"></i>
                      <h3 className="text-lg font-semibold text-green-800 mb-2">Mesaj Gönderildi!</h3>
                      <p className="text-green-700">
                        Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ad Soyad *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Adınızı ve soyadınızı girin"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          E-posta
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="E-posta adresinizi girin"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Telefon numaranızı girin"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Konu
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pr-8"
                        >
                          <option value="">Konu seçin</option>
                          <option value="ilan-sorgu">İlan Sorgusu</option>
                          <option value="fiyat-bilgi">Fiyat Bilgisi</option>
                          <option value="genel-bilgi">Genel Bilgi</option>
                          <option value="site-sorunu">Site Sorunu</option>
                          <option value="diger">Diğer</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mesaj *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        maxLength={500}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                        placeholder="Mesajınızı yazın..."
                      ></textarea>
                      <div className="text-right text-sm text-gray-500 mt-1">
                        {formData.message.length}/500 karakter
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-send-plane-line w-5 h-5 flex items-center justify-center inline mr-2"></i>
                      Mesaj Gönder
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Konum
            </h2>
            <p className="text-gray-600">
              Diyarbakır genelinde hizmet vermekteyiz
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d198427.36450944072!2d40.02157024853517!3d37.91363600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4072c1b82395b851%3A0x5be7d08527717dd9!2zRGl5YXJiYWvEsXI!5e0!3m2!1str!2str!4v1703123456789"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-xl">
                  <i className="ri-home-heart-line w-6 h-6 flex items-center justify-center text-white"></i>
                </div>
                <div>
                  <span className="text-xl font-[\'Pacifico\'] text-blue-400">diyarbakır</span>
                  <span className="text-lg font-bold text-white">emlak</span>
                </div>
              </div>
              <p className="text-gray-300 mb-4 text-sm md:text-base">
                Diyarbakır\'ın en güvenilir emlak ve araç ilanları platformu. 
                Güvenli alışverişin adresi.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Hızlı Bağlantılar</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-gray-300 hover:text-blue-400 cursor-pointer text-sm transition-colors">
                  Anasayfa
                </Link>
                <Link href="/ilanlar" className="block text-gray-300 hover:text-blue-400 cursor-pointer text-sm transition-colors">
                  Tüm İlanlar
                </Link>
                <Link href="/iletisim" className="block text-gray-300 hover:text-blue-400 cursor-pointer text-sm transition-colors">
                  İletişim
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">İletişim</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>Halil İbrahim Ayverdi</p>
                <p>+90 531 939 3386</p>
                <p>Diyarbakır, Türkiye</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-300 text-sm">
            <p>&copy; 2024 Diyarbakır Emlak - Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
