import { all } from 'redux-saga/effects';
import { authSaga } from './slices/authSaga';
import { postsSaga } from './slices/postSaga';

export default function* rootSaga() {
    yield all([authSaga(), postsSaga()]);
}
