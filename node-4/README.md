# Description

Написать `NodeJS Rest API` приложение для сохранения `RSS` рассылок.
В приложении должно быть следующие точки доступа
- Создание рассылки по `URL`. При успешном добавлении приложение будет запрашивать `RSS` рассылку, парсить `XML` и сохранять документы в базу данных.
- Показ списка всех добавленных `URL` рассылок.
- Показ всех сохраненных из `RSS` документов.

Приложение должно содержать тесты для всех точек доступа.

# How to

GET запросы:
    `/ShowRssURLs` - отображает все добавленные рассылки
    `/ShowRSSDocuments` - Отображает все сохранённые документы

POST запросы:
    `/AddRSS` - должен содержать параметр `uri` - URL рассылки
                добавляет RSS - канал 


Чтобы запустить приложение:

```
npm start
```