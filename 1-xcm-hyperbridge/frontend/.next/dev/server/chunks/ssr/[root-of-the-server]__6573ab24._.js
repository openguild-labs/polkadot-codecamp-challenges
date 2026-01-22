module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/hooks/useApprove.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useApprove",
    ()=>useApprove
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/ethers.js [app-ssr] (ecmascript) <export * as ethers>");
;
;
// Sử dụng một ABI chuẩn tối giản cho hàm approve của ERC20
const ERC20_ABI = [
    "function approve(address spender, uint256 amount) public returns (bool)",
    "function allowance(address owner, address spender) public view returns (uint256)"
];
function useApprove() {
    const [isApproving, setIsApproving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const approveToken = async (tokenAddress, bridgeAddress, amount)=>{
        try {
            setIsApproving(true);
            // 1. Khởi tạo Provider và Signer (Ethers v6)
            const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            // 2. Kết nối với Contract của Token (ví dụ: USDC)
            const tokenContract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(tokenAddress, ERC20_ABI, signer);
            // 3. Chuyển đổi số lượng sang định dạng BigInt (18 decimals)
            const amountParsed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].parseUnits(amount, 18);
            console.log(`Đang approve ${amount} token cho bridge: ${bridgeAddress}`);
            // 4. Gọi hàm approve
            const tx = await tokenContract.approve(bridgeAddress, amountParsed);
            console.log("Transaction Hash:", tx.hash);
            // 5. Chờ giao dịch hoàn tất
            const receipt = await tx.wait();
            console.log("Approve thành công!");
            return receipt;
        } catch (error) {
            console.error("Lỗi khi Approve:", error);
            throw error;
        } finally{
            setIsApproving(false);
        }
    };
    return {
        approveToken,
        isApproving
    };
}
}),
"[project]/abi/TOKEN_BRIDGE.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"abi":[{"type":"constructor","inputs":[{"name":"_tokenGateway","type":"address","internalType":"address"},{"name":"_feeToken","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"bridgeTokens","inputs":[{"name":"token","type":"address","internalType":"address"},{"name":"symbol","type":"string","internalType":"string"},{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"recipient","type":"address","internalType":"address"},{"name":"destChain","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"feeToken","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"tokenGateway","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract ITokenGateway"}],"stateMutability":"view"}]});}),
"[project]/hooks/useBridge.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBridge",
    ()=>useBridge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/ethers.js [app-ssr] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$abi$2f$TOKEN_BRIDGE$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/abi/TOKEN_BRIDGE.json (json)"); // Đường dẫn ABI
