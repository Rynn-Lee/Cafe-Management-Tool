import type { NextApiRequest, NextApiResponse } from 'next'
import { CharacterSet } from 'node-thermal-printer';
type Data = { name: String }

export default async function printingApi(req: NextApiRequest, res: NextApiResponse<Data>){
  if(req.method == "POST"){
    const ThermalPrinter = require("node-thermal-printer").printer;
    const PrinterTypes = require("node-thermal-printer").types;
    const {info} = req.body
    let printer = new ThermalPrinter({
      type: PrinterTypes[info.method],                    // Printer interface
      characterSet: CharacterSet.PC850_MULTILINGUAL,                      // Printer character set - default: SLOVENIA
      removeSpecialCharacters: false,                           // Removes special characters - default: false
      lineCharacter: "-",                
      interface: `tcp://${info.ip}`,
      options:{                                                 // Additional options
        timeout: 5000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
      }
    });

    if(info.test){
      printer.drawLine();
      printer.println("Тестовый чек");
      printer.println("Если чек распечатан");
      printer.println("И принтер отрезал его");
      printer.println("Нажмите продолжить");
      printer.println("Для продолжения настройки");
      printer.drawLine();
      printer.partialCut();
      let execute = printer.execute()
      return
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
  }

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