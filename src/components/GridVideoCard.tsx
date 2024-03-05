import { FC } from 'react'
import { Avatar, Card, Image, Typography } from 'antd'
import { duration, posted } from '../utils/moment.ts';
import { Item } from '../types/index.ts'

const { Link, Text, } = Typography;

type PropsType = {
    item: Item
}

export const GridVideoCard: FC<PropsType> = ({ item }) => {
    const { contentDetails, snippet, statistics, channel } = item;

    const watch = `${import.meta.env.VITE_YT_WATCH}${item.id}`;
    const channelLink = `${import.meta.env.VITE_YT_CHANNEL}${snippet.channelId}`;

    const videoDuration = duration(contentDetails.duration);
    const publishedAt = posted(snippet.publishedAt);

    return (
        <Card className='video-card' hoverable={true} bordered={false}
            cover={<Link href={watch} target='_blank'>
                <div className='video-card__cover'>
                    <Text className='video-card__duration'>
                        {videoDuration}</Text>
                    <Image
                        className='video-card__image'
                        src={snippet.thumbnails.medium.url}
                        preview={false} />

                </div>
                <Text className='video-card__title' strong={true}
                    ellipsis={true}>{snippet.title}</Text>
            </Link>
            }>
            <Card.Meta
                avatar={
                    <Link href={channelLink} target='_blank'>
                        <Avatar src={channel?.thumbnails.default.url} />
                    </Link>
                }
                title={
                    <Link href={channelLink} target='_blank'>
                        <Text ellipsis={true}>{snippet.channelTitle}</Text>
                    </Link>
                }
                description={
                    <Link href={watch} target='_blank'>
                        <div className='video-card__description'>
                            <Text >{statistics.viewCount} просмотров</Text>
                            <Text >{publishedAt}</Text>
                        </div>
                    </Link>
                }
            ></Card.Meta>
        </Card>
    )
}
