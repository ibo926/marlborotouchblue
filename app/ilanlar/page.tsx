
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import FilterBar from './FilterBar';
import ListingCard from './ListingCard';
import DataStore, { Listing } from '../../lib/dataStore';

function IlanlarContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    district: '',
    minPrice: '',
    maxPrice: '',
    rooms: '',
    minYear: '',
    maxYear: ''
  });

  const dataStore = DataStore.getInstance();

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      const activeListings = dataStore.getActiveListings().sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setListings(activeListings);
    });

    // Initial data load
    const activeListings = dataStore.getActiveListings().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setListings(activeListings);

    return unsubscribe;
  }, []);

  // URL parametrelerinden filtreleri uygula
  useEffect(() => {
    const kategoriParam = searchParams.get('kategori');
    const lokasyonParam = searchParams.get('lokasyon');
    const mahalleParam = searchParams.get('mahalle');
    
    if (kategoriParam || lokasyonParam || mahalleParam) {
      setFilters(prev => ({
        ...prev,
        category: kategoriParam ? decodeURIComponent(kategoriParam) : '',
        location: lokasyonParam ? decodeURIComponent(lokasyonParam) : '',
        district: mahalleParam ? decodeURIComponent(mahalleParam) : ''
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...listings];

    if (filters.category) {
      filtered = filtered.filter(listing => listing.category === filters.category);
    }

    if (filters.location) {
      filtered = filtered.filter(listing => listing.location === filters.location);
    }

    if (filters.district) {
      filtered = filtered.filter(listing => listing.district === filters.district);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(listing => listing.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(listing => listing.price <= parseInt(filters.maxPrice));
    }

    if (filters.rooms) {
      const roomsNum = parseInt(filters.rooms);
      filtered = filtered.filter(listing => listing.rooms === roomsNum);
    }

    if (filters.minYear) {
      filtered = filtered.filter(listing => listing.year && listing.year >= parseInt(filters.minYear));
    }

    if (filters.maxYear) {
      filtered = filtered.filter(listing => listing.year && listing.year <= parseInt(filters.maxYear));
    }

    setFilteredListings(filtered);
  }, [filters, listings]);

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
                className="group relative px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-nowrap overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
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
                className="flex items-center w-full p-4 rounded-xl font-semibold text-gray-700 hover:text-blue-700 bg-gray-50 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
              >
                <i className="ri-home-4-line w-5 h-5 flex items-center justify-center mr-3"></i>
                Anasayfa
              </Link>
              
              <Link 
                href="/ilanlar" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center w-full p-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
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

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Tüm İlanlar
          </h1>
          <p className="text-gray-600">
            {filteredListings.length} ilan bulundu
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <FilterBar filters={filters} setFilters={setFilters} />
          </div>

          {/* Listings */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <i className="ri-search-line w-16 h-16 flex items-center justify-center text-gray-400 text-4xl mx-auto mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  İlan bulunamadı
                </h3>
                <p className="text-gray-600">
                  Arama kriterlerinizi değiştirerek tekrar deneyin.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IlanlarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">İlanlar yükleniyor...</p>
      </div>
    </div>}>
      <IlanlarContent />
    </Suspense>
  );
}
