module.exports = [
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/ethers.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/////////////////////////////
//
__turbopack_context__.s([]);
;
;
;
;
;
;
;
;
;
;
;
;
 // dummy change; to pick-up ws security issue changes
 //# sourceMappingURL=ethers.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/_version.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* Do NOT modify this file; see /src.ts/_admin/update-version.ts */ /**
 *  The current version of Ethers.
 */ __turbopack_context__.s([
    "version",
    ()=>version
]);
const version = "6.16.0"; //# sourceMappingURL=_version.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/keccak.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "keccak256",
    ()=>keccak256
]);
/**
 *  Cryptographic hashing functions
 *
 *  @_subsection: api/crypto:Hash Functions [about-crypto-hashing]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/@noble/hashes/esm/sha3.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
;
;
let locked = false;
const _keccak256 = function(data) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak_256"])(data);
};
let __keccak256 = _keccak256;
function keccak256(_data) {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_data, "data");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(__keccak256(data));
}
keccak256._ = _keccak256;
keccak256.lock = function() {
    locked = true;
};
keccak256.register = function(func) {
    if (locked) {
        throw new TypeError("keccak256 is locked");
    }
    __keccak256 = func;
};
Object.freeze(keccak256); //# sourceMappingURL=keccak.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/hmac.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeHmac",
    ()=>computeHmac
]);
/**
 *  An **HMAC** enables verification that a given key was used
 *  to authenticate a payload.
 *
 *  See: [[link-wiki-hmac]]
 *
 *  @_subsection: api/crypto:HMAC  [about-hmac]
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
;
;
let locked = false;
const _computeHmac = function(algorithm, key, data) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])(algorithm, key).update(data).digest();
};
let __computeHmac = _computeHmac;
function computeHmac(algorithm, _key, _data) {
    const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_key, "key");
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_data, "data");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(__computeHmac(algorithm, key, data));
}
computeHmac._ = _computeHmac;
computeHmac.lock = function() {
    locked = true;
};
computeHmac.register = function(func) {
    if (locked) {
        throw new Error("computeHmac is locked");
    }
    __computeHmac = func;
};
Object.freeze(computeHmac); //# sourceMappingURL=hmac.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/random.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "randomBytes",
    ()=>randomBytes
]);
/**
 *  A **Cryptographically Secure Random Value** is one that has been
 *  generated with additional care take to prevent side-channels
 *  from allowing others to detect it and prevent others from through
 *  coincidence generate the same values.
 *
 *  @_subsection: api/crypto:Random Values  [about-crypto-random]
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
let locked = false;
const _randomBytes = function(length) {
    return new Uint8Array((0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomBytes"])(length));
};
let __randomBytes = _randomBytes;
function randomBytes(length) {
    return __randomBytes(length);
}
randomBytes._ = _randomBytes;
randomBytes.lock = function() {
    locked = true;
};
randomBytes.register = function(func) {
    if (locked) {
        throw new Error("randomBytes is locked");
    }
    __randomBytes = func;
};
Object.freeze(randomBytes); //# sourceMappingURL=random.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/ripemd160.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ripemd160",
    ()=>ripemd160
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$ripemd160$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/@noble/hashes/esm/ripemd160.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
;
;
let locked = false;
const _ripemd160 = function(data) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$ripemd160$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ripemd160"])(data);
};
let __ripemd160 = _ripemd160;
function ripemd160(_data) {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_data, "data");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(__ripemd160(data));
}
ripemd160._ = _ripemd160;
ripemd160.lock = function() {
    locked = true;
};
ripemd160.register = function(func) {
    if (locked) {
        throw new TypeError("ripemd160 is locked");
    }
    __ripemd160 = func;
};
Object.freeze(ripemd160); //# sourceMappingURL=ripemd160.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/sha2.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sha256",
    ()=>sha256,
    "sha512",
    ()=>sha512
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
;
;
const _sha256 = function(data) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])("sha256").update(data).digest();
};
const _sha512 = function(data) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])("sha512").update(data).digest();
};
let __sha256 = _sha256;
let __sha512 = _sha512;
let locked256 = false, locked512 = false;
function sha256(_data) {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_data, "data");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(__sha256(data));
}
sha256._ = _sha256;
sha256.lock = function() {
    locked256 = true;
};
sha256.register = function(func) {
    if (locked256) {
        throw new Error("sha256 is locked");
    }
    __sha256 = func;
};
Object.freeze(sha256);
function sha512(_data) {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_data, "data");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(__sha512(data));
}
sha512._ = _sha512;
sha512.lock = function() {
    locked512 = true;
};
sha512.register = function(func) {
    if (locked512) {
        throw new Error("sha512 is locked");
    }
    __sha512 = func;
};
Object.freeze(sha256); //# sourceMappingURL=sha2.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/pbkdf2.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pbkdf2",
    ()=>pbkdf2
]);
/**
 *  A **Password-Based Key-Derivation Function** is designed to create
 *  a sequence of bytes suitible as a **key** from a human-rememberable
 *  password.
 *
 *  @_subsection: api/crypto:Passwords  [about-pbkdf]
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
;
;
let locked = false;
const _pbkdf2 = function(password, salt, iterations, keylen, algo) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["pbkdf2Sync"])(password, salt, iterations, keylen, algo);
};
let __pbkdf2 = _pbkdf2;
function pbkdf2(_password, _salt, iterations, keylen, algo) {
    const password = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_password, "password");
    const salt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_salt, "salt");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(__pbkdf2(password, salt, iterations, keylen, algo));
}
pbkdf2._ = _pbkdf2;
pbkdf2.lock = function() {
    locked = true;
};
pbkdf2.register = function(func) {
    if (locked) {
        throw new Error("pbkdf2 is locked");
    }
    __pbkdf2 = func;
};
Object.freeze(pbkdf2); //# sourceMappingURL=pbkdf2.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/scrypt.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scrypt",
    ()=>scrypt,
    "scryptSync",
    ()=>scryptSync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$scrypt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/@noble/hashes/esm/scrypt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
;
;
let lockedSync = false, lockedAsync = false;
const _scryptAsync = async function(passwd, salt, N, r, p, dkLen, onProgress) {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$scrypt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scryptAsync"])(passwd, salt, {
        N,
        r,
        p,
        dkLen,
        onProgress
    });
};
const _scryptSync = function(passwd, salt, N, r, p, dkLen) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$scrypt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scrypt"])(passwd, salt, {
        N,
        r,
        p,
        dkLen
    });
};
let __scryptAsync = _scryptAsync;
let __scryptSync = _scryptSync;
async function scrypt(_passwd, _salt, N, r, p, dkLen, progress) {
    const passwd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_passwd, "passwd");
    const salt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_salt, "salt");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(await __scryptAsync(passwd, salt, N, r, p, dkLen, progress));
}
scrypt._ = _scryptAsync;
scrypt.lock = function() {
    lockedAsync = true;
};
scrypt.register = function(func) {
    if (lockedAsync) {
        throw new Error("scrypt is locked");
    }
    __scryptAsync = func;
};
Object.freeze(scrypt);
function scryptSync(_passwd, _salt, N, r, p, dkLen) {
    const passwd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_passwd, "passwd");
    const salt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_salt, "salt");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(__scryptSync(passwd, salt, N, r, p, dkLen));
}
scryptSync._ = _scryptSync;
scryptSync.lock = function() {
    lockedSync = true;
};
scryptSync.register = function(func) {
    if (lockedSync) {
        throw new Error("scryptSync is locked");
    }
    __scryptSync = func;
};
Object.freeze(scryptSync); //# sourceMappingURL=scrypt.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "lock",
    ()=>lock
]);
// We import all these so we can export lock()
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$hmac$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/hmac.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/keccak.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$ripemd160$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/ripemd160.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$pbkdf2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/pbkdf2.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$random$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/random.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$scrypt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/scrypt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/sha2.js [app-ssr] (ecmascript)");
/**
 *  A fundamental building block of Ethereum is the underlying
 *  cryptographic primitives.
 *
 *  @_section: api/crypto:Cryptographic Functions   [about-crypto]
 */ null;
;
;
;
;
;
;
;
;
;
;
/**
 *  Once called, prevents any future change to the underlying cryptographic
 *  primitives using the ``.register`` feature for hooks.
 */ function lock() {
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$hmac$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["computeHmac"].lock();
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"].lock();
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$pbkdf2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pbkdf2"].lock();
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$random$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["randomBytes"].lock();
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$ripemd160$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ripemd160"].lock();
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$scrypt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scrypt"].lock();
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$scrypt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scryptSync"].lock();
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sha256"].lock();
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sha512"].lock();
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$random$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["randomBytes"].lock();
}
;
 //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/signature.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Signature",
    ()=>Signature
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$hashes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/constants/hashes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/maths.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
;
;
// Constants
const BN_0 = BigInt(0);
const BN_1 = BigInt(1);
const BN_2 = BigInt(2);
const BN_27 = BigInt(27);
const BN_28 = BigInt(28);
const BN_35 = BigInt(35);
const BN_N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
const BN_N_2 = BN_N / BN_2; // Must be integer (floor) division; do NOT shifts
const inspect = Symbol.for("nodejs.util.inspect.custom");
const _guard = {};
function toUint256(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zeroPadValue"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(value), 32);
}
class Signature {
    #r;
    #s;
    #v;
    #networkV;
    /**
     *  The ``r`` value for a signature.
     *
     *  This represents the ``x`` coordinate of a "reference" or
     *  challenge point, from which the ``y`` can be computed.
     */ get r() {
        return this.#r;
    }
    set r(value) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataLength"])(value) === 32, "invalid r", "value", value);
        this.#r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(value);
    }
    /**
     *  The ``s`` value for a signature.
     */ get s() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(parseInt(this.#s.substring(0, 3)) < 8, "non-canonical s; use ._s", "s", this.#s);
        return this.#s;
    }
    set s(_value) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataLength"])(_value) === 32, "invalid s", "value", _value);
        this.#s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(_value);
    }
    /**
     *  Return the s value, unchecked for EIP-2 compliance.
     *
     *  This should generally not be used and is for situations where
     *  a non-canonical S value might be relevant, such as Frontier blocks
     *  that were mined prior to EIP-2 or invalid Authorization List
     *  signatures.
     */ get _s() {
        return this.#s;
    }
    /**
     *  Returns true if the Signature is valid for [[link-eip-2]] signatures.
     */ isValid() {
        const s = BigInt(this.#s);
        return s <= BN_N_2;
    }
    /**
     *  The ``v`` value for a signature.
     *
     *  Since a given ``x`` value for ``r`` has two possible values for
     *  its correspondin ``y``, the ``v`` indicates which of the two ``y``
     *  values to use.
     *
     *  It is normalized to the values ``27`` or ``28`` for legacy
     *  purposes.
     */ get v() {
        return this.#v;
    }
    set v(value) {
        const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNumber"])(value, "value");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(v === 27 || v === 28, "invalid v", "v", value);
        this.#v = v;
    }
    /**
     *  The EIP-155 ``v`` for legacy transactions. For non-legacy
     *  transactions, this value is ``null``.
     */ get networkV() {
        return this.#networkV;
    }
    /**
     *  The chain ID for EIP-155 legacy transactions. For non-legacy
     *  transactions, this value is ``null``.
     */ get legacyChainId() {
        const v = this.networkV;
        if (v == null) {
            return null;
        }
        return Signature.getChainId(v);
    }
    /**
     *  The ``yParity`` for the signature.
     *
     *  See ``v`` for more details on how this value is used.
     */ get yParity() {
        return this.v === 27 ? 0 : 1;
    }
    /**
     *  The [[link-eip-2098]] compact representation of the ``yParity``
     *  and ``s`` compacted into a single ``bytes32``.
     */ get yParityAndS() {
        // The EIP-2098 compact representation
        const yParityAndS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(this.s);
        if (this.yParity) {
            yParityAndS[0] |= 0x80;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(yParityAndS);
    }
    /**
     *  The [[link-eip-2098]] compact representation.
     */ get compactSerialized() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])([
            this.r,
            this.yParityAndS
        ]);
    }
    /**
     *  The serialized representation.
     */ get serialized() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])([
            this.r,
            this.s,
            this.yParity ? "0x1c" : "0x1b"
        ]);
    }
    /**
     *  @private
     */ constructor(guard, r, s, v){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertPrivate"])(guard, _guard, "Signature");
        this.#r = r;
        this.#s = s;
        this.#v = v;
        this.#networkV = null;
    }
    /**
     *  Returns the canonical signature.
     *
     *  This is only necessary when dealing with legacy transaction which
     *  did not enforce canonical S values (i.e. [[link-eip-2]]. Most
     *  developers should never require this.
     */ getCanonical() {
        if (this.isValid()) {
            return this;
        }
        // Compute the canonical signature; s' = N - s, v = !v
        const s = BN_N - BigInt(this._s);
        const v = 55 - this.v;
        const result = new Signature(_guard, this.r, toUint256(s), v);
        // Populate the networkV if necessary
        if (this.networkV) {
            result.#networkV = this.networkV;
        }
        return result;
    }
    /**
     *  Returns a new identical [[Signature]].
     */ clone() {
        const clone = new Signature(_guard, this.r, this._s, this.v);
        if (this.networkV) {
            clone.#networkV = this.networkV;
        }
        return clone;
    }
    /**
     *  Returns a representation that is compatible with ``JSON.stringify``.
     */ toJSON() {
        const networkV = this.networkV;
        return {
            _type: "signature",
            networkV: networkV != null ? networkV.toString() : null,
            r: this.r,
            s: this._s,
            v: this.v
        };
    }
    [inspect]() {
        return this.toString();
    }
    toString() {
        if (this.isValid()) {
            return `Signature { r: ${this.r}, s: ${this._s}, v: ${this.v} }`;
        }
        return `Signature { r: ${this.r}, s: ${this._s}, v: ${this.v}, valid: false }`;
    }
    /**
     *  Compute the chain ID from the ``v`` in a legacy EIP-155 transactions.
     *
     *  @example:
     *    Signature.getChainId(45)
     *    //_result:
     *
     *    Signature.getChainId(46)
     *    //_result:
     */ static getChainId(v) {
        const bv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(v, "v");
        // The v is not an EIP-155 v, so it is the unspecified chain ID
        if (bv == BN_27 || bv == BN_28) {
            return BN_0;
        }
        // Bad value for an EIP-155 v
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(bv >= BN_35, "invalid EIP-155 v", "v", v);
        return (bv - BN_35) / BN_2;
    }
    /**
     *  Compute the ``v`` for a chain ID for a legacy EIP-155 transactions.
     *
     *  Legacy transactions which use [[link-eip-155]] hijack the ``v``
     *  property to include the chain ID.
     *
     *  @example:
     *    Signature.getChainIdV(5, 27)
     *    //_result:
     *
     *    Signature.getChainIdV(5, 28)
     *    //_result:
     *
     */ static getChainIdV(chainId, v) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(chainId) * BN_2 + BigInt(35 + v - 27);
    }
    /**
     *  Compute the normalized legacy transaction ``v`` from a ``yParirty``,
     *  a legacy transaction ``v`` or a legacy [[link-eip-155]] transaction.
     *
     *  @example:
     *    // The values 0 and 1 imply v is actually yParity
     *    Signature.getNormalizedV(0)
     *    //_result:
     *
     *    // Legacy non-EIP-1559 transaction (i.e. 27 or 28)
     *    Signature.getNormalizedV(27)
     *    //_result:
     *
     *    // Legacy EIP-155 transaction (i.e. >= 35)
     *    Signature.getNormalizedV(46)
     *    //_result:
     *
     *    // Invalid values throw
     *    Signature.getNormalizedV(5)
     *    //_error:
     */ static getNormalizedV(v) {
        const bv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(v);
        if (bv === BN_0 || bv === BN_27) {
            return 27;
        }
        if (bv === BN_1 || bv === BN_28) {
            return 28;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(bv >= BN_35, "invalid v", "v", v);
        // Otherwise, EIP-155 v means odd is 27 and even is 28
        return bv & BN_1 ? 27 : 28;
    }
    /**
     *  Creates a new [[Signature]].
     *
     *  If no %%sig%% is provided, a new [[Signature]] is created
     *  with default values.
     *
     *  If %%sig%% is a string, it is parsed.
     */ static from(sig) {
        function assertError(check, message) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(check, message, "signature", sig);
        }
        ;
        if (sig == null) {
            return new Signature(_guard, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$hashes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZeroHash"], __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$hashes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZeroHash"], 27);
        }
        if (typeof sig === "string") {
            const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(sig, "signature");
            if (bytes.length === 64) {
                const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(bytes.slice(0, 32));
                const s = bytes.slice(32, 64);
                const v = s[0] & 0x80 ? 28 : 27;
                s[0] &= 0x7f;
                return new Signature(_guard, r, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(s), v);
            }
            if (bytes.length === 65) {
                const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(bytes.slice(0, 32));
                const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(bytes.slice(32, 64));
                const v = Signature.getNormalizedV(bytes[64]);
                return new Signature(_guard, r, s, v);
            }
            assertError(false, "invalid raw signature length");
        }
        if (sig instanceof Signature) {
            return sig.clone();
        }
        // Get r
        const _r = sig.r;
        assertError(_r != null, "missing r");
        const r = toUint256(_r);
        // Get s; by any means necessary (we check consistency below)
        const s = function(s, yParityAndS) {
            if (s != null) {
                return toUint256(s);
            }
            if (yParityAndS != null) {
                assertError((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHexString"])(yParityAndS, 32), "invalid yParityAndS");
                const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(yParityAndS);
                bytes[0] &= 0x7f;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(bytes);
            }
            assertError(false, "missing s");
        }(sig.s, sig.yParityAndS);
        // Get v; by any means necessary (we check consistency below)
        const { networkV, v } = function(_v, yParityAndS, yParity) {
            if (_v != null) {
                const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(_v);
                return {
                    networkV: v >= BN_35 ? v : undefined,
                    v: Signature.getNormalizedV(v)
                };
            }
            if (yParityAndS != null) {
                assertError((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHexString"])(yParityAndS, 32), "invalid yParityAndS");
                return {
                    v: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(yParityAndS)[0] & 0x80 ? 28 : 27
                };
            }
            if (yParity != null) {
                switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNumber"])(yParity, "sig.yParity")){
                    case 0:
                        return {
                            v: 27
                        };
                    case 1:
                        return {
                            v: 28
                        };
                }
                assertError(false, "invalid yParity");
            }
            assertError(false, "missing v");
        }(sig.v, sig.yParityAndS, sig.yParity);
        const result = new Signature(_guard, r, s, v);
        if (networkV) {
            result.#networkV = networkV;
        }
        // If multiple of v, yParity, yParityAndS we given, check they match
        assertError(sig.yParity == null || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNumber"])(sig.yParity, "sig.yParity") === result.yParity, "yParity mismatch");
        assertError(sig.yParityAndS == null || sig.yParityAndS === result.yParityAndS, "yParityAndS mismatch");
        return result;
    }
} //# sourceMappingURL=signature.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/signing-key.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SigningKey",
    ()=>SigningKey
]);
/**
 *  Add details about signing here.
 *
 *  @_subsection: api/crypto:Signing  [about-signing]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f40$noble$2f$curves$2f$esm$2f$secp256k1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/@noble/curves/esm/secp256k1.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/maths.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/signature.js [app-ssr] (ecmascript)");
;
;
;
class SigningKey {
    #privateKey;
    /**
     *  Creates a new **SigningKey** for %%privateKey%%.
     */ constructor(privateKey){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataLength"])(privateKey) === 32, "invalid private key", "privateKey", "[REDACTED]");
        this.#privateKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(privateKey);
    }
    /**
     *  The private key.
     */ get privateKey() {
        return this.#privateKey;
    }
    /**
     *  The uncompressed public key.
     *
     * This will always begin with the prefix ``0x04`` and be 132
     * characters long (the ``0x`` prefix and 130 hexadecimal nibbles).
     */ get publicKey() {
        return SigningKey.computePublicKey(this.#privateKey);
    }
    /**
     *  The compressed public key.
     *
     *  This will always begin with either the prefix ``0x02`` or ``0x03``
     *  and be 68 characters long (the ``0x`` prefix and 33 hexadecimal
     *  nibbles)
     */ get compressedPublicKey() {
        return SigningKey.computePublicKey(this.#privateKey, true);
    }
    /**
     *  Return the signature of the signed %%digest%%.
     */ sign(digest) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataLength"])(digest) === 32, "invalid digest length", "digest", digest);
        const sig = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f40$noble$2f$curves$2f$esm$2f$secp256k1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["secp256k1"].sign((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytesCopy"])(digest), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytesCopy"])(this.#privateKey), {
            lowS: true
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Signature"].from({
            r: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeHex"])(sig.r, 32),
            s: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeHex"])(sig.s, 32),
            v: sig.recovery ? 0x1c : 0x1b
        });
    }
    /**
     *  Returns the [[link-wiki-ecdh]] shared secret between this
     *  private key and the %%other%% key.
     *
     *  The %%other%% key may be any type of key, a raw public key,
     *  a compressed/uncompressed pubic key or aprivate key.
     *
     *  Best practice is usually to use a cryptographic hash on the
     *  returned value before using it as a symetric secret.
     *
     *  @example:
     *    sign1 = new SigningKey(id("some-secret-1"))
     *    sign2 = new SigningKey(id("some-secret-2"))
     *
     *    // Notice that privA.computeSharedSecret(pubB)...
     *    sign1.computeSharedSecret(sign2.publicKey)
     *    //_result:
     *
     *    // ...is equal to privB.computeSharedSecret(pubA).
     *    sign2.computeSharedSecret(sign1.publicKey)
     *    //_result:
     */ computeSharedSecret(other) {
        const pubKey = SigningKey.computePublicKey(other);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f40$noble$2f$curves$2f$esm$2f$secp256k1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["secp256k1"].getSharedSecret((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytesCopy"])(this.#privateKey), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(pubKey), false));
    }
    /**
     *  Compute the public key for %%key%%, optionally %%compressed%%.
     *
     *  The %%key%% may be any type of key, a raw public key, a
     *  compressed/uncompressed public key or private key.
     *
     *  @example:
     *    sign = new SigningKey(id("some-secret"));
     *
     *    // Compute the uncompressed public key for a private key
     *    SigningKey.computePublicKey(sign.privateKey)
     *    //_result:
     *
     *    // Compute the compressed public key for a private key
     *    SigningKey.computePublicKey(sign.privateKey, true)
     *    //_result:
     *
     *    // Compute the uncompressed public key
     *    SigningKey.computePublicKey(sign.publicKey, false);
     *    //_result:
     *
     *    // Compute the Compressed a public key
     *    SigningKey.computePublicKey(sign.publicKey, true);
     *    //_result:
     */ static computePublicKey(key, compressed) {
        let bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(key, "key");
        // private key
        if (bytes.length === 32) {
            const pubKey = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f40$noble$2f$curves$2f$esm$2f$secp256k1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["secp256k1"].getPublicKey(bytes, !!compressed);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(pubKey);
        }
        // raw public key; use uncompressed key with 0x04 prefix
        if (bytes.length === 64) {
            const pub = new Uint8Array(65);
            pub[0] = 0x04;
            pub.set(bytes, 1);
            bytes = pub;
        }
        const point = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f40$noble$2f$curves$2f$esm$2f$secp256k1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["secp256k1"].ProjectivePoint.fromHex(bytes);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(point.toRawBytes(compressed));
    }
    /**
     *  Returns the public key for the private key which produced the
     *  %%signature%% for the given %%digest%%.
     *
     *  @example:
     *    key = new SigningKey(id("some-secret"))
     *    digest = id("hello world")
     *    sig = key.sign(digest)
     *
     *    // Notice the signer public key...
     *    key.publicKey
     *    //_result:
     *
     *    // ...is equal to the recovered public key
     *    SigningKey.recoverPublicKey(digest, sig)
     *    //_result:
     *
     */ static recoverPublicKey(digest, signature) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataLength"])(digest) === 32, "invalid digest length", "digest", digest);
        const sig = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Signature"].from(signature);
        let secpSig = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f40$noble$2f$curves$2f$esm$2f$secp256k1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["secp256k1"].Signature.fromCompact((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytesCopy"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])([
            sig.r,
            sig.s
        ])));
        secpSig = secpSig.addRecoveryBit(sig.yParity);
        const pubKey = secpSig.recoverPublicKey((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytesCopy"])(digest));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(pubKey != null, "invalid signature for digest", "signature", signature);
        return "0x" + pubKey.toHex(false);
    }
    /**
     *  Returns the point resulting from adding the ellipic curve points
     *  %%p0%% and %%p1%%.
     *
     *  This is not a common function most developers should require, but
     *  can be useful for certain privacy-specific techniques.
     *
     *  For example, it is used by [[HDNodeWallet]] to compute child
     *  addresses from parent public keys and chain codes.
     */ static addPoints(p0, p1, compressed) {
        const pub0 = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f40$noble$2f$curves$2f$esm$2f$secp256k1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["secp256k1"].ProjectivePoint.fromHex(SigningKey.computePublicKey(p0).substring(2));
        const pub1 = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f40$noble$2f$curves$2f$esm$2f$secp256k1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["secp256k1"].ProjectivePoint.fromHex(SigningKey.computePublicKey(p1).substring(2));
        return "0x" + pub0.add(pub1).toHex(!!compressed);
    }
} //# sourceMappingURL=signing-key.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/address.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAddress",
    ()=>getAddress,
    "getIcapAddress",
    ()=>getIcapAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/keccak.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
