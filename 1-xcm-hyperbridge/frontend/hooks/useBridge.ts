import { useState } from "react";
import { ethers } from "ethers";
import TOKEN_BRIDGE from "../abi/TOKEN_BRIDGE.json"; // Đường dẫn ABI

const TOKEN_BRIDGE_CONTRACT_ADDRESS = "0xec373e79fe65b09117e7a80058fd42c51f7e3289"; // Thay bằng địa chỉ 

export function useBridge() { 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<any>(null);

  const bridgeTokens = async ({
    token,
    symbol,
    amount,
    destChainId,
  }: {
    token: string;
    symbol: string;
    amount: string;
    destChainId: number;
  }) => {
    try {
      setLoading(true);
      setError(null);

      // Validate amount
      if (!amount || amount === "" || isNaN(Number(amount))) {
        throw new Error("Please enter a valid amount");
      }

      // Kết nối với ví người dùng
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Tạo instance contract
      const contract = new ethers.Contract(
        TOKEN_BRIDGE_CONTRACT_ADDRESS,
        TOKEN_BRIDGE.abi,
        signer
      );

      // Lấy địa chỉ người nhận
      const recipient = await signer.getAddress();

      // Chuyển amount sang BigNumber
      const amountParsed = ethers.parseUnits(amount, 18);

      // Chuyển destChainId sang bytes
      const destChain = ethers.toUtf8Bytes(`EVM-${destChainId}`);

      // Gửi giao dịch
      console.log(token,symbol,amountParsed,recipient, destChain)
      const tx = await contract.bridgeTokens(
        token,
        symbol,
        amountParsed,
        recipient,
        destChain,
        { value: 0 }
      );

      const txReceipt = await tx.wait();
      setReceipt(txReceipt);

      return txReceipt;
    } catch (err: any) {
      setError(err.message || "Unknown error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { bridgeTokens, loading, error, receipt };
}
