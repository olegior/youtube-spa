import { FC, MouseEvent } from 'react'
import { List, Button, Space, Typography, Form, Flex, } from 'antd'
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { deleteFavorite, updateFavorite } from '../redux/favoritesSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { ModalForm } from './ModalForm';
import { useAuth } from '../hooks/useAuth';
import { lastSearch, searchThunk } from '../redux/searchSlice';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { FavoritesType, ModalHandler } from '../types';
import { Spinner } from './Spinner';
import { useAppDispatch } from '../hooks/useAppDispatch';


export const FavoritesList: FC = () => {
    const { user } = useAuth();

    const { favorites, isLoading } = useAppSelector(store => store.favorites);
    const dispatch = useAppDispatch();

    const [form] = Form.useForm();
    const navgiate = useNavigate();

    const searchHandler = (event: MouseEvent<HTMLElement>, item: FavoritesType) => {
        event.stopPropagation();
        dispatch(lastSearch(item))

        navgiate('/');
        dispatch(searchThunk(item))
    }

    const deleteHandler = (event: MouseEvent<HTMLElement>, id: string) => {
        event.stopPropagation()
        dispatch(deleteFavorite(id))
    }

    const handleChangeFavorite = () => {
        const favorite = form.getFieldsValue();
        dispatch(updateFavorite({ user, favorite }));
    }

    const content = <ModalForm form={form} title="Сохранить запрос?" />;

    const modalHandler = useOutletContext<ModalHandler>()

    const showModalForm = (event: MouseEvent<HTMLElement>) => {
        const id = event.currentTarget.dataset.id || '';
        const data = favorites.find(el => el.id == id);
        form.setFieldsValue(data)
        modalHandler(content, handleChangeFavorite);
    }


    return (
        <>
            {isLoading
                ? <Flex justify='center'><Spinner /></Flex>
                : <List
                    dataSource={favorites}
                    renderItem={(item) =>
                        <List.Item
                            onClick={showModalForm}
                            className='favorites__item'
                            data-id={item.id}>
                            <Typography.Paragraph>{item.title}</Typography.Paragraph >
                            <Space>
                                <Button onClick={(event) => searchHandler(event, item)} >
                                    <SearchOutlined />
                                </Button>
                                <Button onClick={(event) => deleteHandler(event, item.id)}>
                                    <DeleteOutlined />
                                </Button>
                            </Space>
                        </List.Item >
                    }
                />}
        </>
    )
}
