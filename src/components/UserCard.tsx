import React from 'react';
import { Card, Avatar } from 'antd';
import dayjs from 'dayjs';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
`;

const DateText = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
`;

interface UserCardProps {
  user: {
    id: string;
    name: string;
    avatar: string;
    createdAt: string;
  };
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  const formattedDate = dayjs(user.createdAt).format('DD.MM.YYYY');
  
  return (
    <StyledCard onClick={onClick}>
      <CardContent>
        <Avatar 
          src={user.avatar} 
          size={64}
          style={{ minWidth: 64 }}
        >
          {user.name.charAt(0)}
        </Avatar>
        <UserInfo>
          <UserName>{user.name}</UserName>
          <DateText>Зарегистрирован {formattedDate}</DateText>
        </UserInfo>
      </CardContent>
    </StyledCard>
  );
};

export default UserCard;