import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

let number = 0;

console.log("passed me!\n")

const client: Client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "session",
  }),
});

client.initialize();

client.on('qr', (qr: any) => {
  number += 1;
  console.log(`Generating Qr Code ..${number}`);
  qrcode.generate(qr, { small: true })
});

client.on('ready', () => {
  console.log("\nFred is ready!")
})

client.on('message', (message: any) => {
  console.log({ message })
  const str = message.body;
  const mess = str.split('/');
  if (mess[0] === '@fred') {
    
  }
})