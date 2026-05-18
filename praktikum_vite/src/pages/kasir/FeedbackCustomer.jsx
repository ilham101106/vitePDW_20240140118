import React, { useState } from 'react';

function FeedbackCustomer() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://6a02ecf30d92f63dd254836f.mockapi.io/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment })
      });
      if (res.ok) {
        alert("Feedback Berhasil Dikirim! Terima kasih.");
        setComment('');
        setRating(5);
      }
    } catch (err) {
      alert("Gagal mengirim umpan balik.");
    }
  };

  return (
    <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ color: 'var(--princeton-orange)', fontWeight: '700' }}>Umpan Balik Pelanggan</h3>
        <p style={{ fontSize: '13px', color: '#718096' }}>Input review pembeli mengenai cita rasa mie ayam dan pelayanan</p>
      </div>

      <form onSubmit={handleSubmitFeedback} style={{ background: '#f8f9fa', padding: '25px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Rating Kepuasan</label>
          <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff', fontSize: '15px', fontWeight: '600', color: 'var(--gold)' }}>
            <option value="5">⭐⭐⭐⭐⭐ (Sangat Puas)</option>
            <option value="4">⭐⭐⭐⭐ (Puas)</option>
            <option value="3">⭐⭐⭐ (Biasa Saja)</option>
            <option value="2">⭐⭐ (Kurang Enak)</option>
            <option value="1">⭐ (Kecewa)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Komentar / Saran Pembeli</label>
          <textarea rows="4" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Contoh: Mie nyemeknya mantap banget, tapi es teh kurang manis..." style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px', resize: 'none' }} required></textarea>
        </div>

        <button type="submit" style={{ backgroundColor: 'var(--princeton-orange)', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginTop: '5px' }}>
          Kirim Ulasan
        </button>
      </form>
    </div>
  );
}

export default FeedbackCustomer;