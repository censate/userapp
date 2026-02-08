import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <Result
        status="404"
        title="404"
        subTitle="Страница не найдена"
        extra={
          <Button type="primary" onClick={() => navigate('/users')}>
            На главную
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;