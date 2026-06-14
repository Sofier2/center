# Центр цифрових технологій

Статичний лендинг для освітнього центру з напрямками навчання, описом формату та формою запису на пробне заняття.

## Структура

- `index.html` - основна сторінка.
- `styles.css` - стилі, адаптивність і візуальне оформлення.
- `script.js` - мобільне меню, кастомний select і відправка форми.
- `assets/` - зображення та іконки сайту.

## Запуск

Відкрийте `index.html` у браузері. Додатковий build-крок не потрібен.

Для локального сервера можна використати:

```bash
python -m http.server 8000
```

Після цього сторінка буде доступна за адресою `http://localhost:8000`.

## Форма

Форма запису надсилає заявки через Formspree. Адреса endpoint вказана в атрибуті `action` у файлі `index.html`.

## Деплой на Vercel через GitHub Actions

У репозиторії вже є workflow `.github/workflows/vercel-deploy.yml`. Він перевіряє основні файли на pull request і автоматично деплоїть сайт у Vercel після push у гілку `main`.

Для роботи деплою додайте в GitHub repository secrets:

- `VERCEL_TOKEN` - токен з Vercel Account Settings.
- `VERCEL_ORG_ID` - ID акаунта або команди Vercel.
- `VERCEL_PROJECT_ID` - ID проєкту Vercel.

Значення `VERCEL_ORG_ID` і `VERCEL_PROJECT_ID` можна отримати після локального зв'язування проєкту командою:

```bash
vercel link
```

Після цього Vercel створить `.vercel/project.json`, де будуть потрібні ID. Саму папку `.vercel/` не потрібно комітити.
