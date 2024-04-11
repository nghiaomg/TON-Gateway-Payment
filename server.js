const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql2');

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
const { WalletContractV4, TonClient, fromNano } = require('@ton/ton')
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

    var walletRead = {};

    walletRead.publicKey = publicKeyBase64;
    walletRead.secretKey = secretKeyBase64;
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

app.get('/get-wallet/:wallet', async (req, res) => {

    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });
  
    const balance = await client.getBalance(req.params.wallet);

    res.send({
        result: true,
        balance: fromNano(balance)
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});