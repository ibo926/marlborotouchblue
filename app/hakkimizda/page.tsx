
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HakkimizdaPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                className="group relative px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-nowrap overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
                  <i className="ri-information-line w-5 h-5 flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300"></i>
                  Hakkımızda
                </span>
              </Link>
              
              <Link 
                href="/iletisim" 
                className="group relative px-6 py-3 rounded-xl font-semibold text-gray-700 hover:text-blue-700 bg-white hover:bg-blue-50 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-nowrap border border-transparent hover:border-blue-200"
              >
                <span className="flex items-center">
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
                className="flex items-center w-full p-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <i className="ri-information-line w-5 h-5 flex items-center justify-center mr-3"></i>
                Hakkımızda
              </Link>
              
              <Link 
                href="/iletisim" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center w-full p-4 rounded-xl font-semibold text-gray-700 hover:text-blue-700 bg-gray-50 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
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

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => router.back()}
          className="group flex items-center bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5"
        >
          <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center mr-2 group-hover:-translate-x-1 transition-transform duration-300"></i>
          <span className="font-semibold">Geri Dön</span>
        </button>
      </div>

      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center py-16 md:py-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('https://readdy.ai/api/search-image?query=aerial%20view%20of%20Diyarbakir%20city%20with%20historic%20walls%2C%20modern%20residential%20buildings%2C%20professional%20real%20estate%20photography%2C%20warm%20golden%20light&width=1200&height=600&seq=about_hero&orientation=landscape')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Hakkımızda
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Diyarbakır'ın en güvenilir emlak ve araç ilanları platformu olarak, yıllardır müşterilerimize kaliteli hizmet sunmaktayız.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                Diyarbakır Emlak'a Hoş Geldiniz
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                2015 yılından bu yana Diyarbakır'da faaliyet gösteren firmamız, emlak sektöründe güven ve kalite anlayışıyla hizmet vermektedir. Müşteri memnuniyetini önceleyerek, ev, dükkan, arsa ve araç alım-satım işlemlerinde profesyonel destek sağlıyoruz.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Deneyimli kadromuz ve geniş portföyümüz sayesinde hayalinizdeki mülkü bulmanızda size yardımcı oluyoruz. Güvenli ve şeffaf işlemler yapmak için modern teknolojileri kullanarak, dijital platformumuzda güncel ilanları sizlerle buluşturuyoruz.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <i className="ri-award-line w-6 h-6 flex items-center justify-center text-blue-600"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">9+ Yıllık Tecrübe</h3>
                  <p className="text-gray-600">Sektörde köklü deneyim</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://readdy.ai/api/search-image?query=professional%20real%20estate%20office%20interior%20with%20modern%20furniture%2C%20computers%2C%20property%20photos%20on%20walls%2C%20warm%20lighting%2C%20business%20meeting%20area&width=600&height=400&seq=about_office&orientation=landscape"
                alt="Ofisimiz"
                className="rounded-xl shadow-2xl object-cover w-full h-96"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1000+</div>
                  <div className="text-sm text-gray-600">Memnun Müşteri</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                Hizmetlerimiz
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Emlak sektöründe geniş bir yelpazede hizmet sunarak, tüm ihtiyaçlarınızı karşılıyoruz
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: 'ri-home-4-line',
                  title: 'Konut Alım-Satım',
                  description: 'Daire, villa ve müstakil ev alım-satım işlemlerinizde profesyonel destek'
                },
                {
                  icon: 'ri-key-line',
                  title: 'Kiralama Hizmetleri',
                  description: 'Konut ve işyeri kiralama süreçlerinizde güvenilir aracılık'
                },
                {
                  icon: 'ri-store-2-line',
                  title: 'Ticari Emlak',
                  description: 'Dükkan, ofis ve ticari alan alım-satım ve kiralama hizmetleri'
                },
                {
                  icon: 'ri-landscape-line',
                  title: 'Arsa & Arazi',
                  description: 'İmar durumu net arsalar için danışmanlık ve satış hizmetleri'
                },
                {
                  icon: 'ri-car-line',
                  title: 'Araç Alım-Satım',
                  description: 'İkinci el araç alım-satım işlemlerinizde güvenli platform'
                },
                {
                  icon: 'ri-file-text-line',
                  title: 'Hukuki Danışmanlık',
                  description: 'Emlak hukuku konularında uzman avukat desteği'
                },
                {
                  icon: 'ri-calculator-line',
                  title: 'Değerleme',
                  description: 'Profesyonel emlak değerleme hizmetleri'
                },
                {
                  icon: 'ri-home-heart-line',
                  title: 'Yatırım Danışmanlığı',
                  description: 'Emlak yatırımları için stratejik danışmanlık hizmetleri'
                }
              ].map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${service.icon} w-8 h-8 flex items-center justify-center text-blue-600 text-2xl`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                Neden Bizi Tercih Etmelisiniz?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-shield-check-line w-10 h-10 flex items-center justify-center text-green-600 text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Güvenilir İşlemler</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tüm işlemlerimizi yasal çerçevede gerçekleştiriyor, müşterilerimizin haklarını koruyoruz. Şeffaflık ve dürüstlük ilkelerimizle hareket ediyoruz.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-team-line w-10 h-10 flex items-center justify-center text-blue-600 text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Uzman Kadro</h3>
                <p className="text-gray-600 leading-relaxed">
                  Emlak sektöründe deneyimli ve uzman kadromuz ile size en iyi hizmeti sunmaya odaklanıyoruz. Sürekli eğitimle kendimizi geliştiriyoruz.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-customer-service-2-line w-10 h-10 flex items-center justify-center text-purple-600 text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">7/24 Destek</h3>
                <p className="text-gray-600 leading-relaxed">
                  Müşterilerimiz bizim için çok değerli. Her türlü sorunuz ve ihtiyacınız için 7 gün 24 saat ulaşılabilir olmaya özen gösteriyoruz.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Başarılarımız</h2>
              <p className="text-blue-100">Rakamlarla Diyarbakır Emlak</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">9+</div>
                <div className="text-blue-100 text-sm md:text-base">Yıllık Tecrübe</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">1000+</div>
                <div className="text-blue-100 text-sm md:text-base">Memnun Müşteri</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">2500+</div>
                <div className="text-blue-100 text-sm md:text-base">Başarılı İşlem</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
                <div className="text-blue-100 text-sm md:text-base">Güvenilirlik</div>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                Ekibimiz
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Deneyimli ve uzman kadromuz ile size en iyi hizmeti sunuyoruz
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=professional%20business%20man%20portrait%2C%20friendly%20smile%2C%20suit%20and%20tie%2C%20real%20estate%20agent%2C%20clean%20studio%20background&width=200&height=200&seq=team_halil&orientation=squarish"
                    alt="Halil İbrahim Ayverdi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Halil İbrahim Ayverdi</h3>
                <p className="text-blue-600 font-medium mb-3">Kurucu & CEO</p>
                <p className="text-gray-600 text-sm mb-4">
                  9 yıllık emlak sektörü deneyimi ile müşterilerimize profesyonel hizmet sunuyor.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="tel:+905319393386" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <i className="ri-phone-line w-5 h-5 flex items-center justify-center"></i>
                  </a>
                  <a href="https://wa.me/905319393386" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-600 transition-colors">
                    <i className="ri-whatsapp-line w-5 h-5 flex items-center justify-center"></i>
                  </a>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200 flex items-center justify-center">
                  <i className="ri-user-line w-8 h-8 flex items-center justify-center text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Emlak Danışmanı</h3>
                <p className="text-blue-600 font-medium mb-3">Satış Uzmanı</p>
                <p className="text-gray-600 text-sm mb-4">
                  Konut ve ticari emlak satış süreçlerinde uzman danışmanlık hizmeti.
                </p>
                <div className="flex justify-center space-x-3">
                  <span className="text-gray-300">
                    <i className="ri-phone-line w-5 h-5 flex items-center justify-center"></i>
                  </span>
                  <span className="text-gray-300">
                    <i className="ri-whatsapp-line w-5 h-5 flex items-center justify-center"></i>
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200 flex items-center justify-center">
                  <i className="ri-user-line w-8 h-8 flex items-center justify-center text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Kiralama Uzmanı</h3>
                <p className="text-blue-600 font-medium mb-3">Kiralama Danışmanı</p>
                <p className="text-gray-600 text-sm mb-4">
                  Kiralama işlemlerinde hızlı ve güvenilir çözümler sunuyor.
                </p>
                <div className="flex justify-center space-x-3">
                  <span className="text-gray-300">
                    <i className="ri-phone-line w-5 h-5 flex items-center justify-center"></i>
                  </span>
                  <span className="text-gray-300">
                    <i className="ri-whatsapp-line w-5 h-5 flex items-center justify-center"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <i className="ri-target-line w-8 h-8 flex items-center justify-center text-blue-600 text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h2>
              <p className="text-gray-600 leading-relaxed">
                Diyarbakır ve çevresinde yaşayan insanlara en kaliteli emlak hizmetini sunmak, güven esaslı işlemlerle müşteri memnuniyetini sağlamak ve sektörde fark yaratan bir marka olmaktır. Her müşterimizi aile ferdi gibi görür, onların hayallerine ev sahipliği yaparız.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <i className="ri-eye-line w-8 h-8 flex items-center justify-center text-green-600 text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Vizyonumuz</h2>
              <p className="text-gray-600 leading-relaxed">
                Bölgemizin en güvenilir ve tercih edilen emlak firması olmak. Modern teknolojileri kullanarak dijital dönüşümü tamamlamış, müşteri odaklı hizmet anlayışıyla sektöre yön veren bir kurum haline gelmek. Sürdürülebilir büyüme ile gelecek nesillere değer katmak.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gray-800 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Hayalinizdeki Mülkü Bulmanıza Yardım Edelim
            </h2>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              Deneyimli ekibimiz ve geniş portföyümüz ile size en uygun seçenekleri sunmaya hazırız. 
              Hemen bizimle iletişime geçin, hayalinizdeki mülkü birlikte bulalım.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/iletisim"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-mail-line w-5 h-5 flex items-center justify-center inline mr-2"></i>
                İletişime Geçin
              </Link>
              <a
                href="tel:+905319393386"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-phone-line w-5 h-5 flex items-center justify-center inline mr-2"></i>
                Hemen Arayın
              </a>
            </div>
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
                Diyarbakır'ın en güvenilir emlak ve araç ilanları platformu. 
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
                <Link href="/hakkimizda" className="block text-gray-300 hover:text-blue-400 cursor-pointer text-sm transition-colors">
                  Hakkımızda
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
