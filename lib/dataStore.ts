
// Global data store for synchronizing data across all pages
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
  status: 'active' | 'inactive';
  views: number;
  contactClicks: number;
  features?: string[];
  agentId?: string;
  agentName?: string;
  agentPhone?: string;
  agentEmail?: string;
}

interface AdminUser {
  id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'admin' | 'consultant';
  avatar?: string;
  createdAt: string;
  permissions: {
    canAddListing: boolean;
    canEditListing: boolean;
    canDeleteListing: boolean;
    canManageUsers: boolean;
  };
}

class DataStore {
  private static instance: DataStore;
  private listings: Listing[] = [];
  private adminUsers: AdminUser[] = [];
  private subscribers: Array<() => void> = [];

  private constructor() {
    this.initializeData();
  }

  static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  private initializeData() {
    // Initialize mock listings with agent information
    this.listings = [
      {
        id: '1',
        title: 'Merkez\'de 3+1 Satılık Daire',
        price: 850000,
        category: 'Satılık Daire',
        location: 'Kayapınar',
        district: 'Diclekent',
        image: 'https://readdy.ai/api/search-image?query=modern%20apartment%20living%20room%20with%20natural%20lighting%2C%20clean%20white%20walls%2C%20comfortable%20furniture%2C%20warm%20atmosphere%2C%20real%20estate%20photography%20style&width=300&height=200&seq=listing1&orientation=landscape',
        createdAt: '2024-01-15T10:30:00',
        description: 'Merkezi konumda, yeni yapı 3+1 daire. Asansörlü bina, otopark mevcut.',
        rooms: 4,
        area: 120,
        status: 'active',
        views: 245,
        contactClicks: 12,
        features: ['Asansör', 'Otopark', 'Güvenlik', 'Balkon', 'Doğalgaz'],
        agentId: '1',
        agentName: 'Halil İbrahim Ayverdi',
        agentPhone: '+90 531 939 3386',
        agentEmail: 'admin@diyarbakirsahibinden.com'
      },
      {
        id: '2',
        title: 'Ana Cadde Üzeri Satılık Dükkan',
        price: 1200000,
        category: 'Satılık Dükkan',
        location: 'Bağlar',
        district: 'Bağcılar',
        image: 'https://readdy.ai/api/search-image?query=commercial%20shop%20storefront%20with%20large%20windows%2C%20modern%20design%2C%20clean%20street%20view%2C%20professional%20real%20estate%20photography&width=300&height=200&seq=listing2&orientation=landscape',
        createdAt: '2024-01-14T15:45:00',
        description: 'Ana cadde üzerinde konumlu, yüksek kira getirisi olan dükkan.',
        area: 80,
        status: 'active',
        views: 189,
        contactClicks: 8,
        features: ['Ana Cadde', 'Geniş Vitrin', 'WC', 'Klima Alt Yapısı'],
        agentId: '1',
        agentName: 'Halil İbrahim Ayverdi',
        agentPhone: '+90 531 939 3386',
        agentEmail: 'admin@diyarbakirsahibinden.com'
      },
      {
        id: '3',
        title: 'İmar Durumu Net 500m² Arsa',
        price: 450000,
        category: 'Satılık Arsa',
        location: 'Sur',
        district: 'Melikahmet',
        image: 'https://readdy.ai/api/search-image?query=empty%20residential%20land%20plot%20with%20clear%20boundaries%2C%20green%20grass%2C%20residential%20area%20in%20background&width=300&height=200&seq=listing3&orientation=landscape',
        createdAt: '2024-01-13T09:20:00',
        description: 'İmar durumu net, yapı ruhsatı alınabilir 500m² arsa.',
        area: 500,
        status: 'inactive',
        views: 167,
        contactClicks: 15,
        features: ['İmar Durumu Net', 'Yapı Ruhsatı Alınabilir', 'Ana Yola Yakın'],
        agentId: '1',
        agentName: 'Halil İbrahim Ayverdi',
        agentPhone: '+90 531 939 3386',
        agentEmail: 'admin@diyarbakirsahibinden.com'
      },
      {
        id: '4',
        title: '2+1 Merkezi Konumda Kiralık Daire',
        price: 8000,
        category: 'Kiralık Daire',
        location: 'Yenişehir',
        district: 'Ofis',
        image: 'https://readdy.ai/api/search-image?query=cozy%20apartment%20living%20room%20with%20modern%20furniture%2C%20bright%20natural%20light%2C%20clean%20organized%20space&width=300&height=200&seq=listing4&orientation=landscape',
        createdAt: '2024-01-16T14:00:00',
        description: 'Merkezi konumda, eşyalı kiralık 2+1 daire.',
        rooms: 3,
        area: 90,
        status: 'active',
        views: 298,
        contactClicks: 22,
        features: ['Eşyalı', 'Merkezi Konum', 'Temiz'],
        agentId: '1',
        agentName: 'Halil İbrahim Ayverdi',
        agentPhone: '+90 531 939 3386',
        agentEmail: 'admin@diyarbakirsahibinden.com'
      },
      {
        id: '5',
        title: '2018 Model Volkswagen Passat',
        price: 485000,
        category: 'Araç',
        location: 'Kayapınar',
        district: 'Fırat',
        image: 'https://readdy.ai/api/search-image?query=silver%20Volkswagen%20Passat%20sedan%20car%20in%20clean%20parking%20lot%2C%20professional%20automotive%20photography&width=300&height=200&seq=listing5&orientation=landscape',
        createdAt: '2024-01-17T11:15:00',
        description: 'Az kullanılmış, bakımlı 2018 model Passat.',
        year: 2018,
        status: 'active',
        views: 156,
        contactClicks: 9,
        features: ['Hasar Kaydı Yok', 'Bakımları Tam', 'Az Kullanılmış'],
        agentId: '1',
        agentName: 'Halil İbrahim Ayverdi',
        agentPhone: '+90 531 939 3386',
        agentEmail: 'admin@diyarbakirsahibinden.com'
      },
      {
        id: '6',
        title: 'Cadde Üzeri Kiralık Büro',
        price: 12000,
        category: 'Kiralık Dükkan',
        location: 'Bağlar',
        district: 'Fatih',
        image: 'https://readdy.ai/api/search-image?query=modern%20office%20space%20with%20desk%20and%20chairs%2C%20large%20windows%2C%20professional%20workspace&width=300&height=200&seq=listing6&orientation=landscape',
        createdAt: '2024-01-18T16:30:00',
        description: 'Cadde üzerinde kiralık ofis alanı.',
        area: 60,
        status: 'active',
        views: 134,
        contactClicks: 7,
        features: ['Cadde Üzeri', 'Merkezi Konum', 'Ofis İçin İdeal'],
        agentId: '1',
        agentName: 'Halil İbrahim Ayverdi',
        agentPhone: '+90 531 939 3386',
        agentEmail: 'admin@diyarbakirsahibinden.com'
      },
      {
        id: '7',
        title: '1+1 Öğrenci Evi Kiralık',
        price: 4500,
        category: 'Kiralık Daire',
        location: 'Yenişehir',
        district: 'Şehitlik',
        image: 'https://readdy.ai/api/search-image?query=small%20cozy%20studio%20apartment%20with%20bed%2C%20desk%2C%20modern%20furniture%20for%20students&width=300&height=200&seq=listing7&orientation=landscape',
        createdAt: '2024-01-19T08:45:00',
        description: 'Üniversiteye yakın, eşyalı 1+1 öğrenci evi.',
        rooms: 2,
        area: 50,
        status: 'active',
        views: 203,
        contactClicks: 18,
        features: ['Üniversiteye Yakın', 'Eşyalı', 'Öğrenci Evi'],
        agentId: '1',
        agentName: 'Halil İbrahim Ayverdi',
        agentPhone: '+90 531 939 3386',
        agentEmail: 'admin@diyarbakirsahibinden.com'
      },
      {
        id: '8',
        title: '2020 Model Ford Focus',
        price: 385000,
        category: 'Araç',
        location: 'Sur',
        district: 'Ziya Gökalp',
        image: 'https://readdy.ai/api/search-image?query=white%20Ford%20Focus%20hatchback%20car%20parked%20in%20clean%20area%2C%20modern%20vehicle%20photography&width=300&height=200&seq=listing8&orientation=landscape',
        createdAt: '2024-01-20T13:20:00',
        description: 'Temiz kullanılmış 2020 model Focus.',
        year: 2020,
        status: 'active',
        views: 178,
        contactClicks: 11,
        features: ['Hasar Kaydı Yok', 'Bakımları Yapılı', 'Temiz Kullanılmış'],
        agentId: '1',
        agentName: 'Halil İbrahim Ayverdi',
        agentPhone: '+90 531 939 3386',
        agentEmail: 'admin@diyarbakirsahibinden.com'
      }
    ];

    // Initialize mock admin users
    this.adminUsers = [
      {
        id: '1',
        username: 'admin',
        password: 'admin123',
        fullName: 'Halil İbrahim Ayverdi',
        email: 'admin@diyarbakirsahibinden.com',
        phone: '+90 531 939 3386',
        role: 'admin',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20man%20portrait%2C%20clean%20background%2C%20formal%20attire%2C%20friendly%20smile&width=200&height=200&seq=admin_avatar&orientation=squarish',
        createdAt: '2024-01-01T00:00:00',
        permissions: {
          canAddListing: true,
          canEditListing: true,
          canDeleteListing: true,
          canManageUsers: true
        }
      }
    ];
  }

