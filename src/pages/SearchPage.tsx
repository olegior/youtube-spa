import { FC, MouseEvent } from 'react'
import { SearchForm } from '../components/SearchForm'
import { changeMode } from '../redux/viewModeSlice'
import { useDispatch } from 'react-redux'
import { SearchPageInfo } from '../components/SearchPageInfo'
import { VideosList } from '../components/VideosList'
import { useAppSelector } from '../hooks/useAppSelector'
import { Flex } from 'antd'
import { Spinner } from '../components/Spinner'

export const SearchPage: FC = () => {

    const dispatch = useDispatch();
    const search = useAppSelector(store => store.search);

    const { isLoading } = search;
    const { pageInfo, items } = search.data;

    const changeDisplayMode = (event: MouseEvent<HTMLElement>) => {
        const mode = event.currentTarget.dataset.mode;
        dispatch(changeMode(mode))
    }

    return (
        <section className={!items?.length ? 'container-center' : ''} >
            <SearchForm />
            {!!items?.length && <SearchPageInfo changeDisplayMode={changeDisplayMode} pageInfo={pageInfo} />}
            {(!!isLoading && !items?.length) &&
                <Flex justify='center'>
                    <Spinner />
                </Flex>
            }
            {!!items?.length && <VideosList items={items} />}
        </section>
    )
}
