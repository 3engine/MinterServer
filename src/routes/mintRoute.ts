import { Router } from 'express';
import { mintNFT } from '../controllers/mintController';
const router = Router();

router.post('/mint', mintNFT);

export default router;
