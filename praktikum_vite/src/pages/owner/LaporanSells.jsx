import React, { useState, useEffect } from 'react';

function LaporanSells() {
  const [feedbacks, setFeedbacks] = useState([]);
  const API_URL = 'https://6a02ecf30d92f63dd254836f.mockapi.io/feedback';

  useEffect(() => {
    fetch(API_URL).then(res => res.json()).then(data => setFeedbacks(data)).catch(err => console.log(err));
  }, []);

  const handleDownloadReport = () => {
    // Simulasi pembuatan data CSV unduhan laporan keuangan
    const csvContent = "data:text/csv;charset=utf-8,ID,Tanggal,Total Omset,Status\nTRX01,16/05/2026,Rp 1250000,Selesai";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Laporan_Penjualan_Warmindo.csv");
    document.body.appendChild(link);
    link.click();
    alert("Laporan Penjualan (.CSV) Berhasil Diunduh!");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--border-color)', paddingBottom: '15px' }}>
        <div>
          <h3 style={{ color: 'var(--blaze-orange)', fontWeight: '700' }}>Laporan Keuangan & Feedback</h3>
          <p style={{ fontSize: '13px', color: '#718096' }}>Unduh berkas transaksi & monitor kepuasan pelanggan</p>
        </div>
        <button onClick={handleDownloadReport} style={{ backgroundColor: 'var(--lime-green)', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          Download Report (.CSV)
        </button>
      </div>

      <div>
        <h4 style={{ marginBottom: '15px', fontWeight: '700' }}>Ulasan Real-time Pelanggan</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {feedbacks.map((f) => (
            <div key={f.id} style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', borderLeft: '4px solid var(--gold)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontWeight: '600' }}>Anonim Pelanggan #{f.id}</span>
                <span style={{ color: 'var(--gold)', fontWeight: '700' }}>⭐ {f.rating}/5</span>
              </div>
              <p style={{ fontSize: '14px', color: '#4a5568', fontStyle: 'italic' }}>"{f.comment || 'Tidak ada komentar tertulis.'}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LaporanSells;