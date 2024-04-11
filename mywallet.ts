import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4 } from "@ton/ton";

async function main() {
  // const mnemonic = "unfold sugar water ..."; // your 24 secret words (replace ... with the rest of the words)
  const key = {
    publickey: '5MNCnXcTLmBDiArvQTijKUbjKri+sYgZQn8fP5GWxeU=',
    secretkey: 'N1sX+KAn0WipoCZsMO7z9m5hbiStCda44ebVs/sddvHkw0KddxMuYEOICu9BOKMpRuMquL6xiBlCfx8/kZbF5Q=='
  }

  // const publicKeyBase64 = Buffer.from(key.publickey).toString('base64');
  // const secretKeyBase64 = Buffer.from(key.secretkey).toString('base64');

  // console.log({
  //   publickey: publicKeyBase64,
  //   secretkey: secretKeyBase64
  // });

  const publicKeyBuffer = Buffer.from(key.publickey);
  const secretKeyBuffer = Buffer.from(key.secretkey);


  const wallet = WalletContractV4.getBalance({ publicKey: publicKeyBuffer, workchain: 0 });

  // print wallet address
  console.log('wallet', wallet.address.toString({ testOnly: true }));

  console.log(publicKeyBuffer,secretKeyBuffer)
}

main();