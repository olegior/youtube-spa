import { FC } from 'react'
import { Form, Input, Button, Flex, Typography, message, Image } from 'antd'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { AuthPageUserType, UserType } from '../types';
import { signIn, signUp } from '../firebase/auth';

type PropsType = {
    handleAuth: (user: UserType) => void,
    link: {
        to: string,
        text: string
    },
    title: string,
    method: 'signIn' | 'signUp'
}

export const AuthPage: FC<PropsType> = ({ title, handleAuth, link, method }) => {
    const { isAuth } = useAuth();
    const [messageApi, messageContextHolder] = message.useMessage();

    const authFunctions = {
        signIn: signIn,
        signUp: signUp
    }


    if (isAuth)
        return <Navigate to="/" />

    const handleAuthorization = async (data: AuthPageUserType) => {
        const response = await authFunctions[method](data);

        if (typeof response === 'string') {
            return messageApi.error(response, 3);
        }
        const token = await response?.getIdToken() || '';
        const user = response?.email || '';
        
        handleAuth({ token, user, isAuth: true })
    }


    return (
        <Flex
            className='authorization'
            vertical
            justify='center'
        >
            <Image src='logo.svg' preview={false} style={{ height: 50, marginBlock: 20 }} />

            <Typography.Title level={3}>{title}</Typography.Title>
            <Form
                layout='horizontal'
                variant='outlined'
                className='authorization__form'
                labelCol={{ span: 7 }}
                onFinish={handleAuthorization}>
                <Form.Item label="Почта" name="email" required
                    validateDebounce={2000}
                    rules={[{
                        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Введите корректный email'
                    },
                    { required: true, message: 'Введите email' }]}>
                    <Input type='email' autoComplete='true' />
                </Form.Item>
                <Form.Item label="Пароль" name="password" required
                    validateDebounce={2000}
                    rules={[{ required: true, message: 'Введите пароль' },
                    { pattern: / *.{6,}/, message: 'Минимум 6 символов' }]}>
                    <Input type='password' autoComplete='true' />
                </Form.Item>
                <Form.Item>
                    <Flex justify='end'>
                        <Button size='large' htmlType='submit'>{title}</Button>
                    </Flex>
                </Form.Item>
            </Form>
            <Flex
                justify='center'>
                <Link to={link.to} >{link.text}</Link>
            </Flex>
            {messageContextHolder}
        </Flex>
    )
}
