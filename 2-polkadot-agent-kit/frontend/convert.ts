import { cryptoWaitReady, mnemonicToMiniSecret } from "@polkadot/util-crypto";
import { Keyring } from "@polkadot/keyring";
import { u8aToHex } from "@polkadot/util";

async function main() {
  await cryptoWaitReady();

  // KHÔNG hardcode mnemonic trong code thật. Dùng env thay vì commit lên git.
  const mnemonic =
    "want latin fun glue fitness body scout ramp capital tooth junior wealth";

  const seed = mnemonicToMiniSecret(mnemonic); // Uint8Array(32)

  const keyring = new Keyring({ type: "sr25519" });
  const pair = keyring.addFromSeed(seed);

  console.log("SS58 address:", pair.address);

  console.log("Seed bytes length:", seed.length); // 32
  console.log("Seed hex length (without 0x):", u8aToHex(seed)); // 64 hex chars

  console.log("PublicKey bytes length:", pair.publicKey.length); // 32
  console.log("PublicKey hex:", u8aToHex(pair.publicKey)); // 0x + 64 hex chars
}

main().catch(console.error);