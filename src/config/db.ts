import mongoose, { Mongoose } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let uri: string = process.env.MONGODB_URI || '';

if (!uri) {
  throw new Error('Database connection URI is not defined or is empty!');
}
interface CachedConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  namespace NodeJS {
    interface Global {
      mongoose?: CachedConnection;
    }
  }
}

let cached: CachedConnection = (global as any).mongoose || {
  conn: null,
  promise: null,
};

async function connect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((connectedMongoose) => {
      return connectedMongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
async function mongodbMiddleware(req: any, res: any, next: any) {
  await connect();
  next();
}

export { mongodbMiddleware };
