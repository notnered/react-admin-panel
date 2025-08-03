import { useEffect, useState } from 'react';
import {
    Table,
    Pagination,
    Typography,
    FloatButton,
    Popconfirm,
    Button,
    App,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsRequest } from '../store/slices/postSlice';
import { type RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import {
    DeleteOutlined,
    EditOutlined,
    LogoutOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { postsApi } from '../api/postsApi';

const { Title } = Typography;

export default function Posts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { message } = App.useApp();

    const refreshPosts = () => {
        dispatch(fetchPostsRequest(page));
    };

    const { items, totalPages, loading } = useSelector(
        (state: RootState) => state.posts
    );

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchPostsRequest(page));
    }, [dispatch, page]);

    const columns = (refreshPosts: () => void) => [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        // {
        //     title: 'Изображение',
        //     dataIndex: ['previewPicture', 'url'],
        //     key: 'previewPicture',
        //     render: (url: string) => url ? <img src={url} style={{ maxWidth: 100 }} /> : null
        // },
        {
            title: 'Заголовок',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Автор',
            dataIndex: 'authorName',
            key: 'authorName',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_: any, record: any) => (
                <>
                    <Button
                        icon={<EditOutlined />}
                        type='link'
                        onClick={() => navigate(`/posts/edit/${record.id}`)}
                    >
                        Редактировать
                    </Button>
                    <Popconfirm
                        title='Удалить пост'
                        description='Вы уверены, что хотите удалить этот пост?'
                        onConfirm={async () => {
                            try {
                                await postsApi.deletePost(record.id);
                                message.success('Пост удалён');
                                refreshPosts();
                            } catch (err: any) {
                                message.error(err.message);
                            }
                        }}
                        okText='Да'
                        cancelText='Нет'
                    >
                        <Button icon={<DeleteOutlined />} type='link' danger>
                            Удалить
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    console.log(items);

    return (
        <div style={{ maxWidth: 800, margin: '40px auto' }}>
            <Title level={2}>Список постов</Title>
            <Table
                rowKey='id'
                dataSource={items}
                columns={columns(refreshPosts)}
                pagination={false}
                loading={loading}
            />
            <Pagination
                current={page}
                total={totalPages * 10}
                pageSize={10}
                onChange={setPage}
                style={{
                    marginTop: 16,
                    textAlign: 'right',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            />
            <FloatButton.Group shape='circle' style={{ right: 24 }}>
                <FloatButton
                    icon={<PlusOutlined />}
                    tooltip='Добавить пост'
                    onClick={() => navigate('/posts/add')}
                />
                <FloatButton
                    icon={<LogoutOutlined />}
                    tooltip='Выйти'
                    onClick={() => dispatch(logout())}
                />
            </FloatButton.Group>
        </div>
    );
}
