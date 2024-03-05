import { Button, Form, Input, Modal, Space, Typography } from 'antd'
import { FC, ChangeEvent, useState } from 'react'
import { searchThunk, lastSearch } from '../redux/searchSlice';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { useAppSelector } from '../hooks/useAppSelector';
import { ModalForm } from './ModalForm';
import { addDocumentDB } from '../firebase/document';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../hooks/useAppDispatch';

export const SearchForm: FC = () => {

    const lastSearchValue = useAppSelector(state => state.search.lastSearch)
    const [searchValue, setSearchValue] = useState<string>(lastSearchValue.query);
    const [successfulyAddedToFavorites, setSuccsessfulyAdddedToFavorites] = useState(false)

    const [modal, modalContextHolder] = Modal.useModal();
    const [form] = Form.useForm();
    const { user } = useAuth();

    const dispatch = useAppDispatch();

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setSuccsessfulyAdddedToFavorites(false)
        setSearchValue(event.target.value);
    }

    const addToFavorites = () => {
        setSuccsessfulyAdddedToFavorites(true);
        addDocumentDB({
            user,
            favorite: form.getFieldsValue()
        })
    }

    const handleAdd = () => {

        form.setFieldsValue({
            id: '',
            title: searchValue,
            query: searchValue,
            order: 'relevance',
            maxResults: 12,
        })

        modal.confirm({
            cancelText: 'Отмена',
            okText: 'Сохранить',
            closable: true,
            content: <ModalForm form={form} title="Сохранить запрос?" readOnly />,
            onOk: addToFavorites,

        })
    }

    const handleInputFinish = () => {
        const request = { query: searchValue }
        dispatch(lastSearch(request));
        dispatch(searchThunk(request));
    }

    return (
        <div className='search'>
            <Typography.Title level={2} className='search__title'>
                Поиск видео
            </Typography.Title>
            <Form size='large' onFinish={handleInputFinish}
                className='search__form'>
                <Form.Item>
                    <Space.Compact>
                        <div className='search__item'>
                            {!!searchValue.length &&
                                <Button type='text' className='search__add' onClick={handleAdd} >
                                   {successfulyAddedToFavorites ? <HeartTwoTone className='heart'/> :  < HeartOutlined />}
                                </Button>}
                            <Input value={searchValue} onChange={handleInput} placeholder='ваш запрос...' />
                        </div>
                        <Button htmlType='submit' type='primary'>
                            Найти
                        </Button>
                    </Space.Compact>
                </Form.Item>
            </Form>
            {modalContextHolder}
        </div>
    )
}
