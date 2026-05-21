import { useState, useEffect } from 'react'
import { useAuth } from './context/AuthContext.jsx'
import './App.css'

import DashboardOverview from "./pages/owner/DashboardOverview.jsx";
import MenuManagement from "./pages/owner/MenuManagement.jsx";
import KaryawanManagement from "./pages/owner/KaryawanManagement.jsx";
import LaporanSells from "./pages/owner/LaporanSells.jsx";

import POS from "./pages/kasir/POS.jsx";
import FeedbackCustomer from "./pages/kasir/FeedbackCustomer.jsx";
// 1. REVISI: Tambahkan import file KatalogMenu kasir di sini
import KatalogMenu from "./pages/kasir/KatalogMenu.jsx";

function App() {
  const { user, login, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [activeTabKasir, setActiveTabKasir] = useState('pos'); 

  // State global sementara untuk sinkronisasi transaksi via localStorage
  const [globalTransactions, setGlobalTransactions] = useState([]);

  useEffect(() => {
    const savedTx = localStorage.getItem('mieayamin_transactions');
    if (savedTx) {
      setGlobalTransactions(JSON.parse(savedTx));
    }
  }, [user]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    
    if (result && result.success) {
      if (result.role === 'OWNER') {
        setActiveTab('dashboard');
      } else if (result.role === 'KARYAWAN') {
        setActiveTabKasir('pos');
      }
      setUsername('');
      setPassword('');
    }
  };

  // 1. LOGIN INTERFACE
  if (!user) {
    return (
      <div className="login-container" style={{ backgroundColor: '#121212', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="login-card" style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#FF5722', margin: '0 0 5px 0', fontWeight: 'bold' }}>MieAyamin</h2>
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

  // 2. DASHBOARD OWNER
  if (user.role === 'OWNER') {
    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
          <h3>MieAyamin</h3>
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

  // 3. DASHBOARD KASIR
  if (user.role === 'KARYAWAN') {
    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
          <h3>MieAyamin</h3>
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
              {/* 2. REVISI: Ubah pemanggilan dari <MenuManagement /> ke <KatalogMenu /> */}
              {activeTabKasir === 'menu_view' && <KatalogMenu />}
              {activeTabKasir === 'feedback' && <FeedbackCustomer />}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;