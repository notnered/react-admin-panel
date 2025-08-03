import { fetchWithAuth } from './fetchWithAuth';

export interface Author {
    id: number;
    name: string;
    lastName: string;
    secondName?: string;
}

export const authorsApi = {
    async getAuthors(): Promise<{ data: Author[]; headers: Headers }> {
        return fetchWithAuth('/manage/authors');
    },
};
