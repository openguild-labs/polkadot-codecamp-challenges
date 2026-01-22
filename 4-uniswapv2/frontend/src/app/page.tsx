"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

const TOKEN_LIST = [
  {
    symbol: "TKA",
    name: "Token A",
    address: "0xeF9A6Dc13455C406E3d0859936B1DAbfF7321a7d",
  },
  {
    symbol: "TKB",
    name: "Token B",
    address: "0x9FeDBF468CCCE7E8b316CAb167Dc85e8c99FD1EF",
  },
  {
    symbol: "TKC",
    name: "Token C",
    address: "0xc678C7bc96A0aCc6Bc4Fa832b7BD1A854aaEf822",
  },
  {
    symbol: "TKD",
    name: "Token D",
    address: "0x9D1543E4c68e75781BFa0B581322101c6d59ce79",
  },
  {
    symbol: "TKT",
    name: "Token T",
    address: "0x6DFc3244547083402cD94941cF5d9bdE234f6be5",
  },
  {
    symbol: "TKM",
    name: "Token M",
    address: "0x13D04652613c7dAD1b375d9CA6c7B68406a94bae",
  },
  {
    symbol: "TKX",
    name: "Token X",
    address: "0x0A757C00516aFDDc82C2A103AA8B76b8F3EF26eD",
  },
  {
    symbol: "TKY",
    name: "Token Y",
    address: "0xD65Db9290B91D4e4C46c19f4DAfC4Ef457E56965",
  },
  {
    symbol: "TKS",
    name: "Token S",
    address: "0x6f89307fE923e1bB57194594F70dd94D80B072b0",
  },
  {
    symbol: "TKN",
    name: "Token N",
    address: "0xaFe2B61D695c59db654759fb4a061657a32C8bbB",
  },
  {
    symbol: "TMI",
    name: "Token MI",
    address: "0x722477A7CDeAFd85eB5f461e06C249B8115a4618",
  },
  {
    symbol: "TMA",
    name: "Token MA",
    address: "0x124415962dD6E73e2b02c565e46ED79F66eBbE34",
  },
];

const FACTORY_ADDR = "0x2a62566645eD08f04cfA719052Dd037F4f64C71c"; // Điền Address Factory của bạn

// --- ABIS ---
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address spender, uint amount) returns (bool)",
  "function decimals() view returns (uint8)",
  "function mint(address to, uint amount)",
];

const FACTORY_ABI = [
  "function getPair(address tokenA, address tokenB) view returns (address pair)",
  "function allPairsLength() view returns (uint)",
  "function allPairs(uint) view returns (address)",
  "function createPair(address tokenA, address tokenB) returns (address pair)",
];

const PAIR_ABI = [
  "function token0() view returns (address)",
  "function token1() view returns (address)",
  "function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
  "function mint(address to) returns (uint liquidity)",
  "function burn(address to) returns (uint amount0, uint amount1)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
  "function totalSupply() view returns (uint)",
  "function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data)",
];

// --- COMPONENTS ---

