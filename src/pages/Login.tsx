import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../store/slices/authSlice';
import { type RootState } from '../store/store';
import { Form, Input, Button, Typography, Alert } from 'antd';

const { Title } = Typography;

export default function Login() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((s: RootState) => s.auth);

    const onFinish = (values: { email: string; password: string }) => {
        dispatch(loginRequest(values));
    };

    return (
        <div style={{ maxWidth: 400, margin: '100px auto' }}>
            <Title level={2}>Авторизация</Title>
            <Form
                name='login'
                initialValues={{
                    email: 'test@test.ru',
                    password: 'khro2ij3n2730',
                }}
                onFinish={onFinish}
                layout='vertical'
            >
                <Form.Item
                    label='Email'
                    name='email'
                    rules={[{ required: true, message: 'Введите email' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Пароль'
                    name='password'
                    rules={[{ required: true, message: 'Введите пароль' }]}
                >
                    <Input.Password />
                </Form.Item>

                {error && (
                    <Alert
                        type='error'
                        message={error}
                        style={{ marginBottom: 16 }}
                    />
                )}

                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        loading={loading}
                        block
                    >
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
