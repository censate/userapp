import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LoginCard = styled(Card)`
  width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
`;

const Title = styled.h1`
  text-align: center;
  color: #1890ff;
  margin-bottom: 30px;
`;

// Функция входа (имитация)
const loginUser = async (data: { login: string; password: string }) => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (data.login === 'admin' && data.password === 'admin') {
        resolve('fake-jwt-token');
      } else {
        reject(new Error('Неверный логин или пароль'));
      }
    }, 1000);
  });
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (token: string) => {
      localStorage.setItem('token', token);
      notification.success({
        message: 'Успешный вход!',
        description: 'Добро пожаловать в систему!',
      });
      navigate('/users');
    },
    onError: (error: Error) => {
      notification.error({
        message: 'Ошибка входа',
        description: error.message,
      });
    },
  });

  const onFinish = (values: { login: string; password: string }) => {
    mutation.mutate(values);
  };

  return (
    <Container>
      <LoginCard>
        <Title>Авторизация</Title>
        
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="login"
            rules={[{ required: true, message: 'Введите логин' }]}
          >
            <Input 
              prefix={<UserOutlined />}
              placeholder="Логин" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />}
              placeholder="Пароль"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={mutation.isPending}
              disabled={mutation.isPending}
              block
            >
              {mutation.isPending ? 'Вход...' : 'Войти'}
            </Button>
          </Form.Item>
          
          <div style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
            <p>Тестовые данные:</p>
            <p><strong>Логин:</strong> admin</p>
            <p><strong>Пароль:</strong> admin</p>
          </div>
        </Form>
      </LoginCard>
    </Container>
  );
};

export default LoginPage;