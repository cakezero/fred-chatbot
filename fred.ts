import * as dotenv from 'dotenv';
import  { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

let number = 0;

const client: Client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "session",
  }),
});

client.on('qr', (qr) => {
  number += 1;
  console.log(`Generating Qr Code...${number}`);
  qrcode.generate(qr, { small: true })
});

client.on('ready', () => {
  console.log("Fred is ready!")
})

client.on('message', (message) => {
  if (message.body === '.schedule') {
    
  }
})

const url = () => {
  
}