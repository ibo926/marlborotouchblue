
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DataStore, { Listing, AdminUser } from '../../lib/dataStore';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'add' | 'users'>('overview');
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [editingListing, setEditingListing] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Partial<Listing>>({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [newUserData, setNewUserData] = useState<Partial<AdminUser>>({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    role: 'consultant',
    permissions: {
      canAddListing: true,
      canEditListing: true,
      canDeleteListing: false,
      canManageUsers: false
    }
  });
  const [currentUserId] = useState('1');

  const dataStore = DataStore.getInstance();

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      setListings(dataStore.getListings());
      setAdminUsers(dataStore.getAdminUsers());
    });

    setListings(dataStore.getListings());
    setAdminUsers(dataStore.getAdminUsers());

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

  const handleDeleteListing = (id: string) => {
    dataStore.deleteListing(id);
    setShowDeleteModal(null);
  };

  const handleToggleStatus = (id: string) => {
    const listing = dataStore.getListingById(id);
    if (listing) {
      dataStore.updateListing(id, {
        status: listing.status === 'active' ? 'inactive' : 'active'
      });
    }
  };

  const stats = {
    totalListings: listings.length,
    activeListings: listings.filter(l => l.status === 'active').length,
    inactiveListings: listings.filter(l => l.status === 'inactive').length,
    totalValue: listings.reduce((sum, l) => sum + l.price, 0),
    totalViews: listings.reduce((sum, l) => sum + l.views, 0),
    totalContactClicks: listings.reduce((sum, l) => sum + l.contactClicks, 0)
  };

  const handleEditListing = (listing: Listing) => {
    setEditingListing(listing.id);
    setEditingData(listing);
  };

  const handleSaveEdit = () => {
    if (editingListing) {
      dataStore.updateListing(editingListing, editingData);
      setEditingListing(null);
      setEditingData({});
    }
  };

  const handleCancelEdit = () => {
    setEditingListing(null);
    setEditingData({});
  };

  const generateUserCredentials = () => {
    const randomNum = Math.floor(Math.random() * 1000);
    const username = newUserData.fullName
      ? newUserData.fullName.toLowerCase().replace(/\s+/g, '') + randomNum
      : 'user' + Date.now();
    const password = 'password' + randomNum;

    setNewUserData(prev => ({
      ...prev,
      username,
      password
    }));
  };

  const handleAddUser = () => {
    if (newUserData.username && newUserData.password && newUserData.fullName) {
      dataStore.addAdminUser(newUserData as Omit<AdminUser, 'id' | 'createdAt'>);
      setShowUserModal(false);
      setNewUserData({
        username: '',
        password: '',
        fullName: '',
        email: '',
        phone: '',
        role: 'consultant',
        permissions: {
          canAddListing: true,
          canEditListing: true,
          canDeleteListing: false,
          canManageUsers: false
        }
      });
    }
  };

  const handleEditUser = (user: AdminUser) => {
    setEditingUser(user);
    setNewUserData(user);
    setShowUserModal(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      dataStore.updateAdminUser(editingUser.id, newUserData);
    } else {
      handleAddUser();
    }
    setShowUserModal(false);
    setEditingUser(null);
    setNewUserData({
      username: '',
      password: '',
      fullName: '',
      email: '',
      phone: '',
      role: 'consultant',
      permissions: {
        canAddListing: true,
        canEditListing: true,
        canDeleteListing: false,
        canManageUsers: false
      }
    });
  };

  const handleDeleteUser = (id: string) => {
    dataStore.deleteAdminUser(id);
  };

  const currentUser = dataStore.getAdminUserById(currentUserId);

  const featuresByCategory = {
    'Satılık Daire': [
      'Asansör', 'Otopark', 'Güvenlik', 'Balkon', 'Teras', 'Doğalgaz', 'Merkezi Sistem',
      'Kombi', 'Klima', 'İnternet Alt Yapısı', 'Kablo TV', 'Interkom', 'Camlı Balkon',
      'Amerikan Mutfak', 'Ayrı Mutfak', 'Giyinme Odası', 'Ebeveyn Banyosu', 'Çifte Banyo',
      'Laminat Parke', 'Seramik Zemin', 'Fayans', 'Yerden Isıtma', 'Panjur', 'Çelik Kapı',
      'PVC Pencere', 'Cam Balkon', 'Geniş Balkon', 'Köşe Dubleks', 'Giriş Katı', 'Ara Kat',
      'Üst Kat', 'Çatı Katı', 'Bodrum Katı', 'Site İçerisinde', 'Müstakil Bahçe',
      'Ortak Bahçe', 'Çocuk Parkı', 'Yüzme Havuzu', 'Spor Salonu', 'Kapalı Otopark',
      'Açık Otopark', 'Kamelya', 'Barbeku Alanı', 'Jeneratör', 'Su Deposu'
    ],
    'Kiralık Daire': [
      'Eşyalı', 'Eşyasız', 'Asansör', 'Otopark', 'Güvenlik', 'Balkon', 'Teras',
      'Doğalgaz', 'Merkezi Sistem', 'Kombi', 'Klima', 'İnternet Alt Yapısı', 'Kablo TV',
      'Interkom', 'Camlı Balkon', 'Amerikan Mutfak', 'Ayrı Mutfak', 'Beyaz Eşya',
      'Bulaşık Makinesi', 'Çamaşır Makinesi', 'Buzdolabı', 'Fırın', 'Ocak', 'Televizyon',
      'Mobilyalı', 'Yatak Takımı', 'Oturma Takımı', 'Yemek Takımı', 'Dolap', 'Perde',
      'Halı', 'Aydınlatma', 'Dekorasyon', 'Giyinme Odası', 'Çifte Banyo', 'Laminat Parke',
      'Seramik Zemin', 'Yerden Isıtma', 'Panjur', 'Çelik Kapı', 'PVC Pencere'
    ],
    'Satılık Dükkan': [
      'Ana Cadde', 'Ara Sokak', 'AVM İçi', 'Pasaj İçi', 'Giriş Katı', 'Bodrum Katı',
      'Üst Kat', 'Çatı Katı', 'Vitrin', 'Geniş Vitrin', 'Köşe Başı', 'İki Vitrinli',
      'WC', 'Lavabo', 'Duş', 'Mutfak', 'Depo', 'Kiler', 'Asma Kat', 'Galerimsi',
      'Açık Alan', 'Kapalı Alan', 'Klima Alt Yapısı', 'İnternet Alt Yapısı', 'Telefon Hattı',
      'Yangın Merdiveni', 'Acil Çıkış', 'Güvenlik Sistemi', 'Alarm', 'Kamera Sistemi',
      'Kesintisiz Güç', 'Jeneratör', 'Su Deposu', 'Rampa', 'Yükleme Boşaltma', 'Kargo',
      'Otopark', 'Vale', 'Çay Ocağı', 'Ofis Bölümü', 'Büro', 'Toplantı Odası'
    ],
    'Kiralık Dükkan': [
      'Ana Cadde', 'Ara Sokak', 'AVM İçi', 'Pasaj İçi', 'Giriş Katı', 'Bodrum Katı',
      'Vitrin', 'Geniş Vitrin', 'Köşe Başı', 'WC', 'Lavabo', 'Mutfak', 'Depo',
      'Klima Alt Yapısı', 'İnternet Alt Yapısı', 'Telefon Hattı', 'Güvenlik Sistemi',
      'Kamera Sistemi', 'Otopark', 'Vale', 'Çay Ocağı', 'Rampa', 'Yükleme Boşaltma',
      'Eşyalı', 'Eşyasız', 'Mobilyalı', 'Tezgah', 'Raf Sistemi', 'Vitrin Dolabı',
      'Kasa', 'Büro Masası', 'Sandalye', 'Klima', 'Televizyon', 'Ses Sistemi'
    ],
    'Satılık Arsa': [
      'İmar Durumu Net', 'İmarlı', 'İmarsız', 'Yapı Ruhsatı Alınabilir', 'Kat İrtifakı',
      'Ada İçi', 'Köşe Parsel', 'Ana Yola Cepheli', 'Ara Yola Cepheli', 'İki Yola Cepheli',
      'Üç Yola Cepheli', 'Meydan Cepheli', 'Deniz Manzaralı', 'Şehir Manzaralı', 'Dağ Manzaralı',
      'Elektrik', 'Su', 'Doğalgaz', 'Kanalizasyon', 'Telefon', 'İnternet Alt Yapısı',
      'Asfalt Yol', 'Stabilize Yol', 'Toprak Yol', 'Ulaşım Kolay', 'Çevrili', 'Açık Alan',
      'Ağaçlık', 'Düz Arazi', 'Eğimli Arazi', 'Yamaç', 'Vadi', 'Tepe', 'Bahçe',
      'Meyve Ağaçları', 'Zeytin Ağaçları', 'Su Kuyusu', 'Artezyen', 'Gölet', 'Dere Kenarı'
    ],
    'Araç': [
      'Hasar Kaydı Yok', 'Az Hasarlı', 'Orta Hasarlı', 'Ağır Hasarlı', 'Hasarlı Değil',
      'Boyasız', 'Az Boyalı', 'Orta Boyalı', 'Çok Boyalı', 'Lokal Boyalı', 'Tam Boyalı',
      'Orijinal', 'Modifiyeli', 'Tuning', 'Değişen Parça Yok', 'Motor Değişmemiş',
      'Şanzıman Değişmemiş', 'Kaza Geçirmemiş', 'Bakımları Yapılı', 'Servis Bakımlı',
      'Özel Servis', 'Yetkili Servis', 'Garage Çıkışlı', 'İlk Elden', 'İkinci El',
      'Üçüncü El', 'Taksi', 'Ticari Kullanım', 'Özel Kullanım', 'Kiralık Geçmiş',
      'Krediye Uygun', 'Peşin Satış', 'Takas Olur', 'Takas Olmaz', 'Vade Olur',
      'Vade Olmaz', 'Garantili', 'Garantisiz', 'Muayeneli', 'Muayenesiz', 'Plakasız'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              {/* Modern Back Button */}
              {activeTab !== 'overview' && (
                <button
                  onClick={() => setActiveTab('overview')}
                  className="group flex items-center bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center mr-2 group-hover:-translate-x-1 transition-transform duration-300"></i>
                  <span className="font-medium">Genel Bakış</span>
                </button>
              )}

              <Link href="/" className="flex items-center space-x-2 ml-4">
                <div className="bg-blue-600 p-2 rounded-xl">
                  <i className="ri-home-heart-line w-8 h-8 flex items-center justify-center text-white"></i>
                </div>
                <div>
                  <span className="text-2xl font-['Pacifico'] text-blue-600">diyarbakır</span>
                  <span className="text-xl font-bold text-gray-800">emlak</span>
                </div>
              </Link>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Admin Panel
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
                title="Siteyi Görüntüle"
              >
                <i className="ri-external-link-line w-5 h-5 flex items-center justify-center"></i>
              </Link>
              <button
                onClick={onLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', name: 'Genel Bakış', icon: 'ri-dashboard-line' },
              { id: 'listings', name: 'İlanlar', icon: 'ri-list-check' },
              { id: 'add', name: 'Yeni İlan', icon: 'ri-add-circle-line' },
              { id: 'users', name: 'Admin Hesapları', icon: 'ri-user-settings-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`${tab.icon} w-5 h-5 flex items-center justify-center mr-2`}></i>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Yönetici Paneli
            </h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 mr-4">
                    <i className="ri-file-list-3-line w-6 h-6 flex items-center justify-center text-blue-600"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Toplam İlan</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalListings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 mr-4">
                    <i className="ri-check-line w-6 h-6 flex items-center justify-center text-green-600"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Aktif İlan</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 mr-4">
                    <i className="ri-pause-line w-6 h-6 flex items-center justify-center text-yellow-600"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pasif İlan</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.inactiveListings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 mr-4">
                    <i className="ri-money-dollar-circle-line w-6 h-6 flex items-center justify-center text-purple-600"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Toplam Değer</p>
                    <p className="text-xl font-bold text-gray-900">{formatPrice(stats.totalValue)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Görüntülenme İstatistikleri</h3>
                  <i className="ri-eye-line w-6 h-6 flex items-center justify-center text-blue-600"></i>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stats.totalViews.toLocaleString('tr-TR')}
                </div>
                <p className="text-gray-600">Toplam görüntülenme sayısı</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">İletişim İstatistikleri</h3>
                  <i className="ri-phone-line w-6 h-6 flex items-center justify-center text-green-600"></i>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stats.totalContactClicks}
                </div>
                <p className="text-gray-600">Toplam iletişim tıklaması</p>
              </div>
            </div>

            {/* Recent Listings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Son İlanlar</h2>
                <button
                  onClick={() => setActiveTab('listings')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer whitespace-nowrap transition-colors"
                >
                  Tümünü Gör
                </button>
              </div>

              <div className="space-y-4">
                {listings.slice(0, 5).map((listing) => (
                  <div key={listing.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-16 h-16 rounded-lg object-cover object-top"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                      <p className="text-sm text-gray-600">{listing.category} • {listing.location} - {listing.district}</p>
                      <p className="text-sm font-bold text-blue-600">{formatPrice(listing.price)}</p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <i className="ri-eye-line w-4 h-4 flex items-center justify-center mr-1"></i>
                        <span>{listing.views}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-1"></i>
                        <span>{listing.contactClicks}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        listing.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {listing.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">İlan Yönetimi</h1>
              <button
                onClick={() => setActiveTab('add')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-add-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                Yeni İlan Ekle
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İlan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fiyat
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İstatistikler
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listings.map((listing) => (
                      <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={listing.image}
                              alt={listing.title}
                              className="w-12 h-12 rounded-lg object-cover object-top mr-4"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900 line-clamp-1">{listing.title}</p>
                              <p className="text-sm text-gray-500">{listing.location} - {listing.district}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {listing.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {formatPrice(listing.price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <i className="ri-eye-line w-4 h-4 flex items-center justify-center mr-1"></i>
                              <span>{listing.views}</span>
                            </div>
                            <div className="flex items-center">
                              <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-1"></i>
                              <span>{listing.contactClicks}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleStatus(listing.id)}
                            className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer whitespace-nowrap transition-colors ${
                              listing.status === 'active'
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            }`}
                          >
                            {listing.status === 'active' ? 'Aktif' : 'Pasif'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Link
                              href={`/ilan/${listing.id}`}
                              className="text-blue-600 hover:text-blue-900 cursor-pointer transition-colors"
                              title="Görüntüle"
                            >
                              <i className="ri-eye-line w-4 h-4 flex items-center justify-center"></i>
                            </Link>
                            <button
                              onClick={() => handleEditListing(listing)}
                              className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
                              title="Düzenle"
                            >
                              <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
                            </button>
                            <button
                              onClick={() => handleToggleStatus(listing.id)}
                              className={`cursor-pointer transition-colors ${
                                listing.status === 'active'
                                  ? 'text-yellow-600 hover:text-yellow-900'
                                  : 'text-green-600 hover:text-green-900'
                              }`}
                              title={listing.status === 'active' ? 'Pasife Al' : 'Aktife Al'}
                            >
                              <i className={`${listing.status === 'active' ? 'ri-pause-line' : 'ri-play-line'} w-4 h-4 flex items-center justify-center`}></i>
                            </button>
                            <button
                              onClick={() => setShowDeleteModal(listing.id)}
                              className="text-red-600 hover:text-red-900 cursor-pointer transition-colors"
                              title="Sil"
                            >
                              <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'add' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Yeni İlan Ekle</h1>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      İlan Başlığı
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="İlan başlığını girin"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8 transition-colors"
                      onChange={(e) => setEditingData(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="">Kategori Seçin</option>
                      <option value="Satılık Daire">Satılık Daire</option>
                      <option value="Kiralık Daire">Kiralık Daire</option>
                      <option value="Satılık Dükkan">Satılık Dükkan</option>
                      <option value="Kiralık Dükkan">Kiralık Dükkan</option>
                      <option value="Satılık Arsa">Satılık Arsa</option>
                      <option value="Araç">Araç</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fiyat (TL)
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      İlçe
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8 transition-colors">
                      <option value="">İlçe Seçin</option>
                      <option value="Kayapınar">Kayapınar</option>
                      <option value="Bağlar">Bağlar</option>
                      <option value="Yenişehir">Yenişehir</option>
                      <option value="Sur">Sur</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alan (m²)
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Oda Sayısı
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8 transition-colors">
                      <option value="">Oda Sayısı Seçin</option>
                      <option value="1">1+1</option>
                      <option value="2">2+1</option>
                      <option value="3">3+1</option>
                      <option value="4">4+1</option>
                      <option value="5">5+1</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="İlan detaylarını yazın..."
                    maxLength={500}
                  ></textarea>
                </div>

                {/* Özellikler Bölümü */}
                {editingData.category && featuresByCategory[editingData.category] && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Özellikler ({editingData.category})
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                      {featuresByCategory[editingData.category].map((feature, index) => (
                        <label key={index} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                          />
                          <span className="text-sm text-gray-700 select-none">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fotoğraflar
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <i className="ri-upload-cloud-line w-12 h-12 flex items-center justify-center text-gray-400 text-3xl mx-auto mb-4"></i>
                    <p className="text-gray-600 mb-2">Fotoğrafları buraya sürükleyin veya</p>
                    <button
                      type="button"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Dosya Seç
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    İlanı Kaydet
                  </button>
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Admin Hesap Yönetimi</h1>
              <button
                onClick={() => {
                  setEditingUser(null);
                  setNewUserData({
                    username: '',
                    password: '',
                    fullName: '',
                    email: '',
                    phone: '',
                    role: 'consultant',
                    permissions: {
                      canAddListing: true,
                      canEditListing: true,
                      canDeleteListing: false,
                      canManageUsers: false
                    }
                  });
                  setShowUserModal(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-user-add-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                Yeni Hesap Ekle
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminUsers.map((user) => (
                <div key={user.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100">
                          <i className="ri-user-line w-8 h-8 flex items-center justify-center text-blue-600"></i>
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{user.fullName}</h3>
                    <p className="text-sm text-gray-600 mb-1">@{user.username}</p>
                    <p className="text-xs text-gray-500 mb-2">{user.password}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'admin' ? 'Admin' : 'Danışman'}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-mail-line w-4 h-4 flex items-center justify-center mr-2"></i>
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-2"></i>
                      <span>{user.phone}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Yetkiler</h4>
                    <div className="space-y-1">
                      {Object.entries(user.permissions).map(([key, value]) => (
                        <div key={key} className="flex items-center text-xs">
                          <i className={`${value ? 'ri-check-line text-green-600' : 'ri-close-line text-red-600'} w-3 h-3 flex items-center justify-center mr-2`}></i>
                          <span className="text-gray-600">
                            {key === 'canAddListing' && 'İlan Ekleme'}
                            {key === 'canEditListing' && 'İlan Düzenleme'}
                            {key === 'canDeleteListing' && 'İlan Silme'}
                            {key === 'canManageUsers' && 'Hesap Yönetimi'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer text-sm whitespace-nowrap"
                    >
                      <i className="ri-edit-line w-4 h-4 flex items-center justify-center inline mr-1"></i>
                      Düzenle
                    </button>
                    {user.id !== currentUserId && adminUsers.length > 1 && (
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-100 text-red-700 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors cursor-pointer text-sm whitespace-nowrap"
                      >
                        <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Management Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingUser ? 'Hesap Düzenle' : 'Yeni Hesap Ekle'}
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  value={newUserData.fullName || ''}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Ad Soyad"
                />
              </div>

              <div className="flex justify-end mb-4">
                <button
                  onClick={generateUserCredentials}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer text-sm whitespace-nowrap"
                >
                  <i className="ri-refresh-line w-4 h-4 flex items-center justify-center inline mr-1"></i>
                  Otomatik Oluştur
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kullanıcı Adı *
                  </label>
                  <input
                    type="text"
                    value={newUserData.username || ''}
                    onChange={(e) => setNewUserData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Kullanıcı adı"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şifre *
                  </label>
                  <input
                    type="text"
                    value={newUserData.password || ''}
                    onChange={(e) => setNewUserData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Şifre"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={newUserData.email || ''}
                    onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="E-posta adresi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={newUserData.phone || ''}
                    onChange={(e) => setNewUserData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Telefon numarası"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol
                </label>
                <select
                  value={newUserData.role || 'consultant'}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, role: e.target.value as 'admin' | 'consultant' }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8 transition-colors"
                >
                  <option value="consultant">Danışman</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Yetkiler
                </label>
                <div className="space-y-3">
                  {Object.entries(newUserData.permissions || {}).map(([key, value]) => (
                    <label key={key} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setNewUserData(prev => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            [key]: e.target.checked
                          }
                        }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer mr-3"
                      />
                      <span className="text-gray-700">
                        {key === 'canAddListing' && 'İlan Ekleme'}
                        {key === 'canEditListing' && 'İlan Düzenleme'}
                        {key === 'canDeleteListing' && 'İlan Silme'}
                        {key === 'canManageUsers' && 'Hesap Yönetimi'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSaveUser}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {editingUser ? 'Değişiklikleri Kaydet' : 'Hesap Ekle'}
                </button>
                <button
                  onClick={() => {
                    setShowUserModal(false);
                    setEditingUser(null);
                  }}
                  className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer whitespace-nowrap"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4 transform scale-100 transition-transform">
            <div className="text-center mb-6">
              <i className="ri-error-warning-line w-16 h-16 flex items-center justify-center text-red-500 text-4xl mx-auto mb-4"></i>
              <h3 className="text-lg font-bold text-gray-900 mb-2">İlanı Sil</h3>
              <p className="text-gray-600">
                Bu ilanı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDeleteListing(showDeleteModal)}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Sil
              </button>
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer whitespace-nowrap"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* İlan Düzenleme Modal */}
      {editingListing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">İlan Düzenle</h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İlan Başlığı
                  </label>
                  <input
                    type="text"
                    value={editingData.title || ''}
                    onChange={(e) => setEditingData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori
                  </label>
                  <select
                    value={editingData.category || ''}
                    onChange={(e) => setEditingData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8 transition-colors"
                  >
                    <option value="">Kategori Seçin</option>
                    <option value="Satılık Daire">Satılık Daire</option>
                    <option value="Kiralık Daire">Kiralık Daire</option>
                    <option value="Satılık Dükkan">Satılık Dükkan</option>
                    <option value="Kiralık Dükkan">Kiralık Dükkan</option>
                    <option value="Satılık Arsa">Satılık Arsa</option>
                    <option value="Araç">Araç</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fiyat (TL)
                  </label>
                  <input
                    type="number"
                    value={editingData.price || ''}
                    onChange={(e) => setEditingData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İlçe
                  </label>
                  <input
                    type="text"
                    value={editingData.location || ''}
                    onChange={(e) => setEditingData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mahalle
                  </label>
                  <input
                    type="text"
                    value={editingData.district || ''}
                    onChange={(e) => setEditingData(prev => ({ ...prev, district: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alan (m²)
                  </label>
                  <input
                    type="number"
                    value={editingData.area || ''}
                    onChange={(e) => setEditingData(prev => ({ ...prev, area: parseInt(e.target.value) || 0 }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                {(editingData.category === 'Satılık Daire' || editingData.category === 'Kiralık Daire') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Oda Sayısı
                    </label>
                    <input
                      type="number"
                      value={editingData.rooms || ''}
                      onChange={(e) => setEditingData(prev => ({ ...prev, rooms: parseInt(e.target.value) || 0 }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                )}

                {editingData.category === 'Araç' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Model Yılı
                    </label>
                    <input
                      type="number"
                      value={editingData.year || ''}
                      onChange={(e) => setEditingData(prev => ({ ...prev, year: parseInt(e.target.value) || 0 }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama
                </label>
                <textarea
                  rows={6}
                  value={editingData.description || ''}
                  onChange={(e) => setEditingData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  maxLength={500}
                ></textarea>
              </div>

              {/* Özellikler Düzenleme */}
              {editingData.category && featuresByCategory[editingData.category] && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Özellikler ({editingData.category})
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                    {featuresByCategory[editingData.category].map((feature, index) => (
                      <label key={index} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                        <input
                          type="checkbox"
                          defaultChecked={editingData.features?.includes(feature)}
                          onChange={(e) => {
                            const currentFeatures = editingData.features || [];
                            if (e.target.checked) {
                              setEditingData(prev => ({
                                ...prev,
                                features: [...currentFeatures, feature]
                              }));
                            } else {
                              setEditingData(prev => ({
                                ...prev,
                                features: currentFeatures.filter(f => f !== feature)
                              }));
                            }
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-sm text-gray-700 select-none">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSaveEdit}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Değişiklikleri Kaydet
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer whitespace-nowrap"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
