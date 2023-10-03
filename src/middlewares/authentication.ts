import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
declare global {
  namespace Express {
    interface Request {
      playerAddress?: string;
    }
  }
}
export async function checkSessionMiddleware (  
  req: Request,
  res: Response,
  next: NextFunction) {
  try {
    const apiKey = process.env.APIKEY_3ENGINE as string;
    const address: string = req.body.address;

    const response = await axios.get(`${process.env.API_3ENGINE}/player/session/status?address=${address}`, {
      headers: {
        'x-api-key': apiKey
      }
    });

    if (response.data.isActive) {
      req.playerAddress = response.data.player.address;
      next();
    } else {
      res.status(400).json({ error: 'Session is not active' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to check session status' });
  }
};