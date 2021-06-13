import * as mongoose from 'mongoose';

export const ClubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoImageId: { type: String, required: true },
});

export interface Club extends mongoose.Document {
  id: string;
  name: string;
  logoImageId: string;
}
