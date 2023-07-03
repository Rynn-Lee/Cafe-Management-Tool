*Электронная очередь*

<!--* Роли: Официант, повар, мэнеджер, администратор, владелец, кассир  -->

### Вкладки и функционал
<!--TODO Возможность сформировать заказ -->
<!-- ?
? Вкладка "Меню" |||| Доступна всем |||| Редактирование доступно - Администратор - Владелец
* Поиск по названию блюда
* Фильтрация блюд по категории
? -->

<!--TODO Панель со всеми заказами |||| Заказами принятыми конкретным официантом -->
<!-- ?
? Вкладка "Все активные заказы", "Мои активные заказы"
* Поиск по номеру столика, поиск по номеру заказа
* Фильтрация блюд по категории
? -->

<!--TODO Статистика -->
<!-- ?
? Вкладка "Статистика" |||| Доступна - Администратор - Владелец
* Подменю:
* Официанты - ФИО, сумма всех заказов за месяц, количество заказов
* Обороты - Количество заказов, сумма, фильтр(день, месяц, год, всё время)
* Блюда - Топ блюд по количеству заказов
? -->

<!--TODO Админ-Панель -->
<!-- ?
? Вкладка "Администрирование" |||| Доступна - Администратор - Владелец
* Подменю:
* Блюда - Возможность добавить блюдо, описание, цену, прочие описания || Удаление блюд
* Сотрудники - Отображение всех аккаунтов, регистрация аккаунта, удаление, статистика по аккаунту, инфо
* Блюда - Топ блюд по количеству зака
! Настройка чековых принтеров
? -->

6C 5A B0 CC D8 B1
<!--TODO Путь -->
<!-- 
* -> Официант выбирает нужные блюда, количество, столик
? -> Заказ регистрируется в базе данных в активных заказах со статусом "Заказано"||
!{
! "order": 123131,
! "cost": 12800,
! "table": 14,
! "status": "Заказано",
! "dish":[
!   {
!      "name": "Спагетти",
!      "count": 2,
!      "type": "lunch"
!   }
!   {
!      "name": "CocaCola",
!      "count": 3,
!      "type": "drink"
!   }
! ]
!}


* -> Поварам {после настройки терминалов} в нужные кухни в терминалах пачатается блюдо для готовки с номером заказа
* -> заказ приносят на 14 столик
* -> посетители доели, нужно оплатить

TODO #1 - официант принимает оплату
* -> официант выбирает номер столика и после оплаты меняет статус заказа на "Оплачено"
* -> заказ удаляется. Официанту +1 в обслуженных, + в поле "Сумма заказов"

TODO #2 - официант подтверждает заказ
* -> Статус заказа меняется на "Требует оплаты"
* -> У кассира появляется заказ в меню
? -> После оплаты и подтверждения распечатывается чек
* -> Заказ удаляется, кассиру добавляется + в обслуженных и общую сумму |||| тоже самое с официантом из №1

-->



Кнопка about на блюде при заказе чтобы показать описание или состав
Выбор категории в панели сбоку, отодвигается на ::focus css 

Статус заказа. Отправлено/готовится(при ответе принтера)/Оплачено

<!-- TODO
? Отображение самих изображений в очистке. Пометка неиспользуемых
? Смена пароля и входного логина у пользователя. Смена ФИО запрашивается у администрации
? Проверка на наличие подключенных принтеров к категории блюда
? Невозможность опубликовать без категории, только в невидимое
-->


<!-- !FIX LATER 

?CastError: Cast to string failed for value "{}" (type Object) at path "waiter.full_name" for model "orders"
?    at SchemaString.cast (G:\Coding_Stuff\Projects\cafe-management-tool\node_modules\mongoose\lib\schema\string.js:603:11)
?    at SchemaType.applySetters (G:\Coding_Stuff\Projects\cafe-management-tool\node_modules\mongoose\lib\schematype.js:1202:12)
?    at SchemaString.castForQuery (G:\Coding_Stuff\Projects\cafe-management-tool\node_modules\mongoose\lib\schema\string.js:687:15)
?    at cast (G:\Coding_Stuff\Projects\cafe-management-tool\node_modules\mongoose\lib\cast.js:290:34)
?    at Query.cast (G:\Coding_Stuff\Projects\cafe-management-tool\node_modules\mongoose\lib\query.js:4791:12)
?    at Query._castConditions (G:\Coding_Stuff\Projects\cafe-management-tool\node_modules\mongoose\lib\query.js:2177:10)
?    at model.Query._find (G:\Coding_Stuff\Projects\cafe-management-tool\node_modules\mongoose\lib\query.js:2203:8)
?    at model.Query.exec (G:\Coding_Stuff\Projects\cafe-management-tool\node_modules\mongoose\lib\query.js:4321:28)
?    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
?    at async ordersApi (webpack-internal:///(api)/./src/pages/api/orders.ts:12:28)
?    at async Object.apiResolver (G:\Coding_Stuff\Projects\cafe-management-tool\node_modules\next\dist\server\api-utils\node.js:372:9)
?    at async DevServer.runApi (G:\Coding_Stuff\Projects\cafe-management-tool\node_modules\next\dist\server\next-server.js:514:9)
?    at async Object.fn (G:\Coding_Stuff\Projects\cafe-management-tool\node_modules\next\dist\server\next-server.js:828:35)
?    at async Router.execute (G:\Coding_Stuff\Projects\cafe-management-tool\node_modules\next\dist\server\router.js:243:32)
?    at async DevServer.runImpl (G:\Coding_Stuff\Projects\cafe-management-tool\node_modules\next\dist\server\base-server.js:432:29)
?    at async DevServer.run (G:\Coding_Stuff\Projects\cafe-management-tool\node_modules\next\dist\server\dev\next-dev-server.js:831:20)
?    at async DevServer.handleRequestImpl (G:\Coding_Stuff\Projects\cafe-management-tool\node_modules\next\dist\server\base-server.js:375:20)
?    at async G:\Coding_Stuff\Projects\cafe-management-tool\node_modules\next\dist\server\base-server.js:157:99 {
?  stringValue: '"{}"',
?  messageFormat: undefined,
?  kind: 'string',
?  value: {},
?  path: 'waiter.full_name',
?  reason: null,
?  valueType: 'Object',
?  model: Model { orders }
?}
-->