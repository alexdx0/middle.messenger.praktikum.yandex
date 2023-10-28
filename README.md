# FreshChat на TypeScript! 📖

- TypeScript
- Vite
- Handlebars
- SCSS
- ESLint
- Stylelint


### Ссылка на проект в netlify
https://spectacular-empanada-1ab232.netlify.app/

### Макеты
https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1&mode=dev

### Установка и запуск проекта
- установка зависимостей:
npm install

- сборка проекта:
npm run build

- запуск в dev-режиме:
npm run dev

- запуск Express на http://localhost:3000:  
npm run start

- превью проекта:
npm run preview

### Роутинг в приложении
/ — страница входа  
/sign-up — страница регистрации  
/settings — настройки профиля пользователя  
/messenger — чат  

Обмен сообщениями реализовн на WebSocket
Реализован функционал:
- добавления нового чата, удаления существующего чата
- добавление и удаление пользователей из чата
- изменение данных пользователя, включая аватар
На полях ввода работает валидация
