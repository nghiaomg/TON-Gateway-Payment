import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4 } from "@ton/ton";

async function main() {
  //tạo ví
  // open wallet v4 (notice the correct wallet version here)
  const mnemonic = "unfold sugar water ..."; // your 24 secret words (replace ... with the rest of the words)
  const key = await mnemonicToWalletKey(mnemonic.split(" "));


  // chuyển Buffer thành string
  // print wallet workchain
  // console.log("workchain:", wallet.address.workChain);
  const publicKeyBase64 = Buffer.from(key.publicKey).toString('base64');
  const secretKeyBase64 = Buffer.from(key.secretKey).toString('base64');

  console.log({
    publickey: publicKeyBase64,
    secretkey: secretKeyBase64
  });

  // chuyển string thành Buffer
  const publicKeyBuffer = Buffer.from(key.publicKey);
  const secretKeyBuffer = Buffer.from(key.secretKey);
  console.log(publicKeyBuffer,secretKeyBuffer)


  const wallet = WalletContractV4.create({ publicKey: publicKeyBuffer, workchain: 0 });
  // print wallet address
  console.log('wallet', wallet.address.toString({ testOnly: true }));

}

main();