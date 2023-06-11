import type { NextApiRequest, NextApiResponse } from 'next'
import { CharacterSet } from 'node-thermal-printer';
type Data = { name: String }

export default async function printingApi(req: NextApiRequest, res: NextApiResponse<Data>){
  if(req.method == "POST"){
    const ThermalPrinter = require("node-thermal-printer").printer;
    const PrinterTypes = require("node-thermal-printer").types;
    const {data} = req.body
    const additionalInfo = data.additionalInfo

    for(const key in data){
      if (key == "additionalInfo"){return}
      let current = data[key]
      console.log("Incoming connection: ", current.info.ip)

      let printer = new ThermalPrinter({
        type: PrinterTypes[current.info.method],                    // Printer interface
        characterSet: CharacterSet.PC850_MULTILINGUAL,                      // Printer character set - default: SLOVENIA
        removeSpecialCharacters: false,                           // Removes special characters - default: false
        lineCharacter: "-",                
        interface: `tcp://${current.info.ip}`,
        options:{                                                 // Additional options
          timeout: 3000                                          // Connection timeout (ms) [applicable only for network printers] - default: 3000
        }
      });
      let isConnected = await printer.isPrinterConnected();
      if(!isConnected){
        console.log("Printer is not responding: ", current.info.ip)
        res.json({status: "Printer is not connected!"} as any)
        return
      }

      if(data.test){
        printer.drawLine();
        printer.alignCenter()
        printer.println(`Rynn Lee's`)
        printer.println(`Controling panel`)
        printer.drawLine();
        printer.partialCut();
        let execute = printer.execute()
        return
      }

      try{
        printer.alignLeft()
        printer.println(`Номер заказа: ${additionalInfo.orderID}`)
        printer.println(`Дата заказа: ${additionalInfo.date}`)
        printer.leftRight(`Принтер: ${current.info.name}`, `Стол: ${current.table}`)
        printer.drawLine()
        for(const dishes in current.order){
          let dish = current.order[dishes]
          printer.tableCustom([
            { text:`${dish.amount * dish.weight.amount}${dish.weight.value} ${dish.weight.value == "шт." ? "" : ` (${dish.amount}шт)`}`, align:"LEFT" , cols:15},
            { text:`| ${dish.name}`, align:"LEFT", cols:32}
          ]);

        }
        printer.drawLine()
        printer.partialCut()

        let execute = printer.execute()
        console.log("EXEC:",await execute)
        res.json({status: "Printed"} as any)
      } catch (error) {
        console.log("THERE'S AN ERROR!", error)
        res.json({status: error} as any)
      }
    }
  }

  if(req.method == "GET"){
    const ip = req.query.ip;
    var ping = require('ping');
    console.log(ip)

    let result = await ping.promise.probe(ip, {
      timeout: 1,
    });    
    
    result.alive
    ? res.json({message: "Обнаружено устройство!", alive: true} as any)
    : res.json({message: "Нет устройств с таким адресом", alive: false} as any)
  }
}