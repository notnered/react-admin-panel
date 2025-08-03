import { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, Upload, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { postsApi } from '../api/postsApi';
import { authorsApi, type Author } from '../api/authorApi';
import { useNavigate, useParams } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

export default function EditPost() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [file, setFile] = useState<File | null>(null);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        authorsApi
            .getAuthors()
            .then((res) => setAuthors(res.data))
            .catch(() => message.error('Не удалось загрузить авторов'));

        postsApi
            .getPostById(Number(id))
            .then((res) => {
                const post = res.data;
                form.setFieldsValue({
                    code: post.code,
                    title: post.title,
                    authorId: post.authorId,
                    tagIds: post.tags?.map((tag: any) => tag.id) || [],
                    text: post.text,
                });
            })
            .catch(() => message.error('Не удалось загрузить пост'));
    }, [id, form]);

    const onFinish = async (values: any) => {
        try {
            await postsApi.editPost(Number(id), {
                code: values.code,
                title: values.title,
                authorId: values.authorId,
                tagIds: values.tagIds || [],
                text: values.text,
                previewPicture: file,
            });
            message.success('Пост успешно обновлён');
            navigate('/posts');
        } catch (err: any) {
            message.error(err.message);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '40px auto' }}>
            <Title level={2}>Редактировать пост</Title>
            <Form layout='vertical' form={form} onFinish={onFinish}>
                <Form.Item
                    label='Slug'
                    name='code'
                    rules={[{ required: true, message: 'Введите код' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Заголовок'
                    name='title'
                    rules={[{ required: true, message: 'Введите заголовок' }]}
                >
                    <Input />
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

                <Form.Item label='Теги' name='tagIds'>
                    <Select
                        mode='multiple'
                        placeholder='Выберите теги'
                    ></Select>
                </Form.Item>

                <Form.Item
                    label='Текст'
                    name='text'
                    rules={[{ required: true, message: 'Введите текст' }]}
                >
                    <TextArea rows={4} />
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
                        Сохранить изменения
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
