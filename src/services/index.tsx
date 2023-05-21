import { accountService } from "./account.service"
import { menuService } from "./menu.service"
import { dbService } from "./db.service"
import { imagesService } from "./images.service"
import { categoryService } from "./category.service"
import { printersService } from "./printers.service"
import { ordersService } from "./orders.service"


export const services = {
  account: accountService,
  db: dbService,
  images: imagesService,
  menu: menuService,
  category: categoryService,
  printers: printersService,
  orders: ordersService
}