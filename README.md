# React Admin Panel — Тестовое задание machineheads

Админ-панель для управления постами через API `machineheads`.  
Реализованы авторизация по JWT, автоматическое обновление токена, CRUD для постов, а также управление авторами.  
Проект сделан в рамках тестового задания.

## 🚀 Функционал

- **Авторизация** через email и пароль
  - Используется `FormData` для отправки запроса
  - Хранение токенов в `Cookies`
  - Автоматическое обновление `access_token` через `refresh_token`
- **Выход из системы** с очисткой токенов
- **Управление постами**
  - Список постов с пагинацией
  - Добавление нового поста (заголовок, текст, автор, теги, изображение)
  - Редактирование поста
  - Удаление поста
- **Управление авторами**
  - Загрузка списка авторов из API
- **UI**
  - Используется [Ant Design](https://ant.design/) для готовых компонентов
  - Иконки из `@ant-design/icons`
  - Плавающие кнопки для быстрого доступа к действиям
- **Proxy-сервер**
  - Реализован на `Express` для обхода CORS и работы с локальной разработки
  - Запускается одновременно с Vite

## 🛠 Стек технологий

- **Frontend**
  - [React 19](https://react.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Redux Toolkit](https://redux-toolkit.js.org/)
  - [Redux-Saga](https://redux-saga.js.org/)
  - [Ant Design](https://ant.design/)
  - [js-cookie](https://github.com/js-cookie/js-cookie)

- **Dev Tools**
  - [Vite](https://vitejs.dev/)
  - [Express](https://expressjs.com/) — прокси
  - [concurrently](https://www.npmjs.com/package/concurrently) — запуск Vite + Proxy одновременно
  - ESLint, Prettier — линтинг и форматирование

## 📂 Структура проекта

- /src
- /api - Работа с API (authApi, postsApi, authorsApi, fetchWithAuth)
- /store - Redux store, слайсы, саги
- /pages - Страницы приложения (Login, Posts, AddPost, EditPost)
- /components - Переиспользуемые компоненты
- proxy.ts - Express-прокси для API

## ⚙️ Запуск проекта

1. **Клонировать репозиторий**
```bash
git clone https://github.com/notnered/react-admin-panel.git
cd react-admin-panel
```

2. **Установить зависимости**
```bash
npm install
```

3. **Запустить проект в dev-режиме**
```bash
npm run dev
```

Этот скрипт одновременно запустит Vite (localhost:5173) и Proxy (localhost:3001).