;
;
const BN_0 = BigInt(0);
const BN_36 = BigInt(36);
function getChecksumAddress(address) {
    //    if (!isHexString(address, 20)) {
    //        logger.throwArgumentError("invalid address", "address", address);
    //    }
    address = address.toLowerCase();
    const chars = address.substring(2).split("");
    const expanded = new Uint8Array(40);
    for(let i = 0; i < 40; i++){
        expanded[i] = chars[i].charCodeAt(0);
    }
    const hashed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])(expanded));
    for(let i = 0; i < 40; i += 2){
        if (hashed[i >> 1] >> 4 >= 8) {
            chars[i] = chars[i].toUpperCase();
        }
        if ((hashed[i >> 1] & 0x0f) >= 8) {
            chars[i + 1] = chars[i + 1].toUpperCase();
        }
    }
    return "0x" + chars.join("");
}
// See: https://en.wikipedia.org/wiki/International_Bank_Account_Number
// Create lookup table
const ibanLookup = {};
for(let i = 0; i < 10; i++){
    ibanLookup[String(i)] = String(i);
}
for(let i = 0; i < 26; i++){
    ibanLookup[String.fromCharCode(65 + i)] = String(10 + i);
}
// How many decimal digits can we process? (for 64-bit float, this is 15)
// i.e. Math.floor(Math.log10(Number.MAX_SAFE_INTEGER));
const safeDigits = 15;
function ibanChecksum(address) {
    address = address.toUpperCase();
    address = address.substring(4) + address.substring(0, 2) + "00";
    let expanded = address.split("").map((c)=>{
        return ibanLookup[c];
    }).join("");
    // Javascript can handle integers safely up to 15 (decimal) digits
    while(expanded.length >= safeDigits){
        let block = expanded.substring(0, safeDigits);
        expanded = parseInt(block, 10) % 97 + expanded.substring(block.length);
    }
    let checksum = String(98 - parseInt(expanded, 10) % 97);
    while(checksum.length < 2){
        checksum = "0" + checksum;
    }
    return checksum;
}
;
const Base36 = function() {
    ;
    const result = {};
    for(let i = 0; i < 36; i++){
        const key = "0123456789abcdefghijklmnopqrstuvwxyz"[i];
        result[key] = BigInt(i);
    }
    return result;
}();
function fromBase36(value) {
    value = value.toLowerCase();
    let result = BN_0;
    for(let i = 0; i < value.length; i++){
        result = result * BN_36 + Base36[value[i]];
    }
    return result;
}
function getAddress(address) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(typeof address === "string", "invalid address", "address", address);
    if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
        // Missing the 0x prefix
        if (!address.startsWith("0x")) {
            address = "0x" + address;
        }
        const result = getChecksumAddress(address);
        // It is a checksummed address with a bad checksum
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(!address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || result === address, "bad address checksum", "address", address);
        return result;
    }
    // Maybe ICAP? (we only support direct mode)
    if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
        // It is an ICAP address with a bad checksum
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(address.substring(2, 4) === ibanChecksum(address), "bad icap checksum", "address", address);
        let result = fromBase36(address.substring(4)).toString(16);
        while(result.length < 40){
            result = "0" + result;
        }
        return getChecksumAddress("0x" + result);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "invalid address", "address", address);
}
function getIcapAddress(address) {
    //let base36 = _base16To36(getAddress(address).substring(2)).toUpperCase();
    let base36 = BigInt(getAddress(address)).toString(36).toUpperCase();
    while(base36.length < 30){
        base36 = "0" + base36;
    }
    return "XE" + ibanChecksum("XE00" + base36) + base36;
} //# sourceMappingURL=address.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/contract-address.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCreate2Address",
    ()=>getCreate2Address,
    "getCreateAddress",
    ()=>getCreateAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/keccak.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/maths.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/rlp-encode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/address.js [app-ssr] (ecmascript)");
;
;
;
function getCreateAddress(tx) {
    const from = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(tx.from);
    const nonce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(tx.nonce, "tx.nonce");
    let nonceHex = nonce.toString(16);
    if (nonceHex === "0") {
        nonceHex = "0x";
    } else if (nonceHex.length % 2) {
        nonceHex = "0x0" + nonceHex;
    } else {
        nonceHex = "0x" + nonceHex;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataSlice"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeRlp"])([
        from,
        nonceHex
    ])), 12));
}
function getCreate2Address(_from, _salt, _initCodeHash) {
    const from = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(_from);
    const salt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_salt, "salt");
    const initCodeHash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_initCodeHash, "initCodeHash");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(salt.length === 32, "salt must be 32 bytes", "salt", _salt);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(initCodeHash.length === 32, "initCodeHash must be 32 bytes", "initCodeHash", _initCodeHash);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataSlice"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])([
        "0xff",
        from,
        salt,
        initCodeHash
    ])), 12));
} //# sourceMappingURL=contract-address.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/checks.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAddress",
    ()=>isAddress,
    "isAddressable",
    ()=>isAddressable,
    "resolveAddress",
    ()=>resolveAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/address.js [app-ssr] (ecmascript)");
;
;
function isAddressable(value) {
    return value && typeof value.getAddress === "function";
}
function isAddress(value) {
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(value);
        return true;
    } catch (error) {}
    return false;
}
async function checkAddress(target, promise) {
    const result = await promise;
    if (result == null || result === "0x0000000000000000000000000000000000000000") {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(typeof target !== "string", "unconfigured name", "UNCONFIGURED_NAME", {
            value: target
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "invalid AddressLike value; did not resolve to a value address", "target", target);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(result);
}
function resolveAddress(target, resolver) {
    if (typeof target === "string") {
        if (target.match(/^0x[0-9a-f]{40}$/i)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(target);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(resolver != null, "ENS resolution requires a provider", "UNSUPPORTED_OPERATION", {
            operation: "resolveName"
        });
        return checkAddress(target, resolver.resolveName(target));
    } else if (isAddressable(target)) {
        return checkAddress(target, target.getAddress());
    } else if (target && typeof target.then === "function") {
        return checkAddress(target, target);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "unsupported addressable value", "target", target);
} //# sourceMappingURL=checks.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/hash/id.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "id",
    ()=>id
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/keccak.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/utf8.js [app-ssr] (ecmascript)");
;
;
function id(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toUtf8Bytes"])(value));
} //# sourceMappingURL=id.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/hash/namehash.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dnsEncode",
    ()=>dnsEncode,
    "ensNormalize",
    ()=>ensNormalize,
    "isValidName",
    ()=>isValidName,
    "namehash",
    ()=>namehash
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/keccak.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/utf8.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f40$adraffy$2f$ens$2d$normalize$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/@adraffy/ens-normalize/dist/index.mjs [app-ssr] (ecmascript)");
;
;
;
const Zeros = new Uint8Array(32);
Zeros.fill(0);
function checkComponent(comp) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(comp.length !== 0, "invalid ENS name; empty component", "comp", comp);
    return comp;
}
function ensNameSplit(name) {
    const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toUtf8Bytes"])(ensNormalize(name));
    const comps = [];
    if (name.length === 0) {
        return comps;
    }
    let last = 0;
    for(let i = 0; i < bytes.length; i++){
        const d = bytes[i];
        // A separator (i.e. "."); copy this component
        if (d === 0x2e) {
            comps.push(checkComponent(bytes.slice(last, i)));
            last = i + 1;
        }
    }
    // There was a stray separator at the end of the name
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(last < bytes.length, "invalid ENS name; empty component", "name", name);
    comps.push(checkComponent(bytes.slice(last)));
    return comps;
}
function ensNormalize(name) {
    try {
        if (name.length === 0) {
            throw new Error("empty label");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f40$adraffy$2f$ens$2d$normalize$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ens_normalize"])(name);
    } catch (error) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, `invalid ENS name (${error.message})`, "name", name);
    }
}
function isValidName(name) {
    try {
        return ensNameSplit(name).length !== 0;
    } catch (error) {}
    return false;
}
function namehash(name) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(typeof name === "string", "invalid ENS name; not a string", "name", name);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(name.length, `invalid ENS name (empty label)`, "name", name);
    let result = Zeros;
    const comps = ensNameSplit(name);
    while(comps.length){
        result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])([
            result,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])(comps.pop())
        ]));
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(result);
}
function dnsEncode(name, _maxLength) {
    const length = _maxLength != null ? _maxLength : 63;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(length <= 255, "DNS encoded label cannot exceed 255", "length", length);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])(ensNameSplit(name).map((comp)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(comp.length <= length, `label ${JSON.stringify(name)} exceeds ${length} bytes`, "name", name);
        const bytes = new Uint8Array(comp.length + 1);
        bytes.set(comp, 1);
        bytes[0] = bytes.length - 1;
        return bytes;
    }))) + "00";
} //# sourceMappingURL=namehash.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/hash/authorization.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hashAuthorization",
    ()=>hashAuthorization,
    "verifyAuthorization",
    ()=>verifyAuthorization
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/keccak.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/rlp-encode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/maths.js [app-ssr] (ecmascript)");
;
;
;
;
function hashAuthorization(auth) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(typeof auth.address === "string", "invalid address for hashAuthorization", "auth.address", auth);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])([
        "0x05",
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeRlp"])([
            auth.chainId != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(auth.chainId) : "0x",
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(auth.address),
            auth.nonce != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(auth.nonce) : "0x"
        ])
    ]));
}
function verifyAuthorization(auth, sig) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["recoverAddress"])(hashAuthorization(auth), sig);
} //# sourceMappingURL=authorization.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/hash/message.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hashMessage",
    ()=>hashMessage,
    "verifyMessage",
    ()=>verifyMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/keccak.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$strings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/constants/strings.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/utf8.js [app-ssr] (ecmascript)");
