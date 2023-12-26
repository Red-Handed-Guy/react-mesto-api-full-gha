[![Статус тестов](../../actions/workflows/tests.yml/badge.svg)](../../actions/workflows/tests.yml)
# Проект "Место"

**Задачей** проекта была разработка frontend и backend части одностраничного приложения "Место" по обмену изображениями между пользователями. 

### Результат работы:

Клиентская часть - Адаптивное одностраничное реактивное приложение разработанное на JS, React, HTML, CSS.

Серверная часть - Api разработанное на Node.js и Express.js. В качестве хранилища данных была использована NoSQL база данных MongoDB.

Проект был проверен наставниками Я.Практикума и прошел код-ревью


## Features

- Регистрация/Авторизация
- Авторизация пользователя по cookie токену
- Хранение данных пользователей в БД, а так же их паролей в зашифрованном виде.
- Редактирование профиля, автара
- Добавление новых карточек и их удаление
- Возможность поставить/убрать лайк карточки
- Отслеживание принадлежности карточки
- Хранение всех карточек и их состояний в БД


## Tech Stack

**Client:** 
![Static Badge](https://img.shields.io/badge/HTML-gray?style=for-the-badge&logo=HTML5)
![Static Badge](https://img.shields.io/badge/CSS3-black?style=for-the-badge&logo=CSS3&logoColor=%23fff&color=%23254BDD)
![Static Badge](https://img.shields.io/badge/JavaScript-black?style=for-the-badge&logo=JavaScript&logoColor=%23EFD81D&color=%23000)
![Static Badge](https://img.shields.io/badge/React-black?style=for-the-badge&logo=React)

**Server:**
![Static Badge](https://img.shields.io/badge/Node.js-teal?style=for-the-badge&logo=Node.js&logoColor=%2302DC02&color=%23F7F7F7)
![Static Badge](https://img.shields.io/badge/Express.js-black?style=for-the-badge&logo=Express&logoColor=%23fff&color=%23EFD81D)
![Static Badge](https://img.shields.io/badge/MongoDB-teal?style=for-the-badge&logo=MongoDB&logoColor=%2300ED64&color=%23001E2B)

**Tools:**
![Static Badge](https://img.shields.io/badge/Git-black?style=for-the-badge&logo=Git&logoColor=%23fff&color=%23E84E31)


## Demo
IP 158.160.15.122

Frontend https://red.nomoredomainsrocks.ru/

Backend https://api.red.nomoredomainsrocks.ru/


## Deployment(front)

Работает с версиями `NodeJS v20.10.0` и `npm 10.2.3`

1) Скачать архив с ветки Main
2) Разархивировать в любую папку
3) С помощью терминала git перейти в эту папку, затем в папку `/frontend`

4) Установить зависимости командой
```bash
  npm ci
```
5) Собрать билд командой
```bash
  npm run build
```
6) Запустить билд командой
```bash
  npm run start
```
7) Клиент запустится на 3001 порту (поменяйте localhost на 127.0.0.1 в адресной строке) и будет посылать запросы на адрес `http://127.0.0.1:3000`


## Deployment(back)

Работает с версиями `NodeJS v20.10.0` и `npm 10.2.3`

1) Для корректной работы серера необходимо установить [MongoDB](https://mongodb.prakticum-team.ru/try/download/community-kubernetes-operator) версии 4.4.27
2) Скачать архив с ветки Main
3) Разархивировать в любую папку
4) С помощью терминала git перейти в эту папку, затем в папку `/backend`

5) Установить зависимости командой
```bash
  npm ci
```
6) Запустить командой
```bash
  npm run start
```
7) Запустить MongoDB
8) Сервер по-умолчанию будет работать на 3000 порту (поменяйте localhost на 127.0.0.1 в адресной строке) и будет принимать запросы с адреса `http://127.0.0.1:3001`


## Related

[Макет_1](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?type=design&node-id=0-1&mode=design&t=uVVoqijUMwOBA54Q-0)

[Макет_2](https://www.figma.com/file/5H3gsn5lIGPwzBPby9jAOo/JavaScript.-Sprint-12?type=design&node-id=0-1&mode=design&t=V3LVisZ3ni9FLEsV-0)
