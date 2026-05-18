import { useState } from 'react'
import { useAuth } from './context/AuthContext.jsx'
import './App.css'

import DashboardOverview from "./pages/owner/DashboardOverview.jsx";
import MenuManagement from "./pages/owner/MenuManagement.jsx";
import KaryawanManagement from "./pages/owner/KaryawanManagement.jsx";
import LaporanSells from "./pages/owner/LaporanSells.jsx";

import POS from "./pages/kasir/POS.jsx";
import FeedbackCustomer from "./pages/kasir/FeedbackCustomer.jsx";

function App() {
  const { user, login, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [activeTabKasir, setActiveTabKasir] = useState('pos'); 

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Fungsi login ini akan menembak ke fungsi login async yang ada di AuthContext
    const result = await login(username, password);
    
    if (result && result.success) {
      // Menentukan tab aktif awal berdasarkan role yang dikembalikan dari API
      if (result.role === 'OWNER') {
        setActiveTab('dashboard');
      } else if (result.role === 'KARYAWAN') {
        setActiveTabKasir('pos');
      }
      
      // Reset form input setelah berhasil login
      setUsername('');
      setPassword('');
    }
  };

  // 1. LOGIN INTERFACE (Ditampilkan jika user belum login / null)
  if (!user) {
    return (
      <div className="login-container" style={{ backgroundColor: '#121212', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="login-card" style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#FF5722', margin: '0 0 5px 0', fontWeight: 'bold' }}>Warmindo Digital</h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px' }}>Silakan login untuk masuk ke sistem</p>
          
          <form onSubmit={handleFormSubmit}>
            <div className="form-group" style={{ textAlign: 'left', marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px', color: '#333' }}>Username</label>
              <input 
                type="text" 
                placeholder="Masukkan username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>
            
            <div className="form-group" style={{ textAlign: 'left', marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px', color: '#333' }}>Password</label>
              <input 
                type="password" 
                placeholder="Masukkan password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>
            
            <button 
              type="submit" 
              className="login-btn" 
              style={{ width: '100%', padding: '12px', backgroundColor: '#FF5722', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
            >
              Masuk Aplikasi
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. DASHBOARD OWNER (Ditampilkan jika user.role === 'OWNER')
  if (user.role === 'OWNER') {
    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
          <h3>Warmindo Digital</h3>
          <span className="sidebar-role-owner">Owner Panel</span>
          <hr />
          <ul className="sidebar-menu sidebar-owner-menu">
            <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</li>
            <li className={activeTab === 'menu' ? 'active' : ''} onClick={() => setActiveTab('menu')}>Menu Management</li>
            <li className={activeTab === 'karyawan' ? 'active' : ''} onClick={() => setActiveTab('karyawan')}>Karyawan</li>
            <li className={activeTab === 'laporan' ? 'active' : ''} onClick={() => setActiveTab('laporan')}>Laporan & Feedback</li>
            <li className="logout-btn" onClick={logout}>Logout</li>
          </ul>
        </aside>

        <main className="main-content">
          <header className="main-header">
            <h2>Selamat Datang, {user.username}! (Owner)</h2>
          </header>
          <div className="content-body">
            <div className="page-card">
              {activeTab === 'dashboard' && <DashboardOverview />}
              {activeTab === 'menu' && <MenuManagement />}
              {activeTab === 'karyawan' && <KaryawanManagement />}
              {activeTab === 'laporan' && <LaporanSells />}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 3. DASHBOARD KASIR (Ditampilkan jika user.role === 'KARYAWAN')
  if (user.role === 'KARYAWAN') {
    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
          <h3>Warmindo Digital</h3>
          <span className="sidebar-role-kasir">Kasir Panel</span>
          <hr />
          <ul className="sidebar-menu sidebar-kasir-menu">
            <li className={activeTabKasir === 'pos' ? 'active' : ''} onClick={() => setActiveTabKasir('pos')}>Point Of Sale (POS)</li>
            <li className={activeTabKasir === 'menu_view' ? 'active' : ''} onClick={() => setActiveTabKasir('menu_view')}>Katalog Menu</li>
            <li className={activeTabKasir === 'feedback' ? 'active' : ''} onClick={() => setActiveTabKasir('feedback')}>Feedback Pelanggan</li>
            <li className="logout-btn" onClick={logout}>Logout</li>
          </ul>
        </aside>

        <main className="main-content">
          <header className="main-header">
            <h2>Sistem Kasir: {user.username}</h2>
          </header>
          <div className="content-body">
            <div className="page-card">
              {activeTabKasir === 'pos' && <POS />}
              {activeTabKasir === 'menu_view' && <MenuManagement isReadOnly={true} />}
              {activeTabKasir === 'feedback' && <FeedbackCustomer />}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;