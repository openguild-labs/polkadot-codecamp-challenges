import { getContract } from 'viem';
import { publicClient, getWalletClient } from './viem';
import StorageABI from '../../abis/Storage.json';

export const CONTRACT_ADDRESS = '0x58053f0e8ede1a47a1af53e43368cd04ddcaf66f';
export const CONTRACT_ABI = StorageABI;

// Create a function to get a contract instance for reading
export const getContractInstance = () => {
  return getContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    client: publicClient,
  });
};

// Create a function to get a contract instance with a signer for writing
export const getSignedContract = async () => {
  const walletClient = await getWalletClient();
  return getContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    client: walletClient,
  });
};