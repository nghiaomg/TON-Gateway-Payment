const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql2');

const { stringToBuffer, stringToCell } = require('./hashing')

const app = express();
const cors = require("cors");
const PORT = 3000;

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'my_db'
});

const bip39 = require('bip39'); // Import thư viện bip39

const { mnemonicToWalletKey } = require('@ton/crypto')
const { WalletContractV4, TonClient, fromNano, address } = require('@ton/ton')
const { getHttpEndpoint } = require("@orbs-network/ton-access");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
      origin: '*',
      credentials: true,
      // methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
      allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    })
  );

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/create-wallet', async (req, res) => {
    const mnemonic = bip39.generateMnemonic(); // Tạo một mnemonic ngẫu nhiên
    console.log("Mnemonic:", mnemonic);
  
    // Tạo cặp khóa từ mnemonic
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
  
    // Chuyển Buffer thành string
    const publicKeyBase64 = Buffer.from(key.publicKey).toString('base64');
    const secretKeyBase64 = Buffer.from(key.secretKey).toString('base64');
  
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    console.log(wallet)
    var walletRead = {};

    walletRead.publicKey = publicKeyBase64;
    walletRead.secretKey = secretKeyBase64;
    walletRead.workchain = wallet.workchain;
    walletRead.walletId = wallet.walletId;
    // walletRead.address = wallet.address;
    walletRead.init = {};
    walletRead.init.code = JSON.stringify(wallet.init.code);
    walletRead.init.data = JSON.stringify(wallet.init.data);

    return res.send({
        result: true,
        data: walletRead,
        wallet: wallet.address.toString({ testOnly: true })
    })
})

app.get('/get-wallet/:wallet', async (req, res) => {

    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });
  
    const balance = await client.getBalance(req.params.wallet);

    res.send({
        result: true,
        balance: fromNano(balance)
    })
})

app.get('/send-coin', async (req, res) => {

  const mnemonic = "weather club neglect unit immune mystery champion start source turtle later lion";
  const key = await mnemonicToWalletKey(mnemonic.split(" "));
  const wallet = {
    workchain: 0,
    walletId: 698983191,
    publicKey: stringToBuffer('OhfEW46eSxFgZmIwnP2yl1VuIFLFJ+77zFYVzB+B0y4='),
    init: {
        code: stringToCell('')
    },
  }

  const endpoint = await getHttpEndpoint({ network: "testnet" });
  const client = new TonClient({ endpoint });

  if (!await client.isContractDeployed(wallet.address)) {
    return console.log("wallet is not deployed");
  }

  const walletContract = client.open(wallet);
  const seqno = await walletContract.getSeqno();
  await walletContract.sendTransfer({
    secretKey: key.secretKey,
    seqno: seqno,
    messages: [
      internal({
        to: "EQA4V9tF4lY2S_J-sEQR7aUj9IwW-Ou2vJQlCn--2DLOLR5e",
        value: "0.05", // 0.05 TON
        body: "Hello", // optional comment
        bounce: false,
      })
    ]
  });

  // wait until confirmed
  let currentSeqno = seqno;
  while (currentSeqno == seqno) {
    console.log("waiting for transaction to confirm...");
    await sleep(1500);
    currentSeqno = await walletContract.getSeqno();
  }
  console.log("transaction confirmed!");
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});