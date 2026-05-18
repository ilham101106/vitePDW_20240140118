import React, { useState, useEffect } from 'react';

function KaryawanManagement() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const API_URL = 'https://6a02ecf30d92f63dd254836f.mockapi.io/karyawan';

  const fetchEmployees = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setEmployees(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!name) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role: 'KASIR' })
      });
      if (res.ok) {
        alert("Karyawan Berhasil Ditambahkan!");
        setName('');
        fetchEmployees();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus karyawan ini dari sistem?")) {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert("Karyawan Berhasil Dihapus.");
        fetchEmployees();
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ color: 'var(--blaze-orange)', fontWeight: '700' }}>Manajemen Staff Karyawan</h3>
        <span className="badge-success" style={{ backgroundColor: 'var(--lime-green)' }}>Aktif: {employees.length} Orang</span>
      </div>

      <form onSubmit={handleAddEmployee} style={{ display: 'flex', gap: '10px', background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan Nama Kasir Baru" style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} required />
        <button type="submit" style={{ backgroundColor: 'var(--blaze-orange)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Daftarkan Kasir</button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
        {employees.map((emp) => (
          <div key={emp.id} style={{ border: '1px solid var(--border-color)', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
            <div>
              <p style={{ fontWeight: '600', color: '#2d3748' }}>{emp.name}</p>
              <span style={{ fontSize: '11px', color: 'var(--princeton-orange)', fontWeight: '700' }}>KASIR / STAFF</span>
            </div>
            <button onClick={() => handleDelete(emp.id)} style={{ background: 'rgba(252,68,68,0.1)', border: 'none', color: '#fc4444', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Pecat</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KaryawanManagement;