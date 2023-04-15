import { accountService } from "./account.service"
import { menuService } from "./menu.service"
import { dbService } from "./db.service"


export const services = {
  account: accountService,
  db: dbService,
  menu: menuService
}