import { List, Flex } from 'antd'
import { FC } from 'react'
import { Item } from '../types'
import { InfitityScroll } from './InfitityScroll.tsx';
import { useAppSelector } from '../hooks/useAppSelector.tsx';
import { Spinner } from './Spinner.tsx';
import { VideoCard } from './VideoCard.tsx';

type PropsType = {
    items: Item[]
}


export const VideosList: FC<PropsType> = ({ items }) => {

    const viewMode = useAppSelector(store => store.viewMode)
    const isLoading = useAppSelector(state => state.search.isLoading);

    const grid = {
        column: 4,
        lg: 4,
        md: 3,
        sm: 2,
        xs: 1,
        gutter: 20
    }

    const infinity = !isLoading
        ? <InfitityScroll />
        : <Flex justify='center' style={{ paddingBlock: 20, }}>
            <Spinner />
        </Flex>

    return (
        <>
            <List dataSource={items}
                loadMore={infinity}
                grid={viewMode !== 'list' ? grid : { column: 1 }}
                renderItem={(item) => {
                    return (
                        <List.Item                         >
                            <VideoCard item={item} />
                        </List.Item>
                    )
                }}>
            </List>
        </>
    )
}
