import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { createUser, updateUser, deleteUser } from '../api/users';

interface UserModalProps {
  open: boolean;
  user?: any;
  onClose: () => void;
  onSuccess: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ open, user, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const isEdit = !!user;
  
  useEffect(() => {
    if (open) {
      form.resetFields();
      if (user) {
        form.setFieldsValue(user);
      }
    }
  }, [open, user, form]);
  
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      message.success('Пользователь создан!');
      onSuccess();
      form.resetFields();
    },
    onError: () => {
      message.error('Ошибка создания');
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: (data: any) => updateUser(user.id, data),
    onSuccess: () => {
      message.success('Пользователь обновлен!');
      onSuccess();
    },
    onError: () => {
      message.error('Ошибка обновления');
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(user.id),
    onSuccess: () => {
      message.success('Пользователь удален!');
      onSuccess();
      onClose();
    },
    onError: () => {
      message.error('Ошибка удаления');
    },
  });
  
  const isLoading = createMutation.isPending || updateMutation.isPending;
  
  const handleSubmit = (values: any) => {
    if (isEdit) {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate(values);
    }
  };
  
  const handleDelete = () => {
    Modal.confirm({
      title: 'Удалить пользователя',
      content: `Удалить ${user.name}?`,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: () => deleteMutation.mutate(),
    });
  };
  
  return (
    <Modal
      title={isEdit ? 'Редактирование пользователя' : 'Создание пользователя'}
      open={open}
      onCancel={onClose}
      footer={null}
      closable={!isLoading}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {isEdit && (
          <Form.Item label="ID" name="id">
            <Input disabled />
          </Form.Item>
        )}
        
        <Form.Item
          label="Имя"
          name="name"
          rules={[
            { required: true, message: 'Введите имя' },
            { min: 2, message: 'Минимум 2 символа' }
          ]}
        >
          <Input placeholder="Имя пользователя" />
        </Form.Item>
        
        <Form.Item
          label="Аватар (URL)"
          name="avatar"
          rules={[
            { required: true, message: 'Введите URL' },
            { pattern: /^https?:\/\/.+/, message: 'Некорректный URL' }
          ]}
        >
          <Input placeholder="https://example.com/avatar.jpg" />
        </Form.Item>
        
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          {isEdit && (
            <Button
              danger
              onClick={handleDelete}
              loading={deleteMutation.isPending}
            >
              Удалить
            </Button>
          )}
          <Button onClick={onClose} disabled={isLoading}>
            Отмена
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            {isEdit ? 'Сохранить' : 'Создать'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UserModal;