const { Contract } = require('ethers');
const { Web3Provider } = require('ethers/providers');
const { 
  BigInt,
  getBigInt,
  getAddress,
  keccak256,
  AbiCoder,
  toUtf8Bytes,
  solidityPacked
} = require('ethers')

const PERMIT_TYPEHASH = keccak256(
  toUtf8Bytes('Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)')
)

function expandTo18Decimals(n) {
  return getBigInt(n) * getBigInt('1000000000000000000')
}

async function getDomainSeparator(name, tokenAddress) {
    const abiCoder = new AbiCoder();
    let chainId = (await ethers.provider.getNetwork()).chainId;
  return keccak256(
    abiCoder.encode(
      ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
      [
        keccak256(toUtf8Bytes('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)')),
        keccak256(toUtf8Bytes(name)),
        keccak256(toUtf8Bytes('1')),
        chainId,
        tokenAddress
      ]
    )
  )
}

// function getCreate2Address(factoryAddress, [tokenA, tokenB], bytecode) {
//   const [token0, token1] = tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA]
//   const create2Inputs = [
//     '0xff',
//     factoryAddress,
//     keccak256(solidityPacked(['address', 'address'], [token0, token1])),
//     keccak256(bytecode)
//   ]
//   // const sanitizedInputs = `0x${create2Inputs.map(i => i.slice(2)).join('')}`
//   // return getAddress(`0x${keccak256(sanitizedInputs).slice(-40)}`)

//   const sanitizedInputs = create2Inputs.map(x => x?.slice(2) || '');
  
//   const hash = keccak256(
//     `0x${sanitizedInputs.join('')}`
//   );

//   return `0x${hash.slice(2, 42)}`;


// }

// async function getApprovalDigest(token, approve, nonce, deadline) {
//   const name = await token.name()
//   const DOMAIN_SEPARATOR = getDomainSeparator(name, token.address)
//   return keccak256(
//     solidityPack(
//       ['bytes1', 'bytes1', 'bytes32', 'bytes32'],
//       [
//         '0x19',
//         '0x01',
//         DOMAIN_SEPARATOR,
//         keccak256(
//           defaultAbiCoder.encode(
//             ['bytes32', 'address', 'address', 'uint256', 'uint256', 'uint256'],
//             [PERMIT_TYPEHASH, approve.owner, approve.spender, approve.value, nonce, deadline]
//           )
//         )
//       ]
//     )
//   )
// }

async function mineBlock(provider, timestamp) {
  await new Promise(async (resolve, reject) => {
    provider._web3Provider.sendAsync(
      { jsonrpc: '2.0', method: 'evm_mine', params: [timestamp] },
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )
  })
}

function encodePrice(reserve0, reserve1) {
  const Q112 = 2n ** 112n;
  return [
    (reserve1 * Q112) / reserve0,
    (reserve0 * Q112) / reserve1
  ];
}


// get the n wallets from hardhat config
function getWallets(n) {
  const provider = new ethers.JsonRpcProvider(hre.network.config.url);
  const allWallets = hre.network.config.accounts.map(account => new ethers.Wallet(account, provider));
  return allWallets.slice(0, n);
}
module.exports = {
  expandTo18Decimals,
  getWallets,
  // getApprovalDigest,
  mineBlock,
  encodePrice
}