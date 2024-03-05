import React from 'react';
import { Button, Layout } from 'antd';
import { NavLink } from 'react-router-dom'
import { logout } from '../redux/userSlice';
import { useDispatch } from 'react-redux'
import { deleteLocalStorage } from '../utils/localstorage';
import { resetSearch } from '../redux/searchSlice';

export const Header: React.FC = () => {

    const dispatch = useDispatch();

    const handleLogOut = () => {
        deleteLocalStorage('user');
        dispatch(logout());
        dispatch(resetSearch())
    }

    return (
        <Layout.Header className='header'>
            <Layout className='header__container container'>
                <div className='header__group'>
                    <NavLink to='/' >Поиск</NavLink>
                    <NavLink to='favorites' >Избранное</NavLink>
                </div>
                <Button
                    className='header__logout'
                    type='text' onClick={handleLogOut} >Выйти</Button>
            </Layout>
        </Layout.Header>
    )
}
