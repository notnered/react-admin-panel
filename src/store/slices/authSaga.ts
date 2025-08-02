import { call, put, takeLatest } from 'redux-saga/effects';
import { loginFailure, loginRequest, loginSuccess } from './authSlice';
import { authApi } from '../../api/authApi';
import Cookies from 'js-cookie';

function* loginWorker(action: ReturnType<typeof loginRequest>) {
    try {
        const data: { access_token: string; refresh_token: string } =
            yield call(
                authApi.login,
                action.payload.email,
                action.payload.password
            );

        Cookies.set('access_token', data.access_token);
        Cookies.set('refresh_token', data.refresh_token);

        yield put(loginSuccess());
    } catch (error: any) {
        yield put(loginFailure(error.message));
    }
}

export function* authSaga() {
    yield takeLatest(loginRequest.type, loginWorker);
}
