'use client';

import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoggedIn ? (
        <AdminLogin onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <AdminDashboard onLogout={() => setIsLoggedIn(false)} />
      )}
    </div>
  );
}