
'use client';

interface FilterBarProps {
  filters: {
    category: string;
    location: string;
    district: string;
    minPrice: string;
    maxPrice: string;
    rooms: string;
    minYear: string;
    maxYear: string;
  };
  setFilters: (filters: any) => void;
}

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  const categories = [
    'Satılık Daire',
    'Kiralık Daire', 
    'Satılık Dükkan',
    'Kiralık Dükkan',
    'Satılık Arsa',
    'Araç'
  ];

  // Güncellenmiş mahalle verileri
  const locationData = {
    'Kayapınar': ['Diclekent', 'Fırat', 'Medya', 'Huzurevleri', 'Yolboyu', 'Mezopotamya', 'Barış', 'Talaytepe', 'Gazi Yaşargil', 'Peyas'],
    'Bağlar': ['Bağcılar', '5 Nisan', 'Fatih', 'Mevlana Halit', 'Kaynartepe', 'Alipınar', 'Yenidoğan', 'Muradiye', 'Yunus Emre', 'Selahattin Eyyubi'],
    'Yenişehir': ['Ofis', 'Şehitlik', 'Üçkuyular', 'Kooperatifler', 'Cumhuriyet', 'Aziziye', 'Yolaltı', 'Yenişehir', 'Sanayi', 'Yeni Mahalle'],
    'Sur': ['Camii Nebi', 'Cevatpaşa', 'Ziya Gökalp', 'Lalebey', 'Hasırlı', 'Melikahmet', 'Abdaldede', 'Savaş', 'Alipaşa', 'Dabanoğlu']
  };

  const roomOptions = [
    { value: '2', label: '1+1' },
    { value: '3', label: '2+1' },
    { value: '4', label: '3+1' },
    { value: '5', label: '4+1' },
    { value: '6', label: '5+' }
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      // Lokasyon değiştiğinde mahalle seçimini sıfırla
      ...(key === 'location' ? { district: '' } : {})
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      location: '',
      district: '',
      minPrice: '',
      maxPrice: '',
      rooms: '',
      minYear: '',
      maxYear: ''
    });
  };

  const isDaireCategory = filters.category === 'Satılık Daire' || filters.category === 'Kiralık Daire';
  const isAracCategory = filters.category === 'Araç';
  const isArsaCategory = filters.category === 'Satılık Arsa';

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-lg font-bold text-gray-900">Filtreler</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer whitespace-nowrap transition-colors"
        >
          Temizle
        </button>
      </div>

      <div className="space-y-4 md:space-y-6">
        {/* Kategori */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Kategori
          </label>
          <div className="space-y-2">
            <div 
              onClick={() => handleFilterChange('category', '')}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                filters.category === '' ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 transform scale-105' : 'bg-gray-50 hover:bg-gray-100 hover:scale-105'
              }`}
            >
              Tümü
            </div>
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => handleFilterChange('category', category)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  filters.category === category ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 transform scale-105' : 'bg-gray-50 hover:bg-gray-100 hover:scale-105'
                }`}
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        {/* İlçe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            İlçe
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8 transition-all duration-200 hover:border-blue-300"
          >
            <option value="">Tüm İlçeler</option>
            {Object.keys(locationData).map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Mahalle */}
        {filters.location && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Mahalle
            </label>
            <select
              value={filters.district}
              onChange={(e) => handleFilterChange('district', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8 transition-all duration-200 hover:border-blue-300"
            >
              <option value="">Tüm Mahalleler</option>
              {locationData[filters.location]?.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Fiyat Aralığı */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Fiyat Aralığı (TL)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 hover:border-blue-300"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 hover:border-blue-300"
            />
          </div>
        </div>

        {/* Oda Sayısı (Sadece Daire için) */}
        {isDaireCategory && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Oda Sayısı
            </label>
            <div className="space-y-2">
              <div 
                onClick={() => handleFilterChange('rooms', '')}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 text-center ${
                  filters.rooms === '' ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 transform scale-105' : 'bg-gray-50 hover:bg-gray-100 hover:scale-105'
                }`}
              >
                Tümü
              </div>
              {roomOptions.map((room) => (
                <div
                  key={room.value}
                  onClick={() => handleFilterChange('rooms', room.value)}
                  className={`p-3 text-center rounded-lg cursor-pointer transition-all duration-200 ${
                    filters.rooms === room.value 
                      ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 transform scale-105' 
                      : 'bg-gray-50 hover:bg-gray-100 hover:scale-105'
                  }`}
                >
                  {room.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Yıl Aralığı (Sadece Araç için) */}
        {isAracCategory && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Model Yılı
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Min Yıl"
                value={filters.minYear}
                onChange={(e) => handleFilterChange('minYear', e.target.value)}
                min="1990"
                max="2024"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 hover:border-blue-300"
              />
              <input
                type="number"
                placeholder="Max Yıl"
                value={filters.maxYear}
                onChange={(e) => handleFilterChange('maxYear', e.target.value)}
                min="1990"
                max="2024"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 hover:border-blue-300"
              />
            </div>
          </div>
        )}

        {/* Arsa için özel bilgi */}
        {isArsaCategory && (
          <div className="bg-blue-50 p-4 rounded-lg animate-fade-in">
            <h4 className="font-medium text-blue-900 mb-2">Arsa Filtreleri</h4>
            <p className="text-sm text-blue-700">
              Arsa ilanları için ilçe, mahalle ve fiyat aralığı filtrelerini kullanabilirsiniz.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}