import React, { useState, useEffect } from 'react';

function POS() {
  const [menus, setMenus] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [cart, setCart] = useState([]);

  // List Menu Ketentuan Proyek (Otomatis dipakai jika API MockAPI belum dibuat/404)
  const defaultMenus = [
    { id: 'm1', name: 'Mie Ayam Original', category: 'Makanan', price: '13000' },
    { id: 'm2', name: 'Kwetiau Ayam', category: 'Makanan', price: '14000' },
    { id: 'm3', name: 'Yamin Manis', category: 'Makanan', price: '14000' },
    { id: 'm4', name: 'Mie Ayam Spicy', category: 'Makanan', price: '15000' },
    { id: 'm5', name: 'Pangsit Basah 2pcs', category: 'Makanan', price: '6000' },
    { id: 'm6', name: 'Pangsit Goreng 2pcs', category: 'Makanan', price: '7000' },
    { id: 'm7', name: 'Bakso 3pcs', category: 'Makanan', price: '8000' },
    { id: 'm8', name: 'Macam-Macam Kerupuk', category: 'Snack', price: '2000' },
    { id: 'm9', name: 'Peyek', category: 'Snack', price: '3000' },
    { id: 'd1', name: 'Es Teh Manis', category: 'Minuman', price: '4000' },
    { id: 'd2', name: 'Es Jeruk', category: 'Minuman', price: '5000' },
    { id: 'd3', name: 'Es Doger', category: 'Minuman', price: '8000' },
    { id: 'd4', name: 'Air Mineral', category: 'Minuman', price: '3000' },
  ];

  useEffect(() => {
    fetch('https://6a02ecf30d92f63dd254836f.mockapi.io/menu')
      .then(res => {
        // Jika API 404 atau error, langsung lempar ke catch untuk pakai data lokal
        if (!res.ok) throw new Error("API belum siap atau 404");
        return res.json();
      })
      .then(data => {
        // Proteksi berlapis: Pastikan responsenya beneran berbentuk Array
        if (Array.isArray(data) && data.length > 0) {
          setMenus(data);
        } else {
          setMenus(defaultMenus);
        }
      })
      .catch((err) => {
        console.log("Menggunakan data fallback lokal karena:", err.message);
        setMenus(defaultMenus); // Pake data lokal biar ga blank
      });
  }, []);

  const addToCart = (item) => {
    const exist = cart.find(x => x.id === item.id);
    if (exist) {
      setCart(cart.map(x => x.id === item.id ? { ...exist, qty: exist.qty + 1 } : x));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(x => {
      if (x.id === id) {
        const newQty = x.qty + delta;
        return newQty > 0 ? { ...x, qty: newQty } : null;
      }
      return x;
    }).filter(Boolean));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert("Transaksi Sukses! Nota Berhasil Dicetak.");
    setCart([]);
  };

  // LOGIKA FILTER AMAN: Pastikan selalu berupa array sebelum di-filter
  const safeMenus = Array.isArray(menus) ? menus : defaultMenus;

  const filteredMenus = safeMenus.filter(item => {
    const matchesSearch = (item.name || '').toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalPrice = cart.reduce((acc, item) => acc + (parseInt(item.price || 0) * item.qty), 0);

  return (
    <div style={{ display: 'flex', gap: '20px', height: 'calc(100vh - 160px)' }}>
      {/* KIRI: KATALOG PRODUK */}
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input type="text" placeholder="🔍 Cari mie atau minuman..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: 1, padding: '10px 15px', borderRadius: '8px', border: '1px solid #ccc' }} />
          
          <div style={{ display: 'flex', gap: '5px' }}>
            {['All', 'Makanan', 'Minuman', 'Snack'].map(cat => (
              <button key={cat} onClick={() => setCategoryFilter(cat)} style={{
                padding: '8px 14px', borderRadius: '6px', border: 'none', fontWeight: '600', cursor: 'pointer',
                backgroundColor: categoryFilter === cat ? 'var(--princeton-orange)' : '#e2e8f0',
                color: categoryFilter === cat ? 'white' : '#4a5568'
              }}>{cat}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '15px', overflowY: 'auto', paddingBottom: '20px' }}>
          {filteredMenus.map(item => (
            <div key={item.id} onClick={() => addToCart(item)} style={{ background: '#fff', border: '1px solid #e9ecef', padding: '15px', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', textAlign: 'center' }}>
              <p style={{ fontWeight: '600', fontSize: '15px', marginBottom: '8px', minHeight: '44px' }}>{item.name}</p>
              <p style={{ color: 'var(--blaze-orange)', fontWeight: '700', fontSize: '14px' }}>Rp {parseInt(item.price || 0).toLocaleString('id-ID')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* KANAN: KERANJANG BELANJA */}
      <div style={{ width: '320px', background: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h4 style={{ borderBottom: '2px solid #f4f5f7', paddingBottom: '10px', marginBottom: '15px' }}>Keranjang Belanja</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '300px' }}>
            {cart.length === 0 ? <p style={{ color: '#a0aec0', fontSize: '14px', textAlign: 'center', marginTop: '20px' }}>Belum ada pesanan.</p> : 
              cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                  <div style={{ maxWidth: '160px' }}>
                    <p style={{ fontWeight: '600' }}>{item.name}</p>
                    <span style={{ color: '#718096', fontSize: '12px' }}>Rp {parseInt(item.price || 0).toLocaleString('id-ID')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button onClick={() => updateQty(item.id, -1)} style={{ width: '24px', height: '24px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer' }}>-</button>
                    <span style={{ fontWeight: '600' }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={{ width: '24px', height: '24px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer' }}>+</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div style={{ borderTop: '2px solid #f4f5f7', paddingTop: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '16px', marginBottom: '15px' }}>
            <span>TOTAL:</span>
            <span style={{ color: 'var(--blaze-orange)' }}>Rp {totalPrice.toLocaleString('id-ID')}</span>
          </div>
          <button onClick={handleCheckout} disabled={cart.length === 0} style={{ width: '100%', backgroundColor: cart.length === 0 ? '#cbd5e0' : 'var(--lime-green)', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: cart.length === 0 ? 'not-allowed' : 'pointer' }}>
            Bayar & Cetak Nota
          </button>
        </div>
      </div>
    </div>
  );
}

export default POS;