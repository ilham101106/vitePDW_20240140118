import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

function KaryawanManagement() {
  const { employees, setEmployees } = useAuth();
  
  const [empId, setEmpId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!empId.trim() || !name.trim() || !phone.trim()) return;

    if (isEditing) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editId ? { id: empId.toUpperCase(), name, phone } : emp
        )
      );
      alert("Data Karyawan Berhasil Diperbarui!");
      setIsEditing(false);
      setEditId(null);
    } else {
      if (employees.some(emp => emp.id.toUpperCase() === empId.toUpperCase())) {
        alert("ID Karyawan sudah terdaftar! Gunakan ID lain (Contoh: KASIR4).");
        return;
      }

      const newEmp = { id: empId.toUpperCase().replace(/\s+/g, ''), name, phone };
      setEmployees((prev) => [...prev, newEmp]);
      alert("Karyawan Baru Berhasil Didaftarkan!");
    }

    setEmpId('');
    setName('');
    setPhone('');
  };

  const handleEdit = (emp) => {
    setIsEditing(true);
    setEditId(emp.id);
    setEmpId(emp.id);
    setName(emp.name);
    setPhone(emp.phone);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setEmpId('');
    setName('');
    setPhone('');
  };

  const handleDelete = (id) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${id} dari sistem?`)) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      alert("Karyawan Berhasil Dihapus.");
      if (isEditing && editId === id) handleCancelEdit();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ color: 'var(--blaze-orange)', fontWeight: '700', margin: 0 }}>Manajemen Staff Karyawan</h3>
        <span style={{ backgroundColor: 'var(--lime-green)', padding: '5px 12px', borderRadius: '20px', color: '#fff', fontSize: '13px', fontWeight: '600' }}>
          Total Aktif: {employees.length} Orang
        </span>
      </div>

      {/* Form Input CRUD Karyawan */}
      <form onSubmit={handleSubmit} style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #e9ecef', display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '130px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', display: 'block', marginBottom: '5px' }}>ID Karyawan</label>
          <input type="text" value={empId} onChange={(e) => setEmpId(e.target.value)} placeholder="Contoh: KASIR1" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} required />
        </div>
        <div style={{ flex: 2, minWidth: '180px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', display: 'block', marginBottom: '5px' }}>Nama Lengkap</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Karyawan" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} required />
        </div>
        <div style={{ flex: 2, minWidth: '180px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', display: 'block', marginBottom: '5px' }}>No. Telepon / WA</label>
          <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Contoh: 0812345678" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} required />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="submit" style={{ backgroundColor: isEditing ? 'var(--princeton-orange)' : 'var(--blaze-orange)', color: 'white', border: 'none', padding: '11px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
            {isEditing ? "Simpan" : "Tambah"}
          </button>
          {isEditing && (
            <button type="button" onClick={handleCancelEdit} style={{ backgroundColor: '#edf2f7', color: '#4a5568', border: '1px solid #cbd5e0', padding: '11px 15px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Batal</button>
          )}
        </div>
      </form>

      {/* Grid Card List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '15px' }}>
        {employees.map((emp) => (
          <div key={emp.id} style={{ border: '1px solid #edf2f7', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', backgroundColor: 'var(--blaze-orange)', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>{emp.id}</span>
                <strong style={{ color: '#2d3748', fontSize: '15px' }}>{emp.name}</strong>
              </div>
              
              {/* Layout Ikon WA Terkini */}
              <p style={{ fontSize: '13px', margin: 0, display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#25D366" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                  <path d="M12.004 2c-5.523 0-10 4.477-10 10 0 1.764.464 3.42 1.272 4.86L2 22l5.244-1.272A9.923 9.923 0 0012.004 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18a7.94 7.94 0 01-4.048-1.116l-.288-.168-3 1.272.728-2.58-.168-.288A7.945 7.945 0 014.004 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.908-5.748c-.27-.138-1.602-.792-1.848-.882-.246-.09-.426-.138-.606.138-.18.27-.69.882-.846 1.062-.156.18-.312.204-.582.066a7.45 7.45 0 01-2.148-1.32c-.7-.618-1.176-1.38-1.314-1.62-.138-.27-.018-.414.12-.552.12-.12.27-.312.408-.468.138-.156.18-.27.27-.45.09-.18.048-.342-.018-.468-.066-.138-.606-1.458-.828-2.004-.222-.528-.444-.456-.606-.468-.156-.006-.336-.006-.516-.006a.983.983 0 00-.714.336 3.01 3.01 0 00-.942 2.232c0 1.32.96 2.592 1.092 2.772.132.18 1.89 2.886 4.572 4.044.636.276 1.134.438 1.518.558.642.198 1.224.174 1.686.108.516-.078 1.602-.66 1.83-1.29.228-.63.228-1.176.162-1.29-.066-.114-.246-.18-.516-.318z"></path>
                </svg>
                <span style={{ color: '#075E54' }}>{emp.phone}</span>
              </p>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => handleEdit(emp)} style={{ background: 'none', border: '1px solid var(--princeton-orange)', color: 'var(--princeton-orange)', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Edit</button>
              <button onClick={() => handleDelete(emp.id)} style={{ background: 'rgba(252,68,68,0.1)', border: 'none', color: '#fc4444', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KaryawanManagement;