;
;
;
;
function hashMessage(message) {
    if (typeof message === "string") {
        message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toUtf8Bytes"])(message);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toUtf8Bytes"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$strings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MessagePrefix"]),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toUtf8Bytes"])(String(message.length)),
        message
    ]));
}
function verifyMessage(message, sig) {
    const digest = hashMessage(message);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["recoverAddress"])(digest, sig);
} //# sourceMappingURL=message.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/hash/solidity.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "solidityPacked",
    ()=>solidityPacked,
    "solidityPackedKeccak256",
    ()=>solidityPackedKeccak256,
    "solidityPackedSha256",
    ()=>solidityPackedSha256
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/keccak.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/sha2.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/maths.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/utf8.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
;
;
;
const regexBytes = new RegExp("^bytes([0-9]+)$");
const regexNumber = new RegExp("^(u?int)([0-9]*)$");
const regexArray = new RegExp("^(.*)\\[([0-9]*)\\]$");
function _pack(type, value, isArray) {
    switch(type){
        case "address":
            if (isArray) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zeroPadValue"])(value, 32));
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(value));
        case "string":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toUtf8Bytes"])(value);
        case "bytes":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(value);
        case "bool":
            value = !!value ? "0x01" : "0x00";
            if (isArray) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zeroPadValue"])(value, 32));
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(value);
    }
    let match = type.match(regexNumber);
    if (match) {
        let signed = match[1] === "int";
        let size = parseInt(match[2] || "256");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])((!match[2] || match[2] === String(size)) && size % 8 === 0 && size !== 0 && size <= 256, "invalid number type", "type", type);
        if (isArray) {
            size = 256;
        }
        if (signed) {
            value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toTwos"])(value, size);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zeroPadValue"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(value), size / 8));
    }
    match = type.match(regexBytes);
    if (match) {
        const size = parseInt(match[1]);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(String(size) === match[1] && size !== 0 && size <= 32, "invalid bytes type", "type", type);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataLength"])(value) === size, `invalid value for ${type}`, "value", value);
        if (isArray) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zeroPadBytes"])(value, 32));
        }
        return value;
    }
    match = type.match(regexArray);
    if (match && Array.isArray(value)) {
        const baseType = match[1];
        const count = parseInt(match[2] || String(value.length));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(count === value.length, `invalid array length for ${type}`, "value", value);
        const result = [];
        value.forEach(function(value) {
            result.push(_pack(baseType, value, true));
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])(result));
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "invalid type", "type", type);
}
function solidityPacked(types, values) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(types.length === values.length, "wrong number of values; expected ${ types.length }", "values", values);
    const tight = [];
    types.forEach(function(type, index) {
        tight.push(_pack(type, values[index]));
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])(tight));
}
function solidityPackedKeccak256(types, values) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])(solidityPacked(types, values));
}
function solidityPackedSha256(types, values) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sha256"])(solidityPacked(types, values));
} //# sourceMappingURL=solidity.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/hash/typed-data.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TypedDataEncoder",
    ()=>TypedDataEncoder,
    "verifyTypedData",
    ()=>verifyTypedData
]);
//import { TypedDataDomain, TypedDataField } from "@ethersproject/providerabstract-signer";
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/keccak.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/maths.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$id$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/hash/id.js [app-ssr] (ecmascript)");
;
;
;
;
;
const padding = new Uint8Array(32);
padding.fill(0);
const BN__1 = BigInt(-1);
const BN_0 = BigInt(0);
const BN_1 = BigInt(1);
const BN_MAX_UINT256 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
;
;
function hexPadRight(value) {
    const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(value);
    const padOffset = bytes.length % 32;
    if (padOffset) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])([
            bytes,
            padding.slice(padOffset)
        ]);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(bytes);
}
const hexTrue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeHex"])(BN_1, 32);
const hexFalse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeHex"])(BN_0, 32);
const domainFieldTypes = {
    name: "string",
    version: "string",
    chainId: "uint256",
    verifyingContract: "address",
    salt: "bytes32"
};
const domainFieldNames = [
    "name",
    "version",
    "chainId",
    "verifyingContract",
    "salt"
];
function checkString(key) {
    return function(value) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(typeof value === "string", `invalid domain value for ${JSON.stringify(key)}`, `domain.${key}`, value);
        return value;
    };
}
const domainChecks = {
    name: checkString("name"),
    version: checkString("version"),
    chainId: function(_value) {
        const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(_value, "domain.chainId");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(value >= 0, "invalid chain ID", "domain.chainId", _value);
        if (Number.isSafeInteger(value)) {
            return Number(value);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toQuantity"])(value);
    },
    verifyingContract: function(value) {
        try {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(value).toLowerCase();
        } catch (error) {}
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, `invalid domain value "verifyingContract"`, "domain.verifyingContract", value);
    },
    salt: function(value) {
        const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(value, "domain.salt");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(bytes.length === 32, `invalid domain value "salt"`, "domain.salt", value);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(bytes);
    }
};
function getBaseEncoder(type) {
    // intXX and uintXX
    {
        const match = type.match(/^(u?)int(\d+)$/);
        if (match) {
            const signed = match[1] === "";
            const width = parseInt(match[2]);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(width % 8 === 0 && width !== 0 && width <= 256 && match[2] === String(width), "invalid numeric width", "type", type);
            const boundsUpper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mask"])(BN_MAX_UINT256, signed ? width - 1 : width);
            const boundsLower = signed ? (boundsUpper + BN_1) * BN__1 : BN_0;
            return function(_value) {
                const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(_value, "value");
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(value >= boundsLower && value <= boundsUpper, `value out-of-bounds for ${type}`, "value", value);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeHex"])(signed ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toTwos"])(value, 256) : value, 32);
            };
        }
    }
    // bytesXX
    {
        const match = type.match(/^bytes(\d+)$/);
        if (match) {
            const width = parseInt(match[1]);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(width !== 0 && width <= 32 && match[1] === String(width), "invalid bytes width", "type", type);
            return function(value) {
                const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(value);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(bytes.length === width, `invalid length for ${type}`, "value", value);
                return hexPadRight(value);
            };
        }
    }
    switch(type){
        case "address":
            return function(value) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zeroPadValue"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(value), 32);
            };
        case "bool":
            return function(value) {
                return !value ? hexFalse : hexTrue;
            };
        case "bytes":
            return function(value) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])(value);
            };
        case "string":
            return function(value) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$id$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["id"])(value);
            };
    }
    return null;
}
function encodeType(name, fields) {
    return `${name}(${fields.map(({ name, type })=>type + " " + name).join(",")})`;
}
// foo[][3] => { base: "foo", index: "[][3]", array: {
//     base: "foo", prefix: "foo[]", count: 3 } }
function splitArray(type) {
    const match = type.match(/^([^\x5b]*)((\x5b\d*\x5d)*)(\x5b(\d*)\x5d)$/);
    if (match) {
        return {
            base: match[1],
            index: match[2] + match[4],
            array: {
                base: match[1],
                prefix: match[1] + match[2],
                count: match[5] ? parseInt(match[5]) : -1
            }
        };
    }
    return {
        base: type
    };
}
class TypedDataEncoder {
    /**
     *  The primary type for the structured [[types]].
     *
     *  This is derived automatically from the [[types]], since no
     *  recursion is possible, once the DAG for the types is consturcted
     *  internally, the primary type must be the only remaining type with
     *  no parent nodes.
     */ primaryType;
    #types;
    /**
     *  The types.
     */ get types() {
        return JSON.parse(this.#types);
    }
    #fullTypes;
    #encoderCache;
    /**
     *  Create a new **TypedDataEncoder** for %%types%%.
     *
     *  This performs all necessary checking that types are valid and
     *  do not violate the [[link-eip-712]] structural constraints as
     *  well as computes the [[primaryType]].
     */ constructor(_types){
        this.#fullTypes = new Map();
        this.#encoderCache = new Map();
        // Link struct types to their direct child structs
        const links = new Map();
        // Link structs to structs which contain them as a child
        const parents = new Map();
        // Link all subtypes within a given struct
        const subtypes = new Map();
        const types = {};
        Object.keys(_types).forEach((type)=>{
            types[type] = _types[type].map(({ name, type })=>{
                // Normalize the base type (unless name conflict)
                let { base, index } = splitArray(type);
                if (base === "int" && !_types["int"]) {
                    base = "int256";
                }
                if (base === "uint" && !_types["uint"]) {
                    base = "uint256";
                }
                return {
                    name,
                    type: base + (index || "")
                };
            });
            links.set(type, new Set());
            parents.set(type, []);
            subtypes.set(type, new Set());
        });
        this.#types = JSON.stringify(types);
        for(const name in types){
            const uniqueNames = new Set();
            for (const field of types[name]){
                // Check each field has a unique name
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(!uniqueNames.has(field.name), `duplicate variable name ${JSON.stringify(field.name)} in ${JSON.stringify(name)}`, "types", _types);
                uniqueNames.add(field.name);
                // Get the base type (drop any array specifiers)
                const baseType = splitArray(field.type).base;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(baseType !== name, `circular type reference to ${JSON.stringify(baseType)}`, "types", _types);
                // Is this a base encoding type?
                const encoder = getBaseEncoder(baseType);
                if (encoder) {
                    continue;
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(parents.has(baseType), `unknown type ${JSON.stringify(baseType)}`, "types", _types);
                // Add linkage
                parents.get(baseType).push(name);
                links.get(name).add(baseType);
            }
        }
        // Deduce the primary type
        const primaryTypes = Array.from(parents.keys()).filter((n)=>parents.get(n).length === 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(primaryTypes.length !== 0, "missing primary type", "types", _types);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(primaryTypes.length === 1, `ambiguous primary types or unused types: ${primaryTypes.map((t)=>JSON.stringify(t)).join(", ")}`, "types", _types);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            primaryType: primaryTypes[0]
        });
        // Check for circular type references
        function checkCircular(type, found) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(!found.has(type), `circular type reference to ${JSON.stringify(type)}`, "types", _types);
            found.add(type);
            for (const child of links.get(type)){
                if (!parents.has(child)) {
                    continue;
                }
                // Recursively check children
                checkCircular(child, found);
                // Mark all ancestors as having this decendant
                for (const subtype of found){
                    subtypes.get(subtype).add(child);
                }
            }
            found.delete(type);
        }
        checkCircular(this.primaryType, new Set());
        // Compute each fully describe type
        for (const [name, set] of subtypes){
            const st = Array.from(set);
            st.sort();
            this.#fullTypes.set(name, encodeType(name, types[name]) + st.map((t)=>encodeType(t, types[t])).join(""));
        }
    }
    /**
     *  Returnthe encoder for the specific %%type%%.
     */ getEncoder(type) {
        let encoder = this.#encoderCache.get(type);
        if (!encoder) {
            encoder = this.#getEncoder(type);
            this.#encoderCache.set(type, encoder);
        }
        return encoder;
    }
    #getEncoder(type) {
        // Basic encoder type (address, bool, uint256, etc)
        {
            const encoder = getBaseEncoder(type);
            if (encoder) {
                return encoder;
            }
        }
        // Array
        const array = splitArray(type).array;
        if (array) {
            const subtype = array.prefix;
            const subEncoder = this.getEncoder(subtype);
            return (value)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(array.count === -1 || array.count === value.length, `array length mismatch; expected length ${array.count}`, "value", value);
                let result = value.map(subEncoder);
                if (this.#fullTypes.has(subtype)) {
                    result = result.map(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"]);
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])(result));
            };
        }
        // Struct
        const fields = this.types[type];
        if (fields) {
            const encodedType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$id$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["id"])(this.#fullTypes.get(type));
            return (value)=>{
                const values = fields.map(({ name, type })=>{
                    const result = this.getEncoder(type)(value[name]);
                    if (this.#fullTypes.has(type)) {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])(result);
                    }
                    return result;
                });
                values.unshift(encodedType);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])(values);
            };
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, `unknown type: ${type}`, "type", type);
    }
    /**
     *  Return the full type for %%name%%.
     */ encodeType(name) {
        const result = this.#fullTypes.get(name);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(result, `unknown type: ${JSON.stringify(name)}`, "name", name);
        return result;
    }
    /**
     *  Return the encoded %%value%% for the %%type%%.
     */ encodeData(type, value) {
        return this.getEncoder(type)(value);
    }
    /**
     *  Returns the hash of %%value%% for the type of %%name%%.
     */ hashStruct(name, value) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])(this.encodeData(name, value));
    }
    /**
     *  Return the fulled encoded %%value%% for the [[types]].
     */ encode(value) {
        return this.encodeData(this.primaryType, value);
    }
    /**
     *  Return the hash of the fully encoded %%value%% for the [[types]].
     */ hash(value) {
        return this.hashStruct(this.primaryType, value);
    }
    /**
     *  @_ignore:
     */ _visit(type, value, callback) {
        // Basic encoder type (address, bool, uint256, etc)
        {
            const encoder = getBaseEncoder(type);
            if (encoder) {
                return callback(type, value);
            }
        }
        // Array
        const array = splitArray(type).array;
        if (array) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(array.count === -1 || array.count === value.length, `array length mismatch; expected length ${array.count}`, "value", value);
            return value.map((v)=>this._visit(array.prefix, v, callback));
        }
        // Struct
        const fields = this.types[type];
        if (fields) {
            return fields.reduce((accum, { name, type })=>{
                accum[name] = this._visit(type, value[name], callback);
                return accum;
            }, {});
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, `unknown type: ${type}`, "type", type);
    }
    /**
     *  Call %%calback%% for each value in %%value%%, passing the type and
     *  component within %%value%%.
     *
     *  This is useful for replacing addresses or other transformation that
     *  may be desired on each component, based on its type.
     */ visit(value, callback) {
        return this._visit(this.primaryType, value, callback);
    }
    /**
     *  Create a new **TypedDataEncoder** for %%types%%.
     */ static from(types) {
        return new TypedDataEncoder(types);
    }
    /**
     *  Return the primary type for %%types%%.
     */ static getPrimaryType(types) {
        return TypedDataEncoder.from(types).primaryType;
    }
    /**
     *  Return the hashed struct for %%value%% using %%types%% and %%name%%.
     */ static hashStruct(name, types, value) {
        return TypedDataEncoder.from(types).hashStruct(name, value);
    }
    /**
     *  Return the domain hash for %%domain%%.
     */ static hashDomain(domain) {
        const domainFields = [];
        for(const name in domain){
            if (domain[name] == null) {
                continue;
            }
            const type = domainFieldTypes[name];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(type, `invalid typed-data domain key: ${JSON.stringify(name)}`, "domain", domain);
            domainFields.push({
                name,
                type
            });
        }
        domainFields.sort((a, b)=>{
            return domainFieldNames.indexOf(a.name) - domainFieldNames.indexOf(b.name);
        });
        return TypedDataEncoder.hashStruct("EIP712Domain", {
            EIP712Domain: domainFields
        }, domain);
    }
    /**
     *  Return the fully encoded [[link-eip-712]] %%value%% for %%types%% with %%domain%%.
     */ static encode(domain, types, value) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])([
            "0x1901",
            TypedDataEncoder.hashDomain(domain),
            TypedDataEncoder.from(types).hash(value)
        ]);
    }
    /**
     *  Return the hash of the fully encoded [[link-eip-712]] %%value%% for %%types%% with %%domain%%.
     */ static hash(domain, types, value) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])(TypedDataEncoder.encode(domain, types, value));
    }
    // Replaces all address types with ENS names with their looked up address
    /**
     * Resolves to the value from resolving all addresses in %%value%% for
     * %%types%% and the %%domain%%.
     */ static async resolveNames(domain, types, value, resolveName) {
        // Make a copy to isolate it from the object passed in
        domain = Object.assign({}, domain);
        // Allow passing null to ignore value
        for(const key in domain){
            if (domain[key] == null) {
                delete domain[key];
            }
        }
        // Look up all ENS names
        const ensCache = {};
        // Do we need to look up the domain's verifyingContract?
        if (domain.verifyingContract && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHexString"])(domain.verifyingContract, 20)) {
            ensCache[domain.verifyingContract] = "0x";
        }
        // We are going to use the encoder to visit all the base values
        const encoder = TypedDataEncoder.from(types);
        // Get a list of all the addresses
        encoder.visit(value, (type, value)=>{
            if (type === "address" && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHexString"])(value, 20)) {
                ensCache[value] = "0x";
            }
            return value;
        });
        // Lookup each name
        for(const name in ensCache){
            ensCache[name] = await resolveName(name);
        }
        // Replace the domain verifyingContract if needed
        if (domain.verifyingContract && ensCache[domain.verifyingContract]) {
            domain.verifyingContract = ensCache[domain.verifyingContract];
        }
        // Replace all ENS names with their address
        value = encoder.visit(value, (type, value)=>{
            if (type === "address" && ensCache[value]) {
                return ensCache[value];
            }
            return value;
        });
        return {
            domain,
            value
        };
    }
    /**
     *  Returns the JSON-encoded payload expected by nodes which implement
     *  the JSON-RPC [[link-eip-712]] method.
     */ static getPayload(domain, types, value) {
        // Validate the domain fields
        TypedDataEncoder.hashDomain(domain);
        // Derive the EIP712Domain Struct reference type
        const domainValues = {};
        const domainTypes = [];
        domainFieldNames.forEach((name)=>{
            const value = domain[name];
            if (value == null) {
                return;
            }
            domainValues[name] = domainChecks[name](value);
            domainTypes.push({
                name,
                type: domainFieldTypes[name]
            });
        });
        const encoder = TypedDataEncoder.from(types);
        // Get the normalized types
        types = encoder.types;
        const typesWithDomain = Object.assign({}, types);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(typesWithDomain.EIP712Domain == null, "types must not contain EIP712Domain type", "types.EIP712Domain", types);
        typesWithDomain.EIP712Domain = domainTypes;
        // Validate the data structures and types
        encoder.encode(value);
        return {
            types: typesWithDomain,
            domain: domainValues,
            primaryType: encoder.primaryType,
            message: encoder.visit(value, (type, value)=>{
                // bytes
                if (type.match(/^bytes(\d*)/)) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(value));
                }
                // uint or int
                if (type.match(/^u?int/)) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(value).toString();
                }
                switch(type){
                    case "address":
                        return value.toLowerCase();
                    case "bool":
                        return !!value;
                    case "string":
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(typeof value === "string", "invalid string", "value", value);
                        return value;
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "unsupported type", "type", type);
            })
        };
    }
}
function verifyTypedData(domain, types, value, signature) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["recoverAddress"])(TypedDataEncoder.hash(domain, types, value), signature);
} //# sourceMappingURL=typed-data.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/constants/addresses.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 *  A constant for the zero address.
 *
 *  (**i.e.** ``"0x0000000000000000000000000000000000000000"``)
 */ __turbopack_context__.s([
    "ZeroAddress",
    ()=>ZeroAddress
]);
const ZeroAddress = "0x0000000000000000000000000000000000000000"; //# sourceMappingURL=addresses.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/constants/numbers.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 *  A constant for the order N for the secp256k1 curve.
 *
 *  (**i.e.** ``0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n``)
 */ __turbopack_context__.s([
    "MaxInt256",
    ()=>MaxInt256,
    "MaxUint256",
    ()=>MaxUint256,
    "MinInt256",
    ()=>MinInt256,
    "N",
    ()=>N,
    "WeiPerEther",
    ()=>WeiPerEther
]);
const N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
const WeiPerEther = BigInt("1000000000000000000");
const MaxUint256 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
const MinInt256 = BigInt("0x8000000000000000000000000000000000000000000000000000000000000000") * BigInt(-1);
const MaxInt256 = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"); //# sourceMappingURL=numbers.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/constants/hashes.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 *  A constant for the zero hash.
 *
 *  (**i.e.** ``"0x0000000000000000000000000000000000000000000000000000000000000000"``)
 */ __turbopack_context__.s([
    "ZeroHash",
    ()=>ZeroHash
]);
const ZeroHash = "0x0000000000000000000000000000000000000000000000000000000000000000"; //# sourceMappingURL=hashes.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/constants/strings.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// NFKC (composed)             // (decomposed)
/**
 *  A constant for the ether symbol (normalized using NFKC).
 *
 *  (**i.e.** ``"\\u039e"``)
 */ __turbopack_context__.s([
    "EtherSymbol",
    ()=>EtherSymbol,
    "MessagePrefix",
    ()=>MessagePrefix
]);
const EtherSymbol = "\u039e"; // "\uD835\uDF63";
const MessagePrefix = "\x19Ethereum Signed Message:\n"; //# sourceMappingURL=strings.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/accesslist.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "accessListify",
    ()=>accessListify
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
;
;
function accessSetify(addr, storageKeys) {
    return {
        address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(addr),
        storageKeys: storageKeys.map((storageKey, index)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHexString"])(storageKey, 32), "invalid slot", `storageKeys[${index}]`, storageKey);
            return storageKey.toLowerCase();
        })
    };
}
function accessListify(value) {
    if (Array.isArray(value)) {
        return value.map((set, index)=>{
            if (Array.isArray(set)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(set.length === 2, "invalid slot set", `value[${index}]`, set);
                return accessSetify(set[0], set[1]);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(set != null && typeof set === "object", "invalid address-slot set", "value", value);
            return accessSetify(set.address, set.storageKeys);
        });
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(value != null && typeof value === "object", "invalid access list", "value", value);
    const result = Object.keys(value).map((addr)=>{
        const storageKeys = value[addr].reduce((accum, storageKey)=>{
            accum[storageKey] = true;
            return accum;
        }, {});
        return accessSetify(addr, Object.keys(storageKeys).sort());
    });
    result.sort((a, b)=>a.address.localeCompare(b.address));
    return result;
} //# sourceMappingURL=accesslist.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/address.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeAddress",
    ()=>computeAddress,
    "recoverAddress",
    ()=>recoverAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/keccak.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signing$2d$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/signing-key.js [app-ssr] (ecmascript)");
;
;
function computeAddress(key) {
    let pubkey;
    if (typeof key === "string") {
        pubkey = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signing$2d$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SigningKey"].computePublicKey(key, false);
    } else {
        pubkey = key.publicKey;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])("0x" + pubkey.substring(4)).substring(26));
}
function recoverAddress(digest, signature) {
    return computeAddress(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signing$2d$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SigningKey"].recoverPublicKey(digest, signature));
} //# sourceMappingURL=address.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/authorization.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authorizationify",
    ()=>authorizationify
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/signature.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/maths.js [app-ssr] (ecmascript)");
;
;
;
function authorizationify(auth) {
    return {
        address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(auth.address),
        nonce: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(auth.nonce != null ? auth.nonce : 0),
        chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(auth.chainId != null ? auth.chainId : 0),
        signature: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Signature"].from(auth.signature)
    };
} //# sourceMappingURL=authorization.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/transaction.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Transaction",
    ()=>Transaction,
    "splitBlobCells",
    ()=>splitBlobCells
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/constants/addresses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/keccak.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/sha2.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/signature.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signing$2d$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/signing-key.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$decode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/rlp-decode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/rlp-encode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/maths.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$accesslist$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/accesslist.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$authorization$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/authorization.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/address.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const BN_0 = BigInt(0);
const BN_2 = BigInt(2);
const BN_27 = BigInt(27);
const BN_28 = BigInt(28);
const BN_35 = BigInt(35);
const BN_MAX_UINT = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
const inspect = Symbol.for("nodejs.util.inspect.custom");
const BLOB_SIZE = 4096 * 32;
const CELL_COUNT = 128;
function splitBlobCells(_proof, cellCount) {
    if (cellCount == null) {
        cellCount = CELL_COUNT;
    }
    const cellProofs = [];
    const proof = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_proof);
    const cellSize = proof.length / cellCount;
    for(let i = 0; i < proof.length; i += cellSize){
        cellProofs.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(proof.subarray(i, i + cellSize)));
    }
    return cellProofs;
}
function getKzgLibrary(kzg) {
    const blobToKzgCommitment = (blob)=>{
        if ("computeBlobProof" in kzg) {
            // micro-ecc-signer; check for computeBlobProof since this API
            // expects a string while the kzg-wasm below expects a Unit8Array
            if ("blobToKzgCommitment" in kzg && typeof kzg.blobToKzgCommitment === "function") {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(kzg.blobToKzgCommitment((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(blob)));
            }
        } else if ("blobToKzgCommitment" in kzg && typeof kzg.blobToKzgCommitment === "function") {
            // kzg-wasm <0.5.0; blobToKzgCommitment(Uint8Array) => Uint8Array
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(kzg.blobToKzgCommitment(blob));
        }
        // kzg-wasm >= 0.5.0; blobToKZGCommitment(string) => string
        if ("blobToKZGCommitment" in kzg && typeof kzg.blobToKZGCommitment === "function") {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(kzg.blobToKZGCommitment((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(blob)));
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "unsupported KZG library", "kzg", kzg);
    };
    const computeBlobKzgProof = (blob, commitment)=>{
        // micro-ecc-signer
        if ("computeBlobProof" in kzg && typeof kzg.computeBlobProof === "function") {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(kzg.computeBlobProof((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(blob), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(commitment)));
        }
        // kzg-wasm <0.5.0; computeBlobKzgProof(Uint8Array, Uint8Array) => Uint8Array
        if ("computeBlobKzgProof" in kzg && typeof kzg.computeBlobKzgProof === "function") {
            return kzg.computeBlobKzgProof(blob, commitment);
        }
        // kzg-wasm >= 0.5.0; computeBlobKZGProof(string, string) => string
        if ("computeBlobKZGProof" in kzg && typeof kzg.computeBlobKZGProof === "function") {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(kzg.computeBlobKZGProof((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(blob), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(commitment)));
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "unsupported KZG library", "kzg", kzg);
    };
    return {
        blobToKzgCommitment,
        computeBlobKzgProof
    };
}
function getVersionedHash(version, hash) {
    let versioned = version.toString(16);
    while(versioned.length < 2){
        versioned = "0" + versioned;
    }
    versioned += (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sha256"])(hash).substring(4);
    return "0x" + versioned;
}
function handleAddress(value) {
    if (value === "0x") {
        return null;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(value);
}
function handleAccessList(value, param) {
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$accesslist$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["accessListify"])(value);
    } catch (error) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, error.message, param, value);
    }
}
function handleAuthorizationList(value, param) {
    try {
        if (!Array.isArray(value)) {
            throw new Error("authorizationList: invalid array");
        }
        const result = [];
        for(let i = 0; i < value.length; i++){
            const auth = value[i];
            if (!Array.isArray(auth)) {
                throw new Error(`authorization[${i}]: invalid array`);
            }
            if (auth.length !== 6) {
                throw new Error(`authorization[${i}]: wrong length`);
            }
            if (!auth[1]) {
                throw new Error(`authorization[${i}]: null address`);
            }
            result.push({
                address: handleAddress(auth[1]),
                nonce: handleUint(auth[2], "nonce"),
                chainId: handleUint(auth[0], "chainId"),
                signature: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Signature"].from({
                    yParity: handleNumber(auth[3], "yParity"),
                    r: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zeroPadValue"])(auth[4], 32),
                    s: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zeroPadValue"])(auth[5], 32)
                })
            });
        }
        return result;
    } catch (error) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, error.message, param, value);
    }
}
function handleNumber(_value, param) {
    if (_value === "0x") {
        return 0;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNumber"])(_value, param);
}
function handleUint(_value, param) {
    if (_value === "0x") {
        return BN_0;
    }
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(_value, param);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(value <= BN_MAX_UINT, "value exceeds uint size", param, value);
    return value;
}
function formatNumber(_value, name) {
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(_value, "value");
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(value);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(result.length <= 32, `value too large`, `tx.${name}`, value);
    return result;
}
function formatAccessList(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$accesslist$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["accessListify"])(value).map((set)=>[
            set.address,
            set.storageKeys
        ]);
}
function formatAuthorizationList(value) {
    return value.map((a)=>{
        return [
            formatNumber(a.chainId, "chainId"),
            a.address,
            formatNumber(a.nonce, "nonce"),
            formatNumber(a.signature.yParity, "yParity"),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(a.signature.r),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(a.signature._s)
        ];
    });
}
function formatHashes(value, param) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(Array.isArray(value), `invalid ${param}`, "value", value);
    for(let i = 0; i < value.length; i++){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHexString"])(value[i], 32), "invalid ${ param } hash", `value[${i}]`, value[i]);
    }
    return value;
}
function _parseLegacy(data) {
    const fields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$decode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeRlp"])(data);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(Array.isArray(fields) && (fields.length === 9 || fields.length === 6), "invalid field count for legacy transaction", "data", data);
    const tx = {
        type: 0,
        nonce: handleNumber(fields[0], "nonce"),
        gasPrice: handleUint(fields[1], "gasPrice"),
        gasLimit: handleUint(fields[2], "gasLimit"),
        to: handleAddress(fields[3]),
        value: handleUint(fields[4], "value"),
        data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(fields[5]),
        chainId: BN_0
    };
    // Legacy unsigned transaction
    if (fields.length === 6) {
        return tx;
    }
    const v = handleUint(fields[6], "v");
    const r = handleUint(fields[7], "r");
    const s = handleUint(fields[8], "s");
    if (r === BN_0 && s === BN_0) {
        // EIP-155 unsigned transaction
        tx.chainId = v;
    } else {
        // Compute the EIP-155 chain ID (or 0 for legacy)
        let chainId = (v - BN_35) / BN_2;
        if (chainId < BN_0) {
            chainId = BN_0;
        }
        tx.chainId = chainId;
        // Signed Legacy Transaction
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(chainId !== BN_0 || v === BN_27 || v === BN_28, "non-canonical legacy v", "v", fields[6]);
        tx.signature = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Signature"].from({
            r: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zeroPadValue"])(fields[7], 32),
            s: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zeroPadValue"])(fields[8], 32),
            v
        });
    //tx.hash = keccak256(data);
    }
    return tx;
}
function _serializeLegacy(tx, sig) {
    const fields = [
        formatNumber(tx.nonce, "nonce"),
        formatNumber(tx.gasPrice || 0, "gasPrice"),
        formatNumber(tx.gasLimit, "gasLimit"),
        tx.to || "0x",
        formatNumber(tx.value, "value"),
        tx.data
    ];
    let chainId = BN_0;
    if (tx.chainId != BN_0) {
        // A chainId was provided; if non-zero we'll use EIP-155
        chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(tx.chainId, "tx.chainId");
        // We have a chainId in the tx and an EIP-155 v in the signature,
        // make sure they agree with each other
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(!sig || sig.networkV == null || sig.legacyChainId === chainId, "tx.chainId/sig.v mismatch", "sig", sig);
    } else if (tx.signature) {
        // No explicit chainId, but EIP-155 have a derived implicit chainId
        const legacy = tx.signature.legacyChainId;
        if (legacy != null) {
            chainId = legacy;
        }
    }
    // Requesting an unsigned transaction
    if (!sig) {
        // We have an EIP-155 transaction (chainId was specified and non-zero)
        if (chainId !== BN_0) {
            fields.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(chainId));
            fields.push("0x");
            fields.push("0x");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeRlp"])(fields);
    }
    // @TODO: We should probably check that tx.signature, chainId, and sig
    //        match but that logic could break existing code, so schedule
    //        this for the next major bump.
    // Compute the EIP-155 v
    let v = BigInt(27 + sig.yParity);
    if (chainId !== BN_0) {
        v = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Signature"].getChainIdV(chainId, sig.v);
    } else if (BigInt(sig.v) !== v) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "tx.chainId/sig.v mismatch", "sig", sig);
    }
    // Add the signature
    fields.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(v));
    fields.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(sig.r));
    fields.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(sig._s));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeRlp"])(fields);
}
function _parseEipSignature(tx, fields) {
    let yParity;
    try {
        yParity = handleNumber(fields[0], "yParity");
        if (yParity !== 0 && yParity !== 1) {
            throw new Error("bad yParity");
        }
    } catch (error) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "invalid yParity", "yParity", fields[0]);
    }
    const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zeroPadValue"])(fields[1], 32);
    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zeroPadValue"])(fields[2], 32);
    const signature = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Signature"].from({
        r,
        s,
        yParity
    });
    tx.signature = signature;
}
function _parseEip1559(data) {
    const fields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$decode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeRlp"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(data).slice(1));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(Array.isArray(fields) && (fields.length === 9 || fields.length === 12), "invalid field count for transaction type: 2", "data", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(data));
    const tx = {
        type: 2,
        chainId: handleUint(fields[0], "chainId"),
        nonce: handleNumber(fields[1], "nonce"),
        maxPriorityFeePerGas: handleUint(fields[2], "maxPriorityFeePerGas"),
        maxFeePerGas: handleUint(fields[3], "maxFeePerGas"),
        gasPrice: null,
        gasLimit: handleUint(fields[4], "gasLimit"),
        to: handleAddress(fields[5]),
        value: handleUint(fields[6], "value"),
        data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(fields[7]),
        accessList: handleAccessList(fields[8], "accessList")
    };
    // Unsigned EIP-1559 Transaction
    if (fields.length === 9) {
        return tx;
    }
    //tx.hash = keccak256(data);
    _parseEipSignature(tx, fields.slice(9));
    return tx;
}
function _serializeEip1559(tx, sig) {
    const fields = [
        formatNumber(tx.chainId, "chainId"),
        formatNumber(tx.nonce, "nonce"),
        formatNumber(tx.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
        formatNumber(tx.maxFeePerGas || 0, "maxFeePerGas"),
        formatNumber(tx.gasLimit, "gasLimit"),
        tx.to || "0x",
        formatNumber(tx.value, "value"),
        tx.data,
        formatAccessList(tx.accessList || [])
    ];
    if (sig) {
        fields.push(formatNumber(sig.yParity, "yParity"));
        fields.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(sig.r));
        fields.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(sig.s));
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])([
        "0x02",
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeRlp"])(fields)
    ]);
}
function _parseEip2930(data) {
    const fields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$decode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeRlp"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(data).slice(1));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(Array.isArray(fields) && (fields.length === 8 || fields.length === 11), "invalid field count for transaction type: 1", "data", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(data));
    const tx = {
        type: 1,
        chainId: handleUint(fields[0], "chainId"),
        nonce: handleNumber(fields[1], "nonce"),
        gasPrice: handleUint(fields[2], "gasPrice"),
        gasLimit: handleUint(fields[3], "gasLimit"),
        to: handleAddress(fields[4]),
        value: handleUint(fields[5], "value"),
        data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(fields[6]),
        accessList: handleAccessList(fields[7], "accessList")
    };
    // Unsigned EIP-2930 Transaction
    if (fields.length === 8) {
        return tx;
    }
    //tx.hash = keccak256(data);
    _parseEipSignature(tx, fields.slice(8));
    return tx;
}
function _serializeEip2930(tx, sig) {
    const fields = [
        formatNumber(tx.chainId, "chainId"),
        formatNumber(tx.nonce, "nonce"),
        formatNumber(tx.gasPrice || 0, "gasPrice"),
        formatNumber(tx.gasLimit, "gasLimit"),
        tx.to || "0x",
        formatNumber(tx.value, "value"),
        tx.data,
        formatAccessList(tx.accessList || [])
    ];
    if (sig) {
        fields.push(formatNumber(sig.yParity, "recoveryParam"));
        fields.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(sig.r));
        fields.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(sig.s));
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])([
        "0x01",
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeRlp"])(fields)
    ]);
}
function _parseEip4844(data) {
    let fields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$decode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeRlp"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(data).slice(1));
    let typeName = "3";
    let blobWrapperVersion = null;
    let blobs = null;
    // Parse the network format
    if (fields.length === 4 && Array.isArray(fields[0])) {
        // EIP-4844 format with sidecar
        typeName = "3 (network format)";
        const fBlobs = fields[1], fCommits = fields[2], fProofs = fields[3];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(Array.isArray(fBlobs), "invalid network format: blobs not an array", "fields[1]", fBlobs);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(Array.isArray(fCommits), "invalid network format: commitments not an array", "fields[2]", fCommits);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(Array.isArray(fProofs), "invalid network format: proofs not an array", "fields[3]", fProofs);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(fBlobs.length === fCommits.length, "invalid network format: blobs/commitments length mismatch", "fields", fields);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(fBlobs.length === fProofs.length, "invalid network format: blobs/proofs length mismatch", "fields", fields);
        blobs = [];
        for(let i = 0; i < fields[1].length; i++){
            blobs.push({
                data: fBlobs[i],
                commitment: fCommits[i],
                proof: fProofs[i]
            });
        }
        fields = fields[0];
    } else if (fields.length === 5 && Array.isArray(fields[0])) {
        // EIP-7594 format with sidecar
        typeName = "3 (EIP-7594 network format)";
        blobWrapperVersion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNumber"])(fields[1]);
        const fBlobs = fields[2], fCommits = fields[3], fProofs = fields[4];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(blobWrapperVersion === 1, `unsupported EIP-7594 network format version: ${blobWrapperVersion}`, "fields[1]", blobWrapperVersion);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(Array.isArray(fBlobs), "invalid EIP-7594 network format: blobs not an array", "fields[2]", fBlobs);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(Array.isArray(fCommits), "invalid EIP-7594 network format: commitments not an array", "fields[3]", fCommits);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(Array.isArray(fProofs), "invalid EIP-7594 network format: proofs not an array", "fields[4]", fProofs);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(fBlobs.length === fCommits.length, "invalid network format: blobs/commitments length mismatch", "fields", fields);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(fBlobs.length * CELL_COUNT === fProofs.length, "invalid network format: blobs/proofs length mismatch", "fields", fields);
        blobs = [];
        for(let i = 0; i < fBlobs.length; i++){
            const proof = [];
            for(let j = 0; j < CELL_COUNT; j++){
                proof.push(fProofs[i * CELL_COUNT + j]);
            }
            blobs.push({
                data: fBlobs[i],
                commitment: fCommits[i],
                proof: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])(proof)
            });
        }
        fields = fields[0];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(Array.isArray(fields) && (fields.length === 11 || fields.length === 14), `invalid field count for transaction type: ${typeName}`, "data", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(data));
    const tx = {
        type: 3,
        chainId: handleUint(fields[0], "chainId"),
        nonce: handleNumber(fields[1], "nonce"),
        maxPriorityFeePerGas: handleUint(fields[2], "maxPriorityFeePerGas"),
        maxFeePerGas: handleUint(fields[3], "maxFeePerGas"),
        gasPrice: null,
        gasLimit: handleUint(fields[4], "gasLimit"),
        to: handleAddress(fields[5]),
        value: handleUint(fields[6], "value"),
        data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(fields[7]),
        accessList: handleAccessList(fields[8], "accessList"),
        maxFeePerBlobGas: handleUint(fields[9], "maxFeePerBlobGas"),
        blobVersionedHashes: fields[10],
        blobWrapperVersion
    };
    if (blobs) {
        tx.blobs = blobs;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(tx.to != null, `invalid address for transaction type: ${typeName}`, "data", data);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(Array.isArray(tx.blobVersionedHashes), "invalid blobVersionedHashes: must be an array", "data", data);
    for(let i = 0; i < tx.blobVersionedHashes.length; i++){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHexString"])(tx.blobVersionedHashes[i], 32), `invalid blobVersionedHash at index ${i}: must be length 32`, "data", data);
    }
    // Unsigned EIP-4844 Transaction
    if (fields.length === 11) {
        return tx;
    }
    // @TODO: Do we need to do this? This is only called internally
    // and used to verify hashes; it might save time to not do this
    //tx.hash = keccak256(concat([ "0x03", encodeRlp(fields) ]));
    _parseEipSignature(tx, fields.slice(11));
    return tx;
}
function _serializeEip4844(tx, sig, blobs) {
    const fields = [
        formatNumber(tx.chainId, "chainId"),
        formatNumber(tx.nonce, "nonce"),
        formatNumber(tx.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
        formatNumber(tx.maxFeePerGas || 0, "maxFeePerGas"),
        formatNumber(tx.gasLimit, "gasLimit"),
        tx.to || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZeroAddress"],
        formatNumber(tx.value, "value"),
        tx.data,
        formatAccessList(tx.accessList || []),
        formatNumber(tx.maxFeePerBlobGas || 0, "maxFeePerBlobGas"),
        formatHashes(tx.blobVersionedHashes || [], "blobVersionedHashes")
    ];
    if (sig) {
        fields.push(formatNumber(sig.yParity, "yParity"));
        fields.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(sig.r));
        fields.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(sig.s));
        // We have blobs; return the network wrapped format
        if (blobs) {
            // Use EIP-7594
            if (tx.blobWrapperVersion != null) {
                const wrapperVersion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(tx.blobWrapperVersion);
                const cellProofs = [];
                for (const { proof } of blobs){
                    const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(proof);
                    const cellSize = p.length / CELL_COUNT;
                    for(let i = 0; i < p.length; i += cellSize){
                        cellProofs.push(p.subarray(i, i + cellSize));
                    }
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])([
                    "0x03",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeRlp"])([
                        fields,
                        wrapperVersion,
                        blobs.map((b)=>b.data),
                        blobs.map((b)=>b.commitment),
                        cellProofs
                    ])
                ]);
            }
            // Fall back onto classic EIP-4844 behavior
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])([
                "0x03",
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeRlp"])([
                    fields,
                    blobs.map((b)=>b.data),
                    blobs.map((b)=>b.commitment),
                    blobs.map((b)=>b.proof)
                ])
            ]);
        }
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])([
        "0x03",
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeRlp"])(fields)
    ]);
}
function _parseEip7702(data) {
    const fields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$decode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeRlp"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(data).slice(1));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(Array.isArray(fields) && (fields.length === 10 || fields.length === 13), "invalid field count for transaction type: 4", "data", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(data));
    const tx = {
        type: 4,
        chainId: handleUint(fields[0], "chainId"),
        nonce: handleNumber(fields[1], "nonce"),
        maxPriorityFeePerGas: handleUint(fields[2], "maxPriorityFeePerGas"),
        maxFeePerGas: handleUint(fields[3], "maxFeePerGas"),
        gasPrice: null,
        gasLimit: handleUint(fields[4], "gasLimit"),
        to: handleAddress(fields[5]),
        value: handleUint(fields[6], "value"),
        data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(fields[7]),
        accessList: handleAccessList(fields[8], "accessList"),
        authorizationList: handleAuthorizationList(fields[9], "authorizationList")
    };
    // Unsigned EIP-7702 Transaction
    if (fields.length === 10) {
        return tx;
    }
    _parseEipSignature(tx, fields.slice(10));
    return tx;
}
function _serializeEip7702(tx, sig) {
    const fields = [
        formatNumber(tx.chainId, "chainId"),
        formatNumber(tx.nonce, "nonce"),
        formatNumber(tx.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
        formatNumber(tx.maxFeePerGas || 0, "maxFeePerGas"),
        formatNumber(tx.gasLimit, "gasLimit"),
        tx.to || "0x",
        formatNumber(tx.value, "value"),
        tx.data,
        formatAccessList(tx.accessList || []),
        formatAuthorizationList(tx.authorizationList || [])
    ];
    if (sig) {
        fields.push(formatNumber(sig.yParity, "yParity"));
        fields.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(sig.r));
        fields.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"])(sig.s));
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])([
        "0x04",
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeRlp"])(fields)
    ]);
}
class Transaction {
    #type;
    #to;
    #data;
    #nonce;
    #gasLimit;
    #gasPrice;
    #maxPriorityFeePerGas;
    #maxFeePerGas;
    #value;
    #chainId;
    #sig;
    #accessList;
    #maxFeePerBlobGas;
    #blobVersionedHashes;
    #kzg;
    #blobs;
    #auths;
    #blobWrapperVersion;
    /**
     *  The transaction type.
     *
     *  If null, the type will be automatically inferred based on
     *  explicit properties.
     */ get type() {
        return this.#type;
    }
    set type(value) {
        switch(value){
            case null:
                this.#type = null;
                break;
            case 0:
            case "legacy":
                this.#type = 0;
                break;
            case 1:
            case "berlin":
            case "eip-2930":
                this.#type = 1;
                break;
            case 2:
            case "london":
            case "eip-1559":
                this.#type = 2;
                break;
            case 3:
            case "cancun":
            case "eip-4844":
                this.#type = 3;
                break;
            case 4:
            case "pectra":
            case "eip-7702":
                this.#type = 4;
                break;
            default:
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "unsupported transaction type", "type", value);
        }
    }
    /**
     *  The name of the transaction type.
     */ get typeName() {
        switch(this.type){
            case 0:
                return "legacy";
            case 1:
                return "eip-2930";
            case 2:
                return "eip-1559";
            case 3:
                return "eip-4844";
            case 4:
                return "eip-7702";
        }
        return null;
    }
    /**
     *  The ``to`` address for the transaction or ``null`` if the
     *  transaction is an ``init`` transaction.
     */ get to() {
        const value = this.#to;
        if (value == null && this.type === 3) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZeroAddress"];
        }
        return value;
    }
    set to(value) {
        this.#to = value == null ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(value);
    }
    /**
     *  The transaction nonce.
     */ get nonce() {
        return this.#nonce;
    }
    set nonce(value) {
        this.#nonce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNumber"])(value, "value");
    }
    /**
     *  The gas limit.
     */ get gasLimit() {
        return this.#gasLimit;
    }
    set gasLimit(value) {
        this.#gasLimit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(value);
    }
    /**
     *  The gas price.
     *
     *  On legacy networks this defines the fee that will be paid. On
     *  EIP-1559 networks, this should be ``null``.
     */ get gasPrice() {
        const value = this.#gasPrice;
        if (value == null && (this.type === 0 || this.type === 1)) {
            return BN_0;
        }
        return value;
    }
    set gasPrice(value) {
        this.#gasPrice = value == null ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(value, "gasPrice");
    }
    /**
     *  The maximum priority fee per unit of gas to pay. On legacy
     *  networks this should be ``null``.
     */ get maxPriorityFeePerGas() {
        const value = this.#maxPriorityFeePerGas;
        if (value == null) {
            if (this.type === 2 || this.type === 3) {
                return BN_0;
            }
            return null;
        }
        return value;
    }
    set maxPriorityFeePerGas(value) {
        this.#maxPriorityFeePerGas = value == null ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(value, "maxPriorityFeePerGas");
    }
    /**
     *  The maximum total fee per unit of gas to pay. On legacy
     *  networks this should be ``null``.
     */ get maxFeePerGas() {
        const value = this.#maxFeePerGas;
        if (value == null) {
            if (this.type === 2 || this.type === 3) {
                return BN_0;
            }
            return null;
        }
        return value;
    }
    set maxFeePerGas(value) {
        this.#maxFeePerGas = value == null ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(value, "maxFeePerGas");
    }
    /**
     *  The transaction data. For ``init`` transactions this is the
     *  deployment code.
     */ get data() {
        return this.#data;
    }
    set data(value) {
        this.#data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(value);
    }
    /**
     *  The amount of ether (in wei) to send in this transactions.
     */ get value() {
        return this.#value;
    }
    set value(value) {
        this.#value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(value, "value");
    }
    /**
     *  The chain ID this transaction is valid on.
     */ get chainId() {
        return this.#chainId;
    }
    set chainId(value) {
        this.#chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(value);
    }
    /**
     *  If signed, the signature for this transaction.
     */ get signature() {
        return this.#sig || null;
    }
    set signature(value) {
        this.#sig = value == null ? null : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Signature"].from(value);
    }
    isValid() {
        const sig = this.signature;
        if (sig && !sig.isValid()) {
            return false;
        }
        const auths = this.authorizationList;
        if (auths) {
            for (const auth of auths){
                if (!auth.signature.isValid()) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     *  The access list.
     *
     *  An access list permits discounted (but pre-paid) access to
     *  bytecode and state variable access within contract execution.
     */ get accessList() {
        const value = this.#accessList || null;
        if (value == null) {
            if (this.type === 1 || this.type === 2 || this.type === 3) {
                // @TODO: in v7, this should assign the value or become
                // a live object itself, otherwise mutation is inconsistent
                return [];
            }
            return null;
        }
        return value;
    }
    set accessList(value) {
        this.#accessList = value == null ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$accesslist$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["accessListify"])(value);
    }
    get authorizationList() {
        const value = this.#auths || null;
        if (value == null) {
            if (this.type === 4) {
                // @TODO: in v7, this should become a live object itself,
                // otherwise mutation is inconsistent
                return [];
            }
        }
        return value;
    }
    set authorizationList(auths) {
        this.#auths = auths == null ? null : auths.map((a)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$authorization$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorizationify"])(a));
    }
    /**
     *  The max fee per blob gas for Cancun transactions.
     */ get maxFeePerBlobGas() {
        const value = this.#maxFeePerBlobGas;
        if (value == null && this.type === 3) {
            return BN_0;
        }
        return value;
    }
    set maxFeePerBlobGas(value) {
        this.#maxFeePerBlobGas = value == null ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(value, "maxFeePerBlobGas");
    }
    /**
     *  The BLOb versioned hashes for Cancun transactions.
     */ get blobVersionedHashes() {
        // @TODO: Mutation is inconsistent; if unset, the returned value
        // cannot mutate the object, if set it can
        let value = this.#blobVersionedHashes;
        if (value == null && this.type === 3) {
            return [];
        }
        return value;
    }
    set blobVersionedHashes(value) {
        if (value != null) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(Array.isArray(value), "blobVersionedHashes must be an Array", "value", value);
            value = value.slice();
            for(let i = 0; i < value.length; i++){
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHexString"])(value[i], 32), "invalid blobVersionedHash", `value[${i}]`, value[i]);
            }
        }
        this.#blobVersionedHashes = value;
    }
    /**
     *  The BLObs for the Transaction, if any.
     *
     *  If ``blobs`` is non-``null``, then the [[seriailized]]
     *  will return the network formatted sidecar, otherwise it
     *  will return the standard [[link-eip-2718]] payload. The
     *  [[unsignedSerialized]] is unaffected regardless.
     *
     *  When setting ``blobs``, either fully valid [[Blob]] objects
     *  may be specified (i.e. correctly padded, with correct
     *  committments and proofs) or a raw [[BytesLike]] may
     *  be provided.
     *
     *  If raw [[BytesLike]] are provided, the [[kzg]] property **must**
     *  be already set. The blob will be correctly padded and the
     *  [[KzgLibrary]] will be used to compute the committment and
     *  proof for the blob.
     *
     *  A BLOb is a sequence of field elements, each of which must
     *  be within the BLS field modulo, so some additional processing
     *  may be required to encode arbitrary data to ensure each 32 byte
     *  field is within the valid range.
     *
     *  Setting this automatically populates [[blobVersionedHashes]],
     *  overwriting any existing values. Setting this to ``null``
     *  does **not** remove the [[blobVersionedHashes]], leaving them
     *  present.
     */ get blobs() {
        if (this.#blobs == null) {
            return null;
        }
        return this.#blobs.map((b)=>Object.assign({}, b));
    }
    set blobs(_blobs) {
        if (_blobs == null) {
            this.#blobs = null;
            return;
        }
        const blobs = [];
        const versionedHashes = [];
        for(let i = 0; i < _blobs.length; i++){
            const blob = _blobs[i];
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isBytesLike"])(blob)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(this.#kzg, "adding a raw blob requires a KZG library", "UNSUPPORTED_OPERATION", {
                    operation: "set blobs()"
                });
                let data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(blob);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(data.length <= BLOB_SIZE, "blob is too large", `blobs[${i}]`, blob);
                // Pad blob if necessary
                if (data.length !== BLOB_SIZE) {
                    const padded = new Uint8Array(BLOB_SIZE);
                    padded.set(data);
                    data = padded;
                }
                const commit = this.#kzg.blobToKzgCommitment(data);
                const proof = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(this.#kzg.computeBlobKzgProof(data, commit));
                blobs.push({
                    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(data),
                    commitment: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(commit),
                    proof
                });
                versionedHashes.push(getVersionedHash(1, commit));
            } else {
                const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(blob.data);
                const commitment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(blob.commitment);
                const proof = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(blob.proof);
                blobs.push({
                    data,
                    commitment,
                    proof
                });
                versionedHashes.push(getVersionedHash(1, commitment));
            }
        }
        this.#blobs = blobs;
        this.#blobVersionedHashes = versionedHashes;
    }
    get kzg() {
        return this.#kzg;
    }
    set kzg(kzg) {
        if (kzg == null) {
            this.#kzg = null;
        } else {
            this.#kzg = getKzgLibrary(kzg);
        }
    }
    get blobWrapperVersion() {
        return this.#blobWrapperVersion;
    }
    set blobWrapperVersion(value) {
        this.#blobWrapperVersion = value;
    }
    /**
     *  Creates a new Transaction with default values.
     */ constructor(){
        this.#type = null;
        this.#to = null;
        this.#nonce = 0;
        this.#gasLimit = BN_0;
        this.#gasPrice = null;
        this.#maxPriorityFeePerGas = null;
        this.#maxFeePerGas = null;
        this.#data = "0x";
        this.#value = BN_0;
        this.#chainId = BN_0;
        this.#sig = null;
        this.#accessList = null;
        this.#maxFeePerBlobGas = null;
        this.#blobVersionedHashes = null;
        this.#kzg = null;
        this.#blobs = null;
        this.#auths = null;
        this.#blobWrapperVersion = null;
    }
    /**
     *  The transaction hash, if signed. Otherwise, ``null``.
     */ get hash() {
        if (this.signature == null) {
            return null;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])(this.#getSerialized(true, false));
    }
    /**
     *  The pre-image hash of this transaction.
     *
     *  This is the digest that a [[Signer]] must sign to authorize
     *  this transaction.
     */ get unsignedHash() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])(this.unsignedSerialized);
    }
    /**
     *  The sending address, if signed. Otherwise, ``null``.
     */ get from() {
        if (this.signature == null) {
            return null;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["recoverAddress"])(this.unsignedHash, this.signature.getCanonical());
    }
    /**
     *  The public key of the sender, if signed. Otherwise, ``null``.
     */ get fromPublicKey() {
        if (this.signature == null) {
            return null;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signing$2d$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SigningKey"].recoverPublicKey(this.unsignedHash, this.signature.getCanonical());
    }
    /**
     *  Returns true if signed.
     *
     *  This provides a Type Guard that properties requiring a signed
     *  transaction are non-null.
     */ isSigned() {
        return this.signature != null;
    }
    #getSerialized(signed, sidecar) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(!signed || this.signature != null, "cannot serialize unsigned transaction; maybe you meant .unsignedSerialized", "UNSUPPORTED_OPERATION", {
            operation: ".serialized"
        });
        const sig = signed ? this.signature : null;
        switch(this.inferType()){
            case 0:
                return _serializeLegacy(this, sig);
            case 1:
                return _serializeEip2930(this, sig);
            case 2:
                return _serializeEip1559(this, sig);
            case 3:
                return _serializeEip4844(this, sig, sidecar ? this.blobs : null);
            case 4:
                return _serializeEip7702(this, sig);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(false, "unsupported transaction type", "UNSUPPORTED_OPERATION", {
            operation: ".serialized"
        });
    }
    /**
     *  The serialized transaction.
     *
     *  This throws if the transaction is unsigned. For the pre-image,
     *  use [[unsignedSerialized]].
     */ get serialized() {
        return this.#getSerialized(true, true);
    }
    /**
     *  The transaction pre-image.
     *
     *  The hash of this is the digest which needs to be signed to
     *  authorize this transaction.
     */ get unsignedSerialized() {
        return this.#getSerialized(false, false);
    }
    /**
     *  Return the most "likely" type; currently the highest
     *  supported transaction type.
     */ inferType() {
        const types = this.inferTypes();
        // Prefer London (EIP-1559) over Cancun (BLOb)
        if (types.indexOf(2) >= 0) {
            return 2;
        }
        // Return the highest inferred type
        return types.pop();
    }
    /**
     *  Validates the explicit properties and returns a list of compatible
     *  transaction types.
     */ inferTypes() {
        // Checks that there are no conflicting properties set
        const hasGasPrice = this.gasPrice != null;
        const hasFee = this.maxFeePerGas != null || this.maxPriorityFeePerGas != null;
        const hasAccessList = this.accessList != null;
        const hasBlob = this.#maxFeePerBlobGas != null || this.#blobVersionedHashes;
        //if (hasGasPrice && hasFee) {
        //    throw new Error("transaction cannot have gasPrice and maxFeePerGas");
        //}
        if (this.maxFeePerGas != null && this.maxPriorityFeePerGas != null) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(this.maxFeePerGas >= this.maxPriorityFeePerGas, "priorityFee cannot be more than maxFee", "BAD_DATA", {
                value: this
            });
        }
        //if (this.type === 2 && hasGasPrice) {
        //    throw new Error("eip-1559 transaction cannot have gasPrice");
        //}
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(!hasFee || this.type !== 0 && this.type !== 1, "transaction type cannot have maxFeePerGas or maxPriorityFeePerGas", "BAD_DATA", {
            value: this
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(this.type !== 0 || !hasAccessList, "legacy transaction cannot have accessList", "BAD_DATA", {
            value: this
        });
        const types = [];
        // Explicit type
        if (this.type != null) {
            types.push(this.type);
        } else {
            if (this.authorizationList && this.authorizationList.length) {
                types.push(4);
            } else if (hasFee) {
                types.push(2);
            } else if (hasGasPrice) {
                types.push(1);
                if (!hasAccessList) {
                    types.push(0);
                }
            } else if (hasAccessList) {
                types.push(1);
                types.push(2);
            } else if (hasBlob && this.to) {
                types.push(3);
            } else {
                types.push(0);
                types.push(1);
                types.push(2);
                types.push(3);
            }
        }
        types.sort();
        return types;
    }
    /**
     *  Returns true if this transaction is a legacy transaction (i.e.
     *  ``type === 0``).
     *
     *  This provides a Type Guard that the related properties are
     *  non-null.
     */ isLegacy() {
        return this.type === 0;
    }
    /**
     *  Returns true if this transaction is berlin hardform transaction (i.e.
     *  ``type === 1``).
     *
     *  This provides a Type Guard that the related properties are
     *  non-null.
     */ isBerlin() {
        return this.type === 1;
    }
    /**
     *  Returns true if this transaction is london hardform transaction (i.e.
     *  ``type === 2``).
     *
     *  This provides a Type Guard that the related properties are
     *  non-null.
     */ isLondon() {
        return this.type === 2;
    }
    /**
     *  Returns true if this transaction is an [[link-eip-4844]] BLOB
     *  transaction.
     *
     *  This provides a Type Guard that the related properties are
     *  non-null.
     */ isCancun() {
        return this.type === 3;
    }
    /**
     *  Create a copy of this transaciton.
     */ clone() {
        return Transaction.from(this);
    }
    /**
     *  Return a JSON-friendly object.
     */ toJSON() {
        const s = (v)=>{
            if (v == null) {
                return null;
            }
            return v.toString();
        };
        return {
            type: this.type,
            to: this.to,
            //            from: this.from,
            data: this.data,
            nonce: this.nonce,
            gasLimit: s(this.gasLimit),
            gasPrice: s(this.gasPrice),
            maxPriorityFeePerGas: s(this.maxPriorityFeePerGas),
            maxFeePerGas: s(this.maxFeePerGas),
            value: s(this.value),
            chainId: s(this.chainId),
            sig: this.signature ? this.signature.toJSON() : null,
            accessList: this.accessList
        };
    }
    [inspect]() {
        return this.toString();
    }
    toString() {
        const output = [];
        const add = (key)=>{
            let value = this[key];
            if (typeof value === "string") {
                value = JSON.stringify(value);
            }
            output.push(`${key}: ${value}`);
        };
        if (this.type) {
            add("type");
        }
        add("to");
        add("data");
        add("nonce");
        add("gasLimit");
        add("value");
        if (this.chainId != null) {
            add("chainId");
        }
        if (this.signature) {
            add("from");
            output.push(`signature: ${this.signature.toString()}`);
        }
        // @TODO: accessList
        // @TODO: blobs (might make output huge; maybe just include a flag?)
        const auths = this.authorizationList;
        if (auths) {
            const outputAuths = [];
            for (const auth of auths){
                const o = [];
                o.push(`address: ${JSON.stringify(auth.address)}`);
                if (auth.nonce != null) {
                    o.push(`nonce: ${auth.nonce}`);
                }
                if (auth.chainId != null) {
                    o.push(`chainId: ${auth.chainId}`);
                }
                if (auth.signature) {
                    o.push(`signature: ${auth.signature.toString()}`);
                }
                outputAuths.push(`Authorization { ${o.join(", ")} }`);
            }
            output.push(`authorizations: [ ${outputAuths.join(", ")} ]`);
        }
        return `Transaction { ${output.join(", ")} }`;
    }
    /**
     *  Create a **Transaction** from a serialized transaction or a
     *  Transaction-like object.
     */ static from(tx) {
        if (tx == null) {
            return new Transaction();
        }
        if (typeof tx === "string") {
            const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(tx);
            if (payload[0] >= 0x7f) {
                return Transaction.from(_parseLegacy(payload));
            }
            switch(payload[0]){
                case 1:
                    return Transaction.from(_parseEip2930(payload));
                case 2:
                    return Transaction.from(_parseEip1559(payload));
                case 3:
                    return Transaction.from(_parseEip4844(payload));
                case 4:
                    return Transaction.from(_parseEip7702(payload));
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(false, "unsupported transaction type", "UNSUPPORTED_OPERATION", {
                operation: "from"
            });
        }
        const result = new Transaction();
        if (tx.type != null) {
            result.type = tx.type;
        }
        if (tx.to != null) {
            result.to = tx.to;
        }
        if (tx.nonce != null) {
            result.nonce = tx.nonce;
        }
        if (tx.gasLimit != null) {
            result.gasLimit = tx.gasLimit;
        }
        if (tx.gasPrice != null) {
            result.gasPrice = tx.gasPrice;
        }
        if (tx.maxPriorityFeePerGas != null) {
            result.maxPriorityFeePerGas = tx.maxPriorityFeePerGas;
        }
        if (tx.maxFeePerGas != null) {
            result.maxFeePerGas = tx.maxFeePerGas;
        }
        if (tx.maxFeePerBlobGas != null) {
            result.maxFeePerBlobGas = tx.maxFeePerBlobGas;
        }
        if (tx.data != null) {
            result.data = tx.data;
        }
        if (tx.value != null) {
            result.value = tx.value;
        }
        if (tx.chainId != null) {
            result.chainId = tx.chainId;
        }
        if (tx.signature != null) {
            result.signature = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Signature"].from(tx.signature);
        }
        if (tx.accessList != null) {
            result.accessList = tx.accessList;
        }
        if (tx.authorizationList != null) {
            result.authorizationList = tx.authorizationList;
        }
        // This will get overwritten by blobs, if present
        if (tx.blobVersionedHashes != null) {
            result.blobVersionedHashes = tx.blobVersionedHashes;
        }
        // Make sure we assign the kzg before assigning blobs, which
        // require the library in the event raw blob data is provided.
        if (tx.kzg != null) {
            result.kzg = tx.kzg;
        }
        if (tx.blobWrapperVersion != null) {
            result.blobWrapperVersion = tx.blobWrapperVersion;
        }
        if (tx.blobs != null) {
            result.blobs = tx.blobs;
        }
        if (tx.hash != null) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(result.isSigned(), "unsigned transaction cannot define '.hash'", "tx", tx);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(result.hash === tx.hash, "hash mismatch", "tx", tx);
        }
        if (tx.from != null) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(result.isSigned(), "unsigned transaction cannot define '.from'", "tx", tx);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(result.from.toLowerCase() === (tx.from || "").toLowerCase(), "from mismatch", "tx", tx);
        }
        return result;
    }
} //# sourceMappingURL=transaction.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/contract/wrappers.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContractEventPayload",
    ()=>ContractEventPayload,
    "ContractTransactionReceipt",
    ()=>ContractTransactionReceipt,
    "ContractTransactionResponse",
    ()=>ContractTransactionResponse,
    "ContractUnknownEventPayload",
    ()=>ContractUnknownEventPayload,
    "EventLog",
    ()=>EventLog,
    "UndecodedEventLog",
    ()=>UndecodedEventLog
]);
// import from provider.ts instead of index.ts to prevent circular dep
// from EtherscanProvider
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/events.js [app-ssr] (ecmascript)");
;
;
class EventLog extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Log"] {
    /**
     *  The Contract Interface.
     */ interface;
    /**
     *  The matching event.
     */ fragment;
    /**
     *  The parsed arguments passed to the event by ``emit``.
     */ args;
    /**
     * @_ignore:
     */ constructor(log, iface, fragment){
        super(log, log.provider);
        const args = iface.decodeEventLog(fragment, log.data, log.topics);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            args,
            fragment,
            interface: iface
        });
    }
    /**
     *  The name of the event.
     */ get eventName() {
        return this.fragment.name;
    }
    /**
     *  The signature of the event.
     */ get eventSignature() {
        return this.fragment.format();
    }
}
class UndecodedEventLog extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Log"] {
    /**
     *  The error encounted when trying to decode the log.
     */ error;
    /**
     * @_ignore:
     */ constructor(log, error){
        super(log, log.provider);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            error
        });
    }
}
class ContractTransactionReceipt extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TransactionReceipt"] {
    #iface;
    /**
     *  @_ignore:
     */ constructor(iface, provider, tx){
        super(tx, provider);
        this.#iface = iface;
    }
    /**
     *  The parsed logs for any [[Log]] which has a matching event in the
     *  Contract ABI.
     */ get logs() {
        return super.logs.map((log)=>{
            const fragment = log.topics.length ? this.#iface.getEvent(log.topics[0]) : null;
            if (fragment) {
                try {
                    return new EventLog(log, this.#iface, fragment);
                } catch (error) {
                    return new UndecodedEventLog(log, error);
                }
            }
            return log;
        });
    }
}
class ContractTransactionResponse extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TransactionResponse"] {
    #iface;
    /**
     *  @_ignore:
     */ constructor(iface, provider, tx){
        super(tx, provider);
        this.#iface = iface;
    }
    /**
     *  Resolves once this transaction has been mined and has
     *  %%confirms%% blocks including it (default: ``1``) with an
     *  optional %%timeout%%.
     *
     *  This can resolve to ``null`` only if %%confirms%% is ``0``
     *  and the transaction has not been mined, otherwise this will
     *  wait until enough confirmations have completed.
     */ async wait(confirms, timeout) {
        const receipt = await super.wait(confirms, timeout);
        if (receipt == null) {
            return null;
        }
        return new ContractTransactionReceipt(this.#iface, this.provider, receipt);
    }
}
class ContractUnknownEventPayload extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EventPayload"] {
    /**
     *  The log with no matching events.
     */ log;
    /**
     *  @_event:
     */ constructor(contract, listener, filter, log){
        super(contract, listener, filter);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            log
        });
    }
    /**
     *  Resolves to the block the event occured in.
     */ async getBlock() {
        return await this.log.getBlock();
    }
    /**
     *  Resolves to the transaction the event occured in.
     */ async getTransaction() {
        return await this.log.getTransaction();
    }
    /**
     *  Resolves to the transaction receipt the event occured in.
     */ async getTransactionReceipt() {
        return await this.log.getTransactionReceipt();
    }
}
class ContractEventPayload extends ContractUnknownEventPayload {
    /**
     *  @_ignore:
     */ constructor(contract, listener, filter, fragment, _log){
        super(contract, listener, filter, new EventLog(_log, contract.interface, fragment));
        const args = contract.interface.decodeEventLog(fragment, this.log.data, this.log.topics);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            args,
            fragment
        });
    }
    /**
     *  The event name.
     */ get eventName() {
        return this.fragment.name;
    }
    /**
     *  The event signature.
     */ get eventSignature() {
        return this.fragment.format();
    }
} //# sourceMappingURL=wrappers.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/contract/contract.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseContract",
    ()=>BaseContract,
    "Contract",
    ()=>Contract,
    "copyOverrides",
    ()=>copyOverrides,
    "resolveArgs",
    ()=>resolveArgs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$interface$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/abi/interface.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$typed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/abi/typed.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/checks.js [app-ssr] (ecmascript)");
