import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuth: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuth: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (
            state,
            _action: PayloadAction<{ email: string; password: string }>
        ) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state) => {
            state.loading = false;
            state.isAuth = true;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuth = false;
        },
    },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
    authSlice.actions;
export default authSlice.reducer;
