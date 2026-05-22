import React, { useState, useEffect } from 'react';

function RiwayatTransaksi() {
  const [riwayat, setRiwayat] = useState([]);

  // Mengambil data transaksi dari localStorage saat halaman dibuka
  useEffect(() => {
    const savedTx = localStorage.getItem('mieayamin_transactions');
    if (savedTx) {
      // Mengurutkan agar transaksi terbaru muncul di paling atas (.reverse())
      const data = JSON.parse(savedTx).reverse();
      setRiwayat(data);
    }
  }, []);

  const handlePrintUlang = (tx) => {
    alert(`[REPRINT NOTA]\nID: ${tx.id}\nWaktu: ${tx.waktu}\nKasir: ${tx.kasir}\nTotal: Rp ${tx.total.toLocaleString('id-ID')}`);
  };

  return (
    <div style={{ padding: '10px', height: 'calc(100vh - 160px)', overflowY: 'auto' }}>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>Riwayat Transaksi Kasir</h3>
      
      {riwayat.length === 0 ? (
        <p style={{ color: '#a0aec0', textAlign: 'center', marginTop: '40px' }}>Belum ada riwayat transaksi hari ini.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f5f7', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px 15px' }}>Waktu / ID</th>
              <th style={{ padding: '12px 15px' }}>Kasir</th>
              <th style={{ padding: '12px 15px' }}>Item Pesanan</th>
              <th style={{ padding: '12px 15px' }}>Total Belanja</th>
              <th style={{ padding: '12px 15px', textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {riwayat.map((tx) => (
              <tr key={tx.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                <td style={{ padding: '12px 15px', fontSize: '13px' }}>
                  <div style={{ fontWeight: '600' }}>{tx.waktu}</div>
                  <div style={{ color: '#718096', fontSize: '11px' }}>{tx.id}</div>
                </td>
                <td style={{ padding: '12px 15px', color: '#4a5568' }}>{tx.kasir}</td>
                <td style={{ padding: '12px 15px' }}>
                  {tx.items.map((item, idx) => (
                    <div key={idx} style={{ fontSize: '13px', color: '#2d3748' }}>
                      {item.name} <span style={{ color: '#718096' }}>x{item.qty}</span>
                    </div>
                  ))}
                </td>
                <td style={{ padding: '12px 15px', fontWeight: '700', color: 'var(--blaze-orange)' }}>
                  Rp {tx.total.toLocaleString('id-ID')}
                </td>
                <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                  <button onClick={() => handlePrintUlang(tx)} style={{ backgroundColor: 'var(--princeton-orange)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                    Cetak Ulang
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RiwayatTransaksi;