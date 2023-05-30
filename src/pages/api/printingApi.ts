import type { NextApiRequest, NextApiResponse } from 'next'
import { CharacterSet } from 'node-thermal-printer';
type Data = { name: String }

export default async function printingApi(req: NextApiRequest, res: NextApiResponse<Data>){
  const {text} = req.body
  const ThermalPrinter = require("node-thermal-printer").printer;
  const PrinterTypes = require("node-thermal-printer").types;

  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,                    // Printer interface
    characterSet: CharacterSet.PC850_MULTILINGUAL,                      // Printer character set - default: SLOVENIA
    removeSpecialCharacters: false,                           // Removes special characters - default: false
    lineCharacter: "=",                
    interface: 'tcp://192.168.2.107',
    options:{                                                 // Additional options
      timeout: 5000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
    }
  });
  let isConnected = await printer.isPrinterConnected();
  console.log(await isConnected)
  printer.alignCenter();
  printer.println(text);
  printer.println(`IP: ${printer.interface}`);
  printer.cut();

  try {
    let execute = printer.execute()
    console.error("Print done!");
  } catch (error) {
    console.log("Print failed:", error);
  }
}