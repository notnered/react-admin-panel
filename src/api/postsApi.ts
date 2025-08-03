import { fetchWithAuth } from './fetchWithAuth';

export const postsApi = {
    async getPosts(page: number) {
        return fetchWithAuth(`/manage/posts?page=${page}`);
    },
    async getPostById(id: number) {
        return fetchWithAuth(`/manage/posts/detail?id=${id}`);
    },
    async addPost(
        title: string,
        text: string,
        authorId: number,
        previewPicture: File
    ) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('text', text);
        formData.append('authorId', String(authorId));
        formData.append('previewPicture', previewPicture);

        return fetchWithAuth(`/manage/posts/add`, {
            method: 'POST',
            body: formData,
        });
    },
    async editPost(
        id: number,
        data: {
            code: string;
            title: string;
            authorId: number;
            tagIds: number[];
            text: string;
            previewPicture?: File | null;
        }
    ) {
        const formData = new FormData();
        formData.append('code', data.code);
        formData.append('title', data.title);
        formData.append('authorId', String(data.authorId));
        data.tagIds.forEach((tagId) =>
            formData.append('tagIds[]', String(tagId))
        );
        formData.append('text', data.text);
        if (data.previewPicture) {
            formData.append('previewPicture', data.previewPicture);
        }

        return fetchWithAuth(`/manage/posts/edit?id=${id}`, {
            method: 'POST',
            body: formData,
        });
    },
    async deletePost(id: number) {
        return fetchWithAuth(`/manage/posts/remove?id=${id}`, {
            method: 'DELETE',
        });
    },
};
