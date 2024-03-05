import { Flex, Typography } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage: FC = () => {
    return (
        <Flex align='center' vertical gap={50}>
            <Typography.Title level={2}>Страница не найдена</Typography.Title>
            <Link to="/" >
                <Typography.Text strong>
                    На главную
                </Typography.Text>
            </Link>
        </Flex>
    )
}
