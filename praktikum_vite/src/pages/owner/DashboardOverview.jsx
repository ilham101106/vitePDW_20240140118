import React, { useState, useEffect } from 'react';

function DashboardOverview() {
  const [liveTransactions, setLiveTransactions] = useState([]);
  const [stats, setStats] = useState([
    { id: 1, title: 'Pendapatan Hari Ini', value: 'Rp 1.250.000', change: '+15%', color: 'var(--lime-green, #1fd224ff)' },
    { id: 2, title: 'Porsi Terjual', value: '84 Porsi', change: 'Mie & Minuman', color: 'var(--princeton-orange, #ff8a1bff)' },
    { id: 3, title: 'Total Transaksi', value: '42 Nota', change: 'Rata-rata Rp 30k', color: 'var(--blaze-orange, #ff5c14ff)' },
    { id: 4, title: 'Feedback Positif', value: '96%', change: 'Dari 25 ulasan', color: 'var(--gold, #fcd514ff)' },
  ]);

  useEffect(() => {
    // Membaca data transaksi riil dari kasir
    const savedTx = localStorage.getItem('mieayamin_transactions');
    if (savedTx) {
      const parsedTx = JSON.parse(savedTx);
      setLiveTransactions(parsedTx);

      // Hitung total pendapatan otomatis dari data live kasir
      const liveRevenue = parsedTx.reduce((acc, curr) => {
        // Deteksi jika format total berupa string atau number langsung
        const rawTotal = String(curr.total || '');
        const numericValue = parseInt(rawTotal.replace(/[^0-9]/g, '')) || 0;
        return acc + numericValue;
      }, 0);

      if (liveRevenue > 0) {
        setStats(prev => prev.map(s => {
          if (s.id === 1) return { ...s, value: `Rp ${liveRevenue.toLocaleString('id-ID')}` };
          if (s.id === 3) return { ...s, value: `${parsedTx.length} Nota` };
          return s;
        }));
      }
    } else {
      // Data fallback default dengan format ID angka murni (menyesuaikan input karyawan)
      setLiveTransactions([
        { id: 3, time: '17:15', items: '1x Mie Ayam, 1x Es Teh', total: 'Rp 41.000', status: 'Selesai' },
        { id: 2, time: '16:40', items: '1x Kwetiau, 1x Es Jeruk', total: 'Rp 23.000', status: 'Selesai' },
        { id: 1, time: '16:12', items: '3x Mie Yamin, 3x Es Jeruk', total: 'Rp 66.000', status: 'Selesai' },
      ]);
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', fontFamily: 'sans-serif' }}>
      
      {/* 1. Baris Kartu Statistik */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {stats.map((item) => (
          <div 
            key={item.id} 
            style={{
              background: '#ffffff',
              padding: '20px',
              borderRadius: '12px',
              borderLeft: `6px solid ${item.color}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '14px', color: '#6c757d', fontWeight: '500' }}>
              {item.title}
            </span>
            <span style={{ fontSize: '24px', fontWeight: '700', color: '#212529' }}>
              {item.value}
            </span>
            <span style={{ fontSize: '12px', color: item.color, fontWeight: '600' }}>
              {item.change}
            </span>
          </div>
        ))}
      </div>

      {/* 2. Area Detail & Tabel Transaksi */}
      <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e9ecef' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#212529' }}>
          Transaksi Terakhir (Live)
        </h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e9ecef' }}>
              <th style={{ padding: '12px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>ID Nota</th>
              <th style={{ padding: '12px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>Waktu</th>
              <th style={{ padding: '12px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>Pesanan</th>
              <th style={{ padding: '12px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>Total Bayar</th>
              <th style={{ padding: '12px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {liveTransactions.map((trx) => (
              <tr key={trx.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                {/* Menampilkan ID transaksi asli (ditambahkan simbol # di depannya agar rapi) */}
                <td style={{ padding: '14px 12px', fontWeight: '600', fontSize: '14px', color: '#212529' }}>
                  #{trx.id}
                </td>
                <td style={{ padding: '14px 12px', fontSize: '14px', color: '#212529' }}>
                  {trx.time || trx.date || '-'} {trx.time ? 'WIB' : ''}
                </td>
                <td style={{ padding: '14px 12px', fontSize: '14px', color: '#212529', fontWeight: '500' }}>
                  {/* Handle render jika struktur item berupa array object ataupun teks string */}
                  {Array.isArray(trx.items) 
                    ? trx.items.map(i => `${i.qty}x ${i.name}`).join(', ') 
                    : trx.items}
                </td>
                <td style={{ padding: '14px 12px', fontSize: '14px', color: '#212529', fontWeight: '700' }}>
                  {typeof trx.total === 'number' ? `Rp ${trx.total.toLocaleString('id-ID')}` : trx.total}
                </td>
                <td style={{ padding: '14px 12px' }}>
                  <span style={{ 
                    backgroundColor: 'rgba(31, 210, 36, 0.1)', 
                    color: '#1fd224ff', 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '12px',
                    fontWeight: '700',
                    border: '1px solid rgba(31, 210, 36, 0.2)'
                  }}>
                    {trx.status || 'Selesai'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardOverview;