import { FC } from 'react'
import { duration, posted } from '../utils/moment.ts';
import { Item } from '../types/index.ts'
import { ListVideoCard } from './ListVideoCard.tsx';
import { GridVideoCard } from './GridVideoCard.tsx';
import { useAppSelector } from '../hooks/useAppSelector.tsx';

type PropsType = {
    item: Item
}

export const VideoCard: FC<PropsType> = ({ item }) => {
    const { contentDetails, snippet } = item;

    const watch = `${import.meta.env.VITE_YT_WATCH}${item.id}`;
    const channelLink = `${import.meta.env.VITE_YT_CHANNEL}${snippet.channelId}`;

    const videoDuration = duration(contentDetails.duration);
    const publishedAt = posted(snippet.publishedAt);

    const viewMode = useAppSelector(store => store.viewMode);
    const CardType = viewMode === 'list' ? ListVideoCard : GridVideoCard;


    return (
        <CardType item={{ ...item, watch, channelLink, videoDuration, publishedAt}} />
    )
}
