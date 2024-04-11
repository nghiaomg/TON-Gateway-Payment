const { getHttpEndpoint } = require("@orbs-network/ton-access");
const { mnemonicToWalletKey } = require("@ton/crypto");
const { TonClient, WalletContractV4, internal } = require("@ton/ton");

async function main() {
    // try {
        const mnemonic = "uabuse absorb abandon abuse abstract abandon abuse absurd absorb above able abstract absorb about absorb absorb above absent about about able abandon able absorbnfold sugar water";
        const key = await mnemonicToWalletKey(mnemonic.split(" "));
        const wallet = await WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

        const endpoint = await getHttpEndpoint({ network: "testnet" });
        const client = new TonClient({ endpoint });

        const walletContract = client.open(wallet);
        const seqno = await walletContract.getSeqno();
        await walletContract.sendTransfer({
            secretKey: key.secretKey,
            seqno: seqno,
            messages: [
                internal({
                    to: "EQAdIm5AFTDhJPnruxZpcze3fSLsOn2FSCI6WjvEH4EXOale",
                    value: "55000000", // 0.05 TON in nanotons
                    body: "Hello", // optional comment
                    bounce: false,
                })
            ]
        });

        // wait until confirmed
        console.log("waiting for transaction to confirm...");
        while (true) {
            const currentSeqno = await walletContract.getSeqno();
            if (currentSeqno > seqno) {
                console.log("Transaction confirmed!");
                break;
            }
            await sleep(1500);
        }
    // } catch (error) {
    //     console.error("Error:", error.message);
    // }
}

main();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}