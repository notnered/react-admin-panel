import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

import authReducer from './slices/authSlice';
import postsReducer from './slices/postSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
    },
    middleware: (getDefault) =>
        getDefault({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
