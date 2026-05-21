import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

function LaporanSells() {
  const { transactions, feedbacks, addFeedback } = useAuth();
  const [activeTab, setActiveTab] = useState('transaksi'); // 'transaksi' atau 'feedback'
  
  // State manajemen Modal View Detail Transaksi
  const [selectedTrx, setSelectedTrx] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // State Simulasi Pelanggan Scan QR Dinding Resto
  const [showQRModal, setShowQRModal] = useState(false);
  const [fbName, setFbName] = useState('');
  const [fbMsg, setFbMsg] = useState('');
  const [fbRating, setFbRating] = useState(5);

  const openDetails = (trx) => {
    setSelectedTrx(trx);
    setShowModal(true);
  };

  const handleSimulateQRScan = (e) => {
    e.preventDefault();
    if (!fbName.trim() || !fbMsg.trim()) return;

    const newFeedback = {
      id: Date.now(),
      date: new Date().toLocaleDateString('id-ID'),
      name: fbName,
      message: fbMsg,
      rating: Number(fbRating)
    };

    addFeedback(newFeedback);
    alert("Kritik/Saran berhasil masuk ke sistem owner melalui scan QR Dinding Resto!");
    setFbName('');
    setFbMsg('');
    setFbRating(5);
    setShowQRModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'sans-serif' }}>
      
      {/* HEADER UTAMA */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #edf2f7' }}>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1a202c' }}>Laporan & Feedback</h2>
        <p style={{ margin: '5px 0 0 0', color: '#718096', fontSize: '14px' }}>View transactions and customer feedback.</p>
      </div>

      {/* NAVIGASI SWITCH TAB & BUTTON QR SIMULATION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setActiveTab('transaksi')} 
            style={{ 
              backgroundColor: activeTab === 'transaksi' ? '#00a86b' : '#fff',
              color: activeTab === 'transaksi' ? '#fff' : '#4a5568',
              border: '1px solid #edf2f7', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' 
            }}
          >
            📊 Transaksi
          </button>
          <button 
            onClick={() => setActiveTab('feedback')} 
            style={{ 
              backgroundColor: activeTab === 'feedback' ? '#00a86b' : '#fff',
              color: activeTab === 'feedback' ? '#fff' : '#4a5568',
              border: '1px solid #edf2f7', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' 
            }}
          >
            💬 Feedback Pelanggan
          </button>
        </div>

        {activeTab === 'feedback' && (
          <button 
            onClick={() => setShowQRModal(true)} 
            style={{ backgroundColor: 'var(--blaze-orange, #ff5c14)', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
          >
            📷 Simulasi Scan QR Resto
          </button>
        )}
      </div>

      {/* ==================== TAB 1: TABEL TRANSAKSI ==================== */}
      {activeTab === 'transaksi' && (
        <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '12px', border: '1px solid #edf2f7' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f7fafc', borderBottom: '2px solid #edf2f7' }}>
                <th style={{ padding: '15px', color: '#4a5568', fontWeight: '600' }}>ID</th>
                <th style={{ padding: '15px', color: '#4a5568', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '15px', color: '#4a5568', fontWeight: '600' }}>Total</th>
                <th style={{ padding: '15px', color: '#4a5568', fontWeight: '600' }}>Karyawan</th>
                <th style={{ padding: '15px', color: '#4a5568', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx) => (
                <tr key={trx.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                  <td style={{ padding: '15px', fontWeight: '600', color: '#2d3748' }}>{trx.id}</td>
                  <td style={{ padding: '15px', color: '#718096' }}>{trx.date}</td>
                  <td style={{ padding: '15px', fontWeight: '700', color: '#1a202c' }}>Rp {trx.total.toLocaleString('id-ID')}</td>
                  {/* Diubah menjadi format uppercase id karyawan agar klop dengan form managemen */}
                  <td style={{ padding: '15px', color: '#4a5568', fontWeight: '600' }}>{trx.employee.toUpperCase()}</td>
                  <td style={{ padding: '15px' }}>
                    <button 
                      onClick={() => openDetails(trx)} 
                      style={{ background: 'none', border: 'none', color: '#00a86b', fontWeight: '600', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ==================== TAB 2: LIST FEEDBACK PELANGGAN ==================== */}
      {activeTab === 'feedback' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ background: '#ebf8f2', padding: '12px 15px', borderRadius: '8px', border: '1px solid #c6f6d5', fontSize: '13px', color: '#22543d' }}>
            💡 <strong>Alur QR Code:</strong> Pelanggan memindai kode QR yang ditempel di dinding resto/meja kasir menggunakan HP mereka, lalu sistem akan mengarahkan ke form digital ulasan di bawah ini secara langsung.
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '15px' }}>
            {feedbacks.map((fb) => (
              <div key={fb.id} style={{ background: '#fff', border: '1px solid #edf2f7', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ color: '#2d3748' }}>{fb.name} <span style={{ fontSize: '12px', color: '#a0aec0', fontWeight: 'normal' }}>({fb.date})</span></strong>
                  <span style={{ color: '#ffb000' }}>{'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}</span>
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: '#4a5568', fontStyle: 'italic', lineHeight: '1.4' }}>"{fb.message}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== MODAL 1: DETAIL VIEW TRANSAKSI ==================== */}
      {showModal && selectedTrx && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', width: '90%', maxWidth: '550px', borderRadius: '16px', padding: '25px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', position: 'relative' }}>
            
            {/* Header Nota */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px dashed #e2e8f0', paddingBottom: '15px', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#1a202c' }}>Transaction {selectedTrx.id}</h3>
                <span style={{ fontSize: '13px', color: '#a0aec0' }}>📅 {selectedTrx.date}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: '#718096', display: 'block' }}>Total Amount</span>
                <strong style={{ fontSize: '22px', color: '#00a86b', fontWeight: '700' }}>Rp {selectedTrx.total.toLocaleString('id-ID')}</strong>
              </div>
            </div>

            {/* Info Customer & Cashier */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              <div style={{ flex: 1, background: '#f7fafc', padding: '12px', borderRadius: '8px', border: '1px solid #edf2f7' }}>
                <span style={{ fontSize: '12px', color: '#a0aec0', display: 'block', marginBottom: '2px' }}>👤 Customer</span>
                <strong style={{ color: '#4a5568' }}>{selectedTrx.customer || 'Guest'}</strong>
              </div>
              <div style={{ flex: 1, background: '#f7fafc', padding: '12px', borderRadius: '8px', border: '1px solid #edf2f7' }}>
                <span style={{ fontSize: '12px', color: '#a0aec0', display: 'block', marginBottom: '2px' }}>🖨️ Cashier</span>
                <strong style={{ color: '#4a5568' }}>{selectedTrx.employee.toUpperCase()}</strong>
              </div>
            </div>

            {/* Order Items */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#2d3748', fontWeight: '600' }}>📦 Order Items</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedTrx.items && selectedTrx.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '12px', background: '#edf2f7', padding: '2px 6px', borderRadius: '4px', fontWeight: '600', color: '#4a5568' }}>{item.qty}x</span>
                      <div>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>{item.name}</p>
                        <span style={{ fontSize: '11px', color: '#a0aec0' }}>@ Rp {item.price.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                    <strong style={{ fontSize: '14px', color: '#2d3748' }}>Rp {(item.qty * item.price).toLocaleString('id-ID')}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Grand Total Footer */}
            <div style={{ borderTop: '1px solid #edf2f7', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontWeight: '600', color: '#4a5568' }}>Grand Total</span>
              <strong style={{ fontSize: '18px', color: '#1a202c', fontWeight: '700' }}>Rp {selectedTrx.total.toLocaleString('id-ID')}</strong>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setShowModal(false)} 
              style={{ width: '100%', backgroundColor: '#4a5568', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
            >
              Tutup Rincian
            </button>
          </div>
        </div>
      )}

      {/* ==================== MODAL 2: SIMULASI POP-UP SCAN QR CODE ==================== */}
      {showQRModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <form onSubmit={handleSimulateQRScan} style={{ background: '#fff', width: '90%', maxWidth: '400px', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.15)' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#1a202c' }}>📷 Portal Feedback (Scan QR Sukses)</h4>
            <p style={{ margin: '0 0 15px 0', fontSize: '12px', color: '#718096' }}>Simulasi ulasan smartphone pembeli setelah scan QR di tembok.</p>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Nama Anda</label>
              <input type="text" value={fbName} onChange={(e) => setFbName(e.target.value)} placeholder="Masukkan nama" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} required />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Rating Bintang</label>
              <select value={fbRating} onChange={(e) => setFbRating(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff', boxSizing: 'border-box' }}>
                <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                <option value="4">⭐⭐⭐⭐ (4)</option>
                <option value="3">⭐⭐⭐ (3)</option>
                <option value="2">⭐⭐ (2)</option>
                <option value="1">⭐ (1)</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Kritik / Saran Pelanggan</label>
              <textarea value={fbMsg} onChange={(e) => setFbMsg(e.target.value)} placeholder="Tulis masukan untuk Warung Oyako..." rows="3" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', resize: 'none' }} required></textarea>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" style={{ flex: 1, backgroundColor: '#00a86b', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Kirim</button>
              <button type="button" onClick={() => setShowQRModal(false)} style={{ flex: 1, backgroundColor: '#edf2f7', color: '#4a5568', border: '1px solid #cbd5e0', padding: '10px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Batal</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

export default LaporanSells;