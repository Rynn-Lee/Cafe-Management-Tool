import { getDateNow } from '@/utils/getDate';
import type { NextApiRequest, NextApiResponse } from 'next'
import { CharacterSet } from 'node-thermal-printer';
type Data = { name: String }

export default async function printingApi(req: NextApiRequest, res: NextApiResponse<Data>){
  if(req.method == "POST"){
    const ThermalPrinter = require("node-thermal-printer").printer;
    const PrinterTypes = require("node-thermal-printer").types;
    const {data} = req.body

    for(const key in data){
      console.log(data[key].info?.ip)
      let current = data[key]

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
      console.log("Printer connection: ",isConnected)
      if(!isConnected){return}

      try{
        printer.alignLeft()
        printer.println(`Дата заказа: ${getDateNow(true)}`)
        printer.leftRight(`Принтер: ${current.info.name}`, `Стол: ${current.table}`)
        printer.drawLine()
        for(const dishes in current.order){
          let dish = current.order[dishes]
          // printer.println(`${dish.amount * dish.weight.amount}${dish.weight.value} ${dish.weight.value == "шт." ? "" : ` (${dish.amount}шт)`} | ${dish.name}`)

          printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
            { text:`${dish.amount * dish.weight.amount}${dish.weight.value} ${dish.weight.value == "шт." ? "" : ` (${dish.amount}шт)`}`, align:"LEFT" , cols:15},
            { text:`| ${dish.name}`, align:"LEFT", cols:32}
          ]);

        }
        printer.drawLine()
        printer.partialCut()

        let execute = printer.execute()
        console.log("EXEC:",await execute)
        res.json({status: "Printed!"} as any)
      } catch (error) {
        console.log("THERE'S AN ERROR!", error)
        res.json({status: error} as any)
      }
    }


    // if(data.test){
    //   printer.drawLine();
    //   printer.println("Тестовый чек");
    //   printer.println("Если чек распечатан");
    //   printer.println("И принтер отрезал его");
    //   printer.println("Нажмите продолжить");
    //   printer.println("Для продолжения настройки");
    //   printer.drawLine();
    //   printer.partialCut();
    //   let execute = printer.execute()
    //   return
    // }
    // else{
    //   for()
    //   
    }
    
    // printer.alignCenter();
    // printer.println("Заказ №1"); //Aligning text to center and printing a line

    // printer.drawLine(); 
    // printer.leftRight("Рыба по деревенский", "5000 тг."); // Drawing a line, printing title and const (left, right). Break line
    // printer.newLine();
    
    // printer.partialCut(); // Cutting paper leaving a little bridge
    
    // try {
    //   let execute = printer.execute()
    //   console.error("Print done!");
    // } catch (error) {
    //   console.log("Print failed:", error);
    // }
  // }

  if(req.method == "GET"){
    const ip = req.query.ip;
    var ping = require('ping');
    console.log(ip)

    let result = await ping.promise.probe(ip, {
      timeout: 1,
    });

    console.log(result.alive)
    
    result.alive
    ? res.json({message: "Обнаружено устройство!", alive: true} as any)
    : res.json({message: "Нет устройств с таким адресом", alive: false} as any)
  }
}