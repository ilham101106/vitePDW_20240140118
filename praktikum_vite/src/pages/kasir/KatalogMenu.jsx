import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

function KatalogMenu() {
  const { menuList } = useAuth();
  const [filterCategory, setFilterCategory] = useState('Semua');

  // Filter daftar menu berdasarkan kategori pilihan kasir
  const filteredMenu = menuList.filter((item) => {
    if (filterCategory === 'Semua') return true;
    return item.category === filterCategory;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', fontFamily: 'sans-serif' }}>
      
      {/* HEADER KATALOG - MENGGUNAKAN WARNA PRINCETON ORANGE (#ff8a1bff) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ color: '#ff8a1bff', fontWeight: '750', margin: 0, fontSize: '22px' }}>
          Katalog Menu Resto
        </h3>
        <span style={{ backgroundColor: '#ff8a1bff', padding: '6px 14px', borderRadius: '20px', color: '#fff', fontSize: '13px', fontWeight: '600' }}>
          Total Menu: {filteredMenu.length} Item
        </span>
      </div>

      {/* FILTER KATEGORI - TANPA EMOJI, WARNA SINKRON (#ff8a1bff) */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {['Semua', 'Makanan', 'Minuman', 'Snack'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            style={{
              backgroundColor: filterCategory === cat ? '#ff8a1bff' : '#e9ecef', // Menggunakan --border-color untuk default bg
              color: filterCategory === cat ? '#fff' : '#212529', // Menggunakan --text-main
              border: 'none',
              padding: '8px 18px',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID DAFTAR MENU MURNI (READ ONLY - STATUS TERSEDIA/HABIS DIHILANGKAN SEPENUHNYA) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
        {filteredMenu.map((item) => (
          <div 
            key={item.id} 
            style={{ 
              border: '1px solid #e9ecef', // Menggunakan --border-color
              padding: '18px', 
              borderRadius: '8px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              background: '#ffffff', // Menggunakan --card-bg
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <strong style={{ color: '#212529', fontSize: '16px' }}>{/* Menggunakan --text-main */}
                  {item.name}
                </strong>
              </div>
              <span 
                style={{ 
                  fontSize: '11px', 
                  backgroundColor: '#f4f5f7', // Menggunakan --bg-light
                  color: '#6c757d', // Menggunakan --text-muted
                  padding: '2px 8px', 
                  borderRadius: '4px', 
                  fontWeight: '600', 
                  display: 'inline-block', 
                  marginBottom: '6px',
                  border: '1px solid #e9ecef'
                }}
              >
                {item.category}
              </span>
              <p style={{ fontSize: '16px', color: '#ff8a1bff', fontWeight: '750', margin: 0 }}>
                Rp {item.price.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* JIKA KOSONG */}
      {filteredMenu.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e9ecef', color: '#6c757d' }}>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>Menu tidak ditemukan.</p>
        </div>
      )}

    </div>
  );
}

export default KatalogMenu;