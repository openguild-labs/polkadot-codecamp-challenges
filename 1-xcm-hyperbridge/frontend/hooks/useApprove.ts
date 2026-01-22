import { useState } from "react";
import { ethers } from "ethers";

// Sử dụng một ABI chuẩn tối giản cho hàm approve của ERC20
const ERC20_ABI = [
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function allowance(address owner, address spender) public view returns (uint256)"
];

export function useApprove() {
  const [isApproving, setIsApproving] = useState(false);

  const approveToken = async (
    tokenAddress: string,
    bridgeAddress: string,
    amount: string
  ) => {
    try {
      setIsApproving(true);

      // 1. Khởi tạo Provider và Signer (Ethers v6)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // 2. Kết nối với Contract của Token (ví dụ: USDC)
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);

      // 3. Chuyển đổi số lượng sang định dạng BigInt (18 decimals)
      const amountParsed = ethers.parseUnits(amount, 18);

      console.log(`Đang approve ${amount} token cho bridge: ${bridgeAddress}`);

      // 4. Gọi hàm approve
      const tx = await tokenContract.approve(bridgeAddress, amountParsed);
      
      console.log("Transaction Hash:", tx.hash);
      
      // 5. Chờ giao dịch hoàn tất
      const receipt = await tx.wait();
      console.log("Approve thành công!");
      
      return receipt;
    } catch (error: any) {
      console.error("Lỗi khi Approve:", error);
      throw error;
    } finally {
      setIsApproving(false);
    }
  };

  return { approveToken, isApproving };
}