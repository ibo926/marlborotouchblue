
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import DataStore, { Listing } from '../lib/dataStore';

export default function Home() {
  const [latestListings, setLatestListings] = useState<Listing[]>([]);
  const [searchCategory, setSearchCategory] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDistrict, setSearchDistrict] = useState('');
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Güncellenmiş mahalle verileri
  const locationData = {
    'Kayapınar': ['Diclekent', 'Fırat', 'Medya', 'Huzurevleri', 'Yolboyu', 'Mezopotamya', 'Barış', 'Talaytepe', 'Gazi Yaşargil', 'Peyas'],
    'Bağlar': ['Bağcılar', '5 Nisan', 'Fatih', 'Mevlana Halit', 'Kaynartepe', 'Alipınar', 'Yenidoğan', 'Muradiye', 'Yunus Emre', 'Selahattin Eyyubi'],
    'Yenişehir': ['Ofis', 'Şehitlik', 'Üçkuyular', 'Kooperatifler', 'Cumhuriyet', 'Aziziye', 'Yolaltı', 'Yenişehir', 'Sanayi', 'Yeni Mahalle'],
    'Sur': ['Camii Nebi', 'Cevatpaşa', 'Ziya Gökalp', 'Lalebey', 'Hasırlı', 'Melikahmet', 'Abdaldede', 'Savaş', 'Alipaşa', 'Dabanoğlu']
  };

  const dataStore = DataStore.getInstance();

  useEffect(() => {
    setMounted(true);

    const unsubscribe = dataStore.subscribe(() => {
      const activeListings = dataStore.getActiveListings().sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setLatestListings(activeListings);
    });

    // Initial data load
    const activeListings = dataStore.getActiveListings().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setLatestListings(activeListings);

    return unsubscribe;
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Kategori sayılarını hesapla (gerçek verilerden)
  const getCategoryCounts = () => {
    const counts = {
      'Satılık Daire': latestListings.filter(l => l.category === 'Satılık Daire').length,
      'Kiralık Daire': latestListings.filter(l => l.category === 'Kiralık Daire').length,
      'Satılık Dükkan': latestListings.filter(l => l.category === 'Satılık Dükkan').length,
      'Kiralık Dükkan': latestListings.filter(l => l.category === 'Kiralık Dükkan').length,
      'Satılık Arsa': latestListings.filter(l => l.category === 'Satılık Arsa').length,
      'Araç': latestListings.filter(l => l.category === 'Araç').length
    };
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  const handleSearch = () => {
    let searchUrl = '/ilanlar?';
    const params = [];

    if (searchCategory) params.push(`kategori=${encodeURIComponent(searchCategory)}`);
    if (searchLocation) params.push(`lokasyon=${encodeURIComponent(searchLocation)}`);
    if (searchDistrict) params.push(`mahalle=${encodeURIComponent(searchDistrict)}`);

    window.location.href = searchUrl + params.join('&');
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

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
                className="group relative px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
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
                className="flex items-center w-full p-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
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

      {/* Hero Section with Search */}
      <section
        className="relative bg-cover bg-center py-20 md:py-32"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('https://readdy.ai/api/search-image?query=beautiful%20panoramic%20view%20of%20Diyarbakir%20city%20skyline%20with%20historic%20walls%2C%20modern%20buildings%20mixed%20with%20traditional%20architecture%2C%20golden%20hour%20lighting%2C%20professional%20cityscape%20photography&width=1200&height=500&seq=hero1&orientation=landscape')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 animate-fade-in">
              Diyarbakır'ın En Güvenilir
              <br className="hidden md:block" />
              <span className="text-blue-400">Emlak Platformu</span>
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 opacity-90">
              Ev, dükkan, arsa ve araç ilanlarının tek adresi
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              <div className="md:col-span-2">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 pr-8"
                >
                  <option value="">Tüm Kategoriler</option>
                  <option value="Satılık Daire">Satılık Daire</option>
                  <option value="Kiralık Daire">Kiralık Daire</option>
                  <option value="Satılık Dükkan">Satılık Dükkan</option>
                  <option value="Kiralık Dükkan">Kiralık Dükkan</option>
                  <option value="Satılık Arsa">Satılık Arsa</option>
                  <option value="Araç">Araç</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <select
                  value={searchLocation}
                  onChange={(e) => {
                    setSearchLocation(e.target.value);
                    setSearchDistrict('');
                  }}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 pr-8"
                >
                  <option value="">İlçe Seçin</option>
                  {Object.keys(locationData).map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <select
                  value={searchDistrict}
                  onChange={(e) => setSearchDistrict(e.target.value)}
                  disabled={!searchLocation}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 pr-8 disabled:bg-gray-100"
                >
                  <option value="">Mahalle Seçin</option>
                  {searchLocation && locationData[searchLocation]?.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-1">
                <button
                  onClick={handleSearch}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer whitespace-nowrap flex items-center justify-center"
                >
                  <i className="ri-search-line w-5 h-5 flex items-center justify-center md:mr-0 mr-2"></i>
                  <span className="md:hidden">Ara</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Listings */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Son Eklenen İlanlar
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              En güncel emlak ve araç ilanlarını keşfedin
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {latestListings.slice(0, 6).map((listing) => (
              <Link
                href={`/ilan/${listing.id}`}
                key={listing.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-2 hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      {listing.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {listing.title}
                  </h3>
                  <p className="text-xl md:text-2xl font-bold text-blue-600 mb-2">
                    {formatPrice(listing.price)}
                  </p>
                  <div className="flex items-center text-gray-600 mb-2 text-sm">
                    <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center mr-2"></i>
                    <span>{listing.location} - {listing.district}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <div className="flex items-center" suppressHydrationWarning={true}>
                      <i className="ri-calendar-line w-3 h-3 flex items-center justify-center mr-1"></i>
                      <span>{new Date(listing.createdAt).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link
              href="/ilanlar"
              className="bg-gray-100 text-gray-700 px-6 md:px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105 inline-block cursor-pointer whitespace-nowrap"
            >
              Tüm İlanları Görüntüle
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Kategoriler
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              İhtiyacınıza göre kategori seçin
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[
              { name: 'Satılık Daire', icon: 'ri-home-4-line', count: categoryCounts['Satılık Daire'] },
              { name: 'Kiralık Daire', icon: 'ri-key-line', count: categoryCounts['Kiralık Daire'] },
              { name: 'Satılık Dükkan', icon: 'ri-store-2-line', count: categoryCounts['Satılık Dükkan'] },
              { name: 'Kiralık Dükkan', icon: 'ri-building-line', count: categoryCounts['Kiralık Dükkan'] },
              { name: 'Satılık Arsa', icon: 'ri-landscape-line', count: categoryCounts['Satılık Arsa'] },
              { name: 'Araç', icon: 'ri-car-line', count: categoryCounts['Araç'] }
            ].map((category, index) => (
              <Link
                href={`/ilanlar?kategori=${encodeURIComponent(category.name)}`}
                key={index}
                className="group bg-white p-4 md:p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
              >
                <i className={`${category.icon} w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-blue-600 text-2xl md:text-3xl mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}></i>
                <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base group-hover:text-blue-600 transition-colors">{category.name}</h3>
                <p className="text-gray-600 text-xs md:text-sm">{category.count} ilan</p>
              </Link>
            ))}
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
                <Link href="/" className="block text-gray-300 hover:text-blue-400 cursor-pointer text-sm">
                  Anasayfa
                </Link>
                <Link href="/ilanlar" className="block text-gray-300 hover:text-blue-400 cursor-pointer text-sm">
                  Tüm İlanlar
                </Link>
                <Link href="/hizmetlerimiz" className="block text-gray-300 hover:text-blue-400 cursor-pointer text-sm">
                  Hizmetlerimiz
                </Link>
                <Link href="/hakkimizda" className="block text-gray-300 hover:text-blue-400 cursor-pointer text-sm">
                  Hakkımızda
                </Link>
                <Link href="/iletisim" className="block text-gray-300 hover:text-blue-400 cursor-pointer text-sm">
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
