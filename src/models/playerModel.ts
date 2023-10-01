import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  playerAddress: {
    type: String,
    required: true,
    unique: true,
    set: (v: string) => v.toLowerCase(),
  },
  hasMinted: { type: Boolean, default: false },
});

const Player = mongoose.model('Player', playerSchema);
export default Player;
