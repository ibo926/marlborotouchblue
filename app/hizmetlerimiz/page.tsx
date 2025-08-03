
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HizmetlerimizPage() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      id: 'consultation',
      title: 'Ücretsiz Danışmanlık',
      icon: 'ri-user-heart-line',
      color: 'blue',
      description: 'Emlak konusunda uzman danışmanlarımızdan ücretsiz profesyonel destek alın.',
      features: [
        'Piyasa analizi ve değerlendirme',
        'Yatırım tavsiyesi',
        'Hukuki süreç rehberliği',
        'Finansman seçenekleri',
        '7/24 danışman desteği'
      ],
      image: 'professional real estate consultant meeting with clients in modern office, friendly atmosphere, handshake, business documents on table'
    },
    {
      id: 'expertise',
      title: 'Ücretsiz Ekspertiz',
      icon: 'ri-search-eye-line',
      color: 'green',
      description: 'Gayrimenkulünüzün gerçek piyasa değerini ücretsiz olarak belirleyelim.',
      features: [
        'Detaylı piyasa araştırması',
        'Konum analizi',
        'Yapısal değerlendirme',
        'Karşılaştırmalı analiz',
        'Profesyonel rapor hazırlama'
      ],
      image: 'real estate expert examining property with measuring tools, professional inspection, modern apartment interior'
    },
    {
      id: 'photography',
      title: 'Profesyonel Fotoğraf',
      icon: 'ri-camera-line',
      color: 'purple',
      description: 'Gayrimenkulünüzü en iyi şekilde tanıtacak profesyonel fotoğraf çekimi.',
      features: [
        'Yüksek çözünürlüklü fotoğraflar',
        'Geniş açı lens kullanımı',
        'HDR teknolojisi',
        'İç ve dış mekan çekimi',
        'Profesyonel düzenleme'
      ],
      image: 'professional photographer taking interior photos of luxury apartment with advanced camera equipment and lighting'
    },
    {
      id: 'video',
      title: 'Video Çekimi',
      icon: 'ri-video-line',
      color: 'red',
      description: 'Gayrimenkulünüzü tanıtacak etkileyici video içerikleri üretelim.',
      features: [
        '4K ultra HD kalite',
        'Sinematik görüntü kalitesi',
        'Profesyonel ses kaydı',
        'Hızlı montaj ve düzenleme',
        'Sosyal medya formatları'
      ],
      image: 'videographer recording property walkthrough with professional camera equipment, smooth movements, beautiful interior'
    },
    {
      id: 'drone',
      title: 'Drone Çekimi',
      icon: 'ri-flight-takeoff-line',
      color: 'indigo',
      description: 'Havadan çekim ile gayrimenkulünüzün konumunu en etkileyici şekilde gösterelim.',
      features: [
        'Havadan görüntüleme',
        'Çevre ve konum analizi',
        '360° panoramik görüntüler',
        'Sinematik hava çekimleri',
        'Manzara ve çevre tanıtımı'
      ],
      image: 'aerial drone photography of beautiful residential complex with surrounding landscape, birds eye view, professional composition'
    },
    {
      id: '360tour',
      title: '360° Sanal Tur',
      icon: 'ri-360-line',
      color: 'yellow',
      description: 'İnteraktif 360 derece sanal tur ile gayrimenkulünüzü dijital ortamda tanıtın.',
      features: [
        'İnteraktif sanal gezinti',
        'Her odanın detaylı görünümü',
        'Masaüstü ve mobil uyumluluk',
        'Kolay paylaşım',
        'Gelişmiş kullanıcı deneyimi'
      ],
      image: 'modern apartment interior captured in 360 degree view, interactive virtual tour interface, immersive experience'
    },
    {
      id: 'banner',
      title: 'Banner ve Tasarım',
      icon: 'ri-palette-line',
      color: 'pink',
      description: 'Gayrimenkulünüz için etkili tanıtım materyalleri ve dijital bannerlar tasarlayalım.',
      features: [
        'Özel tasarım bannerlar',
        'Sosyal medya görselleri',
        'Baskıya hazır materyaller',
        'Marka kimliği uyumlu',
        'Çoklu format desteği'
      ],
      image: 'graphic designer creating attractive real estate banners and marketing materials on computer with colorful designs'
    },
    {
      id: 'publishing',
      title: 'Profesyonel Paylaşım',
      icon: 'ri-share-forward-line',
      color: 'teal',
      description: 'İlanınızı tüm önemli emlak platformlarında profesyonel şekilde yayınlayalım.',
      features: [
        'Çoklu platform yayınlama',
        'SEO optimizasyonu',
        'Sosyal medya entegrasyonu',
        'Takip ve analiz raporu',
        'Maksimum görünürlük'
      ],
      image: 'multiple digital screens showing property listings on various real estate websites, professional marketing distribution'
    }
  ];

  const colorClasses = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-50' },
    green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-50' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-50' },
    red: { bg: 'bg-red-100', text: 'text-red-600', hover: 'hover:bg-red-50' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', hover: 'hover:bg-indigo-50' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', hover: 'hover:bg-yellow-50' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-600', hover: 'hover:bg-pink-50' },
    teal: { bg: 'bg-teal-100', text: 'text-teal-600', hover: 'hover:bg-teal-50' }
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
            {/* Modern Back Button */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Link
                href="/"
                className="group flex items-center bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center mr-2 group-hover:-translate-x-1 transition-transform duration-300"></i>
                <span className="font-medium">Ana Sayfa</span>
              </Link>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group mx-auto">
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
                className="group relative px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-nowrap overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
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
                className="flex items-center w-full p-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
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

      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center py-20 md:py-28"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('https://readdy.ai/api/search-image?query=professional%20real%20estate%20services%20team%20working%20with%20advanced%20technology%2C%20modern%20office%20environment%2C%20customer%20service%20excellence%2C%20professional%20photography%20equipment&width=1200&height=600&seq=services_hero&orientation=landscape')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="text-blue-400">Profesyonel</span> Hizmetlerimiz
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Gayrimenkulünüzün değerini maksimuma çıkaracak 
            <strong className="text-blue-300"> tamamen ücretsiz </strong> 
            professionnel hizmetlerimizden yararlanın
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+905319393386"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer whitespace-nowrap"
            >
              <i className="ri-phone-line w-6 h-6 flex items-center justify-center inline mr-2"></i>
              Hemen Başlayalım
            </a>
            <a
              href="https://wa.me/905319393386"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer whitespace-nowrap"
            >
              <i className="ri-whatsapp-line w-6 h-6 flex items-center justify-center inline mr-2"></i>
              WhatsApp İletişim
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Size <span className="text-blue-600">Özel</span> Hizmetler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gayrimenkulünüzün satış sürecini hızlandıracak ve değerini artıracak 
              professionnel hizmetlerimizin tamamı ücretsizdir
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const colors = colorClasses[service.color];
              return (
                <div
                  key={service.id}
                  className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${colors.hover}`}
                  onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                >
                  <div className="text-center mb-6">
                    <div className={`w-20 h-20 ${colors.bg} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <i className={`${service.icon} w-10 h-10 flex items-center justify-center ${colors.text} text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {activeService === service.id && (
                    <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-in">
                      <div className="mb-4">
                        <img
                          src={`https://readdy.ai/api/search-image?query=${service.image}&width=300&height=200&seq=${service.id}_service&orientation=landscape`}
                          alt={service.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <i className={`ri-check-line w-4 h-4 flex items-center justify-center mr-2 ${colors.text}`}></i>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <button className={`w-full ${colors.bg} ${colors.text} py-2 px-4 rounded-lg font-medium hover:scale-105 transition-all duration-300`}>
                      {activeService === service.id ? 'Kapat' : 'Detayları Gör'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Neden <span className="text-blue-200">Bizi Seçmelisiniz?</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              15+ yıllık deneyimimiz ve müşteri memnuniyeti odaklı yaklaşımımızla 
              gayrimenkul değerinizi maksimuma çıkarıyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-gift-line',
                title: '%100 Ücretsiz',
                description: 'Tüm hizmetlerimiz completamente ücretsizdir. Hiçbir gizli ücret yok.'
              },
              {
                icon: 'ri-award-line',
                title: 'Profesyonel Ekip',
                description: 'Alanında uzman profesyonel ekibimizle en kaliteli hizmeti sunuyoruz.'
              },
              {
                icon: 'ri-time-line',
                title: 'Hızlı Çözüm',
                description: '24-48 saat içinde tüm hizmetlerimizi tamamlayarak hızlı sonuç alırsınız.'
              },
              {
                icon: 'ri-shield-check-line',
                title: 'Güvenceli Hizmet',
                description: 'Müşteri memnuniyeti garantisi ile hizmet kalitemizi garanti ediyoruz.'
              },
              {
                icon: 'ri-global-line',
                title: 'Geniş Ağ',
                description: 'Tüm emlak platformlarında ve sosyal medyada geniş erişim ağımız var.'
              },
              {
                icon: 'ri-customer-service-line',
                title: '7/24 Destek',
                description: 'Her zaman ulaşabileceğiniz müşteri hizmetleri desteği sunuyoruz.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                  <i className={`${item.icon} w-8 h-8 flex items-center justify-center text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-blue-100 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">Başarı</span> Rakamlarımız
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Müşterilerimizin memnuniyeti bizim en büyük başarımız
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '2500+', label: 'Mutlu Müşteri', icon: 'ri-emotion-happy-line' },
              { number: '3200+', label: 'Başarılı Satış', icon: 'ri-home-smile-line' },
              { number: '5000+', label: 'Profesyonel Fotoğraf', icon: 'ri-camera-3-line' },
              { number: '%98', label: 'Müşteri Memnuniyeti', icon: 'ri-star-smile-line' }
            ].map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-blue-50 w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                  <i className={`${stat.icon} w-10 h-10 flex items-center justify-center text-blue-600 text-2xl`}></i>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Gayrimenkulünüzün Değerini 
            <span className="text-green-200"> Maksimuma </span>
            Çıkarın!
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Ücretsiz profesyonel hizmetlerimizden yararlanın ve 
            gayrimenkulünüzü daha hızlı, daha yüksek fiyattan satın
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+905319393386"
              className="bg-white text-blue-600 hover:text-blue-700 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer whitespace-nowrap"
            >
              <i className="ri-phone-line w-6 h-6 flex items-center justify-center inline mr-2"></i>
              Hemen Ara: +90 531 939 33 86
            </a>
            <a
              href="https://wa.me/905319393386"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer whitespace-nowrap"
            >
              <i className="ri-whatsapp-line w-6 h-6 flex items-center justify-center inline mr-2"></i>
              WhatsApp\'tan Yaz
            </a>
          </div>

          <div className="mt-8 text-white/80 text-sm">
            <p>
              <i className="ri-check-double-line w-4 h-4 flex items-center justify-center inline mr-1"></i>
              Tamamen ücretsiz • Profesyonel kalite • 24-48 saat teslimat
            </p>
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
                Ücretsiz profesyonel hizmetlerle gayrimenkul değerinizi maksimuma çıkarın.
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
                <Link href="/hizmetlerimiz" className="block text-gray-300 hover:text-blue-400 cursor-pointer text-sm transition-colors">
                  Hizmetlerimiz
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
