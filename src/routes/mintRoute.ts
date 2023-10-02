import { Router } from 'express';
import { mintNFT } from '../controllers/mintController';
import { checkSessionMiddleware } from '../middlewares/authentication';
const router = Router();

router.post('/mint', checkSessionMiddleware, mintNFT);

export default router;
