import { decodeAddress, cryptoWaitReady } from "@polkadot/util-crypto";
import { u8aToHex } from "@polkadot/util";

async function main() {
    const recipientAddress = "12dng6mpwu7ejrKGpjZTNWLNZkJFowBF6dfS7vjXBE1jFtoL";

    await cryptoWaitReady();

    const encodedRecipient = u8aToHex(decodeAddress(recipientAddress));

    console.log(encodedRecipient);
}

main().catch(console.error);
