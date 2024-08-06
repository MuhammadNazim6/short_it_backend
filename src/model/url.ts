import mongoose, { Schema, Document, Model, ObjectId } from 'mongoose';
interface IUrl extends Document {
  shortUrlId: string;
  url: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}


const urlSchema: Schema<IUrl> = new Schema({
  shortUrlId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  }
},
  {
    timestamps: true
  });

export const Url: Model<IUrl> = mongoose.model<IUrl>('Url', urlSchema);
