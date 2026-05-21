import React, { useState } from 'react';

function Login() {
  // State untuk menampung input dari form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit

    try {
      // 1. Ambil data dari MockAPI kamu
      const response = await fetch('https://6a02ecf30d92f63dd254836f.mockapi.io/login');
      const users = await response.json();

      // 2. Cocokkan input dengan data dari API
      const foundUser = users.find(
        (user) => user.username === username && user.password === password
      );

      if (foundUser) {
        alert('Login Berhasil!');
        // Contoh redirect jika sukses (bisa disesuaikan dengan react-router-dom nanti)
        window.location.href = '/'; 
      } else {
        alert('Username atau Password salah!');
      }
    } catch (error) {
      console.error("Error saat login:", error);
      alert('Gagal terhubung ke MockAPI. Pastikan koneksi internet aman.');
    }
  };

  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        
        <h2 style={{ color: '#FF5722', margin: '0 0 5px 0', fontWeight: 'bold', fontFamily: 'sans-serif' }}>MieAyamin</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px', fontFamily: 'sans-serif' }}>Silakan login untuk masuk ke sistem</p>

        <form onSubmit={handleLogin}>
          {/* Input Username */}
          <div style={{ textAlign: 'left', marginBottom: '15px', fontFamily: 'sans-serif' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' }}>Username</label>
            <input 
              type="text" 
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          {/* Input Password */}
          <div style={{ textAlign: 'left', marginBottom: '25px', fontFamily: 'sans-serif' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' }}>Password</label>
            <input 
              type="password" 
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          {/* Tombol Submit */}
          <button 
            type="submit" 
            style={{ width: '100%', padding: '12px', backgroundColor: '#FF5722', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
          >
            Masuk Aplikasi
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;