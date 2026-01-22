(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/mnemonic.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Mnemonic",
    ()=>Mnemonic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$pbkdf2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/pbkdf2.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/sha2.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/properties.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/utf8.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wordlists$2f$lang$2d$en$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wordlists/lang-en.js [app-client] (ecmascript)");
;
;
;
// Returns a byte with the MSB bits set
function getUpperMask(bits) {
    return (1 << bits) - 1 << 8 - bits & 0xff;
}
// Returns a byte with the LSB bits set
function getLowerMask(bits) {
    return (1 << bits) - 1 & 0xff;
}
function mnemonicToEntropy(mnemonic, wordlist) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertNormalize"])("NFKD");
    if (wordlist == null) {
        wordlist = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wordlists$2f$lang$2d$en$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LangEn"].wordlist();
    }
    const words = wordlist.split(mnemonic);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(words.length % 3 === 0 && words.length >= 12 && words.length <= 24, "invalid mnemonic length", "mnemonic", "[ REDACTED ]");
    const entropy = new Uint8Array(Math.ceil(11 * words.length / 8));
    let offset = 0;
    for(let i = 0; i < words.length; i++){
        let index = wordlist.getWordIndex(words[i].normalize("NFKD"));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(index >= 0, `invalid mnemonic word at index ${i}`, "mnemonic", "[ REDACTED ]");
        for(let bit = 0; bit < 11; bit++){
            if (index & 1 << 10 - bit) {
                entropy[offset >> 3] |= 1 << 7 - offset % 8;
            }
            offset++;
        }
    }
    const entropyBits = 32 * words.length / 3;
    const checksumBits = words.length / 3;
    const checksumMask = getUpperMask(checksumBits);
    const checksum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sha256"])(entropy.slice(0, entropyBits / 8)))[0] & checksumMask;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(checksum === (entropy[entropy.length - 1] & checksumMask), "invalid mnemonic checksum", "mnemonic", "[ REDACTED ]");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])(entropy.slice(0, entropyBits / 8));
}
function entropyToMnemonic(entropy, wordlist) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(entropy.length % 4 === 0 && entropy.length >= 16 && entropy.length <= 32, "invalid entropy size", "entropy", "[ REDACTED ]");
    if (wordlist == null) {
        wordlist = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wordlists$2f$lang$2d$en$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LangEn"].wordlist();
    }
    const indices = [
        0
    ];
    let remainingBits = 11;
    for(let i = 0; i < entropy.length; i++){
        // Consume the whole byte (with still more to go)
        if (remainingBits > 8) {
            indices[indices.length - 1] <<= 8;
            indices[indices.length - 1] |= entropy[i];
            remainingBits -= 8;
        // This byte will complete an 11-bit index
        } else {
            indices[indices.length - 1] <<= remainingBits;
            indices[indices.length - 1] |= entropy[i] >> 8 - remainingBits;
            // Start the next word
            indices.push(entropy[i] & getLowerMask(8 - remainingBits));
            remainingBits += 3;
        }
    }
    // Compute the checksum bits
    const checksumBits = entropy.length / 4;
    const checksum = parseInt((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sha256"])(entropy).substring(2, 4), 16) & getUpperMask(checksumBits);
    // Shift the checksum into the word indices
    indices[indices.length - 1] <<= checksumBits;
    indices[indices.length - 1] |= checksum >> 8 - checksumBits;
    return wordlist.join(indices.map((index)=>wordlist.getWord(index)));
}
const _guard = {};
class Mnemonic {
    /**
     *  The mnemonic phrase of 12, 15, 18, 21 or 24 words.
     *
     *  Use the [[wordlist]] ``split`` method to get the individual words.
     */ phrase;
    /**
     *  The password used for this mnemonic. If no password is used this
     *  is the empty string (i.e. ``""``) as per the specification.
     */ password;
    /**
     *  The wordlist for this mnemonic.
     */ wordlist;
    /**
     *  The underlying entropy which the mnemonic encodes.
     */ entropy;
    /**
     *  @private
     */ constructor(guard, entropy, phrase, password, wordlist){
        if (password == null) {
            password = "";
        }
        if (wordlist == null) {
            wordlist = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wordlists$2f$lang$2d$en$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LangEn"].wordlist();
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertPrivate"])(guard, _guard, "Mnemonic");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            phrase,
            password,
            wordlist,
            entropy
        });
    }
    /**
     *  Returns the seed for the mnemonic.
     */ computeSeed() {
        const salt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toUtf8Bytes"])("mnemonic" + this.password, "NFKD");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$pbkdf2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pbkdf2"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toUtf8Bytes"])(this.phrase, "NFKD"), salt, 2048, 64, "sha512");
    }
    /**
     *  Creates a new Mnemonic for the %%phrase%%.
     *
     *  The default %%password%% is the empty string and the default
     *  wordlist is the [English wordlists](LangEn).
     */ static fromPhrase(phrase, password, wordlist) {
        // Normalize the case and space; throws if invalid
        const entropy = mnemonicToEntropy(phrase, wordlist);
        phrase = entropyToMnemonic((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(entropy), wordlist);
        return new Mnemonic(_guard, entropy, phrase, password, wordlist);
    }
    /**
     *  Create a new **Mnemonic** from the %%entropy%%.
     *
     *  The default %%password%% is the empty string and the default
     *  wordlist is the [English wordlists](LangEn).
     */ static fromEntropy(_entropy, password, wordlist) {
        const entropy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(_entropy, "entropy");
        const phrase = entropyToMnemonic(entropy, wordlist);
        return new Mnemonic(_guard, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])(entropy), phrase, password, wordlist);
    }
    /**
     *  Returns the phrase for %%mnemonic%%.
     */ static entropyToPhrase(_entropy, wordlist) {
        const entropy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(_entropy, "entropy");
        return entropyToMnemonic(entropy, wordlist);
    }
    /**
     *  Returns the entropy for %%phrase%%.
     */ static phraseToEntropy(phrase, wordlist) {
        return mnemonicToEntropy(phrase, wordlist);
    }
    /**
     *  Returns true if %%phrase%% is a valid [[link-bip-39]] phrase.
     *
     *  This checks all the provided words belong to the %%wordlist%%,
     *  that the length is valid and the checksum is correct.
     */ static isValidMnemonic(phrase, wordlist) {
        try {
            mnemonicToEntropy(phrase, wordlist);
            return true;
        } catch (error) {}
        return false;
    }
} //# sourceMappingURL=mnemonic.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/base-wallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseWallet",
    ()=>BaseWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/checks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$authorization$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/hash/authorization.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$message$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/hash/message.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/hash/typed-data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$abstract$2d$signer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/abstract-signer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/properties.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/maths.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-client] (ecmascript)");
