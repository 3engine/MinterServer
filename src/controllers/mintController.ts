import { Request, Response } from 'express';
import {
  isValidEthereumAddress,
  mintNFTToPlayer,
} from '../utils/contractUtils';

export async function mintNFT(req: Request, res: Response) {
  try {
    const playerAddress = req.body.address;

    if (!isValidEthereumAddress(playerAddress)) {
      return res.status(400).send({
        success: false,
        message: 'Invalid Ethereum address provided.',
      });
    }

    const mintResult = await mintNFTToPlayer(playerAddress);

    if (mintResult.status === 'success') {
      res.send({ success: true, message: mintResult.message });
    } else {
      res.status(500).send({ success: false, message: mintResult.message });
    }
  } catch (error) {
    console.error('Error minting NFT:', error);
    res.status(500).send('Server error');
  }
}
