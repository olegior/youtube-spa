import { FC } from 'react'
import { Flex, Typography, Image } from 'antd';
import { duration, posted } from '../utils/moment.ts';
import { Item } from '../types';


type PropsType = {
    item: Item
}

const { Link, Paragraph, Text } = Typography;

export const ListVideoCard: FC<PropsType> = ({ item }) => {
    const { contentDetails, snippet, statistics } = item;

    const watch = `${import.meta.env.VITE_YT_WATCH}${item.id}`;
    const channelLink = `${import.meta.env.VITE_YT_CHANNEL}${snippet.channelId}`;

    const videoDuration = duration(contentDetails.duration);
    const publishedAt = posted(snippet.publishedAt);

    return (
        <div className='list-video-card'>
            <Flex gap={10}>
                <Flex className='video-card__cover'>
                    <Link href={watch} target='_blank'>
                        <Text className='video-card__duration'>{videoDuration}</Text>
                        <Image className='list-video-card__image' src={snippet.thumbnails.medium.url} preview={false} />
                    </Link>
                </Flex>
                <Flex className='list-video-card__info' vertical >
                    <Link href={watch} target='_blank'>
                        <Text className='list-video-card__title'
                            ellipsis={true}
                            strong={true}>
                            {snippet.title}
                        </Text>
                    </Link>
                    <Link href={channelLink} target='_blank'>
                        <Text
                            ellipsis={true}
                            strong={true}>
                            {snippet.channelTitle}
                        </Text>
                    </Link>
                    <div className='list-video-card__description'>
                        <Link href={watch} target='_blank'>
                            <Paragraph >{statistics.viewCount} просмотров</Paragraph>
                            <Paragraph >{publishedAt}</Paragraph>
                        </Link>
                    </div>
                </Flex>
            </Flex>
        </div>
    )
}
