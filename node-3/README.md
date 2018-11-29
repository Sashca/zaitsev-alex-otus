# Description

Работа с потоками в NodeJS
Написать приложение, демонстрирующее работу с потоками в `NodeJS`: 
- Readable, генерирующий случайные числа, 
- Transformable, добавляющий случайное число к первому и 
- Writable, выводящий данные в консоль.

Данные должны “течь” readable -> transformable -> writable
Используйте highWaterMark для ограничения внутреннего буффера.

# How to


Для запуска:
```
node threads.js
```
Так же можно выполнить запуск через npm:
```
npm run stream 
```

Для остановки:
```
Ctrl+C
```
