import { FC, } from 'react'
import { useDispatch } from 'react-redux';
import { AuthPage } from '../components/AuthPage';
import { UserType } from '../types';
import { login } from '../redux/userSlice';
import { setLocalStorage } from '../utils/localstorage';

export const LoginPage: FC = () => {

    const dispatch = useDispatch();

    const handleLogin = (localUser: UserType): void => {
        dispatch(login(localUser));
        setLocalStorage('user', JSON.stringify(localUser))
    }

    return (
        <AuthPage handleAuth={handleLogin} title="Войти" method='signIn'
            link={{ to: "/register", text: 'Зарегистрироваться' }}
        />
    )
}