  subscribe(callback: () => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notify() {
    this.subscribers.forEach(callback => callback());
  }

  // Listing methods
  getListings(): Listing[] {
    return [...this.listings];
  }

  getActiveListings(): Listing[] {
    return this.listings.filter(listing => listing.status === 'active');
  }

  getListingById(id: string): Listing | undefined {
    return this.listings.find(listing => listing.id === id);
  }

  addListing(listing: Omit<Listing, 'id'>): string {
    const id = Date.now().toString();
    const newListing: Listing = {
      ...listing,
      id,
      createdAt: new Date().toISOString(),
      views: 0,
      contactClicks: 0,
      status: 'active'
    };
    this.listings.unshift(newListing);
    this.notify();
    return id;
  }

  updateListing(id: string, updates: Partial<Listing>): boolean {
    const index = this.listings.findIndex(listing => listing.id === id);
    if (index !== -1) {
      this.listings[index] = { ...this.listings[index], ...updates };
      this.notify();
      return true;
    }
    return false;
  }

  deleteListing(id: string): boolean {
    const index = this.listings.findIndex(listing => listing.id === id);
    if (index !== -1) {
      this.listings.splice(index, 1);
      this.notify();
      return true;
    }
    return false;
  }

  incrementViews(id: string): void {
    const listing = this.listings.find(l => l.id === id);
    if (listing) {
      listing.views++;
      this.notify();
    }
  }

  incrementContactClicks(id: string): void {
    const listing = this.listings.find(l => l.id === id);
    if (listing) {
      listing.contactClicks++;
      this.notify();
    }
  }

  // Admin user methods
  getAdminUsers(): AdminUser[] {
    return [...this.adminUsers];
  }

  getAdminUserById(id: string): AdminUser | undefined {
    return this.adminUsers.find(user => user.id === id);
  }

  getAdminUserByUsername(username: string): AdminUser | undefined {
    return this.adminUsers.find(user => user.username === username);
  }

  addAdminUser(user: Omit<AdminUser, 'id' | 'createdAt'>): string {
    const id = Date.now().toString();
    const newUser: AdminUser = {
      ...user,
      id,
      createdAt: new Date().toISOString()
    };
    this.adminUsers.push(newUser);
    this.notify();
    return id;
  }

  updateAdminUser(id: string, updates: Partial<AdminUser>): boolean {
    const index = this.adminUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      this.adminUsers[index] = { ...this.adminUsers[index], ...updates };
      this.notify();
      return true;
    }
    return false;
  }

  deleteAdminUser(id: string): boolean {
    if (this.adminUsers.length <= 1) return false; // En az bir admin olmalı
    const index = this.adminUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      this.adminUsers.splice(index, 1);
      this.notify();
      return true;
    }
    return false;
  }
}

export default DataStore;
export type { Listing, AdminUser };
