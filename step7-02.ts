const bip39 = require('bip39'); // Import thư viện bip39

import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4 } from "@ton/ton";

async function main() {
  // Tạo chuỗi mnemonic mới
  const mnemonic = bip39.generateMnemonic(); // Tạo một mnemonic ngẫu nhiên
  console.log("Mnemonic:", mnemonic);

  // Tạo cặp khóa từ mnemonic
  const key = await mnemonicToWalletKey(mnemonic.split(" "));

  // Chuyển Buffer thành string
  const publicKeyBase64 = Buffer.from(key.publicKey).toString('base64');
  const secretKeyBase64 = Buffer.from(key.secretKey).toString('base64');

  console.log({
    publickey: publicKeyBase64,
    secretkey: secretKeyBase64
  });

  // Chuyển string thành Buffer
  const publicKeyBuffer = Buffer.from(key.publicKey);
  const secretKeyBuffer = Buffer.from(key.secretKey);

  // Tạo đối tượng ví
  const wallet = WalletContractV4.create({ publicKey: publicKeyBuffer, workchain: 0 });

  // In ra địa chỉ của ví
  console.log('Wallet Address:', wallet.address.toString({ testOnly: true }));
}

main();
