
'use client';

import Link from 'next/link';
import DataStore from '../../lib/dataStore';

interface Listing {
  id: string;
  title: string;
  price: number;
  category: string;
  location: string;
  district: string;
  image: string;
  createdAt: string;
  description: string;
  rooms?: number;
  area?: number;
  year?: number;
  views: number;
  contactClicks: number;
}

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const dataStore = DataStore.getInstance();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleCardClick = () => {
    // Increment view count when card is clicked
    dataStore.incrementViews(listing.id);
  };

  return (
    <Link
      href={`/ilan/${listing.id}`}
      onClick={handleCardClick}
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
        
        {/* Additional Info */}
        <div className="flex items-center justify-between text-gray-500 text-xs mb-3">
          {listing.area && (
            <div className="flex items-center">
              <i className="ri-aspect-ratio-line w-3 h-3 flex items-center justify-center mr-1"></i>
              <span>{listing.area} m²</span>
            </div>
          )}
          {listing.rooms && (
            <div className="flex items-center">
              <i className="ri-door-line w-3 h-3 flex items-center justify-center mr-1"></i>
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
            <div className="flex items-center">
              <i className="ri-calendar-line w-3 h-3 flex items-center justify-center mr-1"></i>
              <span>{listing.year}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between text-gray-500 text-xs border-t pt-3">
          <div className="flex items-center" suppressHydrationWarning={true}>
            <i className="ri-time-line w-3 h-3 flex items-center justify-center mr-1"></i>
            <span>{new Date(listing.createdAt).toLocaleDateString('tr-TR')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
