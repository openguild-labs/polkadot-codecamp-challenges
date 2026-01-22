module.exports = [
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/properties.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defineProperties",
    ()=>defineProperties,
    "resolveProperties",
    ()=>resolveProperties
]);
/**
 *  Property helper functions.
 *
 *  @_subsection api/utils:Properties  [about-properties]
 */ function checkType(value, type, name) {
    const types = type.split("|").map((t)=>t.trim());
    for(let i = 0; i < types.length; i++){
        switch(type){
            case "any":
                return;
            case "bigint":
            case "boolean":
            case "number":
            case "string":
                if (typeof value === type) {
                    return;
                }
        }
    }
    const error = new Error(`invalid value for type ${type}`);
    error.code = "INVALID_ARGUMENT";
    error.argument = `value.${name}`;
    error.value = value;
    throw error;
}
async function resolveProperties(value) {
    const keys = Object.keys(value);
    const results = await Promise.all(keys.map((k)=>Promise.resolve(value[k])));
    return results.reduce((accum, v, index)=>{
        accum[keys[index]] = v;
        return accum;
    }, {});
}
function defineProperties(target, values, types) {
    for(let key in values){
        let value = values[key];
        const type = types ? types[key] : null;
        if (type) {
            checkType(value, type, key);
        }
        Object.defineProperty(target, key, {
            enumerable: true,
            value,
            writable: false
        });
    }
} //# sourceMappingURL=properties.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assert",
    ()=>assert,
    "assertArgument",
    ()=>assertArgument,
    "assertArgumentCount",
    ()=>assertArgumentCount,
    "assertNormalize",
    ()=>assertNormalize,
    "assertPrivate",
    ()=>assertPrivate,
    "isCallException",
    ()=>isCallException,
    "isError",
    ()=>isError,
    "makeError",
    ()=>makeError
]);
/**
 *  All errors in ethers include properties to ensure they are both
 *  human-readable (i.e. ``.message``) and machine-readable (i.e. ``.code``).
 *
 *  The [[isError]] function can be used to check the error ``code`` and
 *  provide a type guard for the properties present on that error interface.
 *
 *  @_section: api/utils/errors:Errors  [about-errors]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$_version$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/_version.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/properties.js [app-ssr] (ecmascript)");
;
;
function stringify(value, seen) {
    if (value == null) {
        return "null";
    }
    if (seen == null) {
        seen = new Set();
    }
    if (typeof value === "object") {
        if (seen.has(value)) {
            return "[Circular]";
        }
        seen.add(value);
    }
    if (Array.isArray(value)) {
        return "[ " + value.map((v)=>stringify(v, seen)).join(", ") + " ]";
    }
    if (value instanceof Uint8Array) {
        const HEX = "0123456789abcdef";
        let result = "0x";
        for(let i = 0; i < value.length; i++){
            result += HEX[value[i] >> 4];
            result += HEX[value[i] & 0xf];
        }
        return result;
    }
    if (typeof value === "object" && typeof value.toJSON === "function") {
        return stringify(value.toJSON(), seen);
    }
    switch(typeof value){
        case "boolean":
        case "number":
        case "symbol":
            return value.toString();
        case "bigint":
            return BigInt(value).toString();
        case "string":
            return JSON.stringify(value);
        case "object":
            {
                const keys = Object.keys(value);
                keys.sort();
                return "{ " + keys.map((k)=>`${stringify(k, seen)}: ${stringify(value[k], seen)}`).join(", ") + " }";
            }
    }
    return `[ COULD NOT SERIALIZE ]`;
}
function isError(error, code) {
    return error && error.code === code;
}
function isCallException(error) {
    return isError(error, "CALL_EXCEPTION");
}
function makeError(message, code, info) {
    let shortMessage = message;
    {
        const details = [];
        if (info) {
            if ("message" in info || "code" in info || "name" in info) {
                throw new Error(`value will overwrite populated values: ${stringify(info)}`);
            }
            for(const key in info){
                if (key === "shortMessage") {
                    continue;
                }
                const value = info[key];
                //                try {
                details.push(key + "=" + stringify(value));
            //                } catch (error: any) {
            //                console.log("MMM", error.message);
            //                    details.push(key + "=[could not serialize object]");
            //                }
            }
        }
        details.push(`code=${code}`);
        details.push(`version=${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$_version$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["version"]}`);
        if (details.length) {
            message += " (" + details.join(", ") + ")";
        }
    }
    let error;
    switch(code){
        case "INVALID_ARGUMENT":
            error = new TypeError(message);
            break;
        case "NUMERIC_FAULT":
        case "BUFFER_OVERRUN":
            error = new RangeError(message);
            break;
        default:
            error = new Error(message);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(error, {
        code
    });
    if (info) {
        Object.assign(error, info);
    }
    if (error.shortMessage == null) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(error, {
            shortMessage
        });
    }
    return error;
}
function assert(check, message, code, info) {
    if (!check) {
        throw makeError(message, code, info);
    }
}
function assertArgument(check, message, name, value) {
    assert(check, message, "INVALID_ARGUMENT", {
        argument: name,
        value: value
    });
}
function assertArgumentCount(count, expectedCount, message) {
    if (message == null) {
        message = "";
    }
    if (message) {
        message = ": " + message;
    }
    assert(count >= expectedCount, "missing argument" + message, "MISSING_ARGUMENT", {
        count: count,
        expectedCount: expectedCount
    });
    assert(count <= expectedCount, "too many arguments" + message, "UNEXPECTED_ARGUMENT", {
        count: count,
        expectedCount: expectedCount
    });
}
const _normalizeForms = [
    "NFD",
    "NFC",
    "NFKD",
    "NFKC"
].reduce((accum, form)=>{
    try {
        // General test for normalize
        /* c8 ignore start */ if ("test".normalize(form) !== "test") {
            throw new Error("bad");
        }
        ;
        /* c8 ignore stop */ if (form === "NFD") {
            const check = String.fromCharCode(0xe9).normalize("NFD");
            const expected = String.fromCharCode(0x65, 0x0301);
            /* c8 ignore start */ if (check !== expected) {
                throw new Error("broken");
            }
        /* c8 ignore stop */ }
        accum.push(form);
    } catch (error) {}
    return accum;
}, []);
function assertNormalize(form) {
    assert(_normalizeForms.indexOf(form) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
        operation: "String.prototype.normalize",
        info: {
            form
        }
    });
}
function assertPrivate(givenGuard, guard, className) {
    if (className == null) {
        className = "";
    }
    if (givenGuard !== guard) {
        let method = className, operation = "new";
        if (className) {
            method += ".";
            operation += " " + className;
        }
        assert(false, `private constructor; use ${method}from* methods`, "UNSUPPORTED_OPERATION", {
            operation
        });
    }
} //# sourceMappingURL=errors.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "concat",
    ()=>concat,
    "dataLength",
    ()=>dataLength,
    "dataSlice",
    ()=>dataSlice,
    "getBytes",
    ()=>getBytes,
    "getBytesCopy",
    ()=>getBytesCopy,
    "hexlify",
    ()=>hexlify,
    "isBytesLike",
    ()=>isBytesLike,
    "isHexString",
    ()=>isHexString,
    "stripZerosLeft",
    ()=>stripZerosLeft,
    "zeroPadBytes",
    ()=>zeroPadBytes,
    "zeroPadValue",
    ()=>zeroPadValue
]);
/**
 *  Some data helpers.
 *
 *
 *  @_subsection api/utils:Data Helpers  [about-data]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
;
function _getBytes(value, name, copy) {
    if (value instanceof Uint8Array) {
        if (copy) {
            return new Uint8Array(value);
        }
        return value;
    }
    if (typeof value === "string" && value.length % 2 === 0 && value.match(/^0x[0-9a-f]*$/i)) {
        const result = new Uint8Array((value.length - 2) / 2);
        let offset = 2;
        for(let i = 0; i < result.length; i++){
            result[i] = parseInt(value.substring(offset, offset + 2), 16);
            offset += 2;
        }
        return result;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "invalid BytesLike value", name || "value", value);
}
function getBytes(value, name) {
    return _getBytes(value, name, false);
}
function getBytesCopy(value, name) {
    return _getBytes(value, name, true);
}
function isHexString(value, length) {
    if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false;
    }
    if (typeof length === "number" && value.length !== 2 + 2 * length) {
        return false;
    }
    if (length === true && value.length % 2 !== 0) {
        return false;
    }
    return true;
}
function isBytesLike(value) {
    return isHexString(value, true) || value instanceof Uint8Array;
}
const HexCharacters = "0123456789abcdef";
function hexlify(data) {
    const bytes = getBytes(data);
    let result = "0x";
    for(let i = 0; i < bytes.length; i++){
        const v = bytes[i];
        result += HexCharacters[(v & 0xf0) >> 4] + HexCharacters[v & 0x0f];
    }
    return result;
}
function concat(datas) {
    return "0x" + datas.map((d)=>hexlify(d).substring(2)).join("");
}
function dataLength(data) {
    if (isHexString(data, true)) {
        return (data.length - 2) / 2;
    }
    return getBytes(data).length;
}
function dataSlice(data, start, end) {
    const bytes = getBytes(data);
    if (end != null && end > bytes.length) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(false, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
            buffer: bytes,
            length: bytes.length,
            offset: end
        });
    }
    return hexlify(bytes.slice(start == null ? 0 : start, end == null ? bytes.length : end));
}
function stripZerosLeft(data) {
    let bytes = hexlify(data).substring(2);
    while(bytes.startsWith("00")){
        bytes = bytes.substring(2);
    }
    return "0x" + bytes;
}
function zeroPad(data, length, left) {
    const bytes = getBytes(data);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(length >= bytes.length, "padding exceeds data length", "BUFFER_OVERRUN", {
        buffer: new Uint8Array(bytes),
        length: length,
        offset: length + 1
    });
    const result = new Uint8Array(length);
    result.fill(0);
    if (left) {
        result.set(bytes, length - bytes.length);
    } else {
        result.set(bytes, 0);
    }
    return hexlify(result);
}
function zeroPadValue(data, length) {
    return zeroPad(data, length, true);
}
function zeroPadBytes(data, length) {
    return zeroPad(data, length, false);
} //# sourceMappingURL=data.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/utf8.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Utf8ErrorFuncs",
    ()=>Utf8ErrorFuncs,
    "toUtf8Bytes",
    ()=>toUtf8Bytes,
    "toUtf8CodePoints",
    ()=>toUtf8CodePoints,
    "toUtf8String",
    ()=>toUtf8String
]);
/**
 *  Using strings in Ethereum (or any security-basd system) requires
 *  additional care. These utilities attempt to mitigate some of the
 *  safety issues as well as provide the ability to recover and analyse
 *  strings.
 *
 *  @_subsection api/utils:Strings and UTF-8  [about-strings]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
;
;
function errorFunc(reason, offset, bytes, output, badCodepoint) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, `invalid codepoint at offset ${offset}; ${reason}`, "bytes", bytes);
}
function ignoreFunc(reason, offset, bytes, output, badCodepoint) {
    // If there is an invalid prefix (including stray continuation), skip any additional continuation bytes
    if (reason === "BAD_PREFIX" || reason === "UNEXPECTED_CONTINUE") {
        let i = 0;
        for(let o = offset + 1; o < bytes.length; o++){
            if (bytes[o] >> 6 !== 0x02) {
                break;
            }
            i++;
        }
        return i;
    }
    // This byte runs us past the end of the string, so just jump to the end
    // (but the first byte was read already read and therefore skipped)
    if (reason === "OVERRUN") {
        return bytes.length - offset - 1;
    }
    // Nothing to skip
    return 0;
}
function replaceFunc(reason, offset, bytes, output, badCodepoint) {
    // Overlong representations are otherwise "valid" code points; just non-deistingtished
    if (reason === "OVERLONG") {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(typeof badCodepoint === "number", "invalid bad code point for replacement", "badCodepoint", badCodepoint);
        output.push(badCodepoint);
        return 0;
    }
    // Put the replacement character into the output
    output.push(0xfffd);
    // Otherwise, process as if ignoring errors
    return ignoreFunc(reason, offset, bytes, output, badCodepoint);
}
const Utf8ErrorFuncs = Object.freeze({
    error: errorFunc,
    ignore: ignoreFunc,
    replace: replaceFunc
});
// http://stackoverflow.com/questions/13356493/decode-utf-8-with-javascript#13691499
function getUtf8CodePoints(_bytes, onError) {
    if (onError == null) {
        onError = Utf8ErrorFuncs.error;
    }
    const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_bytes, "bytes");
    const result = [];
    let i = 0;
    // Invalid bytes are ignored
    while(i < bytes.length){
        const c = bytes[i++];
        // 0xxx xxxx
        if (c >> 7 === 0) {
            result.push(c);
            continue;
        }
        // Multibyte; how many bytes left for this character?
        let extraLength = null;
        let overlongMask = null;
        // 110x xxxx 10xx xxxx
        if ((c & 0xe0) === 0xc0) {
            extraLength = 1;
            overlongMask = 0x7f;
        // 1110 xxxx 10xx xxxx 10xx xxxx
        } else if ((c & 0xf0) === 0xe0) {
            extraLength = 2;
            overlongMask = 0x7ff;
        // 1111 0xxx 10xx xxxx 10xx xxxx 10xx xxxx
        } else if ((c & 0xf8) === 0xf0) {
            extraLength = 3;
            overlongMask = 0xffff;
        } else {
            if ((c & 0xc0) === 0x80) {
                i += onError("UNEXPECTED_CONTINUE", i - 1, bytes, result);
            } else {
                i += onError("BAD_PREFIX", i - 1, bytes, result);
            }
            continue;
        }
        // Do we have enough bytes in our data?
        if (i - 1 + extraLength >= bytes.length) {
            i += onError("OVERRUN", i - 1, bytes, result);
            continue;
        }
        // Remove the length prefix from the char
        let res = c & (1 << 8 - extraLength - 1) - 1;
        for(let j = 0; j < extraLength; j++){
            let nextChar = bytes[i];
            // Invalid continuation byte
            if ((nextChar & 0xc0) != 0x80) {
                i += onError("MISSING_CONTINUE", i, bytes, result);
                res = null;
                break;
            }
            ;
            res = res << 6 | nextChar & 0x3f;
            i++;
        }
        // See above loop for invalid continuation byte
        if (res === null) {
            continue;
        }
        // Maximum code point
        if (res > 0x10ffff) {
            i += onError("OUT_OF_RANGE", i - 1 - extraLength, bytes, result, res);
            continue;
        }
        // Reserved for UTF-16 surrogate halves
        if (res >= 0xd800 && res <= 0xdfff) {
            i += onError("UTF16_SURROGATE", i - 1 - extraLength, bytes, result, res);
            continue;
        }
        // Check for overlong sequences (more bytes than needed)
        if (res <= overlongMask) {
            i += onError("OVERLONG", i - 1 - extraLength, bytes, result, res);
            continue;
        }
        result.push(res);
    }
    return result;
}
function toUtf8Bytes(str, form) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(typeof str === "string", "invalid string value", "str", str);
    if (form != null) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertNormalize"])(form);
        str = str.normalize(form);
    }
    let result = [];
    for(let i = 0; i < str.length; i++){
        const c = str.charCodeAt(i);
        if (c < 0x80) {
            result.push(c);
        } else if (c < 0x800) {
            result.push(c >> 6 | 0xc0);
            result.push(c & 0x3f | 0x80);
        } else if ((c & 0xfc00) == 0xd800) {
            i++;
            const c2 = str.charCodeAt(i);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(i < str.length && (c2 & 0xfc00) === 0xdc00, "invalid surrogate pair", "str", str);
            // Surrogate Pair
            const pair = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);
            result.push(pair >> 18 | 0xf0);
            result.push(pair >> 12 & 0x3f | 0x80);
            result.push(pair >> 6 & 0x3f | 0x80);
            result.push(pair & 0x3f | 0x80);
        } else {
            result.push(c >> 12 | 0xe0);
            result.push(c >> 6 & 0x3f | 0x80);
            result.push(c & 0x3f | 0x80);
        }
    }
    return new Uint8Array(result);
}
;
//export 
function _toUtf8String(codePoints) {
    return codePoints.map((codePoint)=>{
        if (codePoint <= 0xffff) {
            return String.fromCharCode(codePoint);
        }
        codePoint -= 0x10000;
        return String.fromCharCode((codePoint >> 10 & 0x3ff) + 0xd800, (codePoint & 0x3ff) + 0xdc00);
    }).join("");
}
function toUtf8String(bytes, onError) {
    return _toUtf8String(getUtf8CodePoints(bytes, onError));
}
function toUtf8CodePoints(str, form) {
    return getUtf8CodePoints(toUtf8Bytes(str, form));
} //# sourceMappingURL=utf8.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/maths.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fromTwos",
    ()=>fromTwos,
    "getBigInt",
    ()=>getBigInt,
    "getNumber",
    ()=>getNumber,
    "getUint",
    ()=>getUint,
    "mask",
    ()=>mask,
    "toBeArray",
    ()=>toBeArray,
    "toBeHex",
    ()=>toBeHex,
    "toBigInt",
    ()=>toBigInt,
    "toNumber",
    ()=>toNumber,
    "toQuantity",
    ()=>toQuantity,
    "toTwos",
    ()=>toTwos
]);
/**
 *  Some mathematic operations.
 *
 *  @_subsection: api/utils:Math Helpers  [about-maths]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
;
;
const BN_0 = BigInt(0);
const BN_1 = BigInt(1);
//const BN_Max256 = (BN_1 << BigInt(256)) - BN_1;
// IEEE 754 support 53-bits of mantissa
const maxValue = 0x1fffffffffffff;
function fromTwos(_value, _width) {
    const value = getUint(_value, "value");
    const width = BigInt(getNumber(_width, "width"));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(value >> width === BN_0, "overflow", "NUMERIC_FAULT", {
        operation: "fromTwos",
        fault: "overflow",
        value: _value
    });
    // Top bit set; treat as a negative value
    if (value >> width - BN_1) {
        const mask = (BN_1 << width) - BN_1;
        return -((~value & mask) + BN_1);
    }
    return value;
}
function toTwos(_value, _width) {
    let value = getBigInt(_value, "value");
    const width = BigInt(getNumber(_width, "width"));
    const limit = BN_1 << width - BN_1;
    if (value < BN_0) {
        value = -value;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(value <= limit, "too low", "NUMERIC_FAULT", {
            operation: "toTwos",
            fault: "overflow",
            value: _value
        });
        const mask = (BN_1 << width) - BN_1;
        return (~value & mask) + BN_1;
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(value < limit, "too high", "NUMERIC_FAULT", {
            operation: "toTwos",
            fault: "overflow",
            value: _value
        });
    }
    return value;
}
function mask(_value, _bits) {
    const value = getUint(_value, "value");
    const bits = BigInt(getNumber(_bits, "bits"));
    return value & (BN_1 << bits) - BN_1;
}
function getBigInt(value, name) {
    switch(typeof value){
        case "bigint":
            return value;
        case "number":
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(Number.isInteger(value), "underflow", name || "value", value);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(value >= -maxValue && value <= maxValue, "overflow", name || "value", value);
            return BigInt(value);
        case "string":
            try {
                if (value === "") {
                    throw new Error("empty string");
                }
                if (value[0] === "-" && value[1] !== "-") {
                    return -BigInt(value.substring(1));
                }
                return BigInt(value);
            } catch (e) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, `invalid BigNumberish string: ${e.message}`, name || "value", value);
            }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "invalid BigNumberish value", name || "value", value);
}
function getUint(value, name) {
    const result = getBigInt(value, name);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(result >= BN_0, "unsigned value cannot be negative", "NUMERIC_FAULT", {
        fault: "overflow",
        operation: "getUint",
        value
    });
    return result;
}
const Nibbles = "0123456789abcdef";
function toBigInt(value) {
    if (value instanceof Uint8Array) {
        let result = "0x0";
        for (const v of value){
            result += Nibbles[v >> 4];
            result += Nibbles[v & 0x0f];
        }
        return BigInt(result);
    }
    return getBigInt(value);
}
function getNumber(value, name) {
    switch(typeof value){
        case "bigint":
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(value >= -maxValue && value <= maxValue, "overflow", name || "value", value);
            return Number(value);
        case "number":
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(Number.isInteger(value), "underflow", name || "value", value);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(value >= -maxValue && value <= maxValue, "overflow", name || "value", value);
            return value;
        case "string":
            try {
                if (value === "") {
                    throw new Error("empty string");
                }
                return getNumber(BigInt(value), name);
            } catch (e) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, `invalid numeric string: ${e.message}`, name || "value", value);
            }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "invalid numeric value", name || "value", value);
}
function toNumber(value) {
    return getNumber(toBigInt(value));
}
function toBeHex(_value, _width) {
    const value = getUint(_value, "value");
    let result = value.toString(16);
    if (_width == null) {
        // Ensure the value is of even length
        if (result.length % 2) {
            result = "0" + result;
        }
    } else {
        const width = getNumber(_width, "width");
        // Special case when both value and width are 0 (see: #5025)
        if (width === 0 && value === BN_0) {
            return "0x";
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(width * 2 >= result.length, `value exceeds width (${width} bytes)`, "NUMERIC_FAULT", {
            operation: "toBeHex",
            fault: "overflow",
            value: _value
        });
        // Pad the value to the required width
        while(result.length < width * 2){
            result = "0" + result;
        }
    }
    return "0x" + result;
}
function toBeArray(_value, _width) {
    const value = getUint(_value, "value");
    if (value === BN_0) {
        const width = _width != null ? getNumber(_width, "width") : 0;
        return new Uint8Array(width);
    }
    let hex = value.toString(16);
    if (hex.length % 2) {
        hex = "0" + hex;
    }
    if (_width != null) {
        const width = getNumber(_width, "width");
        while(hex.length < width * 2){
            hex = "00" + hex;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(width * 2 === hex.length, `value exceeds width (${width} bytes)`, "NUMERIC_FAULT", {
            operation: "toBeArray",
            fault: "overflow",
            value: _value
        });
    }
    const result = new Uint8Array(hex.length / 2);
    for(let i = 0; i < result.length; i++){
        const offset = i * 2;
        result[i] = parseInt(hex.substring(offset, offset + 2), 16);
    }
    return result;
}
function toQuantity(value) {
    let result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isBytesLike"])(value) ? value : toBeArray(value)).substring(2);
    while(result.startsWith("0")){
        result = result.substring(1);
    }
    if (result === "") {
        result = "0";
    }
    return "0x" + result;
} //# sourceMappingURL=maths.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/rlp-encode.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "encodeRlp",
    ()=>encodeRlp
]);
//See: https://github.com/ethereum/wiki/wiki/RLP
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
;
function arrayifyInteger(value) {
    const result = [];
    while(value){
        result.unshift(value & 0xff);
        value >>= 8;
    }
    return result;
}
function _encode(object) {
    if (Array.isArray(object)) {
        let payload = [];
        object.forEach(function(child) {
            payload = payload.concat(_encode(child));
        });
        if (payload.length <= 55) {
            payload.unshift(0xc0 + payload.length);
            return payload;
        }
        const length = arrayifyInteger(payload.length);
        length.unshift(0xf7 + length.length);
        return length.concat(payload);
    }
    const data = Array.prototype.slice.call((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(object, "object"));
    if (data.length === 1 && data[0] <= 0x7f) {
        return data;
    } else if (data.length <= 55) {
        data.unshift(0x80 + data.length);
        return data;
    }
    const length = arrayifyInteger(data.length);
    length.unshift(0xb7 + length.length);
    return length.concat(data);
}
const nibbles = "0123456789abcdef";
function encodeRlp(object) {
    let result = "0x";
    for (const v of _encode(object)){
        result += nibbles[v >> 4];
        result += nibbles[v & 0xf];
    }
    return result;
} //# sourceMappingURL=rlp-encode.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/events.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventPayload",
    ()=>EventPayload
]);
/**
 *  Events allow for applications to use the observer pattern, which
 *  allows subscribing and publishing events, outside the normal
 *  execution paths.
 *
 *  @_section api/utils/events:Events  [about-events]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/properties.js [app-ssr] (ecmascript)");
;
class EventPayload {
    /**
     *  The event filter.
     */ filter;
    /**
     *  The **EventEmitterable**.
     */ emitter;
    #listener;
    /**
     *  Create a new **EventPayload** for %%emitter%% with
     *  the %%listener%% and for %%filter%%.
     */ constructor(emitter, listener, filter){
        this.#listener = listener;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            emitter,
            filter
        });
    }
    /**
     *  Unregister the triggered listener for future events.
     */ async removeListener() {
        if (this.#listener == null) {
            return;
        }
        await this.emitter.off(this.filter, this.#listener);
    }
} //# sourceMappingURL=events.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/base64.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeBase64",
    ()=>decodeBase64,
    "encodeBase64",
    ()=>encodeBase64
]);
/**
 *  [Base64 encoding](link-wiki-base64) using 6-bit words to encode
 *  arbitrary bytes into a string using 65 printable symbols, the
 *  upper-case and lower-case alphabet, the digits ``0`` through ``9``,
 *  ``"+"`` and ``"/"`` with the ``"="`` used for padding.
 *
 *  @_subsection: api/utils:Base64 Encoding  [about-base64]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
;
function decodeBase64(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytesCopy"])(Buffer.from(value, "base64"));
}
;
function encodeBase64(data) {
    return Buffer.from((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(data)).toString("base64");
} //# sourceMappingURL=base64.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/geturl.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createGetUrl",
    ()=>createGetUrl,
    "getUrl",
    ()=>getUrl
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$http__$5b$external$5d$__$28$http$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/http [external] (http, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$https__$5b$external$5d$__$28$https$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/https [external] (https, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$zlib__$5b$external$5d$__$28$zlib$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/zlib [external] (zlib, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
;
;
;
;
;
function createGetUrl(options) {
    async function getUrl(req, signal) {
        // Make sure we weren't cancelled before sending
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(signal == null || !signal.cancelled, "request cancelled before sending", "CANCELLED");
        const protocol = req.url.split(":")[0].toLowerCase();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(protocol === "http" || protocol === "https", `unsupported protocol ${protocol}`, "UNSUPPORTED_OPERATION", {
            info: {
                protocol
            },
            operation: "request"
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(protocol === "https" || !req.credentials || req.allowInsecureAuthentication, "insecure authorized connections unsupported", "UNSUPPORTED_OPERATION", {
            operation: "request"
        });
        const method = req.method;
        const headers = Object.assign({}, req.headers);
        const reqOptions = {
            method,
            headers
        };
        if (options) {
            if (options.agent) {
                reqOptions.agent = options.agent;
            }
        }
        // Create a Node-specific AbortController, if available
        let abort = null;
        try {
            abort = new AbortController();
            reqOptions.abort = abort.signal;
        } catch (e) {
            console.log(e);
        }
        const request = (protocol === "http" ? __TURBOPACK__imported__module__$5b$externals$5d2f$http__$5b$external$5d$__$28$http$2c$__cjs$29$__["default"] : __TURBOPACK__imported__module__$5b$externals$5d2f$https__$5b$external$5d$__$28$https$2c$__cjs$29$__["default"]).request(req.url, reqOptions);
        request.setTimeout(req.timeout);
        const body = req.body;
        if (body) {
            request.write(Buffer.from(body));
        }
        request.end();
        return new Promise((resolve, reject)=>{
            if (signal) {
                signal.addListener(()=>{
                    if (abort) {
                        abort.abort();
                    }
                    reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeError"])("request cancelled", "CANCELLED"));
                });
            }
            request.on("timeout", ()=>{
                reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeError"])("request timeout", "TIMEOUT"));
            });
            request.once("response", (resp)=>{
                const statusCode = resp.statusCode || 0;
                const statusMessage = resp.statusMessage || "";
                const headers = Object.keys(resp.headers || {}).reduce((accum, name)=>{
                    let value = resp.headers[name] || "";
                    if (Array.isArray(value)) {
                        value = value.join(", ");
                    }
                    accum[name] = value;
                    return accum;
                }, {});
                let body = null;
                //resp.setEncoding("utf8");
                resp.on("data", (chunk)=>{
                    if (signal) {
                        try {
                            signal.checkSignal();
                        } catch (error) {
                            return reject(error);
                        }
                    }
                    if (body == null) {
                        body = chunk;
                    } else {
                        const newBody = new Uint8Array(body.length + chunk.length);
                        newBody.set(body, 0);
                        newBody.set(chunk, body.length);
                        body = newBody;
                    }
                });
                resp.on("end", ()=>{
                    try {
                        if (headers["content-encoding"] === "gzip" && body) {
                            body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$zlib__$5b$external$5d$__$28$zlib$2c$__cjs$29$__["gunzipSync"])(body));
                        }
                        resolve({
                            statusCode,
                            statusMessage,
                            headers,
                            body
                        });
                    } catch (error) {
                        reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeError"])("bad response data", "SERVER_ERROR", {
                            request: req,
                            info: {
                                response: resp,
                                error
                            }
                        }));
                    }
                });
                resp.on("error", (error)=>{
                    //@TODO: Should this just return nornal response with a server error?
                    error.response = {
                        statusCode,
                        statusMessage,
                        headers,
                        body
                    };
                    reject(error);
                });
            });
            request.on("error", (error)=>{
                reject(error);
            });
        });
    }
    return getUrl;
}
// @TODO: remove in v7; provided for backwards compat
const defaultGetUrl = createGetUrl({});
async function getUrl(req, signal) {
    return defaultGetUrl(req, signal);
} //# sourceMappingURL=geturl.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/fetch.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FetchCancelSignal",
    ()=>FetchCancelSignal,
    "FetchRequest",
    ()=>FetchRequest,
    "FetchResponse",
    ()=>FetchResponse
]);
/**
 *  Fetching content from the web is environment-specific, so Ethers
 *  provides an abstraction that each environment can implement to provide
 *  this service.
 *
 *  On [Node.js](link-node), the ``http`` and ``https`` libs are used to
 *  create a request object, register event listeners and process data
 *  and populate the [[FetchResponse]].
 *
 *  In a browser, the [DOM fetch](link-js-fetch) is used, and the resulting
 *  ``Promise`` is waited on to retrieve the payload.
 *
 *  The [[FetchRequest]] is responsible for handling many common situations,
 *  such as redirects, server throttling, authentication, etc.
 *
 *  It also handles common gateways, such as IPFS and data URIs.
 *
 *  @_section api/utils/fetching:Fetching Web Content  [about-fetch]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$base64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/base64.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/utf8.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$geturl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/geturl.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const MAX_ATTEMPTS = 12;
const SLOT_INTERVAL = 250;
// The global FetchGetUrlFunc implementation.
let defaultGetUrlFunc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$geturl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createGetUrl"])();
const reData = new RegExp("^data:([^;:]*)?(;base64)?,(.*)$", "i");
const reIpfs = new RegExp("^ipfs:/\/(ipfs/)?(.*)$", "i");
// If locked, new Gateways cannot be added
let locked = false;
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs
async function dataGatewayFunc(url, signal) {
    try {
        const match = url.match(reData);
        if (!match) {
            throw new Error("invalid data");
        }
        return new FetchResponse(200, "OK", {
            "content-type": match[1] || "text/plain"
        }, match[2] ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$base64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeBase64"])(match[3]) : unpercent(match[3]));
    } catch (error) {
        return new FetchResponse(599, "BAD REQUEST (invalid data: URI)", {}, null, new FetchRequest(url));
    }
}
/**
 *  Returns a [[FetchGatewayFunc]] for fetching content from a standard
 *  IPFS gateway hosted at %%baseUrl%%.
 */ function getIpfsGatewayFunc(baseUrl) {
    async function gatewayIpfs(url, signal) {
        try {
            const match = url.match(reIpfs);
            if (!match) {
                throw new Error("invalid link");
            }
            return new FetchRequest(`${baseUrl}${match[2]}`);
        } catch (error) {
            return new FetchResponse(599, "BAD REQUEST (invalid IPFS URI)", {}, null, new FetchRequest(url));
        }
    }
    return gatewayIpfs;
}
const Gateways = {
    "data": dataGatewayFunc,
    "ipfs": getIpfsGatewayFunc("https:/\/gateway.ipfs.io/ipfs/")
};
const fetchSignals = new WeakMap();
class FetchCancelSignal {
    #listeners;
    #cancelled;
    constructor(request){
        this.#listeners = [];
        this.#cancelled = false;
        fetchSignals.set(request, ()=>{
            if (this.#cancelled) {
                return;
            }
            this.#cancelled = true;
            for (const listener of this.#listeners){
                setTimeout(()=>{
                    listener();
                }, 0);
            }
            this.#listeners = [];
        });
    }
    addListener(listener) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(!this.#cancelled, "singal already cancelled", "UNSUPPORTED_OPERATION", {
            operation: "fetchCancelSignal.addCancelListener"
        });
        this.#listeners.push(listener);
    }
    get cancelled() {
        return this.#cancelled;
    }
    checkSignal() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(!this.cancelled, "cancelled", "CANCELLED", {});
    }
}
// Check the signal, throwing if it is cancelled
function checkSignal(signal) {
    if (signal == null) {
        throw new Error("missing signal; should not happen");
    }
    signal.checkSignal();
    return signal;
}
class FetchRequest {
    #allowInsecure;
    #gzip;
    #headers;
    #method;
    #timeout;
    #url;
    #body;
    #bodyType;
    #creds;
    // Hooks
    #preflight;
    #process;
    #retry;
    #signal;
    #throttle;
    #getUrlFunc;
    /**
     *  The fetch URL to request.
     */ get url() {
        return this.#url;
    }
    set url(url) {
        this.#url = String(url);
    }
    /**
     *  The fetch body, if any, to send as the request body. //(default: null)//
     *
     *  When setting a body, the intrinsic ``Content-Type`` is automatically
     *  set and will be used if **not overridden** by setting a custom
     *  header.
     *
     *  If %%body%% is null, the body is cleared (along with the
     *  intrinsic ``Content-Type``).
     *
     *  If %%body%% is a string, the intrinsic ``Content-Type`` is set to
     *  ``text/plain``.
     *
     *  If %%body%% is a Uint8Array, the intrinsic ``Content-Type`` is set to
     *  ``application/octet-stream``.
     *
     *  If %%body%% is any other object, the intrinsic ``Content-Type`` is
     *  set to ``application/json``.
     */ get body() {
        if (this.#body == null) {
            return null;
        }
        return new Uint8Array(this.#body);
    }
    set body(body) {
        if (body == null) {
            this.#body = undefined;
            this.#bodyType = undefined;
        } else if (typeof body === "string") {
            this.#body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toUtf8Bytes"])(body);
            this.#bodyType = "text/plain";
        } else if (body instanceof Uint8Array) {
            this.#body = body;
            this.#bodyType = "application/octet-stream";
        } else if (typeof body === "object") {
            this.#body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toUtf8Bytes"])(JSON.stringify(body));
            this.#bodyType = "application/json";
        } else {
            throw new Error("invalid body");
        }
    }
    /**
     *  Returns true if the request has a body.
     */ hasBody() {
        return this.#body != null;
    }
    /**
     *  The HTTP method to use when requesting the URI. If no method
     *  has been explicitly set, then ``GET`` is used if the body is
     *  null and ``POST`` otherwise.
     */ get method() {
        if (this.#method) {
            return this.#method;
        }
        if (this.hasBody()) {
            return "POST";
        }
        return "GET";
    }
    set method(method) {
        if (method == null) {
            method = "";
        }
        this.#method = String(method).toUpperCase();
    }
    /**
     *  The headers that will be used when requesting the URI. All
     *  keys are lower-case.
     *
     *  This object is a copy, so any changes will **NOT** be reflected
     *  in the ``FetchRequest``.
     *
     *  To set a header entry, use the ``setHeader`` method.
     */ get headers() {
        const headers = Object.assign({}, this.#headers);
        if (this.#creds) {
            headers["authorization"] = `Basic ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$base64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeBase64"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toUtf8Bytes"])(this.#creds))}`;
        }
        ;
        if (this.allowGzip) {
            headers["accept-encoding"] = "gzip";
        }
        if (headers["content-type"] == null && this.#bodyType) {
            headers["content-type"] = this.#bodyType;
        }
        if (this.body) {
            headers["content-length"] = String(this.body.length);
        }
        return headers;
    }
    /**
     *  Get the header for %%key%%, ignoring case.
     */ getHeader(key) {
        return this.headers[key.toLowerCase()];
    }
    /**
     *  Set the header for %%key%% to %%value%%. All values are coerced
     *  to a string.
     */ setHeader(key, value) {
        this.#headers[String(key).toLowerCase()] = String(value);
    }
    /**
     *  Clear all headers, resetting all intrinsic headers.
     */ clearHeaders() {
        this.#headers = {};
    }
    [Symbol.iterator]() {
        const headers = this.headers;
        const keys = Object.keys(headers);
        let index = 0;
        return {
            next: ()=>{
                if (index < keys.length) {
                    const key = keys[index++];
                    return {
                        value: [
                            key,
                            headers[key]
                        ],
                        done: false
                    };
                }
                return {
                    value: undefined,
                    done: true
                };
            }
        };
    }
    /**
     *  The value that will be sent for the ``Authorization`` header.
     *
     *  To set the credentials, use the ``setCredentials`` method.
     */ get credentials() {
        return this.#creds || null;
    }
    /**
     *  Sets an ``Authorization`` for %%username%% with %%password%%.
     */ setCredentials(username, password) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(!username.match(/:/), "invalid basic authentication username", "username", "[REDACTED]");
        this.#creds = `${username}:${password}`;
    }
    /**
     *  Enable and request gzip-encoded responses. The response will
     *  automatically be decompressed. //(default: true)//
     */ get allowGzip() {
        return this.#gzip;
    }
    set allowGzip(value) {
        this.#gzip = !!value;
    }
    /**
     *  Allow ``Authentication`` credentials to be sent over insecure
     *  channels. //(default: false)//
     */ get allowInsecureAuthentication() {
        return !!this.#allowInsecure;
    }
    set allowInsecureAuthentication(value) {
        this.#allowInsecure = !!value;
    }
    /**
     *  The timeout (in milliseconds) to wait for a complete response.
     *  //(default: 5 minutes)//
     */ get timeout() {
        return this.#timeout;
    }
    set timeout(timeout) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(timeout >= 0, "timeout must be non-zero", "timeout", timeout);
        this.#timeout = timeout;
    }
    /**
     *  This function is called prior to each request, for example
     *  during a redirection or retry in case of server throttling.
     *
     *  This offers an opportunity to populate headers or update
     *  content before sending a request.
     */ get preflightFunc() {
        return this.#preflight || null;
    }
    set preflightFunc(preflight) {
        this.#preflight = preflight;
    }
    /**
     *  This function is called after each response, offering an
     *  opportunity to provide client-level throttling or updating
     *  response data.
     *
     *  Any error thrown in this causes the ``send()`` to throw.
     *
     *  To schedule a retry attempt (assuming the maximum retry limit
     *  has not been reached), use [[response.throwThrottleError]].
     */ get processFunc() {
        return this.#process || null;
    }
    set processFunc(process) {
        this.#process = process;
    }
    /**
     *  This function is called on each retry attempt.
     */ get retryFunc() {
        return this.#retry || null;
    }
    set retryFunc(retry) {
        this.#retry = retry;
    }
    /**
     *  This function is called to fetch content from HTTP and
     *  HTTPS URLs and is platform specific (e.g. nodejs vs
     *  browsers).
     *
     *  This is by default the currently registered global getUrl
     *  function, which can be changed using [[registerGetUrl]].
     *  If this has been set, setting is to ``null`` will cause
     *  this FetchRequest (and any future clones) to revert back to
     *  using the currently registered global getUrl function.
     *
     *  Setting this is generally not necessary, but may be useful
     *  for developers that wish to intercept requests or to
     *  configurege a proxy or other agent.
     */ get getUrlFunc() {
        return this.#getUrlFunc || defaultGetUrlFunc;
    }
    set getUrlFunc(value) {
        this.#getUrlFunc = value;
    }
    /**
     *  Create a new FetchRequest instance with default values.
     *
     *  Once created, each property may be set before issuing a
     *  ``.send()`` to make the request.
     */ constructor(url){
        this.#url = String(url);
        this.#allowInsecure = false;
        this.#gzip = true;
        this.#headers = {};
        this.#method = "";
        this.#timeout = 300000;
        this.#throttle = {
            slotInterval: SLOT_INTERVAL,
            maxAttempts: MAX_ATTEMPTS
        };
        this.#getUrlFunc = null;
    }
    toString() {
        return `<FetchRequest method=${JSON.stringify(this.method)} url=${JSON.stringify(this.url)} headers=${JSON.stringify(this.headers)} body=${this.#body ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(this.#body) : "null"}>`;
    }
    /**
     *  Update the throttle parameters used to determine maximum
     *  attempts and exponential-backoff properties.
     */ setThrottleParams(params) {
        if (params.slotInterval != null) {
            this.#throttle.slotInterval = params.slotInterval;
        }
        if (params.maxAttempts != null) {
            this.#throttle.maxAttempts = params.maxAttempts;
        }
    }
    async #send(attempt, expires, delay, _request, _response) {
        if (attempt >= this.#throttle.maxAttempts) {
            return _response.makeServerError("exceeded maximum retry limit");
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(getTime() <= expires, "timeout", "TIMEOUT", {
            operation: "request.send",
            reason: "timeout",
            request: _request
        });
        if (delay > 0) {
            await wait(delay);
        }
        let req = this.clone();
        const scheme = (req.url.split(":")[0] || "").toLowerCase();
        // Process any Gateways
        if (scheme in Gateways) {
            const result = await Gateways[scheme](req.url, checkSignal(_request.#signal));
            if (result instanceof FetchResponse) {
                let response = result;
                if (this.processFunc) {
                    checkSignal(_request.#signal);
                    try {
                        response = await this.processFunc(req, response);
                    } catch (error) {
                        // Something went wrong during processing; throw a 5xx server error
                        if (error.throttle == null || typeof error.stall !== "number") {
                            response.makeServerError("error in post-processing function", error).assertOk();
                        }
                    // Ignore throttling
                    }
                }
                return response;
            }
            req = result;
        }
        // We have a preflight function; update the request
        if (this.preflightFunc) {
            req = await this.preflightFunc(req);
        }
        const resp = await this.getUrlFunc(req, checkSignal(_request.#signal));
        let response = new FetchResponse(resp.statusCode, resp.statusMessage, resp.headers, resp.body, _request);
        if (response.statusCode === 301 || response.statusCode === 302) {
            // Redirect
            try {
                const location = response.headers.location || "";
                return req.redirect(location).#send(attempt + 1, expires, 0, _request, response);
            } catch (error) {}
            // Things won't get any better on another attempt; abort
            return response;
        } else if (response.statusCode === 429) {
            // Throttle
            if (this.retryFunc == null || await this.retryFunc(req, response, attempt)) {
                const retryAfter = response.headers["retry-after"];
                let delay = this.#throttle.slotInterval * Math.trunc(Math.random() * Math.pow(2, attempt));
                if (typeof retryAfter === "string" && retryAfter.match(/^[1-9][0-9]*$/)) {
                    delay = parseInt(retryAfter);
                }
                return req.clone().#send(attempt + 1, expires, delay, _request, response);
            }
        }
        if (this.processFunc) {
            checkSignal(_request.#signal);
            try {
                response = await this.processFunc(req, response);
            } catch (error) {
                // Something went wrong during processing; throw a 5xx server error
                if (error.throttle == null || typeof error.stall !== "number") {
                    response.makeServerError("error in post-processing function", error).assertOk();
                }
                // Throttle
                let delay = this.#throttle.slotInterval * Math.trunc(Math.random() * Math.pow(2, attempt));
                ;
                if (error.stall >= 0) {
                    delay = error.stall;
                }
                return req.clone().#send(attempt + 1, expires, delay, _request, response);
            }
        }
        return response;
    }
    /**
     *  Resolves to the response by sending the request.
     */ send() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(this.#signal == null, "request already sent", "UNSUPPORTED_OPERATION", {
            operation: "fetchRequest.send"
        });
        this.#signal = new FetchCancelSignal(this);
        return this.#send(0, getTime() + this.timeout, 0, this, new FetchResponse(0, "", {}, null, this));
    }
    /**
     *  Cancels the inflight response, causing a ``CANCELLED``
     *  error to be rejected from the [[send]].
     */ cancel() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(this.#signal != null, "request has not been sent", "UNSUPPORTED_OPERATION", {
            operation: "fetchRequest.cancel"
        });
        const signal = fetchSignals.get(this);
        if (!signal) {
            throw new Error("missing signal; should not happen");
        }
        signal();
    }
    /**
     *  Returns a new [[FetchRequest]] that represents the redirection
     *  to %%location%%.
     */ redirect(location) {
        // Redirection; for now we only support absolute locations
        const current = this.url.split(":")[0].toLowerCase();
        const target = location.split(":")[0].toLowerCase();
        // Don't allow redirecting:
        // - non-GET requests
        // - downgrading the security (e.g. https => http)
        // - to non-HTTP (or non-HTTPS) protocols [this could be relaxed?]
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(this.method === "GET" && (current !== "https" || target !== "http") && location.match(/^https?:/), `unsupported redirect`, "UNSUPPORTED_OPERATION", {
            operation: `redirect(${this.method} ${JSON.stringify(this.url)} => ${JSON.stringify(location)})`
        });
        // Create a copy of this request, with a new URL
        const req = new FetchRequest(location);
        req.method = "GET";
        req.allowGzip = this.allowGzip;
        req.timeout = this.timeout;
        req.#headers = Object.assign({}, this.#headers);
        if (this.#body) {
            req.#body = new Uint8Array(this.#body);
        }
        req.#bodyType = this.#bodyType;
        // Do not forward credentials unless on the same domain; only absolute
        //req.allowInsecure = false;
        // paths are currently supported; may want a way to specify to forward?
        //setStore(req.#props, "creds", getStore(this.#pros, "creds"));
        return req;
    }
    /**
     *  Create a new copy of this request.
     */ clone() {
        const clone = new FetchRequest(this.url);
        // Preserve "default method" (i.e. null)
        clone.#method = this.#method;
        // Preserve "default body" with type, copying the Uint8Array is present
        if (this.#body) {
            clone.#body = this.#body;
        }
        clone.#bodyType = this.#bodyType;
        // Preserve "default headers"
        clone.#headers = Object.assign({}, this.#headers);
        // Credentials is readonly, so we copy internally
        clone.#creds = this.#creds;
        if (this.allowGzip) {
            clone.allowGzip = true;
        }
        clone.timeout = this.timeout;
        if (this.allowInsecureAuthentication) {
            clone.allowInsecureAuthentication = true;
        }
        clone.#preflight = this.#preflight;
        clone.#process = this.#process;
        clone.#retry = this.#retry;
        clone.#throttle = Object.assign({}, this.#throttle);
        clone.#getUrlFunc = this.#getUrlFunc;
        return clone;
    }
    /**
     *  Locks all static configuration for gateways and FetchGetUrlFunc
     *  registration.
     */ static lockConfig() {
        locked = true;
    }
    /**
     *  Get the current Gateway function for %%scheme%%.
     */ static getGateway(scheme) {
        return Gateways[scheme.toLowerCase()] || null;
    }
    /**
     *  Use the %%func%% when fetching URIs using %%scheme%%.
     *
     *  This method affects all requests globally.
     *
     *  If [[lockConfig]] has been called, no change is made and this
     *  throws.
     */ static registerGateway(scheme, func) {
        scheme = scheme.toLowerCase();
        if (scheme === "http" || scheme === "https") {
            throw new Error(`cannot intercept ${scheme}; use registerGetUrl`);
        }
        if (locked) {
            throw new Error("gateways locked");
        }
        Gateways[scheme] = func;
    }
    /**
     *  Use %%getUrl%% when fetching URIs over HTTP and HTTPS requests.
     *
     *  This method affects all requests globally.
     *
     *  If [[lockConfig]] has been called, no change is made and this
     *  throws.
     */ static registerGetUrl(getUrl) {
        if (locked) {
            throw new Error("gateways locked");
        }
        defaultGetUrlFunc = getUrl;
    }
    /**
     *  Creates a getUrl function that fetches content from HTTP and
     *  HTTPS URLs.
     *
     *  The available %%options%% are dependent on the platform
     *  implementation of the default getUrl function.
     *
     *  This is not generally something that is needed, but is useful
     *  when trying to customize simple behaviour when fetching HTTP
     *  content.
     */ static createGetUrlFunc(options) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$geturl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createGetUrl"])(options);
    }
    /**
     *  Creates a function that can "fetch" data URIs.
     *
     *  Note that this is automatically done internally to support
     *  data URIs, so it is not necessary to register it.
     *
     *  This is not generally something that is needed, but may
     *  be useful in a wrapper to perfom custom data URI functionality.
     */ static createDataGateway() {
        return dataGatewayFunc;
    }
    /**
     *  Creates a function that will fetch IPFS (unvalidated) from
     *  a custom gateway baseUrl.
     *
     *  The default IPFS gateway used internally is
     *  ``"https:/\/gateway.ipfs.io/ipfs/"``.
     */ static createIpfsGatewayFunc(baseUrl) {
        return getIpfsGatewayFunc(baseUrl);
    }
}
;
class FetchResponse {
    #statusCode;
    #statusMessage;
    #headers;
    #body;
    #request;
    #error;
    toString() {
        return `<FetchResponse status=${this.statusCode} body=${this.#body ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(this.#body) : "null"}>`;
    }
    /**
     *  The response status code.
     */ get statusCode() {
        return this.#statusCode;
    }
    /**
     *  The response status message.
     */ get statusMessage() {
        return this.#statusMessage;
    }
    /**
     *  The response headers. All keys are lower-case.
     */ get headers() {
        return Object.assign({}, this.#headers);
    }
    /**
     *  The response body, or ``null`` if there was no body.
     */ get body() {
        return this.#body == null ? null : new Uint8Array(this.#body);
    }
    /**
     *  The response body as a UTF-8 encoded string, or the empty
     *  string (i.e. ``""``) if there was no body.
     *
     *  An error is thrown if the body is invalid UTF-8 data.
     */ get bodyText() {
        try {
            return this.#body == null ? "" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toUtf8String"])(this.#body);
        } catch (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(false, "response body is not valid UTF-8 data", "UNSUPPORTED_OPERATION", {
                operation: "bodyText",
                info: {
                    response: this
                }
            });
        }
    }
    /**
     *  The response body, decoded as JSON.
     *
     *  An error is thrown if the body is invalid JSON-encoded data
     *  or if there was no body.
     */ get bodyJson() {
        try {
            return JSON.parse(this.bodyText);
        } catch (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(false, "response body is not valid JSON", "UNSUPPORTED_OPERATION", {
                operation: "bodyJson",
                info: {
                    response: this
                }
            });
        }
    }
    [Symbol.iterator]() {
        const headers = this.headers;
        const keys = Object.keys(headers);
        let index = 0;
        return {
            next: ()=>{
                if (index < keys.length) {
                    const key = keys[index++];
                    return {
                        value: [
                            key,
                            headers[key]
                        ],
                        done: false
                    };
                }
                return {
                    value: undefined,
                    done: true
                };
            }
        };
    }
    constructor(statusCode, statusMessage, headers, body, request){
        this.#statusCode = statusCode;
        this.#statusMessage = statusMessage;
        this.#headers = Object.keys(headers).reduce((accum, k)=>{
            accum[k.toLowerCase()] = String(headers[k]);
            return accum;
        }, {});
        this.#body = body == null ? null : new Uint8Array(body);
        this.#request = request || null;
        this.#error = {
            message: ""
        };
    }
    /**
     *  Return a Response with matching headers and body, but with
     *  an error status code (i.e. 599) and %%message%% with an
     *  optional %%error%%.
     */ makeServerError(message, error) {
        let statusMessage;
        if (!message) {
            message = `${this.statusCode} ${this.statusMessage}`;
            statusMessage = `CLIENT ESCALATED SERVER ERROR (${message})`;
        } else {
            statusMessage = `CLIENT ESCALATED SERVER ERROR (${this.statusCode} ${this.statusMessage}; ${message})`;
        }
        const response = new FetchResponse(599, statusMessage, this.headers, this.body, this.#request || undefined);
        response.#error = {
            message,
            error
        };
        return response;
    }
    /**
     *  If called within a [request.processFunc](FetchRequest-processFunc)
     *  call, causes the request to retry as if throttled for %%stall%%
     *  milliseconds.
     */ throwThrottleError(message, stall) {
        if (stall == null) {
            stall = -1;
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(Number.isInteger(stall) && stall >= 0, "invalid stall timeout", "stall", stall);
        }
        const error = new Error(message || "throttling requests");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(error, {
            stall,
            throttle: true
        });
        throw error;
    }
    /**
     *  Get the header value for %%key%%, ignoring case.
     */ getHeader(key) {
        return this.headers[key.toLowerCase()];
    }
    /**
     *  Returns true if the response has a body.
     */ hasBody() {
        return this.#body != null;
    }
    /**
     *  The request made for this response.
     */ get request() {
        return this.#request;
    }
    /**
     *  Returns true if this response was a success statusCode.
     */ ok() {
        return this.#error.message === "" && this.statusCode >= 200 && this.statusCode < 300;
    }
    /**
     *  Throws a ``SERVER_ERROR`` if this response is not ok.
     */ assertOk() {
        if (this.ok()) {
            return;
        }
        let { message, error } = this.#error;
        if (message === "") {
            message = `server response ${this.statusCode} ${this.statusMessage}`;
        }
        let requestUrl = null;
        if (this.request) {
            requestUrl = this.request.url;
        }
        let responseBody = null;
        try {
            if (this.#body) {
                responseBody = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toUtf8String"])(this.#body);
            }
        } catch (e) {}
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(false, message, "SERVER_ERROR", {
            request: this.request || "unknown request",
            response: this,
            error,
            info: {
                requestUrl,
                responseBody,
                responseStatus: `${this.statusCode} ${this.statusMessage}`
            }
        });
    }
}
function getTime() {
    return new Date().getTime();
}
function unpercent(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toUtf8Bytes"])(value.replace(/%([0-9a-f][0-9a-f])/gi, (all, code)=>{
        return String.fromCharCode(parseInt(code, 16));
    }));
}
function wait(delay) {
    return new Promise((resolve)=>setTimeout(resolve, delay));
} //# sourceMappingURL=fetch.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/rlp-decode.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeRlp",
    ()=>decodeRlp
]);
//See: https://github.com/ethereum/wiki/wiki/RLP
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
;
;
;
function hexlifyByte(value) {
    let result = value.toString(16);
    while(result.length < 2){
        result = "0" + result;
    }
    return "0x" + result;
}
function unarrayifyInteger(data, offset, length) {
    let result = 0;
    for(let i = 0; i < length; i++){
        result = result * 256 + data[offset + i];
    }
    return result;
}
function _decodeChildren(data, offset, childOffset, length) {
    const result = [];
    while(childOffset < offset + 1 + length){
        const decoded = _decode(data, childOffset);
        result.push(decoded.result);
        childOffset += decoded.consumed;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(childOffset <= offset + 1 + length, "child data too short", "BUFFER_OVERRUN", {
            buffer: data,
            length,
            offset
        });
    }
    return {
        consumed: 1 + length,
        result: result
    };
}
// returns { consumed: number, result: Object }
function _decode(data, offset) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(data.length !== 0, "data too short", "BUFFER_OVERRUN", {
        buffer: data,
        length: 0,
        offset: 1
    });
    const checkOffset = (offset)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(offset <= data.length, "data short segment too short", "BUFFER_OVERRUN", {
            buffer: data,
            length: data.length,
            offset
        });
    };
    // Array with extra length prefix
    if (data[offset] >= 0xf8) {
        const lengthLength = data[offset] - 0xf7;
        checkOffset(offset + 1 + lengthLength);
        const length = unarrayifyInteger(data, offset + 1, lengthLength);
        checkOffset(offset + 1 + lengthLength + length);
        return _decodeChildren(data, offset, offset + 1 + lengthLength, lengthLength + length);
    } else if (data[offset] >= 0xc0) {
        const length = data[offset] - 0xc0;
        checkOffset(offset + 1 + length);
        return _decodeChildren(data, offset, offset + 1, length);
    } else if (data[offset] >= 0xb8) {
        const lengthLength = data[offset] - 0xb7;
        checkOffset(offset + 1 + lengthLength);
        const length = unarrayifyInteger(data, offset + 1, lengthLength);
        checkOffset(offset + 1 + lengthLength + length);
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(data.slice(offset + 1 + lengthLength, offset + 1 + lengthLength + length));
        return {
            consumed: 1 + lengthLength + length,
            result: result
        };
    } else if (data[offset] >= 0x80) {
        const length = data[offset] - 0x80;
        checkOffset(offset + 1 + length);
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(data.slice(offset + 1, offset + 1 + length));
        return {
            consumed: 1 + length,
            result: result
        };
    }
    return {
        consumed: 1,
        result: hexlifyByte(data[offset])
    };
}
function decodeRlp(_data) {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_data, "data");
    const decoded = _decode(data, 0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(decoded.consumed === data.length, "unexpected junk after rlp payload", "data", _data);
    return decoded.result;
} //# sourceMappingURL=rlp-decode.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/base58.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeBase58",
    ()=>decodeBase58,
    "encodeBase58",
    ()=>encodeBase58
]);
/**
 *  The [Base58 Encoding](link-base58) scheme allows a **numeric** value
 *  to be encoded as a compact string using a radix of 58 using only
 *  alpha-numeric characters. Confusingly similar characters are omitted
 *  (i.e. ``"l0O"``).
 *
 *  Note that Base58 encodes a **numeric** value, not arbitrary bytes,
 *  since any zero-bytes on the left would get removed. To mitigate this
 *  issue most schemes that use Base58 choose specific high-order values
 *  to ensure non-zero prefixes.
 *
 *  @_subsection: api/utils:Base58 Encoding [about-base58]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/maths.js [app-ssr] (ecmascript)");
;
;
;
const Alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
let Lookup = null;
function getAlpha(letter) {
    if (Lookup == null) {
        Lookup = {};
        for(let i = 0; i < Alphabet.length; i++){
            Lookup[Alphabet[i]] = BigInt(i);
        }
    }
    const result = Lookup[letter];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(result != null, `invalid base58 value`, "letter", letter);
    return result;
}
const BN_0 = BigInt(0);
const BN_58 = BigInt(58);
function encodeBase58(_value) {
    const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_value);
    let value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBigInt"])(bytes);
    let result = "";
    while(value){
        result = Alphabet[Number(value % BN_58)] + result;
        value /= BN_58;
    }
    // Account for leading padding zeros
    for(let i = 0; i < bytes.length; i++){
        if (bytes[i]) {
            break;
        }
        result = Alphabet[0] + result;
    }
    return result;
}
function decodeBase58(value) {
    let result = BN_0;
    for(let i = 0; i < value.length; i++){
        result *= BN_58;
        result += getAlpha(value[i]);
    }
    return result;
} //# sourceMappingURL=base58.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/fixednumber.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FixedNumber",
    ()=>FixedNumber
]);
/**
 *  The **FixedNumber** class permits using values with decimal places,
 *  using fixed-pont math.
 *
 *  Fixed-point math is still based on integers under-the-hood, but uses an
 *  internal offset to store fractional components below, and each operation
 *  corrects for this after each operation.
 *
 *  @_section: api/utils/fixed-point-math:Fixed-Point Maths  [about-fixed-point-math]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/maths.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/properties.js [app-ssr] (ecmascript)");
;
;
;
;
const BN_N1 = BigInt(-1);
const BN_0 = BigInt(0);
const BN_1 = BigInt(1);
const BN_5 = BigInt(5);
const _guard = {};
// Constant to pull zeros from for multipliers
let Zeros = "0000";
while(Zeros.length < 80){
    Zeros += Zeros;
}
// Returns a string "1" followed by decimal "0"s
function getTens(decimals) {
    let result = Zeros;
    while(result.length < decimals){
        result += result;
    }
    return BigInt("1" + result.substring(0, decimals));
}
function checkValue(val, format, safeOp) {
    const width = BigInt(format.width);
    if (format.signed) {
        const limit = BN_1 << width - BN_1;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(safeOp == null || val >= -limit && val < limit, "overflow", "NUMERIC_FAULT", {
            operation: safeOp,
            fault: "overflow",
            value: val
        });
        if (val > BN_0) {
            val = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromTwos"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mask"])(val, width), width);
        } else {
            val = -(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromTwos"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mask"])(-val, width), width);
        }
    } else {
        const limit = BN_1 << width;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(safeOp == null || val >= 0 && val < limit, "overflow", "NUMERIC_FAULT", {
            operation: safeOp,
            fault: "overflow",
            value: val
        });
        val = (val % limit + limit) % limit & limit - BN_1;
    }
    return val;
}
function getFormat(value) {
    if (typeof value === "number") {
        value = `fixed128x${value}`;
    }
    let signed = true;
    let width = 128;
    let decimals = 18;
    if (typeof value === "string") {
        // Parse the format string
        if (value === "fixed") {
        // defaults...
        } else if (value === "ufixed") {
            signed = false;
        } else {
            const match = value.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(match, "invalid fixed format", "format", value);
            signed = match[1] !== "u";
            width = parseInt(match[2]);
            decimals = parseInt(match[3]);
        }
    } else if (value) {
        // Extract the values from the object
        const v = value;
        const check = (key, type, defaultValue)=>{
            if (v[key] == null) {
                return defaultValue;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(typeof v[key] === type, "invalid fixed format (" + key + " not " + type + ")", "format." + key, v[key]);
            return v[key];
        };
        signed = check("signed", "boolean", signed);
        width = check("width", "number", width);
        decimals = check("decimals", "number", decimals);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(width % 8 === 0, "invalid FixedNumber width (not byte aligned)", "format.width", width);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(decimals <= 80, "invalid FixedNumber decimals (too large)", "format.decimals", decimals);
    const name = (signed ? "" : "u") + "fixed" + String(width) + "x" + String(decimals);
    return {
        signed,
        width,
        decimals,
        name
    };
}
function toString(val, decimals) {
    let negative = "";
    if (val < BN_0) {
        negative = "-";
        val *= BN_N1;
    }
    let str = val.toString();
    // No decimal point for whole values
    if (decimals === 0) {
        return negative + str;
    }
    // Pad out to the whole component (including a whole digit)
    while(str.length <= decimals){
        str = Zeros + str;
    }
    // Insert the decimal point
    const index = str.length - decimals;
    str = str.substring(0, index) + "." + str.substring(index);
    // Trim the whole component (leaving at least one 0)
    while(str[0] === "0" && str[1] !== "."){
        str = str.substring(1);
    }
    // Trim the decimal component (leaving at least one 0)
    while(str[str.length - 1] === "0" && str[str.length - 2] !== "."){
        str = str.substring(0, str.length - 1);
    }
    return negative + str;
}
class FixedNumber {
    /**
     *  The specific fixed-point arithmetic field for this value.
     */ format;
    #format;
    // The actual value (accounting for decimals)
    #val;
    // A base-10 value to multiple values by to maintain the magnitude
    #tens;
    /**
     *  This is a property so console.log shows a human-meaningful value.
     *
     *  @private
     */ _value;
    // Use this when changing this file to get some typing info,
    // but then switch to any to mask the internal type
    //constructor(guard: any, value: bigint, format: _FixedFormat) {
    /**
     *  @private
     */ constructor(guard, value, format){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertPrivate"])(guard, _guard, "FixedNumber");
        this.#val = value;
        this.#format = format;
        const _value = toString(value, format.decimals);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(this, {
            format: format.name,
            _value
        });
        this.#tens = getTens(format.decimals);
    }
    /**
     *  If true, negative values are permitted, otherwise only
     *  positive values and zero are allowed.
     */ get signed() {
        return this.#format.signed;
    }
    /**
     *  The number of bits available to store the value.
     */ get width() {
        return this.#format.width;
    }
    /**
     *  The number of decimal places in the fixed-point arithment field.
     */ get decimals() {
        return this.#format.decimals;
    }
    /**
     *  The value as an integer, based on the smallest unit the
     *  [[decimals]] allow.
     */ get value() {
        return this.#val;
    }
    #checkFormat(other) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(this.format === other.format, "incompatible format; use fixedNumber.toFormat", "other", other);
    }
    #checkValue(val, safeOp) {
        /*
                const width = BigInt(this.width);
                if (this.signed) {
                    const limit = (BN_1 << (width - BN_1));
                    assert(safeOp == null || (val >= -limit  && val < limit), "overflow", "NUMERIC_FAULT", {
                        operation: <string>safeOp, fault: "overflow", value: val
                    });
        
                    if (val > BN_0) {
                        val = fromTwos(mask(val, width), width);
                    } else {
                        val = -fromTwos(mask(-val, width), width);
                    }
        
                } else {
                    const masked = mask(val, width);
                    assert(safeOp == null || (val >= 0 && val === masked), "overflow", "NUMERIC_FAULT", {
                        operation: <string>safeOp, fault: "overflow", value: val
                    });
                    val = masked;
                }
        */ val = checkValue(val, this.#format, safeOp);
        return new FixedNumber(_guard, val, this.#format);
    }
    #add(o, safeOp) {
        this.#checkFormat(o);
        return this.#checkValue(this.#val + o.#val, safeOp);
    }
    /**
     *  Returns a new [[FixedNumber]] with the result of %%this%% added
     *  to %%other%%, ignoring overflow.
     */ addUnsafe(other) {
        return this.#add(other);
    }
    /**
     *  Returns a new [[FixedNumber]] with the result of %%this%% added
     *  to %%other%%. A [[NumericFaultError]] is thrown if overflow
     *  occurs.
     */ add(other) {
        return this.#add(other, "add");
    }
    #sub(o, safeOp) {
        this.#checkFormat(o);
        return this.#checkValue(this.#val - o.#val, safeOp);
    }
    /**
     *  Returns a new [[FixedNumber]] with the result of %%other%% subtracted
     *  from %%this%%, ignoring overflow.
     */ subUnsafe(other) {
        return this.#sub(other);
    }
    /**
     *  Returns a new [[FixedNumber]] with the result of %%other%% subtracted
     *  from %%this%%. A [[NumericFaultError]] is thrown if overflow
     *  occurs.
     */ sub(other) {
        return this.#sub(other, "sub");
    }
    #mul(o, safeOp) {
        this.#checkFormat(o);
        return this.#checkValue(this.#val * o.#val / this.#tens, safeOp);
    }
    /**
     *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
     *  by %%other%%, ignoring overflow and underflow (precision loss).
     */ mulUnsafe(other) {
        return this.#mul(other);
    }
    /**
     *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
     *  by %%other%%. A [[NumericFaultError]] is thrown if overflow
     *  occurs.
     */ mul(other) {
        return this.#mul(other, "mul");
    }
    /**
     *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
     *  by %%other%%. A [[NumericFaultError]] is thrown if overflow
     *  occurs or if underflow (precision loss) occurs.
     */ mulSignal(other) {
        this.#checkFormat(other);
        const value = this.#val * other.#val;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(value % this.#tens === BN_0, "precision lost during signalling mul", "NUMERIC_FAULT", {
            operation: "mulSignal",
            fault: "underflow",
            value: this
        });
        return this.#checkValue(value / this.#tens, "mulSignal");
    }
    #div(o, safeOp) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(o.#val !== BN_0, "division by zero", "NUMERIC_FAULT", {
            operation: "div",
            fault: "divide-by-zero",
            value: this
        });
        this.#checkFormat(o);
        return this.#checkValue(this.#val * this.#tens / o.#val, safeOp);
    }
    /**
     *  Returns a new [[FixedNumber]] with the result of %%this%% divided
     *  by %%other%%, ignoring underflow (precision loss). A
     *  [[NumericFaultError]] is thrown if overflow occurs.
     */ divUnsafe(other) {
        return this.#div(other);
    }
    /**
     *  Returns a new [[FixedNumber]] with the result of %%this%% divided
     *  by %%other%%, ignoring underflow (precision loss). A
     *  [[NumericFaultError]] is thrown if overflow occurs.
     */ div(other) {
        return this.#div(other, "div");
    }
    /**
     *  Returns a new [[FixedNumber]] with the result of %%this%% divided
     *  by %%other%%. A [[NumericFaultError]] is thrown if underflow
     *  (precision loss) occurs.
     */ divSignal(other) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(other.#val !== BN_0, "division by zero", "NUMERIC_FAULT", {
            operation: "div",
            fault: "divide-by-zero",
            value: this
        });
        this.#checkFormat(other);
        const value = this.#val * this.#tens;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(value % other.#val === BN_0, "precision lost during signalling div", "NUMERIC_FAULT", {
            operation: "divSignal",
            fault: "underflow",
            value: this
        });
        return this.#checkValue(value / other.#val, "divSignal");
    }
    /**
     *  Returns a comparison result between %%this%% and %%other%%.
     *
     *  This is suitable for use in sorting, where ``-1`` implies %%this%%
     *  is smaller, ``1`` implies %%this%% is larger and ``0`` implies
     *  both are equal.
     */ cmp(other) {
        let a = this.value, b = other.value;
        // Coerce a and b to the same magnitude
        const delta = this.decimals - other.decimals;
        if (delta > 0) {
            b *= getTens(delta);
        } else if (delta < 0) {
            a *= getTens(-delta);
        }
        // Comnpare
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    }
    /**
     *  Returns true if %%other%% is equal to %%this%%.
     */ eq(other) {
        return this.cmp(other) === 0;
    }
    /**
     *  Returns true if %%other%% is less than to %%this%%.
     */ lt(other) {
        return this.cmp(other) < 0;
    }
    /**
     *  Returns true if %%other%% is less than or equal to %%this%%.
     */ lte(other) {
        return this.cmp(other) <= 0;
    }
    /**
     *  Returns true if %%other%% is greater than to %%this%%.
     */ gt(other) {
        return this.cmp(other) > 0;
    }
    /**
     *  Returns true if %%other%% is greater than or equal to %%this%%.
     */ gte(other) {
        return this.cmp(other) >= 0;
    }
    /**
     *  Returns a new [[FixedNumber]] which is the largest **integer**
     *  that is less than or equal to %%this%%.
     *
     *  The decimal component of the result will always be ``0``.
     */ floor() {
        let val = this.#val;
        if (this.#val < BN_0) {
            val -= this.#tens - BN_1;
        }
        val = this.#val / this.#tens * this.#tens;
        return this.#checkValue(val, "floor");
    }
    /**
     *  Returns a new [[FixedNumber]] which is the smallest **integer**
     *  that is greater than or equal to %%this%%.
     *
     *  The decimal component of the result will always be ``0``.
     */ ceiling() {
        let val = this.#val;
        if (this.#val > BN_0) {
            val += this.#tens - BN_1;
        }
        val = this.#val / this.#tens * this.#tens;
        return this.#checkValue(val, "ceiling");
    }
    /**
     *  Returns a new [[FixedNumber]] with the decimal component
     *  rounded up on ties at %%decimals%% places.
     */ round(decimals) {
        if (decimals == null) {
            decimals = 0;
        }
        // Not enough precision to not already be rounded
        if (decimals >= this.decimals) {
            return this;
        }
        const delta = this.decimals - decimals;
        const bump = BN_5 * getTens(delta - 1);
        let value = this.value + bump;
        const tens = getTens(delta);
        value = value / tens * tens;
        checkValue(value, this.#format, "round");
        return new FixedNumber(_guard, value, this.#format);
    }
    /**
     *  Returns true if %%this%% is equal to ``0``.
     */ isZero() {
        return this.#val === BN_0;
    }
    /**
     *  Returns true if %%this%% is less than ``0``.
     */ isNegative() {
        return this.#val < BN_0;
    }
    /**
     *  Returns the string representation of %%this%%.
     */ toString() {
        return this._value;
    }
    /**
     *  Returns a float approximation.
     *
     *  Due to IEEE 754 precission (or lack thereof), this function
     *  can only return an approximation and most values will contain
     *  rounding errors.
     */ toUnsafeFloat() {
        return parseFloat(this.toString());
    }
    /**
     *  Return a new [[FixedNumber]] with the same value but has had
     *  its field set to %%format%%.
     *
     *  This will throw if the value cannot fit into %%format%%.
     */ toFormat(format) {
        return FixedNumber.fromString(this.toString(), format);
    }
    /**
     *  Creates a new [[FixedNumber]] for %%value%% divided by
     *  %%decimal%% places with %%format%%.
     *
     *  This will throw a [[NumericFaultError]] if %%value%% (once adjusted
     *  for %%decimals%%) cannot fit in %%format%%, either due to overflow
     *  or underflow (precision loss).
     */ static fromValue(_value, _decimals, _format) {
        const decimals = _decimals == null ? 0 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNumber"])(_decimals);
        const format = getFormat(_format);
        let value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigInt"])(_value, "value");
        const delta = decimals - format.decimals;
        if (delta > 0) {
            const tens = getTens(delta);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(value % tens === BN_0, "value loses precision for format", "NUMERIC_FAULT", {
                operation: "fromValue",
                fault: "underflow",
                value: _value
            });
            value /= tens;
        } else if (delta < 0) {
            value *= getTens(-delta);
        }
        checkValue(value, format, "fromValue");
        return new FixedNumber(_guard, value, format);
    }
    /**
     *  Creates a new [[FixedNumber]] for %%value%% with %%format%%.
     *
     *  This will throw a [[NumericFaultError]] if %%value%% cannot fit
     *  in %%format%%, either due to overflow or underflow (precision loss).
     */ static fromString(_value, _format) {
        const match = _value.match(/^(-?)([0-9]*)\.?([0-9]*)$/);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(match && match[2].length + match[3].length > 0, "invalid FixedNumber string value", "value", _value);
        const format = getFormat(_format);
        let whole = match[2] || "0", decimal = match[3] || "";
        // Pad out the decimals
        while(decimal.length < format.decimals){
            decimal += Zeros;
        }
        // Check precision is safe
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(decimal.substring(format.decimals).match(/^0*$/), "too many decimals for format", "NUMERIC_FAULT", {
            operation: "fromString",
            fault: "underflow",
            value: _value
        });
        // Remove extra padding
        decimal = decimal.substring(0, format.decimals);
        const value = BigInt(match[1] + whole + decimal);
        checkValue(value, format, "fromString");
        return new FixedNumber(_guard, value, format);
    }
    /**
     *  Creates a new [[FixedNumber]] with the big-endian representation
     *  %%value%% with %%format%%.
     *
     *  This will throw a [[NumericFaultError]] if %%value%% cannot fit
     *  in %%format%% due to overflow.
     */ static fromBytes(_value, _format) {
        let value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBigInt"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_value, "value"));
        const format = getFormat(_format);
        if (format.signed) {
            value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromTwos"])(value, format.width);
        }
        checkValue(value, format, "fromBytes");
        return new FixedNumber(_guard, value, format);
    }
} //const f1 = FixedNumber.fromString("12.56", "fixed16x2");
 //const f2 = FixedNumber.fromString("0.3", "fixed16x2");
 //console.log(f1.divSignal(f2));
 //const BUMP = FixedNumber.from("0.5");
 //# sourceMappingURL=fixednumber.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/units.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatEther",
    ()=>formatEther,
    "formatUnits",
    ()=>formatUnits,
    "parseEther",
    ()=>parseEther,
    "parseUnits",
    ()=>parseUnits
]);
/**
 *  Most interactions with Ethereum requires integer values, which use
 *  the smallest magnitude unit.
 *
 *  For example, imagine dealing with dollars and cents. Since dollars
 *  are divisible, non-integer values are possible, such as ``$10.77``.
 *  By using the smallest indivisible unit (i.e. cents), the value can
 *  be kept as the integer ``1077``.
 *
 *  When receiving decimal input from the user (as a decimal string),
 *  the value should be converted to an integer and when showing a user
 *  a value, the integer value should be converted to a decimal string.
 *
 *  This creates a clear distinction, between values to be used by code
 *  (integers) and values used for display logic to users (decimals).
 *
 *  The native unit in Ethereum, //ether// is divisible to 18 decimal places,
 *  where each individual unit is called a //wei//.
 *
 *  @_subsection api/utils:Unit Conversion  [about-units]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$fixednumber$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/fixednumber.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/maths.js [app-ssr] (ecmascript)");
;
;
;
const names = [
    "wei",
    "kwei",
    "mwei",
    "gwei",
    "szabo",
    "finney",
    "ether"
];
function formatUnits(value, unit) {
    let decimals = 18;
    if (typeof unit === "string") {
        const index = names.indexOf(unit);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(index >= 0, "invalid unit", "unit", unit);
        decimals = 3 * index;
    } else if (unit != null) {
        decimals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNumber"])(unit, "unit");
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$fixednumber$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FixedNumber"].fromValue(value, decimals, {
        decimals,
        width: 512
    }).toString();
}
function parseUnits(value, unit) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(typeof value === "string", "value must be a string", "value", value);
    let decimals = 18;
    if (typeof unit === "string") {
        const index = names.indexOf(unit);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(index >= 0, "invalid unit", "unit", unit);
        decimals = 3 * index;
    } else if (unit != null) {
        decimals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$maths$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNumber"])(unit, "unit");
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$fixednumber$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FixedNumber"].fromString(value, {
        decimals,
        width: 512
    }).value;
}
function formatEther(wei) {
    return formatUnits(wei, 18);
}
function parseEther(ether) {
    return parseUnits(ether, 18);
} //# sourceMappingURL=units.js.map
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/uuid.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uuidV4",
    ()=>uuidV4
]);
/**
 *  Explain UUID and link to RFC here.
 *
 *  @_subsection: api/utils:UUID  [about-uuid]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
;
function uuidV4(randomBytes) {
    const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(randomBytes, "randomBytes");
    // Section: 4.1.3:
    // - time_hi_and_version[12:16] = 0b0100
    bytes[6] = bytes[6] & 0x0f | 0x40;
    // Section 4.4
    // - clock_seq_hi_and_reserved[6] = 0b0
    // - clock_seq_hi_and_reserved[7] = 0b1
    bytes[8] = bytes[8] & 0x3f | 0x80;
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(bytes);
    return [
        value.substring(2, 10),
        value.substring(10, 14),
        value.substring(14, 18),
        value.substring(18, 22),
        value.substring(22, 34)
    ].join("-");
} //# sourceMappingURL=uuid.js.map
}),
];

//# sourceMappingURL=129bd_ethers_lib_esm_utils_da1b5c64._.js.map