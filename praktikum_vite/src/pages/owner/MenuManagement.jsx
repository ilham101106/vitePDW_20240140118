import React, { useState, useEffect } from 'react';

function MenuManagement({ isReadOnly = false }) {
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({ name: '', category: 'Makanan', price: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const API_URL = 'https://6a02ecf30d92f63dd254836f.mockapi.io/menu';

  // Ambil Data Menu dari MockAPI
  const fetchMenus = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setMenus(data);
      }
    } catch (err) {
      console.error("Gagal mengambil data menu:", err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    try {
      if (isEditing) {
        // Mode Update (Edit)
        const res = await fetch(`${API_URL}/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (res.ok) {
          alert("Menu Berhasil Diperbarui!");
          setIsEditing(false);
          setEditId(null);
        }
      } else {
        // Mode Create (Tambah Baru)
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (res.ok) alert("Menu Berhasil Ditambahkan!");
      }
      setForm({ name: '', category: 'Makanan', price: '' });
      fetchMenus();
    } catch (err) {
      alert("Terjadi kesalahan sistem.");
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setForm({ name: item.name, category: item.category, price: item.price });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
          alert("Menu Berhasil Dihapus!");
          fetchMenus();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ color: 'var(--blaze-orange)', fontWeight: '700' }}>
          {isReadOnly ? "Katalog Menu Warmindo" : "Menu Management (CRUD)"}
        </h3>
        <span className="badge-ready" style={{ backgroundColor: 'var(--yellow-green)' }}>
          Total: {menus.length} Item
        </span>
      </div>

      {/* Form Tambah/Edit Menu (Hanya muncul jika yang masuk adalah Owner) */}
      {!isReadOnly && (
        <form onSubmit={handleSubmit} style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap', border: '1px solid #e9ecef' }}>
          <div style={{ flex: 2, minWidth: '200px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', display: 'block', marginBottom: '5px' }}>Nama Produk</label>
            <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Contoh: Mie Ayam Spicy" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} required />
          </div>
          <div style={{ flex: 1, minWidth: '130px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', display: 'block', marginBottom: '5px' }}>Kategori</label>
            <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff' }}>
              <option value="Makanan">Makanan</option>
              <option value="Minuman">Minuman</option>
              <option value="Snack">Snack</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', display: 'block', marginBottom: '5px' }}>Harga (Rp)</label>
            <input type="number" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} placeholder="15000" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} required />
          </div>
          <button type="submit" style={{ backgroundColor: isEditing ? 'var(--princeton-orange)' : 'var(--blaze-orange)', color: 'white', border: 'none', padding: '11px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
            {isEditing ? "Update Menu" : "Tambah Item"}
          </button>
        </form>
      )}

      {/* Tabel Menu */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #edf2f7', background: '#f7fafc' }}>
              <th style={{ padding: '12px' }}>Nama Menu</th>
              <th style={{ padding: '12px' }}>Kategori</th>
              <th style={{ padding: '12px' }}>Harga</th>
              {!isReadOnly && <th style={{ padding: '12px' }}>Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {menus.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                <td style={{ padding: '12px', fontWeight: '600' }}>{item.name}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    fontSize: '12px', padding: '3px 8px', borderRadius: '4px', fontWeight: '600',
                    backgroundColor: item.category === 'Makanan' ? 'rgba(255,92,20,0.1)' : item.category === 'Minuman' ? 'rgba(255,138,27,0.1)' : 'rgba(252,213,20,0.15)',
                    color: item.category === 'Makanan' ? 'var(--blaze-orange)' : item.category === 'Minuman' ? 'var(--princeton-orange)' : '#b79407'
                  }}>{item.category}</span>
                </td>
                <td style={{ padding: '12px', fontWeight: '700' }}>Rp {parseInt(item.price).toLocaleString('id-ID')}</td>
                {!isReadOnly && (
                  <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleEdit(item)} style={{ background: 'none', border: '1px solid var(--princeton-orange)', color: 'var(--princeton-orange)', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>Edit</button>
                    <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: '1px solid #fc4444', color: '#fc4444', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>Hapus</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MenuManagement;