export const BASE_URL = 'http://localhost:3001/api';

export const authApi = {
    async login(email: string, password: string) {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        const res = await fetch(`${BASE_URL}/auth/token-generate`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Login failed');
        }

        return res.json();
    },

    async refresh(refresh_token: string) {
        const formData = new FormData();
        formData.append('refresh_token', refresh_token);

        const res = await fetch(`${BASE_URL}/auth/token-refresh`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            throw new Error('Refresh token failed');
        }

        return res.json();
    },
};
