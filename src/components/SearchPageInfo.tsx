import { FC, MouseEvent } from 'react'
import { Typography, Button, Flex } from 'antd'
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons'
import { useAppSelector } from '../hooks/useAppSelector'

type SearchPageInfoType = {
    pageInfo: {
        [key: string]: string,
    },
    changeDisplayMode: (event: MouseEvent<HTMLElement>) => void
}

export const SearchPageInfo: FC<SearchPageInfoType> = ({ pageInfo, changeDisplayMode }) => {

    const viewMode = useAppSelector(store => store.viewMode);

    return (
        <Flex
            className='search-page__info'
            justify='space-between'
            align='center'        >
            <Typography.Text>
                Видео по запросу: <strong>{pageInfo?.totalResults}</strong>
            </Typography.Text>
            <Flex gap={10}>
                <Button className={viewMode === 'list' ? 'active' : ''} data-mode='list' onClick={changeDisplayMode} size='large' type="text">
                    <UnorderedListOutlined
                        style={{ fontSize: '1.2rem' }}
                    /></Button>
                <Button className={viewMode === 'list' ? '' : 'active'} data-mode='grid' onClick={changeDisplayMode} size='large' type="text">
                    <AppstoreOutlined
                        style={{ fontSize: '1.2rem' }}
                    /></Button>
            </Flex>
        </Flex >
    )
}
