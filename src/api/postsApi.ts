import { BASE_URL } from './authApi';
import Cookies from 'js-cookie';

export const postsApi = {
    async getPosts(page: number) {
        const token = Cookies.get('access_token');

        const res = await fetch(`${BASE_URL}/manage/posts?page=${page}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Ошибка загрузки постов');

        const data = await res.json();
        return { data, headers: res.headers };
    },
};
