import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Post {
    id: number;
    title: string;
}

interface PostsState {
    items: Post[];
    totalPages: number;
    loading: boolean;
}

const initialState: PostsState = {
    items: [],
    totalPages: 1,
    loading: false,
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetchPostsRequest: (state, _action: PayloadAction<number>) => {
            state.loading = true;
        },
        fetchPostsSuccess: (
            state,
            action: PayloadAction<{ posts: Post[]; totalPages: number }>
        ) => {
            state.items = action.payload.posts;
            state.totalPages = action.payload.totalPages;
            state.loading = false;
        },
        fetchPostsFailure: (state) => {
            state.loading = false;
        },
    },
});

export const { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure } =
    postsSlice.actions;
export default postsSlice.reducer;
