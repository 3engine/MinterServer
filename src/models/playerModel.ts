import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  playerAddress: { type: String, required: true, unique: true },
  hasMinted: { type: Boolean, default: false },
});

const Player = mongoose.model('Player', playerSchema);
export default Player;
