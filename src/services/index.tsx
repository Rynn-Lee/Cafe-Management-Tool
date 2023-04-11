import { accountService } from "./account.service"
import { dbService } from "./db.service"


export const services = {
  account: accountService,
  db: dbService
}