import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import axios from "axios";

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

client.on('message', async (message) => {
  if (message.body === "!ping") {
    await message.reply("Who ping me! 👀");
  }
})

client.on('message', async (message: any) => {
  const url = '';
  const str = message.body;
  const mess = str.split(' ');
  if (mess[0] === '@2348057148693') {
    let prompt: string = '';
    for (let i = 1; i < mess.length; i++) {
      prompt += mess[i] + " ";
    }
    const sender = message.author.slice(0, 13)
    const req: any = {
      prompt,
      sender
    }
    const config: any = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post(url, req, config);
      const msg = res.data;

      if (msg.response) {
        await message.reply(msg.message)
      }

      if (msg.error) {
        await message.reply(msg.error)
      }
    } catch (err) {
      await message.reply('Error, please try again! 🙂')
    }
  }
})