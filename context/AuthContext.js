import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null berarti belum login
  
  const login = (email, password) => {
    // Logic autentikasi
    if (email === 'admin' && password === 'TrainKu') {
      setUser({ email, role: 'admin', name: 'Admin TrainKu' });
      return { success: true, role: 'admin' };
    } else if (email === 'user' && password === 'user123') {
      setUser({ email, role: 'user', name: 'Bombardilo Crocodilo' });
      return { success: true, role: 'user' };
    }
    return { success: false };
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Tambahkan hook useAuth untuk memudahkan penggunaan context
export const useAuth = () => useContext(AuthContext);