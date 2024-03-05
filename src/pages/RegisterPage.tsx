import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthPage } from '../components/AuthPage';
import { Space, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


export const RegisterPage: FC = () => {

    const navgiate = useNavigate();

    const handleRegister = (): void => {
        message.success(
            <Space>
                Успешно зарегистрированы. Перенаправление <LoadingOutlined />
            </Space>
        );
        setTimeout(() => navgiate('/login'), 3000)
    }

    return (
        <AuthPage handleAuth={handleRegister} link={{ to: '/login', text: 'Войти' }}
            title='Зарегистрироваться' method='signUp'
        />
    )
}
