import { FormInstance, Flex, Form, Input, Select, Slider, Typography } from 'antd'
import { FC } from 'react'

type PropsType = {
    title: string,
    form: FormInstance,
    readOnly?: boolean
}

export const ModalForm: FC<PropsType> =({ form, title, readOnly }) => {

    const selectOptions = [
        { value: 'relevance', label: 'по умолчанию' },
        { value: 'date', label: 'по дате' },
        { value: 'rating', label: 'по рейтингу' },
        { value: 'title', label: 'по названию' },
        { value: 'viewCount', label: 'по просмотрам' }
    ]

    return (
        <>
            <Typography.Title level={3}>{title}</Typography.Title>
            <Form layout='vertical' form={form}>
                <Form.Item hidden={true} name="id"><Input /></Form.Item>
                <Form.Item label="Запрос" name="query" >
                    <Input readOnly={readOnly} />
                </Form.Item>
                <Form.Item label="Название" required={true} name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="Сортировать по" name="order" >
                    <Select options={selectOptions} />
                </Form.Item>
                <Flex justify='space-between' align='center'>
                    <Form.Item label="Максимальное количество" name="maxResults"
                        style={{ width: '75%' }}>
                        <Slider min={1} max={50} />
                    </Form.Item>
                    <Form.Item style={{ width: '15%', }} name="maxResults">
                        <Input />
                    </Form.Item>
                </Flex>
            </Form >
        </>
    )
}