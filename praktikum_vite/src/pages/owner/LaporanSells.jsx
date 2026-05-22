import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

function LaporanSells() {
  const { transactions, feedbacks, addFeedback } = useAuth();
  const [activeTab, setActiveTab] = useState('transaksi');
  const [selectedTrx, setSelectedTrx] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
      date: new Date().toLocaleString('id-ID'),
      name: fbName,
      message: fbMsg,
      rating: Number(fbRating)
    };

    addFeedback(newFeedback);
    alert("Kritik/Saran berhasil masuk!");
    setFbName('');
    setFbMsg('');
    setFbRating(5);
    setShowQRModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'sans-serif' }}>
      
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e9ecef' }}>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#212529' }}>Laporan & Feedback</h2>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        {['transaksi', 'feedback'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)} 
            style={{ 
              backgroundColor: activeTab === tab ? '#ff5c14ff' : '#ffffff',
              color: activeTab === tab ? '#ffffff' : '#6c757d',
              border: '1px solid #e9ecef', padding: '10px 20px', borderRadius: '8px', 
              fontWeight: '600', cursor: 'pointer'
            }}
          >
            {tab === 'transaksi' ? '📊 Transaksi' : '💬 Feedback'}
          </button>
        ))}
      </div>

      {activeTab === 'transaksi' && (
        <div style={{ overflowX: 'auto', background: '#ffffff', borderRadius: '12px', border: '1px solid #e9ecef' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f4f5f7', borderBottom: '2px solid #e9ecef' }}>
                <th style={{ padding: '15px', color: '#212529', fontWeight: '600' }}>ID</th>
                <th style={{ padding: '15px', color: '#6c757d', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '15px', color: '#212529', fontWeight: '600' }}>Waktu</th>
                <th style={{ padding: '15px', color: '#212529', fontWeight: '600' }}>Total</th>
                <th style={{ padding: '15px', color: '#212529', fontWeight: '600' }}>Karyawan</th>
                <th style={{ padding: '15px', color: '#212529', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx) => {
                const cleanId = `#${String(trx.id).replace(/#/g, '')}`;
                
                // Logic memecah tanggal dan jam
                const parts = trx.date.split(', ');
                const datePart = parts[0];
                // Jika tidak ada jam, gunakan '08.00.00' sebagai default
                const timePart = parts[1] || '08.00.00'; 
                
                return (
                  <tr key={trx.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                    <td style={{ padding: '15px', fontWeight: '600', color: '#212529' }}>{cleanId}</td>
                    <td style={{ padding: '15px', color: '#6c757d' }}>{datePart}</td>
                    <td style={{ padding: '15px', fontWeight: '600', color: '#212529' }}>{timePart}</td>
                    <td style={{ padding: '15px', fontWeight: '700', color: '#212529' }}>
                      Rp {trx.total.toLocaleString('id-ID')}
                    </td>
                    <td style={{ padding: '15px', fontWeight: '600', color: '#212529' }}>{trx.employee.toUpperCase()}</td>
                    <td style={{ padding: '15px' }}>
                      <button 
                        onClick={() => openDetails(trx)} 
                        style={{ background: 'none', border: 'none', color: '#ff5c14ff', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LaporanSells;