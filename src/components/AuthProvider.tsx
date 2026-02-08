import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    // Быстрая проверка
    setTimeout(() => {
      setIsChecking(false);
    }, 100);
  }, []);
  
  if (isChecking) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <Spin size="large" />
      </div>
    );
  }
  
  const token = localStorage.getItem('token');
  const isLoginPage = location.pathname === '/login';
  
  // Нет токена и не на логине -> на логин
  if (!token && !isLoginPage) {
    return <Navigate to="/login" replace />;
  }
  
  // Есть токен и на логине -> на users
  if (token && isLoginPage) {
    return <Navigate to="/users" replace />;
  }
  
  return <>{children}</>;
};

export { AuthProvider };