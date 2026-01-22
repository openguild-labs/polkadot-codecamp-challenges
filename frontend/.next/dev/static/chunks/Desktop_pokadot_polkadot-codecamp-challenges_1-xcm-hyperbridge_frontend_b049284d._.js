(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/hooks/useMetamask.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMetaMask",
    ()=>useMetaMask
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useMetaMask() {
    _s();
    const [account, setAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [chainId, setChainId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMetaMask.useEffect": ()=>{
            if (!window.ethereum) return;
            const handleAccountsChanged = {
                "useMetaMask.useEffect.handleAccountsChanged": (accounts)=>setAccount(accounts[0] || null)
            }["useMetaMask.useEffect.handleAccountsChanged"];
            const handleChainChanged = {
                "useMetaMask.useEffect.handleChainChanged": (chainId)=>setChainId(chainId)
            }["useMetaMask.useEffect.handleChainChanged"];
            window.ethereum.on("accountsChanged", handleAccountsChanged);
            window.ethereum.on("chainChanged", handleChainChanged);
            return ({
                "useMetaMask.useEffect": ()=>{
                    window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
                    window.ethereum.removeListener("chainChanged", handleChainChanged);
                }
            })["useMetaMask.useEffect"];
        }
    }["useMetaMask.useEffect"], []);
    return {
        account,
        chainId,
        connectWallet,
        disconnectWallet,
        switchChain
    };
}
_s(useMetaMask, "lwunOGU3VSLOFq48RdR9R0Q2SoI=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/components/MetamaskButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MetaMaskButton",
    ()=>MetaMaskButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$hooks$2f$useMetamask$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/hooks/useMetamask.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function MetaMaskButton() {
    _s();
    const { account, connectWallet, disconnectWallet } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$hooks$2f$useMetamask$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMetaMask"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-6 right-6 z-50",
        children: account ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-12 w-60 px-5 py-3 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-2xl border-3 border-black text-emerald-900 font-black text-center select-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] transition-all flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-2 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png",
                            alt: "MetaMask",
                            width: 24,
                            height: 24,
                            className: "inline-block align-middle",
                            unoptimized: true
                        }, void 0, false, {
                            fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/components/MetamaskButton.tsx",
                            lineNumber: 15,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/components/MetamaskButton.tsx",
                        lineNumber: 14,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            account.slice(0, 6),
                            "...",
                            account.slice(-4)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/components/MetamaskButton.tsx",
                        lineNumber: 24,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: disconnectWallet,
                        title: "Disconnect",
                        className: "ml-2 p-1 rounded-full bg-gray-200 hover:bg-red-400 border border-gray-300 hover:border-red-400 transition-colors group",
                        style: {
                            lineHeight: 0
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "22",
                            height: "22",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            className: "text-gray-500 group-hover:text-white transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/components/MetamaskButton.tsx",
                                lineNumber: 34,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/components/MetamaskButton.tsx",
                            lineNumber: 33,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/components/MetamaskButton.tsx",
                        lineNumber: 27,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/components/MetamaskButton.tsx",
                lineNumber: 13,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/components/MetamaskButton.tsx",
            lineNumber: 12,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: connectWallet,
            className: "bg-emerald-200 border-2 border-black px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png",
                    alt: "MetaMask",
                    width: 24,
                    height: 24,
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/components/MetamaskButton.tsx",
                    lineNumber: 44,
                    columnNumber: 11
                }, this),
                account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/components/MetamaskButton.tsx",
            lineNumber: 40,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/components/MetamaskButton.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(MetaMaskButton, "sXzvTUYgfRDI3AYp27WEOmOAhfY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$hooks$2f$useMetamask$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMetaMask"]
    ];
});
_c = MetaMaskButton;
var _c;
__turbopack_context__.k.register(_c, "MetaMaskButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/hooks/useApprove.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useApprove",
    ()=>useApprove
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/ethers.js [app-client] (ecmascript) <export * as ethers>");
var _s = __turbopack_context__.k.signature();
;
;
// Sử dụng một ABI chuẩn tối giản cho hàm approve của ERC20
const ERC20_ABI = [
    "function approve(address spender, uint256 amount) public returns (bool)",
    "function allowance(address owner, address spender) public view returns (uint256)"
];
function useApprove() {
    _s();
    const [isApproving, setIsApproving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const approveToken = async (tokenAddress, bridgeAddress, amount)=>{
        try {
            setIsApproving(true);
            // 1. Khởi tạo Provider và Signer (Ethers v6)
            const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            // 2. Kết nối với Contract của Token (ví dụ: USDC)
            const tokenContract = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(tokenAddress, ERC20_ABI, signer);
            // 3. Chuyển đổi số lượng sang định dạng BigInt (18 decimals)
            const amountParsed = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].parseUnits(amount, 18);
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
_s(useApprove, "VFJmLopplqwtMeppUwpZb7k2JJk=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/abi/TOKEN_BRIDGE.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"abi":[{"type":"constructor","inputs":[{"name":"_tokenGateway","type":"address","internalType":"address"},{"name":"_feeToken","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"bridgeTokens","inputs":[{"name":"token","type":"address","internalType":"address"},{"name":"symbol","type":"string","internalType":"string"},{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"recipient","type":"address","internalType":"address"},{"name":"destChain","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"feeToken","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"tokenGateway","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract ITokenGateway"}],"stateMutability":"view"}]});}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/hooks/useBridge.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBridge",
    ()=>useBridge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/ethers/lib.esm/ethers.js [app-client] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$abi$2f$TOKEN_BRIDGE$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/abi/TOKEN_BRIDGE.json (json)"); // Đường dẫn ABI