;
;
;
const TOKEN_BRIDGE_CONTRACT_ADDRESS = "0xec373e79fe65b09117e7a80058fd42c51f7e3289"; // Thay bằng địa chỉ 
function useBridge() {
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [receipt, setReceipt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const bridgeTokens = async ({ token, symbol, amount, destChainId })=>{
        try {
            setLoading(true);
            setError(null);
            // Validate amount
            if (!amount || amount === "" || isNaN(Number(amount))) {
                throw new Error("Please enter a valid amount");
            }
            // Kết nối với ví người dùng
            const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            // Tạo instance contract
            const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(TOKEN_BRIDGE_CONTRACT_ADDRESS, __TURBOPACK__imported__module__$5b$project$5d2f$abi$2f$TOKEN_BRIDGE$2e$json__$28$json$29$__["default"].abi, signer);
            // Lấy địa chỉ người nhận
            const recipient = await signer.getAddress();
            // Chuyển amount sang BigNumber
            const amountParsed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].parseUnits(amount, 18);
            // Chuyển destChainId sang bytes
            const destChain = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].toUtf8Bytes(`EVM-${destChainId}`);
            // Gửi giao dịch
            const tx = await contract.bridgeTokens(token, symbol, amountParsed, recipient, destChain, {
                value: 0
            });
            const txReceipt = await tx.wait();
            setReceipt(txReceipt);
            return txReceipt;
        } catch (err) {
            setError(err.message || "Unknown error");
            throw err;
        } finally{
            setLoading(false);
        }
    };
    return {
        bridgeTokens,
        loading,
        error,
        receipt
    };
}
}),
"[project]/hooks/useMetamask.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMetaMask",
    ()=>useMetaMask
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function useMetaMask() {
    const [account, setAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [chainId, setChainId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const connectWallet = async ()=>{
        if (!window.ethereum) return alert("Install MetaMask!");
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            setAccount(accounts[0]);
            const chain = await window.ethereum.request({
                method: "eth_chainId"
            });
            setChainId(chain);
        } catch (err) {
            console.error(err);
        }
    };
    const disconnectWallet = ()=>{
        setAccount(null);
        setChainId(null);
    };
    const switchChain = async (targetChainIdHex)=>{
        if (!window.ethereum) return;
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [
                    {
                        chainId: targetChainIdHex
                    }
                ]
            });
        } catch (err) {
            console.error(err);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!window.ethereum) return;
        const handleAccountsChanged = (accounts)=>setAccount(accounts[0] || null);
        const handleChainChanged = (chainId)=>setChainId(chainId);
        window.ethereum.on("accountsChanged", handleAccountsChanged);
        window.ethereum.on("chainChanged", handleChainChanged);
        return ()=>{
            window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
            window.ethereum.removeListener("chainChanged", handleChainChanged);
        };
    }, []);
    return {
        account,
        chainId,
        connectWallet,
        disconnectWallet,
        switchChain
    };
}
}),
"[project]/components/MetamaskButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MetaMaskButton",
    ()=>MetaMaskButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useMetamask$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useMetamask.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function MetaMaskButton() {
    const { account, connectWallet, disconnectWallet } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useMetamask$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMetaMask"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-6 right-6 z-50",
        children: account ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-12 w-60 px-5 py-3 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-2xl border-3 border-black text-emerald-900 font-black text-center select-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] transition-all flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-2 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png",
                            alt: "MetaMask",
                            width: 24,
                            height: 24,
                            className: "inline-block align-middle",
                            unoptimized: true
                        }, void 0, false, {
                            fileName: "[project]/components/MetamaskButton.tsx",
                            lineNumber: 15,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/MetamaskButton.tsx",
                        lineNumber: 14,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            account.slice(0, 6),
                            "...",
                            account.slice(-4)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MetamaskButton.tsx",
                        lineNumber: 24,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: disconnectWallet,
                        title: "Disconnect",
                        className: "ml-2 p-1 rounded-full bg-gray-200 hover:bg-red-400 border border-gray-300 hover:border-red-400 transition-colors group",
                        style: {
                            lineHeight: 0
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "22",
                            height: "22",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            className: "text-gray-500 group-hover:text-white transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                            }, void 0, false, {
                                fileName: "[project]/components/MetamaskButton.tsx",
                                lineNumber: 34,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/MetamaskButton.tsx",
                            lineNumber: 33,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/MetamaskButton.tsx",
                        lineNumber: 27,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MetamaskButton.tsx",
                lineNumber: 13,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/MetamaskButton.tsx",
            lineNumber: 12,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: connectWallet,
            className: "bg-emerald-200 border-2 border-black px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png",
                    alt: "MetaMask",
                    width: 24,
                    height: 24,
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/components/MetamaskButton.tsx",
                    lineNumber: 44,
                    columnNumber: 11
                }, this),
                account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"
            ]
        }, void 0, true, {
            fileName: "[project]/components/MetamaskButton.tsx",
            lineNumber: 40,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/MetamaskButton.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useApprove$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useApprove.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBridge$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useBridge.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useMetamask$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useMetamask.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MetamaskButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MetamaskButton.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function Home() {
    const { approveToken, isApproving } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useApprove$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApprove"])();
    const { bridgeTokens, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBridge$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBridge"])();
    const { switchChain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useMetamask$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMetaMask"])();
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const BRIDGE_ADDRESS = "0x1e8e474701bbb119017c5659266087fa20470a77dc42ce1a127f645646c3e0"; // Đảm bảo khớp với useBridge
    const handleBridgeProcess = async ()=>{
        if (!amount || Number(amount) <= 0) return alert("Nhập số lượng!");
        try {
            // 1. Chuyển mạng sang BSC Testnet
            await switchChain("0x61");
            const tokenAddr = "0xA801da100bF16D07F668F4A49E1f71fc54D05177";
            // 2. Chờ Approve hoàn tất
            await approveToken(tokenAddr, BRIDGE_ADDRESS, amount);
            // 3. Thực hiện Bridge
            await bridgeTokens({
                token: tokenAddr,
                symbol: "USDh",
                amount: amount,
                destChainId: 11155111
            });
            alert("Bridge thành công!");
        } catch (err) {
            alert("Lỗi: " + (err.reason || err.message));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#e0f7fa] flex flex-col items-center p-12 text-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-2xl flex justify-between mb-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-black uppercase italic",
                        children: "OPEN GUILD BRIDGE"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MetamaskButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MetaMaskButton"], {}, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border-[3px] border-black rounded-[32px] p-8 w-full max-w-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-2 border-black rounded-2xl p-4 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] font-black uppercase mb-2",
                                children: "Amount"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: amount,
                                onChange: (e)=>setAmount(e.target.value),
                                placeholder: "0.00",
                                className: "text-3xl font-black w-full outline-none bg-transparent text-right"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleBridgeProcess,
                        disabled: loading || isApproving,
                        className: `w-full py-4 rounded-2xl font-black text-xl uppercase border-[3px] border-black transition-all
            ${loading || isApproving ? "bg-gray-300" : "bg-[#fff176] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none"}`,
                        children: isApproving ? "Step 1: Approving..." : loading ? "Step 2: Bridging..." : "Bridge Now"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6573ab24._.js.map