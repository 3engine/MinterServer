import { JsonRpcProvider, Wallet } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

const provider = new JsonRpcProvider(process.env.NETWORK_RPC);
const gameWallet = new Wallet(process.env.GAME_PRIVATE_KEY!, provider);

export { provider, gameWallet };
