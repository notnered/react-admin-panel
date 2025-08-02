import { useEffect, useState } from 'react';
import { Table, Pagination, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsRequest } from '../store/slices/postSlice';
import { type RootState } from '../store/store';

const { Title } = Typography;

export default function Posts() {
    const dispatch = useDispatch();
    const { items, totalPages, loading } = useSelector(
        (s: RootState) => s.posts
    );
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchPostsRequest(page));
    }, [dispatch, page]);

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Заголовок', dataIndex: 'title', key: 'title' },
    ];

    return (
        <div style={{ maxWidth: 800, margin: '40px auto' }}>
            <Title level={2}>Список постов</Title>
            <Table
                rowKey='id'
                dataSource={items}
                columns={columns}
                pagination={false}
                loading={loading}
            />
            <Pagination
                current={page}
                total={totalPages * 10}
                pageSize={10}
                onChange={setPage}
                style={{ marginTop: 16, textAlign: 'right' }}
            />
        </div>
    );
}
