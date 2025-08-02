import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://rest-test.machineheads.ru',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        followRedirects: true,
    })
);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
});
