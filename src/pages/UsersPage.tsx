import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, List, Typography, Spin, Empty } from 'antd';
import { LogoutOutlined, UserAddOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import UserCard from '../components/UserCard';
import UserModal from '../components/UserModal';
import { getUsers } from '../api/users';

const { Title } = Typography;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
`;

const UsersList = styled(List)`
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const UsersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  
  if (isLoading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: 100 }}>
          <Spin size="large" />
        </div>
      </Container>
    );
  }
  
  return (
    <Container>
      <Header>
        <Title level={2} style={{ margin: 0 }}>Пользователи</Title>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button icon={<LogoutOutlined />} onClick={handleLogout}>
            Выход
          </Button>
          <Button 
            type="primary" 
            icon={<UserAddOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Создать
          </Button>
        </div>
      </Header>
      
      {users.length === 0 ? (
        <Empty
          description="Пользователей пока нет"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Создать первого пользователя
          </Button>
        </Empty>
      ) : (
        <UsersList
          dataSource={users}
          renderItem={(user: any) => (
            <List.Item>
              <UserCard 
                user={user} 
                onClick={() => setEditingUser(user)}
              />
            </List.Item>
          )}
        />
      )}
      
      <UserModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          refetch();
        }}
      />
      
      <UserModal
        open={!!editingUser}
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSuccess={() => {
          setEditingUser(null);
          refetch();
        }}
      />
    </Container>
  );
};

export default UsersPage;