;
;
;
;
;
class BaseWallet extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$abstract$2d$signer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AbstractSigner"] {
    /**
     *  The wallet address.
     */ address;
    #signingKey;
    /**
     *  Creates a new BaseWallet for %%privateKey%%, optionally
     *  connected to %%provider%%.
     *
     *  If %%provider%% is not specified, only offline methods can
     *  be used.
     */ constructor(privateKey, provider){
        super(provider);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(privateKey && typeof privateKey.sign === "function", "invalid private key", "privateKey", "[ REDACTED ]");
        this.#signingKey = privateKey;
        const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeAddress"])(this.signingKey.publicKey);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            address
        });
    }
    // Store private values behind getters to reduce visibility
    // in console.log
    /**
     *  The [[SigningKey]] used for signing payloads.
     */ get signingKey() {
        return this.#signingKey;
    }
    /**
     *  The private key for this wallet.
     */ get privateKey() {
        return this.signingKey.privateKey;
    }
    async getAddress() {
        return this.address;
    }
    connect(provider) {
        return new BaseWallet(this.#signingKey, provider);
    }
    async signTransaction(tx) {
        tx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["copyRequest"])(tx);
        // Replace any Addressable or ENS name with an address
        const { to, from } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveProperties"])({
            to: tx.to ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveAddress"])(tx.to, this) : undefined,
            from: tx.from ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveAddress"])(tx.from, this) : undefined
        });
        if (to != null) {
            tx.to = to;
        }
        if (from != null) {
            tx.from = from;
        }
        if (tx.from != null) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(tx.from) === this.address, "transaction from address mismatch", "tx.from", tx.from);
            delete tx.from;
        }
        // Build the transaction
        const btx = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Transaction"].from(tx);
        btx.signature = this.signingKey.sign(btx.unsignedHash);
        return btx.serialized;
    }
    async signMessage(message) {
        return this.signMessageSync(message);
    }
    // @TODO: Add a secialized signTx and signTyped sync that enforces
    // all parameters are known?
    /**
     *  Returns the signature for %%message%% signed with this wallet.
     */ signMessageSync(message) {
        return this.signingKey.sign((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$message$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashMessage"])(message)).serialized;
    }
    /**
     *  Returns the Authorization for %%auth%%.
     */ authorizeSync(auth) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(typeof auth.address === "string", "invalid address for authorizeSync", "auth.address", auth);
        const signature = this.signingKey.sign((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$authorization$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashAuthorization"])(auth));
        return Object.assign({}, {
            address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(auth.address),
            nonce: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBigInt"])(auth.nonce || 0),
            chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBigInt"])(auth.chainId || 0)
        }, {
            signature
        });
    }
    /**
     *  Resolves to the Authorization for %%auth%%.
     */ async authorize(auth) {
        auth = Object.assign({}, auth, {
            address: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveAddress"])(auth.address, this)
        });
        return this.authorizeSync(await this.populateAuthorization(auth));
    }
    async signTypedData(domain, types, value) {
        // Populate any ENS names
        const populated = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TypedDataEncoder"].resolveNames(domain, types, value, async (name)=>{
            // @TODO: this should use resolveName; addresses don't
            //        need a provider
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(this.provider != null, "cannot resolve ENS names without a provider", "UNSUPPORTED_OPERATION", {
                operation: "resolveName",
                info: {
                    name
                }
            });
            const address = await this.provider.resolveName(name);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(address != null, "unconfigured ENS name", "UNCONFIGURED_NAME", {
                value: name
            });
            return address;
        });
        return this.signingKey.sign(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TypedDataEncoder"].hash(populated.domain, types, populated.value)).serialized;
    }
} //# sourceMappingURL=base-wallet.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPassword",
    ()=>getPassword,
    "looseArrayify",
    ()=>looseArrayify,
    "spelunk",
    ()=>spelunk,
    "zpad",
    ()=>zpad
]);
/**
 *  @_ignore
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/utf8.js [app-client] (ecmascript)");
;
function looseArrayify(hexString) {
    if (typeof hexString === "string" && !hexString.startsWith("0x")) {
        hexString = "0x" + hexString;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytesCopy"])(hexString);
}
function zpad(value, length) {
    value = String(value);
    while(value.length < length){
        value = '0' + value;
    }
    return value;
}
function getPassword(password) {
    if (typeof password === 'string') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toUtf8Bytes"])(password, "NFKC");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytesCopy"])(password);
}
function spelunk(object, _path) {
    const match = _path.match(/^([a-z0-9$_.-]*)(:([a-z]+))?(!)?$/i);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(match != null, "invalid path", "path", _path);
    const path = match[1];
    const type = match[3];
    const reqd = match[4] === "!";
    let cur = object;
    for (const comp of path.toLowerCase().split('.')){
        // Search for a child object with a case-insensitive matching key
        if (Array.isArray(cur)) {
            if (!comp.match(/^[0-9]+$/)) {
                break;
            }
            cur = cur[parseInt(comp)];
        } else if (typeof cur === "object") {
            let found = null;
            for(const key in cur){
                if (key.toLowerCase() === comp) {
                    found = cur[key];
                    break;
                }
            }
            cur = found;
        } else {
            cur = null;
        }
        if (cur == null) {
            break;
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(!reqd || cur != null, "missing required value", "path", path);
    if (type && cur != null) {
        if (type === "int") {
            if (typeof cur === "string" && cur.match(/^-?[0-9]+$/)) {
                return parseInt(cur);
            } else if (Number.isSafeInteger(cur)) {
                return cur;
            }
        }
        if (type === "number") {
            if (typeof cur === "string" && cur.match(/^-?[0-9.]*$/)) {
                return parseFloat(cur);
            }
        }
        if (type === "data") {
            if (typeof cur === "string") {
                return looseArrayify(cur);
            }
        }
        if (type === "array" && Array.isArray(cur)) {
            return cur;
        }
        if (type === typeof cur) {
            return cur;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(false, `wrong type found for ${type} `, "path", path);
    }
    return cur;
} /*
export function follow(object: any, path: string): null | string {
    let currentChild = object;

    for (const comp of path.toLowerCase().split('/')) {

        // Search for a child object with a case-insensitive matching key
        let matchingChild = null;
        for (const key in currentChild) {
             if (key.toLowerCase() === comp) {
                 matchingChild = currentChild[key];
                 break;
             }
        }

        if (matchingChild === null) { return null; }

        currentChild = matchingChild;
    }

    return currentChild;
}

// "path/to/something:type!"
export function followRequired(data: any, path: string): string {
    const value = follow(data, path);
    if (value != null) { return value; }
    return logger.throwArgumentError("invalid value", `data:${ path }`,
    JSON.stringify(data));
}
*/  // See: https://www.ietf.org/rfc/rfc4122.txt (Section 4.4)
 /*
export function uuidV4(randomBytes: BytesLike): string {
    const bytes = getBytes(randomBytes, "randomBytes");

    // Section: 4.1.3:
    // - time_hi_and_version[12:16] = 0b0100
    bytes[6] = (bytes[6] & 0x0f) | 0x40;

    // Section 4.4
    // - clock_seq_hi_and_reserved[6] = 0b0
    // - clock_seq_hi_and_reserved[7] = 0b1
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const value = hexlify(bytes);

    return [
       value.substring(2, 10),
       value.substring(10, 14),
       value.substring(14, 18),
       value.substring(18, 22),
       value.substring(22, 34),
    ].join("-");
}
*/  //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/json-keystore.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decryptKeystoreJson",
    ()=>decryptKeystoreJson,
    "decryptKeystoreJsonSync",
    ()=>decryptKeystoreJsonSync,
    "encryptKeystoreJson",
    ()=>encryptKeystoreJson,
    "encryptKeystoreJsonSync",
    ()=>encryptKeystoreJsonSync,
    "isKeystoreJson",
    ()=>isKeystoreJson
]);
/**
 *  The JSON Wallet formats allow a simple way to store the private
 *  keys needed in Ethereum along with related information and allows
 *  for extensible forms of encryption.
 *
 *  These utilities facilitate decrypting and encrypting the most common
 *  JSON Wallet formats.
 *
 *  @_subsection: api/wallet:JSON Wallets  [json-wallets]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$aes$2d$js$2f$lib$2e$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/aes-js/lib.esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$aes$2d$js$2f$lib$2e$esm$2f$mode$2d$ctr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/aes-js/lib.esm/mode-ctr.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/keccak.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$pbkdf2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/pbkdf2.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$random$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/random.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$scrypt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/scrypt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$uuid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/uuid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$_version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/_version.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
const defaultPath = "m/44'/60'/0'/0/0";
function isKeystoreJson(json) {
    try {
        const data = JSON.parse(json);
        const version = data.version != null ? parseInt(data.version) : 0;
        if (version === 3) {
            return true;
        }
    } catch (error) {}
    return false;
}
function decrypt(data, key, ciphertext) {
    const cipher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "crypto.cipher:string");
    if (cipher === "aes-128-ctr") {
        const iv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "crypto.cipherparams.iv:data!");
        const aesCtr = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$aes$2d$js$2f$lib$2e$esm$2f$mode$2d$ctr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CTR"](key, iv);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])(aesCtr.decrypt(ciphertext));
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(false, "unsupported cipher", "UNSUPPORTED_OPERATION", {
        operation: "decrypt"
    });
}
function getAccount(data, _key) {
    const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(_key);
    const ciphertext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "crypto.ciphertext:data!");
    const computedMAC = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"])([
        key.slice(16, 32),
        ciphertext
    ]))).substring(2);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(computedMAC === (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "crypto.mac:string!").toLowerCase(), "incorrect password", "password", "[ REDACTED ]");
    const privateKey = decrypt(data, key.slice(0, 16), ciphertext);
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeAddress"])(privateKey);
    if (data.address) {
        let check = data.address.toLowerCase();
        if (!check.startsWith("0x")) {
            check = "0x" + check;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(check) === address, "keystore address/privateKey mismatch", "address", data.address);
    }
    const account = {
        address,
        privateKey
    };
    // Version 0.1 x-ethers metadata must contain an encrypted mnemonic phrase
    const version = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "x-ethers.version:string");
    if (version === "0.1") {
        const mnemonicKey = key.slice(32, 64);
        const mnemonicCiphertext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "x-ethers.mnemonicCiphertext:data!");
        const mnemonicIv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "x-ethers.mnemonicCounter:data!");
        const mnemonicAesCtr = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$aes$2d$js$2f$lib$2e$esm$2f$mode$2d$ctr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CTR"](mnemonicKey, mnemonicIv);
        account.mnemonic = {
            path: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "x-ethers.path:string") || defaultPath,
            locale: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "x-ethers.locale:string") || "en",
            entropy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(mnemonicAesCtr.decrypt(mnemonicCiphertext)))
        };
    }
    return account;
}
function getDecryptKdfParams(data) {
    const kdf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "crypto.kdf:string");
    if (kdf && typeof kdf === "string") {
        if (kdf.toLowerCase() === "scrypt") {
            const salt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "crypto.kdfparams.salt:data!");
            const N = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "crypto.kdfparams.n:int!");
            const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "crypto.kdfparams.r:int!");
            const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "crypto.kdfparams.p:int!");
            // Make sure N is a power of 2
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(N > 0 && (N & N - 1) === 0, "invalid kdf.N", "kdf.N", N);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(r > 0 && p > 0, "invalid kdf", "kdf", kdf);
            const dkLen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "crypto.kdfparams.dklen:int!");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(dkLen === 32, "invalid kdf.dklen", "kdf.dflen", dkLen);
            return {
                name: "scrypt",
                salt,
                N,
                r,
                p,
                dkLen: 64
            };
        } else if (kdf.toLowerCase() === "pbkdf2") {
            const salt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "crypto.kdfparams.salt:data!");
            const prf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "crypto.kdfparams.prf:string!");
            const algorithm = prf.split("-").pop();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(algorithm === "sha256" || algorithm === "sha512", "invalid kdf.pdf", "kdf.pdf", prf);
            const count = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "crypto.kdfparams.c:int!");
            const dkLen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "crypto.kdfparams.dklen:int!");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(dkLen === 32, "invalid kdf.dklen", "kdf.dklen", dkLen);
            return {
                name: "pbkdf2",
                salt,
                count,
                dkLen,
                algorithm
            };
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(false, "unsupported key-derivation function", "kdf", kdf);
}
function decryptKeystoreJsonSync(json, _password) {
    const data = JSON.parse(json);
    const password = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPassword"])(_password);
    const params = getDecryptKdfParams(data);
    if (params.name === "pbkdf2") {
        const { salt, count, dkLen, algorithm } = params;
        const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$pbkdf2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pbkdf2"])(password, salt, count, dkLen, algorithm);
        return getAccount(data, key);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(params.name === "scrypt", "cannot be reached", "UNKNOWN_ERROR", {
        params
    });
    const { salt, N, r, p, dkLen } = params;
    const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$scrypt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scryptSync"])(password, salt, N, r, p, dkLen);
    return getAccount(data, key);
}
function stall(duration) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        }, duration);
    });
}
async function decryptKeystoreJson(json, _password, progress) {
    const data = JSON.parse(json);
    const password = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPassword"])(_password);
    const params = getDecryptKdfParams(data);
    if (params.name === "pbkdf2") {
        if (progress) {
            progress(0);
            await stall(0);
        }
        const { salt, count, dkLen, algorithm } = params;
        const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$pbkdf2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pbkdf2"])(password, salt, count, dkLen, algorithm);
        if (progress) {
            progress(1);
            await stall(0);
        }
        return getAccount(data, key);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(params.name === "scrypt", "cannot be reached", "UNKNOWN_ERROR", {
        params
    });
    const { salt, N, r, p, dkLen } = params;
    const key = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$scrypt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scrypt"])(password, salt, N, r, p, dkLen, progress);
    return getAccount(data, key);
}
function getEncryptKdfParams(options) {
    // Check/generate the salt
    const salt = options.salt != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(options.salt, "options.salt") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$random$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomBytes"])(32);
    // Override the scrypt password-based key derivation function parameters
    let N = 1 << 17, r = 8, p = 1;
    if (options.scrypt) {
        if (options.scrypt.N) {
            N = options.scrypt.N;
        }
        if (options.scrypt.r) {
            r = options.scrypt.r;
        }
        if (options.scrypt.p) {
            p = options.scrypt.p;
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(typeof N === "number" && N > 0 && Number.isSafeInteger(N) && (BigInt(N) & BigInt(N - 1)) === BigInt(0), "invalid scrypt N parameter", "options.N", N);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(typeof r === "number" && r > 0 && Number.isSafeInteger(r), "invalid scrypt r parameter", "options.r", r);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(typeof p === "number" && p > 0 && Number.isSafeInteger(p), "invalid scrypt p parameter", "options.p", p);
    return {
        name: "scrypt",
        dkLen: 32,
        salt,
        N,
        r,
        p
    };
}
function _encryptKeystore(key, kdf, account, options) {
    const privateKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(account.privateKey, "privateKey");
    // Override initialization vector
    const iv = options.iv != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(options.iv, "options.iv") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$random$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomBytes"])(16);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(iv.length === 16, "invalid options.iv length", "options.iv", options.iv);
    // Override the uuid
    const uuidRandom = options.uuid != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(options.uuid, "options.uuid") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$random$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomBytes"])(16);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(uuidRandom.length === 16, "invalid options.uuid length", "options.uuid", options.iv);
    // This will be used to encrypt the wallet (as per Web3 secret storage)
    // - 32 bytes   As normal for the Web3 secret storage (derivedKey, macPrefix)
    // - 32 bytes   AES key to encrypt mnemonic with (required here to be Ethers Wallet)
    const derivedKey = key.slice(0, 16);
    const macPrefix = key.slice(16, 32);
    // Encrypt the private key
    const aesCtr = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$aes$2d$js$2f$lib$2e$esm$2f$mode$2d$ctr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CTR"](derivedKey, iv);
    const ciphertext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(aesCtr.encrypt(privateKey));
    // Compute the message authentication code, used to check the password
    const mac = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"])([
        macPrefix,
        ciphertext
    ]));
    // See: https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition
    const data = {
        address: account.address.substring(2).toLowerCase(),
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$uuid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uuidV4"])(uuidRandom),
        version: 3,
        Crypto: {
            cipher: "aes-128-ctr",
            cipherparams: {
                iv: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])(iv).substring(2)
            },
            ciphertext: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])(ciphertext).substring(2),
            kdf: "scrypt",
            kdfparams: {
                salt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])(kdf.salt).substring(2),
                n: kdf.N,
                dklen: 32,
                p: kdf.p,
                r: kdf.r
            },
            mac: mac.substring(2)
        }
    };
    // If we have a mnemonic, encrypt it into the JSON wallet
    if (account.mnemonic) {
        const client = options.client != null ? options.client : `ethers/${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$_version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"]}`;
        const path = account.mnemonic.path || defaultPath;
        const locale = account.mnemonic.locale || "en";
        const mnemonicKey = key.slice(32, 64);
        const entropy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(account.mnemonic.entropy, "account.mnemonic.entropy");
        const mnemonicIv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$random$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomBytes"])(16);
        const mnemonicAesCtr = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$aes$2d$js$2f$lib$2e$esm$2f$mode$2d$ctr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CTR"](mnemonicKey, mnemonicIv);
        const mnemonicCiphertext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(mnemonicAesCtr.encrypt(entropy));
        const now = new Date();
        const timestamp = now.getUTCFullYear() + "-" + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zpad"])(now.getUTCMonth() + 1, 2) + "-" + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zpad"])(now.getUTCDate(), 2) + "T" + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zpad"])(now.getUTCHours(), 2) + "-" + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zpad"])(now.getUTCMinutes(), 2) + "-" + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zpad"])(now.getUTCSeconds(), 2) + ".0Z";
        const gethFilename = "UTC--" + timestamp + "--" + data.address;
        data["x-ethers"] = {
            client,
            gethFilename,
            path,
            locale,
            mnemonicCounter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])(mnemonicIv).substring(2),
            mnemonicCiphertext: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])(mnemonicCiphertext).substring(2),
            version: "0.1"
        };
    }
    return JSON.stringify(data);
}
function encryptKeystoreJsonSync(account, password, options) {
    if (options == null) {
        options = {};
    }
    const passwordBytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPassword"])(password);
    const kdf = getEncryptKdfParams(options);
    const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$scrypt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scryptSync"])(passwordBytes, kdf.salt, kdf.N, kdf.r, kdf.p, 64);
    return _encryptKeystore((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(key), kdf, account, options);
}
async function encryptKeystoreJson(account, password, options) {
    if (options == null) {
        options = {};
    }
    const passwordBytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPassword"])(password);
    const kdf = getEncryptKdfParams(options);
    const key = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$scrypt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scrypt"])(passwordBytes, kdf.salt, kdf.N, kdf.r, kdf.p, 64, options.progressCallback);
    return _encryptKeystore((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(key), kdf, account, options);
} //# sourceMappingURL=json-keystore.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/hdwallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HDNodeVoidWallet",
    ()=>HDNodeVoidWallet,
    "HDNodeWallet",
    ()=>HDNodeWallet,
    "defaultPath",
    ()=>defaultPath,
    "getAccountPath",
    ()=>getAccountPath,
    "getIndexedAccountPath",
    ()=>getIndexedAccountPath
]);
/**
 *  Explain HD Wallets..
 *
 *  @_subsection: api/wallet:HD Wallets  [hd-wallets]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$hmac$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/hmac.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$random$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/random.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$ripemd160$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/ripemd160.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signing$2d$key$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/signing-key.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/sha2.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$abstract$2d$signer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/abstract-signer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$base58$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/base58.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/properties.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/maths.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wordlists$2f$lang$2d$en$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wordlists/lang-en.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$base$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/base-wallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$mnemonic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/mnemonic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$keystore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/json-keystore.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
const defaultPath = "m/44'/60'/0'/0/0";
// "Bitcoin seed"
const MasterSecret = new Uint8Array([
    66,
    105,
    116,
    99,
    111,
    105,
    110,
    32,
    115,
    101,
    101,
    100
]);
const HardenedBit = 0x80000000;
const N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
const Nibbles = "0123456789abcdef";
function zpad(value, length) {
    let result = "";
    while(value){
        result = Nibbles[value % 16] + result;
        value = Math.trunc(value / 16);
    }
    while(result.length < length * 2){
        result = "0" + result;
    }
    return "0x" + result;
}
function encodeBase58Check(_value) {
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(_value);
    const check = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataSlice"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sha256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sha256"])(value)), 0, 4);
    const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"])([
        value,
        check
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$base58$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeBase58"])(bytes);
}
const _guard = {};
function ser_I(index, chainCode, publicKey, privateKey) {
    const data = new Uint8Array(37);
    if (index & HardenedBit) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(privateKey != null, "cannot derive child of neutered node", "UNSUPPORTED_OPERATION", {
            operation: "deriveChild"
        });
        // Data = 0x00 || ser_256(k_par)
        data.set((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(privateKey), 1);
    } else {
        // Data = ser_p(point(k_par))
        data.set((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(publicKey));
    }
    // Data += ser_32(i)
    for(let i = 24; i >= 0; i -= 8){
        data[33 + (i >> 3)] = index >> 24 - i & 0xff;
    }
    const I = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$hmac$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeHmac"])("sha512", chainCode, data));
    return {
        IL: I.slice(0, 32),
        IR: I.slice(32)
    };
}
function derivePath(node, path) {
    const components = path.split("/");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(components.length > 0, "invalid path", "path", path);
    if (components[0] === "m") {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(node.depth === 0, `cannot derive root path (i.e. path starting with "m/") for a node at non-zero depth ${node.depth}`, "path", path);
        components.shift();
    }
    let result = node;
    for(let i = 0; i < components.length; i++){
        const component = components[i];
        if (component.match(/^[0-9]+'$/)) {
            const index = parseInt(component.substring(0, component.length - 1));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(index < HardenedBit, "invalid path index", `path[${i}]`, component);
            result = result.deriveChild(HardenedBit + index);
        } else if (component.match(/^[0-9]+$/)) {
            const index = parseInt(component);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(index < HardenedBit, "invalid path index", `path[${i}]`, component);
            result = result.deriveChild(index);
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(false, "invalid path component", `path[${i}]`, component);
        }
    }
    return result;
}
class HDNodeWallet extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$base$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseWallet"] {
    /**
     *  The compressed public key.
     */ publicKey;
    /**
     *  The fingerprint.
     *
     *  A fingerprint allows quick qay to detect parent and child nodes,
     *  but developers should be prepared to deal with collisions as it
     *  is only 4 bytes.
     */ fingerprint;
    /**
     *  The parent fingerprint.
     */ parentFingerprint;
    /**
     *  The mnemonic used to create this HD Node, if available.
     *
     *  Sources such as extended keys do not encode the mnemonic, in
     *  which case this will be ``null``.
     */ mnemonic;
    /**
     *  The chaincode, which is effectively a public key used
     *  to derive children.
     */ chainCode;
    /**
     *  The derivation path of this wallet.
     *
     *  Since extended keys do not provide full path details, this
     *  may be ``null``, if instantiated from a source that does not
     *  encode it.
     */ path;
    /**
     *  The child index of this wallet. Values over ``2 *\* 31`` indicate
     *  the node is hardened.
     */ index;
    /**
     *  The depth of this wallet, which is the number of components
     *  in its path.
     */ depth;
    /**
     *  @private
     */ constructor(guard, signingKey, parentFingerprint, chainCode, path, index, depth, mnemonic, provider){
        super(signingKey, provider);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertPrivate"])(guard, _guard, "HDNodeWallet");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            publicKey: signingKey.compressedPublicKey
        });
        const fingerprint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataSlice"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$ripemd160$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ripemd160"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sha256"])(this.publicKey)), 0, 4);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            parentFingerprint,
            fingerprint,
            chainCode,
            path,
            index,
            depth
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            mnemonic
        });
    }
    connect(provider) {
        return new HDNodeWallet(_guard, this.signingKey, this.parentFingerprint, this.chainCode, this.path, this.index, this.depth, this.mnemonic, provider);
    }
    #account() {
        const account = {
            address: this.address,
            privateKey: this.privateKey
        };
        const m = this.mnemonic;
        if (this.path && m && m.wordlist.locale === "en" && m.password === "") {
            account.mnemonic = {
                path: this.path,
                locale: "en",
                entropy: m.entropy
            };
        }
        return account;
    }
    /**
     *  Resolves to a [JSON Keystore Wallet](json-wallets) encrypted with
     *  %%password%%.
     *
     *  If %%progressCallback%% is specified, it will receive periodic
     *  updates as the encryption process progreses.
     */ async encrypt(password, progressCallback) {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$keystore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encryptKeystoreJson"])(this.#account(), password, {
            progressCallback
        });
    }
    /**
     *  Returns a [JSON Keystore Wallet](json-wallets) encryped with
     *  %%password%%.
     *
     *  It is preferred to use the [async version](encrypt) instead,
     *  which allows a [[ProgressCallback]] to keep the user informed.
     *
     *  This method will block the event loop (freezing all UI) until
     *  it is complete, which may be a non-trivial duration.
     */ encryptSync(password) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$keystore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encryptKeystoreJsonSync"])(this.#account(), password);
    }
    /**
     *  The extended key.
     *
     *  This key will begin with the prefix ``xpriv`` and can be used to
     *  reconstruct this HD Node to derive its children.
     */ get extendedKey() {
        // We only support the mainnet values for now, but if anyone needs
        // testnet values, let me know. I believe current sentiment is that
        // we should always use mainnet, and use BIP-44 to derive the network
        //   - Mainnet: public=0x0488B21E, private=0x0488ADE4
        //   - Testnet: public=0x043587CF, private=0x04358394
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(this.depth < 256, "Depth too deep", "UNSUPPORTED_OPERATION", {
            operation: "extendedKey"
        });
        return encodeBase58Check((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"])([
            "0x0488ADE4",
            zpad(this.depth, 1),
            this.parentFingerprint,
            zpad(this.index, 4),
            this.chainCode,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"])([
                "0x00",
                this.privateKey
            ])
        ]));
    }
    /**
     *  Returns true if this wallet has a path, providing a Type Guard
     *  that the path is non-null.
     */ hasPath() {
        return this.path != null;
    }
    /**
     *  Returns a neutered HD Node, which removes the private details
     *  of an HD Node.
     *
     *  A neutered node has no private key, but can be used to derive
     *  child addresses and other public data about the HD Node.
     */ neuter() {
        return new HDNodeVoidWallet(_guard, this.address, this.publicKey, this.parentFingerprint, this.chainCode, this.path, this.index, this.depth, this.provider);
    }
    /**
     *  Return the child for %%index%%.
     */ deriveChild(_index) {
        const index = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNumber"])(_index, "index");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(index <= 0xffffffff, "invalid index", "index", index);
        // Base path
        let path = this.path;
        if (path) {
            path += "/" + (index & ~HardenedBit);
            if (index & HardenedBit) {
                path += "'";
            }
        }
        const { IR, IL } = ser_I(index, this.chainCode, this.publicKey, this.privateKey);
        const ki = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signing$2d$key$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SigningKey"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBeHex"])(((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBigInt"])(IL) + BigInt(this.privateKey)) % N, 32));
        return new HDNodeWallet(_guard, ki, this.fingerprint, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])(IR), path, index, this.depth + 1, this.mnemonic, this.provider);
    }
    /**
     *  Return the HDNode for %%path%% from this node.
     */ derivePath(path) {
        return derivePath(this, path);
    }
    static #fromSeed(_seed, mnemonic) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBytesLike"])(_seed), "invalid seed", "seed", "[REDACTED]");
        const seed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(_seed, "seed");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(seed.length >= 16 && seed.length <= 64, "invalid seed", "seed", "[REDACTED]");
        const I = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$hmac$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeHmac"])("sha512", MasterSecret, seed));
        const signingKey = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signing$2d$key$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SigningKey"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])(I.slice(0, 32)));
        return new HDNodeWallet(_guard, signingKey, "0x00000000", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])(I.slice(32)), "m", 0, 0, mnemonic, null);
    }
    /**
     *  Creates a new HD Node from %%extendedKey%%.
     *
     *  If the %%extendedKey%% will either have a prefix or ``xpub`` or
     *  ``xpriv``, returning a neutered HD Node ([[HDNodeVoidWallet]])
     *  or full HD Node ([[HDNodeWallet) respectively.
     */ static fromExtendedKey(extendedKey) {
        const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBeArray"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$base58$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeBase58"])(extendedKey)); // @TODO: redact
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(bytes.length === 82 || encodeBase58Check(bytes.slice(0, 78)) === extendedKey, "invalid extended key", "extendedKey", "[ REDACTED ]");
        const depth = bytes[4];
        const parentFingerprint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])(bytes.slice(5, 9));
        const index = parseInt((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])(bytes.slice(9, 13)).substring(2), 16);
        const chainCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])(bytes.slice(13, 45));
        const key = bytes.slice(45, 78);
        switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])(bytes.slice(0, 4))){
            // Public Key
            case "0x0488b21e":
            case "0x043587cf":
                {
                    const publicKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])(key);
                    return new HDNodeVoidWallet(_guard, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeAddress"])(publicKey), publicKey, parentFingerprint, chainCode, null, index, depth, null);
                }
            // Private Key
            case "0x0488ade4":
            case "0x04358394 ":
                if (key[0] !== 0) {
                    break;
                }
                return new HDNodeWallet(_guard, new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signing$2d$key$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SigningKey"](key.slice(1)), parentFingerprint, chainCode, null, index, depth, null, null);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(false, "invalid extended key prefix", "extendedKey", "[ REDACTED ]");
    }
    /**
     *  Creates a new random HDNode.
     */ static createRandom(password, path, wordlist) {
        if (password == null) {
            password = "";
        }
        if (path == null) {
            path = defaultPath;
        }
        if (wordlist == null) {
            wordlist = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wordlists$2f$lang$2d$en$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LangEn"].wordlist();
        }
        const mnemonic = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$mnemonic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mnemonic"].fromEntropy((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$random$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomBytes"])(16), password, wordlist);
        return HDNodeWallet.#fromSeed(mnemonic.computeSeed(), mnemonic).derivePath(path);
    }
    /**
     *  Create an HD Node from %%mnemonic%%.
     */ static fromMnemonic(mnemonic, path) {
        if (!path) {
            path = defaultPath;
        }
        return HDNodeWallet.#fromSeed(mnemonic.computeSeed(), mnemonic).derivePath(path);
    }
    /**
     *  Creates an HD Node from a mnemonic %%phrase%%.
     */ static fromPhrase(phrase, password, path, wordlist) {
        if (password == null) {
            password = "";
        }
        if (path == null) {
            path = defaultPath;
        }
        if (wordlist == null) {
            wordlist = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wordlists$2f$lang$2d$en$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LangEn"].wordlist();
        }
        const mnemonic = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$mnemonic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mnemonic"].fromPhrase(phrase, password, wordlist);
        return HDNodeWallet.#fromSeed(mnemonic.computeSeed(), mnemonic).derivePath(path);
    }
    /**
     *  Creates an HD Node from a %%seed%%.
     */ static fromSeed(seed) {
        return HDNodeWallet.#fromSeed(seed, null);
    }
}
class HDNodeVoidWallet extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$abstract$2d$signer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VoidSigner"] {
    /**
     *  The compressed public key.
     */ publicKey;
    /**
     *  The fingerprint.
     *
     *  A fingerprint allows quick qay to detect parent and child nodes,
     *  but developers should be prepared to deal with collisions as it
     *  is only 4 bytes.
     */ fingerprint;
    /**
     *  The parent node fingerprint.
     */ parentFingerprint;
    /**
     *  The chaincode, which is effectively a public key used
     *  to derive children.
     */ chainCode;
    /**
     *  The derivation path of this wallet.
     *
     *  Since extended keys do not provider full path details, this
     *  may be ``null``, if instantiated from a source that does not
     *  enocde it.
     */ path;
    /**
     *  The child index of this wallet. Values over ``2 *\* 31`` indicate
     *  the node is hardened.
     */ index;
    /**
     *  The depth of this wallet, which is the number of components
     *  in its path.
     */ depth;
    /**
     *  @private
     */ constructor(guard, address, publicKey, parentFingerprint, chainCode, path, index, depth, provider){
        super(address, provider);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertPrivate"])(guard, _guard, "HDNodeVoidWallet");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            publicKey
        });
        const fingerprint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataSlice"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$ripemd160$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ripemd160"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sha256"])(publicKey)), 0, 4);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            publicKey,
            fingerprint,
            parentFingerprint,
            chainCode,
            path,
            index,
            depth
        });
    }
    connect(provider) {
        return new HDNodeVoidWallet(_guard, this.address, this.publicKey, this.parentFingerprint, this.chainCode, this.path, this.index, this.depth, provider);
    }
    /**
     *  The extended key.
     *
     *  This key will begin with the prefix ``xpub`` and can be used to
     *  reconstruct this neutered key to derive its children addresses.
     */ get extendedKey() {
        // We only support the mainnet values for now, but if anyone needs
        // testnet values, let me know. I believe current sentiment is that
        // we should always use mainnet, and use BIP-44 to derive the network
        //   - Mainnet: public=0x0488B21E, private=0x0488ADE4
        //   - Testnet: public=0x043587CF, private=0x04358394
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(this.depth < 256, "Depth too deep", "UNSUPPORTED_OPERATION", {
            operation: "extendedKey"
        });
        return encodeBase58Check((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"])([
            "0x0488B21E",
            zpad(this.depth, 1),
            this.parentFingerprint,
            zpad(this.index, 4),
            this.chainCode,
            this.publicKey
        ]));
    }
    /**
     *  Returns true if this wallet has a path, providing a Type Guard
     *  that the path is non-null.
     */ hasPath() {
        return this.path != null;
    }
    /**
     *  Return the child for %%index%%.
     */ deriveChild(_index) {
        const index = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNumber"])(_index, "index");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(index <= 0xffffffff, "invalid index", "index", index);
        // Base path
        let path = this.path;
        if (path) {
            path += "/" + (index & ~HardenedBit);
            if (index & HardenedBit) {
                path += "'";
            }
        }
        const { IR, IL } = ser_I(index, this.chainCode, this.publicKey, null);
        const Ki = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signing$2d$key$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SigningKey"].addPoints(IL, this.publicKey, true);
        const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeAddress"])(Ki);
        return new HDNodeVoidWallet(_guard, address, Ki, this.fingerprint, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlify"])(IR), path, index, this.depth + 1, this.provider);
    }
    /**
     *  Return the signer for %%path%% from this node.
     */ derivePath(path) {
        return derivePath(this, path);
    }
}
function getAccountPath(_index) {
    const index = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNumber"])(_index, "index");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(index >= 0 && index < HardenedBit, "invalid account index", "index", index);
    return `m/44'/60'/${index}'/0/0`;
}
function getIndexedAccountPath(_index) {
    const index = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNumber"])(_index, "index");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(index >= 0 && index < HardenedBit, "invalid account index", "index", index);
    return `m/44'/60'/0'/0/${index}`;
} //# sourceMappingURL=hdwallet.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/json-crowdsale.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decryptCrowdsaleJson",
    ()=>decryptCrowdsaleJson,
    "isCrowdsaleJson",
    ()=>isCrowdsaleJson
]);
/**
 *  @_subsection: api/wallet:JSON Wallets  [json-wallets]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$aes$2d$js$2f$lib$2e$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/aes-js/lib.esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$aes$2d$js$2f$lib$2e$esm$2f$mode$2d$cbc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/aes-js/lib.esm/mode-cbc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$aes$2d$js$2f$lib$2e$esm$2f$padding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/aes-js/lib.esm/padding.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$pbkdf2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/pbkdf2.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$id$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/hash/id.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/utils.js [app-client] (ecmascript)");
;
;
;
;
;
;
function isCrowdsaleJson(json) {
    try {
        const data = JSON.parse(json);
        if (data.encseed) {
            return true;
        }
    } catch (error) {}
    return false;
}
function decryptCrowdsaleJson(json, _password) {
    const data = JSON.parse(json);
    const password = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPassword"])(_password);
    // Ethereum Address
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "ethaddr:string!"));
    // Encrypted Seed
    const encseed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["looseArrayify"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spelunk"])(data, "encseed:string!"));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(encseed && encseed.length % 16 === 0, "invalid encseed", "json", json);
    const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$pbkdf2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pbkdf2"])(password, password, 2000, 32, "sha256")).slice(0, 16);
    const iv = encseed.slice(0, 16);
    const encryptedSeed = encseed.slice(16);
    // Decrypt the seed
    const aesCbc = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$aes$2d$js$2f$lib$2e$esm$2f$mode$2d$cbc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CBC"](key, iv);
    const seed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$aes$2d$js$2f$lib$2e$esm$2f$padding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pkcs7Strip"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytes"])(aesCbc.decrypt(encryptedSeed)));
    // This wallet format is weird... Convert the binary encoded hex to a string.
    let seedHex = "";
    for(let i = 0; i < seed.length; i++){
        seedHex += String.fromCharCode(seed[i]);
    }
    return {
        address,
        privateKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$id$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["id"])(seedHex)
    };
} //# sourceMappingURL=json-crowdsale.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/wallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Wallet",
    ()=>Wallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signing$2d$key$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/signing-key.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$base$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/base-wallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$hdwallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/hdwallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$crowdsale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/json-crowdsale.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$keystore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/json-keystore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$mnemonic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/mnemonic.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
function stall(duration) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        }, duration);
    });
}
class Wallet extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$base$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseWallet"] {
    /**
     *  Create a new wallet for the private %%key%%, optionally connected
     *  to %%provider%%.
     */ constructor(key, provider){
        if (typeof key === "string" && !key.startsWith("0x")) {
            key = "0x" + key;
        }
        let signingKey = typeof key === "string" ? new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signing$2d$key$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SigningKey"](key) : key;
        super(signingKey, provider);
    }
    connect(provider) {
        return new Wallet(this.signingKey, provider);
    }
    /**
     *  Resolves to a [JSON Keystore Wallet](json-wallets) encrypted with
     *  %%password%%.
     *
     *  If %%progressCallback%% is specified, it will receive periodic
     *  updates as the encryption process progreses.
     */ async encrypt(password, progressCallback) {
        const account = {
            address: this.address,
            privateKey: this.privateKey
        };
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$keystore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encryptKeystoreJson"])(account, password, {
            progressCallback
        });
    }
    /**
     *  Returns a [JSON Keystore Wallet](json-wallets) encryped with
     *  %%password%%.
     *
     *  It is preferred to use the [async version](encrypt) instead,
     *  which allows a [[ProgressCallback]] to keep the user informed.
     *
     *  This method will block the event loop (freezing all UI) until
     *  it is complete, which may be a non-trivial duration.
     */ encryptSync(password) {
        const account = {
            address: this.address,
            privateKey: this.privateKey
        };
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$keystore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encryptKeystoreJsonSync"])(account, password);
    }
    static #fromAccount(account) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(account, "invalid JSON wallet", "json", "[ REDACTED ]");
        if ("mnemonic" in account && account.mnemonic && account.mnemonic.locale === "en") {
            const mnemonic = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$mnemonic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mnemonic"].fromEntropy(account.mnemonic.entropy);
            const wallet = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$hdwallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HDNodeWallet"].fromMnemonic(mnemonic, account.mnemonic.path);
            if (wallet.address === account.address && wallet.privateKey === account.privateKey) {
                return wallet;
            }
            console.log("WARNING: JSON mismatch address/privateKey != mnemonic; fallback onto private key");
        }
        const wallet = new Wallet(account.privateKey);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(wallet.address === account.address, "address/privateKey mismatch", "json", "[ REDACTED ]");
        return wallet;
    }
    /**
     *  Creates (asynchronously) a **Wallet** by decrypting the %%json%%
     *  with %%password%%.
     *
     *  If %%progress%% is provided, it is called periodically during
     *  decryption so that any UI can be updated.
     */ static async fromEncryptedJson(json, password, progress) {
        let account = null;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$keystore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isKeystoreJson"])(json)) {
            account = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$keystore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decryptKeystoreJson"])(json, password, progress);
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$crowdsale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCrowdsaleJson"])(json)) {
            if (progress) {
                progress(0);
                await stall(0);
            }
            account = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$crowdsale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decryptCrowdsaleJson"])(json, password);
            if (progress) {
                progress(1);
                await stall(0);
            }
        }
        return Wallet.#fromAccount(account);
    }
    /**
     *  Creates a **Wallet** by decrypting the %%json%% with %%password%%.
     *
     *  The [[fromEncryptedJson]] method is preferred, as this method
     *  will lock up and freeze the UI during decryption, which may take
     *  some time.
     */ static fromEncryptedJsonSync(json, password) {
        let account = null;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$keystore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isKeystoreJson"])(json)) {
            account = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$keystore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decryptKeystoreJsonSync"])(json, password);
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$crowdsale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCrowdsaleJson"])(json)) {
            account = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$crowdsale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decryptCrowdsaleJson"])(json, password);
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertArgument"])(false, "invalid JSON wallet", "json", "[ REDACTED ]");
        }
        return Wallet.#fromAccount(account);
    }
    /**
     *  Creates a new random [[HDNodeWallet]] using the available
     *  [cryptographic random source](randomBytes).
     *
     *  If there is no crytographic random source, this will throw.
     */ static createRandom(provider) {
        const wallet = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$hdwallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HDNodeWallet"].createRandom();
        if (provider) {
            return wallet.connect(provider);
        }
        return wallet;
    }
    /**
     *  Creates a [[HDNodeWallet]] for %%phrase%%.
     */ static fromPhrase(phrase, provider) {
        const wallet = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$hdwallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HDNodeWallet"].fromPhrase(phrase);
        if (provider) {
            return wallet.connect(provider);
        }
        return wallet;
    }
} //# sourceMappingURL=wallet.js.map
}),
]);

//# sourceMappingURL=129bd_ethers_lib_esm_wallet_a7a7ac1d._.js.map