const TokenModal = ({ isOpen, onClose, onSelect }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-[30px] w-[350px] p-5 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-[#5e4b56]">Select Token</h3>
          <button
            onClick={onClose}
            className="text-gray-400 text-xl hover:text-red-400"
          >
            ✕
          </button>
        </div>
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {TOKEN_LIST.map((token) => (
            <button
              key={token.address}
              onClick={() => {
                onSelect(token);
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 hover:bg-[#f0f7ff] rounded-xl transition-colors group"
            >
              <div className="flex flex-col items-start">
                <span className="font-bold text-[#5e4b56]">{token.symbol}</span>
                <span className="text-[10px] text-gray-400">{token.name}</span>
              </div>
              <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-400">
                {token.address.substring(0, 4)}...
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState("swap");
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const _provider = new ethers.BrowserProvider(window.ethereum as any);
        const accounts = await _provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        setProvider(_provider);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please install Metamask!");
    }
  };

  return (
    <main className="min-h-screen bg-[#fff0f3] flex flex-col items-center py-10 font-mono text-[#5e4b56]">
      <nav className="flex justify-between items-center w-full max-w-[600px] mb-8 p-3 bg-white/60 backdrop-blur-sm rounded-[30px] border-2 border-white shadow-sm">
        <div className="flex gap-2">
          {["swap", "pool", "faucet"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-5 py-2 rounded-2xl font-bold capitalize transition-all ${
                view === v
                  ? "bg-gradient-to-r from-[#ff8ba7] to-[#ffc6c6] text-white shadow-md"
                  : "text-[#5e4b56] hover:bg-[#fff0f3]"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-white rounded-2xl text-xs font-bold text-[#ff8ba7] shadow-sm border border-[#ffeef2] hover:bg-gray-50"
        >
          {account ? `👛 ${account.substring(0, 6)}...` : "Connect Wallet"}
        </button>
      </nav>

      {view === "swap" && <SwapScreen account={account} provider={provider} />}
      {view === "pool" && <PoolScreen account={account} provider={provider} />}
      {view === "faucet" && (
        <FaucetScreen account={account} provider={provider} />
      )}
    </main>
  );
}

// --- SWAP SCREEN ---
function SwapScreen({ account, provider }: any) {
  const [tokenIn, setTokenIn] = useState(TOKEN_LIST[0]);
  const [tokenOut, setTokenOut] = useState(TOKEN_LIST[1]);
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  const [balanceIn, setBalanceIn] = useState("0");
  const [balanceOut, setBalanceOut] = useState("0");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("💤 Ready");
  const [modalType, setModalType] = useState<"in" | "out" | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Trigger reload

  // AUTO-PAIRING LOGIC
  useEffect(() => {
    if (!provider || !tokenIn) return;
    const findPartner = async () => {
      const factory = new ethers.Contract(FACTORY_ADDR, FACTORY_ABI, provider);
      const currentPair = await factory.getPair(
        tokenIn.address,
        tokenOut.address,
      );
      if (currentPair !== ethers.ZeroAddress) return;

      for (let t of TOKEN_LIST) {
        if (t.address === tokenIn.address) continue;
        const pair = await factory.getPair(tokenIn.address, t.address);
        if (pair !== ethers.ZeroAddress) {
          setTokenOut(t);
          return;
        }
      }
    };
    findPartner();
  }, [tokenIn, provider]);

  // Fetch Balances
  useEffect(() => {
    if (!account || !provider) return;
    const fetchBalances = async () => {
      try {
        const tIn = new ethers.Contract(tokenIn.address, ERC20_ABI, provider);
        const tOut = new ethers.Contract(tokenOut.address, ERC20_ABI, provider);
        const [bIn, bOut] = await Promise.all([
          tIn.balanceOf(account),
          tOut.balanceOf(account),
        ]);
        setBalanceIn(ethers.formatEther(bIn));
        setBalanceOut(ethers.formatEther(bOut));
      } catch (e) {
        console.error(e);
      }
    };
    fetchBalances();
  }, [account, provider, tokenIn, tokenOut, refreshTrigger]);

  // Calculate Price
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (!amountIn || !provider) return;
      try {
        const factory = new ethers.Contract(
          FACTORY_ADDR,
          FACTORY_ABI,
          provider,
        );
        const pairAddr = await factory.getPair(
          tokenIn.address,
          tokenOut.address,
        );
        if (pairAddr === ethers.ZeroAddress) {
          setAmountOut("No Pool");
          return;
        }
        const pair = new ethers.Contract(pairAddr, PAIR_ABI, provider);
        const reserves = await pair.getReserves();
        const token0 = await pair.token0();
        const isInZero = tokenIn.address.toLowerCase() === token0.toLowerCase();
        const rIn = isInZero ? reserves[0] : reserves[1];
        const rOut = isInZero ? reserves[1] : reserves[0];

        if (Number(rIn) === 0 || Number(rOut) === 0) {
          setAmountOut("Low Liq");
          return;
        }

        const amountInWei = ethers.parseEther(amountIn);
        const numerator = amountInWei * BigInt(997) * rOut;
        const denominator = rIn * BigInt(1000) + amountInWei * BigInt(1000);
        setAmountOut(ethers.formatEther(numerator / denominator));
      } catch (err) {
        console.error(err);
      }
    }, 600);
    return () => clearTimeout(timeoutId);
  }, [amountIn, tokenIn, tokenOut, provider, refreshTrigger]);

  const executeSwap = async () => {
    if (!amountIn || !account) return;
    setLoading(true);
    setStatus("🚀 Sending...");
    try {
      const signer = await provider.getSigner();
      const factory = new ethers.Contract(FACTORY_ADDR, FACTORY_ABI, signer);
      const pairAddr = await factory.getPair(tokenIn.address, tokenOut.address);
      const pair = new ethers.Contract(pairAddr, PAIR_ABI, signer);
      const tIn = new ethers.Contract(tokenIn.address, ERC20_ABI, signer);
      await (await tIn.transfer(pairAddr, ethers.parseEther(amountIn))).wait();
      setStatus("🔄 Swapping...");
      const amountOutWei = ethers.parseEther(amountOut);
      const token0 = await pair.token0();
      const amount0Out =
        tokenOut.address.toLowerCase() === token0.toLowerCase()
          ? amountOutWei
          : BigInt(0);
      const amount1Out =
        tokenOut.address.toLowerCase() === token0.toLowerCase()
          ? BigInt(0)
          : amountOutWei;
      await (await pair.swap(amount0Out, amount1Out, account, "0x")).wait();

      setStatus("✅ Success!");
      setAmountIn("");
      setAmountOut("");
      setRefreshTrigger((prev) => prev + 1);
    } catch (e: any) {
      setStatus("❌ Error: " + (e.reason || "Failed"));
    }
    setLoading(false);
  };

  return (
    <div className="w-[450px] bg-[#fff5f7] rounded-[40px] shadow-[8px_8px_16px_#e6dada,-8px_-8px_16px_#ffffff] p-8 border-4 border-white animate-in zoom-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#ff8ba7]">Uniswap V2</h2>
      </div>
      <div className="bg-white rounded-3xl p-4 shadow-inner mb-2 border border-[#ffeef2]">
        <div className="flex justify-between mb-2">
          <span className="text-xs text-gray-400">You pay</span>
          <span className="text-xs text-[#ff8ba7] font-bold">
            Balance: {Number(balanceIn).toFixed(4)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={amountIn}
            onChange={(e) => setAmountIn(e.target.value)}
            placeholder="0.0"
            className="w-full text-2xl outline-none text-gray-600 bg-transparent"
          />
          <button
            onClick={() => setModalType("in")}
            className="bg-[#ffc2d1] hover:bg-[#ff8ba7] text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-sm min-w-[80px] transition-colors"
          >
            {tokenIn.symbol} ▼
          </button>
        </div>
      </div>
      <div className="flex justify-center -my-3 relative z-10">
        <button
          onClick={() => {
            const t = tokenIn;
            setTokenIn(tokenOut);
            setTokenOut(t);
            setAmountIn("");
            setAmountOut("");
          }}
          className="bg-[#fff0f3] p-2 rounded-xl border-4 border-white shadow-md hover:scale-110 transition-transform cursor-pointer text-lg"
        >
          ⬇️
        </button>
      </div>
      <div className="bg-white rounded-3xl p-4 shadow-inner mt-2 mb-6 border border-[#ffeef2]">
        <div className="flex justify-between mb-2">
          <span className="text-xs text-[#a2d2ff] font-bold">
            Pool: {tokenIn.symbol}/{tokenOut.symbol}
          </span>
          <span className="text-xs text-[#a2d2ff] font-bold">
            Balance: {Number(balanceOut).toFixed(4)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={amountOut}
            disabled
            className="w-full text-2xl outline-none text-gray-400 bg-transparent"
          />
          <button
            onClick={() => setModalType("out")}
            className="bg-[#a2d2ff] hover:bg-[#8cc0ff] text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-sm min-w-[80px] transition-colors"
          >
            {tokenOut.symbol} ▼
          </button>
        </div>
      </div>
      <button
        onClick={executeSwap}
        disabled={loading || !amountIn}
        className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg transition-all ${
          loading
            ? "bg-gray-300"
            : "bg-gradient-to-r from-[#ff8ba7] to-[#ffc6c6] hover:-translate-y-1"
        }`}
      >
        {loading ? "Swapping..." : "SWAP NOW"}
      </button>
      <p className="text-center text-xs text-gray-400 mt-3 h-4">{status}</p>
      <TokenModal
        isOpen={!!modalType}
        onClose={() => setModalType(null)}
        onSelect={(t: any) => {
          if (modalType === "in") setTokenIn(t);
          else setTokenOut(t);
        }}
      />
    </div>
  );
}

// --- POOL SCREEN ---
function PoolScreen({ account, provider }: any) {
  const [tab, setTab] = useState("list");

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const forceRefresh = () => setRefreshTrigger((prev) => prev + 1);

  return (
    <div className="w-[500px] bg-[#f0f7ff] rounded-[40px] shadow-[8px_8px_16px_#dbe4ef,-8px_-8px_16px_#ffffff] p-6 border-4 border-white animate-in zoom-in duration-300">
      <div className="flex bg-white rounded-2xl p-1 mb-6 shadow-inner">
        <button
          onClick={() => setTab("create")}
          className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
            tab === "create" ? "bg-[#a2d2ff] text-white" : "text-gray-400"
          }`}
        >
          Create Pool
        </button>
        <button
          onClick={() => setTab("list")}
          className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
            tab === "list" ? "bg-[#a2d2ff] text-white" : "text-gray-400"
          }`}
        >
          Pool List
        </button>
      </div>
      {tab === "create" ? (
        <CreatePoolTab
          account={account}
          provider={provider}
          onSuccess={forceRefresh}
        />
      ) : (
        <PoolListTab
          account={account}
          provider={provider}
          refreshTrigger={refreshTrigger}
          onUpdate={forceRefresh}
        />
      )}
    </div>
  );
}

function CreatePoolTab({ account, provider, onSuccess }: any) {
  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");
  const [status, setStatus] = useState("");
  const handleCreate = async () => {
    if (!provider) return;
    setStatus("⏳ Creating...");
    try {
      const signer = await provider.getSigner();
      const factory = new ethers.Contract(FACTORY_ADDR, FACTORY_ABI, signer);
      await (await factory.createPair(tokenA, tokenB)).wait();
      setStatus("✅ Created!");
      onSuccess(); // Refresh List
    } catch (e: any) {
      setStatus("❌ " + (e.reason || "Error"));
    }
  };
  return (
    <div className="space-y-4">
      <input
        value={tokenA}
        onChange={(e) => setTokenA(e.target.value)}
        placeholder="Token A Address (0x...)"
        className="w-full bg-white p-3 rounded-2xl text-xs outline-none border border-[#eef6ff] focus:ring-2 ring-[#a2d2ff]"
      />
      <input
        value={tokenB}
        onChange={(e) => setTokenB(e.target.value)}
        placeholder="Token B Address (0x...)"
        className="w-full bg-white p-3 rounded-2xl text-xs outline-none border border-[#eef6ff] focus:ring-2 ring-[#a2d2ff]"
      />
      <button
        onClick={handleCreate}
        disabled={!tokenA || !tokenB}
        className="w-full py-3 bg-[#a2d2ff] text-white font-bold rounded-2xl shadow-md"
      >
        Create Pool
      </button>
      <p className="text-center text-xs text-gray-400">{status}</p>
    </div>
  );
}

function PoolListTab({ account, provider, refreshTrigger, onUpdate }: any) {
  const [pools, setPools] = useState<any[]>([]);

  const fetchPools = useCallback(async () => {
    if (!provider) return;
    try {
      const factory = new ethers.Contract(FACTORY_ADDR, FACTORY_ABI, provider);
      const length = await factory.allPairsLength();
      const loadedPools = [];
      const count = Number(length);

      const start = count > 5 ? count - 5 : 0;

      for (let i = start; i < count; i++) {
        const pairAddr = await factory.allPairs(i);
        const pair = new ethers.Contract(pairAddr, PAIR_ABI, provider);
        const [reserves, t0, t1, supply] = await Promise.all([
          pair.getReserves(),
          pair.token0(),
          pair.token1(),
          pair.totalSupply(),
        ]);

        let sym0 = "UNK",
          sym1 = "UNK";
        try {
          const t0C = new ethers.Contract(t0, ERC20_ABI, provider);
          const t1C = new ethers.Contract(t1, ERC20_ABI, provider);
          [sym0, sym1] = await Promise.all([t0C.symbol(), t1C.symbol()]);
        } catch {}

        loadedPools.unshift({
          address: pairAddr,
          token0: t0,
          token1: t1,
          sym0,
          sym1,
          reserve0: ethers.formatEther(reserves[0]),
          reserve1: ethers.formatEther(reserves[1]),
          supply: ethers.formatEther(supply),
        });
      }
      setPools(loadedPools);
    } catch (e) {
      console.error(e);
    }
  }, [provider]);

  useEffect(() => {
    fetchPools();
  }, [fetchPools, refreshTrigger]);

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
      {pools.map((p, i) => (
        <PoolItem
          key={i}
          pool={p}
          account={account}
          provider={provider}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

function PoolItem({ pool, account, provider, onUpdate }: any) {
  const [mode, setMode] = useState<"none" | "add" | "remove">("none");
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [lp, setLp] = useState("");
  const [st, setSt] = useState("");

  const handleAmountA = (v: string) => {
    setAmountA(v);
    if (v && Number(pool.reserve0) > 0)
      setAmountB(
        (Number(v) * (Number(pool.reserve1) / Number(pool.reserve0))).toFixed(
          6,
        ),
      );
  };

  const handleAdd = async () => {
    if (!amountA || !amountB) return;
    setSt("⏳ Adding...");
    try {
      const s = await provider.getSigner();
      const t0 = new ethers.Contract(pool.token0, ERC20_ABI, s);
      const t1 = new ethers.Contract(pool.token1, ERC20_ABI, s);
      const p = new ethers.Contract(pool.address, PAIR_ABI, s);
      await (
        await t0.transfer(pool.address, ethers.parseEther(amountA))
      ).wait();
      await (
        await t1.transfer(pool.address, ethers.parseEther(amountB))
      ).wait();
      await (await p.mint(account)).wait();
      setSt("✅ Added!");
      setMode("none");
      onUpdate(); // REFRESH PARENT
    } catch (e: any) {
      setSt("❌ " + e.reason);
    }
  };

  const handleRemove = async () => {
    if (!lp) return;
    setSt("⏳ Removing...");
    try {
      const s = await provider.getSigner();
      const p = new ethers.Contract(pool.address, PAIR_ABI, s);
      await (await p.transfer(pool.address, ethers.parseEther(lp))).wait();
      await (await p.burn(account)).wait();
      setSt("✅ Removed!");
      setMode("none");
      onUpdate(); // REFRESH PARENT
    } catch (e: any) {
      setSt("❌ " + e.reason);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#eef6ff]">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-sm font-bold text-[#5e4b56]">
            🔵 {pool.sym0} / 🔴 {pool.sym1}
          </div>
          <div className="text-[10px] text-gray-400">
            LP Supply:{" "}
            <span className="text-[#a2d2ff] font-bold">
              {Number(pool.supply).toFixed(4)}
            </span>
          </div>
        </div>
        <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-400">
          {pool.address.substring(0, 6)}...
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500 bg-gray-50 p-2 rounded-xl mb-3">
        <div>
          Res {pool.sym0}: <b>{Number(pool.reserve0).toFixed(2)}</b>
        </div>
        <div>
          Res {pool.sym1}: <b>{Number(pool.reserve1).toFixed(2)}</b>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setMode(mode === "add" ? "none" : "add")}
          className="flex-1 py-1 bg-[#dbe4ef] rounded text-xs font-bold"
        >
          ➕ Add
        </button>
        <button
          onClick={() => setMode(mode === "remove" ? "none" : "remove")}
          className="flex-1 py-1 bg-[#ffeef2] rounded text-xs font-bold"
        >
          🔥 Remove
        </button>
      </div>
      {mode === "add" && (
        <div className="mt-2 space-y-2">
          <input
            placeholder={`Amt ${pool.sym0}`}
            value={amountA}
            onChange={(e) => handleAmountA(e.target.value)}
            className="w-full p-2 text-xs rounded bg-[#f0f9ff]"
          />
          <input
            placeholder={`Amt ${pool.sym1}`}
            value={amountB}
            onChange={(e) => setAmountB(e.target.value)}
            className="w-full p-2 text-xs rounded bg-[#f0f9ff]"
          />
          <button
            onClick={handleAdd}
            className="w-full py-1 bg-[#a2d2ff] text-white rounded text-xs font-bold"
          >
            Confirm
          </button>
        </div>
      )}
      {mode === "remove" && (
        <div className="mt-2 space-y-2">
          <input
            placeholder="LP Amount"
            value={lp}
            onChange={(e) => setLp(e.target.value)}
            className="w-full p-2 text-xs rounded bg-[#fff0f3]"
          />
          <button
            onClick={handleRemove}
            className="w-full py-1 bg-[#ff8ba7] text-white rounded text-xs font-bold"
          >
            Confirm
          </button>
        </div>
      )}
      <div className="text-center text-[10px] text-gray-400 mt-1 h-3">{st}</div>
    </div>
  );
}

// --- FAUCET SCREEN ---
function FaucetScreen({ account, provider }: any) {
  const [tokenAddress, setTokenAddress] = useState("");
  const [amount, setAmount] = useState("100");
  const [status, setStatus] = useState("💤 Ready to mint");
  const [loading, setLoading] = useState(false);

  const handleFaucet = async () => {
    if (!provider) return alert("Please connect wallet!");
    if (!tokenAddress) return alert("Enter token address!");
    setLoading(true);
    setStatus("🔨 Minting tokens...");
    try {
      const signer = await provider.getSigner();
      const tokenContract = new ethers.Contract(
        tokenAddress,
        ERC20_ABI,
        signer,
      );
      const tx = await tokenContract.mint(account, ethers.parseEther(amount));
      await tx.wait();
      setStatus(`✅ Minted ${amount} tokens successfully!`);
    } catch (err: any) {
      setStatus("❌ Error: " + (err.reason || "Mint failed"));
    }
    setLoading(false);
  };

  return (
    <div className="w-[450px] bg-[#fffbf0] rounded-[40px] shadow-[8px_8px_16px_#e6e2d0,-8px_-8px_16px_#ffffff] p-8 border-4 border-white animate-in zoom-in duration-300">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-[#eec044]">Faucet</h2>
      </div>
      <div className="mb-4">
        <label className="text-xs font-bold text-gray-400 ml-3">
          Token Address
        </label>
        <input
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          className="w-full bg-white p-4 rounded-2xl shadow-sm border border-[#fff2cc] mt-1 outline-none text-xs font-mono text-gray-600 focus:ring-2 ring-[#eec044]"
          placeholder="0x..."
        />
      </div>
      <div className="mb-6">
        <label className="text-xs font-bold text-gray-400 ml-3">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-white p-4 rounded-2xl shadow-sm border border-[#fff2cc] mt-1 outline-none text-xl font-bold text-[#eec044] focus:ring-2 ring-[#eec044]"
        />
      </div>
      <button
        onClick={handleFaucet}
        disabled={loading || !tokenAddress}
        className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg transition-all ${
          loading
            ? "bg-gray-300"
            : "bg-gradient-to-r from-[#eec044] to-[#ffdb7e] hover:-translate-y-1"
        }`}
      >
        {loading ? "Minting..." : "MINT TOKEN"}
      </button>
      <p className="text-center text-xs text-gray-400 mt-4 h-4">{status}</p>
    </div>
  );
}
