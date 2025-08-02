import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchPostsRequest,
    fetchPostsSuccess,
    fetchPostsFailure,
} from './postSlice';
import { postsApi } from '../../api/postsApi';

function* fetchPostsWorker(action: ReturnType<typeof fetchPostsRequest>) {
    try {
        const { data, headers } = yield call(postsApi.getPosts, action.payload);
        const totalPagesHeader = headers.get('x-pagination-page-count');
        const totalPages = totalPagesHeader
            ? parseInt(totalPagesHeader, 10)
            : 1;

        yield put(fetchPostsSuccess({ posts: data, totalPages }));
    } catch (err) {
        yield put(fetchPostsFailure());
    }
}

export function* postsSaga() {
    yield takeLatest(fetchPostsRequest.type, fetchPostsWorker);
}
