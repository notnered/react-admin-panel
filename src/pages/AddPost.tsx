import { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Upload, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { postsApi } from '../api/postsApi';
import { authorsApi, type Author } from '../api/authorApi';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

export default function AddPost() {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect(() => {
        authorsApi
            .getAuthors()
            .then((res) => setAuthors(res.data))
            .catch(() => message.error('Не удалось загрузить авторов'));
    }, []);

    const onFinish = async (values: {
        title: string;
        text: string;
        authorId: number;
    }) => {
        if (!file) {
            message.error('Пожалуйста, загрузите изображение');
            return;
        }
        try {
            await postsApi.addPost(
                values.title,
                values.text,
                values.authorId,
                file
            );
            message.success('Пост успешно добавлен');
            navigate('/posts');
        } catch (err: any) {
            message.error(err.message);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '40px auto' }}>
            <Title level={2}>Добавить пост</Title>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item
                    label='Заголовок'
                    name='title'
                    rules={[{ required: true, message: 'Введите заголовок' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Текст'
                    name='text'
                    rules={[{ required: true, message: 'Введите текст поста' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label='Автор'
                    name='authorId'
                    rules={[{ required: true, message: 'Выберите автора' }]}
                >
                    <Select placeholder='Выберите автора'>
                        {authors.map((author) => (
                            <Select.Option key={author.id} value={author.id}>
                                {author.name} {author.lastName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label='Изображение'>
                    <Upload
                        beforeUpload={(file) => {
                            setFile(file);
                            return false;
                        }}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Выбрать файл</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Добавить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