// import from provider.ts instead of index.ts to prevent circular dep
// from EtherscanProvider
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/maths.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$wrappers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/contract/wrappers.js [app-ssr] (ecmascript)");
;
;
;
;
;
const BN_0 = BigInt(0);
function canCall(value) {
    return value && typeof value.call === "function";
}
function canEstimate(value) {
    return value && typeof value.estimateGas === "function";
}
function canResolve(value) {
    return value && typeof value.resolveName === "function";
}
function canSend(value) {
    return value && typeof value.sendTransaction === "function";
}
function getResolver(value) {
    if (value != null) {
        if (canResolve(value)) {
            return value;
        }
        if (value.provider) {
            return value.provider;
        }
    }
    return undefined;
}
class PreparedTopicFilter {
    #filter;
    fragment;
    constructor(contract, fragment, args){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            fragment
        });
        if (fragment.inputs.length < args.length) {
            throw new Error("too many arguments");
        }
        // Recursively descend into args and resolve any addresses
        const runner = getRunner(contract.runner, "resolveName");
        const resolver = canResolve(runner) ? runner : null;
        this.#filter = async function() {
            const resolvedArgs = await Promise.all(fragment.inputs.map((param, index)=>{
                const arg = args[index];
                if (arg == null) {
                    return null;
                }
                return param.walkAsync(args[index], (type, value)=>{
                    if (type === "address") {
                        if (Array.isArray(value)) {
                            return Promise.all(value.map((v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAddress"])(v, resolver)));
                        }
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAddress"])(value, resolver);
                    }
                    return value;
                });
            }));
            return contract.interface.encodeFilterTopics(fragment, resolvedArgs);
        }();
    }
    getTopicFilter() {
        return this.#filter;
    }
}
// A = Arguments passed in as a tuple
// R = The result type of the call (i.e. if only one return type,
//     the qualified type, otherwise Result)
// D = The type the default call will return (i.e. R for view/pure,
//     TransactionResponse otherwise)
//export interface ContractMethod<A extends Array<any> = Array<any>, R = any, D extends R | ContractTransactionResponse = ContractTransactionResponse> {
function getRunner(value, feature) {
    if (value == null) {
        return null;
    }
    if (typeof value[feature] === "function") {
        return value;
    }
    if (value.provider && typeof value.provider[feature] === "function") {
        return value.provider;
    }
    return null;
}
function getProvider(value) {
    if (value == null) {
        return null;
    }
    return value.provider || null;
}
async function copyOverrides(arg, allowed) {
    // Make sure the overrides passed in are a valid overrides object
    const _overrides = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$typed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Typed"].dereference(arg, "overrides");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(typeof _overrides === "object", "invalid overrides parameter", "overrides", arg);
    // Create a shallow copy (we'll deep-ify anything needed during normalizing)
    const overrides = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["copyRequest"])(_overrides);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(overrides.to == null || (allowed || []).indexOf("to") >= 0, "cannot override to", "overrides.to", overrides.to);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(overrides.data == null || (allowed || []).indexOf("data") >= 0, "cannot override data", "overrides.data", overrides.data);
    // Resolve any from
    if (overrides.from) {
        overrides.from = overrides.from;
    }
    return overrides;
}
async function resolveArgs(_runner, inputs, args) {
    // Recursively descend into args and resolve any addresses
    const runner = getRunner(_runner, "resolveName");
    const resolver = canResolve(runner) ? runner : null;
    return await Promise.all(inputs.map((param, index)=>{
        return param.walkAsync(args[index], (type, value)=>{
            value = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$typed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Typed"].dereference(value, type);
            if (type === "address") {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAddress"])(value, resolver);
            }
            return value;
        });
    }));
}
function buildWrappedFallback(contract) {
    const populateTransaction = async function(overrides) {
        // If an overrides was passed in, copy it and normalize the values
        const tx = await copyOverrides(overrides, [
            "data"
        ]);
        tx.to = await contract.getAddress();
        if (tx.from) {
            tx.from = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAddress"])(tx.from, getResolver(contract.runner));
        }
        const iface = contract.interface;
        const noValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(tx.value || BN_0, "overrides.value") === BN_0;
        const noData = (tx.data || "0x") === "0x";
        if (iface.fallback && !iface.fallback.payable && iface.receive && !noData && !noValue) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "cannot send data to receive or send value to non-payable fallback", "overrides", overrides);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(iface.fallback || noData, "cannot send data to receive-only contract", "overrides.data", tx.data);
        // Only allow payable contracts to set non-zero value
        const payable = iface.receive || iface.fallback && iface.fallback.payable;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(payable || noValue, "cannot send value to non-payable fallback", "overrides.value", tx.value);
        // Only allow fallback contracts to set non-empty data
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(iface.fallback || noData, "cannot send data to receive-only contract", "overrides.data", tx.data);
        return tx;
    };
    const staticCall = async function(overrides) {
        const runner = getRunner(contract.runner, "call");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(canCall(runner), "contract runner does not support calling", "UNSUPPORTED_OPERATION", {
            operation: "call"
        });
        const tx = await populateTransaction(overrides);
        try {
            return await runner.call(tx);
        } catch (error) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCallException"])(error) && error.data) {
                throw contract.interface.makeError(error.data, tx);
            }
            throw error;
        }
    };
    const send = async function(overrides) {
        const runner = contract.runner;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(canSend(runner), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", {
            operation: "sendTransaction"
        });
        const tx = await runner.sendTransaction(await populateTransaction(overrides));
        const provider = getProvider(contract.runner);
        // @TODO: the provider can be null; make a custom dummy provider that will throw a
        // meaningful error
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$wrappers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContractTransactionResponse"](contract.interface, provider, tx);
    };
    const estimateGas = async function(overrides) {
        const runner = getRunner(contract.runner, "estimateGas");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(canEstimate(runner), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", {
            operation: "estimateGas"
        });
        return await runner.estimateGas(await populateTransaction(overrides));
    };
    const method = async (overrides)=>{
        return await send(overrides);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(method, {
        _contract: contract,
        estimateGas,
        populateTransaction,
        send,
        staticCall
    });
    return method;
}
function buildWrappedMethod(contract, key) {
    const getFragment = function(...args) {
        const fragment = contract.interface.getFunction(key, args);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(fragment, "no matching fragment", "UNSUPPORTED_OPERATION", {
            operation: "fragment",
            info: {
                key,
                args
            }
        });
        return fragment;
    };
    const populateTransaction = async function(...args) {
        const fragment = getFragment(...args);
        // If an overrides was passed in, copy it and normalize the values
        let overrides = {};
        if (fragment.inputs.length + 1 === args.length) {
            overrides = await copyOverrides(args.pop());
            if (overrides.from) {
                overrides.from = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAddress"])(overrides.from, getResolver(contract.runner));
            }
        }
        if (fragment.inputs.length !== args.length) {
            throw new Error("internal error: fragment inputs doesn't match arguments; should not happen");
        }
        const resolvedArgs = await resolveArgs(contract.runner, fragment.inputs, args);
        return Object.assign({}, overrides, await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveProperties"])({
            to: contract.getAddress(),
            data: contract.interface.encodeFunctionData(fragment, resolvedArgs)
        }));
    };
    const staticCall = async function(...args) {
        const result = await staticCallResult(...args);
        if (result.length === 1) {
            return result[0];
        }
        return result;
    };
    const send = async function(...args) {
        const runner = contract.runner;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(canSend(runner), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", {
            operation: "sendTransaction"
        });
        const tx = await runner.sendTransaction(await populateTransaction(...args));
        const provider = getProvider(contract.runner);
        // @TODO: the provider can be null; make a custom dummy provider that will throw a
        // meaningful error
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$wrappers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContractTransactionResponse"](contract.interface, provider, tx);
    };
    const estimateGas = async function(...args) {
        const runner = getRunner(contract.runner, "estimateGas");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(canEstimate(runner), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", {
            operation: "estimateGas"
        });
        return await runner.estimateGas(await populateTransaction(...args));
    };
    const staticCallResult = async function(...args) {
        const runner = getRunner(contract.runner, "call");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(canCall(runner), "contract runner does not support calling", "UNSUPPORTED_OPERATION", {
            operation: "call"
        });
        const tx = await populateTransaction(...args);
        let result = "0x";
        try {
            result = await runner.call(tx);
        } catch (error) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCallException"])(error) && error.data) {
                throw contract.interface.makeError(error.data, tx);
            }
            throw error;
        }
        const fragment = getFragment(...args);
        return contract.interface.decodeFunctionResult(fragment, result);
    };
    const method = async (...args)=>{
        const fragment = getFragment(...args);
        if (fragment.constant) {
            return await staticCall(...args);
        }
        return await send(...args);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(method, {
        name: contract.interface.getFunctionName(key),
        _contract: contract,
        _key: key,
        getFragment,
        estimateGas,
        populateTransaction,
        send,
        staticCall,
        staticCallResult
    });
    // Only works on non-ambiguous keys (refined fragment is always non-ambiguous)
    Object.defineProperty(method, "fragment", {
        configurable: false,
        enumerable: true,
        get: ()=>{
            const fragment = contract.interface.getFunction(key);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(fragment, "no matching fragment", "UNSUPPORTED_OPERATION", {
                operation: "fragment",
                info: {
                    key
                }
            });
            return fragment;
        }
    });
    return method;
}
function buildWrappedEvent(contract, key) {
    const getFragment = function(...args) {
        const fragment = contract.interface.getEvent(key, args);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(fragment, "no matching fragment", "UNSUPPORTED_OPERATION", {
            operation: "fragment",
            info: {
                key,
                args
            }
        });
        return fragment;
    };
    const method = function(...args) {
        return new PreparedTopicFilter(contract, getFragment(...args), args);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(method, {
        name: contract.interface.getEventName(key),
        _contract: contract,
        _key: key,
        getFragment
    });
    // Only works on non-ambiguous keys (refined fragment is always non-ambiguous)
    Object.defineProperty(method, "fragment", {
        configurable: false,
        enumerable: true,
        get: ()=>{
            const fragment = contract.interface.getEvent(key);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(fragment, "no matching fragment", "UNSUPPORTED_OPERATION", {
                operation: "fragment",
                info: {
                    key
                }
            });
            return fragment;
        }
    });
    return method;
}
// The combination of TypeScrype, Private Fields and Proxies makes
// the world go boom; so we hide variables with some trickery keeping
// a symbol attached to each BaseContract which its sub-class (even
// via a Proxy) can reach and use to look up its internal values.
const internal = Symbol.for("_ethersInternal_contract");
const internalValues = new WeakMap();
function setInternal(contract, values) {
    internalValues.set(contract[internal], values);
}
function getInternal(contract) {
    return internalValues.get(contract[internal]);
}
function isDeferred(value) {
    return value && typeof value === "object" && "getTopicFilter" in value && typeof value.getTopicFilter === "function" && value.fragment;
}
async function getSubInfo(contract, event) {
    let topics;
    let fragment = null;
    // Convert named events to topicHash and get the fragment for
    // events which need deconstructing.
    if (Array.isArray(event)) {
        const topicHashify = function(name) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHexString"])(name, 32)) {
                return name;
            }
            const fragment = contract.interface.getEvent(name);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(fragment, "unknown fragment", "name", name);
            return fragment.topicHash;
        };
        // Array of Topics and Names; e.g. `[ "0x1234...89ab", "Transfer(address)" ]`
        topics = event.map((e)=>{
            if (e == null) {
                return null;
            }
            if (Array.isArray(e)) {
                return e.map(topicHashify);
            }
            return topicHashify(e);
        });
    } else if (event === "*") {
        topics = [
            null
        ];
    } else if (typeof event === "string") {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHexString"])(event, 32)) {
            // Topic Hash
            topics = [
                event
            ];
        } else {
            // Name or Signature; e.g. `"Transfer", `"Transfer(address)"`
            fragment = contract.interface.getEvent(event);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(fragment, "unknown fragment", "event", event);
            topics = [
                fragment.topicHash
            ];
        }
    } else if (isDeferred(event)) {
        // Deferred Topic Filter; e.g. `contract.filter.Transfer(from)`
        topics = await event.getTopicFilter();
    } else if ("fragment" in event) {
        // ContractEvent; e.g. `contract.filter.Transfer`
        fragment = event.fragment;
        topics = [
            fragment.topicHash
        ];
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "unknown event name", "event", event);
    }
    // Normalize topics and sort TopicSets
    topics = topics.map((t)=>{
        if (t == null) {
            return null;
        }
        if (Array.isArray(t)) {
            const items = Array.from(new Set(t.map((t)=>t.toLowerCase())).values());
            if (items.length === 1) {
                return items[0];
            }
            items.sort();
            return items;
        }
        return t.toLowerCase();
    });
    const tag = topics.map((t)=>{
        if (t == null) {
            return "null";
        }
        if (Array.isArray(t)) {
            return t.join("|");
        }
        return t;
    }).join("&");
    return {
        fragment,
        tag,
        topics
    };
}
async function hasSub(contract, event) {
    const { subs } = getInternal(contract);
    return subs.get((await getSubInfo(contract, event)).tag) || null;
}
async function getSub(contract, operation, event) {
    // Make sure our runner can actually subscribe to events
    const provider = getProvider(contract.runner);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(provider, "contract runner does not support subscribing", "UNSUPPORTED_OPERATION", {
        operation
    });
    const { fragment, tag, topics } = await getSubInfo(contract, event);
    const { addr, subs } = getInternal(contract);
    let sub = subs.get(tag);
    if (!sub) {
        const address = addr ? addr : contract;
        const filter = {
            address,
            topics
        };
        const listener = (log)=>{
            let foundFragment = fragment;
            if (foundFragment == null) {
                try {
                    foundFragment = contract.interface.getEvent(log.topics[0]);
                } catch (error) {}
            }
            // If fragment is null, we do not deconstruct the args to emit
            if (foundFragment) {
                const _foundFragment = foundFragment;
                const args = fragment ? contract.interface.decodeEventLog(fragment, log.data, log.topics) : [];
                emit(contract, event, args, (listener)=>{
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$wrappers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContractEventPayload"](contract, listener, event, _foundFragment, log);
                });
            } else {
                emit(contract, event, [], (listener)=>{
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$wrappers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContractUnknownEventPayload"](contract, listener, event, log);
                });
            }
        };
        let starting = [];
        const start = ()=>{
            if (starting.length) {
                return;
            }
            starting.push(provider.on(filter, listener));
        };
        const stop = async ()=>{
            if (starting.length == 0) {
                return;
            }
            let started = starting;
            starting = [];
            await Promise.all(started);
            provider.off(filter, listener);
        };
        sub = {
            tag,
            listeners: [],
            start,
            stop
        };
        subs.set(tag, sub);
    }
    return sub;
}
// We use this to ensure one emit resolves before firing the next to
// ensure correct ordering (note this cannot throw and just adds the
// notice to the event queu using setTimeout).
let lastEmit = Promise.resolve();
async function _emit(contract, event, args, payloadFunc) {
    await lastEmit;
    const sub = await hasSub(contract, event);
    if (!sub) {
        return false;
    }
    const count = sub.listeners.length;
    sub.listeners = sub.listeners.filter(({ listener, once })=>{
        const passArgs = Array.from(args);
        if (payloadFunc) {
            passArgs.push(payloadFunc(once ? null : listener));
        }
        try {
            listener.call(contract, ...passArgs);
        } catch (error) {}
        return !once;
    });
    if (sub.listeners.length === 0) {
        sub.stop();
        getInternal(contract).subs.delete(sub.tag);
    }
    return count > 0;
}
async function emit(contract, event, args, payloadFunc) {
    try {
        await lastEmit;
    } catch (error) {}
    const resultPromise = _emit(contract, event, args, payloadFunc);
    lastEmit = resultPromise;
    return await resultPromise;
}
const passProperties = [
    "then"
];
class BaseContract {
    /**
     *  The target to connect to.
     *
     *  This can be an address, ENS name or any [[Addressable]], such as
     *  another contract. To get the resolved address, use the ``getAddress``
     *  method.
     */ target;
    /**
     *  The contract Interface.
     */ interface;
    /**
     *  The connected runner. This is generally a [[Provider]] or a
     *  [[Signer]], which dictates what operations are supported.
     *
     *  For example, a **Contract** connected to a [[Provider]] may
     *  only execute read-only operations.
     */ runner;
    /**
     *  All the Events available on this contract.
     */ filters;
    /**
     *  @_ignore:
     */ [internal];
    /**
     *  The fallback or receive function if any.
     */ fallback;
    /**
     *  Creates a new contract connected to %%target%% with the %%abi%% and
     *  optionally connected to a %%runner%% to perform operations on behalf
     *  of.
     */ constructor(target, abi, runner, _deployTx){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(typeof target === "string" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddressable"])(target), "invalid value for Contract target", "target", target);
        if (runner == null) {
            runner = null;
        }
        const iface = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$interface$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Interface"].from(abi);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            target,
            runner,
            interface: iface
        });
        Object.defineProperty(this, internal, {
            value: {}
        });
        let addrPromise;
        let addr = null;
        let deployTx = null;
        if (_deployTx) {
            const provider = getProvider(runner);
            // @TODO: the provider can be null; make a custom dummy provider that will throw a
            // meaningful error
            deployTx = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$wrappers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContractTransactionResponse"](this.interface, provider, _deployTx);
        }
        let subs = new Map();
        // Resolve the target as the address
        if (typeof target === "string") {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHexString"])(target)) {
                addr = target;
                addrPromise = Promise.resolve(target);
            } else {
                const resolver = getRunner(runner, "resolveName");
                if (!canResolve(resolver)) {
                    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeError"])("contract runner does not support name resolution", "UNSUPPORTED_OPERATION", {
                        operation: "resolveName"
                    });
                }
                addrPromise = resolver.resolveName(target).then((addr)=>{
                    if (addr == null) {
                        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeError"])("an ENS name used for a contract target must be correctly configured", "UNCONFIGURED_NAME", {
                            value: target
                        });
                    }
                    getInternal(this).addr = addr;
                    return addr;
                });
            }
        } else {
            addrPromise = target.getAddress().then((addr)=>{
                if (addr == null) {
                    throw new Error("TODO");
                }
                getInternal(this).addr = addr;
                return addr;
            });
        }
        // Set our private values
        setInternal(this, {
            addrPromise,
            addr,
            deployTx,
            subs
        });
        // Add the event filters
        const filters = new Proxy({}, {
            get: (target, prop, receiver)=>{
                // Pass important checks (like `then` for Promise) through
                if (typeof prop === "symbol" || passProperties.indexOf(prop) >= 0) {
                    return Reflect.get(target, prop, receiver);
                }
                try {
                    return this.getEvent(prop);
                } catch (error) {
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isError"])(error, "INVALID_ARGUMENT") || error.argument !== "key") {
                        throw error;
                    }
                }
                return undefined;
            },
            has: (target, prop)=>{
                // Pass important checks (like `then` for Promise) through
                if (passProperties.indexOf(prop) >= 0) {
                    return Reflect.has(target, prop);
                }
                return Reflect.has(target, prop) || this.interface.hasEvent(String(prop));
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            filters
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            fallback: iface.receive || iface.fallback ? buildWrappedFallback(this) : null
        });
        // Return a Proxy that will respond to functions
        return new Proxy(this, {
            get: (target, prop, receiver)=>{
                if (typeof prop === "symbol" || prop in target || passProperties.indexOf(prop) >= 0) {
                    return Reflect.get(target, prop, receiver);
                }
                // Undefined properties should return undefined
                try {
                    return target.getFunction(prop);
                } catch (error) {
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isError"])(error, "INVALID_ARGUMENT") || error.argument !== "key") {
                        throw error;
                    }
                }
                return undefined;
            },
            has: (target, prop)=>{
                if (typeof prop === "symbol" || prop in target || passProperties.indexOf(prop) >= 0) {
                    return Reflect.has(target, prop);
                }
                return target.interface.hasFunction(prop);
            }
        });
    }
    /**
     *  Return a new Contract instance with the same target and ABI, but
     *  a different %%runner%%.
     */ connect(runner) {
        return new BaseContract(this.target, this.interface, runner);
    }
    /**
     *  Return a new Contract instance with the same ABI and runner, but
     *  a different %%target%%.
     */ attach(target) {
        return new BaseContract(target, this.interface, this.runner);
    }
    /**
     *  Return the resolved address of this Contract.
     */ async getAddress() {
        return await getInternal(this).addrPromise;
    }
    /**
     *  Return the deployed bytecode or null if no bytecode is found.
     */ async getDeployedCode() {
        const provider = getProvider(this.runner);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(provider, "runner does not support .provider", "UNSUPPORTED_OPERATION", {
            operation: "getDeployedCode"
        });
        const code = await provider.getCode(await this.getAddress());
        if (code === "0x") {
            return null;
        }
        return code;
    }
    /**
     *  Resolve to this Contract once the bytecode has been deployed, or
     *  resolve immediately if already deployed.
     */ async waitForDeployment() {
        // We have the deployment transaction; just use that (throws if deployment fails)
        const deployTx = this.deploymentTransaction();
        if (deployTx) {
            await deployTx.wait();
            return this;
        }
        // Check for code
        const code = await this.getDeployedCode();
        if (code != null) {
            return this;
        }
        // Make sure we can subscribe to a provider event
        const provider = getProvider(this.runner);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(provider != null, "contract runner does not support .provider", "UNSUPPORTED_OPERATION", {
            operation: "waitForDeployment"
        });
        return new Promise((resolve, reject)=>{
            const checkCode = async ()=>{
                try {
                    const code = await this.getDeployedCode();
                    if (code != null) {
                        return resolve(this);
                    }
                    provider.once("block", checkCode);
                } catch (error) {
                    reject(error);
                }
            };
            checkCode();
        });
    }
    /**
     *  Return the transaction used to deploy this contract.
     *
     *  This is only available if this instance was returned from a
     *  [[ContractFactory]].
     */ deploymentTransaction() {
        return getInternal(this).deployTx;
    }
    /**
     *  Return the function for a given name. This is useful when a contract
     *  method name conflicts with a JavaScript name such as ``prototype`` or
     *  when using a Contract programmatically.
     */ getFunction(key) {
        if (typeof key !== "string") {
            key = key.format();
        }
        const func = buildWrappedMethod(this, key);
        return func;
    }
    /**
     *  Return the event for a given name. This is useful when a contract
     *  event name conflicts with a JavaScript name such as ``prototype`` or
     *  when using a Contract programmatically.
     */ getEvent(key) {
        if (typeof key !== "string") {
            key = key.format();
        }
        return buildWrappedEvent(this, key);
    }
    /**
     *  @_ignore:
     */ async queryTransaction(hash) {
        throw new Error("@TODO");
    }
    /*
    // @TODO: this is a non-backwards compatible change, but will be added
    //        in v7 and in a potential SmartContract class in an upcoming
    //        v6 release
    async getTransactionReceipt(hash: string): Promise<null | ContractTransactionReceipt> {
        const provider = getProvider(this.runner);
        assert(provider, "contract runner does not have a provider",
            "UNSUPPORTED_OPERATION", { operation: "queryTransaction" });

        const receipt = await provider.getTransactionReceipt(hash);
        if (receipt == null) { return null; }

        return new ContractTransactionReceipt(this.interface, provider, receipt);
    }
    */ /**
     *  Provide historic access to event data for %%event%% in the range
     *  %%fromBlock%% (default: ``0``) to %%toBlock%% (default: ``"latest"``)
     *  inclusive.
     */ async queryFilter(event, fromBlock, toBlock) {
        if (fromBlock == null) {
            fromBlock = 0;
        }
        if (toBlock == null) {
            toBlock = "latest";
        }
        const { addr, addrPromise } = getInternal(this);
        const address = addr ? addr : await addrPromise;
        const { fragment, topics } = await getSubInfo(this, event);
        const filter = {
            address,
            topics,
            fromBlock,
            toBlock
        };
        const provider = getProvider(this.runner);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(provider, "contract runner does not have a provider", "UNSUPPORTED_OPERATION", {
            operation: "queryFilter"
        });
        return (await provider.getLogs(filter)).map((log)=>{
            let foundFragment = fragment;
            if (foundFragment == null) {
                try {
                    foundFragment = this.interface.getEvent(log.topics[0]);
                } catch (error) {}
            }
            if (foundFragment) {
                try {
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$wrappers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EventLog"](log, this.interface, foundFragment);
                } catch (error) {
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$wrappers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UndecodedEventLog"](log, error);
                }
            }
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Log"](log, provider);
        });
    }
    /**
     *  Add an event %%listener%% for the %%event%%.
     */ async on(event, listener) {
        const sub = await getSub(this, "on", event);
        sub.listeners.push({
            listener,
            once: false
        });
        sub.start();
        return this;
    }
    /**
     *  Add an event %%listener%% for the %%event%%, but remove the listener
     *  after it is fired once.
     */ async once(event, listener) {
        const sub = await getSub(this, "once", event);
        sub.listeners.push({
            listener,
            once: true
        });
        sub.start();
        return this;
    }
    /**
     *  Emit an %%event%% calling all listeners with %%args%%.
     *
     *  Resolves to ``true`` if any listeners were called.
     */ async emit(event, ...args) {
        return await emit(this, event, args, null);
    }
    /**
     *  Resolves to the number of listeners of %%event%% or the total number
     *  of listeners if unspecified.
     */ async listenerCount(event) {
        if (event) {
            const sub = await hasSub(this, event);
            if (!sub) {
                return 0;
            }
            return sub.listeners.length;
        }
        const { subs } = getInternal(this);
        let total = 0;
        for (const { listeners } of subs.values()){
            total += listeners.length;
        }
        return total;
    }
    /**
     *  Resolves to the listeners subscribed to %%event%% or all listeners
     *  if unspecified.
     */ async listeners(event) {
        if (event) {
            const sub = await hasSub(this, event);
            if (!sub) {
                return [];
            }
            return sub.listeners.map(({ listener })=>listener);
        }
        const { subs } = getInternal(this);
        let result = [];
        for (const { listeners } of subs.values()){
            result = result.concat(listeners.map(({ listener })=>listener));
        }
        return result;
    }
    /**
     *  Remove the %%listener%% from the listeners for %%event%% or remove
     *  all listeners if unspecified.
     */ async off(event, listener) {
        const sub = await hasSub(this, event);
        if (!sub) {
            return this;
        }
        if (listener) {
            const index = sub.listeners.map(({ listener })=>listener).indexOf(listener);
            if (index >= 0) {
                sub.listeners.splice(index, 1);
            }
        }
        if (listener == null || sub.listeners.length === 0) {
            sub.stop();
            getInternal(this).subs.delete(sub.tag);
        }
        return this;
    }
    /**
     *  Remove all the listeners for %%event%% or remove all listeners if
     *  unspecified.
     */ async removeAllListeners(event) {
        if (event) {
            const sub = await hasSub(this, event);
            if (!sub) {
                return this;
            }
            sub.stop();
            getInternal(this).subs.delete(sub.tag);
        } else {
            const { subs } = getInternal(this);
            for (const { tag, stop } of subs.values()){
                stop();
                subs.delete(tag);
            }
        }
        return this;
    }
    /**
     *  Alias for [on].
     */ async addListener(event, listener) {
        return await this.on(event, listener);
    }
    /**
     *  Alias for [off].
     */ async removeListener(event, listener) {
        return await this.off(event, listener);
    }
    /**
     *  Create a new Class for the %%abi%%.
     */ static buildClass(abi) {
        class CustomContract extends BaseContract {
            constructor(address, runner = null){
                super(address, abi, runner);
            }
        }
        return CustomContract;
    }
    /**
     *  Create a new BaseContract with a specified Interface.
     */ static from(target, abi, runner) {
        if (runner == null) {
            runner = null;
        }
        const contract = new this(target, abi, runner);
        return contract;
    }
}
function _ContractBase() {
    return BaseContract;
}
class Contract extends _ContractBase() {
} //# sourceMappingURL=contract.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/contract/factory.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContractFactory",
    ()=>ContractFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$interface$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/abi/interface.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$contract$2d$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/contract-address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/contract/contract.js [app-ssr] (ecmascript)");
