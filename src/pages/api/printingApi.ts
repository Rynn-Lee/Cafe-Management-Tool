import type { NextApiRequest, NextApiResponse } from 'next'
import { CharacterSet } from 'node-thermal-printer';
type Data = { name: String }

export default async function printingApi(req: NextApiRequest, res: NextApiResponse<Data>){
  const ThermalPrinter = require("node-thermal-printer").printer;
  const PrinterTypes = require("node-thermal-printer").types;
  const {info} = req.body

  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,                    // Printer interface
    characterSet: CharacterSet.PC850_MULTILINGUAL,                      // Printer character set - default: SLOVENIA
    removeSpecialCharacters: false,                           // Removes special characters - default: false
    lineCharacter: "-",                
    interface: 'tcp://192.168.2.107',
    options:{                                                 // Additional options
      timeout: 5000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
    }
  });

  printer.alignCenter();
  printer.println("Заказ №1"); //Aligning text to center and printing a line

  printer.drawLine(); 
  printer.leftRight("Рыба по деревенский", "5000 тг."); // Drawing a line, printing title and const (left, right). Break line
  printer.newLine();

  printer.partialCut(); // Cutting paper leaving a little bridge

  try {
    let execute = printer.execute()
    console.error("Print done!");
  } catch (error) {
    console.log("Print failed:", error);
  }
}