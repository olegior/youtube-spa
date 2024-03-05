import { FC, useEffect, useMemo, useRef } from 'react'
import { nextPageThunk } from '../redux/searchSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';

export const InfitityScroll: FC = () => {

    const search = useAppSelector(store => store.search);
    const lastSearch = search.lastSearch;
    const nextPageToken = search.data.nextPageToken;

    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement>(null);

    const observer = useMemo(() => {
        return new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting) {
                obs.disconnect();
                dispatch(nextPageThunk({ ...lastSearch, pageToken: nextPageToken }));
            }
        }, { threshold: 1 })
    }, [dispatch, lastSearch, nextPageToken])

    useEffect(() => {
        if (ref.current)
            observer.observe(ref.current);
    }, [observer])

    return (
        <div
            style={{ height: 100, width: '100%' }} ref={ref}></div>
    )
}