;
;
;
;
class ContractFactory {
    /**
     *  The Contract Interface.
     */ interface;
    /**
     *  The Contract deployment bytecode. Often called the initcode.
     */ bytecode;
    /**
     *  The ContractRunner to deploy the Contract as.
     */ runner;
    /**
     *  Create a new **ContractFactory** with %%abi%% and %%bytecode%%,
     *  optionally connected to %%runner%%.
     *
     *  The %%bytecode%% may be the ``bytecode`` property within the
     *  standard Solidity JSON output.
     */ constructor(abi, bytecode, runner){
        const iface = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$interface$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Interface"].from(abi);
        // Dereference Solidity bytecode objects and allow a missing `0x`-prefix
        if (bytecode instanceof Uint8Array) {
            bytecode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(bytecode));
        } else {
            if (typeof bytecode === "object") {
                bytecode = bytecode.object;
            }
            if (!bytecode.startsWith("0x")) {
                bytecode = "0x" + bytecode;
            }
            bytecode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(bytecode));
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            bytecode,
            interface: iface,
            runner: runner || null
        });
    }
    attach(target) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseContract"](target, this.interface, this.runner);
    }
    /**
     *  Resolves to the transaction to deploy the contract, passing %%args%%
     *  into the constructor.
     */ async getDeployTransaction(...args) {
        let overrides = {};
        const fragment = this.interface.deploy;
        if (fragment.inputs.length + 1 === args.length) {
            overrides = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["copyOverrides"])(args.pop());
        }
        if (fragment.inputs.length !== args.length) {
            throw new Error("incorrect number of arguments to constructor");
        }
        const resolvedArgs = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveArgs"])(this.runner, fragment.inputs, args);
        const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])([
            this.bytecode,
            this.interface.encodeDeploy(resolvedArgs)
        ]);
        return Object.assign({}, overrides, {
            data
        });
    }
    /**
     *  Resolves to the Contract deployed by passing %%args%% into the
     *  constructor.
     *
     *  This will resolve to the Contract before it has been deployed to the
     *  network, so the [[BaseContract-waitForDeployment]] should be used before
     *  sending any transactions to it.
     */ async deploy(...args) {
        const tx = await this.getDeployTransaction(...args);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(this.runner && typeof this.runner.sendTransaction === "function", "factory runner does not support sending transactions", "UNSUPPORTED_OPERATION", {
            operation: "sendTransaction"
        });
        const sentTx = await this.runner.sendTransaction(tx);
        const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$contract$2d$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCreateAddress"])(sentTx);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseContract"](address, this.interface, this.runner, sentTx);
    }
    /**
     *  Return a new **ContractFactory** with the same ABI and bytecode,
     *  but connected to %%runner%%.
     */ connect(runner) {
        return new ContractFactory(this.interface, this.bytecode, runner);
    }
    /**
     *  Create a new **ContractFactory** from the standard Solidity JSON output.
     */ static fromSolidity(output, runner) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(output != null, "bad compiler output", "output", output);
        if (typeof output === "string") {
            output = JSON.parse(output);
        }
        const abi = output.abi;
        let bytecode = "";
        if (output.bytecode) {
            bytecode = output.bytecode;
        } else if (output.evm && output.evm.bytecode) {
            bytecode = output.evm.bytecode;
        }
        return new this(abi, bytecode, runner);
    }
} //# sourceMappingURL=factory.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/ethers.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AbiCoder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$abi$2d$coder$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AbiCoder"],
    "AbstractProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$abstract$2d$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AbstractProvider"],
    "AbstractSigner",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$abstract$2d$signer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AbstractSigner"],
    "AlchemyProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$alchemy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlchemyProvider"],
    "AnkrProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$ankr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnkrProvider"],
    "BaseContract",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseContract"],
    "BaseWallet",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$base$2d$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseWallet"],
    "Block",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Block"],
    "BlockscoutProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$blockscout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BlockscoutProvider"],
    "BrowserProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$browser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BrowserProvider"],
    "ChainstackProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$chainstack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainstackProvider"],
    "CloudflareProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$cloudflare$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CloudflareProvider"],
    "ConstructorFragment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$fragments$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstructorFragment"],
    "Contract",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Contract"],
    "ContractEventPayload",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$wrappers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContractEventPayload"],
    "ContractFactory",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContractFactory"],
    "ContractTransactionReceipt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$wrappers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContractTransactionReceipt"],
    "ContractTransactionResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$wrappers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContractTransactionResponse"],
    "ContractUnknownEventPayload",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$wrappers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContractUnknownEventPayload"],
    "EnsPlugin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$plugins$2d$network$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EnsPlugin"],
    "EnsResolver",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$ens$2d$resolver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EnsResolver"],
    "ErrorDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$interface$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ErrorDescription"],
    "ErrorFragment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$fragments$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorFragment"],
    "EtherSymbol",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$strings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EtherSymbol"],
    "EtherscanPlugin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$etherscan$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EtherscanPlugin"],
    "EtherscanProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$etherscan$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EtherscanProvider"],
    "EventFragment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$fragments$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EventFragment"],
    "EventLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$wrappers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EventLog"],
    "EventPayload",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EventPayload"],
    "FallbackFragment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$fragments$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FallbackFragment"],
    "FallbackProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$fallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FallbackProvider"],
    "FeeData",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FeeData"],
    "FeeDataNetworkPlugin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$plugins$2d$network$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FeeDataNetworkPlugin"],
    "FetchCancelSignal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FetchCancelSignal"],
    "FetchRequest",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FetchRequest"],
    "FetchResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FetchResponse"],
    "FetchUrlFeeDataNetworkPlugin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$plugins$2d$network$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FetchUrlFeeDataNetworkPlugin"],
    "FixedNumber",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$fixednumber$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FixedNumber"],
    "Fragment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$fragments$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"],
    "FunctionFragment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$fragments$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FunctionFragment"],
    "GasCostPlugin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$plugins$2d$network$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GasCostPlugin"],
    "HDNodeVoidWallet",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$hdwallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HDNodeVoidWallet"],
    "HDNodeWallet",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$hdwallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HDNodeWallet"],
    "Indexed",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$interface$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Indexed"],
    "InfuraProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$infura$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InfuraProvider"],
    "InfuraWebSocketProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$infura$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InfuraWebSocketProvider"],
    "Interface",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$interface$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Interface"],
    "IpcSocketProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$ipcsocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IpcSocketProvider"],
    "JsonRpcApiProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonRpcApiProvider"],
    "JsonRpcProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonRpcProvider"],
    "JsonRpcSigner",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonRpcSigner"],
    "LangEn",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wordlists$2f$lang$2d$en$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LangEn"],
    "Log",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Log"],
    "LogDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$interface$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LogDescription"],
    "MaxInt256",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$numbers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MaxInt256"],
    "MaxUint256",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$numbers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MaxUint256"],
    "MessagePrefix",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$strings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MessagePrefix"],
    "MinInt256",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$numbers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MinInt256"],
    "Mnemonic",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$mnemonic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mnemonic"],
    "MulticoinProviderPlugin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$ens$2d$resolver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MulticoinProviderPlugin"],
    "N",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$numbers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["N"],
    "NamedFragment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$fragments$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NamedFragment"],
    "Network",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$network$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Network"],
    "NetworkPlugin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$plugins$2d$network$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NetworkPlugin"],
    "NonceManager",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$signer$2d$noncemanager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NonceManager"],
    "ParamType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$fragments$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ParamType"],
    "PocketProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$pocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PocketProvider"],
    "QuickNodeProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$quicknode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuickNodeProvider"],
    "Result",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$coders$2f$abstract$2d$coder$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Result"],
    "Signature",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Signature"],
    "SigningKey",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signing$2d$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SigningKey"],
    "SocketBlockSubscriber",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$socket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SocketBlockSubscriber"],
    "SocketEventSubscriber",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$socket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SocketEventSubscriber"],
    "SocketPendingSubscriber",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$socket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SocketPendingSubscriber"],
    "SocketProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$socket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SocketProvider"],
    "SocketSubscriber",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$socket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SocketSubscriber"],
    "StructFragment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$fragments$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StructFragment"],
    "Transaction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Transaction"],
    "TransactionDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$interface$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TransactionDescription"],
    "TransactionReceipt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TransactionReceipt"],
    "TransactionResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TransactionResponse"],
    "Typed",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$typed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Typed"],
    "TypedDataEncoder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$typed$2d$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TypedDataEncoder"],
    "UndecodedEventLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$wrappers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UndecodedEventLog"],
    "UnmanagedSubscriber",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$abstract$2d$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UnmanagedSubscriber"],
    "Utf8ErrorFuncs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Utf8ErrorFuncs"],
    "VoidSigner",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$abstract$2d$signer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoidSigner"],
    "Wallet",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Wallet"],
    "WebSocketProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$websocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebSocketProvider"],
    "WeiPerEther",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$numbers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WeiPerEther"],
    "Wordlist",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wordlists$2f$wordlist$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Wordlist"],
    "WordlistOwl",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wordlists$2f$wordlist$2d$owl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WordlistOwl"],
    "WordlistOwlA",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wordlists$2f$wordlist$2d$owla$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WordlistOwlA"],
    "ZeroAddress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZeroAddress"],
    "ZeroHash",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$hashes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZeroHash"],
    "accessListify",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$accesslist$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["accessListify"],
    "assert",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"],
    "assertArgument",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"],
    "assertArgumentCount",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgumentCount"],
    "assertNormalize",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertNormalize"],
    "assertPrivate",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertPrivate"],
    "authorizationify",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$authorization$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorizationify"],
    "checkResultErrors",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$coders$2f$abstract$2d$coder$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["checkResultErrors"],
    "computeAddress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["computeAddress"],
    "computeHmac",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$hmac$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["computeHmac"],
    "concat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"],
    "copyRequest",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["copyRequest"],
    "dataLength",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataLength"],
    "dataSlice",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataSlice"],
    "decodeBase58",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$base58$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeBase58"],
    "decodeBase64",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$base64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeBase64"],
    "decodeBytes32String",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$bytes32$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeBytes32String"],
    "decodeRlp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$decode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeRlp"],
    "decryptCrowdsaleJson",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$crowdsale$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decryptCrowdsaleJson"],
    "decryptKeystoreJson",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$keystore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decryptKeystoreJson"],
    "decryptKeystoreJsonSync",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$keystore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decryptKeystoreJsonSync"],
    "defaultPath",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$hdwallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultPath"],
    "defineProperties",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"],
    "dnsEncode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$namehash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dnsEncode"],
    "encodeBase58",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$base58$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeBase58"],
    "encodeBase64",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$base64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeBase64"],
    "encodeBytes32String",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$bytes32$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeBytes32String"],
    "encodeRlp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeRlp"],
    "encryptKeystoreJson",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$keystore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encryptKeystoreJson"],
    "encryptKeystoreJsonSync",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$keystore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encryptKeystoreJsonSync"],
    "ensNormalize",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$namehash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ensNormalize"],
    "formatEther",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"],
    "formatUnits",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUnits"],
    "fromTwos",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromTwos"],
    "getAccountPath",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$hdwallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAccountPath"],
    "getAddress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"],
    "getBigInt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"],
    "getBytes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"],
    "getBytesCopy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytesCopy"],
    "getCreate2Address",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$contract$2d$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCreate2Address"],
    "getCreateAddress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$contract$2d$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCreateAddress"],
    "getDefaultProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$default$2d$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultProvider"],
    "getIcapAddress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getIcapAddress"],
    "getIndexedAccountPath",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$hdwallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getIndexedAccountPath"],
    "getNumber",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNumber"],
    "getUint",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUint"],
    "hashAuthorization",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$authorization$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hashAuthorization"],
    "hashMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$message$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hashMessage"],
    "hexlify",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"],
    "id",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$id$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["id"],
    "isAddress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddress"],
    "isAddressable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddressable"],
    "isBytesLike",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isBytesLike"],
    "isCallException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCallException"],
    "isCrowdsaleJson",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$crowdsale$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCrowdsaleJson"],
    "isError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isError"],
    "isHexString",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHexString"],
    "isKeystoreJson",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$keystore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isKeystoreJson"],
    "isValidName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$namehash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidName"],
    "keccak256",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"],
    "lock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["lock"],
    "makeError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeError"],
    "mask",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mask"],
    "namehash",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$namehash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["namehash"],
    "parseEther",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseEther"],
    "parseUnits",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseUnits"],
    "pbkdf2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$pbkdf2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pbkdf2"],
    "randomBytes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$random$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["randomBytes"],
    "recoverAddress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["recoverAddress"],
    "resolveAddress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAddress"],
    "resolveProperties",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveProperties"],
    "ripemd160",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$ripemd160$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ripemd160"],
    "scrypt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$scrypt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scrypt"],
    "scryptSync",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$scrypt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scryptSync"],
    "sha256",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sha256"],
    "sha512",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sha512"],
    "showThrottleMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$community$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showThrottleMessage"],
    "solidityPacked",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$solidity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["solidityPacked"],
    "solidityPackedKeccak256",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$solidity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["solidityPackedKeccak256"],
    "solidityPackedSha256",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$solidity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["solidityPackedSha256"],
    "stripZerosLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stripZerosLeft"],
    "toBeArray",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeArray"],
    "toBeHex",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBeHex"],
    "toBigInt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBigInt"],
    "toNumber",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toNumber"],
    "toQuantity",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toQuantity"],
    "toTwos",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toTwos"],
    "toUtf8Bytes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toUtf8Bytes"],
    "toUtf8CodePoints",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toUtf8CodePoints"],
    "toUtf8String",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toUtf8String"],
    "uuidV4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$uuid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uuidV4"],
    "verifyAuthorization",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$authorization$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verifyAuthorization"],
    "verifyMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$message$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verifyMessage"],
    "verifyTypedData",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$typed$2d$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verifyTypedData"],
    "version",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$_version$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["version"],
    "wordlists",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wordlists$2f$wordlists$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wordlists"],
    "zeroPadBytes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zeroPadBytes"],
    "zeroPadValue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zeroPadValue"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/ethers.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$_version$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/_version.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$bytes32$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/abi/bytes32.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$abi$2d$coder$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/abi/abi-coder.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$fragments$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/abi/fragments.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$coders$2f$abstract$2d$coder$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/abi/coders/abstract-coder.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$interface$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/abi/interface.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$typed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/abi/typed.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$contract$2d$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/contract-address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/address/checks.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/constants/addresses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$numbers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/constants/numbers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$hashes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/constants/hashes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$strings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/constants/strings.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/contract/contract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/contract/factory.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$wrappers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/contract/wrappers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$hmac$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/hmac.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$random$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/random.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/keccak.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$ripemd160$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/ripemd160.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$sha2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/sha2.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$pbkdf2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/pbkdf2.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$scrypt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/scrypt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/signature.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$signing$2d$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/crypto/signing-key.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$id$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/hash/id.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$namehash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/hash/namehash.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$authorization$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/hash/authorization.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$message$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/hash/message.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$solidity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/hash/solidity.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$hash$2f$typed$2d$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/hash/typed-data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$default$2d$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/default-provider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$abstract$2d$signer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/abstract-signer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$signer$2d$noncemanager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/signer-noncemanager.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$abstract$2d$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/abstract-provider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$fallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider-fallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider-jsonrpc.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$browser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider-browser.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$alchemy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider-alchemy.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$ankr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider-ankr.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$blockscout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider-blockscout.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$chainstack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider-chainstack.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$cloudflare$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider-cloudflare.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$etherscan$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider-etherscan.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$infura$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider-infura.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$pocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider-pocket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$quicknode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider-quicknode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$ipcsocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider-ipcsocket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$socket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider-socket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$websocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/provider-websocket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$ens$2d$resolver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/ens-resolver.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$network$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/network.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$plugins$2d$network$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/plugins-network.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$community$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/providers/community.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$accesslist$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/accesslist.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$authorization$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/authorization.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$transaction$2f$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/transaction/transaction.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$base58$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/base58.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$base64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/base64.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/events.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/fetch.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$fixednumber$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/fixednumber.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/maths.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/units.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/utf8.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$decode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/rlp-decode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$rlp$2d$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/rlp-encode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$uuid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/uuid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$mnemonic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/mnemonic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$base$2d$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/base-wallet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$hdwallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/hdwallet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/wallet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$crowdsale$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/json-crowdsale.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$json$2d$keystore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wallet/json-keystore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wordlists$2f$wordlist$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wordlists/wordlist.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wordlists$2f$lang$2d$en$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wordlists/lang-en.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wordlists$2f$wordlist$2d$owl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wordlists/wordlist-owl.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wordlists$2f$wordlist$2d$owla$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wordlists/wordlist-owla.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wordlists$2f$wordlists$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/wordlists/wordlists.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/ethers.js [app-ssr] (ecmascript) <export * as ethers>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ethers",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/ethers.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=129bd_ethers_lib_esm_e41cbde7._.js.map