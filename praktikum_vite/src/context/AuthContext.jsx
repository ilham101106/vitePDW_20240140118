import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user_session');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 1. REVISI DATA MENU DEFAULT: Menggunakan Varian Mie Ayam
  const [menuList, setMenuList] = useState([
    { id: 1, name: 'Mie Ayam Biasa', price: 15000, category: 'Makanan' },
    { id: 2, name: 'Mie Ayam Bakso Pangsit', price: 22000, category: 'Makanan' },
    { id: 3, name: 'Mie Ayam Komplit Special', price: 25000, category: 'Makanan' },
    { id: 4, name: 'Es Teh Manis', price: 5000, category: 'Minuman' },
  ]);

  // 2. Data Karyawan (Gunakan ID Kasir Uppercase)
  const [employees, setEmployees] = useState([
    { id: "KASIR1", name: "Eleanora79", phone: "081234567890" },
    { id: "KASIR2", name: "Anindita Kirana", phone: "089876543210" },
    { id: "KASIR3", name: "Luthfiah Staff", phone: "085522334455" }
  ]);

  // 3. REVISI TOTAL DATA TRANSAKSI: Diubah jadi varian Mie Ayam dengan Total Harga yang Sesuai
  const [transactions, setTransactions] = useState([
    { 
      id: '#14', 
      date: '21/5/2026, 16.50.00', 
      total: 42000, 
      employee: 'KASIR1',
      customer: 'Guest',
      items: [
        { name: 'Mie Ayam Biasa', qty: 1, price: 15000 },
        { name: 'Mie Ayam Bakso Pangsit', qty: 1, price: 22000 },
        { name: 'Es Teh Manis', qty: 1, price: 5000 }
      ]
    },
    { 
      id: '#12', 
      date: '13/5/2026', 
      total: 15000, 
      employee: 'KASIR1',
      customer: 'Guest',
      items: [{ name: 'Mie Ayam Biasa', qty: 1, price: 15000 }]
    },
    { 
      id: '#11', 
      date: '13/5/2026', 
      total: 22000, 
      employee: 'KASIR1',
      customer: 'Guest',
      items: [{ name: 'Mie Ayam Bakso Pangsit', qty: 1, price: 22000 }]
    },
    { 
      id: '#10', 
      date: '13/5/2026', 
      total: 15000, 
      employee: 'KASIR1',
      customer: 'Guest',
      items: [{ name: 'Mie Ayam Biasa', qty: 1, price: 15000 }]
    },
    { 
      id: '#9', 
      date: '13/5/2026', 
      total: 25000, 
      employee: 'KASIR1',
      customer: 'Guest',
      items: [{ name: 'Mie Ayam Komplit Special', qty: 1, price: 25000 }]
    },
    { 
      id: '#8', 
      date: '13/5/2026', 
      total: 15000, 
      employee: 'KASIR1',
      customer: 'Guest',
      items: [{ name: 'Mie Ayam Biasa', qty: 1, price: 15000 }]
    },
    { 
      id: '#7', 
      date: '13/5/2026', 
      total: 15000, 
      employee: 'KASIR1',
      customer: 'Guest',
      items: [{ name: 'Mie Ayam Biasa', qty: 1, price: 15000 }]
    }
  ]);

  // 4. Data Feedback Pelanggan (Disesuaikan ulasannya ke Mie Ayam)
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, date: '21/5/2026', name: 'Rian', message: 'Mie ayam bakso pangsitnya mantap, bumbunya meresap pas!', rating: 5 },
    { id: 2, date: '21/5/2026', name: 'Siti', message: 'Porsi mie ayam komplitnya ngenyangin banget, kuahnya segar.', rating: 5 },
  ]);

  const addTransaction = (newTrx) => setTransactions((prev) => [newTrx, ...prev]);
  const addFeedback = (newFeedback) => setFeedbacks((prev) => [newFeedback, ...prev]);

  // ================= MURNI VALIDASI LOGIN MOCKAPI =================
  const login = async (username, password) => {
    try {
      const response = await fetch(`https://6a02ecf30d92f63dd254836f.mockapi.io/login`);
      if (!response.ok) throw new Error('Gagal terhubung ke server API');
      
      const users = await response.json();
      
      const foundUser = users.find(
        (u) => (u.username || u.name) === username && u.password === password
      );

      if (foundUser) {
        let determinedRole = 'KARYAWAN'; 
        if (foundUser.role === 'OWNER' || foundUser.id === '1' || foundUser.id === 1) {
          determinedRole = 'OWNER';
        }

        const validUser = { 
          username: foundUser.username || foundUser.name, 
          role: determinedRole 
        };

        setUser(validUser);
        localStorage.setItem('user_session', JSON.stringify(validUser));
        
        alert(`Login Berhasil sebagai ${determinedRole}!`); 
        return { success: true, role: determinedRole };
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
    <AuthContext.Provider value={{ 
      user, login, logout, 
      menuList, setMenuList,
      employees, setEmployees,
      transactions, addTransaction,
      feedbacks, addFeedback 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);