var _s = __turbopack_context__.k.signature();
;
;
;
const TOKEN_BRIDGE_CONTRACT_ADDRESS = "0xec373e79fe65b09117e7a80058fd42c51f7e3289"; // Thay bằng địa chỉ 
function useBridge() {
    _s();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [receipt, setReceipt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const bridgeTokens = async ({ token, symbol, amount, destChainId })=>{
        try {
            setLoading(true);
            setError(null);
            // Validate amount
            if (!amount || amount === "" || isNaN(Number(amount))) {
                throw new Error("Please enter a valid amount");
            }
            // Kết nối với ví người dùng
            const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            // Tạo instance contract
            const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(TOKEN_BRIDGE_CONTRACT_ADDRESS, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$abi$2f$TOKEN_BRIDGE$2e$json__$28$json$29$__["default"].abi, signer);
            // Lấy địa chỉ người nhận
            const recipient = await signer.getAddress();
            // Chuyển amount sang BigNumber
            const amountParsed = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].parseUnits(amount, 18);
            // Chuyển destChainId sang bytes
            const destChain = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].toUtf8Bytes(`EVM-${destChainId}`);
            // Gửi giao dịch
            console.log(token, symbol, amountParsed, recipient, destChain);
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
_s(useBridge, "lP8dwV8D/7zmysCSC4tlEjyWQ8Y=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$components$2f$MetamaskButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/components/MetamaskButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$hooks$2f$useApprove$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/hooks/useApprove.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$hooks$2f$useBridge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/hooks/useBridge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$hooks$2f$useMetamask$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/hooks/useMetamask.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function Home() {
    _s();
    // "Lấy" handleBridge ra từ hook
    const { approveToken, isApproving } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$hooks$2f$useApprove$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApprove"])();
    const { bridgeTokens, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$hooks$2f$useBridge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBridge"])();
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const { switchChain, chainId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$hooks$2f$useMetamask$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMetaMask"])();
    const onButtonClick = async ()=>{
        if (!amount || Number(amount) <= 0) return alert("Vui lòng nhập số lượng!");
        try {
            // Bước 1: Chuyển mạng
            await switchChain("0xaa36a7");
            const token = "0xA801da100bF16D07F668F4A49E1f71fc54D05177";
            const symbol = "USD.h";
            const destChainId = 11155111;
            // ĐỊA CHỈ BRIDGE (Phải là địa chỉ 42 ký tự của contract)
            const bridgeAddress = "0xec373e79fe65b09117e7a80058fd42c51f7e3289";
            // Bước 2: Gọi Approve (Đợi cho đến khi giao dịch trên blockchain thành công)
            console.log("Đang Approve...");
            await approveToken(token, bridgeAddress, amount);
            // Bước 3: Gọi Bridge
            console.log("Đang Bridge...");
            await bridgeTokens({
                token,
                symbol,
                amount,
                destChainId
            });
            alert("Bridge thành công!");
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Bridge thành công!");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#e0f7fa] flex flex-col items-center p-6 md:p-12 font-sans text-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-2xl flex justify-between items-center mb-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl md:text-3xl font-black tracking-tighter uppercase italic",
                        children: [
                            "OPEN GUILD ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-500 font-bold",
                                children: "BRIDGE"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                lineNumber: 51,
                                columnNumber: 22
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$components$2f$MetamaskButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetaMaskButton"], {}, void 0, false, {
                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border-[3px] border-black rounded-[32px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 w-full max-w-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row justify-between items-center gap-4 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full border-2 border-black rounded-2xl p-4 bg-white relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-black text-black uppercase mb-1",
                                        children: "From"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-extrabold flex justify-between items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-6 h-6 bg-yellow-400 rounded-full border border-black flex items-center justify-center text-[10px]",
                                                        children: "B"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                                        lineNumber: 67,
                                                        columnNumber: 17
                                                    }, this),
                                                    "BNB Chain Testnet"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                                lineNumber: 66,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "▼"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                                lineNumber: 72,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-yellow-400 border-2 border-black rounded-full p-2 hover:rotate-180 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "24",
                                    height: "24",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "3",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M16 3l4 4-4 4M8 21l-4-4 4-4M20 7H4M4 17h16"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full border-2 border-black rounded-2xl p-4 bg-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-black text-black uppercase mb-1",
                                        children: "To"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-extrabold flex justify-between items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-6 h-6 bg-blue-100 rounded-full border border-black flex items-center justify-center text-[10px]",
                                                        children: "E"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Ethereum Sepolia"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                                lineNumber: 98,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "▼"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                                lineNumber: 104,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-2 border-black rounded-2xl p-4 mb-8 bg-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] font-black text-black uppercase mb-2",
                                children: "Amount"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 border-2 border-black rounded-xl px-3 py-2 bg-gray-50 min-w-[120px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-5 h-5 bg-blue-500 rounded-full border border-black text-[8px] text-white flex items-center justify-center font-bold",
                                                children: "$"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                                lineNumber: 116,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-black text-sm",
                                                children: "USDh"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                                lineNumber: 119,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-auto",
                                                children: "▼"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                                lineNumber: 120,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        placeholder: "0.00",
                                        className: "text-3xl font-black text-right outline-none w-full bg-transparent placeholder-gray-300",
                                        value: amount,
                                        onChange: (e)=>setAmount(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between mt-4 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold text-black",
                                        children: "Balance: 6.94"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-1",
                                        children: [
                                            "25%",
                                            "50%",
                                            "75%",
                                            "Max"
                                        ].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "text-[10px] font-bold border-2 border-black rounded-full px-3 py-1 bg-gray-100 hover:bg-yellow-200 transition-colors uppercase",
                                                children: p
                                            }, p, false, {
                                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                                lineNumber: 134,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                        lineNumber: 132,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-[10px] font-black uppercase mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Transaction Progress"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "0%"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full h-5 bg-gray-100 border-2 border-black rounded-full overflow-hidden p-0.5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-[0%] h-full bg-emerald-400 rounded-full border-r border-black"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `w-full py-4 rounded-2xl font-black text-xl uppercase border-[3px] border-black transition-all
            ${loading || isApproving || !amount ? "bg-gray-300 shadow-none cursor-not-allowed" : "bg-[#fff176] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none"}`,
                        onClick: onButtonClick,
                        disabled: loading || isApproving || !amount,
                        children: isApproving ? "1/2 Approving..." : loading ? "2/2 Bridging..." : "Bridge Now"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/pokadot/polkadot-codecamp-challenges/1-xcm-hyperbridge/frontend/app/page.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(Home, "U0VpuzC5quMSZ9QeCGTR8S4ExMM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$hooks$2f$useApprove$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApprove"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$hooks$2f$useBridge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBridge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pokadot$2f$polkadot$2d$codecamp$2d$challenges$2f$1$2d$xcm$2d$hyperbridge$2f$frontend$2f$hooks$2f$useMetamask$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMetaMask"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_pokadot_polkadot-codecamp-challenges_1-xcm-hyperbridge_frontend_b049284d._.js.map