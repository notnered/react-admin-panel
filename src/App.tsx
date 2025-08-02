import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Posts from './pages/Posts';
import { useSelector } from 'react-redux';
import { type RootState } from './store/store';
import type { JSX } from 'react';

function PrivateRoute({ children }: { children: JSX.Element }) {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    // console.log(isAuth);
    return isAuth ? children : <Navigate to='/login' />;
}

export default function App() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route
                path='/posts'
                element={
                    <PrivateRoute>
                        <Posts />
                    </PrivateRoute>
                }
            />
            <Route path='*' element={<Navigate to='/posts' />} />
        </Routes>
    );
}
