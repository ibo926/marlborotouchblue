
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DataStore, { Listing } from '../../../lib/dataStore';

interface ListingDetailProps {
  listingId: string;
}

export default function ListingDetail({ listingId }: ListingDetailProps) {
  const router = useRouter();
  const [listing, setListing] = useState<Listing | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const dataStore = DataStore.getInstance();

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      const updatedListing = dataStore.getListingById(listingId);
      setListing(updatedListing || null);
    });

    // Initial data load
    const initialListing = dataStore.getListingById(listingId);
    setListing(initialListing || null);

    // Increment view count
    if (initialListing) {
      dataStore.incrementViews(listingId);
    }

    return unsubscribe;
  }, [listingId]);

  const handleContactClick = () => {
    setShowContactInfo(!showContactInfo);
    if (listing && !showContactInfo) {
      dataStore.incrementContactClicks(listingId);
    }
  };

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">İlan bulunamadı</h2>
          <Link href="/ilanlar" className="text-blue-600 hover:text-blue-700 cursor-pointer">
            Tüm ilanları görüntüle
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Mock images array for display
  const images = [
    listing.image,
    listing.image.replace('&seq=', '&seq=alt1_'),
    listing.image.replace('&seq=', '&seq=alt2_'),
    listing.image.replace('&seq=', '&seq=alt3_')
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/905319393386"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors cursor-pointer flex items-center justify-center"
        >
          <i className="ri-whatsapp-line w-6 h-6 flex items-center justify-center"></i>
        </a>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm border-b relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Modern Back Button - Top Left */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <button
                onClick={() => router.back()}
                className="group flex items-center bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center mr-2 group-hover:-translate-x-1 transition-transform duration-300"></i>
                <span className="font-medium">Geri Dön</span>
              </button>
            </div>

            <Link href="/" className="text-2xl font-['Pacifico'] text-blue-600 mx-auto">
              diyarbakirsahibinden.com
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Anasayfa
              </Link>
              <Link href="/ilanlar" className="text-gray-700 hover:text-blue-600 font-medium">
                Tüm İlanlar
              </Link>
              <Link href="/hizmetlerimiz" className="text-gray-700 hover:text-blue-600 font-medium">
                Hizmetlerimiz
              </Link>
              <Link href="/hakkimizda" className="text-gray-700 hover:text-blue-600 font-medium">
                Hakkımızda
              </Link>
              <Link href="/iletisim" className="text-gray-700 hover:text-blue-600 font-medium">
                İletişim
              </Link>
              <Link href="/admin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                Yönetici Paneli
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 cursor-pointer">Anasayfa</Link>
            <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
            <Link href="/ilanlar" className="hover:text-blue-600 cursor-pointer">İlanlar</Link>
            <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
            <span className="text-gray-900">{listing.category}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery & Description */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="relative h-96">
                <img
                  src={images[currentImageIndex]}
                  alt={listing.title}
                  className="w-full h-full object-cover object-top"
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors cursor-pointer"
                    >
                      <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center"></i>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors cursor-pointer"
                    >
                      <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center"></i>
                    </button>
                  </>
                )}
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="p-4 grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 rounded-lg overflow-hidden cursor-pointer ${
                        index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${listing.title} ${index + 1}`}
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Açıklama</h2>
              <p className="text-gray-700 leading-relaxed">
                {listing.description}
              </p>
            </div>

            {/* Features */}
            {listing.features && listing.features.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Özellikler</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {listing.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <i className="ri-check-line w-4 h-4 flex items-center justify-center text-green-600"></i>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {listing.category}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {listing.title}
              </h1>

              <div className="text-3xl font-bold text-blue-600 mb-6">
                {formatPrice(listing.price)}
              </div>

              {/* Property Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <i className="ri-map-pin-line w-5 h-5 flex items-center justify-center mr-3"></i>
                  <span>{listing.location} - {listing.district}</span>
                </div>
                
                {listing.area && (
                  <div className="flex items-center text-gray-600">
                    <i className="ri-aspect-ratio-line w-5 h-5 flex items-center justify-center mr-3"></i>
                    <span>{listing.area} m²</span>
                  </div>
                )}
                
                {listing.rooms && (
                  <div className="flex items-center text-gray-600">
                    <i className="ri-door-line w-5 h-5 flex items-center justify-center mr-3"></i>
                    <span>
                      {listing.rooms === 2 ? '1+1' : 
                       listing.rooms === 3 ? '2+1' : 
                       listing.rooms === 4 ? '3+1' : 
                       listing.rooms === 5 ? '4+1' : 
                       listing.rooms + '+1'}
                    </span>
                  </div>
                )}
                
                {listing.year && (
                  <div className="flex items-center text-gray-600">
                    <i className="ri-calendar-line w-5 h-5 flex items-center justify-center mr-3"></i>
                    <span>{listing.year} Model</span>
                  </div>
                )}
                
                <div className="flex items-center text-gray-600">
                  <i className="ri-time-line w-5 h-5 flex items-center justify-center mr-3"></i>
                  <span>{new Date(listing.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>

              {/* Modern Contact Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-4 border border-blue-100">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <i className="ri-user-heart-line w-8 h-8 flex items-center justify-center text-white"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">İletişim</h3>
                  <p className="text-sm text-gray-600">Uzman danışmanımızla iletişime geçin</p>
                </div>

                {!showContactInfo ? (
                  <button
                    onClick={handleContactClick}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-phone-line w-5 h-5 flex items-center justify-center inline mr-2"></i>
                    İletişim Bilgilerini Göster
                  </button>
                ) : (
                  <div className="space-y-4">
                    {/* Agent Info */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                          <i className="ri-user-line w-6 h-6 flex items-center justify-center text-gray-600"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{listing.agentName || 'Halil İbrahim Ayverdi'}</h4>
                          <p className="text-sm text-gray-600">Emlak Danışmanı</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-3 text-green-600"></i>
                          <span className="font-medium">{listing.agentPhone || '+90 531 939 3386'}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <i className="ri-mail-line w-4 h-4 flex items-center justify-center mr-3 text-blue-600"></i>
                          <span className="text-sm">{listing.agentEmail || 'info@diyarbakirsahibinden.com'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href={`tel:${listing.agentPhone || '+905319393386'}`}
                        className="flex items-center justify-center bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-md cursor-pointer"
                      >
                        <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-2"></i>
                        <span className="text-sm">Ara</span>
                      </a>
                      <a
                        href={`https://wa.me/${(listing.agentPhone || '+905319393386').replace(/\s+/g, '').replace('+', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-green-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-600 transition-all duration-300 hover:scale-105 shadow-md cursor-pointer"
                      >
                        <i className="ri-whatsapp-line w-4 h-4 flex items-center justify-center mr-2"></i>
                        <span className="text-sm">WhatsApp</span>
                      </a>
                    </div>

                    <button
                      onClick={handleContactClick}
                      className="w-full text-gray-600 hover:text-gray-800 py-2 text-sm font-medium transition-colors cursor-pointer"
                    >
                      <i className="ri-eye-off-line w-4 h-4 flex items-center justify-center inline mr-1"></i>
                      Gizle
                    </button>
                  </div>
                )}
              </div>

              {/* Share & Save */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center">
                  <i className="ri-heart-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  <span>Kaydet</span>
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center">
                  <i className="ri-share-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  <span>Paylaş</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
