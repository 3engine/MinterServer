import { Request, Response, NextFunction } from 'express';

export function authenticateRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const secretKey = req.headers['x-game-secret'];

  if (secretKey !== process.env.GAME_SECRET) {
    return res.status(403).send('Unauthorized');
  }

  next();
}
