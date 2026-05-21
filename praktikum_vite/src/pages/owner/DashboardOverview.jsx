import React, { useState, useEffect } from 'react';

function DashboardOverview() {
  const [liveTransactions, setLiveTransactions] = useState([]);
  const [stats, setStats] = useState([
    { id: 1, title: 'Pendapatan Hari Ini', value: 'Rp 1.250.000', change: '+15%', color: 'var(--lime-green)' },
    { id: 2, title: 'Porsi Terjual', value: '84 Porsi', change: 'Mie & Minuman', color: 'var(--princeton-orange)' },
    { id: 3, title: 'Total Transaksi', value: '42 Nota', change: 'Rata-rata Rp 30k', color: 'var(--blaze-orange)' },
    { id: 4, title: 'Feedback Positif', value: '96%', change: 'Dari 25 ulasan', color: 'var(--gold)' },
  ]);

  useEffect(() => {
    // Membaca data transaksi riil dari kasir
    const savedTx = localStorage.getItem('mieayamin_transactions');
    if (savedTx) {
      const parsedTx = JSON.parse(savedTx);
      setLiveTransactions(parsedTx);

      // Hitung total pendapatan otomatis dari data live kasir (Opsional Tambahan Nilai Plus!)
      const liveRevenue = parsedTx.reduce((acc, curr) => {
        const numericValue = parseInt(curr.total.replace(/[^0-8]/g, '')) || 0;
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
      // Data default jika kasir belum melakukan transaksi sama sekali
      setLiveTransactions([
        { id: 'TRX-004', time: '17:15', items: '1x Mie Ayam, 1x Es Teh', total: 'Rp 41.000', status: 'Selesai' },
        { id: 'TRX-003', time: '16:40', items: '1x Kwetiau, 1x Es Jeruk', total: 'Rp 23.000', status: 'Selesai' },
        { id: 'TRX-002', time: '16:12', items: '3x Mie Yamin, 3x Es Jeruk', total: 'Rp 66.000', status: 'Selesai' },
      ]);
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* 1. Baris Kartu Statistik */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {stats.map((item) => (
          <div 
            key={item.id} 
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '12px',
              borderLeft: `6px solid ${item.color}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '14px', color: '#718096', fontWeight: '500' }}>{item.title}</span>
            <span style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c' }}>{item.value}</span>
            <span style={{ fontSize: '12px', color: item.color === 'var(--blaze-orange)' || item.color === 'var(--princeton-orange)' ? 'var(--blaze-orange)' : item.color, fontWeight: '600' }}>
              {item.change}
            </span>
          </div>
        ))}
      </div>

      {/* 2. Area Detail & Tabel Transaksi */}
      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#1a202c' }}>
          Transaksi Terakhir (Live)
        </h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #edf2f7' }}>
              <th style={{ padding: '12px', color: '#718096', fontSize: '14px' }}>ID Nota</th>
              <th style={{ padding: '12px', color: '#718096', fontSize: '14px' }}>Waktu</th>
              <th style={{ padding: '12px', color: '#718096', fontSize: '14px' }}>Pesanan</th>
              <th style={{ padding: '12px', color: '#718096', fontSize: '14px' }}>Total Bayar</th>
              <th style={{ padding: '12px', color: '#718096', fontSize: '14px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {liveTransactions.map((trx) => (
              <tr key={trx.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                <td style={{ padding: '14px 12px', fontWeight: '600', fontSize: '14px', color: 'var(--blaze-orange)' }}>{trx.id}</td>
                <td style={{ padding: '14px 12px', fontSize: '14px', color: '#4a5568' }}>{trx.time} WIB</td>
                <td style={{ padding: '14px 12px', fontSize: '14px', color: '#2d3748', fontWeight: '500' }}>{trx.items}</td>
                <td style={{ padding: '14px 12px', fontSize: '14px', color: '#1a202c', fontWeight: '600' }}>{trx.total}</td>
                <td style={{ padding: '14px 12px' }}>
                  <span style={{ 
                    backgroundColor: 'rgba(31, 210, 36, 0.15)', 
                    color: 'var(--lime-green)', 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '12px',
                    fontWeight: '700'
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