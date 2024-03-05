import { FavoritesList } from '../components/FavoritesList'
import { Typography } from 'antd'
import { useEffect } from "react";
import { getFavorites } from "../redux/favoritesSlice";
import { useAuth } from '../hooks/useAuth';
import { FC } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch';

export const FavoritesPage: FC = () => {

    const { user } = useAuth();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getFavorites(user))
    }, [dispatch, user])


    return (
        <section className='favorites'>
            <Typography.Title level={2} >Избранное</Typography.Title>
            <FavoritesList />
        </section>
    )
}
