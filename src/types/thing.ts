import {Schema, model } from 'mongoose';

interface IThing {
  title: string;
  description: string;
  imageUrl: string;
  userId: string;
  price: number
}

const thingSchema = new Schema<IThing>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

export const Thing = model<IThing>('Thing', thingSchema);