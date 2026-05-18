import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Mengambil session user dari localStorage jika aplikasi di-refresh
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user_session');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (username, password) => {
    try {
      // 1. Ambil data dari MockAPI kamu
      const response = await fetch(`https://6a02ecf30d92f63dd254836f.mockapi.io/login`);
      if (!response.ok) throw new Error('Gagal terhubung ke server');
      
      const users = await response.json();
      
      // 2. Cari user di dalam array MockAPI yang cocok dengan input dari form
      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );

      let validUser = null;

      if (foundUser) {
        // ATURAN ROLE MANUAL:
        // Kita set default role adalah KARYAWAN (Kasir)
        let determinedRole = 'KARYAWAN'; 
        
        // JIKA ID user dari MockAPI adalah "1" (Geovanny_Keebler), kita jadikan dia OWNER.
        // Kamu juga bisa login pakai username 'owner' dan password 'owner123' jika datanya ada di MockAPI.
        if (foundUser.id === "1" || foundUser.username === "owner") {
          determinedRole = 'OWNER';
        }

        validUser = { 
          username: foundUser.username, 
          role: determinedRole 
        };
      }

      // 3. Jika user valid ditemukan
      if (validUser) {
        setUser(validUser);
        localStorage.setItem('user_session', JSON.stringify(validUser));
        alert(`Login Berhasil sebagai ${validUser.role}!`); 
        return { success: true, role: validUser.role };
      } else {
        alert('Username atau Password salah!');
        return { success: false };
      }

    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan jaringan atau API.');
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
    alert('Berhasil Logout!');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk mempermudah pemanggilan context di App.jsx
export const useAuth = () => useContext(AuthContext);