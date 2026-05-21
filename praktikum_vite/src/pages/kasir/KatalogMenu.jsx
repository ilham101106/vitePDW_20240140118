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
      
      {/* HEADER KATALOG - SUDAH DIPERBAIKI SESUAI KONTEKS KASIR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ color: '#00a86b', fontWeight: '700', margin: 0 }}>Katalog Menu Resto</h3>
        <span style={{ backgroundColor: '#00a86b', padding: '5px 12px', borderRadius: '20px', color: '#fff', fontSize: '13px', fontWeight: '600' }}>
          Total: {filteredMenu.length} Item
        </span>
      </div>

      {/* FILTER KATEGORI */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {['Semua', 'Makanan', 'Minuman'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            style={{
              backgroundColor: filterCategory === cat ? '#00a86b' : '#fff',
              color: filterCategory === cat ? '#fff' : '#4a5568',
              border: '1px solid #cbd5e0',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {cat === 'Semua' ? '🍔 Semua' : cat === 'Makanan' ? '🍜 Makanan' : '🍹 Minuman'}
          </button>
        ))}
      </div>

      {/* GRID DAFTAR MENU MURNI (READ ONLY - TIDAK ADA FORM TAMBAH / TOMBOL EDIT & HAPUS) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
        {filteredMenu.map((item) => (
          <div key={item.id} style={{ border: '1px solid #edf2f7', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <strong style={{ color: '#2d3748', fontSize: '16px' }}>{item.name}</strong>
              </div>
              <span style={{ fontSize: '11px', backgroundColor: item.category === 'Makanan' ? '#ebf8f2' : '#ebf4ff', color: item.category === 'Makanan' ? '#2f855a' : '#2b6cb0', padding: '2px 8px', borderRadius: '12px', fontWeight: '600', display: 'inline-block', marginBottom: '6px' }}>
                {item.category}
              </span>
              <p style={{ fontSize: '14px', color: '#1a202c', fontWeight: '700', margin: 0 }}>
                Rp {item.price.toLocaleString('id-ID')}
              </p>
            </div>
            
            {/* Penanda status menu aktif saja */}
            <div>
              <span style={{ fontSize: '12px', color: '#00a86b', backgroundColor: '#e6fffa', padding: '4px 8px', borderRadius: '4px', fontWeight: '600' }}>
                Ready
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* JIKA KATEGORI KOSONG */}
      {filteredMenu.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '12px', border: '1px solid #edf2f7', color: '#a0aec0' }}>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>Menu tidak ditemukan.</p>
        </div>
      )}

    </div>
  );
}

export default KatalogMenu;