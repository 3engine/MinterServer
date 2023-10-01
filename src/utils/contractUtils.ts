import { ethers, Contract } from 'ethers';
import { gameWallet } from '../config/web3Config';
import Player from '../models/playerModel';

const contractABI = [
  {
    constant: false,
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_address',
        type: 'address',
      },
    ],
    name: 'hasMinted',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    type: 'function',
  },
];

const contractAddress = process.env.CONTRACT_ADDRESS || '';
if (!contractAddress) {
  throw new Error('Contract address is not set in the environment variables');
}
const nftContract = new Contract(contractAddress, contractABI, gameWallet);

/**
 * Check if user Minted already an NFT
 * @param playerAddress - The address of the player
 */
export async function hasUserMintedNFT(
  playerAddress: string,
): Promise<boolean> {
  try {
    const player = await Player.findOne({ playerAddress });

    if (player && player.hasMinted) {
      return true;
    }

    const hasMinted = await nftContract.hasMinted(playerAddress);
    return hasMinted;
  } catch (error) {
    console.error('Error in hasUserMintedNFT utility:', error);
    throw error;
  }
}

/**
 * Mint an NFT
 * @param playerAddress - The address of the player to whom the NFT will be minted
 * @param amount - The amount of NFTs to mint. Default is 1
 */
export async function mintNFTToPlayer(
  playerAddress: string,
  amount: number = 1,
) {
  try {
    const tx = await nftContract.mint(playerAddress, amount);
    const receipt = await tx.wait();

    if (receipt.status === 1) {
      const player = new Player({ playerAddress, hasMinted: true });
      await player.save();
    }
    return { status: 'success', message: 'NFT minted and transferred' };
  } catch (error) {
    console.error('Error in mintNFTToPlayer utility:', error);
    return { status: 'error', message: (error as Error).message };
  }
}

/**
 * Validates if the provided address is a valid Ethereum address
 * @param address The Ethereum address to validate
 * @returns {boolean} True if the address is valid, false otherwise
 */
export function isValidEthereumAddress(address: string): boolean {
  return ethers.isAddress(address);
}
