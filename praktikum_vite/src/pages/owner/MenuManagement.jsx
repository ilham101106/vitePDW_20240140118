import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

function MenuManagement() {
  const { menuList, setMenuList } = useAuth();
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Makanan');
  
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    if (isEditing) {
      setMenuList((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, name, price: Number(price), category } : item
        )
      );
      alert("Menu Berhasil Diperbarui!");
      setIsEditing(false);
      setEditId(null);
    } else {
      const newMenu = {
        id: Date.now(),
        name,
        price: Number(price),
        category
      };
      setMenuList((prev) => [...prev, newMenu]);
      alert("Menu Baru Berhasil Ditambahkan!");
    }

    setName('');
    setPrice('');
    setCategory('Makanan');
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setName(item.name);
    setPrice(item.price);
    setCategory(item.category);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setName('');
    setPrice('');
    setCategory('Makanan');
  };

  const handleDelete = (id, menuName) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus menu "${menuName}"?`)) {
      setMenuList((prev) => prev.filter((item) => item.id !== id));
      alert("Menu Berhasil Dihapus.");
      if (isEditing && editId === id) handleCancelEdit();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ color: 'var(--blaze-orange, #ff5c14)', fontWeight: '700', margin: 0 }}>Manajemen Daftar Menu</h3>
        <span style={{ backgroundColor: '#00a86b', padding: '5px 12px', borderRadius: '20px', color: '#fff', fontSize: '13px', fontWeight: '600' }}>
          Total Menu: {menuList.length} Item
        </span>
      </div>

      {/* Form CRUD Menu */}
      <form onSubmit={handleSubmit} style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #e9ecef', display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: 2, minWidth: '200px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', display: 'block', marginBottom: '5px' }}>Nama Menu</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: Mie Ayam Rica-Rica" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} required />
        </div>
        <div style={{ flex: 1, minWidth: '130px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', display: 'block', marginBottom: '5px' }}>Harga (Rp)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Harga" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} required />
        </div>
        <div style={{ flex: 1, minWidth: '130px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', display: 'block', marginBottom: '5px' }}>Kategori</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff', boxSizing: 'border-box' }}>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="submit" style={{ backgroundColor: isEditing ? '#e67e22' : 'var(--blaze-orange, #ff5c14)', color: 'white', border: 'none', padding: '11px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
            {isEditing ? "Update" : "Tambah"}
          </button>
          {isEditing && (
            <button type="button" onClick={handleCancelEdit} style={{ backgroundColor: '#edf2f7', color: '#4a5568', border: '1px solid #cbd5e0', padding: '11px 15px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Batal</button>
          )}
        </div>
      </form>

      {/* Grid Menu Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
        {menuList.map((item) => (
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
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => handleEdit(item)} style={{ background: 'none', border: '1px solid #e67e22', color: '#e67e22', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Edit</button>
              <button onClick={() => handleDelete(item.id, item.name)} style={{ background: 'rgba(252,68,68,0.1)', border: 'none', color: '#fc4444', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuManagement;